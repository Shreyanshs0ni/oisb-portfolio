"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav ref={navRef} className={styles.navbar}>
      <div className={styles.container}>
        <div></div>
        <div className={styles.links}>
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
