"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OisbAppsSection.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// OisB Apps data
const oisbApps = [
  {
    id: 1,
    name: "OisB Notes",
    description:
      "A minimal, distraction-free note-taking app with cloud sync and markdown support.",
    icon: "/apps/oisb-notes.svg",
    status: "available",
    downloadUrl: "#",
    playStoreUrl: "#",
    version: "2.1.0",
    downloads: "10K+",
  },
  {
    id: 2,
    name: "OisB Timer",
    description:
      "Pomodoro timer and productivity tracker to help you stay focused and get things done.",
    icon: "/apps/oisb-timer.svg",
    status: "available",
    downloadUrl: "#",
    playStoreUrl: "#",
    version: "1.5.2",
    downloads: "5K+",
  },
  {
    id: 3,
    name: "OisB Weather",
    description:
      "Beautiful weather app with accurate forecasts, widgets, and minimal design.",
    icon: "/apps/oisb-weather.svg",
    status: "available",
    downloadUrl: "#",
    playStoreUrl: "#",
    version: "3.0.1",
    downloads: "15K+",
  },
  {
    id: 4,
    name: "OisB Wallet",
    description:
      "Track expenses, manage budgets, and visualize your spending habits effortlessly.",
    icon: "/apps/oisb-wallet.svg",
    status: "coming-soon",
    downloadUrl: "#",
    playStoreUrl: "#",
    version: "1.0.0",
    downloads: "-",
  },
];

// Download icon SVG
const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Play Store icon SVG
const PlayStoreIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
  </svg>
);

export function OisbAppsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(
        [labelRef.current, headingRef.current, headingLineRef.current],
        { opacity: 0 }
      );

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
        )
        .fromTo(
          headingLineRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          "-=0.3"
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
          <div ref={headingLineRef} className={styles.headingLine} />
          <p className={styles.subtitle}>
            A collection of minimal, beautifully designed apps for your daily needs
          </p>
        </div>

        {/* Apps grid */}
        <div ref={gridRef} className={styles.appsGrid}>
          {oisbApps.map((app) => (
            <article
              key={app.id}
              className={`${styles.appCard} ${
                app.status === "coming-soon" ? styles.comingSoon : ""
              }`}
            >
              {/* Status badge */}
              {app.status === "coming-soon" && (
                <span className={styles.statusBadge}>Coming Soon</span>
              )}

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

                {/* App meta */}
                <div className={styles.appMeta}>
                  <span className={styles.appVersion}>v{app.version}</span>
                  {app.status === "available" && (
                    <span className={styles.appDownloads}>
                      {app.downloads} downloads
                    </span>
                  )}
                </div>
              </div>

              {/* Download buttons */}
              <div className={styles.appActions}>
                {app.status === "available" ? (
                  <>
                    <a
                      href={app.downloadUrl}
                      className={styles.downloadBtn}
                      aria-label={`Download ${app.name} APK`}
                    >
                      <DownloadIcon />
                      <span>Download APK</span>
                    </a>
                    <a
                      href={app.playStoreUrl}
                      className={styles.storeBtn}
                      aria-label={`Get ${app.name} on Play Store`}
                    >
                      <PlayStoreIcon />
                      <span>Play Store</span>
                    </a>
                  </>
                ) : (
                  <button className={styles.notifyBtn} disabled>
                    <span>Notify Me</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA section */}
        <div ref={ctaRef} className={styles.cta}>
          <p className={styles.ctaText}>
            Want to see more apps or have an idea?
          </p>
          <a href="#contact" className={styles.ctaButton}>
            Let&apos;s Talk
            <svg
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
        </div>
      </div>
    </section>
  );
}

export default OisbAppsSection;

