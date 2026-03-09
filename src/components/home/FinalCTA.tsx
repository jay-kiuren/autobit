const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const textFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

const FinalCTA = () => (
  <section style={{
    width: '100%',
    minHeight: '60vh',
    background: '#000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 40px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  }}>
    <h2 style={{ fontFamily: font, fontSize: '56px', fontWeight: 700, letterSpacing: '-2px', color: '#ffffff', textAlign: 'center', maxWidth: '700px', margin: 0 }}>
      Ready to build something real?
    </h2>
    <p style={{ fontFamily: textFont, fontSize: '21px', color: 'rgba(255,255,255,0.50)', marginTop: '12px', textAlign: 'center' }}>
      Describe your problem. Scoped and priced within 24 hours.
    </p>
    <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
      <a href="mailto:autobitofficial.ph@gmail.com" style={{
        background: '#2997ff',
        color: '#ffffff',
        padding: '16px 40px',
        borderRadius: '980px',
        fontSize: '17px',
        fontWeight: 600,
        textDecoration: 'none',
        fontFamily: textFont,
      }}>
        Start a project
      </a>
      <a href="/projects" style={{
        background: 'transparent',
        color: '#2997ff',
        padding: '16px 40px',
        borderRadius: '980px',
        fontSize: '17px',
        fontWeight: 600,
        textDecoration: 'none',
        fontFamily: textFont,
      }}>
        View our work →
      </a>
    </div>
    <p style={{ fontFamily: textFont, fontSize: '12px', color: 'rgba(255,255,255,0.20)', marginTop: '24px', letterSpacing: '0.02em', textAlign: 'center' }}>
      50% deposit to start · Balance on delivery · No retainers · Response within 24h
    </p>
  </section>
);

export default FinalCTA;
