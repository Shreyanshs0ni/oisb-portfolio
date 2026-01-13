"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsSection.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Skills for the marquee tapes
const tapeSkills = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Designer",
  "iOS Development",
  "Android Development",
];

// Skills data organized by category
const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "⚡",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Shadcn UI",
      "React Hooks & Context API",
      "Responsive Design",
      "Component-Based Architecture",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "🔧",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "tRPC",
      "MongoDB",
      "PostgreSQL",
      "Drizzle ORM",
      "Authentication & Authorization",
      "Role-Based Access Control",
      "Payment Integration (Stripe, Razorpay)",
    ],
  },
  {
    id: "ai",
    title: "AI / Applied ML",
    icon: "🤖",
    skills: [
      "OpenAI API",
      "LangChain",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "Embeddings & Vector Search",
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "🛠",
    skills: [
      "Git & GitHub",
      "Vercel",
      "Docker",
      "Clerk (Auth)",
      "Mux (Video Streaming)",
      "Upstash (Redis)",
      "Photoshop",
      "Canva",
      "AstraDB",
      "Neon (Postgres)",
      "Postman",
      "Figma",
    ],
  },
  {
    id: "cs",
    title: "Computer Science",
    icon: "💻",
    skills: [
      "Data Structures & Algorithms",
      "Problem Solving (LeetCode)",
      "OOP Fundamentals",
      "DBMS",
    ],
  },
  {
    id: "professional",
    title: "Professional & Personal",
    icon: "✨",
    skills: [
      "Full-Stack Development",
      "Team Collaboration",
      "Client-Focused Development",
      "Rapid Prototyping",
      "Debugging",
      "Guitar & Music",
      "Visual / Product Sense",
      "Discipline & Consistency",
    ],
  },
];

// Star icon for tapes
const StarIcon = () => (
  <svg
    className={styles.starIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

// Tape content component
const TapeItems = ({ prefix }: { prefix: string }) => (
  <>
    {tapeSkills.map((skill, index) => (
      <span key={`${prefix}-${index}`} className={styles.tapeItem}>
        <StarIcon />
        <span className={styles.tapeText}>{skill}</span>
      </span>
    ))}
  </>
);

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tape1Ref = useRef<HTMLDivElement>(null);
  const tape2Ref = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Tape animations
  useEffect(() => {
    if (tape1Ref.current) {
      const tape1Width = tape1Ref.current.scrollWidth / 2;
      gsap.to(tape1Ref.current, {
        x: -tape1Width,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    }

    if (tape2Ref.current) {
      const tape2Width = tape2Ref.current.scrollWidth / 2;
      gsap.fromTo(
        tape2Ref.current,
        { x: -tape2Width },
        {
          x: 0,
          duration: 60,
          ease: "none",
          repeat: -1,
        }
      );
    }
  }, []);

  // Card animations
  useEffect(() => {
    if (!headingRef.current || !skillsGridRef.current) return;

    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
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

    // Cards stagger animation
    const cards = skillsGridRef.current.querySelectorAll(
      `.${styles.categoryCard}`
    );

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateX: -15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Skill tags stagger
    const tags = skillsGridRef.current.querySelectorAll(`.${styles.skillTag}`);

    gsap.fromTo(
      tags,
      { opacity: 0, scale: 0.5, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={styles.skills}
      aria-label="Skills section"
    >
      {/* Tape Marquee Area */}
      <div className={styles.tapeArea}>
        <div className={styles.tapeWrapper}>
          <div className={styles.tape}>
            <div ref={tape1Ref} className={styles.tapeContent}>
              <TapeItems prefix="t1a" />
              <TapeItems prefix="t1b" />
              <TapeItems prefix="t1c" />
              <TapeItems prefix="t1d" />
              <TapeItems prefix="t1e" />
              <TapeItems prefix="t1f" />
              <TapeItems prefix="t1g" />
              <TapeItems prefix="t1h" />
            </div>
          </div>
        </div>

        <div className={`${styles.tapeWrapper} ${styles.tapeWrapperReverse}`}>
          <div className={styles.tape}>
            <div ref={tape2Ref} className={styles.tapeContent}>
              <TapeItems prefix="t2a" />
              <TapeItems prefix="t2b" />
              <TapeItems prefix="t2c" />
              <TapeItems prefix="t2d" />
              <TapeItems prefix="t2e" />
              <TapeItems prefix="t2f" />
              <TapeItems prefix="t2g" />
              <TapeItems prefix="t2h" />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid Section */}
      <div className={styles.skillsContent}>
        <div className={styles.container}>
          <div className={styles.headingWrapper}>
            <span className={styles.label}>What I Know</span>
            <h2 ref={headingRef} className={styles.heading}>
              My Skills
            </h2>
          </div>

          <div ref={skillsGridRef} className={styles.categoriesGrid}>
            {skillCategories.map((category) => (
              <div key={category.id} className={styles.categoryCard}>
                <div className={styles.cardGlow} />
                <div className={styles.cardContent}>
                  <div className={styles.categoryHeader}>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                  </div>
                  <div className={styles.skillTags}>
                    {category.skills.map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
