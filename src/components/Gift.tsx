import React from 'react';
import styles from './Gift.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';

import bcaLogo from '../assets/images/bca.svg';
import shopeepayLogo from '../assets/images/shopeepay.jpg';

const Gift: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <section id="gift" className={`${styles.gift} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <h2 className={styles.heading}>Tanda Kasih</h2>
      <p className={styles.subHeading}>Doa restu Anda adalah hadiah terindah bagi kami. Jika ingin memberi tanda kasih, silakan salurkan melalui:</p>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <img src={bcaLogo} alt="BCA" className={styles.bankLogo} />
          <p className={styles.accountNumber}>1234567890</p>
          <p className={styles.accountName}>A/N FATIMAH AZ-ZAHRA</p>
          <button className={styles.copyBtn} onClick={() => handleCopy('1234567890')}>Salin Nomor</button>
        </div>

        <div className={styles.card}>
          <img src={shopeepayLogo} alt="ShopeePay" className={styles.bankLogo} />
          <p className={styles.accountNumber}>08123456789</p>
          <p className={styles.accountName}>A/N FATIMAH AZ-ZAHRA</p>
          <button className={styles.copyBtn} onClick={() => handleCopy('08123456789')}>Salin Nomor</button>
        </div>
      </div>
    </section>
  );
};

export default Gift;
