import { useRef } from "react";

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';

const cards = [
  { eyebrow: "Web Applications", heading: "Dashboards, CRMs,\nand SaaS tools.", price: "From $1,500+", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=90" },
  { eyebrow: "Business Systems", heading: "One system.\nYour entire operation.", price: "From $3,000+", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90" },
  { eyebrow: "Robotics & Physical AI", heading: "Edge AI.\nIndustrial-grade.", price: "From $3,000+", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=90" },
  { eyebrow: "Mobile Applications", heading: "iOS + Android.\nShipped fast.", price: "From $2,000+", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=90" },
];

const ServicesScrollRow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ width: '100%', background: '#0a0a0a', padding: '80px 0' }}>
      <h2 style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, letterSpacing: '-1.5px', color: '#ffffff', padding: '0 80px 40px' }}>
        Every layer of your stack.
      </h2>
      <div
        ref={scrollRef}
        className="scrollbar-hidden"
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '20px',
          padding: '0 80px',
          scrollSnapType: 'x mandatory',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.eyebrow}
            style={{
              minWidth: '380px',
              height: '520px',
              borderRadius: '18px',
              background: '#161617',
              position: 'relative',
              overflow: 'hidden',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              borderTop: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'all 0.38s cubic-bezier(0.25,0.1,0.25,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.10)';
            }}
          >
            <div style={{ position: 'relative', height: '60%' }}>
              <img src={card.image} alt={card.eyebrow} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.70) saturate(0.85)' }} />
            </div>
            <div style={{ padding: '24px', height: '40%', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{card.eyebrow}</span>
              <h3 style={{ fontFamily: font, fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px', color: '#ffffff', marginTop: '6px', whiteSpace: 'pre-line', lineHeight: 1.2 }}>{card.heading}</h3>
              <p style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>{card.price}</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', color: '#2997ff', cursor: 'pointer' }}>Learn more</span>
                <span style={{ fontFamily: font, fontSize: '13px', color: '#2997ff', cursor: 'pointer' }}>Get a quote →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesScrollRow;
