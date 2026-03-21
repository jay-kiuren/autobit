import ScrollReveal from "@/components/ScrollReveal";

const cards = [
  {
    eyebrow: "Proven track record",
    headline: "We build things that actually work.",
    body: "Not mockups. Every project here is deployed, awarded, or in market.",
    accent: "48, 209, 88",
    cta: false,
  },
  {
    eyebrow: "Fast delivery",
    headline: "From idea to live system in days.",
    body: "Tier 1 projects ship in 2–5 days. No agency timelines.",
    accent: "41, 151, 255",
    cta: false,
  },
  {
    eyebrow: "Start a project",
    headline: "Ready when you are.",
    body: "Fixed pricing from $800. 50% upfront, 50% on delivery.",
    accent: "255, 159, 10",
    cta: true,
  },
];

const WhySection = () => (
  <section style={{
    position: "relative",
    zIndex: 1,
    background: "#000",
    paddingTop: "100px",
    paddingBottom: "120px",
  }}>
    <div className="section-container">
      <ScrollReveal>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "32px",
        }}>
          <h2 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontSize: "clamp(28px,4vw,42px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            color: "#f5f5f7",
            margin: 0,
            maxWidth: "480px",
          }}>
            Why work with Autobit.
          </h2>
          <a href="/services" style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#2997ff",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}>
            See all services ›
          </a>
        </div>
      </ScrollReveal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px",
      }}>
        {cards.map((card, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div style={{
              background: `linear-gradient(150deg, rgba(${card.accent},0.07) 0%, #0e0e10 60%)`,
              border: `1px solid rgba(${card.accent}, 0.13)`,
              borderRadius: "20px",
              padding: "28px 28px 32px",
              display: "flex",
              flexDirection: "column",
              minHeight: "280px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: `rgba(${card.accent}, 0.06)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }} />
              <span style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: `rgba(${card.accent}, 0.85)`,
                marginBottom: "14px",
                display: "block",
                fontWeight: 600,
              }}>
                {card.eyebrow}
              </span>
              <h3 style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "clamp(18px,2vw,22px)",
                fontWeight: 700,
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                color: "#f5f5f7",
                margin: "0 0 12px",
              }}>
                {card.headline}
              </h3>
              <p style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.65,
                margin: "0",
                flex: 1,
              }}>
                {card.body}
              </p>
              {card.cta ? (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                  style={{
                    marginTop: "24px",
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#2997ff",
                    borderRadius: "980px",
                    padding: "12px 26px",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    width: "fit-content",
                    transition: "background 0.2s ease, transform 0.2s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Start a project
                </button>
              ) : (
                <div style={{
                  marginTop: "24px",
                  height: "1px",
                  background: `linear-gradient(to right, rgba(${card.accent},0.20), transparent)`,
                }} />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhySection;
