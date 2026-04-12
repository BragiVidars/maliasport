import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setIsOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
        </a>

        <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}>
          <a href="#categories" className="navbar__link" onClick={() => setMenuOpen(false)}>Vörur</a>
          <a href="#featured" className="navbar__link" onClick={() => setMenuOpen(false)}>Úrval</a>
          <a href="#about" className="navbar__link" onClick={() => setMenuOpen(false)}>Um okkur</a>
          <a href="#contact" className="navbar__link" onClick={() => setMenuOpen(false)}>Hafðu samband</a>
          <a href="#skilmalar" className="navbar__link" onClick={() => setMenuOpen(false)}>Skilmálar</a>
          <a href="#contact" className="navbar__cta" onClick={() => setMenuOpen(false)}>Versla núna</a>
        </nav>

        <div className="navbar__actions">
          <button className="navbar__cart-btn" onClick={() => setIsOpen(true)} aria-label="Karfa">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {count > 0 && <span className="navbar__cart-count">{count}</span>}
          </button>
          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Valmynd"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
