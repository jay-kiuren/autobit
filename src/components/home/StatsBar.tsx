import ScrollReveal from "../ScrollReveal";

const stats = [
  { value: "2–5d", label: "Average delivery" },
  { value: "$800+", label: "Starting price" },
  { value: "Patented", label: "Award-winning builds" },
  { value: "50%", label: "Deposit to start" },
];

const StatsBar = () => (
  <section className="border-y border-border bg-background">
    <div className="section-container py-6 grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <ScrollReveal key={s.label} delay={i * 0.08} className={`text-center py-4 md:py-0 ${i < stats.length - 1 ? "md:border-r border-border" : ""}`}>
          <div className="text-[clamp(24px,4vw,32px)] font-bold tracking-[-1px] text-foreground">{s.value}</div>
          <div className="text-xs text-ab-text-muted mt-1">{s.label}</div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default StatsBar;
