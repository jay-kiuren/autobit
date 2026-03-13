import { useContactModal } from "@/contexts/ContactModalContext";

// ─── WHAT MAKES THE REFERENCE WORK ───────────────────────────────────────────
// Not side lights. One massive CENTERED bloom that fills the whole section.
// Looks like a physical light source behind frosted glass — solid, not wispy.
// Left half = hero blue (#2997ff). Right half = indigo/violet.
// They overlap center → rich gradient sweep exactly like the reference.
// The key: HIGH opacity on the blooms, NO heavy overlay killing them.
// ─────────────────────────────────────────────────────────────────────────────

const FinalCTA = () => {
  const { openModal } = useContactModal();

  return (
    <section style={{
      position: "relative", background: "#000000", overflow: "hidden",
      padding: "clamp(100px, 14vw, 180px) 24px clamp(120px, 16vw, 200px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
    }}>

      {/* ── BACKGROUND SYSTEM ────────────────────────────────────────────────

          Layer order (bottom → top):
          1. Blue orb — left-center, big, solid
          2. Violet orb — right-center, big, solid
          3. They overlap in the middle → blend
          4. Noise grain — physical texture
          5. Top + bottom edge fades — cinematic containment
          6. Content

      ──────────────────────────────────────────────────────────────────────── */}

      {/* BLUE ORB — left half, large solid bloom */}
      <div style={{
        position: "absolute",
        left: "5%", top: "50%",
        transform: "translateY(-50%)",
        width: "65vw", height: "65vw",
        maxWidth: "750px", maxHeight: "750px",
        minWidth: "400px", minHeight: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(41,151,255,0.55) 0%, rgba(41,151,255,0.28) 35%, rgba(41,151,255,0.08) 62%, transparent 78%)",
        filter: "blur(48px)",
        zIndex: 0,
        animation: "orbPulseA 10s ease-in-out infinite",
        willChange: "opacity, transform",
      }} />

      {/* VIOLET ORB — right half, large solid bloom */}
      <div style={{
        position: "absolute",
        right: "5%", top: "50%",
        transform: "translateY(-50%)",
        width: "60vw", height: "60vw",
        maxWidth: "700px", maxHeight: "700px",
        minWidth: "380px", minHeight: "380px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,60,255,0.52) 0%, rgba(109,60,255,0.25) 35%, rgba(109,60,255,0.07) 62%, transparent 78%)",
        filter: "blur(52px)",
        zIndex: 0,
        animation: "orbPulseB 12s ease-in-out infinite 2s",
        willChange: "opacity, transform",
      }} />

      {/* CENTER BLEND — where blue meets violet, creates the rich midpoint */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "45vw", height: "55vw",
        maxWidth: "500px", maxHeight: "600px",
        minWidth: "280px", minHeight: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(70,100,255,0.22) 0%, transparent 65%)",
        filter: "blur(60px)",
        zIndex: 0,
        animation: "orbPulseA 8s ease-in-out infinite 1s",
        willChange: "opacity",
      }} />

      {/* Noise grain — physical texture, same as hero */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.04, pointerEvents: "none" }} aria-hidden="true">
        <filter id="cta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      {/* Top edge fade — logo area stays clean */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "28%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)",
      }} />

      {/* Bottom edge fade — footer transition */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "28%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
      }} />

      <style>{`
        @keyframes orbPulseA {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50%       { opacity: 0.75; transform: translateY(-52%) scale(1.05); }
        }
        @keyframes orbPulseB {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50%       { opacity: 0.72; transform: translateY(-48%) scale(1.04); }
        }
      `}</style>

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "820px", width: "100%" }}>

        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.40)",
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
          color: "rgba(255,255,255,0.60)", maxWidth: "480px",
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
          fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.08em", textTransform: "uppercase", margin: 0,
          WebkitFontSmoothing: "antialiased",
        }}>
          50% Deposit · Balance on delivery · No retainers · Reply within 24h
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
