import ScrollReveal from "../ScrollReveal";

const cards = [
  { eyebrow: "Web Applications", heading: "Dashboards, CRMs,\nand SaaS tools.", price: "$1,500+" },
  { eyebrow: "Business Systems", heading: "One system.\nYour entire operation.", price: "$3,000+" },
  { eyebrow: "Robotics & Physical AI", heading: "Edge AI.\nIndustrial-grade.", price: "$3,000+" },
  { eyebrow: "Mobile Applications", heading: "iOS + Android.\nShipped fast.", price: "$2,000+" },
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
            <div className="bg-ab-card rounded-lg p-8 min-h-[460px] flex flex-col border border-border card-hover-effect cursor-pointer">
              {/* Visual placeholder */}
              <div className="flex-1 rounded-md bg-[rgba(255,255,255,0.02)] mb-6 min-h-[200px]" />
              <span className="text-eyebrow text-sm">{card.eyebrow}</span>
              <h3 className="text-[21px] font-semibold text-foreground leading-[1.2] tracking-[-0.3px] mt-2 whitespace-pre-line">{card.heading}</h3>
              <p className="text-[17px] text-foreground mt-2">{card.price}</p>
              <div className="flex gap-4 mt-4">
                <span className="text-link-blue text-[17px] cursor-pointer">Learn more</span>
                <span className="text-link-blue text-[17px] cursor-pointer">Get a quote →</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesScrollRow;
