const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const FlowNode = ({ label, dotColor }: { label: string; dotColor: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '980px',
    padding: '10px 18px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
  }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
    <span style={{ fontFamily: font, fontSize: '13px', color: '#ffffff', whiteSpace: 'nowrap' }}>{label}</span>
  </div>
);

const Arrow = () => (
  <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '18px', lineHeight: 1 }}>→</span>
);

const WorkflowPanel = () => (
  <section style={{
    width: '100%',
    background: '#000000',
    padding: '100px 10%',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      {/* Left text */}
      <div style={{ width: '45%' }}>
        <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '16px' }}>Workflow Automation</p>
        <h2 style={{ fontFamily: font, fontSize: '56px', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.0, color: '#ffffff', margin: 0 }}>Eliminate manual work.</h2>
        <p style={{ fontFamily: font, fontSize: '17px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, maxWidth: '400px', marginTop: '16px' }}>
          We map your processes and replace every manual step with automated pipelines that run 24/7 without error. Zapier, Make, n8n — or fully custom.
        </p>
        <p style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '16px' }}>From $800 · 2–5 days</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          <a href="mailto:autobitofficial.ph@gmail.com" style={{ background: '#2997ff', color: '#ffffff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Start a project</a>
          <a href="/services#automation" style={{ background: 'transparent', color: '#2997ff', padding: '12px 28px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: font }}>Learn more →</a>
        </div>
      </div>
      {/* Right visual */}
      <div style={{ width: '55%' }}>
        <div style={{
          background: '#0d0d0d',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '32px',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <FlowNode label="Gmail" dotColor="#ff453a" />
            <Arrow />
            <FlowNode label="Filter & Route" dotColor="#ffd60a" />
            <Arrow />
            <FlowNode label="Slack Notify" dotColor="#30d158" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <FlowNode label="CRM Update" dotColor="#bf5af2" />
            <Arrow />
            <FlowNode label="Invoice Generate" dotColor="#ff9f0a" />
            <Arrow />
            <FlowNode label="Send PDF" dotColor="#64d2ff" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30d158', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: font, fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>3 automations running</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WorkflowPanel;
