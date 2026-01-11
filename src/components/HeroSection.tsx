"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP animations on mount
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        );
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
        <div className={styles.accentLine} />

        {/* Main heading */}
        <h1 ref={headingRef} className={styles.heading}>
          <span className={styles.tagline}>🚀 Welcome to my space</span>
          <span className={styles.greeting}>
            Hey! I&apos;m <span className={styles.name}>Shreyansh</span>
          </span>
          <span className={styles.role}>Developer & Designer</span>
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
      <div className={styles.scrollIndicator}>
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
