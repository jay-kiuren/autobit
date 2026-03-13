import { useContactModal } from "@/contexts/ContactModalContext";

const FinalCTA = () => {
  const { openModal } = useContactModal();

  return (
    <section style={{
      position: "relative", background: "#000000", overflow: "hidden",
      padding: "clamp(100px, 14vw, 180px) 24px clamp(120px, 16vw, 200px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
    }}>

      {/* ── BACKGROUND ─────────────────────────────────────────────────────── */}

      {/* Noise grain */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.04, pointerEvents: "none" }} aria-hidden="true">
        <filter id="cta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      {/* Left blue bloom */}
      <div style={{
        position: "absolute", left: "-10%", bottom: "-10%",
        width: "clamp(500px, 65vw, 900px)", height: "clamp(500px, 65vw, 900px)",
        background: "radial-gradient(ellipse, rgba(41,151,255,0.38) 0%, rgba(41,151,255,0.14) 40%, transparent 70%)",
        filter: "blur(80px)", zIndex: 0,
        animation: "ctaFloatA 12s ease-in-out infinite",
        willChange: "transform",
      }} />

      {/* Right purple bloom */}
      <div style={{
        position: "absolute", right: "-8%", top: "-15%",
        width: "clamp(500px, 60vw, 850px)", height: "clamp(500px, 60vw, 850px)",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.32) 0%, rgba(139,92,246,0.10) 42%, transparent 70%)",
        filter: "blur(80px)", zIndex: 0,
        animation: "ctaFloatB 16s ease-in-out infinite",
        willChange: "transform",
      }} />

      {/* Center core — where they meet, makes it rich */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "clamp(400px, 55vw, 750px)", height: "clamp(300px, 40vw, 550px)",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 65%)",
        filter: "blur(60px)", zIndex: 0,
        animation: "ctaGlowPulse 8s ease-in-out infinite",
        willChange: "opacity",
      }} />

      {/* Bottom edge fade — keeps it grounded */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* Top edge fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "30%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, transparent 100%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* Side vignettes */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.75) 100%)",
      }} />

      <style>{`
        @keyframes ctaFloatA {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          40%       { transform: translateY(-30px) translateX(20px); }
          70%       { transform: translateY(15px) translateX(-10px); }
        }
        @keyframes ctaFloatB {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          35%       { transform: translateY(25px) translateX(-18px); }
          65%       { transform: translateY(-20px) translateX(12px); }
        }
        @keyframes ctaGlowPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.60; }
        }
      `}</style>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "820px", width: "100%" }}>

        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
          marginBottom: "28px",
          WebkitFontSmoothing: "antialiased",
        }}>
          Ready when you are
        </p>

        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(40px, 7.5vw, 96px)", fontWeight: 700,
          letterSpacing: "-0.04em", lineHeight: 0.98,
          color: "#ffffff", margin: "0 0 28px 0",
          WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
        }}>
          Build something<br />
          <span style={{ color: "rgba(255,255,255,0.38)" }}>others won't.</span>
        </h2>

        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(15px, 1.5vw, 19px)", fontWeight: 400,
          color: "rgba(255,255,255,0.55)", maxWidth: "480px",
          margin: "0 auto 40px auto", lineHeight: 1.55, letterSpacing: "-0.01em",
          WebkitFontSmoothing: "antialiased",
        }}>
          Describe your problem. Scoped and priced within 24 hours.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
          <button
            onClick={openModal}
            style={{
              background: "#2997ff", color: "#ffffff", padding: "14px 32px",
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
            background: "rgba(255,255,255,0.09)", color: "#ffffff",
            padding: "14px 32px", borderRadius: "980px",
            fontSize: "15px", fontWeight: 500,
            textDecoration: "none", border: "none", display: "inline-block",
            transition: "background 0.2s ease, transform 0.2s ease",
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "scale(1)"; }}
          >View our work</a>
        </div>

        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.22)",
          letterSpacing: "0.08em", textTransform: "uppercase", margin: 0,
        }}>
          50% Deposit · Balance on delivery · No retainers · Reply within 24h
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
