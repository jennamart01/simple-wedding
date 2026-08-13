import React from 'react';
import { Home, Users, BookOpen, Calendar, Image, Gift, MessageSquare, Heart } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <button onClick={() => scrollToSection('home')} className={styles.navBtn}>
            <Home size={18} />
            <span>Beranda</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('couple')} className={styles.navBtn}>
            <Users size={18} />
            <span>Mempelai</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('story')} className={styles.navBtn}>
            <BookOpen size={18} />
            <span>Cerita</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('details')} className={styles.navBtn}>
            <Calendar size={18} />
            <span>Acara</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('gallery')} className={styles.navBtn}>
            <Image size={18} />
            <span>Galeri</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('gift')} className={styles.navBtn}>
            <Gift size={18} />
            <span>Hadiah</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('rsvp')} className={styles.navBtn}>
            <MessageSquare size={18} />
            <span>Konfirmasi</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('guestbook')} className={styles.navBtn}>
            <Heart size={18} />
            <span>Ucapan</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
