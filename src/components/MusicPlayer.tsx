import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import styles from './MusicPlayer.module.css';

interface Props {
  isOpen: boolean;
}

const MusicPlayer: React.FC<Props> = ({ isOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [show, setShow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      if (!audioRef.current) {
        audioRef.current = new Audio(`${import.meta.env.BASE_URL}wedding-music.mp3`);
        audioRef.current.loop = true;
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`${import.meta.env.BASE_URL}wedding-music.mp3`);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!show) return null;

  return (
    <button className={`${styles.musicBtn} ${isPlaying ? styles.playing : ''}`} onClick={togglePlay} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
      {isPlaying ? <Pause size={22} /> : <Play size={22} />}
    </button>
  );
};

export default MusicPlayer;
