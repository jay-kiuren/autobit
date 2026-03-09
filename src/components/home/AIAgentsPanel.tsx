const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const TypingDots = () => (
  <div style={{ display: 'flex', gap: '4px', padding: '10px 14px' }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.30)',
        animation: `typingDot 1.4s ${i * 0.2}s infinite`,
      }} />
    ))}
    <style>{`@keyframes typingDot { 0%,60%,100% { opacity:0.2 } 30% { opacity:1 } }`}</style>
  </div>
);

const AIAgentsPanel = () => (
  <section style={{
    width: '100%',
    background: '#050505',
    padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      {/* Left visual */}
      <div style={{ width: '55%' }}>
        <div style={{
          background: '#0d0d0d',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '24px',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontFamily: font, fontSize: '13px', color: '#ffffff' }}>AUTOBIT Agent</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30d158', animation: 'pulse 2s infinite' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
              <div style={{ background: 'rgba(41,151,255,0.15)', borderRadius: '12px 12px 2px 12px', padding: '10px 14px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.80)' }}>Summarize last week's sales and flag anything unusual.</span>
              </div>
            </div>
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px 12px 12px 12px', padding: '10px 14px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Sales were up 12% vs prior week. 3 anomalies flagged: Order #4521 unusually large, 2 refunds in Electronics, Cart abandonment spike Thursday.</span>
              </div>
            </div>
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px 12px 12px 12px', padding: '10px 14px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Sending summary to Slack and flagging in CRM now.</span>
              </div>
            </div>
            <TypingDots />
          </div>
        </div>
      </div>
      {/* Right text */}
      <div style={{ width: '45%' }}>
        <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '16px' }}>AI Agents</p>
        <h2 style={{ fontFamily: font, fontSize: '56px', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.0, color: '#ffffff', margin: 0 }}>Custom AI that<br />works 24/7.</h2>
        <p style={{ fontFamily: font, fontSize: '17px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, maxWidth: '400px', marginTop: '16px' }}>
          Purpose-built agents trained on your data, integrated into your stack. Not a chatbot. A system that thinks, decides, and acts.
        </p>
        <p style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '16px' }}>From $1,200 · 5–10 days</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          <a href="mailto:autobitofficial.ph@gmail.com" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Start a project</a>
          <a href="/services#agents" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Learn more →</a>
        </div>
      </div>
    </div>
  </section>
);

export default AIAgentsPanel;
