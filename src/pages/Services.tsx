import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    id: "automation",
    eyebrow: "Workflow Automation",
    heading: "Eliminate manual work.",
    desc: "Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.",
    price: "From $800",
    timeline: "2–5 days",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
    featured: true,
  },
  {
    id: "ai-agents",
    eyebrow: "AI Agents",
    heading: "Custom AI that works 24/7.",
    desc: "Purpose-built agents for support, lead qualification, and internal ops.",
    price: "From $1,200",
    timeline: "5–10 days",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=85",
  },
  {
    id: "web-apps",
    eyebrow: "Web Applications",
    heading: "Dashboards, CRMs, and SaaS tools.",
    desc: "React, Firebase, Vercel. Full-stack apps built for speed, scale, and clean UX.",
    price: "From $1,500",
    timeline: "7–14 days",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=85",
  },
  {
    id: "systems",
    eyebrow: "Business Systems",
    heading: "One system. Your entire operation.",
    desc: "Inventory, HR, finance, scheduling — unified in one platform.",
    price: "From $3,000",
    timeline: "14–30 days",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",
    wide: true,
  },
  {
    id: "robotics",
    eyebrow: "Robotics & Physical AI",
    heading: "Edge AI. Industrial-grade.",
    desc: "PLC integration, computer vision, and embedded AI for physical systems.",
    price: "From $3,000",
    timeline: "14–30 days",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=85",
  },
  {
    id: "mobile",
    eyebrow: "Mobile Applications",
    heading: "iOS + Android. Shipped fast.",
    desc: "React Native — cross-platform, performant, and production-ready.",
    price: "From $2,000",
    timeline: "10–21 days",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=85",
  },
];

// Shared card styles
const cardBase: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '20px',
  cursor: 'pointer',
  background: '#111',
  transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
};

const ServiceCard = ({ s, height = 420 }: { s: typeof services[0]; height?: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={s.id}
      style={{
        ...cardBase,
        height,
        transform: hovered ? 'scale(1.018)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        src={s.image}
        alt={s.eyebrow}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: `brightness(${hovered ? 0.45 : 0.38}) saturate(0.7)`,
          transition: 'filter 0.5s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1)',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
        loading="lazy"
      />

      {/* Gradient overlay — heavier at bottom */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.08) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '32px',
      }}>
        {/* Eyebrow pill */}
        <span style={{
          display: 'inline-block',
          width: 'fit-content',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          marginBottom: '10px',
        }}>
          {s.eyebrow}
        </span>

        <h3 style={{
          fontSize: s.featured ? 'clamp(24px,3vw,34px)' : '22px',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
          color: '#fff',
          margin: 0,
        }}>
          {s.heading}
        </h3>

        {/* Description — fades in on hover */}
        <p style={{
          fontSize: '15px',
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.72)',
          marginTop: '10px',
          maxWidth: '480px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.38s ease, transform 0.38s ease',
        }}>
          {s.desc}
        </p>

        {/* Price + CTA row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '18px',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
            }}>
              {s.price}
            </span>
            <span style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.42)',
              fontWeight: 400,
            }}>
              · {s.timeline}
            </span>
          </div>
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderBottom: '1px solid rgba(255,255,255,0.25)',
              paddingBottom: '1px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.25)';
            }}
          >
            Get a quote →
          </a>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  const [featured, ...rest] = services;
  const row1 = rest.slice(0, 2);       // AI Agents, Web Apps
  const wide = rest.find(s => s.wide); // Business Systems
  const row2 = rest.filter(s => !s.wide && rest.indexOf(s) >= 2); // Robotics, Mobile

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
        <section className="bg-background pt-28 pb-24">
          <div className="section-container">

            {/* Header */}
            <ScrollReveal>
              <span className="text-eyebrow block mb-2">What we do</span>
              <h1 style={{
                fontSize: 'clamp(36px,5vw,52px)',
                fontWeight: 700,
                letterSpacing: '-1.5px',
                lineHeight: 1.08,
                color: 'var(--foreground)',
                margin: 0,
              }}>
                Services
              </h1>
              <p className="text-body mt-3" style={{ maxWidth: 520 }}>
                Engineering services from automation to full-stack systems.<br />Fixed pricing. Fast delivery.
              </p>
            </ScrollReveal>

            {/* Bento grid */}
            <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Row 0: Featured full-width */}
              <ScrollReveal delay={0.05}>
                <ServiceCard s={featured} height={480} />
              </ScrollReveal>

              {/* Row 1: 2-col */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {row1.map((s, i) => (
                  <ScrollReveal key={s.id} delay={0.1 + i * 0.07}>
                    <ServiceCard s={s} height={380} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Row 2: Wide card (Business Systems) */}
              {wide && (
                <ScrollReveal delay={0.18}>
                  <ServiceCard s={wide} height={360} />
                </ScrollReveal>
              )}

              {/* Row 3: 2-col */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {row2.map((s, i) => (
                  <ScrollReveal key={s.id} delay={0.22 + i * 0.07}>
                    <ServiceCard s={s} height={360} />
                  </ScrollReveal>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
