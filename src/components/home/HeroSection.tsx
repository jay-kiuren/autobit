import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

// ─── Water Ripple Badge ───────────────────────────────────────────────────────
const WaterBadge = ({ href }: { href: string }) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufA = useRef<Float32Array | null>(null);
  const bufB = useRef<Float32Array | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const [hovered, setHovered] = useState(false);
  const W = useRef(0);
  const H = useRef(0);

  // Initialize buffers when canvas mounts / resizes
  const initBuffers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Use logical size for simulation (performance)
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    W.current = w;
    H.current = h;
    bufA.current = new Float32Array(w * h);
    bufB.current = new Float32Array(w * h);
  }, []);

  // Disturb water at (x, y) with given radius & strength
  const disturb = useCallback((x: number, y: number, radius = 6, strength = 180) => {
    const w = W.current, h = H.current;
    if (!bufA.current || w === 0) return;
    const ix = Math.round(x), iy = Math.round(y);
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = ix + dx, ny = iy + dy;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= radius) {
          bufA.current[ny * w + nx] += strength * (1 - dist / radius);
        }
      }
    }
  }, []);

  // Main simulation + render loop
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bufA.current || !bufB.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = W.current, h = H.current;
    const a = bufA.current, b = bufB.current;
    const dpr = window.devicePixelRatio || 1;

    // Continuous disturbance on mouse move
    if (mouseRef.current.active) {
      disturb(mouseRef.current.x, mouseRef.current.y, 5, 120);
    }

    // Wave propagation: average 4 neighbors, subtract previous, dampen
    const damping = 0.972;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        b[i] = (
          (a[i - 1] + a[i + 1] + a[i - w] + a[i + w]) / 2 - b[i]
        ) * damping;
      }
    }

    // Swap buffers
    bufA.current = b;
    bufB.current = a;

    // Render: clear, then draw displaced refraction
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const cur = bufA.current;

    // Draw water surface as soft light patches based on height gradients
    for (let y = 1; y < h - 1; y += 2) {
      for (let x = 1; x < w - 1; x += 2) {
        const i = y * w + x;
        const height = cur[i];
        if (Math.abs(height) < 0.5) continue;

        // Gradient = normal vector of water surface
        const dx = cur[i + 1] - cur[i - 1];
        const dy = cur[i + w] - cur[i - w];
        const light = Math.max(0, Math.min(1, (dx + dy) / 80 + 0.5));
        const alpha = Math.min(0.55, Math.abs(height) / 160);

        ctx.fillStyle = `rgba(255,255,255,${(light * alpha).toFixed(3)})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(tick);
  }, [disturb]);

  useEffect(() => {
    initBuffers();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initBuffers, tick]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
    setHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    // Big initial splash on enter
    const w = W.current, h = H.current;
    disturb(w / 2, h / 2, 12, 300);
  }, [disturb]);

  return (
    <a
      ref={containerRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "9999px",
        padding: "9px 22px",
        fontSize: "12px",
        letterSpacing: "0.05em",
        fontWeight: 500,
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.72)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "color 0.3s ease, transform 0.25s ease",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        marginBottom: "28px",
        overflow: "hidden",
        // Glass rim via layered inset shadows
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.12),
          inset 0 1px 0 rgba(255,255,255,0.22),
          inset 0 -1px 0 rgba(0,0,0,0.3),
          0 4px 24px rgba(0,0,0,0.25),
          0 0 20px rgba(255,255,255,0.06)
        `,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(255,255,255,0.07)",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* Water simulation canvas — absolute fill, pointer-events none so clicks pass through */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: 0.85,
        }}
      />

      {/* Top shimmer */}
      <span style={{
        position: "absolute", top: 0, left: "15%", right: "15%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Pulse dot */}
      <span style={{
        position: "relative", zIndex: 2,
        height: "6px", width: "6px",
        borderRadius: "50%",
        background: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
        display: "inline-block",
        boxShadow: hovered ? "0 0 8px rgba(255,255,255,0.8)" : "0 0 4px rgba(255,255,255,0.4)",
        animation: "badgePulse 2.5s ease-in-out infinite",
        flexShrink: 0,
        transition: "all 0.3s ease",
      }} />

      {/* Label */}
      <span style={{ position: "relative", zIndex: 2 }}>Start Something™</span>

      {/* Arrow */}
      <span style={{
        position: "relative", zIndex: 2,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0px)" : "translateX(-6px)",
        transition: "all 0.3s ease",
        fontSize: "11px",
      }}>→</span>
    </a>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
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

        <WaterBadge href="mailto:autobitofficial.ph@gmail.com" />

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
          50% { opacity: 0.3; transform: scale(0.75); }
        }
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

export default HeroSection;
