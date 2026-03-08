import ScrollReveal from "../ScrollReveal";

const FinalCTA = () => (
  <section className="bg-background border-t border-border">
    <div className="section-container py-[120px] text-center">
      <ScrollReveal>
        <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] text-foreground">Ready to build something real?</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <p className="text-[21px] text-ab-text-secondary mt-2">Describe your problem. Scoped and priced within 24 hours.</p>
      </ScrollReveal>
      <ScrollReveal delay={0.16}>
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            className="inline-flex items-center justify-center h-11 px-8 bg-primary text-primary-foreground rounded-full text-[17px] font-semibold hover:bg-ab-link-hover hover:text-background transition-all duration-200"
          >
            Start a project
          </a>
          <a href="/projects" className="inline-flex items-center justify-center text-[17px] text-primary hover:text-ab-link-hover transition-colors">
            View our work →
          </a>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.24}>
        <p className="text-xs text-ab-text-muted mt-5">50% deposit to start · Balance on delivery · No retainers</p>
      </ScrollReveal>
    </div>
  </section>
);

export default FinalCTA;
