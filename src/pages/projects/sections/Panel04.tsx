import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useContactModal } from "@/contexts/ContactModalContext";

/**
 * Panel04: AI & Automation Systems
 * FEATURE ADDED: Responsive Screen Adopter (Mobile/Laptop compatibility)
 * This ensures alignment and scaling across all device sizes.
 */

// --- Constants & Data ---

const sfDisplay = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif';
const sfText = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const AGENTS = [
  { id: "support", name: "Customer Support", meta: "Resolves 84% of tickets", icon: "💬" },
  { id: "sales", name: "Sales Outreach", meta: "Personalized B2B flows", icon: "📈" },
  { id: "operations", name: "Ops Coordinator", meta: "Syncs inventory & logs", icon: "⚙️" },
];

const CONVERSATIONS: Record<string, any[]> = {
  support: [
    { role: "user", text: "How do I track my delivery?" },
    { role: "bot", text: "I can help with that! What's your order ID?" },
    { role: "user", text: "It's #AB-9042." },
    { role: "bot", text: "Checking... It's out for delivery and will arrive by 4 PM." },
  ],
  sales: [
    { role: "user", text: "Interested in the enterprise plan." },
    { role: "bot", text: "Great! Our enterprise plan includes 24/7 dedicated support." },
    { role: "user", text: "Can we hop on a call?" },
    { role: "bot", text: "I've sent a calendar link to your email. Pick a time!" },
  ],
  operations: [
    { role: "user", text: "Is the warehouse sync active?" },
    { role: "bot", text: "Yes, synced 2 minutes ago. All stocks are up to date." },
    { role: "user", text: "Any anomalies detected?" },
    { role: "bot", text: "None. Logistics flowing at 98% efficiency." },
  ],
};

const LOGS = [
  { time: "12:04:11", msg: "API: Database Synced", status: "success" },
  { time: "12:04:15", msg: "Webflow: Entry Created", status: "success" },
  { time: "12:05:02", msg: "Stripe: Payment Verified", status: "success" },
  { time: "12:05:08", msg: "Mailgun: Receipt Sent", status: "success" },
];

const NODES = [
  { id: "1", label: "Trigger", sub: "New Sale", x: 80, y: 130, color: "#00e676" },
  { id: "2", label: "Logic", sub: "Filter Lead", x: 300, y: 130, color: "#2979ff" },
  { id: "3", label: "Action", sub: "CRM Update", x: 520, y: 60, color: "#ff9100" },
  { id: "4", label: "Action", sub: "Slack Notify", x: 520, y: 200, color: "#d500f9" },
  { id: "5", label: "Finish", sub: "Success", x: 740, y: 130, color: "#00e676" },
];

const EDGES = [
  { from: "1", to: "2", d: "M 160 130 L 220 130" },
  { from: "2", to: "3", d: "M 380 110 Q 420 60 440 60" },
  { from: "2", to: "4", d: "M 380 150 Q 420 200 440 200" },
  { from: "3", to: "5", d: "M 600 60 Q 660 60 680 110" },
  { from: "4", to: "5", d: "M 600 200 Q 660 200 680 150" },
];

const STATS = [
  { label: "TASKS DONE", value: "1,284", duration: "1.2s" },
  { label: "ACCURACY", value: "99.8%", duration: "1.0s" },
  { label: "TIME SAVED", value: "48 hrs", duration: "0.9s" },
];

// --- Styles ---

const CSS = `
  @keyframes p4nodeenter {
    from { opacity: 0; transform: translateY(8px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes p4edgedraw {
    from { stroke-dashoffset: var(--path-len, 400); }
    to { stroke-dashoffset: 0; }
  }
  @keyframes p4countup {
    from { opacity: 0.3; }
    to { opacity: 1; }
  }
  @keyframes p4slideup {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .p4-hide-scrollbar::-webkit-scrollbar { display: none; }

  /* Responsive Screen Adopter Classes */
  .p4-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  @media (min-width: 1024px) {
    .p4-container {
      flex-direction: row;
      gap: 60px;
    }
    .p4-left-col { flex: 0 0 38% !important; }
    .p4-right-col { flex: 0 0 62% !important; }
  }
  @media (max-width: 768px) {
    .p4-title { font-size: 32px !important; }
    .p4-stats-bar { flex-direction: column !important; gap: 20px !important; align-items: flex-start !important; }
    .p4-agent-list { width: 100% !important; }
  }
`;

// --- Components ---

const CountUp = ({ value, duration }: { value: string; duration: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const numeric = parseFloat(value.replace(/,/g, ""));
  const suffix = value.replace(/[0-9.,]/g, "");

  useEffect(() => {
    let start = 0;
    const end = numeric;
    const totalMs = parseFloat(duration) * 1000;
    const increment = end / (totalMs / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start).toLocaleString() + suffix);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration, numeric, suffix]);

  return <span style={{ animation: `p4countup ${duration} ease-out forwards` }}>{displayValue}</span>;
};

export default function Panel04() {
  const { openModal } = useContactModal();
  const [activeTab, setActiveTab] = useState<"agents" | "automation">("agents");
  const [activeAgent, setActiveAgent] = useState("support");
  const [messages, setMessages] = useState<any[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [avgMs, setAvgMs] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  // 1. Scroll Reset Logic
  useEffect(() => {
    if (!isInView) {
      setActiveTab("agents");
      setActiveAgent("support");
      setMessages([]);
      setShowTyping(false);
      setAvgMs(0);
      setActiveNode(null);
    }
  }, [isInView]);

  // Chat sequence logic
  useEffect(() => {
    if (!isInView || activeTab !== "agents") return;
    
    let isMounted = true;
    const sequence = async () => {
      setMessages([]);
      setAvgMs(0);
      const chat = CONVERSATIONS[activeAgent];
      await new Promise(r => setTimeout(r, 500));

      for (let i = 0; i < chat.length; i++) {
        if (!isMounted) return;
        if (chat[i].role === "bot") {
          setShowTyping(true);
          await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
          setShowTyping(false);
        }
        setMessages((prev) => [...prev, chat[i]]);
        if (i === chat.length - 1) setAvgMs(420);
        await new Promise((r) => setTimeout(r, 1200));
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, [activeAgent, activeTab, isInView]);

  // Node highlight sequence
  useEffect(() => {
    if (activeTab !== "automation" || !isInView) return;
    let idx = 0;
    const timer = setInterval(() => {
      setActiveNode(NODES[idx % NODES.length].id);
      idx++;
    }, 1500);
    return () => clearInterval(timer);
  }, [activeTab, isInView]);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#050505",
        padding: "60px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{CSS}</style>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        {/* --- Header --- */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.05 }}
            style={{
              fontFamily: sfText,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#00e676",
              marginBottom: "20px",
            }}
          >
            SCALABLE WORKFLOWS
          </motion.div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {["agents", "automation"].map((t, i) => (
              <motion.button
                key={t}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => setActiveTab(t as any)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: sfText,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "none",
                  outline: "none",
                  background: activeTab === t ? "#1a1a1a" : "transparent",
                  color: activeTab === t ? "#fff" : "#6e6e73",
                  boxShadow: activeTab === t ? "0 0 0 1px rgba(255,255,255,0.14)" : "none",
                }}
              >
                {t === "agents" ? "AI Agents" : "Automation"}
              </motion.button>
            ))}
          </div>
        </div>

        {/* --- Tab Content --- */}
        <AnimatePresence mode="wait">
          {activeTab === "agents" ? (
            <motion.div
              key="agents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p4-container"
            >
              {/* Left Column */}
              <motion.div 
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p4-left-col"
                style={{ paddingTop: 0 }}
              >
                <motion.div
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25 }}
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: "#0d1a12",
                    color: "#00e676",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    marginBottom: "24px",
                  }}
                >
                  AI AGENTS
                </motion.div>

                <h2 className="p4-title" style={{ fontFamily: sfDisplay, fontSize: "48px", fontWeight: 600, lineHeight: 1.1, margin: 0, marginBottom: "24px" }}>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ color: "#f5f5f7", display: "block" }}>Custom AI.</motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} style={{ color: "#3d3d3d", display: "block" }}>Works 24/7.</motion.span>
                </h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  style={{ fontFamily: sfText, fontSize: "17px", lineHeight: "1.6", color: "#6e6e73", marginBottom: "36px" }}
                >
                  Automate complex customer interactions and internal operations with 
                  agents that learn your business logic.
                </motion.p>

                <div className="p4-agent-list" style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "36px" }}>
                  {AGENTS.map((agent, i) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setActiveAgent(agent.id)}
                      style={{
                        padding: "14px 18px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        transition: "all 0.2s ease",
                        background: activeAgent === agent.id ? "#0d1a12" : "#0e0e10",
                        boxShadow: activeAgent === agent.id 
                          ? "0 0 0 1.5px #00e676, 0 4px 20px rgba(0,230,118,0.12)" 
                          : "0 1px 3px rgba(0,0,0,0.4)",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{agent.icon}</span>
                      <div>
                        <div style={{ color: "#f5f5f7", fontSize: "15px", fontWeight: 600, fontFamily: sfText }}>{agent.name}</div>
                        <div style={{ color: "#48484a", fontSize: "13px", fontFamily: sfText }}>{agent.meta}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}
                >
                  <button 
                    type="button"
                    onClick={openModal}
                    style={{ 
                      padding: "14px 28px", 
                      borderRadius: "100px", 
                      background: "#fff", 
                      color: "#000", 
                      border: "none", 
                      fontSize: "15px", 
                      fontWeight: 600, 
                      fontFamily: sfText, 
                      cursor: "pointer",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    Start a project
                  </button>
                  <Link
                    to="/services"
                    style={{ 
                      color: "#6e6e73", 
                      fontSize: "15px", 
                      fontFamily: sfText, 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f7")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6e6e73")}
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column: Chat Window */}
              <motion.div
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.6 }}
                className="p4-right-col"
                style={{
                  background: "#0a0a0b",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "480px",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.6)",
                  overflow: "hidden",
                }}
              >
                {/* Chat Header */}
                <motion.div
                  initial={{ y: -8 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 }}
                  style={{
                    padding: "16px 20px",
                    background: "#0d0d0f",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div style={{ 
                    width: "36px", height: "36px", borderRadius: "50%", 
                    background: "rgba(0,230,118,0.12)", display: "flex", 
                    alignItems: "center", justifyContent: "center" 
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="12" cy="8" r="4"/>
                      <rect x="4" y="14" width="16" height="7" rx="3"/>
                      <line x1="12" y1="4" x2="12" y2="2"/>
                      <circle cx="12" cy="2" r="1" fill="#00e676"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontSize: "14px", fontWeight: 600, fontFamily: sfText }}>
                      {AGENTS.find((a) => a.id === activeAgent)?.name}
                    </div>
                    <div style={{ color: "#00e676", fontSize: "11px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e676" }} />
                      ACTIVE NOW
                    </div>
                  </div>
                </motion.div>

                {/* Chat Messages */}
                <div className="p4-hide-scrollbar" style={{ flex: 1, padding: "24px", overflowY: "auto", minHeight: "340px", maxHeight: "340px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        style={{
                          alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                          maxWidth: "85%",
                          padding: "12px 16px",
                          borderRadius: "14px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          fontFamily: sfText,
                          background: m.role === "user" ? "#1a1a1c" : "#00e676",
                          color: m.role === "user" ? "#fff" : "#000",
                        }}
                      >
                        {m.text}
                      </motion.div>
                    ))}
                    {showTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ alignSelf: "flex-start", padding: "12px 16px", background: "#1a1a1c", borderRadius: "14px", display: "flex", gap: "4px" }}
                      >
                        {[0, 1, 2].map((d) => (
                          <motion.div
                            key={d}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                            style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#6e6e73" }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Chat Footer Metrics */}
                <div style={{ padding: "12px 20px", background: "#0d0d0f", display: "flex", justifyContent: "space-between", boxShadow: "0 -1px 0 rgba(255,255,255,0.04)" }}>
                  <div style={{ color: "#48484a", fontSize: "11px", fontFamily: sfText, fontWeight: 600 }}>RESPONSE TIME</div>
                  <div style={{ color: "#00e676", fontSize: "11px", fontFamily: sfText, fontWeight: 700 }}>{avgMs > 0 ? `${avgMs}MS` : "CALCULATING..."}</div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="automation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p4-container"
            >
              {/* Left Column: Logs */}
              <motion.div 
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p4-left-col"
                style={{ paddingTop: 0 }}
              >
                <div style={{ color: "#f5f5f7", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                  <span>QUICK · 4 RUNNING</span>
                  <span style={{ color: "#00e676" }}>LIVE</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {LOGS.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      style={{ padding: "10px", background: "#0e0e10", borderRadius: "8px", fontFamily: "monospace", fontSize: "11px" }}
                    >
                      <div style={{ color: "#48484a", marginBottom: "4px" }}>[{log.time}]</div>
                      <div style={{ color: "#f5f5f7" }}>{log.msg}</div>
                    </motion.div>
                  ))}
                  {[0, 1].map((s, i) => (
                    <motion.div
                      key={`skel-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.06 }}
                      style={{ height: "40px", background: "rgba(255,255,255,0.06)", borderRadius: "8px" }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Graph & Stats */}
              <div className="p4-right-col">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ background: "#080808", borderRadius: "20px", position: "relative", overflow: "hidden", paddingTop: "8px" }}
                >
                  <svg viewBox="0 0 900 260" style={{ width: "100%", height: "auto", display: "block" }}>
                    {/* Edges */}
                    {EDGES.map((edge, i) => (
                      <path
                        key={i}
                        d={edge.d}
                        fill="none"
                        stroke="#1a1a1c"
                        strokeWidth="2"
                        style={{
                          strokeDasharray: 400,
                          strokeDashoffset: 400,
                          animation: `p4edgedraw 0.6s ease forwards`,
                          animationDelay: `${i * 0.12}s`,
                          "--path-len": 400,
                        } as any}
                      />
                    ))}
                    
                    {/* Nodes */}
                    {NODES.map((n, i) => (
                      <g
                        key={n.id}
                        style={{
                          animation: `p4nodeenter 0.4s ease forwards`,
                          animationDelay: `${i * 0.07}s`,
                          opacity: 0,
                        }}
                      >
                        <rect
                          x={n.x} y={n.y - 35} width="140" height="70" rx="12"
                          fill={activeNode === n.id ? "#131a15" : "#0e1012"}
                          stroke={activeNode === n.id ? n.color : "none"}
                          strokeWidth="1.5"
                          style={{ transition: "all 0.3s ease" }}
                        />
                        <text x={n.x + 15} y={n.y - 5} fill="#f0f2f4" style={{ fontFamily: sfText, fontSize: "14px", fontWeight: 600 }}>{n.label}</text>
                        <text x={n.x + 15} y={n.y + 15} fill="#48484a" style={{ fontFamily: sfText, fontSize: "12px" }}>{n.sub}</text>
                        <circle cx={n.x + 120} cy={n.y} r="4" fill={n.color} />
                      </g>
                    ))}
                  </svg>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="p4-stats-bar"
                  style={{
                    marginTop: "24px",
                    background: "#0a0a0b",
                    padding: "20px 32px",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  {STATS.map((stat, i) => (
                    <div key={i}>
                      <div style={{ color: "#48484a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "4px" }}>{stat.label}</div>
                      <div style={{ color: "#f5f5f7", fontSize: "24px", fontWeight: 600, fontFamily: sfDisplay }}>
                        <CountUp value={stat.value} duration={stat.duration} />
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: "8px 16px", background: "#0d1f14", color: "#00e676", borderRadius: "100px", fontSize: "12px", fontWeight: 700, boxShadow: "0 0 0 1px rgba(0,230,118,0.30)" }}>
                    DONE
                  </div>
                </motion.div>

                {/* CTA Row */}
                <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={openModal}
                    style={{ padding: "14px 28px", borderRadius: "100px", background: "#fff", color: "#000", border: "none", fontSize: "15px", fontWeight: 600, fontFamily: sfText, cursor: "pointer" }}
                  >
                    Start a project
                  </button>
                  <Link
                    to="/services"
                    style={{ color: "#6e6e73", fontSize: "15px", fontFamily: sfText, cursor: "pointer", textDecoration: "none" }}
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}