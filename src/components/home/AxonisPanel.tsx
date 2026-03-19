import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── AXONIS PANEL — VIDEO BACKGROUND ─────────────────────────────────────────
// Background: /public/axonis-demo.mp4 — autoplay, muted, looping, no controls
// Filter: saturate(0.20) brightness(0.55) — desaturates the cyan, dims it
// so white text reads perfectly on top with no color clash.
// Only text moves. Background is static.
// ─────────────────────────────────────────────────────────────────────────────

const sf: React.CSSProperties = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};
const sfText: React.CSSProperties = {
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const AxonisPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ch1: Intro title — holds for ~100vh of scroll
  const ch1Opacity = useTransform(scrollYProgress, [0.00, 0.06, 0.18, 0.32], [0, 1, 1, 0]);
  const ch1Y       = useTransform(scrollYProgress, [0.00, 0.08], [28, 0]);

  // Ch2: Every sensor — holds for ~80vh
  const ch2Opacity = useTransform(scrollYProgress, [0.38, 0.46, 0.60, 0.72], [0, 1, 1, 0]);
  const ch2Y       = useTransform(scrollYProgress, [0.38, 0.48], [28, 0]);

  // CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.86, 1.00], [0, 1, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.78, 0.88], [20, 0]);

  // Scroll hint
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.14], [0, 1, 0]);

  return (
    <div ref={containerRef} style={{ height: "350vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000000" }}>

        {/* ── VIDEO BACKGROUND — static, full screen ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          // Desaturate cyan → cool neutral. Dim to let white text dominate.
          filter: "saturate(0.20) brightness(0.55)",
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", display: "block",
            }}
          >
            <source src="/axonis-demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── VIGNETTE — center stays lit, edges pull to black ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.97) 100%)",
        }} />

        {/* Hard top + bottom bars */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, transparent 10%, transparent 88%, rgba(0,0,0,0.95) 100%)",
        }} />

        {/* ── CHAPTER 1 — Intro ── */}
        <motion.div style={{
          position: "absolute", zIndex: 10,
          left: "50%", top: "50%",
          x: "-50%", y: "-50%",
          translateY: ch1Y,
          opacity: ch1Opacity,
          textAlign: "center",
          width: "100%", padding: "0 32px",
        }}>
          <p style={{
            ...sfText,
            fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            margin: "0 0 24px 0",
            textShadow: "0 2px 24px rgba(0,0,0,1)",
          }}>Autobit — AXONIS Platform</p>

          <h2 style={{
            ...sf,
            fontSize: "clamp(52px, 9vw, 112px)", fontWeight: 700,
            letterSpacing: "-0.050em", lineHeight: 0.92,
            color: "#ffffff", margin: 0,
            textShadow: "0 2px 0 rgba(0,0,0,0.6), 0 4px 60px rgba(0,0,0,1), 0 8px 80px rgba(0,0,0,1)",
          }}>
            The AI safety OS
          </h2>
          <h2 style={{
            ...sf,
            fontSize: "clamp(52px, 9vw, 112px)", fontWeight: 700,
            letterSpacing: "-0.050em", lineHeight: 0.92,
            color: "rgba(255,255,255,0.30)", margin: 0,
            textShadow: "0 4px 60px rgba(0,0,0,1)",
          }}>
            for critical infrastructure.
          </h2>
        </motion.div>

        {/* ── CHAPTER 2 — Every sensor ── */}
        <motion.div style={{
          position: "absolute", zIndex: 10,
          left: "50%", top: "50%",
          x: "-50%", y: "-50%",
          translateY: ch2Y,
          opacity: ch2Opacity,
          textAlign: "center",
          pointerEvents: "none",
          width: "100%", padding: "0 32px",
        }}>
          <p style={{
            ...sfText,
            fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            margin: "0 0 24px 0",
            textShadow: "0 2px 24px rgba(0,0,0,1)",
          }}>Live monitoring</p>

          <h2 style={{
            ...sf,
            fontSize: "clamp(52px, 9vw, 112px)", fontWeight: 700,
            letterSpacing: "-0.050em", lineHeight: 0.92,
            color: "#ffffff", margin: 0,
            textShadow: "0 2px 0 rgba(0,0,0,0.6), 0 4px 60px rgba(0,0,0,1), 0 8px 80px rgba(0,0,0,1)",
          }}>
            Every sensor.
          </h2>
          <h2 style={{
            ...sf,
            fontSize: "clamp(52px, 9vw, 112px)", fontWeight: 700,
            letterSpacing: "-0.050em", lineHeight: 0.92,
            color: "rgba(255,255,255,0.30)", margin: 0,
            textShadow: "0 4px 60px rgba(0,0,0,1)",
          }}>
            Every millisecond.
          </h2>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div style={{
          position: "absolute", zIndex: 10,
          left: "50%", bottom: "9%",
          x: "-50%",
          opacity: ctaOpacity,
          translateY: ctaY,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "20px",
          textAlign: "center",
        }}>
          <p style={{
            ...sfText,
            fontSize: "14px", color: "rgba(255,255,255,0.50)",
            letterSpacing: "-0.01em", margin: 0,
            textShadow: "0 2px 24px rgba(0,0,0,1)",
          }}>
            Mining · Energy · Industrial AI
          </p>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a
              href="/projects#axonis"
              style={{
                ...sfText,
                background: "#2997ff", color: "#ffffff",
                padding: "14px 36px", borderRadius: "980px",
                fontSize: "15px", fontWeight: 600,
                textDecoration: "none", display: "inline-block",
                letterSpacing: "-0.01em",
                transition: "background 0.18s ease, transform 0.18s ease",
                boxShadow: "0 0 40px rgba(41,151,255,0.35), 0 4px 20px rgba(0,0,0,0.60)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#0077ed";
                el.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#2997ff";
                el.style.transform = "scale(1)";
              }}
            >
              Learn more
            </a>

            <a
              href="/projects#axonis"
              style={{
                ...sfText,
                color: "rgba(255,255,255,0.65)",
                fontSize: "15px", fontWeight: 400,
                textDecoration: "none", letterSpacing: "-0.01em",
                transition: "color 0.18s ease",
                textShadow: "0 2px 24px rgba(0,0,0,0.90)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
            >
              Request access →
            </a>
          </div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div style={{
          position: "absolute", bottom: "30px", left: "50%",
          x: "-50%", zIndex: 10,
          opacity: hintOpacity,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <p style={{
            ...sfText,
            fontSize: "9px", color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.20em", textTransform: "uppercase", margin: 0,
          }}>Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
            style={{ width: "1px", height: "30px", background: "rgba(255,255,255,0.20)" }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default AxonisPanel;
