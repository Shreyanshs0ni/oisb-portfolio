"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav ref={navRef} className={`${styles.navbar} ${isOverWhiteSection ? styles.dark : ""}`}>
      <div className={styles.container}>
        <div></div>
        <div className={styles.links}>
          <a
            href="https://drive.google.com/file/d/18gCydAj32rNdYRmljCgtuEbsPsV3hlI0/view?usp=sharing"
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
      </div>
    </nav>
  );
}

export default Navbar;
