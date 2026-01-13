"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate logo entrance
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    // Animate progress bar entrance
    if (progressContainerRef.current) {
      gsap.fromTo(
        progressContainerRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out", delay: 0.5 }
      );
    }

    // Simulate loading progress
    const startTime = Date.now();
    const minDuration = 2000; // Minimum 2 seconds for aesthetics

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const naturalProgress = Math.min((elapsed / minDuration) * 100, 100);

      // Check if document is ready
      const documentReady = document.readyState === "complete";

      if (naturalProgress < 100) {
        setProgress(Math.floor(naturalProgress));
        requestAnimationFrame(updateProgress);
      } else if (documentReady) {
        setProgress(100);
        // Small delay before exit animation
        setTimeout(() => {
          exitAnimation();
        }, 300);
      } else {
        // Keep checking if document is ready
        setProgress(95);
        const checkReady = setInterval(() => {
          if (document.readyState === "complete") {
            clearInterval(checkReady);
            setProgress(100);
            setTimeout(() => {
              exitAnimation();
            }, 300);
          }
        }, 100);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const exitAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });

    // Logo scales up and fades
    tl.to(logoRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // Progress bar fades
    if (progressContainerRef.current) {
      tl.to(
        progressContainerRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      );
    }

    // Progress text fades
    tl.to(
      progressTextRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    );

    // Preloader slides up and reveals content
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    });
  };

  if (isComplete) return null;

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      <div className={styles.content}>
        {/* Logo */}
        <div ref={logoRef} className={styles.logo}>
          Hello!
        </div>

        {/* Progress bar */}
        <div ref={progressContainerRef} className={styles.progressContainer}>
          <div
            ref={progressBarRef}
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <span ref={progressTextRef} className={styles.progressText}>
          {progress}%
        </span>
      </div>

      {/* Decorative elements */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
    </div>
  );
}

export default Preloader;
