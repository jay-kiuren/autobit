import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { cardElevation, hoverIn, hoverOut } from "./styles";

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

interface TierCardProps {
  tier: typeof tiers[0];
}

const TierCard = ({ tier }: TierCardProps) => (
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
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className="mt-6 inline-flex items-center justify-center py-3 px-[26px] rounded-[980px] bg-[#2997ff] text-white text-[15px] font-medium hover:bg-[#0077ed] hover:scale-[1.02] transition-all duration-200 border-none cursor-pointer"
    >
      Get a quote
    </button>
  </div>
);

const PricingGridSection = () => (
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
            <TierCard tier={tier} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default PricingGridSection;
