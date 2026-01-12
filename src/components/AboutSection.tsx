"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeBackground } from "./ThreeBackground";
import styles from "./AboutSection.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set([labelRef.current, headingRef.current, headingLineRef.current], {
        opacity: 0,
      });
      gsap.set(imageRef.current, { opacity: 0 });
      gsap.set(bioRef.current, { opacity: 0 });

      // === Heading Section Timeline ===
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      headingTl
        // Label drops down
        .fromTo(
          labelRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        )
        // Heading fades up
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2"
        )
        // Line draws in from center
        .fromTo(
          headingLineRef.current,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.3"
        );

      // === Image Animation ===
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: -60,
          scale: 0.85,
          rotateY: -15,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle parallax on image while scrolling
      gsap.to(imageRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // === Bio Animation ===
      // Get all paragraphs for stagger effect
      const bioParagraphs = bioRef.current?.querySelectorAll("p");

      gsap.fromTo(
        bioRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger paragraphs
      if (bioParagraphs && bioParagraphs.length > 0) {
        gsap.fromTo(
          bioParagraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === Tags Animation ===
      const tags = tagsRef.current?.querySelectorAll("span");
      if (tags && tags.length > 0) {
        gsap.fromTo(
          tags,
          {
            opacity: 0,
            scale: 0.8,
            y: 15,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === Stats Animation with Counter ===
      const statItems = statsRef.current?.querySelectorAll(
        `.${styles.statItem}`
      );
      const statNumbers = statsRef.current?.querySelectorAll(
        `.${styles.statNumber}`
      );
      const statDividers = statsRef.current?.querySelectorAll(
        `.${styles.statDivider}`
      );

      // Animate stat items entrance
      if (statItems && statItems.length > 0) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate dividers
      if (statDividers && statDividers.length > 0) {
        gsap.fromTo(
          statDividers,
          { opacity: 0, scaleY: 0 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Counter animation for numbers
      if (statNumbers && statNumbers.length > 0) {
        statNumbers.forEach((numEl) => {
          const text = numEl.textContent || "0";
          const hasPlus = text.includes("+");
          const targetNum = parseInt(text.replace(/\D/g, ""), 10);

          // Create counter object
          const counter = { value: 0 };

          gsap.to(counter, {
            value: targetNum,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: numEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                gsap.to(counter, {
                  value: targetNum,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: () => {
                    numEl.textContent = `${Math.round(counter.value)}${
                      hasPlus ? "+" : ""
                    }`;
                  },
                });
              },
              onLeaveBack: () => {
                counter.value = 0;
                numEl.textContent = `0${hasPlus ? "+" : ""}`;
              },
            },
          });
        });
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
      {/* Three.js Background - only for this section */}
      <div className={styles.threeWrapper}>
        <ThreeBackground contained />
      </div>

      <div className={styles.container}>
        {/* Section heading */}
        <div className={styles.headingWrapper}>
          <span ref={labelRef} className={styles.label}>
            Get to know me
          </span>
          <h2 ref={headingRef} className={styles.heading}>
            About <span className={styles.accent}>Me</span>
          </h2>
        </div>

        {/* Content grid */}
        <div className={styles.content}>
          {/* Image side */}
          <div ref={imageRef} className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/PP1.jpg"
                alt="Shreyansh - Developer & Designer"
                width={400}
                height={500}
                className={styles.image}
                priority={false}
              />
            </div>
          </div>

          {/* Bio side */}
          <div ref={bioRef} className={styles.bioWrapper}>
            <article className={styles.bio}>
              <p className={styles.bioText}>
                Hey there! I&apos;m{" "}
                <strong className={styles.accent}>Shreyansh</strong>, a
                passionate developer and designer who loves turning creative
                ideas into reality.
              </p>
              <p className={styles.bioText}>
                With a keen eye for{" "}
                <strong className={styles.accent}>design</strong> and a love for
                clean <strong className={styles.accent}>code</strong>, I
                specialize in building modern web/mobile applications that are
                not only functional but also delightful to use.
              </p>
              <p className={styles.bioText}>
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sipping
                coffee while brainstorming the next big thing.
              </p>

              {/* Skills/interests tags */}
              <div ref={tagsRef} className={styles.tags}>
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
            <span className={styles.statNumber}>20+</span>
            <span className={styles.statLabel}>Projects Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
