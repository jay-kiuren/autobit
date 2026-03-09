const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const textFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

const AxonisPanel = () => (
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
    <div style={{ paddingTop: '25vh', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
        New · AXONIS Platform
      </p>
      <h2 style={{ fontFamily: font, fontSize: '64px', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.0, color: '#ffffff', margin: 0 }}>
        The AI safety OS for<br />critical infrastructure.
      </h2>
      <p style={{ fontFamily: textFont, fontSize: '19px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', marginTop: '12px' }}>
        Open-core. Decentralized. Built for the real world.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px' }}>
        <a href="/projects#axonis" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: textFont }}>
          Learn more
        </a>
        <a href="https://github.com/gnobob/AXONIS-Platform" target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: textFont }}>
          View on GitHub →
        </a>
      </div>
    </div>
    <img
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90"
      alt="AXONIS Platform"
      loading="lazy"
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70%',
        maxWidth: '900px',
        filter: 'brightness(0.8)',
        borderRadius: 0,
      }}
    />
  </section>
);

export default AxonisPanel;
