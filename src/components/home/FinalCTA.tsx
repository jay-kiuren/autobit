import { useState, useRef } from 'react';
const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const FinalCTA = () => {
  const [btnHovered, setBtnHovered] = useState(false);
  const [clickState, setClickState] = useState<'idle' | 'opening' | 'done'>('idle');
  const [pressed, setPressed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = (e: React.MouseEvent) => {
    if (clickState !== 'idle') { e.preventDefault(); return; }
    setClickState('opening');
    timeoutRef.current = setTimeout(() => setClickState('done'), 1500);
  };

  const btnText = clickState === 'opening' ? '✓ Email opening...' : clickState === 'done' ? '✓ See you soon' : 'Start a project';

  return (
    <section className="finalcta-section" style={{
      width: '100%', background: '#000000', minHeight: '60vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
      contain: 'layout',
    }}>
      {/* glow only — no visible line */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 80% at 50% 120%, rgba(41,151,255,0.22), transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <h2 style={{
        fontFamily: font, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 800,
        letterSpacing: '-2.5px', color: '#ffffff', textAlign: 'center',
        maxWidth: '600px', margin: 0, position: 'relative', zIndex: 1,
      }}>Ready to build something real?</h2>

      <p style={{
        fontFamily: font, fontSize: '19px', color: 'rgba(255,255,255,0.45)',
        textAlign: 'center', marginTop: '12px', position: 'relative', zIndex: 1,
      }}>
        Describe your problem. Scoped and priced within 24 hours.
      </p>

      <div style={{
        display: 'flex', gap: '16px', marginTop: '40px',
        position: 'relative', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <a
          href="mailto:autobitofficial.ph@gmail.com"
          onClick={handleClick}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          style={{
            background: '#2997ff', color: '#ffffff', padding: '18px 52px',
            borderRadius: '980px', fontSize: '17px', fontWeight: 600,
            textDecoration: 'none', fontFamily: font,
            boxShadow: btnHovered
              ? '0 0 72px rgba(41,151,255,0.65), 0 0 140px rgba(41,151,255,0.30)'
              : '0 0 48px rgba(41,151,255,0.45), 0 0 96px rgba(41,151,255,0.20)',
            transform: pressed ? 'scale(0.97)' : btnHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'all 0.3s ease',
          }}
        >{btnText}</a>

        <a href="/projects" style={{
          background: 'transparent', color: '#2997ff', padding: '18px 48px',
          borderRadius: '980px', fontSize: '17px', fontWeight: 600,
          textDecoration: 'none', fontFamily: font, position: 'relative', zIndex: 1,
        }}>View our work →</a>
      </div>

      <p style={{
        fontFamily: font, fontSize: '12px', color: 'rgba(255,255,255,0.22)',
        textAlign: 'center', marginTop: '24px', letterSpacing: '0.04em',
        position: 'relative', zIndex: 1,
      }}>50% deposit · Balance on delivery · No retainers · Reply within 24h</p>
    </section>
  );
};

export default FinalCTA;
