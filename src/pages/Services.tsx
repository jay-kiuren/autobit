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

const services = [
  { id: "automation", eyebrow: "Workflow Automation", heading: "Eliminate manual work.", desc: "Zapier, Make, n8n pipelines. We design and deploy automation systems that remove repetitive tasks from your operation.", price: "From $800 · 2–5 days", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { id: "ai-agents", eyebrow: "AI Agents", heading: "Custom AI that works 24/7.", desc: "Purpose-built AI agents for customer support, lead qualification, data processing, and internal operations.", price: "From $1,200 · 5–10 days", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
  { id: "web-apps", eyebrow: "Web Applications", heading: "Dashboards, CRMs, and SaaS tools.", desc: "React, Firebase, Vercel. Full-stack web applications built for speed, scale, and clean UX.", price: "From $1,500 · 7–14 days", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" },
  { id: "systems", eyebrow: "Business Systems", heading: "One system. Your entire operation.", desc: "End-to-end operational software — inventory, HR, finance, scheduling — unified in one platform.", price: "From $3,000 · 14–30 days", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { id: "robotics", eyebrow: "Robotics & Physical AI", heading: "Edge AI. Industrial-grade.", desc: "PLC integration, sensor fusion, computer vision, and embedded AI for physical systems and industrial environments.", price: "From $3,000 · 14–30 days", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80" },
  { id: "mobile", eyebrow: "Mobile Applications", heading: "iOS + Android. Shipped fast.", desc: "React Native mobile apps — cross-platform, performant, and production-ready.", price: "From $2,000 · 10–21 days", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" },
];

const Services = () => {
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
              <span className="text-eyebrow block mb-2">What we do</span>
              <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground">
                Services
              </h1>
              <p className="text-body mt-3 max-w-[600px]">
                Engineering services from automation to full-stack systems. Fixed pricing. Fast delivery.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {services.map((s, i) => (
                <ScrollReveal key={s.id} delay={i * 0.08}>
                  <div
                    id={s.id}
                    className="rounded-lg overflow-hidden cursor-pointer group flex flex-col"
                    style={cardElevation}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    <div className="relative min-h-[200px]">
                      <img
                        src={s.image}
                        alt={s.eyebrow}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: 'brightness(0.72) saturate(0.85)' }}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-8" style={{ background: '#1c1c1e' }}>
                      <span className="text-eyebrow text-sm">{s.eyebrow}</span>
                      <h3 className="text-[21px] font-semibold text-foreground leading-[1.2] tracking-[-0.3px] mt-2">{s.heading}</h3>
                      <p className="text-body text-sm mt-2">{s.desc}</p>
                      <p className="text-foreground text-[17px] mt-3">{s.price}</p>
                      <div className="flex gap-4 mt-4">
                        <span className="text-link-blue text-[17px] cursor-pointer">Learn more</span>
                        <a href="mailto:autobitofficial.ph@gmail.com" className="text-link-blue text-[17px] cursor-pointer">Get a quote →</a>
                      </div>
                    </div>
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

export default Services;
