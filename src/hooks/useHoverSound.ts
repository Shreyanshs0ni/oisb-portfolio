"use client";

import { useEffect, useRef } from "react";

export function useHoverSound(soundPath: string = "/clickSound.wav") {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create audio element
    audioRef.current = new Audio(soundPath);
    audioRef.current.volume = 0.3; // Subtle volume

    const playSound = () => {
      if (audioRef.current) {
        // Reset to start for rapid hovers
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    };

    // Select all interactive elements
    const getInteractiveElements = () => {
      return document.querySelectorAll(
        'a, button, [role="button"], .tag, input[type="submit"], [data-hover-sound]'
      );
    };

    // Add listeners to all interactive elements
    const addListeners = () => {
      const elements = getInteractiveElements();
      elements.forEach((el) => {
        el.addEventListener("mouseenter", playSound);
      });
      return elements;
    };

    // Initial setup
    let elements = addListeners();

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      // Remove old listeners
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", playSound);
      });
      // Add new listeners
      elements = addListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      // Cleanup
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", playSound);
      });
      observer.disconnect();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath]);
}

export default useHoverSound;

