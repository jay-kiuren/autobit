import { Terminal, Lock, Shield, Cpu, GitBranch, Server } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const scatterIcons = [
  { Icon: Terminal, top: '10%', left: '8%' },
  { Icon: Lock, top: '20%', left: '88%' },
  { Icon: Shield, top: '70%', left: '5%' },
  { Icon: Cpu, top: '80%', left: '75%' },
  { Icon: GitBranch, top: '40%', left: '12%' },
  { Icon: Server, top: '55%', left: '90%' },
];

const AxonisPanel = () => (
  <section style={{
    width: '100%', background: '#020a04', padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 80% at 110% 50%, rgba(48,209,88,0.15), transparent 55%)', pointerEvents: 'none', zIndex: 0 }} />
    {scatterIcons.map(({ Icon, top, left }, i) => (
      <Icon key={i} size={80} style={{ position: 'absolute', top, left, color: 'rgba(48,209,88,0.05)', pointerEvents: 'none', zIndex: 0 }} />
    ))}
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: 1 }}>
      <div style={{ width: '45%' }}>
        <span style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '980px', padding: '4px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.60)', fontFamily: font, marginBottom: '20px',
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
      <div style={{ width: '55%' }}>
        <div style={{
          background: '#040d05', borderRadius: '12px', border: '1px solid rgba(48,209,88,0.15)',
          overflow: 'hidden', minHeight: '480px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ background: '#111111', padding: '14px 18px', display: 'flex', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,0,0,0.6)' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,200,0,0.6)' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(0,200,0,0.6)' }} />
          </div>
          <div style={{ padding: '32px', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', lineHeight: 2.0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.80)' }}>$ axonis init --mode=safe --env=production</div>
            <div style={{ color: 'rgba(255,255,255,0.50)' }}>Initializing AXONIS v2.1.0...</div>
            <div style={{ color: '#30d158' }}>✓ Edge node registered       [12ms]</div>
            <div style={{ color: '#30d158' }}>✓ Cryptographic proof verified  [34ms]</div>
            <div style={{ color: '#30d158' }}>✓ Privacy layer active       [8ms]</div>
            <div style={{ color: '#30d158' }}>✓ Sensor array connected     [21ms]</div>
            <div style={{ color: '#ffd60a' }}>⚡ Monitoring 4 sensors live</div>
            <div style={{ color: '#ff9f0a' }}>⚠ Alert threshold: Level 3</div>
            <div style={{ color: 'rgba(255,255,255,0.35)' }}>→ System status: SECURE</div>
            <div style={{ color: 'rgba(255,255,255,0.35)' }}>→ Uptime: 99.98%</div>
            <span style={{ color: 'rgba(255,255,255,0.60)' }} className="axonis-cursor">$_</span>
            <style>{`
              .axonis-cursor { animation: blink 1s step-end infinite; }
              @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AxonisPanel;
