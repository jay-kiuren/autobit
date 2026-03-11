import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [badgeHovered, setBadgeHovered] = useState(false);

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
      {/* Liquid glass SVG filter — hidden, just defines the distortion */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="badge-glass"
            x="-20%" y="-20%" width="140%" height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.065 0.065"
              numOctaves="1"
              seed="3"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="1.5" result="blurredNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="1.5" result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>

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

        {/* Liquid Glass Badge */}
        <a
          href="mailto:autobitofficial.ph@gmail.com"
          onMouseEnter={() => setBadgeHovered(true)}
          onMouseLeave={() => setBadgeHovered(false)}
          style={{
            position: "relative",
            display: "inline-flex", alignItems: "center", gap: "8px",
            borderRadius: "9999px",
            padding: "8px 20px",
            fontSize: "12px", letterSpacing: "0.05em",
            color: badgeHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
            textDecoration: "none", cursor: "pointer",
            transition: "color 0.3s ease, transform 0.3s ease",
            transform: badgeHovered ? "scale(1.04)" : "scale(1)",
            marginBottom: "28px",
            // Liquid glass rim — the magic
            boxShadow: `
              0 0 6px rgba(0,0,0,0.03),
              0 2px 6px rgba(0,0,0,0.08),
              inset 3px 3px 0.5px -3px rgba(0,0,0,0.9),
              inset -3px -3px 0.5px -3px rgba(0,0,0,0.85),
              inset 1px 1px 1px -0.5px rgba(255,255,255,0.35),
              inset -1px -1px 1px -0.5px rgba(255,255,255,0.20),
              inset 0 0 6px 6px rgba(255,255,255,0.06),
              inset 0 0 2px 2px rgba(255,255,255,0.04),
              0 0 18px rgba(255,255,255,0.08)
            `,
          }}
        >
          {/* Liquid glass distorted backdrop */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "9999px",
            backdropFilter: 'url("#badge-glass") blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 0,
          }} />

          {/* Top highlight shimmer */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            borderRadius: "9999px",
            zIndex: 1,
          }} />

          {/* Pulse dot */}
          <span style={{
            position: "relative", zIndex: 2,
            height: "6px", width: "6px", borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            display: "inline-block",
            boxShadow: "0 0 6px rgba(255,255,255,0.6)",
            animation: "badgePulse 2.5s ease-in-out infinite",
            flexShrink: 0,
          }} />

          {/* Text */}
          <span style={{ position: "relative", zIndex: 2, fontWeight: 500 }}>
            Start Something™
          </span>

          {/* Arrow on hover */}
          <span style={{
            position: "relative", zIndex: 2,
            opacity: badgeHovered ? 1 : 0,
            transform: badgeHovered ? "translateX(0)" : "translateX(-4px)",
            transition: "all 0.3s ease",
            fontSize: "11px",
          }}>→</span>
        </a>

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
        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.75); box-shadow: 0 0 10px rgba(255,255,255,0.8); }
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
