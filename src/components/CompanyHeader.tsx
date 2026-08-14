import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle, ArrowUp } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Fitur', id: 'features' },
  { label: 'Tema', id: 'themes' },
  { label: 'Paket', id: 'paket' },
  { label: 'Cara Kerja', id: 'steps' },
  { label: 'Testimoni', id: 'testimonials' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Kontak', id: 'kontak' },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function CompanyHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [showToTop, setShowToTop] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > 120 && y > lastY)
      setShowToTop(y > lastY ? false : y > 300)
      lastY = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header
        className={`cmp-nav ${scrolled ? 'cmp-nav-scrolled' : ''} ${hidden ? 'cmp-nav-hidden' : ''}`}
      >
      <a
        className="cmp-logo"
        href="/simple-wedding/"
        onClick={(e) => {
          e.preventDefault()
          setMenuOpen(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <img className="cmp-logo-img" src={`${import.meta.env.BASE_URL}logo.png`} alt="Neo Digitalizer logo" />
        <span>Neo Digitalizer</span>
      </a>

      <nav className="cmp-nav-links">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} type="button" onClick={() => handleClick(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="cmp-nav-actions">
        <a className="cmp-cta-btn" href="https://wa.me/6289636957453">
          <MessageCircle size={16} />
          <span className="cmp-cta-text">Pesan Sekarang</span>
        </a>
        <button
          type="button"
          className="cmp-menu-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="cmp-nav-mobile">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} type="button" onClick={() => handleClick(item.id)}>
              {item.label}
            </button>
          ))}
          <a className="cmp-cta-btn" href="https://wa.me/6289636957453" onClick={() => setMenuOpen(false)}>
            <MessageCircle size={16} /> Pesan Sekarang
          </a>
        </div>
      )}

      </header>

      <button
        type="button"
        className={`cmp-fab cmp-fab-top ${showToTop ? 'visible' : ''}`}
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={20} />
      </button>
      <a
        className="cmp-fab cmp-fab-wa"
        href="https://wa.me/6289636957453"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </>
  )
}

export default CompanyHeader