import React, { useState, useEffect } from 'react';
import styles from './GuestBook.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionOrnaments from './SectionOrnaments';
import { APP_SCRIPT_URL, SECRET_TOKEN } from '../config';

interface Message {
  name: string;
  text: string;
  date: string;
}

const GuestBook: React.FC = () => {
  const { domRef, isVisible } = useScrollReveal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  const loadMessages = async () => {
    try {
      const res = await fetch(`${APP_SCRIPT_URL}?action=guestbook&t=${encodeURIComponent(SECRET_TOKEN)}`);
      const json = await res.json();
      if (json.ok) {
        setMessages(json.data || []);
      }
    } catch {
      // gagal memuat, biarkan list kosong
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;

    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(APP_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'guestbook', token: SECRET_TOKEN, name: newName, text: newText })
      });
      // mode no-cors tidak mengembalikan body; anggap sukses jika tidak throw
      if (res.type !== 'opaque') {
        const json = await res.json().catch(() => null);
        if (json && !json.ok) throw new Error(json.message);
      }
      setNewName('');
      setNewText('');
      setStatus('Ucapan & doa berhasil dikirim.');
      loadMessages();
    } catch (err) {
      setStatus('Gagal mengirim. Coba lagi.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className={`${styles.guestbook} reveal ${isVisible ? 'visible' : ''}`} ref={domRef}>
      <SectionOrnaments />
      <h2 className={styles.heading}>Ucapan & Doa</h2>
      <p className={styles.subHeading}>Berikan ucapan manis dan doa restu Anda untuk kedua mempelai.</p>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama Anda"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <textarea
            placeholder="Tulis ucapan & doa..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
          {status && <p className={styles.status}>{status}</p>}
        </form>

        <div className={styles.list}>
          {loading ? (
            <p className={styles.status}>Memuat ucapan...</p>
          ) : messages.length === 0 ? (
            <p className={styles.status}>Belum ada ucapan. Jadilah yang pertama!</p>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={styles.messageItem}>
                <div className={styles.avatar}>{m.name.charAt(0)}</div>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <h4>{m.name}</h4>
                    <span>{m.date}</span>
                  </div>
                  <p>{m.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestBook;