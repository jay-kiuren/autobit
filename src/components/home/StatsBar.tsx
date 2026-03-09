const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const stats = [
  { value: "2–5d", label: "Average delivery" },
  { value: "$800+", label: "Starting price" },
  { value: "Patented", label: "Award-winning builds" },
  { value: "50%", label: "Deposit to start" },
];

const StatsBar = () => (
  <section style={{
    width: '100%',
    background: '#0a0a0a',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '32px 10%',
  }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{
          textAlign: 'center',
          borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
          <div style={{ fontFamily: font, fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: '#ffffff' }}>{s.value}</div>
          <div style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginTop: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar;
