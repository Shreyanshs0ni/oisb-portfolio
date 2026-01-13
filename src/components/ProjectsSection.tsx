"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsSection.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Project data
const projects = [
  {
    id: 1,
    title: "Moddern",
    description:
      "A gaming website built with React and GSAP featuring cinematic animations, smooth transitions, and immersive visuals.",
    tags: ["React", "GSAP", "Tailwind CSS"],
    image: "/projects/Moddern.png",
    color: "#FF6B35",
    link: "https://moddern.vercel.app",
  },
  {
    id: 2,
    title: "Golden Pour",
    description:
      "A GSAP-animated website that uses AI to generate drink recipes through an interactive, aesthetic experience.",
    tags: ["React.js", "GSAP", "Tailwind CSS", "FFmpeg"],
    image: "/projects/GoldenPour.png",
    color: "#FF6B35",
    link: "https://golden-pour.vercel.app",
  },
  {
    id: 3,
    title: "Nike (E-Commerce)",
    description:
      "A full-stack Nike-inspired e-commerce app with backend, admin portal, and complete shopping workflows.",
    tags: [
      "React",
      "Tailwind CSS",
      "bcrypt",
      "jsonwebtoken",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Stripe",
      "Cloudinary",
    ],
    image: "/projects/Nike.png",
    color: "#FF6B35",
    link: "https://nike-frontend-navy.vercel.app",
  },
  {
    id: 4,
    title: "Iphone 15 Pro",
    description:
      "A GSAP and Three.js powered product showcase with interactive 3D models and smooth scroll animations.",
    tags: ["React", "Tailwind CSS", "GSAP", "Three.js"],
    image: "/projects/Iphone15pro.png",
    color: "#FF6B35",
    link: "https://apple-website-ruby.vercel.app",
  },
  {
    id: 5,
    title: "Expense Tracker",
    description:
      "A modern Next.js application for managing budgets and expenses with a clean, aesthetic UI.",
    tags: ["Next.js", "Clerk", "Neon DB", "Tailwind CSS", "Drizzle ORM"],
    image: "/projects/Expense.png",
    color: "#FF6B35",
    link: "https://expense-tracker-alpha-lac.vercel.app",
  },
  {
    id: 6,
    title: "Three T-Shirt",
    description:
      "An interactive 3D website built using Three.js and Framer Motion for animated product visualization.",
    tags: ["React", "Framer-motion", "Three.js", "Tailwind CSS", "Vercel"],
    image: "/projects/tshirt.png",
    color: "#FF6B35",
    link: "https://tshirt-3js.vercel.app",
  },
];

// Project Card Component with GSAP hover animations
interface ProjectCardProps {
  project: (typeof projects)[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Handle mouse enter - GSAP animation
  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const accent = accentRef.current;
    const glow = glowRef.current;

    if (!card) return;

    // Card lift and scale animation
    gsap.to(card, {
      y: -12,
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    });

    // Image zoom effect
    if (image) {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    // Title color change
    if (title) {
      gsap.to(title, {
        color: project.color,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Accent line expand
    if (accent) {
      gsap.to(accent, {
        width: "100%",
        duration: 0.5,
        ease: "power3.out",
      });
    }

    // Glow effect
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [project.color]);

  // Handle mouse leave - GSAP animation
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const accent = accentRef.current;
    const glow = glowRef.current;

    if (!card) return;

    // Card return to normal
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Image reset
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Title color reset - uses CSS variable
    if (title) {
      const computedStyle = getComputedStyle(document.documentElement);
      const foregroundColor =
        computedStyle.getPropertyValue("--foreground").trim() || "#ffffff";
      gsap.to(title, {
        color: foregroundColor,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Accent line collapse
    if (accent) {
      gsap.to(accent, {
        width: "0%",
        duration: 0.4,
        ease: "power3.out",
      });
    }

    // Glow fade
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  // Handle mouse move for tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position
    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  }, []);

  // Reset tilt on mouse leave
  const handleMouseLeaveWithTilt = useCallback(() => {
    handleMouseLeave();

    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [handleMouseLeave]);

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveWithTilt}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect overlay */}
      <div
        ref={glowRef}
        className={styles.cardGlow}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}20 0%, transparent 70%)`,
        }}
      />

      {/* Project image/preview */}
      <div
        className={styles.imageWrapper}
        style={{ "--card-accent": project.color } as React.CSSProperties}
      >
        <Image
          ref={imageRef}
          src={project.image}
          alt={`${project.title} preview`}
          width={400}
          height={240}
          className={styles.image}
        />
        <div className={styles.imageOverlay} />

        {/* View project button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewButton}
          aria-label={`View ${project.title}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* Project info */}
      <div className={styles.content}>
        <h3 ref={titleRef} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.description}>{project.description}</p>

        {/* Tech tags */}
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        ref={accentRef}
        className={styles.cardAccent}
        style={{ background: project.color }}
      />
    </article>
  );
}

// View All Button with slide animation
function ViewAllButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
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
      ref={buttonRef}
      href="https://github.com/Shreyanshs0ni?tab=repositories"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.viewAllButton}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={bgRef} className={styles.viewAllButtonBg} />
      <span className={styles.viewAllButtonText}>View All Projects</span>
      <svg
        className={styles.viewAllButtonIcon}
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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set([labelRef.current, headingRef.current], {
        opacity: 0,
      });

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

      // === Project Cards Scroll Animation ===
      const cards = gridRef.current?.querySelectorAll("li");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
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
      id="projects"
      className={styles.projects}
      aria-label="Projects section"
    >
      <div className={styles.container}>
        {/* Section heading */}
        <div className={styles.headingWrapper}>
          <span ref={labelRef} className={styles.label}>
            My Work
          </span>
          <h2 ref={headingRef} className={styles.heading}>
            Featured <span>Projects</span>
          </h2>
        </div>

        {/* Projects grid */}
        <ul ref={gridRef} className={styles.grid} role="list">
          {projects.map((project) => (
            <li key={project.id} className={styles.cardWrapper}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {/* View all button */}
        <div className={styles.viewAll}>
          <ViewAllButton />
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
