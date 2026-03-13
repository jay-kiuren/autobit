import { useState, useEffect, useRef } from "react";
import { useContactModal } from "@/contexts/ContactModalContext";
import ColorBends from "@/components/ColorBends";

const FinalCTA = () => {
  const { openModal } = useContactModal();
  const [bgReady, setBgReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setBgReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };
    const el = sectionRef.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#000000",
        overflow: "hidden",
        padding: "clamp(100px, 14vw, 180px) 24px clamp(120px, 16vw, 200px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* ColorBends — same as hero, visual continuity */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        opacity: bgReady ? 0.55 : 0,
        transition: "opacity 2s ease",
      }}>
        <ColorBends
          colors={["#1c1c1c", "#2e2e2e", "#424242", "#2e2e2e", "#1c1c1c"]}
          rotation={0} speed={0.06} scale={0.8} frequency={0.8}
          warpStrength={0.7} mouseInfluence={0.04} parallax={0.3}
          noise={0} autoRotate={0}
        />
      </div>

      {/* Heavy dark overlay so it feels darker/deeper than hero */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "rgba(0,0,0,0.72)",
      }} />

      {/* Stage spotlight — follows mouse subtly */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 55% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.055) 0%, transparent 70%)`,
        transition: "background 0.6s ease",
      }} />

      {/* Fixed top-center soft glow — the "stage light from above" */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "50%", zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 65%)",
      }} />

      {/* Horizontal thin light line across center */}
      <div style={{
        position: "absolute", left: "10%", right: "10%",
        top: "50%", height: "1px", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
        transform: "translateY(-50%)",
      }} />

      {/* Noise grain overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, opacity: 0.035, pointerEvents: "none" }}>
        <filter id="cta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "820px", width: "100%" }}>

        {/* Eyebrow label */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          marginBottom: "28px",
          WebkitFontSmoothing: "antialiased",
        }}>
          Ready when you are
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(40px, 7.5vw, 96px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.98,
          color: "#ffffff",
          margin: "0 0 28px 0",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}>
          Build something<br />
          <span style={{ color: "rgba(255,255,255,0.38)" }}>others won't.</span>
        </h2>

        {/* Sub */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(15px, 1.5vw, 19px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.55)",
          maxWidth: "480px",
          margin: "0 auto 40px auto",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
          WebkitFontSmoothing: "antialiased",
        }}>
          Describe your problem. Scoped and priced within 24 hours.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
          <button
            onClick={openModal}
            style={{
              background: "#2997ff", color: "#ffffff",
              padding: "14px 32px", borderRadius: "980px",
              fontSize: "15px", fontWeight: 500, cursor: "pointer", border: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
              WebkitFontSmoothing: "antialiased",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
          >Start a project</button>

          <a
            href="/projects"
            style={{
              background: "rgba(255,255,255,0.09)", color: "#ffffff",
              padding: "14px 32px", borderRadius: "980px",
              fontSize: "15px", fontWeight: 500,
              textDecoration: "none", border: "none", display: "inline-block",
              transition: "background 0.2s ease, transform 0.2s ease",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
              WebkitFontSmoothing: "antialiased",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "scale(1)"; }}
          >View our work</a>
        </div>

        {/* Trust micro-line */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px", fontWeight: 400,
          color: "rgba(255,255,255,0.22)",
          letterSpacing: "0.08em", textTransform: "uppercase",
          margin: 0,
        }}>
          50% Deposit · Balance on delivery · No retainers · Reply within 24h
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
