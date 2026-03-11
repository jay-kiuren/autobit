import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [badgeHovered, setBadgeHovered] = useState(false);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const animFrameRef = useRef<number>(0);
  const currentScaleRef = useRef(18);

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

  // Smooth interpolation of displacement scale on hover
  useEffect(() => {
    const targetScale = badgeHovered ? 55 : 18;
    const animate = () => {
      const current = currentScaleRef.current;
      const diff = targetScale - current;
      if (Math.abs(diff) < 0.3) {
        currentScaleRef.current = targetScale;
      } else {
        currentScaleRef.current = current + diff * 0.08;
        animFrameRef.current = requestAnimationFrame(animate);
      }
      if (displacementRef.current) {
        displacementRef.current.setAttribute("scale", String(currentScaleRef.current));
      }
    };
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [badgeHovered]);

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
      {/*
        LIQUID WATER SVG FILTER
        - type="turbulence" for ripple/wave patterns (not fractalNoise which is cloudy)
        - <animate> on baseFrequency makes it continuously shift — living water
        - numOctaves="2" gives wave detail without being noisy
        - Applied ONLY to backdrop div, text layer sits above unaffected
      */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter
            id="jelly-water"
            x="-10%" y="-10%" width="120%" height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              id="jelly-turbulence"
              type="turbulence"
              baseFrequency="0.018 0.032"
              numOctaves="2"
              seed="4"
              result="turbulence"
            >
              {/* This <animate> is the key — shifts baseFrequency over time = living water */}
              <animate
                attributeName="baseFrequency"
                values="0.018 0.032;0.028 0.048;0.022 0.038;0.018 0.032"
                keyTimes="0;0.35;0.7;1"
                dur="7s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feGaussianBlur in="turbulence" stdDeviation="1" result="blurred" />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="blurred"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="2.5" result="softDisplaced" />
            <feComposite in="softDisplaced" in2="softDisplaced" operator="over" />
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

        {/* ===== JELLY WATER GLASS LABEL ===== */}
        {/* This is an announcement chip / label — NOT a button */}
        <div
          onMouseEnter={() => setBadgeHovered(true)}
          onMouseLeave={() => setBadgeHovered(false)}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            padding: "9px 24px",
            marginBottom: "28px",
            cursor: "default",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: badgeHovered ? "scale(1.05)" : "scale(1)",
            // Dark glass rim — from 21st.dev dark shadow spec
            boxShadow: `
              0 0 8px rgba(0,0,0,0.04),
              0 2px 8px rgba(0,0,0,0.10),
              inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09),
              inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85),
              inset 1px 1px 1px -0.5px rgba(255,255,255,0.60),
              inset -1px -1px 1px -0.5px rgba(255,255,255,0.60),
              inset 0 0 6px 6px rgba(255,255,255,0.10),
              inset 0 0 2px 2px rgba(255,255,255,0.05),
              0 0 ${badgeHovered ? "22px" : "8px"} rgba(255,255,255,${badgeHovered ? "0.10" : "0.03"})
            `,
          }}
        >
          {/*
            WATER LAYER — this is the "liquid inside glass"
            filter: url(#jelly-water) applies the living turbulence to whatever
            is behind this div (the ColorBends background)
            Clip to pill shape with overflow hidden + border-radius
            Text sits above in a separate z-layer, completely unaffected
          */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              overflow: "hidden",
              zIndex: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                // Liquid distortion on the backdrop — this is the water ripple
                backdropFilter: "blur(8px) url(#jelly-water)",
                WebkitBackdropFilter: "blur(8px)",
                // Slight tint to make the glass visible
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </div>

          {/* Top glass shimmer — catches the "light on glass" look */}
          <div style={{
            position: "absolute",
            top: 0, left: "12%", right: "12%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.50), transparent)",
            zIndex: 1,
            borderRadius: "9999px",
          }} />

          {/* Bottom subtle edge */}
          <div style={{
            position: "absolute",
            bottom: 0, left: "25%", right: "25%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            zIndex: 1,
          }} />

          {/* Label text — z:2 so it floats above the water, completely unaffected */}
          <span style={{
            position: "relative",
            zIndex: 2,
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: badgeHovered ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.65)",
            transition: "color 0.3s ease",
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            userSelect: "none",
          }}>
            Start Something™
          </span>
        </div>

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
