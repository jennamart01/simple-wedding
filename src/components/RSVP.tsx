import React, { useState } from 'react';
import styles from './RSVP.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';
import { APP_SCRIPT_URL, SECRET_TOKEN } from '../config';
import { useTheme } from '../context/ThemeContext';


const RSVP: React.FC = () => {
  const theme = useTheme();
  const { domRef, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: 'yes',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(APP_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'rsvp',
          token: SECRET_TOKEN,
          name: formData.name,
          guests: formData.guests,
          attendance: formData.attendance,
          message: formData.message
        })
      });
      if (res.type !== 'opaque') {
        const json = await res.json().catch(() => null);
        if (json && !json.ok) throw new Error(json.message);
      }
      alert(`Jazakumullahu Khairan ${formData.name}! Konfirmasi Anda telah tercatat.`);
      setFormData({ name: '', guests: '1', attendance: 'yes', message: '' });
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim konfirmasi. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className={`${styles.rsvp} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <div className={styles.container}>
        <h2>Konfirmasi Kehadiran</h2>
        <p>Mohon konfirmasi kehadiran sebelum {theme.rsvpDeadline}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="guests">Jumlah Tamu</label>
            <select
              id="guests"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
            >
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Kehadiran</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                 /> In Syaa Allah, Hadir
              </label>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                 /> Tidak Bisa Hadir
              </label>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Pesan (Opsional)</label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVP;