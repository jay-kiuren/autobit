import ScrollReveal from "@/components/ScrollReveal";

const HeaderSection = () => (
  <section style={{ paddingTop: "112px", paddingBottom: "56px" }}>
    <div className="section-container">
      <ScrollReveal>
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <span style={{
              fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)", display: "block", marginBottom: "12px",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}>
              What we've built
            </span>
            <h1 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontSize: "clamp(40px,5.5vw,60px)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.02,
              color: "#fff", margin: 0,
            }}>
              Projects
            </h1>
          </div>
          <p style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: "15px", color: "rgba(255,255,255,0.38)",
            maxWidth: "280px", lineHeight: 1.65, margin: 0, textAlign: "right",
          }}>
            Real systems. Deployed, patented, and nationally awarded.
          </p>
        </div>
      </ScrollReveal>
      <div style={{
        height: "1px",
        background: "linear-gradient(to right, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
        marginTop: "40px",
      }} />
    </div>
  </section>
);

export default HeaderSection;
