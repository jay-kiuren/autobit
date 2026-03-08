import ScrollReveal from "../ScrollReveal";

const cases = [
  {
    badge: "Active Development",
    eyebrow: "Industrial AI · Platform",
    heading: "AXONIS Platform",
    body: "Open-core decentralized AI safety OS for critical infrastructure. Edge AI, cryptographic proof, privacy-first architecture.",
    href: "/projects#axonis",
  },
  {
    badge: "Stage 0 · MVP",
    eyebrow: "Mining Safety · AI Engine",
    heading: "MineSafe AI",
    body: "Multi-sensor hazard detection with emergency relay to PDRRMO on Level 5 events.",
    href: "/projects#minesafe",
  },
  {
    badge: "Live · In Use",
    eyebrow: "Education Tech",
    heading: "School Operations Platform",
    body: "Full management software deployed in educational institutions. Live in production.",
    href: "/projects#school",
  },
];

const CaseStudies = () => (
  <section className="bg-background border-t border-border">
    <div className="section-container py-20">
      <ScrollReveal>
        <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-foreground text-center">Real systems. Real results.</h2>
        <p className="text-[21px] text-ab-text-secondary text-center mt-2">Every project below is built, deployed, and running.</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {cases.map((c, i) => (
          <ScrollReveal key={c.heading} delay={i * 0.08}>
            <div className="bg-ab-card rounded-lg p-8 min-h-[320px] flex flex-col border border-border card-hover-effect">
              {/* Image placeholder */}
              <div className="rounded-md bg-[rgba(255,255,255,0.02)] h-[140px] mb-4" />
              <span className="inline-block text-[10px] bg-[rgba(255,255,255,0.08)] text-foreground px-2 py-0.5 rounded-full w-fit">{c.badge}</span>
              <span className="text-caption mt-3">{c.eyebrow}</span>
              <h3 className="text-[21px] font-semibold text-foreground mt-1">{c.heading}</h3>
              <p className="text-body text-sm mt-2 flex-1">{c.body}</p>
              <a href={c.href} className="text-link-blue text-[17px] mt-4">Learn more →</a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
