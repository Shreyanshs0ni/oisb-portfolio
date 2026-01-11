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
    title: "Project Alpha",
    description:
      "A modern web application built with React and Node.js featuring real-time data synchronization.",
    tags: ["React", "Node.js", "Socket.io"],
    image: "/projects/project-1.svg",
    color: "#FF5F1F",
    link: "#",
  },
  {
    id: 2,
    title: "Project Beta",
    description:
      "E-commerce platform with seamless checkout experience and inventory management system.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    image: "/projects/project-2.svg",
    color: "#FF6B35",
    link: "#",
  },
  {
    id: 3,
    title: "Project Gamma",
    description:
      "Interactive data visualization dashboard for analytics and business intelligence.",
    tags: ["D3.js", "TypeScript", "AWS"],
    image: "/projects/project-3.svg",
    color: "#FFB347",
    link: "#",
  },
  {
    id: 4,
    title: "Project Delta",
    description:
      "Mobile-first progressive web app with offline capabilities and push notifications.",
    tags: ["PWA", "Service Workers", "IndexedDB"],
    image: "/projects/project-4.svg",
    color: "#FF8C00",
    link: "#",
  },
  {
    id: 5,
    title: "Project Epsilon",
    description:
      "AI-powered content management system with natural language processing features.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    image: "/projects/project-5.svg",
    color: "#FFA07A",
    link: "#",
  },
  {
    id: 6,
    title: "Project Zeta",
    description:
      "Real-time collaboration tool for remote teams with video conferencing integration.",
    tags: ["WebRTC", "Redis", "Docker"],
    image: "/projects/project-6.svg",
    color: "#FF7F50",
    link: "#",
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

    // Title color reset
    if (title) {
      gsap.to(title, {
        color: "#ffffff",
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
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
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
    },
    []
  );

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
        style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}20 0%, transparent 70%)` }}
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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(
        [labelRef.current, headingRef.current, headingLineRef.current],
        {
          opacity: 0,
        }
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
            Featured <span className={styles.accent}>Projects</span>
          </h2>
          <div ref={headingLineRef} className={styles.headingLine} />
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
          <a href="#" className={styles.viewAllButton}>
            View All Projects
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

export default ProjectsSection;
