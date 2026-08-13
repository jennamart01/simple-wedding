import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Fitur', id: 'features' },
  { label: 'Tema', id: 'themes' },
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

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > 120 && y > lastY)
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
    <header
      className={`cmp-nav ${scrolled ? 'cmp-nav-scrolled' : ''} ${hidden ? 'cmp-nav-hidden' : ''}`}
    >
      <a
        className="cmp-logo"
        href="#/"
        onClick={(e) => {
          e.preventDefault()
          setMenuOpen(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Neo Digitalizer
      </a>

      <nav className="cmp-nav-links">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} type="button" onClick={() => handleClick(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="cmp-nav-actions">
        <a className="cmp-cta-btn" href="https://wa.me/6281234567890">
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
          <a className="cmp-cta-btn" href="https://wa.me/6281234567890" onClick={() => setMenuOpen(false)}>
            <MessageCircle size={16} /> Pesan Sekarang
          </a>
        </div>
      )}
    </header>
  )
}

export default CompanyHeader