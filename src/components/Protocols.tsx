import React from 'react';
import styles from './Protocols.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';


const Protocols: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();

  const protocols = [
    { icon: '🤲', title: 'Berdoa Bersama', desc: 'Mari doakan kedua mempelai agar menjadi keluarga yang sakinah, mawaddah, warahmah.' },
    { icon: '👔', title: 'Berpakaian Sopan', desc: 'Kenakan pakaian muslim terbaik Anda sebagai bentuk syukur dan penghormatan.' },
    { icon: '🤝', title: 'Jaga Adab', desc: 'Bersalaman dengan mahram dan jaga pandangan selama acara berlangsung.' },
    { icon: '⏰', title: 'Tepat Waktu', desc: 'Datanglah sebelum acara dimulai agar mengikuti rangkaian acara dengan khusyuk.' }
  ];

  return (
    <section className={`${styles.protocols} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <h2 className={styles.heading}>Adab & Informasi</h2>
      <p className={styles.subHeading}>Demi kelancaran dan keberkahan acara, mohon kiranya para tamu undangan dapat memperhatikan hal-hal berikut:</p>
      
      <div className={styles.grid}>
        {protocols.map((p, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.icon}>{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Protocols;
