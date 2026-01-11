/**
 * GSAP Plugin Registration
 * 
 * This file centralizes all GSAP plugin imports and registrations.
 * Import this file once in your app (e.g., in layout.tsx or a provider)
 * to ensure plugins are available throughout your application.
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
// This only needs to be done once, and must happen before using them
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

// Export for convenience
export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin };

// Optional: Configure default settings
gsap.defaults({
  ease: "power2.out",
  duration: 0.8,
});

// Optional: Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  markers: process.env.NODE_ENV === "development" ? false : false, // Set to true for debugging
});

