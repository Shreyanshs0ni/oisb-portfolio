"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // GSAP animations on mount
  useGSAP(
    () => {
      // Set initial states
      gsap.set(
        [
          accentLineRef.current,
          taglineRef.current,
          greetingRef.current,
          nameRef.current,
          roleRef.current,
          subtitleRef.current,
          scrollIndicatorRef.current,
        ],
        { opacity: 0 }
      );

      // Create master timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      // Animation sequence
      tl
        // 1. Accent line draws in from center
        .fromTo(
          accentLineRef.current,
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" }
        )

        // 2. Tagline fades in and slides down
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )

        // 3. Greeting slides up
        .fromTo(
          greetingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )

        // 4. Name pops in with scale and glow effect
        .fromTo(
          nameRef.current,
          {
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )

        // 5. Role slides up with slight delay
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )

        // 6. Subtitle fades in
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )

        // 7. CTA buttons stagger in from bottom
        .fromTo(
          ctaRef.current?.children || [],
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )

        // 8. Scroll indicator fades in last
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );

      // Subtle floating animation for the name (continuous)
      gsap.to(nameRef.current, {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2, // Start after intro animation
      });

      // Pulse glow effect on name (continuous)
      gsap.to(nameRef.current, {
        textShadow:
          "0 0 30px rgba(255, 95, 31, 0.6), 0 0 60px rgba(255, 95, 31, 0.3)",
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    },
    { scope: sectionRef }
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.hero}
      aria-label="Hero section"
    >
      {/* Content wrapper */}
      <div className={styles.content}>
        {/* Decorative accent line */}
        <div ref={accentLineRef} className={styles.accentLine} />

        {/* Main heading */}
        <h1 className={styles.heading}>
          <span ref={taglineRef} className={styles.tagline}>
            🚀 Welcome to my space
          </span>
          <span ref={greetingRef} className={styles.greeting}>
            Hey! I&apos;m{" "}
            <span ref={nameRef} className={styles.name}>
              Shreyansh
            </span>
          </span>
          <span ref={roleRef} className={styles.role}>
            Developer & Designer
          </span>
        </h1>

        {/* Subtitle / Role description */}
        <p ref={subtitleRef} className={styles.subtitle}>
          I craft{" "}
          <span className={styles.highlight}>
            beautiful digital experiences
          </span>{" "}
          and turn wild ideas into{" "}
          <span className={styles.highlight}>awesome apps</span>.
          <br />
          Let&apos;s build something amazing together! ✨
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className={styles.ctaContainer}>
          <button
            onClick={() => scrollToSection("projects")}
            className={styles.btnPrimary}
            aria-label="View my projects"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={styles.btnOutline}
            aria-label="Contact me"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <svg
          className={styles.scrollIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
