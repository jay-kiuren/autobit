import ScrollReveal from "../ScrollReveal";

const cardElevation: React.CSSProperties = {
  background: '#1c1c1e',
  border: '1px solid rgba(255,255,255,0.00)',
  borderTop: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
  transform: 'translateZ(0)',
  transition: 'all 0.38s cubic-bezier(0.25,0.1,0.25,1)',
};

const cards = [
  {
    eyebrow: "Workflow Automation",
    heading: "Eliminate\nmanual work.",
    subtext: "From $800 · 2–5 days",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    eyebrow: "AI Agents",
    heading: "Custom AI\nthat works 24/7.",
    subtext: "From $1,200 · 5–10 days",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
];

const ServicesGrid = () => (
  <section className="bg-background">
    <div className="section-container py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      {cards.map((card, i) => (
        <ScrollReveal key={card.eyebrow} delay={i * 0.08}>
          <div
            className="relative rounded-lg min-h-[400px] flex flex-col justify-end cursor-pointer overflow-hidden group"
            style={cardElevation}
            onMouseEnter={(e) => { e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.18)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = cardElevation.boxShadow as string; e.currentTarget.style.transform = 'translateZ(0)'; }}
          >
            <img
              src={card.image}
              alt={card.eyebrow}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              style={{ filter: 'brightness(0.72) saturate(0.85)' }}
              loading="lazy"
            />
            <div className="relative z-[1] p-10">
              <span className="text-eyebrow text-sm">{card.eyebrow}</span>
              <h3 className="text-[clamp(24px,3.5vw,32px)] font-semibold text-foreground leading-[1.2] tracking-[-0.5px] mt-2 whitespace-pre-line">{card.heading}</h3>
              <p className="text-[17px] text-foreground mt-3">{card.subtext}</p>
              <div className="flex gap-4 mt-4">
                <span className="text-link-blue text-[17px] cursor-pointer">Learn more</span>
                <span className="text-link-blue text-[17px] cursor-pointer">Get a quote →</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default ServicesGrid;
