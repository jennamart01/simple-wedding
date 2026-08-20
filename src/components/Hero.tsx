import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { FlourishDivider } from './Ornaments';
import SectionOrnaments from './SectionOrnaments';
import { Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const openIcons = import.meta.glob(
  '../assets/*/icon-open.png',
  { eager: true, import: 'default' },
) as Record<string, string>;

interface Props {
  guestName: string;
  onOpen: () => void;
}

const Hero: React.FC<Props> = ({ guestName, onOpen }) => {
  const theme = useTheme();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    onOpen();
  };

  const iconOpen = openIcons[`../assets/${theme.slug}/icon-open.png`];
  const isRomanticDivider = theme.slug === 'romantic' && Boolean(iconOpen);

  return (
    <section id="home" className={styles.hero}>
      <SectionOrnaments />
      <div 
        className={styles.parallaxBg} 
        style={{ backgroundImage: `url('${theme.heroImage}')`, transform: `translateY(${offsetY * 0.5}px)` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <Mail className={styles.mailIcon} />
        <p className={styles.subtitle}>Pernikahan</p>
        <h1 className={styles.title}>{theme.couple}</h1>
        {isRomanticDivider ? (
          <img src={iconOpen} alt="" className={styles.dividerIcon} />
        ) : (
          <FlourishDivider className={styles.divider} />
        )}
        <p className={styles.date}>{theme.date}</p>
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
