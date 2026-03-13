const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const FinalCTA = () => {
  return (
    <section style={{
      width: '100%', background: '#000000', minHeight: '60vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px',
      position: 'relative', overflow: 'hidden',
      contain: 'layout',
    }}>
      {/* Grain texture overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.35 }}>
        <filter id="finalcta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#finalcta-grain)" opacity="0.12" />
      </svg>

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <h2 style={{
        fontFamily: `'SF Pro Display', ${font}`,
        fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700,
        letterSpacing: '-0.035em', lineHeight: 1.04,
        color: '#ffffff', textAlign: 'center',
        maxWidth: '600px', margin: 0, position: 'relative', zIndex: 2,
        WebkitFontSmoothing: 'antialiased',
      }}>Build something others won't.</h2>

      <p style={{
        fontFamily: `'SF Pro Text', ${font}`,
        fontSize: '17px', color: 'rgba(255,255,255,0.55)',
        textAlign: 'center', marginTop: '14px', position: 'relative', zIndex: 2,
        lineHeight: 1.5,
      }}>
        Describe your problem. Scoped and priced within 24 hours.
      </p>

      <div style={{
        display: 'flex', gap: '12px', marginTop: '36px',
        position: 'relative', zIndex: 2, flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <a
          href="mailto:autobitofficial.ph@gmail.com"
          style={{
            background: '#2997ff', color: '#ffffff', padding: '12px 26px',
            borderRadius: '980px', fontSize: '15px', fontWeight: 500,
            textDecoration: 'none', fontFamily: `'SF Pro Text', ${font}`,
            letterSpacing: '-0.01em', display: 'inline-block',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#0077ed'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#2997ff'; e.currentTarget.style.transform = 'scale(1)'; }}
        >Start a project</a>

        <a
          href="/projects"
          style={{
            background: 'rgba(255,255,255,0.10)', color: '#ffffff', padding: '12px 26px',
            borderRadius: '980px', fontSize: '15px', fontWeight: 500,
            textDecoration: 'none', fontFamily: `'SF Pro Text', ${font}`,
            letterSpacing: '-0.01em', display: 'inline-block', border: 'none',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#2997ff'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >View our work</a>
      </div>

      <p style={{
        fontFamily: `'SF Pro Text', ${font}`,
        fontSize: '11px', color: 'rgba(255,255,255,0.25)',
        textAlign: 'center', marginTop: '24px', letterSpacing: '0.04em',
        textTransform: 'uppercase',
        position: 'relative', zIndex: 2,
      }}>50% deposit · Balance on delivery · No retainers · Reply within 24h</p>
    </section>
  );
};

export default FinalCTA;
