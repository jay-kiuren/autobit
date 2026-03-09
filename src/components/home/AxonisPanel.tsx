const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const AxonisPanel = () => (
  <section style={{
    width: '100%',
    background: '#050505',
    padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      {/* Left text */}
      <div style={{ width: '45%' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '980px',
          padding: '4px 14px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.60)',
          fontFamily: font,
          marginBottom: '20px',
        }}>Open Source</span>
        <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '16px' }}>AXONIS Platform</p>
        <h2 style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#ffffff', margin: 0 }}>The AI safety OS for critical infrastructure.</h2>
        <p style={{ fontFamily: font, fontSize: '17px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, marginTop: '16px' }}>
          Open-core decentralized safety layer for industrial AI. Edge inference, cryptographic proof, privacy-first.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          <a href="/projects#axonis" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Learn more</a>
          <a href="https://github.com/gnobob/AXONIS-Platform" target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>View on GitHub →</a>
        </div>
      </div>
      {/* Right terminal */}
      <div style={{ width: '55%' }}>
        <div style={{
          background: '#0a0a0a',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ background: '#111111', padding: '12px 16px', display: 'flex', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,0,0,0.6)' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,200,0,0.6)' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(0,200,0,0.6)' }} />
          </div>
          <div style={{ padding: '20px 24px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 1.8 }}>
            <div style={{ color: 'rgba(255,255,255,0.80)' }}>$ axonis init --mode=safe</div>
            <div style={{ color: '#30d158' }}>✓ Edge node registered</div>
            <div style={{ color: '#30d158' }}>✓ Cryptographic proof verified</div>
            <div style={{ color: '#30d158' }}>✓ Privacy layer active</div>
            <div style={{ color: '#ffd60a' }}>⚡ Monitoring 4 sensors</div>
            <div style={{ color: 'rgba(255,255,255,0.40)' }}>→ Status: SECURE</div>
            <span style={{ color: 'rgba(255,255,255,0.60)', animation: 'blink 1s infinite' }}>_</span>
            <style>{`@keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }`}</style>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AxonisPanel;
