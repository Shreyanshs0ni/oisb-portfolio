"use client";

import { CuteRobot } from "./CuteRobot";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Left side - Brand and copyright */}
          <div className={styles.leftSection}>
            {/* Top section with brand */}
            <div className={styles.brand}>
              <span className={styles.brandName}>
                <span className={styles.accent}>Shreyansh</span> Soni
              </span>
              <p className={styles.tagline}>
                Building digital experiences with passion
              </p>
            </div>

            {/* Copyright */}
            <p className={styles.copyright}>
              © {currentYear}{" "}
              <span className={styles.accent}>Shreyansh Soni</span>. All rights
              reserved.
            </p>
          </div>

          {/* Right side - 3D Robot */}
          <div className={styles.robotWrapper}>
            <CuteRobot />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
