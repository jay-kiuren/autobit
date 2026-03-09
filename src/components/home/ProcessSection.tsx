import { ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const floatingIcons = [
  { Icon: ArrowRight, top: '12%', left: '7%' },
  { Icon: CheckCircle, top: '25%', left: '88%' },
  { Icon: Clock, top: '70%', left: '5%' },
  { Icon: Star, top: '65%', left: '92%' },
];

const steps = [
  { n: '01', title: 'Describe the problem', body: "Tell us what's broken. A message is enough." },
  { n: '02', title: 'Fixed price in 24h', body: 'Scoped quote and timeline. No hourly billing ever.' },
  { n: '03', title: '50% deposit, we build', body: 'We start immediately. Tier 1 ships in 2–5 days.' },
  { n: '04', title: 'Review and deliver', body: 'Final 50% after your approval. Docs included.' },
];

const ProcessSection = () => (
  <section style={{
    width: '100%', background: '#080808', padding: '100px 10%',
    borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(255,255,255,0.04), transparent 50%)', pointerEvents: 'none', zIndex: 0 }} />
    {floatingIcons.map(({ Icon, top, left }, i) => (
      <Icon key={i} size={32} style={{ position: 'absolute', top, left, color: 'rgba(255,255,255,0.04)', pointerEvents: 'none', zIndex: 0 }} />
    ))}
    <h2 style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, letterSpacing: '-1.5px', color: '#ffffff', textAlign: 'center', marginBottom: '64px', position: 'relative', zIndex: 1 }}>From problem to working system.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', position: 'relative', zIndex: 1 }}>
      {steps.map(s => (
        <div key={s.n} style={{ borderTop: '2px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
          <span style={{ fontFamily: font, fontSize: '80px', fontWeight: 800, color: 'rgba(255,255,255,0.04)', letterSpacing: '-2px', lineHeight: 1, display: 'block' }}>{s.n}</span>
          <h3 style={{ fontFamily: font, fontSize: '20px', fontWeight: 600, color: '#ffffff', marginTop: '12px' }}>{s.title}</h3>
          <p style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.40)', lineHeight: 1.6, marginTop: '8px' }}>{s.body}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProcessSection;
