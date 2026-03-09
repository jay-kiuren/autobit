const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const textFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

const EarlynxPanel = () => (
  <section style={{
    width: '100%',
    minHeight: '100vh',
    background: '#000000',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <div style={{ paddingTop: '22vh', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <span style={{
        display: 'inline-block',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#ffffff',
        borderRadius: '980px',
        padding: '6px 16px',
        fontSize: '12px',
        fontFamily: textFont,
        marginBottom: '20px',
      }}>
        National Winner
      </span>
      <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
        EARLYNX — Patented
      </p>
      <h2 style={{ fontFamily: font, fontSize: '64px', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.0, color: '#ffffff', margin: 0 }}>
        AI medical screening.<br />Nationally awarded.
      </h2>
      <p style={{ fontFamily: textFont, fontSize: '19px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', marginTop: '12px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
        Non-invasive AI diagnostic prototype. Patent held. Champion at 2026 Congress Life and Science Category.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px' }}>
        <a href="/projects#earlynx" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: textFont }}>
          Learn more
        </a>
        <a href="/projects" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: textFont }}>
          See all projects →
        </a>
      </div>
    </div>
    <img
      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=90"
      alt="EARLYNX Medical Screening"
      loading="lazy"
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '65%',
        maxWidth: '860px',
        filter: 'brightness(0.75)',
      }}
    />
  </section>
);

export default EarlynxPanel;
