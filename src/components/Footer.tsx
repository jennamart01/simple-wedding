import React from 'react';
import styles from './Footer.module.css';
import { HeartSwirl } from './Ornaments';
import SectionOrnaments from './SectionOrnaments';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <footer className={styles.footer}>
      <SectionOrnaments />
      <HeartSwirl className={styles.icon} />
      <p className={styles.text}>Jazakumullahu Khairan atas doa dan kehadirannya.</p>
      <p className={styles.couple}>{theme.couple}</p>
      <p className={styles.credit}>Barakallahu lakuma wa baraka alaikuma</p>
    </footer>
  );
};

export default Footer;
