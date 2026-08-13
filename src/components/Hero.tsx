import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { FlourishDivider } from './Ornaments';
import SectionOrnaments from './SectionOrnaments';
import { Mail } from 'lucide-react';

interface Props {
  guestName: string;
  onOpen: () => void;
}

const Hero: React.FC<Props> = ({ guestName, onOpen }) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    onOpen();
  };

  return (
    <section id="home" className={styles.hero}>
      <SectionOrnaments />
      <div 
        className={styles.parallaxBg} 
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <Mail className={styles.mailIcon} />
        <p className={styles.subtitle}>Pernikahan</p>
        <h1 className={styles.title}>Ahmad & Fatimah</h1>
        <FlourishDivider className={styles.divider} />
        <p className={styles.date}>Sabtu, 12 September 2026</p>
        <p className={styles.guestLabel}>Kepada Yth.</p>
        <p className={styles.guestName}>{guestName}</p>
        <button className="button" style={{ marginTop: '20px' }} onClick={handleClick}>
          Buka Undangan
        </button>
      </div>
    </section>
  );
};

export default Hero;
