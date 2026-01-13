"use client";

import { useState } from "react";
import {
  Navbar,
  CustomCursor,
  MusicPlayer,
  HoverSoundProvider,
  Preloader,
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  OisbAppsSection,
  ContactSection,
  Footer,
} from "@/components";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Hover Sound Effect */}
      <HoverSoundProvider />

      {/* Music Player */}
      <MusicPlayer />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* OisB Apps Section */}
        <OisbAppsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
