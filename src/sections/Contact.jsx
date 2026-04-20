import { useState } from 'react'
import './Contact.css'

const SEND_CONTACT_URL = 'https://europe-west1-maliasport.cloudfunctions.net/sendContactEmail'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!res.ok) throw new Error('Villa við sendingu')
      setSent(true)
    } catch (e) {
      console.error('Contact email villa:', e)
      setError('Villa kom upp við sendingu. Reyndu aftur eða sendu beint á maliasport@maliasport.is')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__info">
          <span className="contact__eyebrow">Hafðu samband</span>
          <h2 className="contact__title">
            TALAÐU<br />
            <span>VIÐ OKKUR</span>
          </h2>
          <p className="contact__desc">
            Hefurðu spurningar um vörur, sendingar eða annað?<br />
            Við svörum eins fljótt og við getum.
          </p>

          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-label">Netfang</span>
              <a href="mailto:maliasport@maliasport.is" className="contact__detail-val">
                maliasport@maliasport.is
              </a>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Vefur</span>
              <a href="https://maliasport.is" className="contact__detail-val">
                maliasport.is
              </a>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Staðsetning</span>
              <span className="contact__detail-val">Akranes, Ísland</span>
            </div>
          </div>
        </div>

        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__success">
              <span className="contact__success-icon">✓</span>
              <p>Takk! Við höfum samband við þig fljótlega.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__label" htmlFor="name">Nafn</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="Jón Jónsson"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="email">Netfang</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="jon@example.is"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="message">Skilaboð</label>
                <textarea
                  id="message"
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="Hvernig getum við hjálpað?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="contact__submit" disabled={loading}>
                {loading ? 'Sendi...' : 'Senda skilaboð →'}
              </button>
              {error && <div className="contact__error">{error}</div>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
