"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./MusicPlayer.module.css";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Animate button entrance
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)", delay: 1.5 }
    );

    // Show toast after button appears
    const toastTimer = setTimeout(() => {
      setShowToast(true);
    }, 2200);

    // Hide toast after 5 seconds
    const hideTimer = setTimeout(() => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setShowToast(false),
        });
      }
    }, 7000);

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Animate equalizer bars with GSAP when playing
  useEffect(() => {
    if (isPlaying) {
      const bars = barsRef.current.filter(Boolean);
      const durations = [0.4, 0.5, 0.35, 0.45];
      const minHeights = [3, 6, 4, 5];
      const maxHeights = [12, 10, 12, 11];

      bars.forEach((bar, i) => {
        if (bar) {
          gsap.to(bar, {
            height: maxHeights[i],
            duration: durations[i],
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          // Start from different heights
          gsap.set(bar, { height: minHeights[i] });
        }
      });

      return () => {
        bars.forEach((bar) => {
          if (bar) gsap.killTweensOf(bar);
        });
      };
    }
  }, [isPlaying]);

  // Animate toast when it appears
  useEffect(() => {
    if (showToast && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { opacity: 0, y: 10, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [showToast]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Hide toast when user interacts
    if (showToast && toastRef.current) {
      gsap.to(toastRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => setShowToast(false),
      });
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.musicPlayerWrapper}>
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Toast notification */}
      {showToast && (
        <div ref={toastRef} className={styles.toast}>
          <span className={styles.toastText}>Toggle for better experience</span>
          <div className={styles.toastArrow} />
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={togglePlay}
        className={`${styles.musicButton} ${isPlaying ? styles.playing : ""}`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <div className={styles.iconWrapper}>
          {isPlaying ? (
            <div className={styles.equalizer}>
              <span
                ref={(el) => {
                  barsRef.current[0] = el;
                }}
                className={styles.eqBar}
              />
              <span
                ref={(el) => {
                  barsRef.current[1] = el;
                }}
                className={styles.eqBar}
              />
              <span
                ref={(el) => {
                  barsRef.current[2] = el;
                }}
                className={styles.eqBar}
              />
              <span
                ref={(el) => {
                  barsRef.current[3] = el;
                }}
                className={styles.eqBar}
              />
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
    </div>
  );
}

export default MusicPlayer;
