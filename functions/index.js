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

      return res.json({ checkout_url: data.session_url, session_id: data.session_id });
    } catch (err) {
      console.error("Teya villa:", err);
      return res.status(500).json({ error: "Villa við greiðslu" });
    }
  }
);
