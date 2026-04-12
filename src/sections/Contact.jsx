import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Replace with actual form submission (Firebase / EmailJS etc.)
    setSent(true)
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
              <a href="mailto:maliasportehf@gmail.com" className="contact__detail-val">
                maliasportehf@gmail.com
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
              <button type="submit" className="contact__submit">
                Senda skilaboð →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
