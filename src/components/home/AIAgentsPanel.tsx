const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const textFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

const AIAgentsPanel = () => (
  <section style={{
    width: '100%',
    minHeight: '100vh',
    background: '#000000',
    display: 'flex',
    alignItems: 'center',
  }}>
    <div style={{ width: '50%', height: '100vh' }}>
      <img
        src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=90"
        alt="AI Agents"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) saturate(0.8)' }}
      />
    </div>
    <div style={{ width: '50%', padding: '80px 10% 80px 80px' }}>
      <p style={{ fontFamily: font, fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
        AI Agents
      </p>
      <h2 style={{ fontFamily: font, fontSize: '72px', fontWeight: 700, letterSpacing: '-2.5px', lineHeight: 0.95, color: '#ffffff', margin: 0, marginTop: '16px' }}>
        Custom AI that<br />works 24/7.
      </h2>
      <p style={{ fontFamily: textFont, fontSize: '17px', color: 'rgba(255,255,255,0.40)', marginTop: '16px' }}>
        From $1,200 · 5–10 days
      </p>
      <p style={{ fontFamily: textFont, fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '420px', lineHeight: 1.5, marginTop: '12px' }}>
        Purpose-built AI agents trained on your data, integrated into your tools, and deployed in your workflow. Not a chatbot. A system.
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <a href="mailto:autobitofficial.ph@gmail.com" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: textFont }}>
          Start a project
        </a>
        <a href="/services#ai-agents" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: textFont }}>
          Learn more →
        </a>
      </div>
    </div>
  </section>
);

export default AIAgentsPanel;
