import { Plus, Activity, Heart, Microscope } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const pills = ['CNN Model', 'DOST Verified', 'Patent Held'];

const floatingIcons = [
  { Icon: Plus, top: '12%', left: '8%' },
  { Icon: Activity, top: '20%', left: '88%' },
  { Icon: Heart, top: '70%', left: '6%' },
  { Icon: Microscope, top: '65%', left: '90%' },
];

const EarlynxPanel = () => (
  <section style={{
    width: '100%', background: '#000000', padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden', minHeight: '60vh',
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,255,255,0.06), transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)',
      width: '900px', height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
      pointerEvents: 'none', zIndex: 0,
    }} />
    {floatingIcons.map(({ Icon, top, left }, i) => (
      <Icon key={i} size={48} style={{ position: 'absolute', top, left, color: 'rgba(255,255,255,0.04)', pointerEvents: 'none', zIndex: 0 }} />
    ))}
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <span style={{
        display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '980px', padding: '6px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.60)', fontFamily: font, marginBottom: '20px',
      }}>National Winner · Patent Held</span>
      <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '16px' }}>EARLYNX — Medical AI</p>
      <h2 style={{ fontFamily: font, fontSize: '56px', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.0, color: '#ffffff', margin: 0 }}>
        AI cancer screening.<br />Nationally awarded.
      </h2>
      <p style={{ fontFamily: font, fontSize: '17px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, maxWidth: '560px', margin: '16px auto 0', textAlign: 'center' }}>
        Non-invasive diagnostic prototype using sensor fusion and CNN model to analyze saliva samples. Evaluated and verified by DOST. Champion at 2026 Congress Life and Science Category.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
        <a href="/projects#earlynx" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Learn more</a>
        <a href="/projects" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>See all projects →</a>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
        {pills.map(p => (
          <span key={p} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '980px', padding: '10px 28px', fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontFamily: font,
          }}>{p}</span>
        ))}
      </div>
    </div>
  </section>
);

export default EarlynxPanel;
