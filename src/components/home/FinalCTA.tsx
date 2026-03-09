import { useState } from 'react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const FinalCTA = () => {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section style={{
      width: '100%', background: '#000000', minHeight: '50vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '100px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden',
      backgroundImage: [
        'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(41,151,255,0.14), transparent 65%)',
        'radial-gradient(ellipse 40% 40% at 30% 80%, rgba(41,151,255,0.06), transparent)',
        'radial-gradient(ellipse 40% 40% at 70% 80%, rgba(41,151,255,0.06), transparent)',
      ].join(', '),
    }}>
      {/* Horizontal light beam */}
      <div style={{
        position: 'absolute', left: '10%', right: '10%', top: '50%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(41,151,255,0.20), transparent)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <h2 style={{
        fontFamily: font, fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 800,
        letterSpacing: '-2.5px', color: '#ffffff', textAlign: 'center', maxWidth: '600px', margin: 0,
        position: 'relative', zIndex: 1,
      }}>Ready to build something real?</h2>
      <p style={{ fontFamily: font, fontSize: '19px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginTop: '12px', position: 'relative', zIndex: 1 }}>
        Describe your problem. Scoped and priced within 24 hours.
      </p>
      <div style={{ display: 'flex', gap: '16px', marginTop: '40px', position: 'relative', zIndex: 1 }}>
        <a
          href="mailto:autobitofficial.ph@gmail.com"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            background: '#2997ff', color: '#ffffff', padding: '18px 48px', borderRadius: '980px',
            fontSize: '17px', fontWeight: 600, textDecoration: 'none', fontFamily: font,
            boxShadow: btnHovered
              ? '0 0 60px rgba(41,151,255,0.50), 0 0 120px rgba(41,151,255,0.25)'
              : '0 0 40px rgba(41,151,255,0.35), 0 0 80px rgba(41,151,255,0.15)',
            transform: btnHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'all 0.3s ease',
          }}
        >Start a project</a>
        <a href="/projects" style={{
          background: 'transparent', color: '#2997ff', padding: '18px 48px', borderRadius: '980px',
          fontSize: '17px', fontWeight: 600, textDecoration: 'none', fontFamily: font,
          position: 'relative', zIndex: 1,
        }}>View our work →</a>
      </div>
      <p style={{
        fontFamily: font, fontSize: '12px', color: 'rgba(255,255,255,0.22)', textAlign: 'center',
        marginTop: '24px', letterSpacing: '0.04em', position: 'relative', zIndex: 1,
      }}>50% deposit · Balance on delivery · No retainers · Reply within 24h</p>
    </section>
  );
};

export default FinalCTA;
