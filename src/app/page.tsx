import { ThreeBackground, HeroSection, AboutSection } from "@/components";

export default function Home() {
  return (
    <>
      {/* 3D Background */}
      <ThreeBackground />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Placeholder sections for navigation targets */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center">
          <h2 className="mb-4">
            <span className="text-accent">Projects</span> Section
          </h2>
          <p className="text-muted">Coming soon...</p>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center">
          <h2 className="mb-4">
            <span className="text-accent">Contact</span> Section
          </h2>
          <p className="text-muted">Coming soon...</p>
        </div>
      </section>
    </>
  );
}
