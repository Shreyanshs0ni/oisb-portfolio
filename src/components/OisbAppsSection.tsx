"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OisbAppsSection.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// CTA Button with slide animation
function CtaButton() {
  const bgRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!bgRef.current) return;
    // Reset to left and slide in from left
    gsap.set(bgRef.current, { x: "-100%" });
    gsap.to(bgRef.current, {
      x: "0%",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!bgRef.current) return;
    // Slide out to right
    gsap.to(bgRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <a
      href="#contact"
      className={styles.ctaButton}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={bgRef} className={styles.ctaButtonBg} />
      <span className={styles.ctaButtonText}>Let&apos;s Talk</span>
      <svg
        className={styles.ctaButtonIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  );
}

// OisB Apps data
const oisbApps = [
  {
    id: 1,
    name: "OisB Pomodoro",
    description:
      "Pomodoro timer and productivity tracker to help you stay focused and get things done.",
    icon: "/apps/oisb-timer.svg",
  },
  {
    id: 2,
    name: "OisB Calculator",
    description:
      "A clean, minimal calculator with advanced scientific functions and beautiful UI.",
    icon: "/apps/oisb-wallet.svg",
  },
  {
    id: 3,
    name: "OisB Weather",
    description:
      "Beautiful weather app with accurate forecasts, widgets, and minimal design.",
    icon: "/apps/oisb-weather.svg",
  },
  {
    id: 4,
    name: "OisB Notes",
    description:
      "A minimal, distraction-free note-taking app with cloud sync and markdown support.",
    icon: "/apps/oisb-notes.svg",
  },
];

export function OisbAppsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set([labelRef.current, headingRef.current], { opacity: 0 });

      // === Heading Timeline ===
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      headingTl
        .fromTo(
          labelRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2"
        );

      // === App Cards Pop-In ===
      const appCards = gridRef.current?.querySelectorAll(`.${styles.appCard}`);

      if (appCards && appCards.length > 0) {
        gsap.fromTo(
          appCards,
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === App Icons Bounce ===
      const appIcons = gridRef.current?.querySelectorAll(
        `.${styles.appIconWrapper}`
      );

      if (appIcons && appIcons.length > 0) {
        gsap.fromTo(
          appIcons,
          {
            opacity: 0,
            scale: 0,
            rotation: -20,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === CTA Section ===
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="oisb-apps"
      className={styles.oisbApps}
      aria-label="OisB Apps section"
    >
      <div className={styles.container}>
        {/* Section heading */}
        <div className={styles.headingWrapper}>
          <span ref={labelRef} className={styles.label}>
            My Apps
          </span>
          <h2 ref={headingRef} className={styles.heading}>
            <span className={styles.accent}>OisB</span> Apps
          </h2>
          <p className={styles.subtitle}>
            A collection of minimal, beautifully designed apps for your daily
            needs
          </p>
        </div>

        {/* Apps grid */}
        <div ref={gridRef} className={styles.appsGrid}>
          {oisbApps.map((app) => (
            <article
              key={app.id}
              className={`${styles.appCard} ${styles.comingSoon}`}
            >
              {/* Status badge */}
              <span className={styles.statusBadge}>Coming Soon</span>

              {/* App icon */}
              <div className={styles.appIconWrapper}>
                <Image
                  src={app.icon}
                  alt={`${app.name} icon`}
                  width={80}
                  height={80}
                  className={styles.appIcon}
                />
              </div>

              {/* App info */}
              <div className={styles.appInfo}>
                <h3 className={styles.appName}>{app.name}</h3>
                <p className={styles.appDescription}>{app.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA section */}
        <div ref={ctaRef} className={styles.cta}>
          <p className={styles.ctaText}>
            Want to see more apps or have an idea?
          </p>
          <CtaButton />
        </div>
      </div>
    </section>
  );
}

export default OisbAppsSection;
