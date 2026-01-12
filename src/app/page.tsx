import {
  Navbar,
  CustomCursor,
  MusicPlayer,
  HoverSoundProvider,
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  OisbAppsSection,
  ContactSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Hover Sound Effect */}
      <HoverSoundProvider />

      {/* Music Player */}
      <MusicPlayer />

      {/* Navigation */}
      <Navbar />

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

      {/* Footer */}
      <Footer />
    </>
  );
}
