const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const FinalCTA = () => (
  <section style={{
    width: '100%',
    background: '#000000',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 40px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(41,151,255,0.10), transparent)',
  }}>
    <h2 style={{ fontFamily: font, fontSize: '56px', fontWeight: 700, letterSpacing: '-2px', color: '#ffffff', textAlign: 'center', maxWidth: '600px', margin: 0 }}>Ready to build something real?</h2>
    <p style={{ fontFamily: font, fontSize: '19px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginTop: '12px' }}>Describe your problem. Scoped and priced within 24 hours.</p>
    <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
      <a href="mailto:autobitofficial.ph@gmail.com" style={{ background: '#2997ff', color: '#ffffff', padding: '16px 40px', borderRadius: '980px', fontSize: '17px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Start a project</a>
      <a href="/projects" style={{ background: 'transparent', color: '#2997ff', padding: '16px 40px', borderRadius: '980px', fontSize: '17px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>View our work →</a>
    </div>
    <p style={{ fontFamily: font, fontSize: '12px', color: 'rgba(255,255,255,0.18)', textAlign: 'center', marginTop: '24px', letterSpacing: '0.02em' }}>50% deposit · Balance on delivery · No retainers · Reply within 24h</p>
  </section>
);

export default FinalCTA;
