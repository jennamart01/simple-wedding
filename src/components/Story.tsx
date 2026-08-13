import React from 'react';
import styles from './Story.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';


const Story: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();

  const stories = [
    {
      date: '16 Oktober 2024',
      title: 'Pertemuan yang Diridhai',
      desc: 'Subhanallah, Allah pertemukan kami di sebuah kajian ilmiah. Kegemaran yang sama dalam menuntut ilmu menjadi jembatan yang mendekatkan hati kami dalam naungan ridha-Nya.'
    },
    {
      date: '14 Desember 2024',
      title: 'Proses Taaruf',
      desc: 'Dengan bimbingan ustadz dan restu orang tua, kami memulai proses taaruf yang Islami. Saling mengenal kepribadian dan visi rumah tangga dalam bingkai syariat.'
    },
    {
      date: '15 Maret 2025',
      title: 'Khitbah & Pertunangan',
      desc: 'Alhamdulillah, hari yang penuh berkah saat kedua keluarga bertemu dan menyatukan niat suci untuk membangun rumah tangga yang sakinah, mawaddah, warahmah.'
    }
  ];

  return (
    <section id="story" className={`${styles.story} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <h2 className={styles.heading}>Perjalanan Menuju Ikatan Suci</h2>
      <div className={styles.timeline}>
        {stories.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <span className={styles.date}>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Story;
