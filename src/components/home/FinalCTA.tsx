import { useContactModal } from "@/contexts/ContactModalContext";

// ─── THE ACTUAL TECHNIQUE FROM THE REFERENCE ──────────────────────────────────
// Not a spotlight. Not a blob. It's a massive circle (150vw wide)
// centered ABOVE the section — only the BOTTOM EDGE/ARC is visible.
// That arc rim glows in the hero's charcoal palette (#2e2e2e → #424242).
// Center of the circle = black. The glow is ONLY at the curved rim.
// Like a planet horizon. The circle itself is 100% invisible — only its
// glowing edge sweeps across the section.
// ─────────────────────────────────────────────────────────────────────────────

const FinalCTA = () => {
  const { openModal } = useContactModal();

  return (
    <section style={{
      position: "relative",
      background: "#000000",
      overflow: "hidden",
      padding: "clamp(100px, 13vw, 170px) 24px clamp(110px, 14vw, 180px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center",
    }}>

      {/* ── THE RING ORB ─────────────────────────────────────────────────────
          Giant circle. Center sits ABOVE the section.
          Only the bottom arc of its glowing rim is visible inside the section.
          This creates the "horizon sweep" from the reference.
      ──────────────────────────────────────────────────────────────────────── */}

      {/* Outer rim glow — the wide halo around the arc */}
      <div style={{
        position: "absolute",
        left: "50%", top: "-55%",
        transform: "translateX(-50%)",
        width: "155vw", height: "155vw",
        maxWidth: "2000px", maxHeight: "2000px",
        minWidth: "800px", minHeight: "800px",
        borderRadius: "50%",
        background: "transparent",
        boxShadow: "0 0 90px 30px rgba(66,66,66,0.45), 0 0 180px 60px rgba(46,46,46,0.22)",
        zIndex: 0,
        animation: "rimBreathe 14s ease-in-out infinite",
        willChange: "opacity",
      }} />

      {/* Inner rim — tighter, brighter, the actual "edge" that reads as solid */}
      <div style={{
        position: "absolute",
        left: "50%", top: "-55%",
        transform: "translateX(-50%)",
        width: "148vw", height: "148vw",
        maxWidth: "1900px", maxHeight: "1900px",
        minWidth: "780px", minHeight: "780px",
        borderRadius: "50%",
        background: "transparent",
        boxShadow: "0 0 40px 14px rgba(90,90,90,0.55), 0 0 80px 28px rgba(60,60,60,0.28)",
        zIndex: 0,
        animation: "rimBreathe 14s ease-in-out infinite 1s",
        willChange: "opacity",
      }} />

      {/* Center blackout — ensures the interior of the circle stays dark */}
      <div style={{
        position: "absolute",
        left: "50%", top: "-55%",
        transform: "translateX(-50%)",
        width: "140vw", height: "140vw",
        maxWidth: "1800px", maxHeight: "1800px",
        minWidth: "740px", minHeight: "740px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,0,0,0.70) 0%, transparent 80%)",
        zIndex: 0,
      }} />

      {/* Bottom floor fade — keeps feet on the ground */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "35%", zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top, #000000 0%, transparent 100%)",
      }} />

      {/* Top floor fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "20%", zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, #000000 0%, transparent 100%)",
      }} />

      {/* Noise grain — physical texture matching hero */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, opacity: 0.042, pointerEvents: "none" }} aria-hidden="true">
        <filter id="cta-grain3">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain3)" />
      </svg>

      <style>{`
        @keyframes rimBreathe {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }
      `}</style>

      {/* ── CONTENT — editorial, distinct from hero ───────────────────────────
          Hero = centered, cycling word, subhead, trust line, stats grid.
          This = stark, stripped, CTA-first. Different weight, different rhythm.
      ──────────────────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "760px", width: "100%" }}>

        {/* Label */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "10px", fontWeight: 500,
          letterSpacing: "0.20em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          margin: "0 0 36px 0",
          WebkitFontSmoothing: "antialiased",
        }}>
          Autobit · Start a project
        </p>

        {/* Headline — stark, no second line dimmed */}
        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(48px, 9vw, 110px)", fontWeight: 700,
          letterSpacing: "-0.048em", lineHeight: 0.92,
          color: "#ffffff", margin: "0 0 32px 0",
          WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
        }}>
          Build what<br />
          <span style={{ color: "rgba(255,255,255,0.32)" }}>others won't.</span>
        </h2>

        {/* Divider line */}
        <div style={{
          width: "40px", height: "1px",
          background: "rgba(255,255,255,0.16)",
          margin: "0 auto 28px auto",
        }} />

        {/* Sub */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 400,
          color: "rgba(255,255,255,0.45)", maxWidth: "380px",
          margin: "0 auto 44px auto", lineHeight: 1.65, letterSpacing: "-0.01em",
          WebkitFontSmoothing: "antialiased",
        }}>
          Describe your problem. We scope and price it within 24 hours.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
          <button
            onClick={openModal}
            style={{
              background: "#2997ff", color: "#ffffff", padding: "14px 34px",
              borderRadius: "980px", fontSize: "15px", fontWeight: 500,
              cursor: "pointer", border: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
          >Start a project</button>

          <a href="/projects" style={{
            background: "transparent", color: "rgba(255,255,255,0.60)",
            padding: "14px 34px", borderRadius: "980px",
            fontSize: "15px", fontWeight: 400,
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.10)",
            display: "inline-block",
            transition: "color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.60)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >View our work</a>
        </div>

        {/* Trust micro-line */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "10px", fontWeight: 400, color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.10em", textTransform: "uppercase", margin: 0,
          WebkitFontSmoothing: "antialiased",
        }}>
          50% Deposit · Balance on delivery · No retainers
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
