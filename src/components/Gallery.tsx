import React from 'react';
import styles from './Gallery.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';


import img1 from '../assets/images/gallery-1.jpg';
import img2 from '../assets/images/gallery-2.jpg';
import img3 from '../assets/images/gallery-3.jpg';
import img4 from '../assets/images/gallery-4.jpg';
import img5 from '../assets/images/gallery-5.jpg';
import img6 from '../assets/images/gallery-6.jpg';

const Gallery: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();

  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <section id="gallery" className={`${styles.gallery} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <h2 className={styles.heading}>Galeri Kami</h2>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div key={i} className={styles.item}>
            <img src={img} alt={`Wedding Gallery ${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
