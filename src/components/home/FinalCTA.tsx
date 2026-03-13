import { useContactModal } from "@/contexts/ContactModalContext";

// ─── WHAT THE REFERENCE ACTUALLY DOES ────────────────────────────────────────
// It's not two side blobs. It's ONE centered light source built from
// concentric layers — inner core is dense + low blur, outer rings fade out.
// Exactly like a real stage spotlight pointed at the camera.
// Color: hero blue (#2997ff) → bleeds into indigo at the outer edge.
// The whole section GLOWS — not just the corners.
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

      {/* ── CENTERED ORB SYSTEM ────────────────────────────────────────────────
          Layer 1 — outer atmosphere, wide, fades to nothing
          Layer 2 — mid ring, denser, blue shifting to indigo
          Layer 3 — inner core, tight, bright, solid center
          This stacking = the "solid orb" look from the reference.
      ──────────────────────────────────────────────────────────────────────── */}

      {/* Layer 1 — outer atmosphere (120vw wide, fills entire section) */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "120vw", height: "120vw",
        maxWidth: "1400px", maxHeight: "1400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(41,100,255,0.28) 0%, rgba(41,80,220,0.12) 40%, rgba(30,60,180,0.04) 65%, transparent 78%)",
        filter: "blur(30px)",
        zIndex: 0,
        animation: "orbBreathe 11s ease-in-out infinite",
        willChange: "opacity, transform",
      }} />

      {/* Layer 2 — mid ring (70vw, blue→indigo, gives the sweep look) */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "70vw", height: "70vw",
        maxWidth: "900px", maxHeight: "900px",
        minWidth: "500px", minHeight: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(41,151,255,0.50) 0%, rgba(70,80,255,0.30) 38%, rgba(100,60,230,0.12) 60%, transparent 75%)",
        filter: "blur(18px)",
        zIndex: 0,
        animation: "orbBreathe 11s ease-in-out infinite 1s",
        willChange: "opacity, transform",
      }} />

      {/* Layer 3 — inner core (35vw, very bright, low blur = SOLID look) */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "35vw", height: "35vw",
        maxWidth: "480px", maxHeight: "480px",
        minWidth: "280px", minHeight: "280px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(41,151,255,0.72) 0%, rgba(60,120,255,0.42) 35%, rgba(80,90,255,0.15) 58%, transparent 72%)",
        filter: "blur(8px)",
        zIndex: 0,
        animation: "orbBreathe 11s ease-in-out infinite 0.5s",
        willChange: "opacity, transform",
      }} />

      {/* Noise grain — physical texture */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.045, pointerEvents: "none" }} aria-hidden="true">
        <filter id="cta-grain2">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain2)" />
      </svg>

      {/* Edge containment — prevents bleed into navbar/footer */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "22%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)" }} />

      <style>{`
        @keyframes orbBreathe {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.78; transform: translate(-50%, -52%) scale(1.04); }
        }
      `}</style>

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "820px", width: "100%" }}>

        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          marginBottom: "32px",
        }}>
          <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.30)" }} />
          <p style={{
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.40)", margin: 0,
            WebkitFontSmoothing: "antialiased",
          }}>Ready when you are</p>
          <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.30)" }} />
        </div>

        {/* Headline — tighter, more punch, differentiated from hero */}
        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 700,
          letterSpacing: "-0.045em", lineHeight: 0.95,
          color: "#ffffff", margin: "0 0 24px 0",
          WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
        }}>
          Build something<br />
          <span style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(41,151,255,0.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>others won't.</span>
        </h2>

        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 400,
          color: "rgba(255,255,255,0.55)", maxWidth: "420px",
          margin: "0 auto 44px auto", lineHeight: 1.6, letterSpacing: "-0.01em",
          WebkitFontSmoothing: "antialiased",
        }}>
          Describe your problem. Scoped and priced within 24 hours.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
          <button
            onClick={openModal}
            style={{
              background: "#2997ff", color: "#ffffff", padding: "15px 36px",
              borderRadius: "980px", fontSize: "15px", fontWeight: 500,
              cursor: "pointer", border: "none",
              boxShadow: "0 0 32px rgba(41,151,255,0.35), 0 4px 16px rgba(0,0,0,0.30)",
              transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0077ed";
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 48px rgba(41,151,255,0.55), 0 6px 20px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2997ff";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 32px rgba(41,151,255,0.35), 0 4px 16px rgba(0,0,0,0.30)";
            }}
          >Start a project</button>

          <a href="/projects" style={{
            background: "rgba(255,255,255,0.08)", color: "#ffffff",
            padding: "15px 36px", borderRadius: "980px",
            fontSize: "15px", fontWeight: 500,
            textDecoration: "none", border: "1px solid rgba(255,255,255,0.10)", display: "inline-block",
            transition: "background 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.13)";
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
            }}
          >View our work</a>
        </div>

        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.22)",
          letterSpacing: "0.09em", textTransform: "uppercase", margin: 0,
          WebkitFontSmoothing: "antialiased",
        }}>
          50% Deposit · Balance on delivery · No retainers · Reply within 24h
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
