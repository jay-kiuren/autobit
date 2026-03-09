const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const steps = [
  { n: '01', title: 'Describe the problem', body: "Tell us what's broken. A message is enough." },
  { n: '02', title: 'Fixed price in 24h', body: 'Scoped quote and timeline. No hourly billing ever.' },
  { n: '03', title: '50% deposit, we build', body: 'We start immediately. Tier 1 ships in 2–5 days.' },
  { n: '04', title: 'Review and deliver', body: 'Final 50% after your approval. Docs included.' },
];

const ProcessSection = () => (
  <section style={{
    width: '100%',
    background: '#050505',
    padding: '100px 10%',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent)',
  }}>
    <h2 style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, letterSpacing: '-1.5px', color: '#ffffff', textAlign: 'center', marginBottom: '64px' }}>From problem to working system.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
      {steps.map(s => (
        <div key={s.n} style={{ borderTop: '2px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
          <span style={{ fontFamily: font, fontSize: '48px', fontWeight: 700, color: 'rgba(255,255,255,0.06)', letterSpacing: '-2px', lineHeight: 1, display: 'block' }}>{s.n}</span>
          <h3 style={{ fontFamily: font, fontSize: '18px', fontWeight: 600, color: '#ffffff', marginTop: '12px' }}>{s.title}</h3>
          <p style={{ fontFamily: font, fontSize: '14px', color: 'rgba(255,255,255,0.40)', lineHeight: 1.6, marginTop: '8px' }}>{s.body}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProcessSection;
