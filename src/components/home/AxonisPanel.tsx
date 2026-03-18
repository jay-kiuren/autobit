import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── THE APPLE VISION PRO TECHNIQUE ──────────────────────────────────────────
//
// Background (AXONIS UI) = STATIC. Full screen. Never moves. Never scales.
// It sits there dimmed + desaturated from frame one.
//
// Only the TEXT moves as you scroll.
// Three chapters of text fade in and out over the fixed background.
//
// COLOR GRADING:
// AXONIS cyan on navy is too saturated to live under white text.
// filter: saturate(0.10) brightness(0.45) → near-grayscale, very dim.
// This kills the color clash entirely. The UI reads as "dark texture", not HUD.
// Then a radial vignette darkens edges and centers the reading zone.
//
// TEXT READABILITY:
// text-shadow: 0 2px 48px rgba(0,0,0,1) — aggressive, full black.
// This is what Apple does. The shadow creates a readable halo
// around every letter regardless of what's behind it.
//
// SCROLL MAP (350vh total):
// 0.00–0.10  → Ch1 fades in
// 0.10–0.30  → Ch1 holds (100vh of comfortable reading)
// 0.30–0.38  → Ch1 fades out
// 0.42–0.52  → Ch2 fades in
// 0.52–0.68  → Ch2 holds (55vh reading)
// 0.68–0.76  → Ch2 fades out
// 0.80–0.88  → CTA fades in and holds
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
const mono: React.CSSProperties = {
  fontFamily: "'Courier New', Courier, monospace",
};

const SEV: Record<number, string> = { 5: "#ff0030", 4: "#ff2244", 3: "#ff8800", 2: "#ffcc00" };

const INCIDENTS = [
  { x: 38, y: 30, sev: 4, label: "Power Line Fault" },
  { x: 61, y: 43, sev: 3, label: "Zone Intrusion" },
  { x: 52, y: 57, sev: 5, label: "Worker Fall Detected" },
  { x: 44, y: 70, sev: 2, label: "Proximity Alert" },
  { x: 70, y: 35, sev: 3, label: "Vehicle Collision" },
  { x: 29, y: 54, sev: 4, label: "Cable Fault" },
];

const EVENTS = [
  { time: "5:04:54", sev: 4, title: "Power Line Fault", loc: "WORLD TRADE ST — GRIDSONAR" },
  { time: "5:04:26", sev: 5, title: "Worker Fall Detected", loc: "HENRY ST — MINESAFE" },
  { time: "5:03:51", sev: 3, title: "Vehicle Collision", loc: "WEST ST — MINESAFE" },
  { time: "5:03:11", sev: 3, title: "Zone Intrusion", loc: "FULTON ST — MINESAFE" },
  { time: "5:02:48", sev: 4, title: "Cable Fault", loc: "LIBERTY ST — GRIDSONAR" },
];

// ─── AXONIS CSS MOCKUP (static, full-screen texture) ─────────────────────────
const AxonisMockup = () => {
  const [tick, setTick] = useState(0);
  const [sweep, setSweep] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick(n => n + 1);
      setSweep(a => (a + 1.0) % 360);
      setActive(i => (i + 1) % INCIDENTS.length);
    }, 70);
    return () => clearInterval(t);
  }, []);

  const inc = INCIDENTS[active];

  return (
    <div style={{ width: "100%", height: "100%", background: "#000d1a", position: "relative", overflow: "hidden", ...mono }}>

      {/* Scan line */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: `linear-gradient(to bottom, transparent ${(tick * 0.7) % 100}%, rgba(0,200,255,0.018) ${(tick * 0.7 + 1.2) % 100}%, transparent ${(tick * 0.7 + 2.5) % 100}%)`,
      }} />

      {/* TOPBAR */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "36px",
        background: "rgba(0,6,18,0.96)", borderBottom: "1px solid rgba(0,180,255,0.22)",
        display: "flex", alignItems: "center", padding: "0 14px", gap: "10px", zIndex: 10,
      }}>
        <span style={{ fontSize: "13px", color: "#00c8ff", fontWeight: 700, letterSpacing: "3px" }}>AXONIS</span>
        <div style={{ width: 1, height: 18, background: "rgba(0,180,255,0.2)" }} />
        <span style={{ fontSize: "9px", color: "#4a8a9a", letterSpacing: "0.8px" }}>NEW YORK CITY — 3D TILE TEST</span>
        <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "2px", border: "1px solid #00ff88", color: "#00ff88" }}>● LIVE</span>
        <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "2px", border: "1px solid rgba(0,180,255,0.25)", color: "#4a8a9a" }}>GRIDSONAR</span>
        <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "2px", border: "1px solid rgba(0,180,255,0.25)", color: "#4a8a9a" }}>MINESAFE AI</span>
        <span style={{
          fontSize: "8px", padding: "1px 6px", borderRadius: "2px",
          border: `1px solid ${active % 4 === 0 ? "#ff2244" : "rgba(0,180,255,0.25)"}`,
          color: active % 4 === 0 ? "#ff2244" : "#4a8a9a",
          transition: "all 0.5s ease",
        }}>{active % 4 === 0 ? "! HIGH RISK" : "NO ALERT"}</span>
        <span style={{ marginLeft: "auto", fontSize: "9px", color: "#4a8a9a" }}>
          5:04:{String(10 + (tick % 50)).padStart(2, "0")} PM
        </span>
      </div>

      {/* LEFT PANEL */}
      <div style={{
        position: "absolute", top: "36px", left: 0, width: "160px", bottom: "28px",
        background: "rgba(0,4,14,0.92)", borderRight: "1px solid rgba(0,180,255,0.11)",
        padding: "8px", zIndex: 5, display: "flex", flexDirection: "column", gap: "4px",
      }}>
        <div style={{ fontSize: "7px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "3px" }}>CITY OVERVIEW</div>
        {[
          ["ACTIVE CAMERAS", "8", "#00ff88"],
          ["GRID CELLS", "96", "#00c8ff"],
          ["ACTIVE INCIDENTS", String(1 + (active % 3)), "#ff2244"],
          ["LAST SEVERITY", `SEV ${inc.sev}`, SEV[inc.sev]],
        ].map(([l, v, c]) => (
          <div key={String(l)} style={{ background: "rgba(0,180,255,0.03)", border: "1px solid rgba(0,180,255,0.09)", borderRadius: "3px", padding: "5px 7px" }}>
            <div style={{ fontSize: "7px", color: "#3a6a7a", marginBottom: "2px" }}>{l}</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: String(c), lineHeight: 1, transition: "color 0.3s" }}>{v}</div>
          </div>
        ))}
        <div style={{ fontSize: "7px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "3px", marginTop: "3px" }}>LAYERS</div>
        {[["GIS Grid","#00c8ff"],["CCTV Zones","#00ff88"],["Incidents","#ff2244"],["Hazard Zone","#ff0030"],["Street Traces","#00c8ff"]].map(([l,c]) => (
          <div key={String(l)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "1px", background: String(c)+"40", border: `1px solid ${c}`, flexShrink: 0 }} />
            <span style={{ fontSize: "9px", color: "#4a8a9a" }}>{l}</span>
          </div>
        ))}
        <div style={{ fontSize: "7px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "3px", marginTop: "3px" }}>LEGEND</div>
        {[[5,"#ff0030","Critical"],[4,"#ff2244","High Risk"],[3,"#ff8800","Caution"],[2,"#ffcc00","Advisory"]].map(([s,c,l]) => (
          <div key={String(s)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: String(c), flexShrink: 0 }} />
            <span style={{ fontSize: "9px", color: "#4a8a9a" }}>SEV {s} — {String(l)}</span>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        position: "absolute", top: "36px", right: 0, width: "160px", bottom: "28px",
        background: "rgba(0,4,14,0.92)", borderLeft: "1px solid rgba(0,180,255,0.11)",
        padding: "8px", zIndex: 5, display: "flex", flexDirection: "column", gap: "4px",
      }}>
        <div style={{ fontSize: "7px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "3px" }}>ACTIVE DETECTION</div>
        <div style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(0,180,255,0.16)", borderRadius: "3px", padding: "6px 7px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: SEV[inc.sev], marginBottom: "2px", transition: "color 0.3s" }}>{inc.label}</div>
          <div style={{ fontSize: "7px", color: "#3a6a7a" }}>40.7{String(68 + (tick % 20)).slice(0, 4)}°N  74.0{String(52 + (tick % 10)).slice(0, 3)}°W</div>
          <div style={{ fontSize: "6px", color: "#2a4a5a", marginTop: "2px", wordBreak: "break-all" }}>SHA256: {Array.from({ length: 14 }, (_, i) => "0123456789abcdef"[(tick + i * 3) % 16]).join("")}…</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
          {[["GRID",`R${1+(active%4)}C${2+(active%3)}`],["ENGINE",inc.label.includes("Line")||inc.label.includes("Cable")?"GRIDSONAR":"MINESAFE"],["CAM",`CAM-0${1+(active%8)}`],["SEV",`SEV ${inc.sev}`]].map(([lbl,val]) => (
            <div key={String(lbl)} style={{ background: "rgba(0,180,255,0.03)", border: "1px solid rgba(0,180,255,0.09)", borderRadius: "3px", padding: "4px 6px" }}>
              <div style={{ fontSize: "6px", color: "#3a6a7a", marginBottom: "1px" }}>{lbl}</div>
              <div style={{ fontSize: lbl==="ENGINE"?"7px":"12px", fontWeight: 700, color: lbl==="SEV"?SEV[inc.sev]:"#00c8ff", lineHeight: 1, transition: "color 0.3s" }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "7px", color: "#2a5a6a", letterSpacing: "2px", borderBottom: "1px solid rgba(0,180,255,0.08)", paddingBottom: "3px" }}>EVENT LOG</div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "2px" }}>
          {EVENTS.map((e, i) => (
            <div key={i} style={{
              padding: "3px 5px", borderLeft: `2px solid ${SEV[e.sev]}`,
              borderRadius: "0 2px 2px 0", background: i===0?"rgba(0,180,255,0.04)":"transparent",
              opacity: Math.max(0.12, 1 - i * 0.20),
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                <span style={{ fontSize: "8px", fontWeight: 700, color: SEV[e.sev] }}>{e.title}</span>
                <span style={{ fontSize: "7px", color: "#3a5a6a" }}>{e.time}</span>
              </div>
              <div style={{ fontSize: "6px", color: "#3a6a7a" }}>{e.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP CENTER */}
      <div style={{ position: "absolute", top: "36px", left: "160px", right: "160px", bottom: "28px", overflow: "hidden", background: "#000d1a" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
          <defs><pattern id="g2" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M 36 0 L 0 0 0 36" fill="none" stroke="#00c8ff" strokeWidth="0.4" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g2)" />
        </svg>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.09 }}>
          <defs>
            <radialGradient id="sw2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00c8ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g style={{ transformOrigin: "50% 50%", transform: `rotate(${sweep}deg)` }}>
            <path d="M 384 300 L 784 270 A 400 400 0 0 1 784 330 Z" fill="url(#sw2)" />
          </g>
          <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#00c8ff" strokeWidth="0.4" strokeOpacity="0.3" />
          <circle cx="50%" cy="50%" r="38%" fill="none" stroke="#00c8ff" strokeWidth="0.4" strokeOpacity="0.18" />
        </svg>
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", opacity: 0.07 }}>
          {[10,16,11,22,14,28,20,13,26,18,15,23,10,25,17].map((h, i) => (
            <rect key={i} x={i * 6.8 + 1} y={`${100 - h * 2.5}%`} width="5.5" height={`${h * 2.5}%`} fill="#00c8ff" />
          ))}
        </svg>
        {INCIDENTS.map((inc2, i) => {
          const isActive = i === active;
          const pulse = (tick + i * 18) % 70;
          return (
            <div key={i} style={{ position: "absolute", left: `${inc2.x}%`, top: `${inc2.y}%`, transform: "translate(-50%, -50%)", zIndex: 3 }}>
              <div style={{
                position: "absolute", width: `${18 + pulse * 0.45}px`, height: `${18 + pulse * 0.45}px`,
                borderRadius: "50%", border: `1px solid ${SEV[inc2.sev]}`,
                opacity: Math.max(0, 1 - pulse / 70) * 0.55,
                transform: "translate(-50%, -50%)", top: "50%", left: "50%",
              }} />
              <div style={{
                width: isActive ? "9px" : "5px", height: isActive ? "9px" : "5px",
                borderRadius: "50%", background: SEV[inc2.sev],
                boxShadow: `0 0 ${isActive ? 10 : 4}px ${SEV[inc2.sev]}`,
                transition: "all 0.4s ease",
              }} />
              {isActive && (
                <div style={{
                  position: "absolute", left: "12px", top: "-3px",
                  background: "rgba(0,4,14,0.94)", border: `1px solid ${SEV[inc2.sev]}`,
                  borderRadius: "2px", padding: "2px 5px", whiteSpace: "nowrap",
                  fontSize: "7px", color: SEV[inc2.sev], ...mono, zIndex: 10,
                }}>SEV {inc2.sev} — {inc2.label}</div>
              )}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "22px", height: "22px", opacity: 0.22 }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "#00c8ff", transform: "translateX(-50%)" }} />
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "#00c8ff", transform: "translateY(-50%)" }} />
        </div>
        <div style={{ position: "absolute", bottom: "5px", left: "8px", fontSize: "7px", color: "#2a6a7a", ...mono }}>40.7128°N 74.0060°W</div>
        <div style={{ position: "absolute", bottom: "5px", right: "8px", fontSize: "7px", color: "#2a6a7a", ...mono }}>MANHATTAN, NEW YORK</div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28px",
        background: "rgba(0,6,18,0.96)", borderTop: "1px solid rgba(0,180,255,0.14)",
        display: "flex", alignItems: "center", padding: "0 12px", gap: "8px", zIndex: 10,
      }}>
        {["MANHATTAN, NEW YORK","40.7128°N 74.0060°W","NEW YORK, USA"].map((t,i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span style={{ fontSize: "8px", color: "#2a5a6a" }}>{t}</span>
            {i<2 && <span style={{ color: "rgba(0,180,255,0.15)", fontSize:"8px" }}>|</span>}
          </span>
        ))}
        <span style={{ fontSize: "8px", color: "#00ff88" }}>● ONLINE</span>
        <span style={{ marginLeft: "auto", fontSize: "8px", color: "#2a5a6a" }}>CAM: {(tick%360).toFixed(1)}° | H: 600m</span>
      </div>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const AxonisPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Text chapters only — background is static ──────────────────────────────

  // Ch1: Intro title
  const ch1Opacity = useTransform(scrollYProgress,
    [0.00, 0.06, 0.16, 0.32],
    [0,    1,    1,    0   ]
  );
  const ch1Y = useTransform(scrollYProgress, [0.00, 0.08], [28, 0]);

  // Ch2: "Every sensor" — full screen immersive
  const ch2Opacity = useTransform(scrollYProgress,
    [0.38, 0.46, 0.60, 0.72],
    [0,    1,    1,    0   ]
  );
  const ch2Y = useTransform(scrollYProgress, [0.38, 0.48], [28, 0]);

  // CTA
  const ctaOpacity = useTransform(scrollYProgress,
    [0.78, 0.86, 1.00],
    [0,    1,    1   ]
  );
  const ctaY = useTransform(scrollYProgress, [0.78, 0.88], [20, 0]);

  // Scroll hint
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.14], [0, 1, 0]);

  return (
    <div ref={containerRef} style={{ height: "350vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000000" }}>

        {/* ── AXONIS UI — STATIC, FULL SCREEN, ALWAYS PRESENT ──────────────
            filter: saturate(0.10) → nearly grayscale, kills cyan clash
            brightness(0.44) → dim but still reads as a real interface
            This is the "texture" layer, not the "content" layer.
        ─────────────────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          filter: "saturate(0.10) brightness(0.44)",
        }}>
          <AxonisMockup />
        </div>

        {/* ── PRIMARY OVERLAY — always on, pulls background to near-black ──
            Radial: center is lighter so text zone is readable.
            Edges are near-solid black — cinematic.
        ─────────────────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.80) 55%, rgba(0,0,0,0.97) 100%)",
        }} />

        {/* Hard top+bottom bars */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, transparent 10%, transparent 88%, rgba(0,0,0,0.95) 100%)",
        }} />

        {/* ── CHAPTER 1 — Intro ────────────────────────────────────────────── */}
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
            // Aggressive text-shadow — what Apple uses for readability over complex backgrounds
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

        {/* ── CHAPTER 2 — "Every sensor" ────────────────────────────────────── */}
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

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
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

        {/* ── Scroll hint ──────────────────────────────────────────────────── */}
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
