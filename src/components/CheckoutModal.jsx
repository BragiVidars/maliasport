import { useState } from 'react'
import './CheckoutModal.css'

const FUNCTION_URL = 'https://europe-west1-maliasport.cloudfunctions.net/createCheckout'

export default function CheckoutModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    size: '',
    note: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const priceNumber = parseInt(product.price.replace(/[^0-9]/g, ''), 10)
  const hasVariants = !!product.variants

  // Parse sizes from variants string e.g. "Stærðir: 33–38 ½"
  const sizeOptions = hasVariants ? parseSizes(product.variants) : []

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (hasVariants && !form.size) {
      setError('Vinsamlegast veldu stærð')
      return
    }

    setLoading(true)
    try {
      const orderId = `MS-${Date.now()}`
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: priceNumber,
          currency: 'ISK',
          orderId,
          successUrl: `${window.location.origin}?payment=success&order=${orderId}`,
          cancelUrl: window.location.origin,
          metadata: {
            product: product.name,
            size: form.size,
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
        throw new Error(data.error || 'Villa við greiðslu')
      }

      window.location.href = data.checkout_url
    } catch (err) {
      setError(err.message || 'Eitthvað fór úrskeiðis. Reyndu aftur.')
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>✕</button>

        <div className="modal__product">
          <img src={product.img} alt={product.name} className="modal__product-img" />
          <div>
            <div className="modal__product-name">{product.name}</div>
            <div className="modal__product-price">{product.price}</div>
          </div>
        </div>

        <h2 className="modal__title">Pöntunarform</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__field">
            <label className="modal__label">Fullt nafn</label>
            <input className="modal__input" required value={form.name} onChange={e => set('name', e.target.value)} />
          </div>

          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label">Netfang</label>
              <input className="modal__input" type="email" required value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="modal__field">
              <label className="modal__label">Símanúmer</label>
              <input className="modal__input" type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>

          <div className="modal__field">
            <label className="modal__label">Heimilisfang</label>
            <input className="modal__input" required value={form.address} onChange={e => set('address', e.target.value)} />
          </div>

          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label">Póstnúmer</label>
              <input className="modal__input" required value={form.zip} onChange={e => set('zip', e.target.value)} />
            </div>
            <div className="modal__field">
              <label className="modal__label">Staður</label>
              <input className="modal__input" required value={form.city} onChange={e => set('city', e.target.value)} />
            </div>
          </div>

          {sizeOptions.length > 0 && (
            <div className="modal__field">
              <label className="modal__label">Stærð</label>
              <select className="modal__select" required value={form.size} onChange={e => set('size', e.target.value)}>
                <option value="">Veldu stærð...</option>
                {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div className="modal__field">
            <label className="modal__label">Athugasemd (valfrjálst)</label>
            <input className="modal__input" value={form.note} onChange={e => set('note', e.target.value)} />
          </div>

          {error && <p className="modal__error">{error}</p>}

          <button className="modal__submit" type="submit" disabled={loading}>
            {loading ? 'Hinkraðu...' : `Greiða ${product.price}`}
          </button>
        </form>
      </div>
    </div>
  )
}

function parseSizes(variants) {
  // e.g. "Stærðir: 33–38 ½" or "Margar litar & stærðir" or "Stærðir: 4–6"
  const match = variants.match(/(\d[\d\s½–\-]+)/)
  if (!match) return []
  const parts = match[0].split(/[–\-]/).map(s => s.trim()).filter(Boolean)
  if (parts.length === 2) {
    const start = parseFloat(parts[0])
    const end = parseFloat(parts[1].replace('½', '.5'))
    const sizes = []
    for (let i = start; i <= end; i += 0.5) {
      sizes.push(i % 1 === 0 ? `${i}` : `${Math.floor(i)} ½`)
    }
    return sizes
  }
  return parts
}
