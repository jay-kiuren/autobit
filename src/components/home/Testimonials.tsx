import ScrollReveal from "../ScrollReveal";

const testimonials = Array.from({ length: 6 }, (_, i) => ({
  name: "[Client Name]",
  handle: "@handle",
  quote: "Replace with actual client testimonial — specific outcome, real result.",
}));

const Testimonials = () => (
  <section className="bg-background border-t border-border">
    <div className="section-container py-20">
      <ScrollReveal>
        <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-foreground text-center">Trusted by builders.</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-12">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="bg-ab-card rounded-lg p-7 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.06)]" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-ab-text-muted">{t.handle}</div>
                </div>
              </div>
              <p className="text-[15px] text-ab-text-secondary leading-[1.5] mt-4">{t.quote}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
