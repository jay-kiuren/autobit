import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [bgReady, setBgReady] = useState(false);

  const words = useMemo(
    () => ["automation.", "operations.", "intelligence.", "robotics.", "platforms."],
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearTimeout(t);
  }, [index, words]);

  useEffect(() => {
    const t = setTimeout(() => setBgReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 10vh, 120px) 24px clamp(60px, 8vh, 96px)",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        opacity: bgReady ? 1 : 0,
        transition: "opacity 2s ease",
      }}>
        <ColorBends
          colors={["#1c1c1c", "#2e2e2e", "#424242", "#2e2e2e", "#1c1c1c"]}
          rotation={0} speed={0.11} scale={0.7} frequency={1}
          warpStrength={1} mouseInfluence={0.06} parallax={0.5}
          noise={0} autoRotate={0}
        />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.58)",
        zIndex: 1, pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center", width: "100%", maxWidth: "860px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        <JellyChip />

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginBottom: "20px" }}>
          <h1 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "clamp(32px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.04,
            color: "#ffffff",
            margin: 0,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}>
            Systems engineered for
          </h1>

          <div style={{
            height: "clamp(40px, 7vw, 82px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -32, filter: "blur(10px)" }}
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "clamp(32px, 6vw, 72px)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.04,
                  color: "rgba(255,255,255,0.42)",
                  display: "block", textAlign: "center",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Subheading */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(15px, 1.5vw, 19px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.72)",
          maxWidth: "520px",
          margin: "0 0 32px 0",
          lineHeight: 1.5,
          letterSpacing: "-0.015em",
        }}>
          AI agents, automation, web applications, and intelligent robotics. Engineered to scale.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "14px" }}>
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            style={{
              background: "#2997ff", color: "#ffffff",
              padding: "12px 26px", borderRadius: "980px",
              fontSize: "15px", fontWeight: 500,
              textDecoration: "none", transition: "background 0.2s ease, transform 0.2s ease",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0077ed";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2997ff";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >Start a project</a>

          <a
            href="/projects"
            style={{
              background: "rgba(255,255,255,0.10)", color: "#ffffff",
              padding: "12px 26px", borderRadius: "980px",
              fontSize: "15px", fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
              display: "inline-block",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2997ff";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >See our work</a>
        </div>

        {/* Trust line */}
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "13px", fontWeight: 400,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0em", margin: "0 0 40px 0",
        }}>
          Trusted by founders and teams across Southeast Asia.
        </p>

        {/* Stats grid */}
        <div
          className="hero-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", overflow: "hidden",
            background: "rgba(0,0,0,0.40)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {[
            { value: "2–5d",     label: "Average delivery" },
            { value: "$800+",    label: "Starting price" },
            { value: "Patented", label: "Award-winning builds" },
            { value: "50%",      label: "Deposit to start" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "clamp(14px, 2vh, 20px) 12px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 700,
                letterSpacing: "-0.03em", color: "#ffffff", lineHeight: 1,
                WebkitFontSmoothing: "antialiased",
              }}>{stat.value}</div>
              <div style={{
                fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "10px", color: "rgba(255,255,255,0.38)",
                marginTop: "4px", letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-stats-grid > div:nth-child(1),
          .hero-stats-grid > div:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .hero-stats-grid > div:nth-child(2),
          .hero-stats-grid > div:nth-child(4) { border-right: none !important; }
        }
      `}</style>
    </section>
  );
};

// ─── JELLY CHIP ──────────────────────────────────────────────────────────────
// Default state: CLEAN — no filter applied, crisp text, proper glass look
// Hover/press: SVG displacement filter kicks in — edges and fill wobble like gel
// Filter scale = 0 at rest (invisible), ramps to 8 on hover, 16 on press
// This prevents the always-on pixelation bug
// ─────────────────────────────────────────────────────────────────────────────
const JellyChip = () => {
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const currentScale = useRef(0);
  const targetScale = useRef(0);
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = targetScale.current - currentScale.current;
      currentScale.current += diff * 0.10;
      if (displacementRef.current) {
        displacementRef.current.setAttribute("scale", currentScale.current.toFixed(3));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="jelly-chip" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.025 0.04"
              numOctaves="2"
              seed="5"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.025 0.04;0.035 0.055;0.028 0.045;0.025 0.04"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        onMouseEnter={() => { setHovered(true); targetScale.current = 7; }}
        onMouseLeave={() => { setHovered(false); setActive(false); targetScale.current = 0; }}
        onMouseDown={() => { setActive(true); targetScale.current = 14; }}
        onMouseUp={() => { setActive(false); targetScale.current = 7; }}
        style={{
          // Only apply filter when hovering — clean at rest
          filter: hovered || active ? "url(#jelly-chip)" : "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9999px",
          padding: "9px 24px",
          marginBottom: "28px",
          cursor: "default",
          userSelect: "none" as const,
          position: "relative" as const,
          // Clean frosted glass at rest
          background: hovered
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered
            ? `
                inset 0 1px 0 rgba(255,255,255,0.50),
                inset 0 -0.5px 0 rgba(255,255,255,0.06),
                0 4px 20px rgba(0,0,0,0.22),
                0 0 0 0.5px rgba(255,255,255,0.14),
                0 0 24px rgba(255,255,255,0.06)
              `
            : `
                inset 0 1px 0 rgba(255,255,255,0.35),
                inset 0 -0.5px 0 rgba(255,255,255,0.04),
                0 2px 10px rgba(0,0,0,0.18),
                0 0 0 0.5px rgba(255,255,255,0.09)
              `,
        }}
      >
        {/* Top light shimmer — glass catching light */}
        <div style={{
          position: "absolute",
          top: "2px", left: "22%", right: "22%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }} />

        <span style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.07em",
          textTransform: "uppercase" as const,
          color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.62)",
          transition: "color 0.25s ease",
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          lineHeight: 1,
          position: "relative",
          zIndex: 1,
          // Counter-sharpen text on filter apply so it doesn't blur
          WebkitFontSmoothing: "antialiased",
        }}>
          Start Something™
        </span>
      </div>
    </>
  );
};

export default HeroSection;
