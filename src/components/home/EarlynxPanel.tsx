const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const pills = ['CNN Model', 'DOST Verified', 'Patent Held'];

const EarlynxPanel = () => (
  <section style={{
    width: '100%',
    background: '#000000',
    padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent)',
  }}>
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <span style={{
        display: 'inline-block',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '980px',
        padding: '6px 16px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.60)',
        fontFamily: font,
        marginBottom: '20px',
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
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '980px',
            padding: '8px 20px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.40)',
            fontFamily: font,
          }}>{p}</span>
        ))}
      </div>
    </div>
  </section>
);

export default EarlynxPanel;
