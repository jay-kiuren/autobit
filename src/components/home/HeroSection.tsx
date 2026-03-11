import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
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

        {/* JELLY CHIP */}
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
// The SHAPE ITSELF is the jelly. When hovered:
//   • The whole panel squishes and stretches (scaleX/scaleY spring)
//   • border-radius morphs organically so edges aren't perfectly round
//   • On release it bounces back with spring physics
//   • Mouse position tilts it in 3D (rotateX/rotateY)
//   • Text is INSIDE the jelly — it deforms WITH the panel
// ─────────────────────────────────────────────────────────────────────────────
const JellyChip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Spring config — low stiffness + high damping = slow jelly settle
  const springConfig = { stiffness: 180, damping: 10, mass: 0.8 };

  const scaleX = useSpring(1, springConfig);
  const scaleY = useSpring(1, springConfig);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 8);
    rotateX.set(-dy * 8);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    // Squish wide on hover — jelly spreading
    scaleX.set(1.10);
    scaleY.set(0.92);
    // Then it bounces back via spring automatically
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPressed(false);
    scaleX.set(1);
    scaleY.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMouseDown = () => {
    setPressed(true);
    // Press squishes it down — compress like pressing jelly
    scaleX.set(0.93);
    scaleY.set(1.07);
  };

  const handleMouseUp = () => {
    setPressed(false);
    // Release — bounces back with overshoot
    scaleX.set(1.08);
    scaleY.set(0.94);
    setTimeout(() => {
      scaleX.set(1);
      scaleY.set(1);
    }, 80);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        scaleX,
        scaleY,
        rotateX,
        rotateY,
        transformPerspective: 600,
        // Organic border-radius — not a perfect pill, slightly asymmetric like gel
        borderRadius: hovered
          ? "38% 62% 45% 55% / 55% 45% 55% 45%"
          : "9999px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 26px",
        marginBottom: "28px",
        cursor: "default",
        userSelect: "none" as const,
        position: "relative" as const,
        transition: "border-radius 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        // Glass depth — multiple layered shadows simulate a thick gel object
        boxShadow: hovered
          ? `
            0 8px 32px rgba(0,0,0,0.25),
            0 2px 8px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.55),
            inset 0 -1px 0 rgba(255,255,255,0.10),
            inset 1px 0 0 rgba(255,255,255,0.18),
            inset -1px 0 0 rgba(255,255,255,0.08),
            0 0 0 1px rgba(255,255,255,0.10),
            0 0 30px rgba(255,255,255,0.08)
          `
          : `
            0 4px 16px rgba(0,0,0,0.20),
            0 1px 4px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.40),
            inset 0 -1px 0 rgba(255,255,255,0.06),
            0 0 0 1px rgba(255,255,255,0.07)
          `,
        // Frosted gel fill
        background: hovered
          ? "rgba(255,255,255,0.10)"
          : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px) saturate(120%)",
        WebkitBackdropFilter: "blur(16px) saturate(120%)",
      }}
    >
      {/* Top gloss highlight — thick glass catching light */}
      <div style={{
        position: "absolute",
        top: "2px", left: "18%", right: "18%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.60), transparent)",
        borderRadius: "9999px",
        pointerEvents: "none",
      }} />

      {/* Label — moves with the jelly, it's embedded inside */}
      <span style={{
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.07em",
        textTransform: "uppercase" as const,
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.60)",
        transition: "color 0.3s ease",
        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        zIndex: 1,
      }}>
        Start Something™
      </span>
    </motion.div>
  );
};

export default HeroSection;
