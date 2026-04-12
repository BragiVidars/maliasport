import './About.css'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&fit=crop&q=80"
            alt="Íþróttir á Akranesi"
            className="about__img"
          />
          <div className="about__img-badge">
            <span className="about__badge-year">Akranes</span>
          </div>
        </div>

        <div className="about__content">
          <span className="about__eyebrow">Um okkur</span>
          <h2 className="about__title">
            NETVERSLUN<br />
            <span>FYRIR ÞIG</span>
          </h2>
          <p className="about__text">
            Malía Sport ehf er netverslun á Akranesi sem sérhæfir sig í Nike 
            knattspyrnubúnaði fyrir börn og unglinga. Við bjóðum upp á úrval af takkaskóm, 
            gervigras skóm, legghlífum og markmannshönskum — allt beint frá Nike.
          </p>
          <p className="about__text">
            Við sendum um allt land. Pantaðu á maliasport.is og við sjáum um restina.
          </p>

          <div className="about__features">
            <div className="about__feature">
              <span className="about__feature-icon">✓</span>
              <span>Frí afhending á Akranesi</span>
            </div>
            <div className="about__feature">
              <span className="about__feature-icon">✓</span>
              <span>Nike takkaskór og gervigras skór</span>
            </div>
            <div className="about__feature">
              <span className="about__feature-icon">✓</span>
              <span>Legghlífar og markmannshanskar</span>
            </div>
          </div>

          <a href="#contact" className="about__cta">Hafðu samband →</a>
        </div>
      </div>
    </section>
  )
}
