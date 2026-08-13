import React from 'react';
import styles from './Couple.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';
import { useTheme } from '../context/ThemeContext';

import groomImg from '../assets/images/groom.jpg';
import brideImg from '../assets/images/bride.jpg';

const Couple: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();
  const theme = useTheme();

  return (
    <section id="couple" className={`${styles.couple} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <p className={styles.intro}>Assalamu’alaikum Warahmatullahi Wabarakatuh</p>
      <p className={styles.subIntro}>Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan di antara kami untuk melangsungkan pernikahan kami.</p>
      
      <div className={styles.grid}>
        <div className={styles.person}>
          <div className={styles.imagePlaceholder}>
            <img src={groomImg} alt="Groom" />
          </div>
          <h2 className={styles.name}>{theme.groom.name}</h2>
          <p className={styles.parents}>{theme.groom.parents}</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.igLink}>{theme.groom.ig}</a>
        </div>

        <div className={styles.ampersand}>&</div>

        <div className={styles.person}>
          <div className={styles.imagePlaceholder}>
            <img src={brideImg} alt="Bride" />
          </div>
          <h2 className={styles.name}>{theme.bride.name}</h2>
          <p className={styles.parents}>{theme.bride.parents}</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.igLink}>{theme.bride.ig}</a>
        </div>
      </div>
    </section>
  );
};

export default Couple;
