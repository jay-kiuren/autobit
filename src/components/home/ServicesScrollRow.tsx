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
  { eyebrow: "Web Applications", heading: "Dashboards, CRMs,\nand SaaS tools.", price: "$1,500+", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" },
  { eyebrow: "Business Systems", heading: "One system.\nYour entire operation.", price: "$3,000+", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { eyebrow: "Robotics & Physical AI", heading: "Edge AI.\nIndustrial-grade.", price: "$3,000+", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80" },
  { eyebrow: "Mobile Applications", heading: "iOS + Android.\nShipped fast.", price: "$2,000+", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" },
];

const ServicesScrollRow = () => (
  <section className="bg-background pb-20">
    <div className="section-container">
      <ScrollReveal>
        <h2 className="text-[clamp(24px,3.5vw,32px)] font-semibold text-foreground mb-6">Every layer of your stack.</h2>
      </ScrollReveal>
      <div className="flex gap-5 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-4">
        {cards.map((card, i) => (
          <ScrollReveal key={card.eyebrow} delay={i * 0.08} className="min-w-[320px] md:min-w-[380px] snap-start">
            <div
              className="relative rounded-lg min-h-[460px] flex flex-col cursor-pointer overflow-hidden group"
              style={cardElevation}
              onMouseEnter={(e) => { e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.18)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = cardElevation.boxShadow as string; e.currentTarget.style.transform = 'translateZ(0)'; }}
            >
              <div className="relative flex-1 min-h-[200px]">
                <img
                  src={card.image}
                  alt={card.eyebrow}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'brightness(0.72) saturate(0.85)', borderRadius: 'inherit' }}
                  loading="lazy"
                />
              </div>
              <div className="relative z-[1] p-8" style={{ background: '#1c1c1e' }}>
                <span className="text-eyebrow text-sm">{card.eyebrow}</span>
                <h3 className="text-[21px] font-semibold text-foreground leading-[1.2] tracking-[-0.3px] mt-2 whitespace-pre-line">{card.heading}</h3>
                <p className="text-[17px] text-foreground mt-2">{card.price}</p>
                <div className="flex gap-4 mt-4">
                  <span className="text-link-blue text-[17px] cursor-pointer">Learn more</span>
                  <span className="text-link-blue text-[17px] cursor-pointer">Get a quote →</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesScrollRow;
