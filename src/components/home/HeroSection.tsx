import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [badgeHovered, setBadgeHovered] = useState(false);
  const [badgePressed, setBadgePressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const badgeRef = useRef<HTMLAnchorElement>(null);

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

  const handleBadgeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = badgeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

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
      {/* Liquid glass SVG filter — exact params from 21st.dev */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter
            id="container-glass"
            x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves="1"
              seed="1"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
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

        {/* === LIQUID GLASS BADGE === */}
        <a
          ref={badgeRef}
          href="mailto:autobitofficial.ph@gmail.com"
          onClick={handleBadgeClick}
          onMouseEnter={() => setBadgeHovered(true)}
          onMouseLeave={() => { setBadgeHovered(false); setBadgePressed(false); }}
          onMouseDown={() => setBadgePressed(true)}
          onMouseUp={() => setBadgePressed(false)}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            borderRadius: "9999px",
            padding: "9px 22px",
            fontSize: "12px",
            letterSpacing: "0.05em",
            fontWeight: 500,
            color: "rgba(255,255,255,0.85)",
            textDecoration: "none",
            cursor: "pointer",
            overflow: "hidden",
            marginBottom: "28px",
            transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            transform: badgePressed
              ? "scale(0.95)"
              : badgeHovered
              ? "scale(1.06)"
              : "scale(1)",
            // Dark mode glass rim — exact from 21st.dev LiquidButton dark shadow
            boxShadow: `
              0 0 8px rgba(0,0,0,0.03),
              0 2px 6px rgba(0,0,0,0.08),
              inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09),
              inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85),
              inset 1px 1px 1px -0.5px rgba(255,255,255,0.6),
              inset -1px -1px 1px -0.5px rgba(255,255,255,0.6),
              inset 0 0 6px 6px rgba(255,255,255,0.12),
              inset 0 0 2px 2px rgba(255,255,255,0.06),
              0 0 12px rgba(0,0,0,0.15),
              0 0 ${badgeHovered ? "20px" : "8px"} rgba(255,255,255,${badgeHovered ? "0.12" : "0.04"})
            `,
          }}
        >
          {/* Liquid glass distorted backdrop — exact from 21st.dev */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              overflow: "hidden",
              zIndex: -1,
              backdropFilter: 'url("#container-glass") blur(2px)',
              WebkitBackdropFilter: "blur(2px)",
            }}
          />

          {/* Top shimmer line */}
          <div style={{
            position: "absolute",
            top: 0, left: "15%", right: "15%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            zIndex: 1,
            borderRadius: "9999px",
          }} />

          {/* Bottom subtle edge */}
          <div style={{
            position: "absolute",
            bottom: 0, left: "20%", right: "20%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
            zIndex: 1,
          }} />

          {/* Ripple effects on click */}
          {ripples.map((r) => (
            <span
              key={r.id}
              style={{
                position: "absolute",
                left: r.x, top: r.y,
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.35)",
                transform: "translate(-50%,-50%) scale(0)",
                animation: "rippleOut 0.6s ease-out forwards",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />
          ))}

          {/* Pulse dot */}
          <span style={{
            position: "relative", zIndex: 2,
            height: "6px", width: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.80)",
            display: "inline-block",
            flexShrink: 0,
            boxShadow: "0 0 8px rgba(255,255,255,0.7)",
            animation: "badgePulse 2.5s ease-in-out infinite",
          }} />

          {/* Label */}
          <span style={{ position: "relative", zIndex: 2 }}>
            Start Something™
          </span>

          {/* Arrow slides in on hover */}
          <span style={{
            position: "relative", zIndex: 2,
            fontSize: "11px",
            opacity: badgeHovered ? 1 : 0,
            transform: badgeHovered ? "translateX(0px)" : "translateX(-6px)",
            transition: "all 0.3s ease",
            maxWidth: badgeHovered ? "16px" : "0px",
            overflow: "hidden",
            display: "inline-block",
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
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(255,255,255,0.7); }
          50% { opacity: 0.4; transform: scale(0.75); box-shadow: 0 0 3px rgba(255,255,255,0.3); }
        }
        @keyframes rippleOut {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(18); opacity: 0; }
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
