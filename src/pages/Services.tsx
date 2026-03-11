import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Illustrations ────────────────────────────────────────────────────────────

const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{ width:'100%', height:'100%', maxWidth:400 }}>
    <motion.g transform="translate(160,100)">
      <circle cx={0} cy={0} r={36} fill="rgba(41,151,255,0.08)" stroke="#2997ff" strokeWidth={1.5}/>
      <motion.g animate={active?{rotate:360}:{rotate:0}} transition={{duration:6,repeat:Infinity,ease:"linear"}}>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <rect key={i} x={-3} y={-50} width={6} height={14} rx={3} fill="#2997ff" transform={`rotate(${a})`} opacity={0.6}/>
        ))}
      </motion.g>
      <text x={0} y={7} textAnchor="middle" fontSize={20} fill="#2997ff">⚙</text>
    </motion.g>
    {[0,1,2].map(i=>(
      <motion.g key={i} animate={active?{x:[-70,108],opacity:[0,1,1,0]}:{x:-70,opacity:0}}
        transition={{duration:2,delay:i*0.65,repeat:Infinity,repeatDelay:0.4,ease:"easeInOut"}}>
        <rect x={0} y={78+i*22-22} width={38} height={24} rx={4} fill="#111" stroke="#2997ff" strokeWidth={1} strokeOpacity={0.5}/>
        <line x1={5} y1={83+i*22-22} x2={33} y2={83+i*22-22} stroke="#2997ff" strokeWidth={1} opacity={0.5}/>
        <line x1={5} y1={89+i*22-22} x2={25} y2={89+i*22-22} stroke="#2997ff" strokeWidth={1} opacity={0.3}/>
        <line x1={5} y1={95+i*22-22} x2={29} y2={95+i*22-22} stroke="#2997ff" strokeWidth={1} opacity={0.3}/>
      </motion.g>
    ))}
    {[0,1,2].map(i=>(
      <motion.g key={i} animate={active?{x:[212,290],opacity:[0,1,1,0]}:{x:212,opacity:0}}
        transition={{duration:2,delay:1.0+i*0.65,repeat:Infinity,repeatDelay:0.4,ease:"easeInOut"}}>
        <circle cx={0} cy={89+i*22-22} r={12} fill="#30d158" opacity={0.12}/>
        <path d={`M -6 ${89+i*22-22} L -2 ${94+i*22-22} L 7 ${84+i*22-22}`} stroke="#30d158" strokeWidth={2.5} strokeLinecap="round" fill="none"/>
      </motion.g>
    ))}
    <text x={35} y={185} fontSize={10} fill="rgba(255,255,255,0.18)" textAnchor="middle">Tasks in</text>
    <text x={160} y={185} fontSize={10} fill="#2997ff" textAnchor="middle">Autobit Engine</text>
    <text x={280} y={185} fontSize={10} fill="rgba(255,255,255,0.18)" textAnchor="middle">Done ✓</text>
  </svg>
);

const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const msgs = [
    {text:"Hey, I need help with my order",right:false,delay:0.2},
    {text:"Order #4821 shipped today!",right:true,delay:1.1},
    {text:"When will it arrive?",right:false,delay:2.0},
    {text:"Est. Dec 18 — tracking sent 📦",right:true,delay:2.9},
  ];
  return (
    <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{width:'100%',height:'100%',maxWidth:400}}>
      <rect x={50} y={8} width={220} height={175} rx={14} fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
      <rect x={50} y={8} width={220} height={34} rx={14} fill="#1c1c1e"/>
      <rect x={50} y={28} width={220} height={14} fill="#1c1c1e"/>
      <circle cx={74} cy={25} r={9} fill="#30d158" opacity={0.15}/>
      <circle cx={74} cy={25} r={5} fill="#30d158"/>
      <text x={90} y={29} fontSize={11} fill="#f5f5f7" fontWeight={600}>AI Support Agent</text>
      <motion.circle cx={248} cy={25} r={5} fill="#30d158"
        animate={active?{opacity:[1,0.2,1]}:{opacity:0.2}} transition={{duration:1.2,repeat:Infinity}}/>
      {msgs.map((m,i)=>{
        const y=52+i*30; const maxW=160;
        const w=Math.min(m.text.length*5+18,maxW);
        const x=m.right?260-w:60;
        return (
          <motion.g key={i} initial={{opacity:0,y:y+8}}
            animate={active?{opacity:1,y}:{opacity:0,y:y+8}}
            transition={{duration:0.4,delay:m.delay}}>
            <rect x={x} y={0} width={w} height={22} rx={11} fill={m.right?"#30d158":"#2c2c2e"}/>
            <text x={x+9} y={14} fontSize={9} fill={m.right?"#fff":"rgba(255,255,255,0.8)"}>
              {m.text.length>26?m.text.slice(0,26)+"…":m.text}
            </text>
          </motion.g>
        );
      })}
      <motion.g animate={active?{opacity:[0,1,1,0]}:{opacity:0}} transition={{duration:1,delay:1.8,repeat:Infinity,repeatDelay:2.5}}>
        <rect x={60} y={172} width={48} height={16} rx={8} fill="#2c2c2e"/>
        {[0,1,2].map(i=>(
          <motion.circle key={i} cx={72+i*11} cy={180} r={3} fill="rgba(255,255,255,0.4)"
            animate={active?{cy:[180,176,180]}:{}} transition={{duration:0.6,delay:i*0.15,repeat:Infinity}}/>
        ))}
      </motion.g>
    </svg>
  );
};

const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const bars=[55,80,42,95,68,110];
  return (
    <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{width:'100%',height:'100%',maxWidth:400}}>
      <rect x={20} y={8} width={280} height={175} rx={12} fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
      <rect x={20} y={8} width={280} height={28} rx={12} fill="#1c1c1e"/>
      <rect x={20} y={26} width={280} height={10} fill="#1c1c1e"/>
      {[0,1,2].map(i=><circle key={i} cx={34+i*14} cy={22} r={5} fill={["#ff5f57","#febc2e","#28c840"][i]}/>)}
      <rect x={88} y={14} width={144} height={16} rx={8} fill="rgba(255,255,255,0.05)"/>
      <text x={160} y={25} textAnchor="middle" fontSize={8.5} fill="rgba(255,255,255,0.22)">app.autobit.io/dashboard</text>
      {[0,1,2,3].map(i=><line key={i} x1={30} y1={152-i*28} x2={290} y2={152-i*28} stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>)}
      {bars.map((h,i)=>(
        <motion.rect key={i} x={38+i*40} rx={5} width={26} fill="#bf5af2" opacity={0.85}
          initial={{height:0,y:152}}
          animate={active?{height:h*0.88,y:152-h*0.88}:{height:0,y:152}}
          transition={{duration:0.55,delay:i*0.08,ease:"easeOut"}}/>
      ))}
      {["Jan","Feb","Mar","Apr","May","Jun"].map((l,i)=>(
        <text key={i} x={51+i*40} y={166} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.22)">{l}</text>
      ))}
      <motion.g initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.7}}>
        <rect x={222} y={36} width={58} height={22} rx={6} fill="#bf5af2"/>
        <text x={251} y={51} textAnchor="middle" fontSize={11} fill="#fff" fontWeight={700}>+34% ↑</text>
      </motion.g>
    </svg>
  );
};

const BusinessSystemsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const modules=[
    {x:40,y:55,label:"Inventory",icon:"📦"},
    {x:200,y:55,label:"HR",icon:"👥"},
    {x:40,y:128,label:"Finance",icon:"💰"},
    {x:200,y:128,label:"Schedule",icon:"📅"},
  ];
  return (
    <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{width:'100%',height:'100%',maxWidth:400}}>
      {[[92,72,200,72],[92,145,200,145],[66,88,66,128],[226,88,226,128],[92,72,200,145]].map(([x1,y1,x2,y2],i)=>(
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff9f0a" strokeWidth={1} strokeDasharray="5 5"
          initial={{opacity:0}} animate={active?{opacity:0.35}:{opacity:0}} transition={{delay:0.2+i*0.1}}/>
      ))}
      {([[92,72,200,72],[92,145,200,145],[66,88,66,128]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
        <motion.circle key={i} r={4} fill="#ff9f0a"
          animate={active?{x:[x1,x2],y:[y1,y2],opacity:[0,1,1,0]}:{opacity:0}}
          transition={{duration:1.4,delay:0.6+i*0.45,repeat:Infinity,repeatDelay:1}}/>
      ))}
      {modules.map((m,i)=>(
        <motion.g key={i} initial={{opacity:0,scale:0.85}}
          animate={active?{opacity:1,scale:1}:{opacity:0.3,scale:0.9}}
          transition={{delay:i*0.1}}
          style={{transformOrigin:`${m.x+26}px ${m.y+20}px`}}>
          <rect x={m.x} y={m.y} width={52} height={40} rx={10} fill="#1c1c1e" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.4}/>
          <text x={m.x+26} y={m.y+18} textAnchor="middle" fontSize={16}>{m.icon}</text>
          <text x={m.x+26} y={m.y+32} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.4)">{m.label}</text>
        </motion.g>
      ))}
      <motion.g initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.5}}>
        <circle cx={160} cy={100} r={22} fill="rgba(255,159,10,0.08)" stroke="#ff9f0a" strokeWidth={1} strokeOpacity={0.35}/>
        <text x={160} y={106} textAnchor="middle" fontSize={18}>🔗</text>
      </motion.g>
    </svg>
  );
};

const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{width:'100%',height:'100%',maxWidth:400}}>
    {[0,1,2,3,4].map(i=><line key={`v${i}`} x1={30+i*65} y1={10} x2={30+i*65} y2={175} stroke="rgba(255,59,48,0.05)" strokeWidth={1}/>)}
    {[0,1,2,3].map(i=><line key={`h${i}`} x1={20} y1={20+i*44} x2={300} y2={20+i*44} stroke="rgba(255,59,48,0.05)" strokeWidth={1}/>)}
    <motion.line x1={20} y1={10} x2={300} y2={10} stroke="#ff375f" strokeWidth={1.5} opacity={0.5}
      animate={active?{y1:[10,175,10],y2:[10,175,10]}:{}}
      transition={{duration:2.8,repeat:Infinity,ease:"linear"}}/>
    {[{x:35,y:28,w:75,h:56,label:"Worker detected",conf:"99%"},{x:155,y:62,w:88,h:66,label:"Hazard zone",conf:"94%"}].map((b,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.5+i*0.5}}>
        <path d={`M${b.x+10},${b.y} L${b.x},${b.y} L${b.x},${b.y+10}`} stroke="#ff375f" strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w-10},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+10}`} stroke="#ff375f" strokeWidth={2} fill="none"/>
        <path d={`M${b.x},${b.y+b.h-10} L${b.x},${b.y+b.h} L${b.x+10},${b.y+b.h}`} stroke="#ff375f" strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w},${b.y+b.h-10} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-10},${b.y+b.h}`} stroke="#ff375f" strokeWidth={2} fill="none"/>
        <rect x={b.x} y={b.y-14} width={b.w} height={13} rx={3} fill="#ff375f" opacity={0.9}/>
        <text x={b.x+5} y={b.y-4} fontSize={8.5} fill="#fff" fontWeight={600}>{b.label} · {b.conf}</text>
      </motion.g>
    ))}
    <rect x={20} y={158} width={280} height={20} rx={4} fill="rgba(255,59,48,0.06)"/>
    <text x={30} y={171} fontSize={9} fill="#ff375f" fontFamily="monospace">AXONIS EDGE · SECURE · 4 sensors · 99.98% uptime</text>
    <motion.circle cx={290} cy={168} r={5} fill="#ff375f"
      animate={active?{opacity:[1,0.2,1]}:{opacity:0.2}} transition={{duration:1,repeat:Infinity}}/>
  </svg>
);

const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 320 200" fill="none" style={{width:'100%',height:'100%',maxWidth:400}}>
    <rect x={118} y={6} width={84} height={182} rx={18} fill="#111" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5}/>
    <rect x={132} y={13} width={56} height={10} rx={5} fill="#1c1c1e"/>
    <rect x={124} y={28} width={72} height={128} rx={4} fill="#0a0a0a"/>
    {[0,1,2,3,4,5].map(i=>(
      <rect key={i} x={130+(i%3)*20} y={34+Math.floor(i/3)*22} width={14} height={14} rx={4}
        fill={["#2997ff","#30d158","#ff9f0a","#bf5af2","#ff375f","#64d2ff"][i]} opacity={0.75}/>
    ))}
    <rect x={134} y={150} width={52} height={4} rx={2} fill="rgba(255,255,255,0.1)"/>
    <rect x={143} y={183} width={34} height={3} rx={2} fill="rgba(255,255,255,0.15)"/>
    {[
      {icon:"📬",title:"New client message",delay:0.4},
      {icon:"✅",title:"Task completed",delay:1.4},
      {icon:"📊",title:"Revenue up 23%",delay:2.4},
    ].map((n,i)=>(
      <motion.g key={i}
        animate={active?{x:[320,0,0,320],opacity:[0,1,1,0]}:{x:320,opacity:0}}
        transition={{delay:n.delay,duration:3.5,times:[0,0.12,0.75,1],repeat:Infinity,repeatDelay:2,ease:"easeOut"}}>
        <rect x={-185} y={56+i*38} width={190} height={32} rx={10} fill="#1c1c1e" stroke="rgba(255,255,255,0.08)" strokeWidth={1}/>
        <text x={-178} y={75+i*38} fontSize={15}>{n.icon}</text>
        <text x={-157} y={68+i*38} fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit</text>
        <text x={-157} y={80+i*38} fontSize={8} fill="rgba(255,255,255,0.4)">{n.title}</text>
      </motion.g>
    ))}
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { id:"automation", eyebrow:"Workflow Automation", heading:"Eliminate\nmanual work.", desc:"Zapier, Make, n8n pipelines that remove repetitive tasks from your operation — automatically.", price:"From $800", timeline:"2–5 days", accent:"#2997ff", Art:AutomationArt },
  { id:"ai-agents",  eyebrow:"AI Agents",           heading:"Custom AI\nthat works 24/7.", desc:"Purpose-built agents for customer support, lead qualification, and internal operations.", price:"From $1,200", timeline:"5–10 days", accent:"#30d158", Art:AIAgentsArt },
  { id:"web-apps",   eyebrow:"Web Applications",    heading:"Dashboards,\nCRMs, and SaaS.", desc:"React, Firebase, Vercel. Full-stack web apps built for speed, scale, and clean UX.", price:"From $1,500", timeline:"7–14 days", accent:"#bf5af2", Art:WebAppsArt },
  { id:"systems",    eyebrow:"Business Systems",    heading:"One system.\nYour entire operation.", desc:"Inventory, HR, finance, scheduling — end-to-end software unified in one platform.", price:"From $3,000", timeline:"14–30 days", accent:"#ff9f0a", Art:BusinessSystemsArt },
  { id:"robotics",   eyebrow:"Robotics & Physical AI", heading:"Edge AI.\nIndustrial-grade.", desc:"PLC integration, computer vision, and embedded AI for physical and industrial environments.", price:"From $3,000", timeline:"14–30 days", accent:"#ff375f", Art:RoboticsArt },
  { id:"mobile",     eyebrow:"Mobile Applications", heading:"iOS + Android.\nShipped fast.", desc:"React Native mobile apps — cross-platform, performant, and production-ready.", price:"From $2,000", timeline:"10–21 days", accent:"#64d2ff", Art:MobileArt },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  // animKey increments every time a section becomes active → forces SVG remount → resets animation
  const [animKeys, setAnimKeys] = useState(() => services.map(() => 0));
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
            setAnimKeys(prev => prev.map((k, ki) => ki === i ? k + 1 : k));
          }
        },
        { threshold: 0.45 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main style={{ filter:navDropdownActive?'blur(8px)':'none', opacity:navDropdownActive?0.45:1, transition:'filter 0.28s ease, opacity 0.28s ease' }}>

        {/* ── Minimal Hero ── */}
        <section style={{ background:'#000', padding:'130px 0 64px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="section-container">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:[0.25,0.1,0.25,1]}}>
              <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:'rgba(255,255,255,0.3)', display:'block', marginBottom:'16px' }}>
                What we build
              </span>
              <h1 style={{ fontSize:'clamp(40px,5.5vw,72px)', fontWeight:700, letterSpacing:'-2px', lineHeight:1.05, color:'#f5f5f7', margin:'0 0 20px', maxWidth:700 }}>
                Services
              </h1>
              <p style={{ fontSize:'clamp(15px,1.4vw,18px)', color:'rgba(255,255,255,0.35)', margin:0, maxWidth:480, lineHeight:1.6 }}>
                Six capabilities. Scroll through each one.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Service Sections ── */}
        {services.map((s, i) => {
          const { Art } = s;
          const isActive = activeIndex === i;
          return (
            <section
              key={s.id}
              id={s.id}
              ref={el => { sectionRefs.current[i] = el; }}
              style={{
                minHeight:'100vh',
                background:'#000',
                display:'flex',
                alignItems:'center',
                position:'relative',
                borderTop:'1px solid rgba(255,255,255,0.04)',
                overflow:'hidden',
                padding:'48px 0',
              }}
            >
              {/* Background accent glow */}
              <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                background:`radial-gradient(ellipse 60% 50% at 70% 50%, ${s.accent}0a 0%, transparent 70%)`,
                transition:'opacity 0.6s ease',
                opacity: isActive ? 1 : 0,
              }}/>

              {/* Large faint number */}
              <div style={{
                position:'absolute', top:'50%', right:'3vw',
                transform:'translateY(-50%)',
                fontSize:'clamp(100px,16vw,200px)',
                fontWeight:800, color:s.accent, opacity:0.04,
                userSelect:'none', pointerEvents:'none', lineHeight:1, letterSpacing:'-0.06em',
              }}>
                {String(i+1).padStart(2,'0')}
              </div>

              <div className="section-container" style={{width:'100%'}}>
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'1fr 1fr',
                  gap:'48px',
                  alignItems:'center',
                }}>
                  {/* Left: Text */}
                  <motion.div
                    initial={{opacity:0,x:-24}}
                    whileInView={{opacity:1,x:0}}
                    viewport={{once:false, amount:0.4}}
                    transition={{duration:0.65,ease:[0.25,0.1,0.25,1]}}
                  >
                    <span style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:s.accent, display:'block', marginBottom:'16px' }}>
                      {String(i+1).padStart(2,'0')} / {String(services.length).padStart(2,'0')} — {s.eyebrow}
                    </span>

                    <h2 style={{
                      fontSize:'clamp(32px,4vw,58px)',
                      fontWeight:700, letterSpacing:'-1.5px', lineHeight:1.08,
                      color:'#f5f5f7', margin:'0 0 20px', whiteSpace:'pre-line',
                    }}>
                      {s.heading}
                    </h2>

                    <p style={{ fontSize:'clamp(14px,1.3vw,16px)', lineHeight:1.65, color:'rgba(255,255,255,0.42)', margin:'0 0 32px', maxWidth:380 }}>
                      {s.desc}
                    </p>

                    <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
                      {/* Price pill */}
                      <div style={{
                        background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.08)',
                        borderRadius:'12px', padding:'12px 18px',
                        backdropFilter:'blur(8px)',
                      }}>
                        <div style={{ fontSize:'20px', fontWeight:700, color:'#f5f5f7', letterSpacing:'-0.5px', lineHeight:1 }}>{s.price}</div>
                        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.28)', marginTop:'3px' }}>{s.timeline} delivery</div>
                      </div>
                      {/* CTA */}
                      <a href="mailto:autobitofficial.ph@gmail.com" style={{
                        background:s.accent, color:'#fff', padding:'13px 26px',
                        borderRadius:'980px', fontSize:'14px', fontWeight:600,
                        textDecoration:'none', display:'inline-block',
                        transition:'all 0.25s ease',
                        boxShadow:`0 4px 24px ${s.accent}44`,
                      }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='scale(1.04)';(e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 8px 40px ${s.accent}66`;}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='scale(1)';(e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 4px 24px ${s.accent}44`;}}
                      >
                        Get a quote →
                      </a>
                    </div>
                  </motion.div>

                  {/* Right: Glass illustration card */}
                  <motion.div
                    initial={{opacity:0,x:24}}
                    whileInView={{opacity:1,x:0}}
                    viewport={{once:false, amount:0.4}}
                    transition={{duration:0.65,delay:0.1,ease:[0.25,0.1,0.25,1]}}
                  >
                    {/* Outer glow ring */}
                    <div style={{
                      borderRadius:'28px',
                      padding:'1px',
                      background:`linear-gradient(135deg, ${s.accent}44 0%, transparent 50%, ${s.accent}22 100%)`,
                      boxShadow:`0 0 0 1px rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.5), 0 8px 24px ${s.accent}22`,
                    }}>
                      {/* Glass card */}
                      <div style={{
                        borderRadius:'27px',
                        background:'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04) 100%)',
                        backdropFilter:'blur(24px)',
                        WebkitBackdropFilter:'blur(24px)',
                        border:'1px solid rgba(255,255,255,0.06)',
                        padding:'32px',
                        height:'340px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        position:'relative',
                        overflow:'hidden',
                      }}>
                        {/* Inner top highlight */}
                        <div style={{
                          position:'absolute', top:0, left:'10%', right:'10%', height:'1px',
                          background:`linear-gradient(90deg, transparent, ${s.accent}66, transparent)`,
                        }}/>
                        {/* Inner subtle grain */}
                        <div style={{
                          position:'absolute', inset:0, borderRadius:'27px',
                          background:'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)',
                          pointerEvents:'none',
                        }}/>
                        <Art active={isActive} animKey={animKeys[i]} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Prev / Next — minimal text links only, no dots */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'40px' }}>
                  <button onClick={()=>i>0&&sectionRefs.current[i-1]?.scrollIntoView({behavior:'smooth',block:'start'})}
                    style={{ fontSize:'12px', color:i>0?'rgba(255,255,255,0.28)':'transparent', background:'none', border:'none', cursor:i>0?'pointer':'default', padding:0, letterSpacing:'0.02em', transition:'color 0.2s' }}
                    onMouseEnter={e=>i>0&&((e.currentTarget as HTMLButtonElement).style.color='rgba(255,255,255,0.6)')}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color=i>0?'rgba(255,255,255,0.28)':'transparent';}}>
                    ← {i>0?services[i-1].eyebrow:''}
                  </button>
                  <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.18)', letterSpacing:'0.06em' }}>
                    {String(i+1).padStart(2,'0')} / {String(services.length).padStart(2,'0')}
                  </span>
                  <button onClick={()=>i<services.length-1&&sectionRefs.current[i+1]?.scrollIntoView({behavior:'smooth',block:'start'})}
                    style={{ fontSize:'12px', color:i<services.length-1?'rgba(255,255,255,0.28)':'transparent', background:'none', border:'none', cursor:i<services.length-1?'pointer':'default', padding:0, letterSpacing:'0.02em', transition:'color 0.2s' }}
                    onMouseEnter={e=>i<services.length-1&&((e.currentTarget as HTMLButtonElement).style.color='rgba(255,255,255,0.6)')}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color=i<services.length-1?'rgba(255,255,255,0.28)':'transparent';}}>
                    {i<services.length-1?services[i+1].eyebrow:''} →
                  </button>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── Bottom CTA ── */}
        <section style={{ background:'#000', borderTop:'1px solid rgba(255,255,255,0.05)', padding:'80px 0' }}>
          <div className="section-container" style={{ textAlign:'center' }}>
            <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <p style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:700, letterSpacing:'-0.6px', color:'#f5f5f7', margin:'0 0 10px' }}>
                Ready to build something?
              </p>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.3)', margin:'0 0 32px' }}>
                Fixed pricing. Fast delivery. 50% to start.
              </p>
              <a href="mailto:autobitofficial.ph@gmail.com" style={{ background:'#2997ff', color:'#fff', padding:'15px 38px', borderRadius:'980px', fontSize:'15px', fontWeight:600, textDecoration:'none', boxShadow:'0 0 32px rgba(41,151,255,0.28)', display:'inline-block', transition:'all 0.25s ease' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='scale(1.04)';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 0 56px rgba(41,151,255,0.5)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='scale(1)';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 0 32px rgba(41,151,255,0.28)';}}>
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
