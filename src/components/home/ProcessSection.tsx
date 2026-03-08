import ScrollReveal from "../ScrollReveal";

const steps = [
  { number: "01", title: "Describe the problem", body: "Tell us what's broken or slow. A message is enough. No lengthy briefs required." },
  { number: "02", title: "Fixed price in 24 hours", body: "Scoped quote and delivery timeline within one business day. No hourly billing." },
  { number: "03", title: "50% deposit, we build", body: "We start immediately. Tier 1 projects ship in 2–5 days." },
  { number: "04", title: "Review and deliver", body: "Final 50% only after your approval. Full documentation included." },
];

const ProcessSection = () => (
  <section className="bg-background border-t border-border">
    <div className="section-container py-20">
      <ScrollReveal>
        <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-foreground text-center">From problem to working system.</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-14">
        {steps.map((s, i) => (
          <ScrollReveal key={s.number} delay={i * 0.08}>
            <div className="border-t border-input pt-6">
              <span className="text-[48px] font-bold text-[rgba(255,255,255,0.06)] block leading-none">{s.number}</span>
              <h3 className="text-[21px] font-semibold text-foreground mt-2">{s.title}</h3>
              <p className="text-[17px] text-ab-text-muted leading-[1.4] mt-2">{s.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
