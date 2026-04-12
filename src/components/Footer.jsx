import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            src="/logo.png"
            alt="Malía Sport"
            className="footer__logo-img"
          />
          <p className="footer__tagline">Íþróttavörur á Akranesi — sending um allt land</p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__col-title">Vörur</h4>
            <a href="#categories">Íþróttaföt</a>
            <a href="#categories">Skór</a>
            <a href="#categories">Búnaður</a>
            <a href="#categories">Aukahlutir</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Fyrirtækið</h4>
            <a href="#about">Um okkur</a>
            <a href="#contact">Hafðu samband</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Tengist okkur</h4>
            <a href="mailto:maliasportehf@gmail.com">maliasportehf@gmail.com</a>
            <a href="https://maliasport.is">maliasport.is</a>
            <a href="#skilmalar">Skilmálar</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {new Date().getFullYear()} Malía Sport ehf — Akranes, Ísland</span>
        <span>Öll réttindi áskilin</span>
      </div>
    </footer>
  )
}
