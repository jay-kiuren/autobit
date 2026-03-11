import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Illustrations ────────────────────────────────────────────────────────────

const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%" }}>
    <motion.g transform="translate(160,100)">
      <circle cx={0} cy={0} r={36} fill="rgba(41,151,255,0.08)" stroke="#2997ff" strokeWidth={1.5} />
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <rect key={i} x={-3} y={-50} width={6} height={14} rx={3} fill="#2997ff" transform={`rotate(${a})`} opacity={0.6} />
        ))}
      </motion.g>
      <text x={0} y={7} textAnchor="middle" fontSize={20} fill="#2997ff">⚙</text>
    </motion.g>
    {[0,1,2].map(i => (
      <motion.g key={i} animate={active ? { x: [-70,108], opacity: [0,1,1,0] } : { x: -70, opacity: 0 }}
        transition={{ duration: 2, delay: i*0.65, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}>
        <rect x={0} y={78+i*22-22} width={38} height={24} rx={4} fill="#0d0d0d" stroke="#2997ff" strokeWidth={1} strokeOpacity={0.5} />
        <line x1={5} y1={83+i*22-22} x2={33} y2={83+i*22-22} stroke="#2997ff" strokeWidth={1} opacity={0.5} />
        <line x1={5} y1={89+i*22-22} x2={25} y2={89+i*22-22} stroke="#2997ff" strokeWidth={1} opacity={0.3} />
      </motion.g>
    ))}
    {[0,1,2].map(i => (
      <motion.g key={i} animate={active ? { x: [212,290], opacity: [0,1,1,0] } : { x: 212, opacity: 0 }}
        transition={{ duration: 2, delay: 1.0+i*0.65, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}>
        <circle cx={0} cy={89+i*22-22} r={12} fill="#30d158" opacity={0.12} />
        <path d={`M -6 ${89+i*22-22} L -2 ${94+i*22-22} L 7 ${84+i*22-22}`} stroke="#30d158" strokeWidth={2.5} strokeLinecap="round" fill="none" />
      </motion.g>
    ))}
    <text x={35}  y={188} fontSize={9} fill="rgba(255,255,255,0.18)" textAnchor="middle">Tasks in</text>
    <text x={160} y={188} fontSize={9} fill="#2997ff" textAnchor="middle">Autobit Engine</text>
    <text x={280} y={188} fontSize={9} fill="rgba(255,255,255,0.18)" textAnchor="middle">Done ✓</text>
  </svg>
);

const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const msgs = [
    { text: "Hey, I need help with my order", right: false, delay: 0.2 },
    { text: "Order #4821 shipped today!",      right: true,  delay: 1.1 },
    { text: "When will it arrive?",             right: false, delay: 2.0 },
    { text: "Est. Dec 18 — tracking sent 📦",  right: true,  delay: 2.9 },
  ];
  return (
    <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x={50} y={8} width={220} height={178} rx={14} fill="#0d0d0d" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      <rect x={50} y={8} width={220} height={34} rx={14} fill="#1a1a1a" />
      <rect x={50} y={28} width={220} height={14} fill="#1a1a1a" />
      <circle cx={74} cy={25} r={9} fill="#30d158" opacity={0.15} />
      <circle cx={74} cy={25} r={5} fill="#30d158" />
      <text x={90} y={29} fontSize={11} fill="#f5f5f7" fontWeight={600}>AI Support Agent</text>
      <motion.circle cx={248} cy={25} r={5} fill="#30d158"
        animate={active ? { opacity: [1,0.2,1] } : { opacity: 0.2 }} transition={{ duration: 1.2, repeat: Infinity }} />
      {msgs.map((m, i) => {
        const y = 52 + i*30;
        const w = Math.min(m.text.length*5 + 18, 160);
        const x = m.right ? 260-w : 60;
        return (
          <motion.g key={i} initial={{ opacity: 0, y: y+8 }}
            animate={active ? { opacity: 1, y } : { opacity: 0, y: y+8 }}
            transition={{ duration: 0.4, delay: m.delay }}>
            <rect x={x} y={0} width={w} height={22} rx={11} fill={m.right ? "#30d158" : "#2a2a2a"} />
            <text x={x+9} y={14} fontSize={9} fill={m.right ? "#fff" : "rgba(255,255,255,0.8)"}>
              {m.text.length > 26 ? m.text.slice(0,26)+"…" : m.text}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
};

const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const bars = [55,80,42,95,68,110];
  return (
    <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x={20} y={8} width={280} height={178} rx={12} fill="#0d0d0d" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      <rect x={20} y={8} width={280} height={28} rx={12} fill="#1a1a1a" />
      <rect x={20} y={26} width={280} height={10} fill="#1a1a1a" />
      {[0,1,2].map(i => <circle key={i} cx={34+i*14} cy={22} r={5} fill={["#ff5f57","#febc2e","#28c840"][i]} />)}
      <rect x={88} y={14} width={144} height={16} rx={8} fill="rgba(255,255,255,0.05)" />
      <text x={160} y={25} textAnchor="middle" fontSize={8.5} fill="rgba(255,255,255,0.2)">app.autobit.io/dashboard</text>
      {[0,1,2,3].map(i => <line key={i} x1={30} y1={152-i*28} x2={290} y2={152-i*28} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />)}
      {bars.map((h,i) => (
        <motion.rect key={i} x={38+i*40} rx={5} width={26} fill="#bf5af2" opacity={0.85}
          initial={{ height: 0, y: 152 }}
          animate={active ? { height: h*0.88, y: 152-h*0.88 } : { height: 0, y: 152 }}
          transition={{ duration: 0.55, delay: i*0.08, ease: "easeOut" }} />
      ))}
      {["Jan","Feb","Mar","Apr","May","Jun"].map((l,i) => (
        <text key={i} x={51+i*40} y={166} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.2)">{l}</text>
      ))}
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.7 }}>
        <rect x={222} y={36} width={58} height={22} rx={6} fill="#bf5af2" />
        <text x={251} y={51} textAnchor="middle" fontSize={11} fill="#fff" fontWeight={700}>+34% ↑</text>
      </motion.g>
    </svg>
  );
};

const BusinessSystemsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const modules = [
    { x:40,  y:55,  label:"Inventory", icon:"📦" },
    { x:200, y:55,  label:"HR",        icon:"👥" },
    { x:40,  y:128, label:"Finance",   icon:"💰" },
    { x:200, y:128, label:"Schedule",  icon:"📅" },
  ];
  return (
    <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%" }}>
      {([[92,72,200,72],[92,145,200,145],[66,88,66,128],[226,88,226,128],[92,72,200,145]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff9f0a" strokeWidth={1} strokeDasharray="5 5"
          initial={{ opacity: 0 }} animate={active ? { opacity: 0.35 } : { opacity: 0 }} transition={{ delay: 0.2+i*0.1 }} />
      ))}
      {([[92,72,200,72],[92,145,200,145],[66,88,66,128]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <motion.circle key={i} r={4} fill="#ff9f0a"
          animate={active ? { x:[x1,x2], y:[y1,y2], opacity:[0,1,1,0] } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.6+i*0.45, repeat: Infinity, repeatDelay: 1 }} />
      ))}
      {modules.map((m,i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0.85 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }}
          transition={{ delay: i*0.1 }}
          style={{ transformOrigin: `${m.x+26}px ${m.y+20}px` }}>
          <rect x={m.x} y={m.y} width={52} height={40} rx={10} fill="#1a1a1a" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.4} />
          <text x={m.x+26} y={m.y+18} textAnchor="middle" fontSize={16}>{m.icon}</text>
          <text x={m.x+26} y={m.y+32} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.38)">{m.label}</text>
        </motion.g>
      ))}
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }}>
        <circle cx={160} cy={100} r={22} fill="rgba(255,159,10,0.08)" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.35} />
        <text x={160} y={106} textAnchor="middle" fontSize={18}>🔗</text>
      </motion.g>
    </svg>
  );
};

const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%" }}>
    {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={30+i*65} y1={10} x2={30+i*65} y2={175} stroke="rgba(255,59,48,0.05)" strokeWidth={1} />)}
    {[0,1,2,3].map(i => <line key={`h${i}`} x1={20} y1={20+i*44} x2={300} y2={20+i*44} stroke="rgba(255,59,48,0.05)" strokeWidth={1} />)}
    <motion.line x1={20} y1={10} x2={300} y2={10} stroke="#ff375f" strokeWidth={1.5} opacity={0.5}
      animate={active ? { y1:[10,175,10], y2:[10,175,10] } : {}}
      transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }} />
    {[
      { x:35, y:28, w:75, h:56, label:"Worker detected", conf:"99%" },
      { x:155,y:62, w:88, h:66, label:"Hazard zone",     conf:"94%" },
    ].map((b,i) => (
      <motion.g key={i} initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5+i*0.5 }}>
        <path d={`M${b.x+10},${b.y} L${b.x},${b.y} L${b.x},${b.y+10}`}              stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${b.x+b.w-10},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+10}`}  stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${b.x},${b.y+b.h-10} L${b.x},${b.y+b.h} L${b.x+10},${b.y+b.h}`}  stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${b.x+b.w},${b.y+b.h-10} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-10},${b.y+b.h}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <rect x={b.x} y={b.y-14} width={b.w} height={13} rx={3} fill="#ff375f" opacity={0.9} />
        <text x={b.x+5} y={b.y-4} fontSize={8.5} fill="#fff" fontWeight={600}>{b.label} · {b.conf}</text>
      </motion.g>
    ))}
    <rect x={20} y={158} width={280} height={20} rx={4} fill="rgba(255,59,48,0.06)" />
    <text x={30} y={171} fontSize={9} fill="#ff375f" fontFamily="monospace">AXONIS EDGE · SECURE · 4 sensors · 99.98% uptime</text>
    <motion.circle cx={290} cy={168} r={5} fill="#ff375f"
      animate={active ? { opacity:[1,0.2,1] } : { opacity: 0.2 }} transition={{ duration: 1, repeat: Infinity }} />
  </svg>
);

const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect x={118} y={6} width={84} height={182} rx={18} fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
    <rect x={132} y={13} width={56} height={10} rx={5} fill="#1a1a1a" />
    <rect x={124} y={28} width={72} height={128} rx={4} fill="#080808" />
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={130+(i%3)*20} y={34+Math.floor(i/3)*22} width={14} height={14} rx={4}
        fill={["#2997ff","#30d158","#ff9f0a","#bf5af2","#ff375f","#64d2ff"][i]} opacity={0.75} />
    ))}
    <rect x={134} y={150} width={52} height={4} rx={2} fill="rgba(255,255,255,0.1)" />
    <rect x={143} y={183} width={34} height={3} rx={2} fill="rgba(255,255,255,0.15)" />
    {[
      { icon:"📬", title:"New client message", delay:0.4 },
      { icon:"✅", title:"Task completed",      delay:1.4 },
      { icon:"📊", title:"Revenue up 23%",      delay:2.4 },
    ].map((n,i) => (
      <motion.g key={i}
        animate={active ? { x:[320,0,0,320], opacity:[0,1,1,0] } : { x:320, opacity:0 }}
        transition={{ delay:n.delay, duration:3.5, times:[0,0.12,0.75,1], repeat:Infinity, repeatDelay:2, ease:"easeOut" }}>
        <rect x={-185} y={56+i*38} width={190} height={32} rx={10} fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <text x={-178} y={75+i*38} fontSize={15}>{n.icon}</text>
        <text x={-157} y={68+i*38} fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit</text>
        <text x={-157} y={80+i*38} fontSize={8} fill="rgba(255,255,255,0.4)">{n.title}</text>
      </motion.g>
    ))}
  </svg>
);

// ─── Hero Illustration — large centered, Apple-style ─────────────────────────

const HeroIllustration = () => (
  <svg viewBox="0 0 600 400" fill="none" style={{ width: "100%", height: "100%", maxWidth: 640 }}>
    {/* Orbital rings */}
    <ellipse cx={300} cy={200} rx={240} ry={70} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
    <ellipse cx={300} cy={200} rx={180} ry={52} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
    <ellipse cx={300} cy={200} rx={120} ry={35} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
    {/* Center core */}
    <circle cx={300} cy={200} r={52} fill="rgba(41,151,255,0.06)" stroke="#2997ff" strokeWidth={1.5} />
    <circle cx={300} cy={200} r={36} fill="rgba(41,151,255,0.1)" stroke="#2997ff" strokeWidth={1} strokeOpacity={0.5} />
    <text x={300} y={207} textAnchor="middle" fontSize={28} fill="#2997ff">⚡</text>
    {/* Orbiting nodes */}
    {[
      { angle: 0,   r: 180, label: "Automation", icon: "⚙️",  color: "#2997ff" },
      { angle: 60,  r: 180, label: "AI Agents",  icon: "🤖",  color: "#30d158" },
      { angle: 120, r: 180, label: "Web Apps",   icon: "💻",  color: "#bf5af2" },
      { angle: 180, r: 180, label: "Systems",    icon: "🔗",  color: "#ff9f0a" },
      { angle: 240, r: 180, label: "Robotics",   icon: "🦾",  color: "#ff375f" },
      { angle: 300, r: 180, label: "Mobile",     icon: "📱",  color: "#64d2ff" },
    ].map((node, i) => {
      const rad = (node.angle * Math.PI) / 180;
      const x = 300 + node.r * 0.88 * Math.cos(rad);
      const y = 200 + node.r * 0.28 * Math.sin(rad);
      return (
        <motion.g key={i}
          animate={{ y: [y-4, y+4, y-4] }}
          transition={{ duration: 3+i*0.4, repeat: Infinity, ease: "easeInOut", delay: i*0.5 }}>
          {/* Line to center */}
          <line x1={x} y1={y} x2={300} y2={200} stroke={node.color} strokeWidth={1} strokeOpacity={0.15} strokeDasharray="3 6" />
          {/* Node */}
          <circle cx={x} cy={y} r={28} fill="rgba(0,0,0,0.6)" stroke={node.color} strokeWidth={1} strokeOpacity={0.5} />
          <circle cx={x} cy={y} r={28} fill={`${node.color}0d`} />
          <text x={x} y={y+5} textAnchor="middle" fontSize={16}>{node.icon}</text>
          {/* Label */}
          <text x={x} y={y+44} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.35)" letterSpacing={0.5}>{node.label}</text>
        </motion.g>
      );
    })}
    {/* Pulse rings from center */}
    {[0,1,2].map(i => (
      <motion.circle key={i} cx={300} cy={200} r={52} fill="none" stroke="#2997ff" strokeWidth={1}
        initial={{ r: 52, opacity: 0.4 }}
        animate={{ r: 130, opacity: 0 }}
        transition={{ duration: 2.5, delay: i*0.85, repeat: Infinity, ease: "easeOut" }} />
    ))}
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { id:"automation", eyebrow:"Workflow Automation",    heading:"Eliminate\nmanual work.",           desc:"Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.", price:"From $800",   timeline:"2–5 days",   accent:"#2997ff", Art:AutomationArt       },
  { id:"ai-agents",  eyebrow:"AI Agents",              heading:"Custom AI\nthat works 24/7.",        desc:"Purpose-built agents for support, lead qualification, and internal ops.",        price:"From $1,200", timeline:"5–10 days",  accent:"#30d158", Art:AIAgentsArt          },
  { id:"web-apps",   eyebrow:"Web Applications",       heading:"Dashboards,\nCRMs, and SaaS.",       desc:"React, Firebase, Vercel. Full-stack web apps built for speed and clean UX.",    price:"From $1,500", timeline:"7–14 days",  accent:"#bf5af2", Art:WebAppsArt           },
  { id:"systems",    eyebrow:"Business Systems",       heading:"One system.\nYour entire operation.", desc:"Inventory, HR, finance, scheduling — unified in one platform.",                  price:"From $3,000", timeline:"14–30 days", accent:"#ff9f0a", Art:BusinessSystemsArt   },
  { id:"robotics",   eyebrow:"Robotics & Physical AI", heading:"Edge AI.\nIndustrial-grade.",        desc:"PLC integration, computer vision, and embedded AI for industrial environments.", price:"From $3,000", timeline:"14–30 days", accent:"#ff375f", Art:RoboticsArt          },
  { id:"mobile",     eyebrow:"Mobile Applications",   heading:"iOS + Android.\nShipped fast.",       desc:"React Native mobile apps — cross-platform, performant, production-ready.",       price:"From $2,000", timeline:"10–21 days", accent:"#64d2ff", Art:MobileArt            },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [activeIndex, setActiveIndex]             = useState(-1);
  const [animKeys, setAnimKeys]                   = useState(() => services.map(() => 0));
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
            setAnimKeys(prev => prev.map((k, ki) => ki === i ? k+1 : k));
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />

      <style>{`
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }
        .svc-heading {
          font-size: clamp(30px, 3.8vw, 54px);
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.06;
          color: #f5f5f7;
          margin: 0 0 16px;
          white-space: pre-line;
          position: relative;
          z-index: 2;
          /* bleed rightward with fade */
          width: 130%;
          -webkit-mask-image: linear-gradient(to right, black 50%, transparent 88%);
          mask-image: linear-gradient(to right, black 50%, transparent 88%);
        }
        .svc-glass-card {
          border-radius: 22px;
          padding: 1px;
          position: relative;
        }
        .svc-glass-inner {
          border-radius: 21px;
          background: linear-gradient(145deg,
            rgba(255,255,255,0.07) 0%,
            rgba(255,255,255,0.02) 55%,
            rgba(255,255,255,0.04) 100%);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.06);
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }
        .svc-glass-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
        }
        .svc-glass-inner::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 21px;
          background: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.05) 0%, transparent 55%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .svc-grid { grid-template-columns: 1fr; gap: 20px; }
          .svc-heading { width: 100%; -webkit-mask-image: none; mask-image: none; }
          .svc-glass-inner { height: 200px; }
        }
      `}</style>

      <main style={{ filter:navDropdownActive?"blur(8px)":"none", opacity:navDropdownActive?0.45:1, transition:"filter 0.28s ease, opacity 0.28s ease" }}>

        {/* ── HERO — Apple product page style ── */}
        <section style={{
          background: "#000",
          minHeight: "100vh",
          paddingTop: 64,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Ambient glow */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 55%, rgba(41,151,255,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

          {/* Large illustration — centered, fills most of screen */}
          <div style={{ flex: 1, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 24px", paddingTop: 40 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.25,0.1,0.25,1] }}
              style={{ width: "100%", maxWidth: 640, aspectRatio: "16/10" }}
            >
              <HeroIllustration />
            </motion.div>
          </div>

          {/* Bottom bar — title left, price/CTA right — exactly like Apple */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"28px 0 32px" }}>
            <div className="section-container">
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:24, flexWrap:"wrap" }}>
                {/* Left: title */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease:[0.25,0.1,0.25,1] }}
                >
                  <span style={{ fontSize:"12px", fontWeight:500, color:"rgba(255,255,255,0.3)", display:"block", marginBottom:6, letterSpacing:"0.04em" }}>
                    Engineering services
                  </span>
                  <h1 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:700, letterSpacing:"-1.5px", lineHeight:1.05, color:"#f5f5f7", margin:0 }}>
                    Autobit Services.
                  </h1>
                  <p style={{ fontSize:"clamp(13px,1.1vw,15px)", color:"rgba(255,255,255,0.3)", margin:"8px 0 0", maxWidth:320 }}>
                    Six capabilities. From automation to robotics.
                  </p>
                </motion.div>

                {/* Right: CTA pill — like Apple's "From $799 / Buy" */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55, ease:[0.25,0.1,0.25,1] }}
                  style={{
                    display:"flex", alignItems:"center", gap:16,
                    background:"rgba(255,255,255,0.05)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:980,
                    padding:"14px 14px 14px 22px",
                    backdropFilter:"blur(16px)",
                    WebkitBackdropFilter:"blur(16px)",
                    boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <div>
                    <div style={{ fontSize:15, fontWeight:600, color:"#f5f5f7", lineHeight:1 }}>From $800</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:2 }}>Fixed pricing · Fast delivery</div>
                  </div>
                  <a href="mailto:autobitofficial.ph@gmail.com"
                    style={{ background:"#2997ff", color:"#fff", padding:"12px 22px", borderRadius:980, fontSize:14, fontWeight:600, textDecoration:"none", whiteSpace:"nowrap", transition:"all 0.2s ease", boxShadow:"0 4px 16px rgba(41,151,255,0.4)" }}
                    onMouseEnter={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform="scale(1.04)"; el.style.boxShadow="0 6px 24px rgba(41,151,255,0.6)"; }}
                    onMouseLeave={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform="scale(1)"; el.style.boxShadow="0 4px 16px rgba(41,151,255,0.4)"; }}
                  >
                    Start a project
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service Sections — tight spacing, next panel peeks ── */}
        {services.map((s, i) => {
          const { Art } = s;
          const isActive = activeIndex === i;
          return (
            <section
              key={s.id}
              id={s.id}
              ref={el => { sectionRefs.current[i] = el; }}
              style={{
                /* 78vh so ~22vh of next section is visible when at top of current */
                minHeight: "78vh",
                background: "#000",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
                padding: "32px 0 24px",
              }}
            >
              {/* Ambient glow */}
              <div style={{
                position:"absolute", inset:0, pointerEvents:"none",
                background:`radial-gradient(ellipse 50% 60% at 72% 50%, ${s.accent}0b 0%, transparent 70%)`,
                opacity: isActive ? 1 : 0,
                transition:"opacity 0.7s ease",
              }} />

              {/* Faint index number */}
              <div style={{
                position:"absolute", top:"50%", right:"1vw",
                transform:"translateY(-50%)",
                fontSize:"clamp(70px,12vw,160px)",
                fontWeight:800, color:s.accent, opacity:0.04,
                userSelect:"none", pointerEvents:"none", lineHeight:1, letterSpacing:"-0.06em",
              }}>
                {String(i+1).padStart(2,"0")}
              </div>

              <div className="section-container" style={{ width:"100%", position:"relative", zIndex:1 }}>
                <div className="svc-grid">

                  {/* Left */}
                  <motion.div
                    initial={{ opacity:0, x:-18 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:false, amount:0.3 }}
                    transition={{ duration:0.55, ease:[0.25,0.1,0.25,1] }}
                    style={{ position:"relative", zIndex:2 }}
                  >
                    <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:s.accent, display:"block", marginBottom:12 }}>
                      {String(i+1).padStart(2,"0")} / {String(services.length).padStart(2,"0")} — {s.eyebrow}
                    </span>

                    <h2 className="svc-heading">{s.heading}</h2>

                    <p style={{ fontSize:"clamp(13px,1.1vw,15px)", lineHeight:1.6, color:"rgba(255,255,255,0.38)", margin:"0 0 24px", maxWidth:340 }}>
                      {s.desc}
                    </p>

                    <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                      <div style={{
                        background:"rgba(255,255,255,0.04)",
                        border:"1px solid rgba(255,255,255,0.08)",
                        borderRadius:12, padding:"10px 16px",
                        backdropFilter:"blur(12px)",
                        WebkitBackdropFilter:"blur(12px)",
                        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.3)",
                      }}>
                        <div style={{ fontSize:18, fontWeight:700, color:"#f5f5f7", letterSpacing:"-0.5px", lineHeight:1 }}>{s.price}</div>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:2 }}>{s.timeline} delivery</div>
                      </div>
                      <a href="mailto:autobitofficial.ph@gmail.com" style={{
                        background:s.accent, color:"#fff",
                        padding:"11px 22px", borderRadius:980,
                        fontSize:13, fontWeight:600,
                        textDecoration:"none", display:"inline-block",
                        transition:"all 0.22s ease",
                        boxShadow:`0 4px 18px ${s.accent}44`,
                      }}
                        onMouseEnter={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform="scale(1.04)"; el.style.boxShadow=`0 7px 32px ${s.accent}66`; }}
                        onMouseLeave={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform="scale(1)"; el.style.boxShadow=`0 4px 18px ${s.accent}44`; }}
                      >
                        Get a quote →
                      </a>
                    </div>
                  </motion.div>

                  {/* Right: Glass card */}
                  <motion.div
                    initial={{ opacity:0, x:18 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:false, amount:0.3 }}
                    transition={{ duration:0.55, delay:0.08, ease:[0.25,0.1,0.25,1] }}
                  >
                    <div className="svc-glass-card" style={{
                      background:`linear-gradient(135deg, ${s.accent}28 0%, rgba(255,255,255,0.03) 50%, ${s.accent}10 100%)`,
                      boxShadow:`0 0 0 1px rgba(255,255,255,0.07), 0 20px 56px rgba(0,0,0,0.5), 0 6px 20px ${s.accent}18`,
                    }}>
                      <div className="svc-glass-inner" style={{
                        background:`linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.22) 60%, rgba(255,255,255,0.03) 100%)`,
                      }}>
                        <div style={{
                          position:"absolute", top:0, left:"8%", right:"8%", height:1,
                          background:`linear-gradient(90deg, transparent, ${s.accent}66, transparent)`,
                        }} />
                        <Art active={isActive} animKey={animKeys[i]} />
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* Prev / Next */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:20 }}>
                  <button
                    onClick={() => i>0 && sectionRefs.current[i-1]?.scrollIntoView({ behavior:"smooth", block:"start" })}
                    style={{ fontSize:"11px", color:i>0?"rgba(255,255,255,0.22)":"transparent", background:"none", border:"none", cursor:i>0?"pointer":"default", padding:0, letterSpacing:"0.03em", transition:"color 0.2s", fontFamily:"inherit" }}
                    onMouseEnter={e => i>0 && ((e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.55)")}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color=i>0?"rgba(255,255,255,0.22)":"transparent"; }}
                  >← {i>0 ? services[i-1].eyebrow : ""}</button>
                  <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.14)", letterSpacing:"0.06em" }}>
                    {String(i+1).padStart(2,"0")} / {String(services.length).padStart(2,"0")}
                  </span>
                  <button
                    onClick={() => i<services.length-1 && sectionRefs.current[i+1]?.scrollIntoView({ behavior:"smooth", block:"start" })}
                    style={{ fontSize:"11px", color:i<services.length-1?"rgba(255,255,255,0.22)":"transparent", background:"none", border:"none", cursor:i<services.length-1?"pointer":"default", padding:0, letterSpacing:"0.03em", transition:"color 0.2s", fontFamily:"inherit" }}
                    onMouseEnter={e => i<services.length-1 && ((e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.55)")}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color=i<services.length-1?"rgba(255,255,255,0.22)":"transparent"; }}
                  >{i<services.length-1 ? services[i+1].eyebrow : ""} →</button>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── Bottom CTA ── */}
        <section style={{ background:"#000", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"64px 0" }}>
          <div className="section-container" style={{ textAlign:"center" }}>
            <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              <p style={{ fontSize:"clamp(20px,2.8vw,32px)", fontWeight:700, letterSpacing:"-0.6px", color:"#f5f5f7", margin:"0 0 8px" }}>
                Ready to build something?
              </p>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.28)", margin:"0 0 28px" }}>Fixed pricing. Fast delivery. 50% to start.</p>
              <a href="mailto:autobitofficial.ph@gmail.com" style={{ background:"#2997ff", color:"#fff", padding:"13px 34px", borderRadius:980, fontSize:14, fontWeight:600, textDecoration:"none", boxShadow:"0 0 28px rgba(41,151,255,0.28)", display:"inline-block", transition:"all 0.22s ease" }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform="scale(1.04)"; el.style.boxShadow="0 0 48px rgba(41,151,255,0.5)"; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform="scale(1)"; el.style.boxShadow="0 0 28px rgba(41,151,255,0.28)"; }}
              >Start a project</a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Services;
