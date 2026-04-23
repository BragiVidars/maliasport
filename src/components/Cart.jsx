import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Cart.css'

const FUNCTION_URL = 'https://europe-west1-maliasport.cloudfunctions.net/createCheckout'
const VALIDATE_URL = 'https://europe-west1-maliasport.cloudfunctions.net/validateCode'

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart()
  const { user, openAuthModal } = useAuth()
  const [view, setView] = useState('cart')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', zip: '', city: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [giftCode, setGiftCode] = useState('')
  const [discountCode, setDiscountCode] = useState('')
  const [giftDiscount, setGiftDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [giftError, setGiftError] = useState('')
  const [discountError, setDiscountError] = useState('')
  const [giftApplied, setGiftApplied] = useState(false)
  const [discountApplied, setDiscountApplied] = useState(false)

  useEffect(() => {
    if (!user) return

    setForm(current => ({
      ...current,
      name: current.name || user.displayName || '',
      email: current.email || user.email || '',
    }))
  }, [user])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function close() {
    setIsOpen(false)
    setView('cart')
    setError('')
    setGiftCode('')
    setDiscountCode('')
    setGiftDiscount(0)
    setDiscountAmount(0)
    setGiftError('')
    setDiscountError('')
    setGiftApplied(false)
    setDiscountApplied(false)
  }

  async function applyGiftCode() {
    setGiftError('')
    if (!giftCode.trim()) return
    const res = await fetch(VALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: giftCode, amount: total, codeType: 'giftcard' }),
    })
    const data = await res.json()
    if (data.valid) {
      setGiftDiscount(data.discount)
      setGiftApplied(true)
    } else {
      setGiftError(data.error || 'Ógildur gjafabréfskóði')
      setGiftDiscount(0)
      setGiftApplied(false)
    }
  }

  async function applyDiscountCode() {
    setDiscountError('')
    if (!discountCode.trim()) return
    const res = await fetch(VALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: discountCode, amount: total, codeType: 'discount' }),
    })
    const data = await res.json()
    if (data.valid) {
      setDiscountAmount(data.discount)
      setDiscountApplied(true)
    } else {
      setDiscountError('Ógildur afsláttarkóði')
      setDiscountAmount(0)
      setDiscountApplied(false)
    }
  }

  function handleGoToCheckout() {
    if (!user) {
      setError('Þú þarft að skrá þig inn áður en þú ferð í greiðslu.')
      openAuthModal('signIn')
      return
    }

    setError('')
    setView('checkout')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const finalTotal = Math.max(0, total - giftDiscount - discountAmount)
    try {
      const orderId = `MS-${Date.now()}`
      const itemsSummary = items.map(i => `${i.product.name}${i.size ? ` (${i.size})` : ''} x${i.qty}`).join(' | ')
      const cartItems = items.map(i => {
        let stockKey = null, initialStock = null
        if (i.product.noSizeStock !== undefined && !i.size) {
          stockKey = `${i.product.id}-nosize`
          initialStock = i.product.noSizeStock
        } else if (i.size) {
          const sizeForKey = i.size.includes(' \u2014 ') ? i.size.split(' \u2014 ')[0] : i.size
          stockKey = `${i.product.id}-${sizeForKey}`
          initialStock = i.product.stock?.[sizeForKey] ?? 1
        }
        return { productId: i.product.id, name: i.product.name, size: i.size, qty: i.qty, stockKey, initialStock }
      })
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotal,
          currency: 'ISK',
          orderId,
          cartItems,
          successUrl: `${window.location.origin}?payment=success&order=${orderId}`,
          cancelUrl: window.location.origin,
          metadata: {
            items: itemsSummary,
            customer: form.name,
            email: form.email,
            phone: form.phone,
            address: `${form.address}, ${form.zip} ${form.city}`,
            note: form.note,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.checkout_url) {
        throw new Error(data.error ? JSON.stringify(data.error) : 'Villa við greiðslu')
      }
      clearCart()
      window.location.href = data.checkout_url
    } catch (err) {
      setError(err.message || 'Eitthvað fór úrskeiðis. Reyndu aftur.')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={e => e.target === e.currentTarget && close()}>
      <div className="cart">
        <div className="cart__header">
          <h2 className="cart__title">
            Karfa {count > 0 && <span className="cart__badge">{count}</span>}
          </h2>
          <button className="cart__close" onClick={close}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p>Karfan er tóm</p>
          </div>
        ) : view === 'cart' ? (
          <>
            <div className="cart__items">
              {items.map(item => {
                const price = parseInt(item.product.price.replace(/[^0-9]/g, ''), 10)
                return (
                  <div key={item.key} className="cart__item">
                    <img src={item.product.img} alt={item.product.name} className="cart__item-img" />
                    <div className="cart__item-info">
                      <div className="cart__item-name">{item.product.name}</div>
                      {item.size && <div className="cart__item-size">Stærð: {item.size}</div>}
                      <div className="cart__item-price">{(price * item.qty).toLocaleString('is-IS')} kr</div>
                    </div>
                    <div className="cart__item-controls">
                      <div className="cart__qty">
                        <button onClick={() => updateQty(item.key, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, 1)}>+</button>
                      </div>
                      <button className="cart__remove" onClick={() => removeItem(item.key)}>Eyða</button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="cart__footer">
              <div className="cart__total">Samtals: <strong>{total.toLocaleString('is-IS')} kr</strong></div>

              <div className="cart__code-section">
                <label className="cart__code-label">Gjafabréf</label>
                <div className="cart__code-row">
                  <input
                    className="cart__code-input"
                    value={giftCode}
                    onChange={e => { setGiftCode(e.target.value); setGiftApplied(false); setGiftDiscount(0); setGiftError('') }}
                    placeholder="Sláðu inn gjafabréfskóða"
                    disabled={giftApplied}
                  />
                  <button type="button" className="cart__code-btn" onClick={applyGiftCode} disabled={giftApplied}>
                    {giftApplied ? '✓' : 'Nota'}
                  </button>
                </div>
                {giftError && <div className="cart__code-error">{giftError}</div>}
                {giftApplied && <div className="cart__code-success">−{giftDiscount.toLocaleString('is-IS')} kr af gjafabréfi</div>}
              </div>

              <div className="cart__code-section">
                <label className="cart__code-label">Afsláttarkóði</label>
                <div className="cart__code-row">
                  <input
                    className="cart__code-input"
                    value={discountCode}
                    onChange={e => { setDiscountCode(e.target.value); setDiscountApplied(false); setDiscountAmount(0); setDiscountError('') }}
                    placeholder="Sláðu inn afsláttarkóða"
                    disabled={discountApplied}
                  />
                  <button type="button" className="cart__code-btn" onClick={applyDiscountCode} disabled={discountApplied}>
                    {discountApplied ? '✓' : 'Nota'}
                  </button>
                </div>
                {discountError && <div className="cart__code-error">{discountError}</div>}
                {discountApplied && <div className="cart__code-success">−{discountAmount.toLocaleString('is-IS')} kr afsláttur</div>}
              </div>

              {(giftDiscount > 0 || discountAmount > 0) && (
                <div className="cart__total cart__total--final">
                  Til greiðslu: <strong>{Math.max(0, total - giftDiscount - discountAmount).toLocaleString('is-IS')} kr</strong>
                </div>
              )}

              {error && <div className="cart__error">{error}</div>}
              <button className="cart__checkout-btn" onClick={handleGoToCheckout}>
                Greiða {Math.max(0, total - giftDiscount - discountAmount).toLocaleString('is-IS')} kr →
              </button>
              <button className="cart__continue-btn" onClick={close}>
                ← Halda áfram að versla
              </button>
            </div>
          </>
        ) : (
          <form className="cart__form" onSubmit={handleSubmit}>
            <button type="button" className="cart__back" onClick={() => { setView('cart'); setError('') }}>
              ← Til baka í körfu
            </button>
            <div className="cart__form-total">
              Samtals: <strong>{total.toLocaleString('is-IS')} kr</strong>
            </div>

            <div className="cart__field">
              <label>Fullt nafn</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jón Jónsson" />
            </div>
            <div className="cart__row">
              <div className="cart__field">
                <label>Netfang</label>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="jon@gmail.com" />
              </div>
              <div className="cart__field">
                <label>Símanúmer</label>
                <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="5551234" />
              </div>
            </div>
            <div className="cart__field">
              <label>Heimilisfang</label>
              <input required value={form.address} onChange={e => set('address', e.target.value)} placeholder="Laugavegur 1" />
            </div>
            <div className="cart__row">
              <div className="cart__field">
                <label>Póstnúmer</label>
                <input required value={form.zip} onChange={e => set('zip', e.target.value)} placeholder="101" />
              </div>
              <div className="cart__field">
                <label>Borg</label>
                <input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="Reykjavík" />
              </div>
            </div>
            <div className="cart__field">
              <label>Athugasemd <span>(valfrjálst)</span></label>
              <textarea value={form.note} onChange={e => set('note', e.target.value)} rows={2} placeholder="Séróskir fyrirmæli..." />
            </div>

            {error && <div className="cart__error">{error}</div>}

            <button type="submit" className="cart__pay-btn" disabled={loading}>
              {loading ? 'Hinkra...' : `Greiða ${Math.max(0, total - giftDiscount - discountAmount).toLocaleString('is-IS')} kr`}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
