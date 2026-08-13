import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Quote from '../components/Quote'
import Couple from '../components/Couple'
import Story from '../components/Story'
import EventDetails from '../components/EventDetails'
import Gallery from '../components/Gallery'
import RSVP from '../components/RSVP'
import GuestBook from '../components/GuestBook'
import Gift from '../components/Gift'
import Protocols from '../components/Protocols'
import Footer from '../components/Footer'
import MusicPlayer from '../components/MusicPlayer'
import { useSearchParams } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeProvider'

function ExampleInvitation({ themeSlug }: { themeSlug: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const guestName = searchParams.get('to') || 'Bapak/Ibu/Saudara/i'

  useEffect(() => {
    const html = document.documentElement
    if (isOpen) {
      document.body.style.overflow = ''
      html.style.overflow = ''
      const t = setTimeout(() => {
        document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
      return () => clearTimeout(t)
    } else {
      document.body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
      html.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleOpen = () => setIsOpen(true)

  return (
    <ThemeProvider slug={themeSlug}>
      <div className="app-shell">
        <MusicPlayer isOpen={isOpen} />
        {isOpen && <Navbar />}
        <main className="app-frame">
          <Hero guestName={guestName} onOpen={handleOpen} />
          <Quote />
          <Couple />
          <Story />
          <EventDetails />
          <Gallery />
          <Gift />
          <Protocols />
          <RSVP />
          <GuestBook />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default ExampleInvitation