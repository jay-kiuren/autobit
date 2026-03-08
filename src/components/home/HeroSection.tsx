import ScrollReveal from "../ScrollReveal";
import ColorBends from "../ColorBends";

const HeroSection = () => (
  <section className="min-h-screen bg-background pt-[88px] pb-10 relative overflow-hidden">
    {/* Living dark texture background */}
    <ColorBends
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      colors={["#1a1a1a", "#222222", "#0d0d0d", "#111111"]}
      speed={0.15}
      rotation={45}
      transparent={true}
      warpStrength={0.8}
      frequency={0.9}
      mouseInfluence={0.4}
      parallax={0.3}
      noise={0.04}
    />

    <div className="section-container text-center relative z-[1]">
      <ScrollReveal>
        <span className="text-eyebrow block mb-2">Start Something™</span>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground max-w-[800px] mx-auto">
          AI systems engineered for what's next.
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.16}>
        <p className="text-[clamp(17px,2.5vw,21px)] font-normal text-ab-text-secondary mt-2 max-w-[700px] mx-auto">
          AI agents, automation, web applications, and intelligent robotics — built and deployed in days.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.24}>
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6">
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            className="inline-flex items-center justify-center h-11 px-8 bg-primary text-primary-foreground rounded-full text-[17px] font-semibold hover:bg-ab-link-hover hover:text-background transition-all duration-200"
          >
            Start a project
          </a>
          <a
            href="/projects"
            className="inline-flex items-center justify-center text-[17px] text-primary hover:text-ab-link-hover transition-colors"
          >
            See our work →
          </a>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.32}>
        {/* Hero visual placeholder */}
        <div className="mx-auto mt-10 max-w-[800px] min-h-[400px] rounded-lg bg-ab-card border border-border flex items-center justify-center">
          <span className="text-ab-text-muted text-sm">
            {/* Replace with high quality product render or hero graphic */}
          </span>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HeroSection;
