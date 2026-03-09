import { useState } from 'react';
import { Code2, Database, Cpu, Globe, Smartphone, Zap, Bot, Shield } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const floatingIcons = [
  { Icon: Code2, top: '8%', left: '5%' },
  { Icon: Database, top: '15%', left: '85%' },
  { Icon: Cpu, top: '45%', left: '92%' },
  { Icon: Globe, top: '75%', left: '10%' },
  { Icon: Smartphone, top: '60%', left: '80%' },
  { Icon: Zap, top: '25%', left: '50%' },
  { Icon: Bot, top: '85%', left: '45%' },
  { Icon: Shield, top: '35%', left: '15%' },
];

const BrowserFrame = () => (
  <div style={{ background: '#080808', borderRadius: '8px', marginTop: '20px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,60,60,0.6)' }} />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,200,0,0.6)' }} />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,200,0,0.6)' }} />
      <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginLeft: 8 }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 10, width: '80%', background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
      <div style={{ height: 10, width: '55%', background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
      <div style={{ height: 10, width: '70%', background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <div style={{ width: 48, height: 28, background: 'rgba(41,151,255,0.2)', borderRadius: 4 }} />
        <div style={{ width: 48, height: 28, background: 'rgba(48,209,88,0.2)', borderRadius: 4 }} />
      </div>
    </div>
  </div>
);

const DataTable = () => (
  <div style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
    {['Revenue — $42,800', 'Orders — 1,204', 'Refunds — 18', 'Active Users — 3,891'].map((row, i) => (
      <div key={row} style={{ padding: '10px 16px', fontSize: 14, fontFamily: font, color: 'rgba(255,255,255,0.45)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>{row}</div>
    ))}
  </div>
);

const SensorGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
    {[
      { l: 'Sensor 1', s: 'OK', c: '#30d158' },
      { l: 'Motor A', s: 'Active', c: '#ffd60a' },
      { l: 'Temp', s: '72°C', c: '#ff9f0a' },
      { l: 'Pressure', s: 'Normal', c: '#30d158' },
    ].map(x => (
      <div key={x.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: x.c }} />
        <span style={{ fontFamily: font, fontSize: 14, color: 'rgba(255,255,255,0.50)' }}>{x.l}: {x.s}</span>
      </div>
    ))}
  </div>
);

const PhoneFrame = () => (
  <div style={{ width: 140, height: 240, border: '2px solid rgba(255,255,255,0.12)', borderRadius: 24, margin: '20px auto 0', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ height: 14, width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }} />
    <div style={{ height: 14, width: '40%', background: 'rgba(41,151,255,0.2)', borderRadius: 4, alignSelf: 'center' }} />
  </div>
);

interface CardData { eyebrow: string; title: string; body?: string; price: string; visual: React.ReactNode }

const cards: CardData[] = [
  { eyebrow: 'Web Applications', title: 'Dashboards, CRMs, and SaaS tools.', body: 'Custom-built on React, Firebase, Vercel. Designed to perform.', price: 'From $1,500+', visual: <BrowserFrame /> },
  { eyebrow: 'Business Systems', title: 'One system. Your entire operation.', body: 'End-to-end operational software connecting your team, data, and processes.', price: 'From $3,000+', visual: <DataTable /> },
  { eyebrow: 'Robotics & Physical AI', title: 'Edge AI. Industrial-grade.', body: 'PLC integration, edge inference, real-world sensor systems.', price: 'From $3,000+', visual: <SensorGrid /> },
  { eyebrow: 'Mobile Applications', title: 'iOS + Android. Shipped fast.', price: 'From $2,000+', visual: <PhoneFrame /> },
];

const ServiceCard = ({ card, idx }: { card: CardData; idx: number }) => {
  const [hovered, setHovered] = useState(false);
  const gridRow = idx < 2 ? '1 / 2' : '2 / 3';
  const gridCol = idx % 2 === 0 ? '1 / 2' : '2 / 3';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridRow,
        gridColumn: gridCol,
        background: '#0d0d0d',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '32px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25,0.1,0.25,1)',
      }}
    >
      <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.08em' }}>{card.eyebrow}</p>
      <h3 style={{ fontFamily: font, fontSize: '24px', fontWeight: 700, color: '#ffffff', marginTop: '8px', letterSpacing: '-0.5px' }}>{card.title}</h3>
      {card.body && <p style={{ fontFamily: font, fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginTop: '8px' }}>{card.body}</p>}
      <p style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>{card.price}</p>
      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <a href="/services" style={{ fontFamily: font, fontSize: '13px', color: '#2997ff', textDecoration: 'none' }}>Learn more</a>
        <a href="mailto:autobitofficial.ph@gmail.com" style={{ fontFamily: font, fontSize: '13px', color: '#2997ff', textDecoration: 'none' }}>Get a quote →</a>
      </div>
      {card.visual}
    </div>
  );
};

const ServicesScrollRow = () => (
  <section style={{
    width: '100%',
    background: '#000000',
    padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(0,200,150,0.05), transparent)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Floating tech icons */}
    {floatingIcons.map(({ Icon, top, left }, i) => (
      <Icon key={i} size={32} style={{ position: 'absolute', top, left, color: 'rgba(255,255,255,0.04)', pointerEvents: 'none', zIndex: 0 }} />
    ))}
    <h2 style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, letterSpacing: '-1.5px', color: '#ffffff', marginBottom: '48px', position: 'relative', zIndex: 1 }}>Every layer of your stack.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '16px', position: 'relative', zIndex: 1 }}>
      {cards.map((card, i) => <ServiceCard key={card.eyebrow} card={card} idx={i} />)}
    </div>
  </section>
);

export default ServicesScrollRow;
