import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── AXONIS TACTICAL MAP (pure CSS, no API) ───────────────────────────────────
// Faithful replica of the AXONIS UI chrome with animated tactical display
// Incidents pulse. Radar sweeps. Grid breathes. No real API exposure.
// ─────────────────────────────────────────────────────────────────────────────

const INCIDENTS = [
  { x: 38, y: 31, sev: 4, label: "Power Line Fault", engine: "GRIDSONAR" },
  { x: 61, y: 44, sev: 3, label: "Zone Intrusion", engine: "MINESAFE AI" },
  { x: 52, y: 58, sev: 5, label: "Worker Fall Detected", engine: "MINESAFE AI" },
  { x: 44, y: 71, sev: 2, label: "Proximity Alert", engine: "GRIDSONAR" },
  { x: 70, y: 36, sev: 3, label: "Vehicle Collision", engine: "MINESAFE AI" },
  { x: 29, y: 55, sev: 4, label: "Cable Fault", engine: "GRIDSONAR" },
];

const SEV_COLOR: Record<number, string> = {
  5: "#ff0030", 4: "#ff2244", 3: "#ff8800", 2: "#ffcc00",
};

const EVENTS = [
  { time: "5:04:54", sev: 4, title: "Power Line Fault", loc: "WORLD TRADE ST — GRIDSONAR" },
  { time: "5:04:26", sev: 3, title: "Worker Fall Detected", loc: "HENRY ST — MINESAFE" },
  { time: "5:03:51", sev: 3, title: "Vehicle Collision", loc: "WEST ST CORRIDOR — MINESAFE" },
  { time: "5:03:11", sev: 3, title: "Zone Intrusion", loc: "FULTON ST 4 — MINESAFE" },
  { time: "5:02:48", sev: 3, title: "Proximity Alert", loc: "CHURCH ST — MINESAFE" },
  { time: "5:01:59", sev: 4, title: "Cable Fault", loc: "LIBERTY ST — GRIDSONAR" },
];

const AxonisMockup = ({ immersive = false }: { immersive?: boolean }) => {
  const [tick, setTick] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((n) => n + 1);
      setSweepAngle((a) => (a + 2) % 360);
      setActiveIdx((i) => (i + 1) % INCIDENTS.length);
    }, 80);
    return () => clearInterval(t);
  }, []);

  const mono: React.CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    WebkitFontSmoothing: "antialiased",
  };

  const active = INCIDENTS[activeIdx];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000d1a",
      position: "relative", overflow: "hidden",
      ...mono,
    }}>
      {/* Animated scan line */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: `linear-gradient(to bottom, transparent ${(tick * 1.2) % 100}%, rgba(0,200,255,0.03) ${(tick * 1.2 + 2) % 100}%, transparent ${(tick * 1.2 + 4) % 100}%)`,
      }} />

      {/* ── TOPBAR ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "36px",
        background: "rgba(0,6,18,0.95)",
        borderBottom: "1px solid rgba(0,180,255,0.22)",
        display: "flex", alignItems: "center", padding: "0 12px", gap: "10px",
        zIndex: 10,
        ...mono,
      }}>
        <span style={{ fontSize: "13px", color: "#00c8ff", fontWeight: 700, letterSpacing: "3px" }}>AXONIS</span>
        <div style={{ width: "1px", height: "18px", background: "rgba(0,180,255,0.18)" }} />
        <span style={{ fontSize: "9px", color: "#4a8a9a", letterSpacing: "1px" }}>NEW YORK CITY — 3D TILE TEST</span>
        <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "2px", border: "1px solid #00ff88", color: "#00ff88", letterSpacing: "1px" }}>● LIVE</span>
        <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "2px", border: "1px solid rgba(0,180,255,0.28)", color: "#4a8a9a", letterSpacing: "1px" }}>GRIDSONAR</span>
        <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "2px", border: "1px solid rgba(0,180,255,0.28)", color: "#4a8a9a", letterSpacing: "1px" }}>MINESAFE AI</span>
        <span style={{
          fontSize: "9px", padding: "1px 6px", borderRadius: "2px",
          border: `1px solid ${activeIdx % 3 === 0 ? "#ff2244" : "rgba(0,180,255,0.28)"}`,
          color: activeIdx % 3 === 0 ? "#ff2244" : "#4a8a9a",
          letterSpacing: "1px",
          transition: "color 0.3s ease, border-color 0.3s ease",
        }}>
          {activeIdx % 3 === 0 ? "! HIGH RISK" : "NO ALERT"}
        </span>
        <span style={{ marginLeft: "auto", fontSize: "10px", color: "#4a8a9a" }}>5:04:{String(10 + (tick % 50)).padStart(2, "0")} PM</span>
      </div>

      {/* ── LEFT PANEL ── */}
      <div style={{
        position: "absolute", top: "36px", left: 0, width: "160px", bottom: "28px",
        background: "rgba(0,4,14,0.92)", borderRight: "1px solid rgba(0,180,255,0.12)",
        padding: "8px", zIndex: 5, overflow: "hidden",
        display: "flex", flexDirection: "column", gap: "5px",
        ...mono,
      }}>
        <div style={{ fontSize: "8px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "2px" }}>CITY OVERVIEW</div>

        {[
          { label: "ACTIVE CAMERAS", val: "8", col: "#00ff88" },
          { label: "GRID CELLS", val: "96", col: "#00c8ff" },
          { label: "ACTIVE INCIDENTS", val: String(1 + (activeIdx % 3)), col: "#ff2244" },
          { label: "LAST SEVERITY", val: `SEV ${active.sev}`, col: SEV_COLOR[active.sev] },
        ].map(({ label, val, col }) => (
          <div key={label} style={{ background: "rgba(0,180,255,0.03)", border: "1px solid rgba(0,180,255,0.10)", borderRadius: "3px", padding: "5px 7px" }}>
            <div style={{ fontSize: "8px", color: "#3a6a7a", letterSpacing: "0.5px", marginBottom: "2px" }}>{label}</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: col, lineHeight: 1, transition: "color 0.3s" }}>{val}</div>
          </div>
        ))}

        <div style={{ fontSize: "8px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "2px", marginTop: "2px" }}>LAYERS</div>
        {["GIS Grid", "CCTV Zones", "Incidents", "Hazard Zone", "Street Traces"].map((l, i) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "1px", background: ["rgba(0,180,255,0.3)", "rgba(0,255,136,0.3)", "rgba(255,34,68,0.3)", "rgba(255,0,48,0.3)", "rgba(0,180,255,0.5)"][i], border: `1px solid ${["#00c8ff","#00ff88","#ff2244","#ff0030","#00c8ff"][i]}`, flexShrink: 0 }} />
            <span style={{ fontSize: "9px", color: "#4a8a9a" }}>{l}</span>
          </div>
        ))}

        <div style={{ fontSize: "8px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "2px", marginTop: "2px" }}>LEGEND</div>
        {[[5,"#ff0030","Critical"],[4,"#ff2244","High Risk"],[3,"#ff8800","Caution"],[2,"#ffcc00","Advisory"]].map(([sev,col,lab]) => (
          <div key={String(sev)} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: String(col), flexShrink: 0 }} />
            <span style={{ fontSize: "9px", color: "#4a8a9a" }}>SEV {sev} — {String(lab)}</span>
          </div>
        ))}
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        position: "absolute", top: "36px", right: 0, width: "160px", bottom: "28px",
        background: "rgba(0,4,14,0.92)", borderLeft: "1px solid rgba(0,180,255,0.12)",
        padding: "8px", zIndex: 5,
        display: "flex", flexDirection: "column", gap: "5px",
        ...mono,
      }}>
        <div style={{ fontSize: "8px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "2px" }}>ACTIVE DETECTION</div>

        <div style={{ background: "rgba(0,0,0,0.40)", border: "1px solid rgba(0,180,255,0.16)", borderRadius: "3px", padding: "6px 7px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: SEV_COLOR[active.sev], marginBottom: "2px", transition: "color 0.3s" }}>{active.label}</div>
          <div style={{ fontSize: "8px", color: "#3a6a7a" }}>40.7{String(68 + (tick % 20)).slice(0,4)}°N  74.0{String(52 + (tick % 10)).slice(0,3)}°W</div>
          <div style={{ fontSize: "7px", color: "#2a4a5a", marginTop: "2px", wordBreak: "break-all" }}>SHA256: {Array.from({length:16},(_,i)=>"0123456789abcdef"[(tick+i*3)%16]).join("")}…</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
          {[
            ["GRID", `R${1+(activeIdx%4)}C${2+(activeIdx%3)}`, "13px"],
            ["ENGINE", active.engine, "8px"],
            ["CAM", `CAM-0${1+(activeIdx%8)}`, "12px"],
            ["SEV", `SEV ${active.sev}`, "13px"],
          ].map(([label, val, fs]) => (
            <div key={String(label)} style={{ background: "rgba(0,180,255,0.03)", border: "1px solid rgba(0,180,255,0.10)", borderRadius: "3px", padding: "4px 6px" }}>
              <div style={{ fontSize: "7px", color: "#3a6a7a", marginBottom: "1px" }}>{label}</div>
              <div style={{ fontSize: fs as string, fontWeight: 700, color: label === "SEV" ? SEV_COLOR[active.sev] : "#00c8ff", transition: "color 0.3s" }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: "8px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "2px" }}>EVENT LOG</div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "2px" }}>
          {EVENTS.slice(0, 5).map((e, i) => (
            <div key={i} style={{
              padding: "4px 5px",
              borderLeft: `2px solid ${SEV_COLOR[e.sev]}`,
              borderRadius: "0 2px 2px 0",
              background: i === 0 ? "rgba(0,180,255,0.04)" : "rgba(0,180,255,0.01)",
              opacity: i === 0 ? 1 : 0.65 - i * 0.08,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8px", marginBottom: "1px" }}>
                <span style={{ fontWeight: 700, color: SEV_COLOR[e.sev], fontSize: "9px" }}>{e.title}</span>
                <span style={{ color: "#3a5a6a" }}>{e.time}</span>
              </div>
              <div style={{ fontSize: "7px", color: "#3a6a7a" }}>{e.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAP CENTER (CSS tactical display) ── */}
      <div style={{
        position: "absolute", top: "36px", left: "160px", right: "160px", bottom: "28px",
        overflow: "hidden", background: "#000d1a",
      }}>
        {/* Grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00c8ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Radar sweep */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
          <defs>
            <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00c8ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform={`translate(50%, 50%) rotate(${sweepAngle})`} style={{ transformOrigin: "0 0" }}>
            <path d="M 0 0 L 300 -20 A 300 300 0 0 1 300 20 Z" fill="url(#sweep)" />
          </g>
          <circle cx="50%" cy="50%" r="80" fill="none" stroke="#00c8ff" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="50%" cy="50%" r="160" fill="none" stroke="#00c8ff" strokeWidth="0.5" strokeOpacity="0.2" />
          <circle cx="50%" cy="50%" r="240" fill="none" stroke="#00c8ff" strokeWidth="0.5" strokeOpacity="0.1" />
        </svg>

        {/* City silhouettes (abstract buildings) */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", opacity: 0.08 }}>
          {[10,18,12,25,15,30,22,14,28,20,16,24,11,27,19].map((h, i) => (
            <rect key={i} x={i * 6.5 + 1} y={`${100 - h * 2.2}%`} width="5" height={`${h * 2.2}%`} fill="#00c8ff" />
          ))}
        </svg>

        {/* Incident markers */}
        {INCIDENTS.map((inc, i) => {
          const isActive = i === activeIdx;
          const pulse = (tick + i * 15) % 60;
          return (
            <div key={i} style={{
              position: "absolute",
              left: `${inc.x}%`, top: `${inc.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}>
              {/* Pulse ring */}
              <div style={{
                position: "absolute",
                width: `${24 + pulse * 0.6}px`, height: `${24 + pulse * 0.6}px`,
                borderRadius: "50%",
                border: `1px solid ${SEV_COLOR[inc.sev]}`,
                opacity: Math.max(0, 1 - pulse / 60) * 0.6,
                transform: "translate(-50%, -50%)",
                top: "50%", left: "50%",
                transition: "none",
              }} />
              {/* Core dot */}
              <div style={{
                width: isActive ? "10px" : "6px",
                height: isActive ? "10px" : "6px",
                borderRadius: "50%",
                background: SEV_COLOR[inc.sev],
                boxShadow: `0 0 ${isActive ? 12 : 6}px ${SEV_COLOR[inc.sev]}`,
                transition: "all 0.3s ease",
              }} />
              {/* Label for active */}
              {isActive && (
                <div style={{
                  position: "absolute", left: "14px", top: "-4px",
                  background: "rgba(0,4,14,0.90)", border: `1px solid ${SEV_COLOR[inc.sev]}`,
                  borderRadius: "2px", padding: "2px 5px", whiteSpace: "nowrap",
                  fontSize: "8px", color: SEV_COLOR[inc.sev], fontFamily: "'Courier New', monospace",
                  zIndex: 10,
                }}>
                  SEV {inc.sev} — {inc.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Crosshair center */}
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: "30px", height: "30px", opacity: 0.3,
        }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "#00c8ff", transform: "translateX(-50%)" }} />
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "#00c8ff", transform: "translateY(-50%)" }} />
        </div>

        {/* Coordinates overlay */}
        <div style={{
          position: "absolute", bottom: "6px", left: "8px",
          fontSize: "8px", color: "#2a6a7a", fontFamily: "'Courier New', monospace",
          letterSpacing: "0.5px",
        }}>
          40.7128°N 74.0060°W
        </div>
        <div style={{
          position: "absolute", bottom: "6px", right: "8px",
          fontSize: "8px", color: "#2a6a7a", fontFamily: "'Courier New', monospace",
          letterSpacing: "0.5px",
        }}>
          MANHATTAN, NEW YORK
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28px",
        background: "rgba(0,6,18,0.95)", borderTop: "1px solid rgba(0,180,255,0.16)",
        display: "flex", alignItems: "center", padding: "0 12px", gap: "8px",
        zIndex: 10, ...mono,
      }}>
        {["MANHATTAN, NEW YORK", "40.7128°N  74.0060°W", "NEW YORK, USA"].map((t, i) => (
          <span key={i} style={{ fontSize: "9px", color: "#2a5a6a", display: "flex", gap: "8px", alignItems: "center" }}>
            {t}
            {i < 2 && <span style={{ color: "rgba(0,180,255,0.18)" }}>|</span>}
          </span>
        ))}
        <span style={{ fontSize: "9px", color: "#00ff88", marginLeft: "2px" }}>● ONLINE</span>
        <span style={{ marginLeft: "auto", fontSize: "9px", color: "#2a5a6a" }}>
          CAM: {(tick % 360).toFixed(1)}° | H: 600m
        </span>
      </div>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const AxonisSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Chapter opacities
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.32], [0, 1, 1, 0]);
  const ch2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.50, 0.58], [0, 1, 1, 0]);
  const ch3Opacity = useTransform(scrollYProgress, [0.54, 0.62, 0.76, 0.84], [0, 1, 1, 0]);
  const ch4Opacity = useTransform(scrollYProgress, [0.80, 0.88, 1.0], [0, 1, 1]);

  // Dashboard visual transforms
  const dashScale = useTransform(scrollYProgress, [0.20, 0.45, 0.58, 0.72], [0.72, 1, 1, 1]);
  const dashOpacity = useTransform(scrollYProgress, [0.18, 0.30, 0.58, 0.72], [0, 1, 1, 1]);
  const dashBorderRadius = useTransform(scrollYProgress, [0.54, 0.68], [12, 0]);
  const dashX = useTransform(scrollYProgress, [0.28, 0.50, 0.58, 0.72], ["8%", "8%", "0%", "0%"]);
  const dashWidth = useTransform(scrollYProgress, [0.28, 0.50, 0.58, 0.72], ["55%", "55%", "100%", "100%"]);
  const dashHeight = useTransform(scrollYProgress, [0.54, 0.68], ["65%", "100%"]);
  const dashTop = useTransform(scrollYProgress, [0.54, 0.68], ["17%", "0%"]);

  // Section background
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const sf: React.CSSProperties = {
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  return (
    <div ref={containerRef} style={{ height: "380vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Background */}
        <motion.div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,20,40,0.80) 0%, #000000 65%)",
          opacity: bgOpacity,
          zIndex: 0,
        }} />

        {/* ── CHAPTER 1 — Intro ── */}
        <motion.div style={{
          position: "absolute", zIndex: 5,
          left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          textAlign: "center", opacity: ch1Opacity,
          width: "100%", padding: "0 24px",
        }}>
          <p style={{
            ...sf, fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: "#00c8ff", margin: "0 0 20px 0",
          }}>Autobit — AXONIS Platform</p>
          <h2 style={{
            ...sf,
            fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 700,
            letterSpacing: "-0.045em", lineHeight: 0.95,
            color: "#ffffff", margin: 0,
          }}>
            The AI safety OS<br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>for critical infrastructure.</span>
          </h2>
        </motion.div>

        {/* ── DASHBOARD VISUAL (persists through ch2, ch3, ch4) ── */}
        <motion.div style={{
          position: "absolute",
          left: dashX, top: dashTop,
          width: dashWidth, height: dashHeight,
          opacity: dashOpacity, scale: dashScale,
          borderRadius: dashBorderRadius,
          overflow: "hidden",
          zIndex: 2,
          boxShadow: "0 0 80px rgba(0,200,255,0.10), 0 32px 80px rgba(0,0,0,0.60)",
          border: "1px solid rgba(0,200,255,0.12)",
        }}>
          <AxonisMockup />
        </motion.div>

        {/* ── CHAPTER 2 — Feature narrative (right side) ── */}
        <motion.div style={{
          position: "absolute", zIndex: 6,
          right: "5%", top: "50%", transform: "translateY(-50%)",
          width: "32%", opacity: ch2Opacity,
        }}>
          <p style={{
            ...sf, fontSize: "10px", fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#00c8ff", margin: "0 0 16px 0",
          }}>Open-core platform</p>
          <h3 style={{
            ...sf, fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 700,
            letterSpacing: "-0.035em", lineHeight: 1.05,
            color: "#ffffff", margin: "0 0 20px 0",
          }}>
            Edge inference.<br />
            Cryptographic proof.<br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>Privacy-first.</span>
          </h3>
          <p style={{
            ...sf, fontSize: "14px", fontWeight: 400,
            color: "rgba(255,255,255,0.45)", lineHeight: 1.65,
            letterSpacing: "-0.01em",
          }}>
            AXONIS runs at the edge — processing sensor data locally, generating cryptographic proofs, and escalating only what matters.
          </p>
        </motion.div>

        {/* ── CHAPTER 3 — Immersive overlay text (Apple Vision Pro style) ── */}
        <motion.div style={{
          position: "absolute", zIndex: 7,
          left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          textAlign: "center", opacity: ch3Opacity,
          pointerEvents: "none",
          width: "100%",
        }}>
          <p style={{
            ...sf, fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)", margin: "0 0 16px 0",
            textShadow: "0 2px 20px rgba(0,0,0,0.80)",
          }}>Live monitoring</p>
          <h2 style={{
            ...sf, fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 700,
            letterSpacing: "-0.045em", lineHeight: 0.95,
            color: "#ffffff", margin: 0,
            textShadow: "0 4px 40px rgba(0,0,0,0.90)",
          }}>
            Every sensor.<br />
            <span style={{ color: "rgba(255,255,255,0.40)" }}>Every millisecond.</span>
          </h2>
        </motion.div>

        {/* ── CHAPTER 4 — CTA ── */}
        <motion.div style={{
          position: "absolute", zIndex: 8,
          left: "50%", bottom: "8%", transform: "translateX(-50%)",
          textAlign: "center", opacity: ch4Opacity,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
        }}>
          <p style={{
            ...sf, fontSize: "13px", color: "rgba(255,255,255,0.45)",
            letterSpacing: "-0.01em", margin: 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.90)",
          }}>
            Mining · Energy · Industrial AI
          </p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <a href="/projects#axonis" style={{
              background: "#2997ff", color: "#ffffff",
              padding: "13px 30px", borderRadius: "980px",
              fontSize: "14px", fontWeight: 500,
              textDecoration: "none", border: "none", display: "inline-block",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased",
              transition: "background 0.18s ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0077ed"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#2997ff"; }}
            >
              Learn more
            </a>
            <a href="/projects#axonis" style={{
              color: "#00c8ff", fontSize: "14px", fontWeight: 400,
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em", textDecoration: "none",
              WebkitFontSmoothing: "antialiased",
              transition: "opacity 0.18s ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.65"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Request access →
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator — chapter 1 only */}
        <motion.div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          zIndex: 5, opacity: ch1Opacity,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}>
          <p style={{
            ...sf, fontSize: "10px", color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.14em", textTransform: "uppercase", margin: 0,
          }}>Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.20)" }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default AxonisSection;
