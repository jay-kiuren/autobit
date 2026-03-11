import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Animated Illustrations ───────────────────────────────────────────────────

const AutomationArt = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 420 }}>
    <motion.g transform="translate(160,100)">
      <motion.circle cx={0} cy={0} r={36} fill="rgba(41,151,255,0.08)" stroke="#2997ff" strokeWidth={1.5} />
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <motion.rect key={i} x={-3} y={-50} width={6} height={14} rx={3} fill="#2997ff" transform={`rotate(${angle})`} opacity={0.6} />
        ))}
      </motion.g>
      <text x={0} y={6} textAnchor="middle" fontSize={20} fill="#2997ff">⚙</text>
    </motion.g>
    {[0,1,2].map(i => (
      <motion.g key={i}
        animate={active ? { x: [-80, 110], opacity: [0, 1, 1, 0] } : { x: -80, opacity: 0 }}
        transition={{ duration: 2, delay: i * 0.65, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      >
        <rect x={0} y={78 + i * 22 - 22} width={40} height={26} rx={4} fill="#111" stroke="#2997ff" strokeWidth={1} strokeOpacity={0.5} />
        <line x1={6} y1={84 + i * 22 - 22} x2={34} y2={84 + i * 22 - 22} stroke="#2997ff" strokeWidth={1} opacity={0.5} />
        <line x1={6} y1={90 + i * 22 - 22} x2={26} y2={90 + i * 22 - 22} stroke="#2997ff" strokeWidth={1} opacity={0.3} />
        <line x1={6} y1={96 + i * 22 - 22} x2={30} y2={96 + i * 22 - 22} stroke="#2997ff" strokeWidth={1} opacity={0.3} />
      </motion.g>
    ))}
    {[0,1,2].map(i => (
      <motion.g key={i}
        animate={active ? { x: [210, 290], opacity: [0, 1, 1, 0] } : { x: 210, opacity: 0 }}
        transition={{ duration: 2, delay: 1.0 + i * 0.65, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      >
        <circle cx={0} cy={89 + i * 22 - 22} r={13} fill="#30d158" opacity={0.12} />
        <path d={`M -6 ${89 + i * 22 - 22} L -2 ${94 + i * 22 - 22} L 7 ${84 + i * 22 - 22}`} stroke="#30d158" strokeWidth={2.5} strokeLinecap="round" fill="none" />
      </motion.g>
    ))}
    <text x={40} y={185} fontSize={11} fill="rgba(255,255,255,0.2)" textAnchor="middle">Tasks in</text>
    <text x={160} y={185} fontSize={11} fill="#2997ff" textAnchor="middle">Autobit Engine</text>
    <text x={280} y={185} fontSize={11} fill="rgba(255,255,255,0.2)" textAnchor="middle">Done ✓</text>
  </svg>
);

const AIAgentsArt = ({ active }: { active: boolean }) => {
  const msgs = [
    { text: "Hey, I need help with my order", right: false, delay: 0.2 },
    { text: "Order #4821 shipped today!", right: true, delay: 1.2 },
    { text: "When will it arrive?", right: false, delay: 2.2 },
    { text: "Est. Dec 18 — tracking sent 📦", right: true, delay: 3.2 },
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 420 }}>
      <rect x={50} y={10} width={220} height={170} rx={14} fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      <rect x={50} y={10} width={220} height={36} rx={14} fill="#1c1c1e" />
      <rect x={50} y={32} width={220} height={14} fill="#1c1c1e" />
      <circle cx={74} cy={28} r={10} fill="#30d158" opacity={0.15} />
      <circle cx={74} cy={28} r={6} fill="#30d158" />
      <text x={90} y={32} fontSize={11} fill="#f5f5f7" fontWeight={600}>AI Support Agent</text>
      <motion.circle cx={248} cy={28} r={5} fill="#30d158"
        animate={active ? { opacity: [1, 0.2, 1] } : { opacity: 0.2 }}
        transition={{ duration: 1.2, repeat: Infinity }} />
      {msgs.map((m, i) => {
        const y = 58 + i * 30;
        const maxW = 160;
        const w = Math.min(m.text.length * 5.2 + 18, maxW);
        const x = m.right ? 260 - w : 60;
        return (
          <motion.g key={i}
            initial={{ opacity: 0, y: y + 10 }}
            animate={active ? { opacity: 1, y } : { opacity: 0, y: y + 10 }}
            transition={{ duration: 0.4, delay: m.delay }}
          >
            <rect x={x} y={0} width={w} height={22} rx={11} fill={m.right ? "#30d158" : "#2c2c2e"} />
            <text x={x + 9} y={14} fontSize={9} fill={m.right ? "#fff" : "rgba(255,255,255,0.8)"}>
              {m.text.length > 26 ? m.text.slice(0, 26) + "…" : m.text}
            </text>
          </motion.g>
        );
      })}
      <motion.g animate={active ? { opacity: [0,1,1,0] } : { opacity: 0 }} transition={{ duration: 1, delay: 1.8, repeat: Infinity, repeatDelay: 2.5 }}>
        <rect x={60} y={174} width={48} height={16} rx={8} fill="#2c2c2e" />
        {[0,1,2].map(i => (
          <motion.circle key={i} cx={72 + i * 11} cy={182} r={3} fill="rgba(255,255,255,0.4)"
            animate={active ? { cy: [182, 178, 182] } : {}}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
        ))}
      </motion.g>
    </svg>
  );
};

const WebAppsArt = ({ active }: { active: boolean }) => {
  const bars = [55, 80, 42, 95, 68, 110];
  const labels = ["Jan","Feb","Mar","Apr","May","Jun"];
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 420 }}>
      <rect x={20} y={10} width={280} height={175} rx={12} fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      <rect x={20} y={10} width={280} height={30} rx={12} fill="#1c1c1e" />
      <rect x={20} y={28} width={280} height={12} fill="#1c1c1e" />
      {[0,1,2].map(i => <circle key={i} cx={36 + i*16} cy={25} r={5} fill={["#ff5f57","#febc2e","#28c840"][i]} />)}
      <rect x={90} y={17} width={140} height={16} rx={8} fill="rgba(255,255,255,0.05)" />
      <text x={160} y={28} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.25)">app.autobit.io/dashboard</text>
      {[0,1,2,3].map(i => <line key={i} x1={30} y1={155 - i*28} x2={290} y2={155 - i*28} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />)}
      {bars.map((h, i) => (
        <motion.rect key={i}
          x={40 + i * 40} rx={5} width={26} fill="#bf5af2" opacity={0.85}
          initial={{ height: 0, y: 155 }}
          animate={active ? { height: h * 0.9, y: 155 - h * 0.9 } : { height: 0, y: 155 }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
        />
      ))}
      {labels.map((l, i) => <text key={i} x={53 + i * 40} y={168} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.25)">{l}</text>)}
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.7 }}>
        <rect x={224} y={38} width={56} height={22} rx={6} fill="#bf5af2" />
        <text x={252} y={53} textAnchor="middle" fontSize={11} fill="#fff" fontWeight={700}>+34% ↑</text>
      </motion.g>
    </svg>
  );
};

const BusinessSystemsArt = ({ active }: { active: boolean }) => {
  const modules = [
    { x: 40,  y: 60,  label: "Inventory", icon: "📦" },
    { x: 200, y: 60,  label: "HR",        icon: "👥" },
    { x: 40,  y: 130, label: "Finance",   icon: "💰" },
    { x: 200, y: 130, label: "Schedule",  icon: "📅" },
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 420 }}>
      {[[92,77,200,77],[92,147,200,147],[66,92,66,130],[226,92,226,130],[92,77,200,147]].map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff9f0a" strokeWidth={1} strokeDasharray="5 5"
          initial={{ opacity: 0 }} animate={active ? { opacity: 0.35 } : { opacity: 0 }} transition={{ delay: 0.2 + i * 0.1 }} />
      ))}
      {[[92,77,200,77],[92,147,200,147],[66,92,66,130]].map(([x1,y1,x2,y2], i) => (
        <motion.circle key={i} r={4} fill="#ff9f0a"
          animate={active ? { x: [x1,x2], y: [y1,y2], opacity: [0,1,1,0] } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.6 + i * 0.45, repeat: Infinity, repeatDelay: 1 }} />
      ))}
      {modules.map((m, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }}
          transition={{ delay: i * 0.1 }}
          style={{ transformOrigin: `${m.x + 26}px ${m.y + 20}px` }}
        >
          <rect x={m.x} y={m.y} width={52} height={40} rx={10} fill="#1c1c1e" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.45} />
          <text x={m.x + 26} y={m.y + 18} textAnchor="middle" fontSize={16}>{m.icon}</text>
          <text x={m.x + 26} y={m.y + 32} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.45)">{m.label}</text>
        </motion.g>
      ))}
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }}>
        <circle cx={160} cy={103} r={22} fill="rgba(255,159,10,0.08)" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.4} />
        <text x={160} y={108} textAnchor="middle" fontSize={18}>🔗</text>
      </motion.g>
      <text x={160} y={185} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.2)">All modules unified — one platform</text>
    </svg>
  );
};

const RoboticsArt = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 420 }}>
    {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={30 + i*65} y1={10} x2={30 + i*65} y2={180} stroke="rgba(255,59,48,0.05)" strokeWidth={1} />)}
    {[0,1,2,3].map(i => <line key={`h${i}`} x1={20} y1={20 + i*45} x2={300} y2={20 + i*45} stroke="rgba(255,59,48,0.05)" strokeWidth={1} />)}
    <motion.line x1={20} y1={10} x2={300} y2={10} stroke="#ff375f" strokeWidth={1.5} opacity={0.5}
      animate={active ? { y1:[10,180,10], y2:[10,180,10] } : {}}
      transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }} />
    {[
      { x:35, y:30, w:75, h:58, label:"Worker detected", conf:"99%" },
      { x:155, y:65, w:90, h:68, label:"Hazard zone", conf:"94%" },
    ].map((b,i) => (
      <motion.g key={i} initial={{ opacity:0 }} animate={active ? { opacity:1 } : { opacity:0 }} transition={{ delay: 0.5 + i*0.5 }}>
        <path d={`M${b.x+10},${b.y} L${b.x},${b.y} L${b.x},${b.y+10}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${b.x+b.w-10},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+10}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${b.x},${b.y+b.h-10} L${b.x},${b.y+b.h} L${b.x+10},${b.y+b.h}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <path d={`M${b.x+b.w},${b.y+b.h-10} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-10},${b.y+b.h}`} stroke="#ff375f" strokeWidth={2} fill="none" />
        <rect x={b.x} y={b.y-15} width={b.w} height={14} rx={3} fill="#ff375f" opacity={0.9} />
        <text x={b.x+5} y={b.y-4} fontSize={8.5} fill="#fff" fontWeight={600}>{b.label} · {b.conf}</text>
      </motion.g>
    ))}
    <rect x={20} y={162} width={280} height={20} rx={4} fill="rgba(255,59,48,0.06)" />
    <text x={30} y={175} fontSize={9} fill="#ff375f" fontFamily="monospace">AXONIS EDGE · SECURE · 4 sensors · 99.98% uptime</text>
    <motion.circle cx={290} cy={172} r={5} fill="#ff375f"
      animate={active ? { opacity:[1,0.2,1] } : { opacity:0.2 }}
      transition={{ duration: 1, repeat: Infinity }} />
  </svg>
);

const MobileArt = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 420 }}>
    <rect x={115} y={8} width={90} height={180} rx={18} fill="#111" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
    <rect x={130} y={15} width={60} height={10} rx={5} fill="#1c1c1e" />
    <rect x={121} y={30} width={78} height={130} rx={4} fill="#0a0a0a" />
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={127 + (i%3)*22} y={36 + Math.floor(i/3)*22} width={16} height={16} rx={5}
        fill={["#2997ff","#30d158","#ff9f0a","#bf5af2","#ff375f","#64d2ff"][i]} opacity={0.75} />
    ))}
    <rect x={131} y={152} width={58} height={5} rx={3} fill="rgba(255,255,255,0.12)" />
    <rect x={140} y={182} width={40} height={4} rx={2} fill="rgba(255,255,255,0.18)" />
    {[
      { icon:"📬", title:"New client message", delay:0.4 },
      { icon:"✅", title:"Task completed", delay:1.4 },
      { icon:"📊", title:"Revenue up 23%", delay:2.4 },
    ].map((n,i) => (
      <motion.g key={i}
        initial={{ x: 320, opacity: 0 }}
        animate={active ? { x: 0, opacity: 1 } : { x: 320, opacity: 0 }}
        transition={{ delay: n.delay, duration: 0.45, ease: "easeOut" }}
      >
        <motion.g animate={active ? { x: [0,0,320], opacity:[1,1,0] } : {}}
          transition={{ delay: n.delay + 0.1, duration: 3, times:[0,0.6,1], repeat: Infinity, repeatDelay: 3.5 }}>
          <rect x={-185} y={58 + i*38} width={195} height={32} rx={10} fill="#1c1c1e" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={-178} y={77 + i*38} fontSize={16}>{n.icon}</text>
          <text x={-156} y={70 + i*38} fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit</text>
          <text x={-156} y={82 + i*38} fontSize={8} fill="rgba(255,255,255,0.45)">{n.title}</text>
        </motion.g>
      </motion.g>
    ))}
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { id:"automation", eyebrow:"Workflow Automation", heading:"Eliminate\nmanual work.", desc:"Zapier, Make, n8n pipelines. We design and deploy automation systems that remove repetitive tasks from your operation.", price:"From $800", timeline:"2–5 days", accent:"#2997ff", Art: AutomationArt },
  { id:"ai-agents",  eyebrow:"AI Agents",           heading:"Custom AI\nthat works 24/7.", desc:"Purpose-built AI agents for customer support, lead qualification, data processing, and internal operations.", price:"From $1,200", timeline:"5–10 days", accent:"#30d158", Art: AIAgentsArt },
  { id:"web-apps",   eyebrow:"Web Applications",    heading:"Dashboards,\nCRMs, and SaaS.", desc:"React, Firebase, Vercel. Full-stack web applications built for speed, scale, and clean UX.", price:"From $1,500", timeline:"7–14 days", accent:"#bf5af2", Art: WebAppsArt },
  { id:"systems",    eyebrow:"Business Systems",    heading:"One system.\nYour entire operation.", desc:"End-to-end operational software — inventory, HR, finance, scheduling — unified in one platform.", price:"From $3,000", timeline:"14–30 days", accent:"#ff9f0a", Art: BusinessSystemsArt },
  { id:"robotics",   eyebrow:"Robotics & Physical AI", heading:"Edge AI.\nIndustrial-grade.", desc:"PLC integration, sensor fusion, computer vision, and embedded AI for physical systems and industrial environments.", price:"From $3,000", timeline:"14–30 days", accent:"#ff375f", Art: RoboticsArt },
  { id:"mobile",     eyebrow:"Mobile Applications", heading:"iOS + Android.\nShipped fast.", desc:"React Native mobile apps — cross-platform, performant, and production-ready.", price:"From $2,000", timeline:"10–21 days", accent:"#64d2ff", Art: MobileArt },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which section is in view
  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.55 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main style={{ filter: navDropdownActive ? 'blur(8px)' : 'none', opacity: navDropdownActive ? 0.45 : 1, transition: 'filter 0.28s ease, opacity 0.28s ease' }}>

        {/* Intro header section */}
        <section style={{ background: '#000', minHeight: '40vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '48px', paddingTop: '120px' }}>
          <div className="section-container">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25,0.1,0.25,1] }}
              style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, letterSpacing: '-0.8px', lineHeight: 1.2, color: '#f5f5f7', margin: 0, maxWidth: 640 }}
            >
              What we build.{' '}
              <span style={{ color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>
                Scroll through each service.
              </span>
            </motion.p>
          </div>
        </section>

        {/* Full-screen service sections */}
        {services.map((s, i) => {
          const { Art } = s;
          return (
            <section
              key={s.id}
              id={s.id}
              ref={el => { sectionRefs.current[i] = el; }}
              style={{
                minHeight: '100vh',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
              }}
            >
              {/* Large faint number */}
              <div style={{
                position: 'absolute', top: '50%', right: '5vw',
                transform: 'translateY(-50%)',
                fontSize: 'clamp(120px,18vw,220px)',
                fontWeight: 800, letterSpacing: '-0.06em',
                color: s.accent, opacity: 0.04,
                userSelect: 'none', pointerEvents: 'none',
                lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="section-container" style={{ width: '100%' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '64px',
                  alignItems: 'center',
                  minHeight: '80vh',
                }}>
                  {/* Left: Text */}
                  <motion.div
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.25,0.1,0.25,1] }}
                  >
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: s.accent, marginBottom: '20px' }}>
                      {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')} — {s.eyebrow}
                    </span>

                    <h2 style={{
                      fontSize: 'clamp(36px,4.5vw,64px)',
                      fontWeight: 700,
                      letterSpacing: '-1.5px',
                      lineHeight: 1.08,
                      color: '#f5f5f7',
                      margin: '0 0 24px',
                      whiteSpace: 'pre-line',
                    }}>
                      {s.heading}
                    </h2>

                    <p style={{ fontSize: 'clamp(15px,1.4vw,17px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', margin: '0 0 36px', maxWidth: 400 }}>
                      {s.desc}
                    </p>

                    {/* Price + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 20px' }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.price}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{s.timeline} delivery</div>
                      </div>
                      <a href="mailto:autobitofficial.ph@gmail.com" style={{
                        background: s.accent, color: '#fff', padding: '14px 28px',
                        borderRadius: '980px', fontSize: '15px', fontWeight: 600,
                        textDecoration: 'none', transition: 'all 0.25s ease',
                        boxShadow: `0 0 28px ${s.accent}33`,
                        display: 'inline-block',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 48px ${s.accent}66`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 28px ${s.accent}33`; }}
                      >
                        Get a quote →
                      </a>
                    </div>
                  </motion.div>

                  {/* Right: Illustration */}
                  <motion.div
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.25,0.1,0.25,1] }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '380px' }}
                  >
                    <div style={{
                      width: '100%', height: '100%',
                      background: `radial-gradient(ellipse at center, ${s.accent}0d 0%, transparent 70%)`,
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '32px',
                    }}>
                      <Art active={activeIndex === i} />
                    </div>
                  </motion.div>
                </div>

                {/* Nav: prev / next */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '48px' }}>
                  <button
                    onClick={() => i > 0 && scrollTo(i - 1)}
                    style={{ fontSize: '13px', color: i > 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)', background: 'none', border: 'none', cursor: i > 0 ? 'pointer' : 'default', padding: 0, transition: 'color 0.2s' }}
                    onMouseEnter={e => i > 0 && ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = i > 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)'}
                  >
                    ← {i > 0 ? services[i - 1].eyebrow : ''}
                  </button>

                  {/* Dots */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {services.map((_, di) => (
                      <button key={di} onClick={() => scrollTo(di)} style={{
                        width: di === i ? '20px' : '6px', height: '6px',
                        borderRadius: '3px', background: di === i ? s.accent : 'rgba(255,255,255,0.2)',
                        border: 'none', cursor: 'pointer', padding: 0,
                        transition: 'all 0.3s ease',
                      }} />
                    ))}
                  </div>

                  <button
                    onClick={() => i < services.length - 1 && scrollTo(i + 1)}
                    style={{ fontSize: '13px', color: i < services.length - 1 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)', background: 'none', border: 'none', cursor: i < services.length - 1 ? 'pointer' : 'default', padding: 0, transition: 'color 0.2s' }}
                    onMouseEnter={e => i < services.length - 1 && ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = i < services.length - 1 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)'}
                  >
                    {i < services.length - 1 ? services[i + 1].eyebrow : ''} →
                  </button>
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
          <div className="section-container" style={{ textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, letterSpacing: '-0.6px', color: '#f5f5f7', margin: '0 0 12px' }}>
                Ready to build something?
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.35)', margin: '0 0 36px' }}>
                Fixed pricing. Fast delivery. 50% to start.
              </p>
              <a href="mailto:autobitofficial.ph@gmail.com" style={{ background: '#2997ff', color: '#fff', padding: '16px 40px', borderRadius: '980px', fontSize: '16px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 32px rgba(41,151,255,0.28)', display: 'inline-block', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 56px rgba(41,151,255,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(41,151,255,0.28)'; }}
              >
                Start a project
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Services;
