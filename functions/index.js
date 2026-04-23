/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");
const admin = require("firebase-admin");

admin.initializeApp();

setGlobalOptions({ maxInstances: 10, region: "europe-west1" });

const TEYA_CLIENT_SECRET = defineSecret("TEYA_CLIENT_SECRET");

const TEYA_CLIENT_ID = "6dc0a3ef-0faa-402b-9560-c6f5de5efe70";
const TEYA_STORE_ID = "f5a5fe8c-9657-4a3c-9f1c-10b0ec7345c4";

async function getTeyaToken(clientSecret) {
  const res = await fetch("https://id.teya.com/oauth/v2/oauth-token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: TEYA_CLIENT_ID,
      client_secret: clientSecret,
      scope: "checkout/sessions/create",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data.access_token;
}

exports.createCheckout = onRequest(
  { secrets: [TEYA_CLIENT_SECRET], cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Aðeins POST" });
    }

    const { amount, currency, orderId, successUrl, cancelUrl } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({ error: "amount og orderId vantar" });
    }

    try {
      const token = await getTeyaToken(TEYA_CLIENT_SECRET.value());

      const response = await fetch("https://api.teya.com/v2/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Idempotency-Key": orderId,
        },
        body: JSON.stringify({
          store_id: TEYA_STORE_ID,
          amount: {
            currency: currency || "ISK",
            // ISK has no subunits (exponent 0), so value is whole krónur
            value: Math.round(amount),
          },
          type: "SALE",
          success_url: successUrl || "https://maliasport.is?payment=success",
          cancel_url: cancelUrl || "https://maliasport.is",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data });
      }

      // Vista pöntun í Firestore
      try {
        const db = admin.firestore();
        await db.collection('orders').doc(orderId).set({
          items: req.body.cartItems || [],
          status: 'pending',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (e) {
        console.warn('Gat ekki vistað pöntun í Firestore:', e.message);
      }

      return res.json({ checkout_url: data.session_url, session_id: data.session_id });
    } catch (err) {
      console.error("Teya villa:", err);
      return res.status(500).json({ error: "Villa við greiðslu" });
    }
  }
);

// — Afsláttarkóðar —
const DISCOUNT_CODES = {
  'VELKOMIN10': { type: 'percent', value: 10 },
}

exports.validateCode = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Aðeins POST' })

    const { code, amount, codeType } = req.body
    if (!code || !amount) return res.status(400).json({ error: 'code og amount vantar' })

    const upperCode = code.trim().toUpperCase()

    // Afsláttarkóðar
    if (codeType === 'discount' || !codeType) {
      if (DISCOUNT_CODES[upperCode]) {
        const dc = DISCOUNT_CODES[upperCode]
        const discount = dc.type === 'percent'
          ? Math.round(amount * dc.value / 100)
          : dc.value
        return res.json({ valid: true, type: 'discount', discount, newTotal: Math.max(0, amount - discount) })
      }
    }

    // Gjafabréf í Firestore
    if (codeType === 'giftcard' || !codeType) {
      const db = admin.firestore()
      const snap = await db.collection('giftCards').doc(upperCode).get()
      if (snap.exists) {
        const card = snap.data()
        if (!card.balance || card.balance <= 0) {
          return res.json({ valid: false, error: 'Gjafabréfið er þvælt' })
        }
        const discount = Math.min(card.balance, amount)
        return res.json({ valid: true, type: 'giftcard', discount, balance: card.balance, newTotal: Math.max(0, amount - discount) })
      }
    }

    return res.json({ valid: false })
  }
)

exports.confirmOrder = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Aðeins POST' })
    const { orderId } = req.body
    if (!orderId) return res.status(400).json({ error: 'orderId vantar' })

    const db = admin.firestore()
    const orderRef = db.collection('orders').doc(orderId)

    try {
      await db.runTransaction(async t => {
        const orderSnap = await t.get(orderRef)
        if (!orderSnap.exists) throw new Error('Pöntun fannst ekki')
        if (orderSnap.data().status === 'confirmed') return // þegar staðfest

        const items = orderSnap.data().items || []
        const stockRefs = items
          .filter(i => i.stockKey)
          .map(i => ({ item: i, ref: db.collection('stock').doc(i.stockKey) }))

        const stockSnaps = await Promise.all(stockRefs.map(s => t.get(s.ref)))

        stockSnaps.forEach((snap, idx) => {
          const { item, ref } = stockRefs[idx]
          const currentQty = snap.exists ? snap.data().qty : (item.initialStock ?? 1)
          const newQty = Math.max(0, currentQty - (item.qty || 1))
          t.set(ref, { qty: newQty })
        })

        t.update(orderRef, {
          status: 'confirmed',
          confirmedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
      })

      return res.json({ success: true })
    } catch (err) {
      console.error('confirmOrder villa:', err)
      return res.status(500).json({ error: err.message })
    }
  }
)

exports.sendContactEmail = onRequest(  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Aðeins POST" });
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Nafn, netfang og skilaboð vantar" });
    }

    try {
      const emailjs = require("@emailjs/nodejs");
      await emailjs.send(
        "service_u8m3pqd",
        "template_61ha1nq",
        {
          from_name: name,
          from_email: email,
          message,
          to_email: "maliasport@maliasport.is",
        },
        {
          publicKey: "p-i2d6JGGWY2u_g5-",
          privateKey: "38bVvFOXil7Bv4v-XQHNl",
        }
      );

      return res.json({ success: true });
    } catch (err) {
      console.error("sendContactEmail villa:", err);
      return res.status(500).json({ error: "Villa við sendingu" });
    }
  }
);
