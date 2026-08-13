import React from 'react';
import styles from './Couple.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';

import groomImg from '../assets/images/groom.jpg';
import brideImg from '../assets/images/bride.jpg';

const Couple: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();

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
          <h2 className={styles.name}>Ahmad Fauzan</h2>
          <p className={styles.parents}>Putra dari Bpk. H. Supriyadi & Ibu Hj. Maryam</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.igLink}>@ahmadfauzan</a>
        </div>

        <div className={styles.ampersand}>&</div>

        <div className={styles.person}>
          <div className={styles.imagePlaceholder}>
            <img src={brideImg} alt="Bride" />
          </div>
          <h2 className={styles.name}>Fatimah Az-Zahra</h2>
          <p className={styles.parents}>Putri dari Bpk. H. Abdullah & Ibu Hj. Khadijah</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.igLink}>@fatimah_azzahra</a>
        </div>
      </div>
    </section>
  );
};

export default Couple;
