"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsSection.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Skills data organized by category
const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5", level: 98 },
      { name: "CSS3", level: 92 },
      { name: "Tailwind", level: 90 },
      { name: "GSAP", level: 85 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 82 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 75 },
      { name: "Figma", level: 85 },
      { name: "Three.js", level: 70 },
      { name: "AWS", level: 72 },
      { name: "Vercel", level: 88 },
    ],
  },
];

// Quick skills list
const quickSkills = [
  "Redux",
  "Zustand",
  "Framer Motion",
  "Sass",
  "Webpack",
  "Jest",
  "Cypress",
  "Firebase",
  "Supabase",
  "Linux",
];

// Simple icon components for visual interest
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "frontend":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9l3 3-3 3M15 15h3" />
        </svg>
      );
    case "backend":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="8" cy="6" r="1" fill="currentColor" />
          <circle cx="8" cy="12" r="1" fill="currentColor" />
          <circle cx="8" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "tools":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return null;
  }
};

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const quickSkillsRef = useRef<HTMLDivElement>(null);
  const quickTagsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states for all elements
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

      // === Category Cards Pop-In Animation ===
      const categoryCards = categoriesRef.current?.querySelectorAll(
        `.${styles.categoryCard}`
      );

      if (categoryCards && categoryCards.length > 0) {
        // Set initial state
        gsap.set(categoryCards, {
          opacity: 0,
          scale: 0.5,
          y: 60,
          rotateX: -15,
        });

        gsap.to(categoryCards, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)", // Bouncy pop-in effect
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // === Category Icons Spin-In ===
      const categoryIcons = categoriesRef.current?.querySelectorAll(
        `.${styles.categoryIcon}`
      );

      if (categoryIcons && categoryIcons.length > 0) {
        gsap.fromTo(
          categoryIcons,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === Skill Items Pop-In with Stagger ===
      const skillItems = categoriesRef.current?.querySelectorAll(
        `.${styles.skillItem}`
      );

      if (skillItems && skillItems.length > 0) {
        gsap.fromTo(
          skillItems,
          {
            opacity: 0,
            scale: 0.8,
            x: -30,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.04, // Fast stagger for many items
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === Skill Progress Bars Animation ===
      const skillBars = categoriesRef.current?.querySelectorAll(
        `.${styles.skillProgress}`
      );

      if (skillBars && skillBars.length > 0) {
        skillBars.forEach((bar, index) => {
          const level = bar.getAttribute("data-level") || "0";

          gsap.fromTo(
            bar,
            { width: "0%", opacity: 0 },
            {
              width: `${level}%`,
              opacity: 1,
              duration: 1.5,
              delay: index * 0.03, // Slight delay between bars
              ease: "power4.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // === Skill Level Counter Animation ===
      const skillLevels = categoriesRef.current?.querySelectorAll(
        `.${styles.skillLevel}`
      );

      if (skillLevels && skillLevels.length > 0) {
        skillLevels.forEach((levelEl) => {
          const text = levelEl.textContent || "0%";
          const targetNum = parseInt(text.replace("%", ""), 10);
          const counter = { value: 0 };

          ScrollTrigger.create({
            trigger: levelEl,
            start: "top 90%",
            onEnter: () => {
              gsap.to(counter, {
                value: targetNum,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  levelEl.textContent = `${Math.round(counter.value)}%`;
                },
              });
            },
            onLeaveBack: () => {
              counter.value = 0;
              levelEl.textContent = "0%";
            },
          });
        });
      }

      // === Quick Skills Section Animation ===
      if (quickSkillsRef.current) {
        gsap.fromTo(
          quickSkillsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quickSkillsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // === Quick Tags Pop-In Animation ===
      const quickTags = quickTagsRef.current?.querySelectorAll(
        `.${styles.quickTag}`
      );

      if (quickTags && quickTags.length > 0) {
        gsap.fromTo(
          quickTags,
          {
            opacity: 0,
            scale: 0.5,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: quickTagsRef.current,
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
      id="skills"
      className={styles.skills}
      aria-label="Skills section"
    >
      <div className={styles.container}>
        {/* Section heading */}
        <div className={styles.headingWrapper}>
          <span ref={labelRef} className={styles.label}>
            What I Know
          </span>
          <h2 ref={headingRef} className={styles.heading}>
            My <span className={styles.accent}>Skills</span>
          </h2>
          <div ref={headingLineRef} className={styles.headingLine} />
        </div>

        {/* Skills categories grid */}
        <div ref={categoriesRef} className={styles.categoriesGrid}>
          {skillCategories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              {/* Category header */}
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <CategoryIcon category={category.id} />
                </div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
              </div>

              {/* Skills list */}
              <ul className={styles.skillsList}>
                {category.skills.map((skill) => (
                  <li key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillProgress}
                        data-level={skill.level}
                        style={
                          {
                            "--skill-level": `${skill.level}%`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick skills tags */}
        <div ref={quickSkillsRef} className={styles.quickSkills}>
          <h4 className={styles.quickSkillsTitle}>Also familiar with</h4>
          <div ref={quickTagsRef} className={styles.quickSkillsTags}>
            {quickSkills.map((skill) => (
              <span key={skill} className={styles.quickTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
