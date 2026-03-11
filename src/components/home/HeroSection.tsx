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
      {/* ColorBends — NOT transparent so no alpha edge cut */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: bgReady ? 1 : 0,
        transition: "opacity 2s ease",
      }}>
        <ColorBends
          colors={["#1c1c1c", "#2e2e2e", "#424242", "#2e2e2e", "#1c1c1c"]}
          rotation={0}
          speed={0.11}
          scale={0.7}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.06}
          parallax={0.5}
          noise={0}
          autoRotate={0}
        />
      </div>

      {/* Overlay — not too dark, not too bright */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.58)",
        zIndex: 1, pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center", width: "100%", maxWidth: "860px",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "clamp(10px, 1.8vh, 22px)",
      }}>

        {/* Badge */}
        <a
          href="mailto:autobitofficial.ph@gmail.com"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            padding: "7px 18px",
            fontSize: "12px", letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.50)",
            textDecoration: "none", cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.09)";
            e.currentTarget.style.color = "rgba(255,255,255,0.75)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.50)";
          }}
        >
          <span style={{
            height: "6px", width: "6px", borderRadius: "50%",
            background: "rgba(255,255,255,0.45)", display: "inline-block",
            animation: "badgePulse 2.5s ease-in-out infinite",
          }} />
          Start Something™
        </a>

        {/* Headline + cycling word */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <h1 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
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
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
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
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "clamp(13px, 1.3vw, 17px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.40)",
          maxWidth: "460px",
          margin: 0,
          lineHeight: 1.6,
          letterSpacing: "-0.01em",
        }}>
          AI agents, automation, web applications, and intelligent robotics — built and deployed in days.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            style={{
              background: "#2997ff", color: "#ffffff",
              padding: "clamp(10px, 1.2vh, 13px) 30px",
              borderRadius: "980px", fontSize: "15px", fontWeight: 600,
              textDecoration: "none", transition: "all 0.25s ease",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              boxShadow: "0 0 28px rgba(41,151,255,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 52px rgba(41,151,255,0.50)";
              e.currentTarget.style.transform = "scale(1.025)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 28px rgba(41,151,255,0.25)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >Start a project</a>
          <a
            href="/projects"
            style={{
              background: "transparent", color: "#2997ff",
              padding: "clamp(10px, 1.2vh, 13px) 30px",
              borderRadius: "980px", fontSize: "15px", fontWeight: 600,
              textDecoration: "none", transition: "all 0.25s ease",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(41,151,255,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#2997ff"; }}
          >See our work →</a>
        </div>

        {/* Trust line */}
        <p style={{
          fontSize: "11px", color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.04em", textTransform: "uppercase", margin: 0,
        }}>
          50% deposit to start · Balance on delivery · No retainers
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
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 700,
                letterSpacing: "-0.03em", color: "#ffffff", lineHeight: 1,
                WebkitFontSmoothing: "antialiased",
              }}>{stat.value}</div>
              <div style={{
                fontSize: "10px", color: "rgba(255,255,255,0.28)",
                marginTop: "4px", letterSpacing: "0.07em", textTransform: "uppercase",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        @media (max-width: 600px) {
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-stats-grid > div:nth-child(1),
          .hero-stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          }
          .hero-stats-grid > div:nth-child(2),
          .hero-stats-grid > div:nth-child(4) {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
