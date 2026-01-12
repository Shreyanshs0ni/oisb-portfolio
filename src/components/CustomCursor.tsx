"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      // Main cursor follows with slight delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });

      // Dot follows instantly
      gsap.set(dot, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Scale up on clickable elements
    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove);

    // Add hover effect to clickable elements
    const clickables = document.querySelectorAll(
      "a, button, input, textarea, [role='button']"
    );
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor circle with invert effect */}
      <div ref={cursorRef} className={styles.cursor} />

      {/* Small dot in center */}
      <div ref={cursorDotRef} className={styles.dot} />
    </>
  );
}

export default CustomCursor;
