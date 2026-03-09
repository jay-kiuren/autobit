import { Brain, Bot, Cpu, Sparkles, Network, Zap } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const scatterIcons = [
  { Icon: Brain, top: '10%', right: '5%' },
  { Icon: Bot, top: '60%', right: '15%' },
  { Icon: Cpu, top: '30%', right: '25%' },
  { Icon: Sparkles, top: '80%', right: '8%' },
  { Icon: Network, top: '45%', right: '40%' },
  { Icon: Zap, top: '15%', right: '45%' },
];

const TypingDots = () => (
  <div style={{ display: 'flex', gap: '5px', padding: '12px 16px' }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.30)',
        animation: `typingDot 1.4s ${i * 0.2}s infinite`,
      }} />
    ))}
    <style>{`@keyframes typingDot { 0%,60%,100% { opacity:0.2 } 30% { opacity:1 } }`}</style>
  </div>
);

const AIAgentsPanel = () => (
  <section style={{
    width: '100%', background: '#050508', padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 80% at 110% 50%, rgba(130,80,255,0.18), transparent 55%)', pointerEvents: 'none', zIndex: 0 }} />
    {scatterIcons.map(({ Icon, top, right }, i) => (
      <Icon key={i} size={96} style={{ position: 'absolute', top, right, color: 'rgba(130,80,255,0.05)', pointerEvents: 'none', zIndex: 0 }} />
    ))}
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: 1 }}>
      <div style={{ width: '55%' }}>
        <div style={{
          background: '#0d0d0d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)',
          padding: '32px', minHeight: '480px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <span style={{ fontFamily: font, fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>AUTOBIT Agent</span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#30d158', animation: 'pulse 2s infinite' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            {/* User bubble */}
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
              <div style={{ background: 'rgba(130,80,255,0.15)', borderRadius: '14px 14px 2px 14px', padding: '12px 16px' }}>
                <span style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>Summarize last week's sales and flag anything unusual.</span>
              </div>
            </div>
            {/* Agent bubbles */}
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px 14px 14px 14px', padding: '12px 16px', borderLeft: '3px solid rgba(130,80,255,0.40)' }}>
                <span style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>Sales were up 12% vs prior week. 3 anomalies flagged: Order #4521 unusually large, 2 refunds in Electronics, Cart abandonment spike Thursday.</span>
              </div>
            </div>
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px 14px 14px 14px', padding: '12px 16px', borderLeft: '3px solid rgba(130,80,255,0.40)' }}>
                <span style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>Sending summary to Slack and flagging in CRM now.</span>
              </div>
            </div>
            <TypingDots />
          </div>
        </div>
      </div>
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
