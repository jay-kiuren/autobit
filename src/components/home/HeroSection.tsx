import { useEffect, useMemo, useState } from "react";
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

        <GlassChip />

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
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            style={{
              background: "#2997ff", color: "#ffffff",
              padding: "12px 26px", borderRadius: "980px",
              fontSize: "15px", fontWeight: 500,
              cursor: "pointer", border: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
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
          >Start a project</button>

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

// ─── GLASS CHIP ──────────────────────────────────────────────────────────────
// Pure CSS — no filters, no JS physics
// Replicates the image: thick 3D gel pill with:
//   1. Large top-left specular blob (the bright white oval highlight)
//   2. Thin top edge catch light (1px rim)
//   3. Frosted semi-transparent fill
//   4. Soft drop shadow for ground contact depth
//   5. Inner depth shadow making it look thick/raised
// ─────────────────────────────────────────────────────────────────────────────
const GlassChip = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        padding: "10px 28px",
        marginBottom: "28px",
        cursor: "default",
        userSelect: "none" as const,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        transform: hovered ? "scale(1.04) translateY(-1px)" : "scale(1) translateY(0)",

        // Frosted glass body
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",

        // The layered shadow system that creates 3D depth:
        // 1. Outer drop shadow — object sitting on a surface
        // 2. Inner top highlight — light hitting the curved top face
        // 3. Inner bottom depth — underside catching less light
        // 4. Outer rim — subtle 1px border instead of solid line
        boxShadow: hovered
          ? `
              /* Ground shadow — deeper on hover (lifted) */
              0 12px 40px rgba(0,0,0,0.45),
              0 4px 12px rgba(0,0,0,0.30),
              /* Top face catch light */
              inset 0 1.5px 0 rgba(255,255,255,0.70),
              /* Side rim lights */
              inset 1px 0 0 rgba(255,255,255,0.20),
              inset -1px 0 0 rgba(255,255,255,0.12),
              /* Underside shadow — makes it look thick */
              inset 0 -2px 6px rgba(0,0,0,0.25),
              /* Outer rim */
              0 0 0 0.5px rgba(255,255,255,0.18),
              /* Ambient glow */
              0 0 30px rgba(255,255,255,0.07)
            `
          : `
              /* Ground shadow */
              0 6px 24px rgba(0,0,0,0.40),
              0 2px 6px rgba(0,0,0,0.25),
              /* Top face catch light */
              inset 0 1.5px 0 rgba(255,255,255,0.55),
              /* Side rim */
              inset 1px 0 0 rgba(255,255,255,0.14),
              inset -1px 0 0 rgba(255,255,255,0.08),
              /* Underside depth */
              inset 0 -2px 5px rgba(0,0,0,0.20),
              /* Outer rim */
              0 0 0 0.5px rgba(255,255,255,0.12)
            `,
      }}
    >
      {/*
        SPECULAR HIGHLIGHT — the big white oval in the top-left of the image.
        This is what makes it look like a physical 3D gel object.
        It's a blurred white ellipse, positioned top-left of the pill.
      */}
      <div style={{
        position: "absolute",
        top: "3px",
        left: "14%",
        width: "38%",
        height: "45%",
        background: "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.20) 50%, transparent 75%)",
        borderRadius: "9999px",
        pointerEvents: "none",
        filter: "blur(2px)",
        opacity: hovered ? 0.9 : 0.75,
        transition: "opacity 0.3s ease",
      }} />

      {/* Secondary smaller specular on right — real glass has multiple light bounces */}
      <div style={{
        position: "absolute",
        bottom: "4px",
        right: "18%",
        width: "18%",
        height: "30%",
        background: "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%)",
        borderRadius: "9999px",
        pointerEvents: "none",
        filter: "blur(1px)",
      }} />

      {/* Text */}
      <span style={{
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.07em",
        textTransform: "uppercase" as const,
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
        transition: "color 0.25s ease",
        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1,
        position: "relative",
        zIndex: 1,
        WebkitFontSmoothing: "antialiased",
      }}>
        Start Something™
      </span>
    </div>
  );
};

export default HeroSection;
