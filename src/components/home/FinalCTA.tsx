import { useContactModal } from "@/contexts/ContactModalContext";

// ─── RING ARC TECHNIQUE — CORRECT METHOD ─────────────────────────────────────
// box-shadow on transparent divs gets clipped. Doesn't work.
// The actual technique: radial-gradient with a BAND.
//   transparent 0% → transparent 43% → GLOW at 46%-52% → transparent 60%
// This creates a ring. Position the circle above the section so only
// the bottom arc is visible. Center = black. Only rim shows.
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

      {/* ── RING ARC BACKGROUND ───────────────────────────────────────────────
          Giant square div, centered horizontally, top edge above viewport.
          The radial-gradient band creates the glowing ring.
          Only the bottom arc sweeps into the visible section area.
      ──────────────────────────────────────────────────────────────────────── */}

      {/* Outer wide glow band — soft halo around the rim */}
      <div style={{
        position: "absolute",
        left: "50%", top: "-80%",
        transform: "translateX(-50%)",
        width: "180vw", height: "180vw",
        maxWidth: "2200px", maxHeight: "2200px",
        minWidth: "900px", minHeight: "900px",
        borderRadius: "50%",
        background: "radial-gradient(circle, transparent 0%, transparent 40%, rgba(50,50,50,0.06) 43%, rgba(60,60,60,0.18) 46%, rgba(70,70,70,0.28) 48.5%, rgba(55,55,55,0.18) 51%, rgba(40,40,40,0.08) 54%, transparent 60%)",
        zIndex: 0,
        animation: "arcPulse 12s ease-in-out infinite",
        willChange: "opacity",
      }} />

      {/* Inner tight band — the actual bright rim edge */}
      <div style={{
        position: "absolute",
        left: "50%", top: "-80%",
        transform: "translateX(-50%)",
        width: "174vw", height: "174vw",
        maxWidth: "2100px", maxHeight: "2100px",
        minWidth: "860px", minHeight: "860px",
        borderRadius: "50%",
        background: "radial-gradient(circle, transparent 0%, transparent 44%, rgba(80,80,80,0.10) 46%, rgba(100,100,100,0.35) 48%, rgba(120,120,120,0.48) 49.2%, rgba(100,100,100,0.35) 50.4%, rgba(70,70,70,0.14) 52.5%, transparent 56%)",
        zIndex: 0,
        animation: "arcPulse 12s ease-in-out infinite 0.8s",
        willChange: "opacity",
      }} />

      {/* Subtle upward bloom where the arc meets the content — adds depth */}
      <div style={{
        position: "absolute",
        left: "50%", bottom: "0%",
        transform: "translateX(-50%)",
        width: "80vw", height: "40%",
        background: "radial-gradient(ellipse at 50% 100%, rgba(50,50,50,0.18) 0%, rgba(30,30,30,0.06) 50%, transparent 75%)",
        filter: "blur(30px)",
        zIndex: 0,
      }} />

      {/* Noise grain */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.045, pointerEvents: "none" }} aria-hidden="true">
        <filter id="cta-grain4">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain4)" />
      </svg>

      {/* Bottom fade to black */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, #000000 0%, transparent 100%)" }} />
      {/* Top fade to black */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to bottom, #000000 0%, transparent 100%)" }} />

      <style>{`
        @keyframes arcPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.62; }
        }
      `}</style>

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "760px", width: "100%" }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "10px", fontWeight: 500,
          letterSpacing: "0.20em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          margin: "0 0 32px 0",
          WebkitFontSmoothing: "antialiased",
        }}>
          Ready when you are
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(48px, 9vw, 110px)", fontWeight: 700,
          letterSpacing: "-0.048em", lineHeight: 0.92,
          color: "#ffffff", margin: "0 0 28px 0",
          WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
        }}>
          Build what<br />
          <span style={{ color: "rgba(255,255,255,0.28)" }}>others won't.</span>
        </h2>

        {/* Divider */}
        <div style={{ width: "36px", height: "1px", background: "rgba(255,255,255,0.14)", margin: "0 auto 24px auto" }} />

        {/* Sub */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 400,
          color: "rgba(255,255,255,0.42)", maxWidth: "360px",
          margin: "0 auto 44px auto", lineHeight: 1.65, letterSpacing: "-0.01em",
          WebkitFontSmoothing: "antialiased",
        }}>
          Describe your problem. Scoped and priced within 24 hours.
        </p>

        {/* Single CTA — no distractions */}
        <button
          onClick={openModal}
          style={{
            background: "#2997ff", color: "#ffffff",
            padding: "16px 44px", borderRadius: "980px",
            fontSize: "16px", fontWeight: 500,
            cursor: "pointer", border: "none",
            display: "inline-block",
            transition: "background 0.2s ease, transform 0.2s ease",
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
            marginBottom: "24px",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          Start a project
        </button>

        {/* Trust line */}
        <p style={{
          display: "block",
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
