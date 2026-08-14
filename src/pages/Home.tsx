import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Palette,
  Users,
  Music,
  Wallet,
  ClipboardList,
  Camera,
  QrCode,
  Share2,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Star,
  Check,
} from 'lucide-react'
import './company.css'
import CompanyHeader from '../components/CompanyHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { THEMES } from '../themes'

const HERO_SLIDES = THEMES.map((t) => ({
  src: `${import.meta.env.BASE_URL}examples/${t.slug}.png`,
  label: t.name,
}))

const STATS = [
  { value: 50, suffix: '+', label: 'Pasangan Dipercaya' },
  { value: 120, suffix: '+', label: 'Undangan Dibagikan' },
  { value: 100, suffix: '%', label: 'Kepuasan Pelanggan' },
  { value: 24, suffix: '/7', label: 'Support Pelanggan' },
]

const FEATURES = [
  { icon: Palette, title: 'Desain Eksklusif', desc: 'Tema premium dan modern yang mengikuti tren, cocok untuk berbagai konsep acara.' },
  { icon: Users, title: 'Personalisasi Tamu', desc: 'Setiap tamu dipanggil namanya langsung di undangan agar terasa lebih istimewa.' },
  { icon: Music, title: 'Musik Latar', desc: 'Backsound favorit yang membuat undangan terasa hidup dan berkesan.' },
  { icon: Wallet, title: 'Kado Cashless', desc: 'Terima hadiah via transfer rekening atau e-wallet, tanpa repot amplop fisik.' },
  { icon: ClipboardList, title: 'RSVP Online', desc: 'Konfirmasi kehadiran tamu tercatat otomatis dan bisa dipantau real-time.' },
  { icon: Camera, title: 'Galeri Foto & Video', desc: 'Tampilkan momen prewedding dan video kenangan langsung di undangan.' },
  { icon: QrCode, title: 'QR Code Unik', desc: 'Undangan digital bisa dibagikan lewat QR, memudahkan tamu mengakses.' },
  { icon: Share2, title: 'Mudah Dibagikan', desc: 'Cukup satu link, sebar ke seluruh tamu via WhatsApp, IG, atau Telegram.' },
]

const STEPS = [
  { title: 'Pilih Tema', desc: 'Pilih desain undangan yang paling cocok dengan konsep acaramu.' },
  { title: 'Isi Data Acara', desc: 'Lengkapi nama, tanggal, lokasi, dan detail acara lainnya.' },
  { title: 'Tambah Foto & Musik', desc: 'Unggah galeri foto dan pilih musik latar favorit.' },
  { title: 'Bagikan Link', desc: 'Sebarkan undangan ke seluruh tamu lewat satu link atau QR Code.' },
]

const PACKAGES = [
  {
    name: 'Starter',
    price: 25000,
    tagline: 'Paket hemat untuk kebutuhan dasar',
    popular: false,
    features: [
      '1 tema undangan digital',
      'Cover & rincian acara',
      'Musik latar',
      'Fitur kado & amplop digital',
    ],
  },
  {
    name: 'Premium',
    price: 35000,
    tagline: 'Paling laris, semua fitur sudah termasuk',
    popular: true,
    features: [
      'Semua fitur Starter',
      'RSVP Online real-time',
      'Galeri foto & video',
      'QR Code unik',
      'Dukungan prioritas',
    ],
  },
]

const TESTIMONIALS = [
  {
    name: 'Rina & Andi',
    city: 'Yogyakarta',
    text: 'Tamunya suka banget sama desainnya. Semua bantuan bisa lewat fitur amplop digital, praktis!',
  },
  {
    name: 'Sari & Budi',
    city: 'Jakarta',
    text: 'Prosesnya cepet dan hasilnya mewah. Tamu di luar kota juga bisa lihat detail acara dengan mudah.',
  },
  {
    name: 'Maya & Rian',
    city: 'Bandung',
    text: 'Musik latar dan animasinya bikin undangan terasa hidup. Banyak yang tanya dibuat dengan apa.',
  },
  {
    name: 'Lina & Doni',
    city: 'Kediri',
    text: 'Harganya paling terjangkau tapi fiturnya lengkap. Langsung dapat semua tanpa ribet upload file.',
  },
  {
    name: 'Dewi & Farid',
    city: 'Nganjuk',
    text: 'Sangat membantu karena bisa pantau RSVP tamu secara langsung lewat dashbord. Praktis banget!',
  },
  {
    name: 'Nadia & Raka',
    city: 'Madiun',
    text: 'Desainnya elegan dan pengiriman undangannya cepat. Tamu di luar kota juga mudah mengakses.',
  },
  {
    name: 'Amalia & Rizky',
    city: 'Bojonegoro',
    text: 'QR code-nya memudahkan tamu membuka undangan langsung dari kartu. Keren dan berkesan.',
  },
  {
    name: 'Putri & Aji',
    city: 'Surabaya',
    text: 'Support-nya ramah dan fast respon. Revisi dikerjakan cepat tanpa perlu menunggu lama.',
  },
]

const FAQS = [
  {
    q: 'Berapa lama proses pembuatan undangan?',
    a: 'Rata-rata 3–7 hari kerja tergantung kerumitan desain dan jumlah revisi. Kami mengutamakan kualitas tanpa menunda acara Anda.',
  },
  {
    q: 'Apakah bisa custom tema dan warna?',
    a: 'Bisa. Setiap undangan dibuat sesuai tema pernikahan, preferensi warna, dan selera Anda.',
  },
  {
    q: 'Bagaimana cara mengirim undangan ke tamu?',
    a: 'Anda akan menerima satu link undangan. Bagikan link tersebut lewat WhatsApp, email, atau media sosial lainnya.',
  },
  {
    q: 'Bisakah data RSVP dan tamu dilihat real-time?',
    a: 'Bisa. Konfirmasi hadir dan ucapan dari tamu tercatat otomatis dan bisa Anda pantau kapan saja.',
  },
]

type SectionProps = { children: ReactNode; id?: string }

function CompanySection({ children, id }: SectionProps) {
  return (
    <section id={id} className="cmp-section">
      {children}
    </section>
  )
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="cmp-title">
      <span className="cmp-kicker">{kicker}</span>
      <h2>{title}</h2>
      {subtitle && <p className="cmp-subtitle">{subtitle}</p>}    </div>
  )
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="cmp-marquee">
      <div className="cmp-marquee-track">
        {[...items, ...items, ...items].map((txt, i) => (
          <span className="cmp-marquee-item" key={i}>
            {txt}
          </span>
        ))}
      </div>
    </div>
  )
}

function Reveal({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right'
}) {
  const { domRef, isVisible } = useScrollReveal()
  return (
    <div
      ref={domRef}
      className={`reveal reveal-${direction} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <PhoneFrame className="cmp-hero-slider">
      <div
        className="cmp-hero-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {HERO_SLIDES.map((s) => (
          <div className="cmp-hero-slide" key={s.label}>
            <img src={s.src} alt={s.label} />
            <span className="cmp-hero-slide-label">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="cmp-hero-dots">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`cmp-hero-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </PhoneFrame>
  )
}

function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`cmp-phone ${className}`}>
      <div className="cmp-phone-screen">{children}</div>
    </div>
  )
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const { domRef, isVisible } = useScrollReveal()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start: number | null = null
    const duration = 1600
    const tick = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.round(value * p))
      if (p < 1) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isVisible, value])

  return (
    <div ref={domRef} className="cmp-stat-value">
      {count}
      {suffix}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`cmp-faq-item ${open ? 'open' : ''}`}>
      <button type="button" className="cmp-faq-q" onClick={() => setOpen((v) => !v)}>
        {q}
        <ChevronDown size={20} />
      </button>
      <div className={`cmp-faq-answer ${open ? 'open' : ''}`}>
        <p className="cmp-faq-a">{a}</p>
      </div>
    </div>
  )
}

function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const { domRef, isVisible } = useScrollReveal()

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <div ref={domRef} className={`reveal reveal-left ${isVisible ? 'visible' : ''}`}>
      <div className="cmp-slider">
        <div className="cmp-slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {TESTIMONIALS.map((t) => (
            <div className="cmp-slide" key={t.name}>
              <div className="cmp-testimonial">
                <div className="cmp-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="cmp-testimonial-text">"{t.text}"</p>
                <p className="cmp-testimonial-name">
                  {t.name} <span>— {t.city}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cmp-slider-controls">
        <button type="button" className="cmp-slider-arrow" onClick={() => go(-1)}>
          ‹
        </button>
        <div className="cmp-slider-dots">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`cmp-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Testimoni ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" className="cmp-slider-arrow" onClick={() => go(1)}>
          ›
        </button>
      </div>
    </div>
  )
}

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cmp-page">
      <CompanyHeader />

      <section className="cmp-hero">
        <span className="cmp-float cmp-float-1">✦</span>
        <span className="cmp-float cmp-float-2">★</span>
        <span className="cmp-float cmp-float-3">●</span>
        <span className="cmp-float cmp-float-4">♥</span>
        <span className="cmp-float cmp-float-5">✿</span>
        <div className="cmp-hero-text">
          <span className="cmp-hero-badge">Undangan Digital Premium</span>
          <h1>
            Undangan Digital <span>Modern & Elegan</span>, Siap Dibagikan dalam Hitungan Menit
          </h1>
          <p>
            Buat undangan digital yang cantik, cepat dan mudah diedit — lengkap dengan RSVP Online,
            Galeri, Musik, dan Kado Digital. Mulai dari Rp25.000, termurah dan praktis. Melayani
            Nganjuk, Kediri, Bojonegoro, Madiun, Jombang, Surabaya, dan Jakarta.
          </p>
          <div className="cmp-hero-actions">
            <button
              type="button"
              className="cmp-btn cmp-btn-primary"
              onClick={() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lihat Contoh <ArrowRight size={16} />
            </button>
            <a className="cmp-btn cmp-btn-ghost" href="https://wa.me/6289636957453">
              Konsultasi Gratis
            </a>
          </div>
        </div>
        <HeroSlider />
      </section>

      <section className="cmp-marquee-sec">
        <Marquee items={['Undangan Digital Termurah', 'Mulai Rp25.000', 'RSVP Online', 'Galeri & Musik', 'Kado Digital', 'QR Code']} />
      </section>

      <section className="cmp-stats">
        <div className="cmp-stats-inner">
          {STATS.map((s) => (
            <div className="cmp-stat" key={s.label}>
              <CountUp value={s.value} suffix={s.suffix} />
              <span className="cmp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <CompanySection id="features">
        <Reveal>
          <SectionTitle
            kicker="Fitur Lengkap"
            title="Mengapa Memilih Neo Digitalizer?"
            subtitle="Semua fitur yang Anda butuhkan untuk undangan yang berkesan dan praktis"
          />
        </Reveal>
        <div className="cmp-features">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Reveal key={title}>
              <div className="cmp-feature">
                <div className="cmp-feature-icon">
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </CompanySection>

      <CompanySection id="themes">
        <Reveal>
          <SectionTitle
            kicker="Pilihan Tema"
            title="Tema Undangan Siap Pakai"
            subtitle="Pilih desain favoritmu, langsung lihat demo tanpa ribet"
          />
        </Reveal>
        <div className="cmp-themes">
          {THEMES.map((t, i) => (
            <Reveal key={t.slug} direction={i % 2 === 0 ? 'left' : 'right'}>
              <Link className="cmp-theme-card" to={`/example/${t.slug}`}>
                <PhoneFrame className="cmp-theme-thumb">
                  <img src={`${import.meta.env.BASE_URL}examples/${t.slug}.png`} alt={t.name} />
                  <span className="cmp-theme-tag">Lihat Demo</span>
                </PhoneFrame>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </CompanySection>

      <CompanySection id="steps">
        <Reveal>
          <SectionTitle
            kicker="Cara Kerja"
            title="Buat Undangan dalam 4 Langkah Mudah"
            subtitle="Praktis dan cepat, tanpa perlu keahlian desain"
          />
        </Reveal>
        <div className="cmp-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.title}>
              <div className="cmp-step">
                <span className="cmp-step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </CompanySection>

      <CompanySection id="paket">
        <Reveal>
          <SectionTitle
            kicker="List Harga"
            title="Pilih Paket Sesuai Kebutuhan"
            subtitle="Mulai dari Rp25.000, sudah dapat semua fitur lengkap tanpa biaya tersembunyi"
          />
        </Reveal>
        <div className="cmp-pricing">
          {PACKAGES.map((pkg) => (
            <Reveal key={pkg.name}>
              <div className={`cmp-price-card ${pkg.popular ? 'popular' : ''}`}>
                {pkg.popular && <span className="cmp-price-badge">Paling Diminati</span>}
                <h3 className="cmp-price-name">{pkg.name}</h3>
                <p className="cmp-price-tagline">{pkg.tagline}</p>
                <div className="cmp-price-value">
                  <span className="cmp-price-currency">Rp</span>
                  {pkg.price.toLocaleString('id-ID')}
                </div>
                <div className="cmp-price-features">
                  {pkg.features.map((f) => (
                    <div className="cmp-price-feature" key={f}>
                      <Check size={16} /> <span>{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  className={`cmp-btn ${pkg.popular ? 'cmp-btn-primary' : 'cmp-btn-ghost'} cmp-price-cta`}
                  href="https://wa.me/6289636957453"
                >
                  Pilih {pkg.name}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </CompanySection>

      <CompanySection id="testimonials">
        <Reveal>
          <SectionTitle
            kicker="Testimoni"
            title="Kata Mereka"
            subtitle="Pasangan yang sudah mempercayakan undangan mereka kepada Neo Digitalizer"
          />
        </Reveal>
        <TestimonialSlider />
      </CompanySection>

      <CompanySection id="faq">
        <Reveal>
          <SectionTitle kicker="FAQ" title="Pertanyaan Umum" />
        </Reveal>
        <div className="cmp-faq">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} direction={i % 2 === 0 ? 'left' : 'right'}>
              <FaqItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </CompanySection>

      <CompanySection id="kontak">
        <Reveal>
          <div className="cmp-cta">
            <h2>Siap Membuat Undangan Impian Anda?</h2>
            <p>Hubungi kami sekarang untuk konsultasi gratis dan penawaran menarik.</p>
            <a className="cmp-btn cmp-btn-primary cmp-btn-lg" href="https://wa.me/6289636957453">
              <MessageCircle size={18} /> Chat WhatsApp
            </a>
          </div>
        </Reveal>
      </CompanySection>

      <section className="cmp-marquee-sec cmp-marquee-sec-bottom">
        <Marquee items={['Mulai Rp25.000', 'Semua Fitur Termasuk', 'Cepat & Praktis', 'Konsultasi Gratis', 'Chat WhatsApp']} />
      </section>

      <footer className="cmp-footer">
        <span className="cmp-logo cmp-logo-footer">
          <img className="cmp-logo-img" src={`${import.meta.env.BASE_URL}logo.png`} alt="Neo Digitalizer logo" />
          <span>Neo Digitalizer</span>
        </span>
        <p>Undangan Digital Premium © 2026. Dibuat dengan penuh cinta.</p>
        <p className="cmp-footer-cities">
          Melayani pengiriman undangan digital di <strong>Nganjuk</strong>, <strong>Kediri</strong>,{' '}
          <strong>Bojonegoro</strong>, <strong>Madiun</strong>, <strong>Jombang</strong>,{' '}
          <strong>Surabaya</strong>, <strong>Jakarta</strong>, dan seluruh Indonesia.
        </p>
      </footer>
    </div>
  )
}

export default Home