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
//
// THE CORRECT TECHNIQUE (from Codrops + Medium research):
//   Apply SVG filter directly to the element via CSS filter: url(#id)
//   This displaces the element's OWN pixels — edges, fill, text all wobble together
//   feTurbulence generates Perlin noise → feDisplacementMap shifts pixels using that noise
//   Animate baseFrequency continuously = living jelly breathing
//   On hover: JS ramps up displacement scale → more aggressive wobble
//   On mouse leave: scale ramps back down → settles calmly
//
// This is fundamentally different from backdrop-filter (which only affects what's behind)
// Here the chip ITSELF is the distorted jelly object
// ─────────────────────────────────────────────────────────────────────────────
const JellyChip = () => {
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const scaleRef = useRef(4);
  const targetScaleRef = useRef(4);
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  // Animate displacement scale smoothly toward target
  useEffect(() => {
    const tick = () => {
      const current = scaleRef.current;
      const target = targetScaleRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.05) {
        scaleRef.current = current + diff * 0.06;
      } else {
        scaleRef.current = target;
      }
      if (displacementRef.current) {
        displacementRef.current.setAttribute("scale", String(scaleRef.current.toFixed(2)));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleEnter = () => {
    setHovered(true);
    targetScaleRef.current = 10; // More jelly on hover
  };

  const handleLeave = () => {
    setHovered(false);
    targetScaleRef.current = 4; // Calm back down
  };

  const handleDown = () => {
    targetScaleRef.current = 16; // Squish hard on press
  };

  const handleUp = () => {
    // Bounce back up past rest then settle
    targetScaleRef.current = 14;
    setTimeout(() => { targetScaleRef.current = hovered ? 10 : 4; }, 120);
  };

  return (
    <>
      {/*
        SVG filter definition — hidden, defines the jelly distortion.
        type="turbulence" = wave-like ripples (vs fractalNoise which is cloudy)
        baseFrequency low (0.02) = slow gentle waves, not chaotic static
        <animate> on baseFrequency = continuously shifting waves = living jelly
        Filter applied via CSS filter: url(#jelly-chip) on the chip div below
      */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="jelly-chip"
            x="-20%" y="-20%"
            width="140%" height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02 0.04"
              numOctaves="2"
              seed="8"
              result="noise"
            >
              {/* Animate baseFrequency = the wave pattern slowly shifts = living water */}
              <animate
                attributeName="baseFrequency"
                values="0.02 0.04; 0.03 0.06; 0.025 0.05; 0.02 0.04"
                keyTimes="0; 0.33; 0.66; 1"
                dur="5s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/*
        The chip itself.
        filter: url(#jelly-chip) applies displacement to THIS element directly.
        The element's own edges, background, and text all get warped together.
        It is the jelly — not something behind it.
      */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        style={{
          // THE KEY LINE — apply SVG filter to the element itself
          filter: "url(#jelly-chip)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9999px",
          padding: "9px 24px",
          marginBottom: "28px",
          cursor: "default",
          userSelect: "none",
          background: hovered ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.3s ease",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.40),
            inset 0 -0.5px 0 rgba(255,255,255,0.05),
            0 2px 12px rgba(0,0,0,0.20),
            0 0 0 0.5px rgba(255,255,255,${hovered ? "0.16" : "0.09"})
          `,
        }}
      >
        {/* Top shimmer — light catching glass edge */}
        <div style={{
          position: "absolute",
          top: "2px", left: "20%", right: "20%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.50), transparent)",
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
        }}>
          Start Something™
        </span>
      </div>
    </>
  );
};

export default HeroSection;
