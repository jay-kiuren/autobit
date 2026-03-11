import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// ─── Animated Illustrations ───────────────────────────────────────────────────

// 1. Workflow Automation — emails flying into a processor, checkmarks out
const AutomationArt = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    {/* Center gear/processor */}
    <motion.g transform="translate(140,80)">
      <motion.circle cx={0} cy={0} r={28} fill="#1a1a2e" stroke="#2997ff" strokeWidth={1.5} />
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <motion.rect key={i} x={-3} y={-38} width={6} height={12} rx={2} fill="#2997ff"
            transform={`rotate(${angle})`} opacity={0.7} />
        ))}
      </motion.g>
      <text x={0} y={5} textAnchor="middle" fontSize={12} fill="#2997ff" fontWeight={700}>⚙</text>
    </motion.g>

    {/* Incoming emails from left */}
    {[0,1,2].map(i => (
      <motion.g key={i}
        initial={{ x: -60, opacity: 0 }}
        animate={active ? { x: [-60, 95], opacity: [0, 1, 1, 0] } : { x: -60, opacity: 0 }}
        transition={{ duration: 1.8, delay: i * 0.55, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      >
        <rect x={0} y={70 + i * 18 - 18} width={32} height={20} rx={3} fill="#1c1c1e" stroke="#2997ff" strokeWidth={1} />
        <line x1={5} y1={73 + i * 18 - 18} x2={27} y2={73 + i * 18 - 18} stroke="#2997ff" strokeWidth={1} opacity={0.5} />
        <line x1={5} y1={78 + i * 18 - 18} x2={20} y2={78 + i * 18 - 18} stroke="#2997ff" strokeWidth={1} opacity={0.3} />
        <line x1={5} y1={83 + i * 18 - 18} x2={24} y2={83 + i * 18 - 18} stroke="#2997ff" strokeWidth={1} opacity={0.3} />
      </motion.g>
    ))}

    {/* Outgoing checkmarks to right */}
    {[0,1,2].map(i => (
      <motion.g key={i}
        initial={{ x: 185, opacity: 0 }}
        animate={active ? { x: [185, 260], opacity: [0, 1, 1, 0] } : { x: 185, opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.9 + i * 0.55, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      >
        <circle cx={0} cy={71 + i * 18 - 18} r={10} fill="#30d158" opacity={0.15} />
        <motion.path d={`M -5 ${71 + i * 18 - 18} L -2 ${74 + i * 18 - 18} L 5 ${67 + i * 18 - 18}`}
          stroke="#30d158" strokeWidth={2} strokeLinecap="round" fill="none" />
      </motion.g>
    ))}

    {/* Labels */}
    <text x={16} y={148} fontSize={9} fill="rgba(255,255,255,0.3)" textAnchor="middle">Incoming</text>
    <text x={140} y={148} fontSize={9} fill="#2997ff" textAnchor="middle">Autobit Engine</text>
    <text x={264} y={148} fontSize={9} fill="rgba(255,255,255,0.3)" textAnchor="middle">Done</text>
  </svg>
);

// 2. AI Agents — chat bubbles with typing indicator
const AIAgentsArt = ({ active }: { active: boolean }) => {
  const msgs = [
    { text: "Hey, I need help with my order", side: "left", delay: 0 },
    { text: "Sure! Order #4821 — shipped today", side: "right", delay: 1.0 },
    { text: "When will it arrive?", side: "left", delay: 2.0 },
    { text: "Estimated Dec 18. Tracking sent!", side: "right", delay: 3.0 },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Phone/chat window */}
      <rect x={40} y={10} width={200} height={140} rx={12} fill="#111" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Header */}
      <rect x={40} y={10} width={200} height={28} rx={12} fill="#1c1c1e" />
      <rect x={40} y={28} width={200} height={10} fill="#1c1c1e" />
      <circle cx={60} cy={24} r={8} fill="#30d158" opacity={0.2} />
      <circle cx={60} cy={24} r={5} fill="#30d158" />
      <text x={75} y={28} fontSize={10} fill="#f5f5f7" fontWeight={600}>AI Support Agent</text>
      <motion.circle cx={228} cy={24} r={4} fill="#30d158"
        animate={active ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }} />

      {msgs.map((m, i) => {
        const y = 50 + i * 26;
        const isRight = m.side === "right";
        const w = m.text.length * 4.5 + 16;
        const x = isRight ? 240 - w : 50;
        return (
          <motion.g key={i}
            initial={{ opacity: 0, y: y + 8 }}
            animate={active ? { opacity: 1, y } : { opacity: 0, y: y + 8 }}
            transition={{ duration: 0.35, delay: m.delay, ease: "easeOut" }}
          >
            <rect x={x} y={0} width={Math.min(w, 160)} height={20} rx={10}
              fill={isRight ? "#30d158" : "#2c2c2e"} />
            <text x={x + 8} y={13} fontSize={8.5} fill={isRight ? "#fff" : "rgba(255,255,255,0.8)"}>
              {m.text.length > 22 ? m.text.slice(0, 22) + "…" : m.text}
            </text>
          </motion.g>
        );
      })}

      {/* Typing indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={active ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <rect x={50} y={148} width={44} height={16} rx={8} fill="#2c2c2e" />
        {[0, 1, 2].map(i => (
          <motion.circle key={i} cx={62 + i * 10} cy={156} r={3} fill="rgba(255,255,255,0.4)"
            animate={active ? { y: [-2, 2, -2] } : { y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
        ))}
      </motion.g>
    </svg>
  );
};

// 3. Web Apps — browser with animated bar chart
const WebAppsArt = ({ active }: { active: boolean }) => {
  const bars = [
    { h: 60, color: "#bf5af2", label: "Jan" },
    { h: 85, color: "#bf5af2", label: "Feb" },
    { h: 45, color: "#bf5af2", label: "Mar" },
    { h: 95, color: "#bf5af2", label: "Apr" },
    { h: 70, color: "#bf5af2", label: "May" },
    { h: 110, color: "#bf5af2", label: "Jun" },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Browser chrome */}
      <rect x={20} y={8} width={240} height={144} rx={10} fill="#111" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      <rect x={20} y={8} width={240} height={26} rx={10} fill="#1c1c1e" />
      <rect x={20} y={24} width={240} height={10} fill="#1c1c1e" />
      {/* Dots */}
      {[0,1,2].map(i => <circle key={i} cx={36 + i * 14} cy={21} r={4} fill={["#ff5f57","#febc2e","#28c840"][i]} />)}
      {/* URL bar */}
      <rect x={80} y={14} width={140} height={14} rx={7} fill="rgba(255,255,255,0.06)" />
      <text x={150} y={24} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.3)">app.autobit.io/dashboard</text>

      {/* Chart area */}
      <rect x={30} y={44} width={220} height={98} rx={6} fill="rgba(255,255,255,0.02)" />
      {/* Grid lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={30} y1={130 - i * 22} x2={250} y2={130 - i * 22} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      ))}
      {/* Bars */}
      {bars.map((b, i) => (
        <motion.rect key={i}
          x={45 + i * 34} y={130 - b.h * 0.72} width={22} rx={4}
          fill={b.color} opacity={0.85}
          initial={{ height: 0, y: 130 }}
          animate={active ? { height: b.h * 0.72, y: 130 - b.h * 0.72 } : { height: 0, y: 130 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
      {bars.map((b, i) => (
        <text key={i} x={56 + i * 34} y={140} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.3)">{b.label}</text>
      ))}
      {/* Value tooltip on last bar */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.9 }}
      >
        <rect x={194} y={46} width={40} height={18} rx={5} fill="#bf5af2" />
        <text x={214} y={58} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={700}>+34%</text>
      </motion.g>
    </svg>
  );
};

// 4. Business Systems — connected module grid
const BusinessSystemsArt = ({ active }: { active: boolean }) => {
  const modules = [
    { x: 50,  y: 40,  label: "Inventory", icon: "📦" },
    { x: 175, y: 40,  label: "HR",        icon: "👥" },
    { x: 50,  y: 105, label: "Finance",   icon: "💰" },
    { x: 175, y: 105, label: "Schedule",  icon: "📅" },
  ];
  const connections = [
    { x1: 102, y1: 55,  x2: 175, y2: 55 },
    { x1: 102, y1: 120, x2: 175, y2: 120 },
    { x1: 76,  y1: 72,  x2: 76,  y2: 105 },
    { x1: 202, y1: 72,  x2: 202, y2: 105 },
    { x1: 102, y1: 55,  x2: 175, y2: 120 },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Connecting lines */}
      {connections.map((c, i) => (
        <motion.line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="#ff9f0a" strokeWidth={1} strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}

      {/* Animated data pulses along connections */}
      {active && connections.slice(0,3).map((c, i) => (
        <motion.circle key={i} r={3} fill="#ff9f0a"
          initial={{ x: c.x1, y: c.y1, opacity: 0 }}
          animate={{ x: [c.x1, c.x2], y: [c.y1, c.y2], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.4, repeat: Infinity, repeatDelay: 0.8 }}
        />
      ))}

      {/* Module cards */}
      {modules.map((m, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.95 }}
          transition={{ duration: 0.4, delay: i * 0.12 }}
          style={{ transformOrigin: `${m.x + 26}px ${m.y + 17}px` }}
        >
          <rect x={m.x} y={m.y} width={52} height={34} rx={8} fill="#1c1c1e" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.4} />
          <text x={m.x + 26} y={m.y + 14} textAnchor="middle" fontSize={13}>{m.icon}</text>
          <text x={m.x + 26} y={m.y + 26} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.5)">{m.label}</text>
        </motion.g>
      ))}

      {/* Center label */}
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.6 }}>
        <circle cx={140} cy={80} r={18} fill="#ff9f0a" opacity={0.1} />
        <circle cx={140} cy={80} r={12} fill="#ff9f0a" opacity={0.15} />
        <text x={140} y={84} textAnchor="middle" fontSize={14}>🔗</text>
      </motion.g>

      <text x={140} y={152} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.25)">All systems — one platform</text>
    </svg>
  );
};

// 5. Robotics / Physical AI — sensor scan with detection boxes
const RoboticsArt = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    {/* Background grid */}
    {[0,1,2,3,4,5].map(i => (
      <line key={`v${i}`} x1={30 + i * 44} y1={10} x2={30 + i * 44} y2={150} stroke="rgba(255,59,48,0.06)" strokeWidth={1} />
    ))}
    {[0,1,2,3].map(i => (
      <line key={`h${i}`} x1={20} y1={20 + i * 38} x2={260} y2={20 + i * 38} stroke="rgba(255,59,48,0.06)" strokeWidth={1} />
    ))}

    {/* Scan line */}
    <motion.line x1={20} y1={0} x2={260} y2={0} stroke="#ff375f" strokeWidth={1.5} opacity={0.6}
      animate={active ? { y1: [10, 150, 10], y2: [10, 150, 10] } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />

    {/* Detection boxes */}
    {[
      { x: 40,  y: 30,  w: 60, h: 50, label: "Worker", conf: "99%" },
      { x: 150, y: 55,  w: 75, h: 60, label: "Hazard zone", conf: "94%" },
    ].map((box, i) => (
      <motion.g key={i}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4 + i * 0.5, duration: 0.3 }}
      >
        {/* Corners only */}
        <path d={`M${box.x+8},${box.y} L${box.x},${box.y} L${box.x},${box.y+8}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${box.x+box.w-8},${box.y} L${box.x+box.w},${box.y} L${box.x+box.w},${box.y+8}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${box.x},${box.y+box.h-8} L${box.x},${box.y+box.h} L${box.x+8},${box.y+box.h}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${box.x+box.w},${box.y+box.h-8} L${box.x+box.w},${box.y+box.h} L${box.x+box.w-8},${box.y+box.h}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        {/* Label */}
        <rect x={box.x} y={box.y - 14} width={box.w} height={13} rx={3} fill="#ff375f" opacity={0.9} />
        <text x={box.x + 4} y={box.y - 4} fontSize={8} fill="#fff" fontWeight={600}>{box.label} · {box.conf}</text>
      </motion.g>
    ))}

    {/* Status bar */}
    <rect x={20} y={135} width={240} height={18} rx={4} fill="rgba(255,59,48,0.08)" />
    <motion.text x={30} y={147} fontSize={8} fill="#ff375f" fontFamily="monospace"
      animate={active ? {} : {}}
    >
      AXONIS EDGE · SECURE · 4 sensors · 99.98% uptime
    </motion.text>
    <motion.circle cx={252} cy={144} r={4} fill="#ff375f"
      animate={active ? { opacity: [1, 0.2, 1] } : { opacity: 0.2 }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </svg>
);

// 6. Mobile — phone with notifications popping
const MobileArt = ({ active }: { active: boolean }) => {
  const notifications = [
    { icon: "📬", text: "New message from client", delay: 0.3 },
    { icon: "✅", text: "Task completed", delay: 1.1 },
    { icon: "📊", text: "Revenue up 23% this week", delay: 1.9 },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Phone body */}
      <rect x={100} y={8} width={80} height={144} rx={14} fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
      {/* Notch */}
      <rect x={120} y={14} width={40} height={8} rx={4} fill="#1c1c1e" />
      {/* Screen content */}
      <rect x={106} y={28} width={68} height={108} rx={4} fill="#0a0a0a" />
      {/* App grid */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={112 + (i % 3) * 20} y={36 + Math.floor(i / 3) * 20} width={14} height={14} rx={4}
          fill={["#2997ff","#30d158","#ff9f0a","#bf5af2","#ff375f","#64d2ff"][i]} opacity={0.7} />
      ))}
      {/* Bottom bar */}
      <rect x={115} y={128} width={50} height={4} rx={2} fill="rgba(255,255,255,0.15)" />
      {/* Home indicator */}
      <rect x={127} y={148} width={26} height={3} rx={2} fill="rgba(255,255,255,0.2)" />

      {/* Notification banners sliding in from right */}
      {notifications.map((n, i) => (
        <motion.g key={i}
          initial={{ x: 280, opacity: 0 }}
          animate={active ? { x: 0, opacity: 1 } : { x: 280, opacity: 0 }}
          transition={{ delay: n.delay, duration: 0.4, ease: "easeOut",
            ...(active ? { exit: { x: 280, opacity: 0, transition: { delay: n.delay + 1.5 } } } : {}) }}
        >
          <motion.g
            animate={active ? { x: [0, 0, 280], opacity: [1, 1, 0] } : {}}
            transition={{ delay: n.delay, duration: 2.5, times: [0, 0.7, 1], ease: "easeIn", repeat: Infinity, repeatDelay: 3 }}
          >
            <rect x={-210} y={70 + i * 8 - 8} width={195} height={28} rx={8} fill="#1c1c1e" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <text x={-204} y={87 + i * 8 - 8} fontSize={14}>{n.icon}</text>
            <text x={-186} y={82 + i * 8 - 8} fontSize={8.5} fill="#f5f5f7" fontWeight={600}>Autobit App</text>
            <text x={-186} y={92 + i * 8 - 8} fontSize={7.5} fill="rgba(255,255,255,0.45)">{n.text}</text>
          </motion.g>
        </motion.g>
      ))}
    </svg>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { id: "automation", eyebrow: "Workflow Automation", heading: "Eliminate manual work.", desc: "Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.", price: "From $800", timeline: "2–5 days", accent: "#2997ff", Art: AutomationArt },
  { id: "ai-agents",  eyebrow: "AI Agents",           heading: "Custom AI that works 24/7.", desc: "Purpose-built AI agents for customer support, lead qualification, and internal operations.", price: "From $1,200", timeline: "5–10 days", accent: "#30d158", Art: AIAgentsArt },
  { id: "web-apps",   eyebrow: "Web Applications",    heading: "Dashboards, CRMs, and SaaS tools.", desc: "React, Firebase, Vercel. Full-stack apps built for speed, scale, and clean UX.", price: "From $1,500", timeline: "7–14 days", accent: "#bf5af2", Art: WebAppsArt },
  { id: "systems",    eyebrow: "Business Systems",    heading: "One system. Your entire operation.", desc: "Inventory, HR, finance, scheduling — unified in one platform.", price: "From $3,000", timeline: "14–30 days", accent: "#ff9f0a", Art: BusinessSystemsArt },
  { id: "robotics",   eyebrow: "Robotics & Physical AI", heading: "Edge AI. Industrial-grade.", desc: "PLC integration, computer vision, and embedded AI for physical environments.", price: "From $3,000", timeline: "14–30 days", accent: "#ff375f", Art: RoboticsArt },
  { id: "mobile",     eyebrow: "Mobile Applications", heading: "iOS + Android. Shipped fast.", desc: "React Native mobile apps — cross-platform, performant, and production-ready.", price: "From $2,000", timeline: "10–21 days", accent: "#64d2ff", Art: MobileArt },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

const ServiceCard = ({ s }: { s: typeof services[0] }) => {
  const [hovered, setHovered] = useState(false);
  const { Art } = s;

  return (
    <div
      id={s.id}
      style={{
        display: 'flex', flexDirection: 'column',
        background: '#1c1c1e', borderRadius: '18px', overflow: 'hidden',
        flexShrink: 0, width: '300px', height: '480px',
        transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease',
        transform: hovered ? 'scale(1.025)' : 'scale(1)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${s.accent}44` : '0 4px 20px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animation area */}
      <div style={{
        flex: 1, padding: '20px', minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `radial-gradient(ellipse at center, ${s.accent}0d 0%, transparent 70%)`,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <Art active={hovered} />
      </div>

      {/* Text content */}
      <div style={{ padding: '20px 22px 22px', flexShrink: 0 }}>
        <span style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: s.accent, marginBottom: '6px' }}>{s.eyebrow}</span>
        <h3 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.4px', lineHeight: 1.2, color: '#f5f5f7', margin: '0 0 6px' }}>{s.heading}</h3>
        <p style={{ fontSize: '12px', lineHeight: 1.55, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{s.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f5f5f7' }}>{s.price}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>· {s.timeline}</span>
          </div>
          <a href="mailto:autobitofficial.ph@gmail.com" style={{ fontSize: '12px', fontWeight: 500, color: s.accent, textDecoration: 'none' }}>
            Get a quote →
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Scroll Row ────────────────────────────────────────────────────────────────

const ScrollRow = ({ items }: { items: typeof services }) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const rowRef = (el: HTMLDivElement | null) => {
    if (el) setMaxScroll(el.scrollWidth - el.clientWidth);
  };
  const containerRef = { current: null as HTMLDivElement | null };

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={el => { containerRef.current = el; if (el) setMaxScroll(el.scrollWidth - el.clientWidth); }}
        onScroll={e => setScrollLeft((e.target as HTMLDivElement).scrollLeft)}
        style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}
      >
        {items.map(s => <ServiceCard key={s.id} s={s} />)}
      </div>

      {scrollLeft > 8 && (
        <button onClick={() => containerRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
          style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, padding: 0 }}>‹</button>
      )}
      {scrollLeft < maxScroll - 8 && (
        <button onClick={() => containerRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
          style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, padding: 0 }}>›</button>
      )}

      <style>{`div::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main style={{ filter: navDropdownActive ? 'blur(8px)' : 'none', opacity: navDropdownActive ? 0.45 : 1, transition: 'filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)' }}>
        <section style={{ background: '#000', paddingTop: '112px', paddingBottom: '96px' }}>
          <div className="section-container">

            <ScrollReveal>
              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: 'clamp(26px,3.5vw,34px)', fontWeight: 700, letterSpacing: '-0.6px', lineHeight: 1.25, color: '#f5f5f7', margin: 0 }}>
                  What we build.{' '}
                  <span style={{ color: 'rgba(255,255,255,0.32)', fontWeight: 500 }}>Engineering services from automation to full-stack systems.</span>
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', marginTop: '10px', margin: '10px 0 0' }}>Hover a card to see it in action.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <ScrollRow items={services} />
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div style={{ marginTop: '80px' }}>
                <p style={{ fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 700, letterSpacing: '-0.4px', color: '#f5f5f7', margin: '0 0 24px' }}>
                  The Autobit difference.{' '}
                  <span style={{ color: 'rgba(255,255,255,0.32)', fontWeight: 500 }}>More reasons to work with us.</span>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {[
                    { icon: '⚡', title: 'Fixed pricing.', sub: "No surprises. You know exactly what you pay before we start." },
                    { icon: '🚀', title: 'Fast delivery.', sub: "From 2 days. Most agencies take weeks. We ship in days." },
                    { icon: '🔧', title: '50% to start.', sub: "Pay half upfront. The rest only when it's done and you're happy." },
                    { icon: '🤝', title: 'Direct access.', sub: "You talk to the builder. No account managers. No middlemen." },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#1c1c1e', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ fontSize: '22px', marginBottom: '12px' }}>{item.icon}</div>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#f5f5f7', margin: 0, letterSpacing: '-0.2px' }}>
                        {item.title}{' '}
                        <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.42)' }}>{item.sub}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div style={{ marginTop: '56px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <a href="mailto:autobitofficial.ph@gmail.com"
                  style={{ background: '#2997ff', color: '#fff', padding: '14px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.25s ease', boxShadow: '0 0 28px rgba(41,151,255,0.22)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 48px rgba(41,151,255,0.45)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.025)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 28px rgba(41,151,255,0.22)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; }}>
                  Start a project
                </a>
                <a href="/pricing"
                  style={{ color: '#2997ff', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}>
                  See pricing →
                </a>
              </div>
            </ScrollReveal>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
