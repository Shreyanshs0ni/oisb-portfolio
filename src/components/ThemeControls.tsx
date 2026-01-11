"use client";

import { useTheme } from "./ThemeProvider";
import styles from "./ThemeControls.module.css";

// Sun icon for light mode
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Droplet icon for orange mode
const DropletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export function ThemeControls() {
  const { isLightMode, isOrangeMode, toggleLightMode, toggleOrangeMode } = useTheme();

  return (
    <div className={styles.controls}>
      {/* Light Mode Toggle */}
      <div className={styles.toggleWrapper}>
        <span className={styles.toggleLabel}>
          {isLightMode ? <SunIcon /> : <MoonIcon />}
        </span>
        <button
          className={`${styles.toggle} ${isLightMode ? styles.active : ""}`}
          onClick={toggleLightMode}
          aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
          role="switch"
          aria-checked={isLightMode}
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>

      {/* Orange Mode Toggle */}
      <div className={styles.toggleWrapper}>
        <span className={`${styles.toggleLabel} ${styles.orangeLabel}`}>
          <DropletIcon />
        </span>
        <button
          className={`${styles.toggle} ${styles.orangeToggle} ${isOrangeMode ? styles.active : ""}`}
          onClick={toggleOrangeMode}
          aria-label={isOrangeMode ? "Disable orange accent" : "Enable orange accent"}
          role="switch"
          aria-checked={isOrangeMode}
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>
    </div>
  );
}

export default ThemeControls;

