export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section Preview */}
      <div className="text-center max-w-4xl">
        {/* Accent Line */}
        <div className="gradient-line w-24 mx-auto mb-8" />

        {/* Main Heading */}
        <h1 className="mb-6">
          <span className="text-accent">OISB</span> Portfolio
        </h1>

        {/* Subtitle */}
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          An ultra-minimal portfolio crafted with{" "}
          <span className="text-accent">Next.js</span>,{" "}
          <span className="text-accent">GSAP</span>, and{" "}
          <span className="text-accent">Three.js</span>
        </p>

        {/* Color Palette Preview */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-black border border-white/20 rounded" />
            <span className="text-subtle text-sm">#000000</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white rounded" />
            <span className="text-subtle text-sm">#FFFFFF</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-accent rounded" />
            <span className="text-subtle text-sm">#FFA500</span>
          </div>
        </div>

        {/* CTA Buttons Preview */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="btn-primary rounded-full">Primary Action</button>
          <button className="btn-outline rounded-full">Secondary Action</button>
        </div>

        {/* Bottom Accent Line */}
        <div className="gradient-line w-48 mx-auto mt-16" />
      </div>
    </main>
  );
}
