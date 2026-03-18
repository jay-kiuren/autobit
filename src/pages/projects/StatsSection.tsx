import ScrollReveal from "@/components/ScrollReveal";

const StatsSection = () => (
  <section style={{ paddingBottom: "72px" }}>
    <div className="section-container">
      <ScrollReveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
        }}>
          {[
            { value: "3", label: "National awards", sub: "DOST · Congress 2026" },
            { value: "1", label: "Patent pending", sub: "GridSonar mesh system" },
            { value: "7+", label: "Projects shipped", sub: "Deployed & in market" },
            { value: "2026", label: "Champion", sub: "Life & Innovation categories" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700,
                letterSpacing: "-0.04em", color: "#fff",
                lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "13px", fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                marginTop: "8px", letterSpacing: "-0.01em",
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: "11px", color: "rgba(255,255,255,0.28)",
                marginTop: "4px", letterSpacing: "0.01em",
              }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default StatsSection;
