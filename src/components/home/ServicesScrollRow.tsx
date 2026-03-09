import { useState } from 'react';
import { Code2, Database, Globe, Smartphone, Server, Shield, Terminal, Layers } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const scatterIcons = [
  { Icon: Code2, top: '5%', left: '3%' },
  { Icon: Database, top: '12%', left: '88%' },
  { Icon: Globe, top: '40%', left: '95%' },
  { Icon: Smartphone, top: '75%', left: '7%' },
  { Icon: Server, top: '60%', left: '92%' },
  { Icon: Shield, top: '30%', left: '2%' },
  { Icon: Terminal, top: '85%', left: '50%' },
  { Icon: Layers, top: '20%', left: '55%' },
];

const BrowserFrame = () => (
  <div style={{ background: '#080808', borderRadius: '8px', marginTop: '20px', border: '1px solid rgba(255,255,255,0.06)', minHeight: '160px', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,60,60,0.6)' }} />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,200,0,0.6)' }} />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,200,0,0.6)' }} />
      <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginLeft: 8 }} />
    </div>
    <div style={{ display: 'flex', height: '130px' }}>
      <div style={{ width: '25%', background: '#111', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 6, width: '80%', background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
        <div style={{ height: 6, width: '60%', background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
        <div style={{ height: 6, width: '70%', background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
      </div>
      <div style={{ width: '75%', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 8, width: '85%', background: 'rgba(255,255,255,0.08)', borderRadius: 3 }} />
        <div style={{ height: 8, width: '60%', background: 'rgba(255,255,255,0.04)', borderRadius: 3 }} />
        <div style={{ height: 8, width: '75%', background: 'rgba(255,255,255,0.04)', borderRadius: 3 }} />
      </div>
    </div>
  </div>
);

const DataTable = () => (
  <div style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', minHeight: '160px' }}>
    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', padding: '8px 14px', gap: '16px' }}>
      <span style={{ fontFamily: font, fontSize: '10px', color: 'rgba(255,255,255,0.40)', flex: 1 }}>STATUS</span>
      <span style={{ fontFamily: font, fontSize: '10px', color: 'rgba(255,255,255,0.40)', flex: 2 }}>ITEM</span>
      <span style={{ fontFamily: font, fontSize: '10px', color: 'rgba(255,255,255,0.40)', flex: 1 }}>VALUE</span>
    </div>
    {[
      { status: '#30d158', item: 'Revenue', val: '$42,800' },
      { status: '#30d158', item: 'Orders', val: '1,204' },
      { status: '#ff9f0a', item: 'Refunds', val: '18' },
      { status: '#30d158', item: 'Active Users', val: '3,891' },
    ].map((row, i) => (
      <div key={row.item} style={{ display: 'flex', padding: '10px 14px', gap: '16px', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: row.status }} />
        </div>
        <div style={{ flex: 2 }}>
          <div style={{ height: 6, width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
        </div>
        <span style={{ flex: 1, fontFamily: font, fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{row.val}</span>
      </div>
    ))}
  </div>
);

const SensorGrid = () => {
  const sensors = [
    { l: 'Sensor 1', c: '#30d158' }, { l: 'Motor A', c: '#30d158' }, { l: 'Temp', c: '#ffd60a' },
    { l: 'PLC', c: '#30d158' }, { l: 'Edge', c: '#30d158' }, { l: 'Feed', c: '#ffd60a' },
    { l: 'Input', c: '#30d158' }, { l: 'Output', c: '#30d158' }, { l: 'Status', c: '#30d158' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 20, minHeight: '160px' }}>
      {sensors.map(x => (
        <div key={x.l} style={{
          width: '60px', height: '60px', border: '1px solid rgba(0,200,150,0.15)', borderRadius: 8,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: x.c }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.50)' }}>{x.l}</span>
        </div>
      ))}
    </div>
  );
};

const PhoneFrame = () => (
  <div style={{
    width: 80, height: 140, border: '2px solid rgba(255,255,255,0.10)', borderRadius: 24,
    margin: '20px auto 0', padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, justifyContent: 'center',
  }}>
    <div style={{ height: 6, width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: 3 }} />
    <div style={{ height: 6, width: '50%', background: 'rgba(255,255,255,0.04)', borderRadius: 3 }} />
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', marginTop: 4 }} />
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
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridRow: idx < 2 ? '1 / 2' : '2 / 3',
        gridColumn: idx % 2 === 0 ? '1 / 2' : '2 / 3',
        background: '#0a0f0d',
        borderRadius: '16px',
        border: hovered ? '1px solid rgba(0,210,150,0.10)' : '1px solid rgba(0,210,150,0.10)',
        borderTop: hovered ? '1px solid rgba(0,210,150,0.45)' : '1px solid rgba(0,210,150,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        padding: '36px', overflow: 'hidden', position: 'relative', zIndex: 1, minHeight: '300px',
        transform: hovered ? 'translateY(-6px)' : 'none',
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
    width: '100%', background: '#02080a', padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0,210,150,0.12), transparent 55%)', pointerEvents: 'none', zIndex: 0 }} />
    {scatterIcons.map(({ Icon, top, left }, i) => (
      <Icon key={i} size={80} style={{ position: 'absolute', top, left, color: 'rgba(0,210,150,0.04)', pointerEvents: 'none', zIndex: 0 }} />
    ))}
    <h2 style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, letterSpacing: '-1.5px', color: '#ffffff', marginBottom: '48px', position: 'relative', zIndex: 1 }}>Every layer of your stack.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '16px', position: 'relative', zIndex: 1 }}>
      {cards.map((card, i) => <ServiceCard key={card.eyebrow} card={card} idx={i} />)}
    </div>
  </section>
);

export default ServicesScrollRow;
