import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Silk from "@/components/Silk";

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const words = useMemo(
    () => ["automation.", "operations.", "intelligence.", "robotics.", "platforms."],
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearTimeout(t);
  }, [index, words]);

  return (
    <section
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Silk speed={0.5} scale={1} color="#888888" noiseIntensity={1.5} rotation={0} mouseInfluence={0.5} />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.35)",
        zIndex: 1, pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center", width: "100%", maxWidth: "860px",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "clamp(8px, 1.4vh, 18px)",
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
            padding: "6px 16px",
            fontSize: "11px", letterSpacing: "0.04em",
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
        <div>
          <h1 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontSize: "clamp(28px, 5vw, 66px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.06,
            color: "#ffffff",
            margin: 0,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}>
            Systems engineered for
          </h1>

          <div style={{
            height: "clamp(36px, 6.5vh, 78px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  fontSize: "clamp(28px, 5vw, 66px)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.06,
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
          fontSize: "clamp(13px, 1.2vw, 16px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.40)",
          maxWidth: "440px",
          margin: 0,
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
        }}>
          AI agents, automation, web applications, and intelligent robotics — built and deployed in days.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            style={{
              background: "#2997ff", color: "#ffffff", padding: "12px 28px",
              borderRadius: "980px", fontSize: "14px", fontWeight: 600,
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
              background: "transparent", color: "#2997ff", padding: "12px 28px",
              borderRadius: "980px", fontSize: "14px", fontWeight: 600,
              textDecoration: "none", transition: "all 0.25s ease",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(41,151,255,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#2997ff"; }}
          >See our work →</a>
        </div>

        {/* Trust line */}
        <p style={{
          fontSize: "10px", color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.04em", textTransform: "uppercase", margin: 0,
        }}>
          50% deposit to start · Balance on delivery · No retainers
        </p>

        {/* Stats grid — always 4 columns, always inside hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px", overflow: "hidden",
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
              padding: "clamp(12px, 1.8vh, 18px) 12px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "clamp(15px, 1.6vw, 24px)", fontWeight: 700,
                letterSpacing: "-0.03em", color: "#ffffff", lineHeight: 1,
                WebkitFontSmoothing: "antialiased",
              }}>{stat.value}</div>
              <div style={{
                fontSize: "9px", color: "rgba(255,255,255,0.28)",
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
          .hero-stats-mobile {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
