import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__overlay" />
        <div className="hero__logo-bg">
          <img src="/logo.png" alt="" />
        </div>
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__content-left">
            <h1 className="hero__title">
              KNATTSPYRNU<br />
              <span>BÚNAÐUR</span><br />
              FYRIR KRAKKANA
            </h1>
            <p className="hero__desc">
              Nike takka og gervigras skór, legghlífar, sokkar, markmannshanskar og fleira.<br />
              Netverslun á Islandi — 1-5 daga afhending.
            </p>
            <div className="hero__actions">
              <a href="#featured" className="hero__btn-primary">Skoðaðu vörur</a>
              <a href="#about" className="hero__btn-ghost">Um okkur</a>
            </div>
          </div>

        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">Akranes</span>
            <span className="hero__stat-label">Við erum staðsett á Akranesi</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">Frí afhending</span>
            <span className="hero__stat-label">Á Akranesi</span>
          </div>
        </div>
      </div>
    </section>
  )
}
