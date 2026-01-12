import {
  Navbar,
  ThreeBackground,
  CustomCursor,
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

      {/* Navigation */}
      <Navbar />

      {/* 3D Background */}
      <ThreeBackground />

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
