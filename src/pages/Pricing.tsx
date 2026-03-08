import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const cardElevation: React.CSSProperties = {
  background: '#1c1c1e',
  border: '1px solid rgba(255,255,255,0.00)',
  borderTop: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
  transform: 'translateZ(0)',
  transition: 'all 0.38s cubic-bezier(0.25,0.1,0.25,1)',
};

const hoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.18)';
  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)';
  e.currentTarget.style.transform = 'translateY(-4px)';
};
const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.10)';
  e.currentTarget.style.boxShadow = cardElevation.boxShadow as string;
  e.currentTarget.style.transform = 'translateZ(0)';
};

const tiers = [
  {
    name: "Automation",
    price: "$800",
    timeline: "2–5 days",
    features: ["Zapier / Make / n8n pipelines", "API integrations", "Workflow design & deployment", "Documentation & handoff"],
  },
  {
    name: "AI Agent",
    price: "$1,200",
    timeline: "5–10 days",
    features: ["Custom AI agent build", "LLM integration & fine-tuning", "24/7 autonomous operation", "Monitoring dashboard"],
  },
  {
    name: "Web / Mobile App",
    price: "$1,500",
    timeline: "7–21 days",
    features: ["Full-stack React application", "Database & auth setup", "Responsive design", "Deployment & hosting"],
    popular: true,
  },
  {
    name: "Enterprise System",
    price: "$3,000",
    timeline: "14–30 days",
    features: ["End-to-end operational platform", "Multi-module integration", "Admin dashboard & analytics", "Training & ongoing support"],
  },
];

const Pricing = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main
        style={{
          filter: navDropdownActive ? 'blur(8px)' : 'none',
          opacity: navDropdownActive ? 0.45 : 1,
          transition: 'filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <section className="bg-background pt-28 pb-20">
          <div className="section-container">
            <ScrollReveal>
              <span className="text-eyebrow block mb-2">Transparent pricing</span>
              <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground">
                Pricing
              </h1>
              <p className="text-body mt-3 max-w-[600px]">
                Fixed-price packages. No hourly billing. You know the cost before we start.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {tiers.map((tier, i) => (
                <ScrollReveal key={tier.name} delay={i * 0.08}>
                  <div
                    className="rounded-lg p-8 flex flex-col h-full cursor-pointer relative"
                    style={cardElevation}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    {tier.popular && (
                      <span className="absolute top-4 right-4 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
                        Popular
                      </span>
                    )}
                    <span className="text-eyebrow text-sm">{tier.name}</span>
                    <div className="mt-3">
                      <span className="text-[32px] font-bold text-foreground">{tier.price}</span>
                      <span className="text-caption ml-1">+</span>
                    </div>
                    <p className="text-caption mt-1">{tier.timeline}</p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="text-body text-sm flex items-start gap-2">
                          <span className="text-primary mt-0.5">·</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="mailto:autobitofficial.ph@gmail.com"
                      className="mt-6 inline-flex items-center justify-center h-10 rounded-full bg-[rgba(255,255,255,0.08)] text-foreground text-sm font-medium hover:bg-[rgba(255,255,255,0.14)] transition-colors"
                    >
                      Get a quote
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;
