"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      // Animate navbar in from top
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    },
    { scope: navRef }
  );

  // Detect when navbar is over the Projects section (white background)
  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById("projects");
      if (!projectsSection || !navRef.current) return;

      const navbarHeight = navRef.current.offsetHeight;
      const projectsTop = projectsSection.offsetTop;
      const projectsBottom = projectsTop + projectsSection.offsetHeight;
      const scrollY = window.scrollY;

      // Check if navbar is over the projects section
      const navbarBottom = scrollY + navbarHeight;
      const isOver = navbarBottom > projectsTop && scrollY < projectsBottom;

      setIsOverWhiteSection(isOver);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLinkClick = (url: string) => {
    setIsMenuOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${isOverWhiteSection ? styles.dark : ""}`}
    >
      <div className={styles.container}>
        <button onClick={() => scrollToSection("hero")} className={styles.logo}>
          Shreyansh S.
        </button>

        {/* Desktop Links */}
        <div className={styles.links}>
          <a
            href="https://docs.google.com/document/d/1Vw8o7sdbFUlLboA60-7G1vXnr9KwLxfz/edit?usp=sharing&ouid=108657753575809953552&rtpof=true&sd=true"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Resume
          </a>
          <button
            onClick={() => scrollToSection("hero")}
            className={styles.link}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={styles.link}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={styles.link}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={styles.link}
          >
            Contact
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.mobileLinks}>
          <button
            onClick={() => scrollToSection("hero")}
            className={styles.mobileLink}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={styles.mobileLink}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={styles.mobileLink}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={styles.mobileLink}
          >
            Contact
          </button>
          <button
            onClick={() =>
              handleLinkClick(
                "https://docs.google.com/document/d/1Vw8o7sdbFUlLboA60-7G1vXnr9KwLxfz/edit?usp=sharing&ouid=108657753575809953552&rtpof=true&sd=true"
              )
            }
            className={styles.mobileLink}
          >
            Resume
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;
