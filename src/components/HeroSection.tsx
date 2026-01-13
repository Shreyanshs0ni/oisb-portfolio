"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const role1Ref = useRef<HTMLSpanElement>(null);
  const role2Ref = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(
        [
          greetingRef.current,
          role1Ref.current,
          role2Ref.current,
          scrollIndicatorRef.current,
        ].filter(Boolean),
        { opacity: 0 }
      );

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      tl
        // 1. Greeting fades in
        .fromTo(
          greetingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }
        )

        // 2. First role slides up
        .fromTo(
          role1Ref.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" },
          "-=0.2"
        )

        // 3. Second role slides up
        .fromTo(
          role2Ref.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" },
          "-=0.5"
        )

        // 4. Scroll indicator
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.hero}
      aria-label="Hero section"
    >
      {/* Video Background */}
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/fluid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <span ref={greetingRef} className={styles.greeting}>
          I&apos;m Shreyansh
        </span>

        <h1 className={styles.heading}>
          <span ref={role1Ref} className={styles.role}>
            FULL STACK DEVELOPER
          </span>
          <span ref={role2Ref} className={styles.role}>
            UI/UX DESIGNER
          </span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}

export default HeroSection;
