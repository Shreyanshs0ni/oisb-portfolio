"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bio text animation
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats animation with stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
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
      id="about"
      className={styles.about}
      aria-label="About section"
    >
      <div className={styles.container}>
        {/* Section heading */}
        <div ref={headingRef} className={styles.headingWrapper}>
          <span className={styles.label}>Get to know me</span>
          <h2 className={styles.heading}>
            About <span className={styles.accent}>Me</span>
          </h2>
          <div className={styles.headingLine} />
        </div>

        {/* Content grid */}
        <div className={styles.content}>
          {/* Image side */}
          <div ref={imageRef} className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              {/* Placeholder image - replace with actual photo */}
              <Image
                src="/profile-placeholder.svg"
                alt="Shreyansh - Developer & Designer"
                width={400}
                height={400}
                className={styles.image}
                priority={false}
              />
              {/* Decorative frame */}
              <div className={styles.imageFrame} />
              <div className={styles.imageGlow} />
            </div>
          </div>

          {/* Bio side */}
          <div ref={bioRef} className={styles.bioWrapper}>
            <article className={styles.bio}>
              <p className={styles.bioText}>
                <span className={styles.wave}>👋</span> Hey there! I&apos;m{" "}
                <strong className={styles.accent}>Shreyansh</strong>, a passionate
                developer and designer who loves turning creative ideas into
                reality.
              </p>
              <p className={styles.bioText}>
                With a keen eye for{" "}
                <span className={styles.accent}>design</span> and a love for
                clean <span className={styles.accent}>code</span>, I specialize
                in building modern web applications that are not only functional
                but also delightful to use.
              </p>
              <p className={styles.bioText}>
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sipping
                coffee while brainstorming the next big thing. ☕
              </p>

              {/* Skills/interests tags */}
              <div className={styles.tags}>
                <span className={styles.tag}>React</span>
                <span className={styles.tag}>Next.js</span>
                <span className={styles.tag}>TypeScript</span>
                <span className={styles.tag}>UI/UX</span>
                <span className={styles.tag}>Three.js</span>
                <span className={styles.tag}>GSAP</span>
              </div>
            </article>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>3+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Projects Completed</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>20+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

