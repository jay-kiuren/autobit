import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const panels = [
  {
    type: "website",
    title: "Business Dashboard",
    category: "Web Platform",
    accent: "41,151,255",
    heroColor: "rgba(41,151,255,.22)",
    file: "Dashboard.tsx",
    file2: "analytics.ts",
  },
  {
    type: "website",
    title: "School System",
    category: "Web Platform",
    accent: "48,209,88",
    heroColor: "rgba(48,209,88,.22)",
    file: "Enrollment.tsx",
    file2: "grades.ts",
  },
  {
    type: "app",
    title: "AXONIS Mobile",
    category: "iOS · Android",
    accent: "41,151,255",
    cardColor: "rgba(41,151,255,.18)",
  },
  {
    type: "app",
    title: "Ops Manager",
    category: "iOS · Android",
    accent: "255,159,10",
    cardColor: "rgba(255,159,10,.18)",
  },
  {
    type: "app",
    title: "Client Portal",
    category: "iOS · Android",
    accent: "191,90,242",
    cardColor: "rgba(191,90,242,.18)",
  },
];

const WebScreen = ({ p }: { p: typeof panels[0] }) => (
  <div style={{ display: "flex", width: "100%", height: "100%", background: "#0d0d0f" }}>
    <div style={{
      width: "36px", borderRight: "1px solid rgba(255,255,255,.06)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "12px 0", gap: "8px",
    }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width: "18px", height: "18px", borderRadius: "4px", background: "rgba(255,255,255,.07)" }} />
      ))}
    </div>

    <div style={{ flex: 1, padding: "14px", fontFamily: "monospace", fontSize: "8px", lineHeight: 1.7, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
        <div style={{ padding: "3px 8px", borderRadius: "4px 4px 0 0", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)", fontSize: "8px" }}>{p.file}</div>
        <div style={{ padding: "3px 8px", color: "rgba(255,255,255,.28)", fontSize: "8px" }}>{p.file2}</div>
      </div>
      <div style={{ color: "#c792ea" }}>import <span style={{ color: "#82aaff" }}>React</span> from <span style={{ color: "#f78c6c" }}>'react'</span>;</div>
      <div style={{ color: "#c792ea" }}>export default function <span style={{ color: "#ffcb6b" }}>App</span>() {"{"}</div>
      <div style={{ color: "rgba(255,255,255,.25)", paddingLeft: "14px" }}>const [data, setData] = useState(null);</div>
      <div style={{ color: "#c792ea", paddingLeft: "14px" }}>return (</div>
      <div style={{ color: "#82aaff", paddingLeft: "28px" }}>&lt;div className="grid"&gt;</div>
      <div style={{ color: "#82aaff", paddingLeft: "40px" }}>&lt;Sidebar /&gt;</div>
      <div style={{ color: "#82aaff", paddingLeft: "40px" }}>&lt;MainView data={"{data}"} /&gt;</div>
      <div style={{ color: "#82aaff", paddingLeft: "28px" }}>&lt;/div&gt;</div>
      <div style={{ color: "#c792ea", paddingLeft: "14px" }}>);</div>
      <div style={{ color: "#c792ea" }}>{"}"}</div>
    </div>

    <div style={{ width: "38%", borderLeft: "1px solid rgba(255,255,255,.06)", background: "#111", padding: "8px" }}>
      <div style={{ background: "rgba(255,255,255,.06)", borderRadius: "5px 5px 0 0", height: "16px", display: "flex", alignItems: "center", padding: "0 6px", gap: "3px" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width: "5px", height: "5px", borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,.03)", borderRadius: "0 0 5px 5px", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ height: "36px", borderRadius: "4px", background: p.heroColor }} />
        <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.12)", width: "75%" }} />
        <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.08)", width: "50%" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginTop: "4px" }}>
          {[0,1,2,3].map(i => <div key={i} style={{ height: "22px", background: "rgba(255,255,255,.05)", borderRadius: "4px" }} />)}
        </div>
      </div>
    </div>
  </div>
);

const AppScreen = ({ p }: { p: typeof panels[0] }) => (
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "20px", gap: "12px", background: "#080808" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
      <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.25)" }}>AUTOBIT v2.0</div>
    </div>
    <div style={{
      flex: 1, borderRadius: "14px", padding: "16px",
      background: p.cardColor,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: .04,
        backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,.5) 0px,transparent 1px,transparent 3px)",
      }} />
      <div style={{
        width: "32px", height: "32px", borderRadius: "8px",
        background: "rgba(255,255,255,.18)", display: "flex",
        alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v6l4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.2" />
        </svg>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,.5)", marginBottom: "3px" }}>{p.category}</div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-.02em" }}>{p.title}</div>
      </div>
    </div>
  </div>
);

const AppSection = () => {
  const [active, setActive] = useState(0);
  const p = panels[active];

  return (
    <section style={{
      position: "relative", zIndex: 1,
      background: "#000",
      paddingTop: "100px", paddingBottom: "80px",
    }}>
      <div className="section-container">
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "64px", alignItems: "center" }}>

          {/* Left */}
          <div>
            <ScrollReveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.10)",
                borderRadius: "999px", padding: "6px 14px", marginBottom: "28px",
              }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2997ff" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.55)" }}>
                  App &amp; Website
                </span>
              </div>

              <h2 style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "clamp(32px,3.5vw,46px)", fontWeight: 700,
                letterSpacing: "-.04em", lineHeight: 1.05,
                color: "#f5f5f7", marginBottom: "16px",
              }}>
                Built for<br />
                <em style={{ color: "rgba(255,255,255,.28)", fontStyle: "italic" }}>the builders.</em>
              </h2>

              <p style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontSize: "15px", color: "rgba(255,255,255,.38)",
                lineHeight: 1.65, maxWidth: "300px", marginBottom: "36px",
              }}>
                Web platforms and mobile apps built to the same standard — fast, focused, and production-ready.
              </p>
            </ScrollReveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "36px" }}>
              {panels.map((item, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "8px 0",
                    transform: active === i ? "translateX(8px)" : "translateX(0)",
                    transition: "transform .3s ease",
                  }}
                >
                  <div style={{
                    height: "1px", background: "#fff",
                    width: active === i ? "36px" : "0px",
                    marginRight: active === i ? "14px" : "0px",
                    transition: "width .4s cubic-bezier(.25,.1,.25,1), margin .4s cubic-bezier(.25,.1,.25,1)",
                  }} />
                  <span style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    fontSize: "12px", fontWeight: 700,
                    letterSpacing: ".08em", textTransform: "uppercase" as const,
                    color: "#fff",
                    opacity: active === i ? 1 : 0.32,
                    transition: "opacity .25s",
                  }}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "#fff", color: "#000", border: "none",
                borderRadius: "999px", padding: "13px 26px",
                fontSize: "13px", fontWeight: 700, letterSpacing: ".04em", cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              EXPLORE THE LINEUP
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right — Viewport */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: "-60px", borderRadius: "50%",
              background: `rgba(${p.accent},.9)`,
              opacity: .15, filter: "blur(80px)",
              pointerEvents: "none", zIndex: 0,
              transition: "background .7s ease",
            }} />

            <div style={{
              borderRadius: "20px", border: "2px solid #1c1c1e",
              background: "#080808", overflow: "hidden",
              aspectRatio: "16/10", position: "relative", zIndex: 1,
            }}>
              <div style={{
                height: "28px", background: "rgba(20,20,20,.9)",
                display: "flex", alignItems: "center", padding: "0 12px", gap: "5px",
              }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
                ))}
              </div>

              <div style={{ position: "absolute", top: "28px", left: 0, right: 0, bottom: 0 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.01, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {p.type === "website" ? <WebScreen p={p} /> : <AppScreen p={p} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppSection;