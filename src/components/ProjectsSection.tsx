"use client";

import { useRef } from "react";
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
    description: "A modern web application built with React and Node.js featuring real-time data synchronization.",
    tags: ["React", "Node.js", "Socket.io"],
    image: "/projects/project-1.svg",
    color: "#FFA500",
    link: "#",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "E-commerce platform with seamless checkout experience and inventory management system.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    image: "/projects/project-2.svg",
    color: "#FF6B35",
    link: "#",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Interactive data visualization dashboard for analytics and business intelligence.",
    tags: ["D3.js", "TypeScript", "AWS"],
    image: "/projects/project-3.svg",
    color: "#FFB347",
    link: "#",
  },
  {
    id: 4,
    title: "Project Delta",
    description: "Mobile-first progressive web app with offline capabilities and push notifications.",
    tags: ["PWA", "Service Workers", "IndexedDB"],
    image: "/projects/project-4.svg",
    color: "#FF8C00",
    link: "#",
  },
  {
    id: 5,
    title: "Project Epsilon",
    description: "AI-powered content management system with natural language processing features.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    image: "/projects/project-5.svg",
    color: "#FFA07A",
    link: "#",
  },
  {
    id: 6,
    title: "Project Zeta",
    description: "Real-time collaboration tool for remote teams with video conferencing integration.",
    tags: ["WebRTC", "Redis", "Docker"],
    image: "/projects/project-6.svg",
    color: "#FF7F50",
    link: "#",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set([labelRef.current, headingRef.current, headingLineRef.current], {
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
        )
        .fromTo(
          headingLineRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          "-=0.3"
        );

      // === Project Cards Animation ===
      const cards = gridRef.current?.querySelectorAll("li");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
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
              <article className={styles.card}>
                {/* Project image/preview */}
                <div
                  className={styles.imageWrapper}
                  style={{ "--card-accent": project.color } as React.CSSProperties}
                >
                  <Image
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
                  <h3 className={styles.title}>{project.title}</h3>
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
                  className={styles.cardAccent}
                  style={{ background: project.color }}
                />
              </article>
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

