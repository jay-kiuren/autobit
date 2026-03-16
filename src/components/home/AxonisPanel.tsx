import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── DESIGN RATIONALE ─────────────────────────────────────────────────────────
//
// The AXONIS 3D map (Cesium + Google Photorealistic Tiles) lives in
// /public/axonis-demo.html — an iframe preloads it the moment the page mounts,
// so by the time the user scrolls here, the 3D city is already alive.
//
// COLOR GRADING SYSTEM:
// AXONIS uses cyan (#00c8ff) on navy (#000d1a). Autobit uses white on black.
// These are complementary but fight each other at full saturation.
// Solution: CSS filter saturate(0.50) brightness(0.78) on the iframe container
// — this "grades" it like a cinematographer pulling the cyan toward a neutral
// cool-gray. The dashboard reads as sophisticated intelligence, not gaming HUD.
// Then layered vignettes pull black from all edges, keeping the center lit.
//
// SCROLL CHAPTERS (280vh total):
// 0–25%   → Intro: title emerges from black. Dashboard behind at 30% opacity.
// 25–60%  → Dashboard scale-in centered, color grade lifts to 70%.
//            "Every sensor. Every millisecond." centered overlay.
// 60–100% → Full immersive. Overlay text fades. CTA emerges at bottom.
//
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

  // ── Dashboard transforms ───────────────────────────────────────────────────
  // Starts small centered, scales to fullscreen
  const dashOpacity    = useTransform(scrollYProgress, [0.05, 0.20, 1.0], [0, 1, 1]);
  const dashScale      = useTransform(scrollYProgress, [0.15, 0.42], [0.68, 1]);
  const dashBorderR    = useTransform(scrollYProgress, [0.15, 0.45], [16, 0]);
  const dashWidth      = useTransform(scrollYProgress, [0.15, 0.48], ["72%", "100%"]);
  const dashHeight     = useTransform(scrollYProgress, [0.15, 0.48], ["62%", "100%"]);
  const dashTop        = useTransform(scrollYProgress, [0.15, 0.48], ["19%", "0%"]);
  const dashLeft       = useTransform(scrollYProgress, [0.15, 0.48], ["14%", "0%"]);

  // ── Color grading overlay (dark film over the iframe) ─────────────────────
  // Starts at 0.88 opacity (very dark) → lifts to 0.18 as dashboard reveals
  const gradeOpacity   = useTransform(scrollYProgress, [0.08, 0.36, 0.62, 1.0], [0.92, 0.22, 0.18, 0.30]);

  // ── Text chapters ─────────────────────────────────────────────────────────
  const ch1Opacity     = useTransform(scrollYProgress, [0.0, 0.08, 0.20, 0.30], [0, 1, 1, 0]);
  const ch2Opacity     = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.60], [0, 1, 1, 0]);
  const ch2Y           = useTransform(scrollYProgress, [0.28, 0.42], [24, 0]);
  const ctaOpacity     = useTransform(scrollYProgress, [0.62, 0.72, 1.0], [0, 1, 1]);
  const ctaY           = useTransform(scrollYProgress, [0.62, 0.74], [20, 0]);

  // ── Scroll indicator ──────────────────────────────────────────────────────
  const scrollIndOpacity = useTransform(scrollYProgress, [0, 0.06, 0.18], [0, 1, 0]);

  return (
    <>
      {/*
        PRELOAD IFRAME — mounted immediately on page load, hidden off-screen.
        Cesium + Google 3D Tiles start loading NOW, not when user scrolls here.
        By the time they reach this section, the 3D city is live.

        SETUP: Copy axonis_nyc_v14-1.html → public/axonis-demo.html
        The API key stays in that file on your server — never in React code.
      */}
      <div style={{
        position: "fixed", top: "-9999px", left: "-9999px",
        width: "1px", height: "1px", overflow: "hidden",
        pointerEvents: "none", zIndex: -1,
      }}>
        <iframe
          src="/axonis-demo.html"
          title="AXONIS preload"
          style={{ width: "1920px", height: "1080px", border: "none" }}
          loading="eager"
        />
      </div>

      {/* Scroll container — 280vh drives all animations */}
      <div ref={containerRef} style={{ height: "280vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000000" }}>

          {/* ── IFRAME — the actual AXONIS 3D UI ─────────────────────────── */}
          <motion.div style={{
            position: "absolute",
            top: dashTop, left: dashLeft,
            width: dashWidth, height: dashHeight,
            opacity: dashOpacity,
            scale: dashScale,
            borderRadius: dashBorderR,
            overflow: "hidden",
            zIndex: 1,
            // Cinematic color grade:
            // saturate(0.50)  — pulls neon cyan toward cool neutral gray
            // brightness(0.78) — slightly dims the background panels
            // The result: intelligence tool, not gaming HUD
            filter: "saturate(0.50) brightness(0.78)",
            boxShadow: "0 0 120px rgba(0,0,0,0.80), 0 0 40px rgba(0,200,255,0.06)",
          }}>
            <iframe
              src="/axonis-demo.html"
              title="AXONIS Platform — Live Demo"
              style={{
                width: "100%", height: "100%",
                border: "none", display: "block",
                pointerEvents: "none", // scroll controls the reveal, not mouse
              }}
              loading="eager"
            />
          </motion.div>

          {/* ── COLOR GRADING OVERLAY ─────────────────────────────────────
              Sits on top of iframe. Dark at start (nearly black), lifts as
              dashboard reveals. This is the "cinematic grade" layer.
              Gradient from center: center stays lit, edges pull to black.
          ──────────────────────────────────────────────────────────────── */}
          <motion.div style={{
            position: "absolute", inset: 0, zIndex: 2,
            opacity: gradeOpacity,
            background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.95) 100%)",
            pointerEvents: "none",
          }} />

          {/* Hard black edges — cinematic frame */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: `
              linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 10%, transparent 88%, rgba(0,0,0,0.92) 100%),
              linear-gradient(to right, rgba(0,0,0,0.50) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.50) 100%)
            `,
            pointerEvents: "none",
          }} />

          {/* ── CHAPTER 1 — Intro title ───────────────────────────────────── */}
          <motion.div style={{
            position: "absolute", zIndex: 5,
            left: "50%", top: "50%",
            x: "-50%", y: "-50%",
            textAlign: "center",
            opacity: ch1Opacity,
            width: "100%", padding: "0 24px",
          }}>
            <p style={{
              ...sfText,
              fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 20px 0",
            }}>Autobit — AXONIS Platform</p>
            <h2 style={{
              ...sf,
              fontSize: "clamp(44px, 8.5vw, 104px)", fontWeight: 700,
              letterSpacing: "-0.048em", lineHeight: 0.93,
              color: "#ffffff", margin: 0,
            }}>
              The AI safety OS<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>
                for critical infrastructure.
              </span>
            </h2>
          </motion.div>

          {/* ── CHAPTER 2 — Immersive centered text ───────────────────────── */}
          <motion.div style={{
            position: "absolute", zIndex: 6,
            left: "50%", top: "50%",
            x: "-50%", y: "-50%",
            textAlign: "center",
            opacity: ch2Opacity,
            y: ch2Y,
            pointerEvents: "none",
            width: "100%",
          }}>
            <p style={{
              ...sfText,
              fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.40)",
              margin: "0 0 18px 0",
              textShadow: "0 2px 24px rgba(0,0,0,0.90)",
            }}>Live monitoring</p>
            <h2 style={{
              ...sf,
              fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 700,
              letterSpacing: "-0.048em", lineHeight: 0.93,
              color: "#ffffff", margin: 0,
              textShadow: "0 4px 48px rgba(0,0,0,0.95)",
            }}>
              Every sensor.<br />
              <span style={{ color: "rgba(255,255,255,0.32)" }}>
                Every millisecond.
              </span>
            </h2>
          </motion.div>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <motion.div style={{
            position: "absolute", zIndex: 7,
            left: "50%", bottom: "7%",
            x: "-50%",
            opacity: ctaOpacity,
            y: ctaY,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "14px",
            textAlign: "center",
          }}>
            <p style={{
              ...sfText,
              fontSize: "13px", color: "rgba(255,255,255,0.40)",
              letterSpacing: "-0.01em", margin: 0,
              textShadow: "0 2px 24px rgba(0,0,0,0.90)",
            }}>
              Mining · Energy · Industrial AI
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <a
                href="/projects#axonis"
                style={{
                  ...sfText,
                  background: "#2997ff", color: "#ffffff",
                  padding: "13px 30px", borderRadius: "980px",
                  fontSize: "14px", fontWeight: 500,
                  textDecoration: "none", border: "none",
                  letterSpacing: "-0.01em",
                  transition: "background 0.18s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0077ed"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#2997ff"; }}
              >
                Learn more
              </a>
              <a
                href="/projects#axonis"
                style={{
                  ...sfText,
                  color: "rgba(255,255,255,0.55)", fontSize: "14px", fontWeight: 400,
                  letterSpacing: "-0.01em", textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
              >
                Request access →
              </a>
            </div>
          </motion.div>

          {/* ── Scroll indicator ──────────────────────────────────────────── */}
          <motion.div style={{
            position: "absolute", bottom: "28px", left: "50%",
            x: "-50%", zIndex: 5,
            opacity: scrollIndOpacity,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "7px",
          }}>
            <p style={{
              ...sfText,
              fontSize: "9px", color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.18em", textTransform: "uppercase", margin: 0,
            }}>Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.18)" }}
            />
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default AxonisPanel;
