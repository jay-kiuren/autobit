// ─────────────────────────────────────────────────────────────
// PANEL 04 — AI Agents + Automation
// Matches reference: Image 1 (agent chat) + Image 2 (workflow graph)
// Tab-switched: "AI Agents" ↔ "Automation"
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

// ── Fonts ──
const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfText    = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";

// ── Types ──
type Agent = { id: string; name: string; meta: string; active: boolean };
type Message = { side: "user" | "agent"; text: string };
type Node = {
  id: string; label: string; sub?: string;
  color: string; glow: string;
  x: number; y: number; w: number; h: number;
};
type Edge = { from: string; to: string; dashed?: boolean };

// ── Data ──
const AGENTS: Agent[] = [
  { id: "support", name: "Customer Support", meta: "24/7 · Instant",     active: true  },
  { id: "leads",   name: "Lead Qualification",meta: "Sales · Auto-route", active: false },
  { id: "ops",     name: "Internal Ops",      meta: "HR · Finance · IT",  active: false },
];

const CONVERSATIONS: Record<string, Message[]> = {
  support: [
    { side: "user",  text: "Hi, my order hasn't arrived yet" },
    { side: "agent", text: "Order #4821 is out for delivery today!" },
    { side: "agent", text: "Expected by 3pm. Track here →" },
    { side: "user",  text: "Thank you!" },
  ],
  leads: [
    { side: "user",  text: "We need automation for 50+ staff" },
    { side: "agent", text: "Perfect fit. Budget range?" },
    { side: "user",  text: "Around $5,000" },
    { side: "agent", text: "Booking you with our team now ✓" },
  ],
  ops: [
    { side: "user",  text: "Generate Q3 expense summary" },
    { side: "agent", text: "Pulling from Xero and Notion…" },
    { side: "agent", text: "47 transactions · $128,420 · CSV ready ✓" },
  ],
};

// ── Workflow nodes & edges (image 2) ──
const NODES: Node[] = [
  { id: "trigger", label: "Trigger",  sub: "webhook",   color: "#2997ff", glow: "rgba(41,151,255,0.20)", x: 40,  y: 120, w: 110, h: 52 },
  { id: "filter",  label: "Filter",   sub: "condition",  color: "#00e676", glow: "rgba(0,230,118,0.18)",  x: 220, y: 60,  w: 110, h: 52 },
  { id: "timer",   label: "Timer",    sub: "cron",       color: "#2997ff", glow: "rgba(41,151,255,0.16)", x: 220, y: 180, w: 110, h: 52 },
  { id: "process", label: "Process",  sub: "transform",  color: "#2997ff", glow: "rgba(41,151,255,0.20)", x: 400, y: 120, w: 110, h: 52 },
  { id: "notify",  label: "Notify",   sub: "slack / mail",color: "#00e676",glow: "rgba(0,230,118,0.18)",  x: 578, y: 60,  w: 120, h: 52 },
  { id: "store",   label: "Store",    sub: "database",   color: "#2997ff", glow: "rgba(41,151,255,0.16)", x: 578, y: 180, w: 110, h: 52 },
  { id: "done",    label: "Done ✓",   sub: "completed",  color: "#00e676", glow: "rgba(0,230,118,0.28)",  x: 756, y: 120, w: 100, h: 52 },
];

const EDGES: Edge[] = [
  { from: "trigger", to: "filter"  },
  { from: "trigger", to: "timer"   },
  { from: "filter",  to: "process" },
  { from: "timer",   to: "process" },
  { from: "process", to: "notify"  },
  { from: "process", to: "store"   },
  { from: "notify",  to: "done"    },
  { from: "store",   to: "done", dashed: true },
];

const STATS = [
  { label: "Runs / day",  value: "1,284" },
  { label: "Success",     value: "99.8%" },
  { label: "Time saved",  value: "48 hrs" },
];

const LOGS = [
  { ok: true,  text: "Slack alert sent" },
  { ok: true,  text: "DB row created"   },
  { ok: false, text: "Timer skipped"    },
];

// ── Helpers ──
function midX(n: Node) { return n.x + n.w / 2; }
function midY(n: Node) { return n.y + n.h / 2; }

function buildPath(a: Node, b: Node): string {
  const ax = a.x + a.w;
  const ay = midY(a);
  const bx = b.x;
  const by = midY(b);
  const cx = (ax + bx) / 2;
  return `M${ax},${ay} C${cx},${ay} ${cx},${by} ${bx},${by}`;
}

// ── Typing dots component ──
const TypingDots = () => (
  <div style={{ display:"flex", gap:5, padding:"10px 14px", alignItems:"center" }}>
    {[0,1,2].map(i => (
      <span key={i} style={{
        width:6, height:6, borderRadius:"50%",
        background:"rgba(255,255,255,0.28)",
        display:"block",
        animation:`p4typing 1.2s ${i*0.18}s ease-in-out infinite`,
      }} />
    ))}
  </div>
);

// ── Keyframes injected once ──
const CSS = `
@keyframes p4typing   { 0%,60%,100%{ opacity:.2; transform:scale(1) } 30%{ opacity:1; transform:scale(1.35) } }
@keyframes p4pulse    { 0%,100%{ box-shadow:0 0 6px #30d158 } 50%{ box-shadow:0 0 16px #30d158 } }
@keyframes p4dash     { to{ stroke-dashoffset:-20 } }
@keyframes p4nodeglow { 0%,100%{ opacity:.55 } 50%{ opacity:1 } }
@keyframes p4fadeup   { from{ opacity:0; transform:translateY(10px) } to{ opacity:1; transform:translateY(0) } }
@media(max-width:900px){
  .p4-inner{ flex-direction:column !important }
  .p4-left { width:100% !important }
  .p4-right{ width:100% !important }
  .p4-svg  { overflow-x:auto !important }
}
`;

// ══════════════════════════════
// PANEL COMPONENT
// ══════════════════════════════
const Panel04 = () => {
  const [tab,          setTab]          = useState<"agents"|"auto">("agents");
  const [activeAgent,  setActiveAgent]  = useState("support");
  const [messages,     setMessages]     = useState<Message[]>([]);
  const [showTyping,   setShowTyping]   = useState(false);
  const [avgMs,        setAvgMs]        = useState(0);
  const [activeNode,   setActiveNode]   = useState<string|null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Load conversation with stagger
  useEffect(() => {
    setMessages([]);
    setShowTyping(false);
    const msgs = CONVERSATIONS[activeAgent] ?? [];
    msgs.forEach((m, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, m]);
        if (i === msgs.length - 2) setShowTyping(true);
        if (i === msgs.length - 1) setShowTyping(false);
      }, i * 420 + 200);
    });
    // avg response counter
    let v = 0;
    const iv = setInterval(() => {
      v += Math.floor(Math.random() * 18 + 4);
      setAvgMs(v);
      if (v > 340) { clearInterval(iv); setAvgMs(0); }
    }, 80);
    return () => clearInterval(iv);
  }, [activeAgent]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, showTyping]);

  return (
    <section style={{
      position:"relative", zIndex:1,
      background:"#000",
      paddingTop:"100px", paddingBottom:"100px",
      borderBottom:"1px solid rgba(255,255,255,0.06)",
      overflow:"hidden",
    }}>
      <style>{CSS}</style>

      {/* Ambient radial */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,230,118,0.05) 0%, transparent 65%)",
      }}/>

      <div className="section-container" style={{ position:"relative", zIndex:1 }}>

        {/* ── Header ── */}
        <ScrollReveal>
          <p style={{
            fontFamily:sfText, fontSize:"10px",
            letterSpacing:"0.14em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.28)", margin:"0 0 16px",
          }}>
            AI Agents &amp; Automation
          </p>

          {/* Tab row */}
          <div style={{ display:"flex", gap:4, marginBottom:"56px" }}>
            {(["agents","auto"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding:"8px 20px", borderRadius:"980px",
                border:"1px solid",
                fontFamily:sfText, fontSize:"13px", fontWeight:600,
                cursor:"pointer",
                transition:"all 0.22s cubic-bezier(0.4,0,0.2,1)",
                borderColor: tab===t ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.08)",
                background:  tab===t ? "rgba(255,255,255,0.08)" : "transparent",
                color:       tab===t ? "#f5f5f7" : "rgba(255,255,255,0.35)",
              }}>
                {t === "agents" ? "AI Agents" : "Automation"}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ══════════════════════════
            TAB: AI AGENTS
        ══════════════════════════ */}
        <AnimatePresence mode="wait">
          {tab === "agents" && (
            <motion.div
              key="agents"
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              exit={{    opacity:0, y:-12 }}
              transition={{ duration:0.38, ease:[0.4,0,0.2,1] }}
            >
              <div className="p4-inner" style={{ display:"flex", gap:40, alignItems:"flex-start" }}>

                {/* Left — Headline + tag + agent list + CTA */}
                <div className="p4-left" style={{ width:"38%", paddingTop:8 }}>
                  <span style={{
                    display:"inline-block",
                    fontFamily:sfText, fontSize:"11px", fontWeight:600,
                    letterSpacing:"0.06em", textTransform:"uppercase",
                    color:"#00e676",
                    border:"1px solid rgba(0,230,118,0.35)",
                    borderRadius:"980px", padding:"4px 12px",
                    marginBottom:"24px",
                  }}>
                    AI Agents
                  </span>

                  <h2 style={{
                    fontFamily:sfDisplay,
                    fontSize:"clamp(36px,5vw,56px)",
                    fontWeight:700, letterSpacing:"-0.04em",
                    lineHeight:1.0, color:"#f5f5f7",
                    margin:"0 0 6px",
                  }}>
                    Custom AI.
                  </h2>
                  <h2 style={{
                    fontFamily:sfDisplay,
                    fontSize:"clamp(36px,5vw,56px)",
                    fontWeight:700, letterSpacing:"-0.04em",
                    lineHeight:1.0, color:"rgba(255,255,255,0.28)",
                    margin:"0 0 20px",
                  }}>
                    Works 24/7.
                  </h2>

                  <p style={{
                    fontFamily:sfText, fontSize:"15px",
                    color:"rgba(255,255,255,0.50)", lineHeight:1.65,
                    maxWidth:"340px", margin:"0 0 40px",
                  }}>
                    Purpose-built agents for customer support, lead qualification, and internal operations.
                    Trained on your data. Live in days.
                  </p>

                  {/* Agent list */}
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:40 }}>
                    {AGENTS.map(ag => (
                      <button
                        key={ag.id}
                        onClick={() => setActiveAgent(ag.id)}
                        style={{
                          padding:"16px 20px",
                          borderRadius:"14px",
                          border:"1px solid",
                          textAlign:"left",
                          cursor:"pointer",
                          transition:"all 0.22s cubic-bezier(0.4,0,0.2,1)",
                          display:"flex", alignItems:"center", justifyContent:"space-between",
                          background: activeAgent===ag.id
                            ? "rgba(0,230,118,0.05)"
                            : "transparent",
                          borderColor: activeAgent===ag.id
                            ? "#00e676"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <div>
                          <div style={{
                            fontFamily:sfText, fontSize:"14px", fontWeight:600,
                            color: activeAgent===ag.id ? "#00e676" : "#f5f5f7",
                            marginBottom:3,
                          }}>
                            {ag.name}
                          </div>
                          <div style={{
                            fontFamily:sfText, fontSize:"11px",
                            color: activeAgent===ag.id
                              ? "rgba(0,230,118,0.55)"
                              : "rgba(255,255,255,0.28)",
                            letterSpacing:"0.02em",
                          }}>
                            {ag.meta}
                          </div>
                        </div>
                        <span style={{
                          width:8, height:8, borderRadius:"50%",
                          flexShrink:0,
                          background: activeAgent===ag.id ? "#00e676" : "rgba(255,255,255,0.15)",
                          animation: activeAgent===ag.id ? "p4pulse 2s ease-in-out infinite" : "none",
                        }}/>
                      </button>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                    style={{
                      display:"inline-flex", alignItems:"center", gap:8,
                      padding:"14px 28px", borderRadius:"980px",
                      background:"#00e676", color:"#000",
                      fontFamily:sfText, fontSize:"15px", fontWeight:700,
                      border:"none", cursor:"pointer",
                      transition:"opacity 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity="0.88"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity="1";    (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)";    }}
                  >
                    Get a quote
                    <span style={{ fontSize:15 }}>→</span>
                  </button>
                </div>

                {/* Right — Chat window */}
                <div className="p4-right" style={{ width:"62%" }}>
                  <div style={{
                    background:"#0a0a0b",
                    border:"1px solid rgba(255,255,255,0.08)",
                    borderRadius:"20px",
                    overflow:"hidden",
                  }}>
                    {/* Chat header */}
                    <div style={{
                      display:"flex", alignItems:"center", gap:12,
                      padding:"18px 24px",
                      borderBottom:"1px solid rgba(255,255,255,0.06)",
                      background:"#0d0d0f",
                    }}>
                      <div style={{
                        width:36, height:36, borderRadius:"50%",
                        background:"rgba(0,230,118,0.15)",
                        border:"1px solid rgba(0,230,118,0.30)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:16,
                      }}>
                        🤖
                      </div>
                      <div>
                        <div style={{ fontFamily:sfText, fontSize:"14px", fontWeight:600, color:"#f5f5f7" }}>
                          Autobit Agent
                        </div>
                        <div style={{ fontFamily:sfText, fontSize:"11px", color:"rgba(255,255,255,0.35)", display:"flex", alignItems:"center", gap:5 }}>
                          <span style={{ width:6, height:6, borderRadius:"50%", background:"#00e676", display:"inline-block", animation:"p4pulse 2s infinite" }}/>
                          Online · 24/7 · Instant
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div
                      ref={chatRef}
                      style={{
                        padding:"24px",
                        minHeight:"320px", maxHeight:"360px",
                        overflowY:"auto",
                        display:"flex", flexDirection:"column", gap:10,
                        scrollbarWidth:"none",
                      }}
                    >
                      <AnimatePresence>
                        {messages.map((m, i) => (
                          <motion.div
                            key={`${activeAgent}-${i}`}
                            initial={{ opacity:0, y:8, scale:0.97 }}
                            animate={{ opacity:1, y:0, scale:1 }}
                            transition={{ duration:0.3, ease:[0.4,0,0.2,1] }}
                            style={{
                              display:"flex",
                              justifyContent: m.side==="user" ? "flex-start" : "flex-end",
                            }}
                          >
                            <div style={{
                              maxWidth:"70%",
                              padding:"12px 18px",
                              borderRadius: m.side==="user"
                                ? "18px 18px 18px 4px"
                                : "18px 18px 4px 18px",
                              background: m.side==="user"
                                ? "rgba(255,255,255,0.07)"
                                : "#00e676",
                              color: m.side==="user" ? "#f5f5f7" : "#000",
                              fontFamily:sfText,
                              fontSize:"14px", fontWeight: m.side==="agent" ? 600 : 400,
                              lineHeight:1.5,
                              border: m.side==="user" ? "1px solid rgba(255,255,255,0.08)" : "none",
                            }}>
                              {m.text}
                            </div>
                          </motion.div>
                        ))}
                        {showTyping && (
                          <motion.div
                            key="typing"
                            initial={{ opacity:0, y:8 }}
                            animate={{ opacity:1, y:0 }}
                            exit={{ opacity:0 }}
                            style={{ display:"flex", justifyContent:"flex-start" }}
                          >
                            <div style={{
                              background:"rgba(255,255,255,0.07)",
                              border:"1px solid rgba(255,255,255,0.08)",
                              borderRadius:"18px 18px 18px 4px",
                            }}>
                              <TypingDots />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Footer metric */}
                    <div style={{
                      padding:"14px 24px",
                      borderTop:"1px solid rgba(255,255,255,0.06)",
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                    }}>
                      <span style={{ fontFamily:sfText, fontSize:"12px", color:"rgba(255,255,255,0.28)" }}>
                        Avg. response
                      </span>
                      <span style={{ fontFamily:sfText, fontSize:"13px", fontWeight:600, color:"#00e676" }}>
                        {avgMs === 0 ? "0ms" : `${avgMs}ms`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════
              TAB: AUTOMATION
          ══════════════════════════ */}
          {tab === "auto" && (
            <motion.div
              key="auto"
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              exit={{    opacity:0, y:-12 }}
              transition={{ duration:0.38, ease:[0.4,0,0.2,1] }}
            >
              <div style={{ display:"flex", gap:32, alignItems:"flex-start" }}>

                {/* Left — log list */}
                <div style={{ width:"22%", paddingTop:8 }}>
                  <div style={{ fontFamily:sfText, fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:16 }}>
                    Quick · 4 running
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {/* skeleton rows */}
                    {[90,70,55].map((w,i) => (
                      <div key={i} style={{
                        height:28, borderRadius:8,
                        background:`rgba(255,255,255,0.05)`,
                        width:`${w}%`,
                        border:"1px solid rgba(255,255,255,0.06)",
                      }}/>
                    ))}
                  </div>

                  {/* Logs */}
                  <div style={{ marginTop:32, display:"flex", flexDirection:"column", gap:8 }}>
                    {LOGS.map((l,i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity:0, x:-8 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ delay: i*0.15 + 0.3 }}
                        style={{
                          display:"flex", alignItems:"center", gap:8,
                          padding:"8px 12px",
                          borderRadius:8,
                          background:"rgba(255,255,255,0.04)",
                          border:"1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span style={{ color: l.ok ? "#00e676" : "rgba(255,255,255,0.25)", fontSize:11 }}>
                          {l.ok ? "✓" : "–"}
                        </span>
                        <span style={{ fontFamily:sfText, fontSize:"12px", color:"rgba(255,255,255,0.50)" }}>
                          {l.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Center — SVG flow graph */}
                <div style={{ flex:1, overflow:"hidden" }}>
                  <svg
                    className="p4-svg"
                    viewBox="0 0 900 260"
                    style={{
                      width:"100%", height:"auto",
                      overflow:"visible",
                    }}
                  >
                    {/* Star field */}
                    {Array.from({length:48}).map((_,i) => (
                      <circle
                        key={i}
                        cx={Math.sin(i*137.5)*420+450}
                        cy={Math.cos(i*137.5)*120+130}
                        r={Math.random()*1+0.3}
                        fill="rgba(255,255,255,0.18)"
                      />
                    ))}

                    {/* Edges */}
                    {EDGES.map((e,i) => {
                      const a = NODES.find(n=>n.id===e.from)!;
                      const b = NODES.find(n=>n.id===e.to)!;
                      return (
                        <path
                          key={i}
                          d={buildPath(a,b)}
                          fill="none"
                          stroke={ e.dashed ? "rgba(41,151,255,0.20)" : "rgba(255,255,255,0.10)" }
                          strokeWidth={1.5}
                          strokeDasharray={ e.dashed ? "6 4" : undefined }
                          style={ e.dashed ? { animation:"p4dash 1.4s linear infinite" } : undefined }
                        />
                      );
                    })}

                    {/* Nodes */}
                    {NODES.map(n => (
                      <g
                        key={n.id}
                        style={{ cursor:"pointer" }}
                        onClick={() => setActiveNode(activeNode===n.id ? null : n.id)}
                      >
                        {/* glow */}
                        <rect
                          x={n.x-4} y={n.y-4}
                          width={n.w+8} height={n.h+8}
                          rx={14}
                          fill={n.glow}
                          style={{ animation:"p4nodeglow 2.5s ease-in-out infinite", animationDelay:`${NODES.indexOf(n)*0.3}s` }}
                        />
                        {/* card */}
                        <rect
                          x={n.x} y={n.y}
                          width={n.w} height={n.h}
                          rx={10}
                          fill={ activeNode===n.id ? "rgba(255,255,255,0.09)" : "#0d0f11" }
                          stroke={ activeNode===n.id ? n.color : "rgba(255,255,255,0.10)" }
                          strokeWidth={activeNode===n.id ? 1.5 : 1}
                        />
                        {/* dot */}
                        <circle cx={n.x+14} cy={n.y+16} r={4} fill={n.color}/>
                        {/* label */}
                        <text x={n.x+26} y={n.y+20}
                          fontFamily={sfText} fontSize="13" fontWeight="600"
                          fill="#f0f2f4">
                          {n.label}
                        </text>
                        {/* sub */}
                        {n.sub && (
                          <text x={n.x+14} y={n.y+38}
                            fontFamily={sfText} fontSize="10"
                            fill="rgba(255,255,255,0.30)">
                            {n.sub}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Stats bar */}
                  <div style={{
                    display:"flex", gap:48, marginTop:32,
                    padding:"24px 32px",
                    background:"#0a0a0b",
                    border:"1px solid rgba(255,255,255,0.07)",
                    borderRadius:14,
                  }}>
                    {STATS.map(s => (
                      <div key={s.label}>
                        <div style={{ fontFamily:sfText, fontSize:"11px", color:"rgba(255,255,255,0.35)", marginBottom:6, letterSpacing:"0.04em" }}>
                          {s.label}
                        </div>
                        <div style={{ fontFamily:sfDisplay, fontSize:"26px", fontWeight:700, letterSpacing:"-0.03em", color:"#f5f5f7" }}>
                          {s.value}
                        </div>
                      </div>
                    ))}

                    {/* Done badge */}
                    <div style={{ marginLeft:"auto", alignSelf:"center" }}>
                      <div style={{
                        padding:"8px 18px", borderRadius:8,
                        background:"rgba(0,230,118,0.10)",
                        border:"1px solid rgba(0,230,118,0.25)",
                        display:"flex", alignItems:"center", gap:7,
                      }}>
                        <span style={{ color:"#00e676", fontSize:13 }}>✓</span>
                        <span style={{ fontFamily:sfText, fontSize:"13px", fontWeight:600, color:"#00e676" }}>
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div style={{ marginTop:48, display:"flex", gap:12 }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                  style={{
                    padding:"12px 28px", borderRadius:"980px",
                    background:"#2997ff", color:"#fff",
                    fontFamily:sfText, fontSize:"15px", fontWeight:600,
                    border:"none", cursor:"pointer",
                    transition:"opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity="0.85"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity="1";    (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; }}
                >
                  Start a project
                </button>
                <a href="/services#automation" style={{
                  padding:"12px 28px", borderRadius:"980px",
                  color:"#2997ff", textDecoration:"none",
                  fontFamily:sfText, fontSize:"15px", fontWeight:600,
                }}>
                  Learn more →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Panel04;