import ScrollReveal from "../ScrollReveal";

interface FeaturedProjectProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  badge?: string;
  image?: string;
}

const FeaturedProject = ({ eyebrow, heading, subheading, ctaPrimary, ctaSecondary, badge, image }: FeaturedProjectProps) => (
  <section className="min-h-[580px] bg-background flex items-center">
    <div className="section-container py-20 text-center w-full">
      <ScrollReveal>
        <span className="text-eyebrow">{eyebrow}</span>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h2 className="text-[clamp(28px,4.5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground mt-2 whitespace-pre-line">
          {heading}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.16}>
        <p className="text-[clamp(17px,2.2vw,21px)] text-ab-text-secondary mt-2 max-w-[600px] mx-auto">{subheading}</p>
      </ScrollReveal>
      {badge && (
        <ScrollReveal delay={0.2}>
          <span className="inline-block mt-4 text-xs bg-[rgba(255,255,255,0.08)] text-foreground px-3 py-1 rounded-full">{badge}</span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.24}>
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6">
          <a href={ctaPrimary.href} className="inline-flex items-center justify-center h-11 px-8 bg-primary text-primary-foreground rounded-full text-[17px] font-semibold hover:bg-ab-link-hover hover:text-background transition-all duration-200">
            {ctaPrimary.text}
          </a>
          {ctaSecondary && (
            <a href={ctaSecondary.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[17px] text-primary hover:text-ab-link-hover transition-colors">
              {ctaSecondary.text}
            </a>
          )}
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.32}>
        <div className="relative mx-auto mt-10 max-w-[900px] min-h-[320px] rounded-lg border border-border overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={eyebrow}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              style={{ filter: 'brightness(0.65)' }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full min-h-[320px] bg-[#0a0a0a]" />
          )}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default FeaturedProject;
