import { Zap, ArrowRight, RefreshCw, GitMerge, Filter } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const floatingIcons = [
  { Icon: Zap, top: '10%', left: '85%', rotate: '-15deg' },
  { Icon: ArrowRight, top: '80%', left: '8%', rotate: '10deg' },
  { Icon: RefreshCw, top: '50%', left: '90%', rotate: '20deg' },
  { Icon: GitMerge, top: '8%', left: '45%', rotate: '-10deg' },
  { Icon: Filter, top: '75%', left: '88%', rotate: '15deg' },
];

const FlowNode = ({ label, dotColor }: { label: string; dotColor: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '10px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '980px', padding: '12px 20px', minWidth: '130px',
  }}>
    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
    <span style={{ fontFamily: font, fontSize: '14px', color: '#ffffff', whiteSpace: 'nowrap' }}>{label}</span>
  </div>
);

const WorkflowPanel = () => (
  <section style={{
    width: '100%', background: '#000000', padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden',
    contain: 'layout',
  }}
    className="workflow-section"
  >
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 120% 80% at -10% 50%, rgba(41,151,255,0.18), transparent 55%)',
      pointerEvents: 'none', zIndex: 0,
    }} />

    {floatingIcons.map(({ Icon, top, left, rotate }, i) => (
      <Icon key={i} size={48} style={{
        position: 'absolute', top, left,
        color: 'rgba(41,151,255,0.06)',
        pointerEvents: 'none', zIndex: 0,
        transform: `rotate(${rotate})`,
        willChange: 'transform',
      }} />
    ))}

    <div className="workflow-inner" style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: 1 }}>
      <div className="workflow-text" style={{ width: '45%', padding: '80px 0' }}>
        <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '16px' }}>
          Workflow Automation
        </p>
        <h2 className="workflow-heading" style={{ fontFamily: font, fontSize: '56px', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.0, color: '#ffffff', margin: 0 }}>
          Eliminate manual work.
        </h2>
        <p style={{ fontFamily: font, fontSize: '17px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, maxWidth: '400px', marginTop: '16px' }}>
          We map your processes and replace every manual step with automated pipelines that run 24/7 without error. Zapier, Make, n8n — or fully custom.
        </p>
        <p style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '16px' }}>From $800 · 2–5 days</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: font }}>
            Start a project
          </button>
          <a href="/services#automation" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>
            Learn more →
          </a>
        </div>
      </div>

      <div className="workflow-visual" style={{ width: '55%' }}>
        <div style={{
          background: '#0d0d0d', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '32px', minHeight: '480px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px',
          position: 'relative',
        }}>
          {/* blue line div REMOVED */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <FlowNode label="Gmail" dotColor="#ff453a" />
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px' }}>→</span>
            <FlowNode label="Filter & Route" dotColor="#ffd60a" />
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px' }}>→</span>
            <FlowNode label="Slack Notify" dotColor="#30d158" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <FlowNode label="CRM Update" dotColor="#bf5af2" />
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px' }}>→</span>
            <FlowNode label="Invoice Generate" dotColor="#ff9f0a" />
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px' }}>→</span>
            <FlowNode label="Send PDF" dotColor="#64d2ff" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30d158' }} />
            <span style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>3 automations running</span>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 767px) {
        .workflow-section { padding: 48px 24px !important; }
        .workflow-inner { flex-direction: column !important; }
        .workflow-text { width: 100% !important; padding: 0 !important; }
        .workflow-visual { width: 100% !important; }
        .workflow-heading { font-size: 36px !important; }
      }
    `}</style>
  </section>
);

export default WorkflowPanel;
