import React from 'react';
import styles from './EventDetails.module.css';
import { FloralDivider } from './Ornaments';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';
import Countdown from './Countdown';

const EventDetails: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();

  return (
    <section id="details" className={`${styles.details} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <h2 className={styles.heading}>Detail Acara</h2>
      <FloralDivider className={styles.divider} />
      <Countdown />
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Akad Nikah</h3>
          <p className={styles.time}>08:00 - 10:00 WIB</p>
          <p className={styles.venue}>Masjid Raya Al-Ikhlas</p>
          <p className={styles.address}>Jl. Merdeka No. 20, Jakarta Pusat</p>
          <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
            Lihat Peta
          </a>
        </div>

        <div className={styles.card}>
          <h3>Resepsi / Walimah</h3>
          <p className={styles.time}>11:00 - 14:00 WIB</p>
          <p className={styles.venue}>Gedung Serbaguna As-Salam</p>
          <p className={styles.address}>Jl. Diponegoro No. 45, Jakarta Selatan</p>
          <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
            Lihat Peta
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
