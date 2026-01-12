"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./MusicPlayer.module.css";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)", delay: 1.5 }
    );
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <button
        ref={buttonRef}
        onClick={togglePlay}
        className={`${styles.musicButton} ${isPlaying ? styles.playing : ""}`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <div className={styles.iconWrapper}>
          {isPlaying ? (
            <div className={styles.equalizer}>
              <span className={styles.eqBar} />
              <span className={styles.eqBar} />
              <span className={styles.eqBar} />
              <span className={styles.eqBar} />
            </div>
          ) : (
            <svg
              className={styles.playIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </button>
    </>
  );
}

export default MusicPlayer;
