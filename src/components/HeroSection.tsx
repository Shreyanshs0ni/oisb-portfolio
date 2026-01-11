"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      aria-label="Hero section"
    >
      {/* Decorative accent line */}
      <div className="gradient-line w-16 mb-8 opacity-60" />

      {/* Main heading */}
      <h1
        ref={headingRef}
        className="text-center mb-6 max-w-4xl opacity-0"
      >
        <span className="block text-lg md:text-xl font-normal text-accent mb-4 tracking-widest uppercase">
          🚀 Welcome to my space
        </span>
        <span className="block">
          Hey! I&apos;m{" "}
          <span className="text-accent text-glow-accent">[Your Name]</span>
        </span>
        <span className="block text-2xl md:text-4xl font-light mt-2 text-muted">
          Developer & Designer
        </span>
      </h1>

      {/* Subtitle / Role description */}
      <p
        ref={subtitleRef}
        className="text-center text-lg md:text-xl max-w-2xl mb-12 opacity-0"
      >
        I craft{" "}
        <span className="text-accent font-medium">beautiful digital experiences</span>{" "}
        and turn wild ideas into{" "}
        <span className="text-accent font-medium">awesome apps</span>.
        <br className="hidden md:block" />
        Let&apos;s build something amazing together! ✨
      </p>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          onClick={() => scrollToSection("projects")}
          className="btn-primary rounded-full min-w-[180px] text-base font-semibold 
                     hover:scale-105 transition-transform duration-200
                     focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
          aria-label="View my projects"
        >
          View Projects
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="btn-outline rounded-full min-w-[180px] text-base font-semibold
                     hover:scale-105 transition-transform duration-200
                     focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Contact me"
        >
          Contact Me
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-subtle text-sm tracking-wider uppercase">Scroll</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
          aria-hidden="true"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;

