import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown: React.FC = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-09-12T10:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.countdown}>
      <div className={styles.item}>
        <span className={styles.number}>{timeLeft.days}</span>
        <span className={styles.label}>Hari</span>
      </div>
      <div className={styles.item}>
        <span className={styles.number}>{timeLeft.hours}</span>
        <span className={styles.label}>Jam</span>
      </div>
      <div className={styles.item}>
        <span className={styles.number}>{timeLeft.minutes}</span>
        <span className={styles.label}>Menit</span>
      </div>
      <div className={styles.item}>
        <span className={styles.number}>{timeLeft.seconds}</span>
        <span className={styles.label}>Detik</span>
      </div>
    </div>
  );
};

export default Countdown;
