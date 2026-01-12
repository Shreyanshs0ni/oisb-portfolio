"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

const TRAIL_LENGTH = 10;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef<{ x: number; y: number }[]>(
    Array(TRAIL_LENGTH).fill(null).map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Move main cursor (center it on mouse)
      gsap.set(cursor, {
        x: e.clientX - 25,
        y: e.clientY - 25,
      });

      // Rotate in direction of movement
      const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
      if (speed > 2) {
        const angle = Math.atan2(e.movementY, e.movementX) * (180 / Math.PI) + 90;
        gsap.to(cursor, {
          rotation: angle,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    // Trail animation
    let rafId: number;
    const animateTrail = () => {
      // Shift trail positions
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trailPos.current[i] = { ...trailPos.current[i - 1] };
      }
      trailPos.current[0] = { ...pos.current };

      // Update trail elements
      trailRefs.current.forEach((el, i) => {
        if (el) {
          const p = trailPos.current[i];
          gsap.set(el, {
            x: p.x - 7,
            y: p.y - 7,
            scale: 1 - i * 0.08,
            opacity: 0.8 - i * 0.07,
          });
        }
      });

      rafId = requestAnimationFrame(animateTrail);
    };

    // Start
    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Trail */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className={styles.trail}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      {/* Cursor */}
      <div ref={cursorRef} className={styles.cursor}>
        <svg viewBox="0 0 40 40" className={styles.rocket}>
          {/* Rocket body */}
          <path
            d="M20 4 C20 4 14 12 14 22 C14 28 17 32 20 34 C23 32 26 28 26 22 C26 12 20 4 20 4Z"
            fill="var(--accent)"
            stroke="var(--foreground)"
            strokeWidth="1.2"
          />
          {/* Left wing */}
          <path
            d="M14 24 L8 30 L11 33 L14 28"
            fill="var(--accent)"
            stroke="var(--foreground)"
            strokeWidth="0.8"
          />
          {/* Right wing */}
          <path
            d="M26 24 L32 30 L29 33 L26 28"
            fill="var(--accent)"
            stroke="var(--foreground)"
            strokeWidth="0.8"
          />
          {/* Window */}
          <circle cx="20" cy="14" r="3" fill="var(--background)" stroke="var(--foreground)" strokeWidth="1" />
          {/* Flame */}
          <path d="M17 34 L20 42 L23 34" fill="#FF6B35" className={styles.flame} />
          <path d="M18.5 34 L20 39 L21.5 34" fill="#FFD700" className={styles.flameInner} />
        </svg>
      </div>
    </div>
  );
}

export default CustomCursor;
