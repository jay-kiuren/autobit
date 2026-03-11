import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Illustrations ─────────────────────────────────────────────────────────

// 1. Automation — n8n/Zapier workflow builder style
const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="ab" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2997ff" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#2997ff" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Background grid */}
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*84} y1={0} x2={i*84} y2={240} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3].map(i=><line key={`h${i}`} x1={0} y1={i*60} x2={420} y2={i*60} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {/* Nodes */}
    {[
      { x:30,  y:95,  icon:"📨", label:"Email Trigger", color:"#2997ff" },
      { x:155, y:60,  icon:"🔍", label:"Filter",        color:"#2997ff" },
      { x:155, y:130, icon:"⏱",  label:"Schedule",      color:"#64d2ff" },
      { x:280, y:95,  icon:"⚙️", label:"Transform",     color:"#2997ff" },
      { x:360, y:95,  icon:"✅", label:"Done",           color:"#30d158" },
    ].map((n,i)=>(
      <motion.g key={i} initial={{opacity:0,scale:0.7}} animate={active?{opacity:1,scale:1}:{opacity:0,scale:0.7}}
        transition={{delay:i*0.12,duration:0.4}}>
        <rect x={n.x} y={n.y} width={72} height={44} rx={10}
          fill="rgba(255,255,255,0.04)" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.6}/>
        <rect x={n.x} y={n.y} width={72} height={44} rx={10} fill={`${n.color}0d`}/>
        <text x={n.x+36} y={n.y+16} textAnchor="middle" fontSize={14}>{n.icon}</text>
        <text x={n.x+36} y={n.y+34} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.5)">{n.label}</text>
      </motion.g>
    ))}
    {/* Arrows */}
    {[
      [102,117,155,82],[102,117,155,152],[227,117,280,117],[352,117,360,117]
    ].map(([x1,y1,x2,y2],i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.7+i*0.1}}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2997ff" strokeWidth={1.5} strokeOpacity={0.4} strokeDasharray="4 3"/>
        <circle cx={x2} cy={y2} r={3} fill="#2997ff" opacity={0.6}/>
      </motion.g>
    ))}
    {/* Animated dot traveling */}
    <motion.circle r={4} fill="#2997ff"
      animate={active ? { x:[30,155,280,360], y:[117,82,117,117], opacity:[0,1,1,0] } : {opacity:0}}
      transition={{duration:2.5,repeat:Infinity,repeatDelay:0.8,ease:"linear"}}/>
    {/* Stats bar */}
    <rect x={10} y={200} width={400} height={28} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    {[
      {x:20,  label:"Runs today", val:"1,284"},
      {x:140, label:"Success rate", val:"99.8%"},
      {x:260, label:"Time saved", val:"48h"},
      {x:360, label:"Errors", val:"0"},
    ].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.9+i*0.1}}>
        <text x={s.x} y={211} fontSize={7} fill="rgba(255,255,255,0.3)">{s.label}</text>
        <text x={s.x} y={223} fontSize={9} fill="#2997ff" fontWeight={700}>{s.val}</text>
      </motion.g>
    ))}
  </svg>
);

// 2. AI Agents — real chat UI
const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const msgs = [
    { t:"User: I need to reschedule my appointment", r:false, d:0.2 },
    { t:"Agent: Sure! I found 3 open slots for you.", r:true,  d:0.9 },
    { t:"User: Tomorrow 3PM works best",             r:false, d:1.7 },
    { t:"Agent: Done ✓ Confirmation sent to email.", r:true,  d:2.5 },
  ];
  return (
    <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%",height:"100%" }}>
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#30d158" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#30d158" stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      {/* Window chrome */}
      <rect x={10} y={0} width={400} height={240} rx={14} fill="rgba(20,20,20,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
      <rect x={10} y={0} width={400} height={42} rx={14} fill="rgba(255,255,255,0.04)"/>
      <rect x={10} y={30} width={400} height={12} fill="rgba(255,255,255,0.04)"/>
      {/* Avatar + name */}
      <circle cx={38} cy={21} r={12} fill="url(#ag1)" stroke="#30d158" strokeWidth={1.5}/>
      <text x={38} y={25} textAnchor="middle" fontSize={12}>🤖</text>
      <text x={58} y={16} fontSize={11} fill="#f5f5f7" fontWeight={600}>Autobit AI Agent</text>
      <text x={58} y={28} fontSize={8.5} fill="#30d158">● Online · 0ms response</text>
      {/* Messages */}
      {msgs.map((m,i)=>{
        const y = 52+i*44;
        const maxW = 260;
        const chars = m.t.length;
        const w = Math.min(chars*5.4+24, maxW);
        const x = m.r ? 400-w-14 : 18;
        return(
          <motion.g key={i} initial={{opacity:0,y:y+10}}
            animate={active?{opacity:1,y}:{opacity:0,y:y+10}}
            transition={{duration:0.45,delay:m.d}}>
            <rect x={x} y={0} width={w} height={32} rx={10}
              fill={m.r?"rgba(48,209,88,0.18)":"rgba(255,255,255,0.06)"}
              stroke={m.r?"rgba(48,209,88,0.3)":"rgba(255,255,255,0.08)"} strokeWidth={1}/>
            <text x={x+12} y={20} fontSize={8.5} fill={m.r?"#d4fad4":"rgba(255,255,255,0.75)"}>
              {m.t.length>42?m.t.slice(0,42)+"…":m.t}
            </text>
          </motion.g>
        );
      })}
      {/* Typing indicator */}
      <motion.g animate={active?{opacity:[0,1,0]}:{opacity:0}} transition={{delay:3.2,duration:1.2,repeat:Infinity,repeatDelay:2}}>
        <rect x={18} y={228} width={52} height={10} rx={5} fill="rgba(255,255,255,0.07)"/>
        {[0,1,2].map(i=>(
          <motion.circle key={i} cx={32+i*10} cy={233} r={2.5} fill="#30d158"
            animate={active?{cy:[233,230,233]}:{}} transition={{duration:0.5,delay:i*0.12,repeat:Infinity}}/>
        ))}
      </motion.g>
    </svg>
  );
};

// 3. Web Apps — CRM dashboard style (like reference image)
const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%",height:"100%" }}>
    <defs>
      <linearGradient id="wa1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#bf5af2" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="wa2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#64d2ff" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#64d2ff" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    {/* Main container */}
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(15,15,20,0.95)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    {/* Sidebar */}
    <rect x={0} y={0} width={72} height={240} rx={0} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5}/>
    <rect x={0} y={0} width={72} height={240} rx={12} fill="transparent"/>
    <rect x={0} y={0} width={72} height={240} fill="rgba(255,255,255,0.02)"/>
    {["📊","👥","📦","💳","⚙️"].map((ic,i)=>(
      <g key={i}>
        <rect x={8} y={18+i*38} width={56} height={30} rx={8} fill={i===0?"rgba(191,90,242,0.15)":"transparent"}/>
        <text x={36} y={38+i*38} textAnchor="middle" fontSize={14}>{ic}</text>
      </g>
    ))}
    {/* Stat cards */}
    {[
      {x:84, label:"Total Revenue", val:"₱284,500", change:"+18%", color:"#bf5af2"},
      {x:192,label:"Active Clients", val:"1,284",   change:"+7%",  color:"#30d158"},
      {x:300,label:"Open Tickets",   val:"23",       change:"-12%", color:"#ff9f0a"},
    ].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,y:-8}} animate={active?{opacity:1,y:0}:{opacity:0,y:-8}} transition={{delay:i*0.12}}>
        <rect x={c.x} y={8} width={100} height={54} rx={10} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={c.x+10} y={24} fontSize={7.5} fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={c.x+10} y={40} fontSize={13} fill="#f5f5f7" fontWeight={700}>{c.val}</text>
        <rect x={c.x+10} y={46} width={32} height={10} rx={5} fill={`${c.color}22`}/>
        <text x={c.x+26} y={54} textAnchor="middle" fontSize={7} fill={c.color} fontWeight={600}>{c.change}</text>
      </motion.g>
    ))}
    {/* Area chart */}
    <rect x={84} y={72} width={200} height={90} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={94} y={86} fontSize={8} fill="rgba(255,255,255,0.4)">Revenue / Month</text>
    {/* Chart area fill */}
    <motion.path
      d="M94,148 C110,130 126,120 142,110 C158,100 174,118 190,105 C206,92 222,95 238,82 L238,148 Z"
      fill="url(#wa1)" initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.5,duration:0.8}}/>
    <motion.path
      d="M94,148 C110,130 126,120 142,110 C158,100 174,118 190,105 C206,92 222,95 238,82"
      stroke="#bf5af2" strokeWidth={2} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.3,duration:1.2,ease:"easeOut"}}/>
    {/* Tooltip */}
    <motion.g initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:1.4}}>
      <rect x={196} y={88} width={52} height={26} rx={6} fill="#bf5af2"/>
      <text x={222} y={102} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={700}>₱58.2k</text>
      <text x={222} y={110} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.7)">Apr 2025</text>
      <polygon points="222,116 218,122 226,122" fill="#bf5af2"/>
    </motion.g>
    {/* Bar chart right */}
    <rect x={294} y={72} width={116} height={90} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={304} y={86} fontSize={8} fill="rgba(255,255,255,0.4)">Tickets / Week</text>
    {[28,44,20,55,36,48,38].map((h,i)=>(
      <motion.rect key={i} x={302+i*14} rx={3} width={9}
        fill={i===3?"#bf5af2":"url(#wa2)"} opacity={0.85}
        initial={{height:0,y:152}} animate={active?{height:h*0.6,y:152-h*0.6}:{height:0,y:152}}
        transition={{duration:0.45,delay:0.3+i*0.06,ease:"easeOut"}}/>
    ))}
    {/* Table rows */}
    <rect x={84} y={170} width={326} height={64} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
    <text x={94} y={184} fontSize={7.5} fill="rgba(255,255,255,0.3)">RECENT CLIENTS</text>
    {[
      {name:"Santos Corp",   status:"Active",  val:"₱45,000"},
      {name:"Reyes & Co.",   status:"Pending", val:"₱12,800"},
      {name:"LGU Cagayan",   status:"Active",  val:"₱88,000"},
    ].map((r,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-10}} animate={active?{opacity:1,x:0}:{opacity:0,x:-10}} transition={{delay:0.8+i*0.1}}>
        <text x={94}  y={196+i*16} fontSize={8} fill="rgba(255,255,255,0.7)">{r.name}</text>
        <rect x={200} y={188+i*16} width={36} height={11} rx={5} fill={r.status==="Active"?"rgba(48,209,88,0.15)":"rgba(255,159,10,0.15)"}/>
        <text x={218} y={196+i*16} textAnchor="middle" fontSize={7} fill={r.status==="Active"?"#30d158":"#ff9f0a"}>{r.status}</text>
        <text x={390} y={196+i*16} textAnchor="end" fontSize={8} fill="rgba(255,255,255,0.5)">{r.val}</text>
      </motion.g>
    ))}
  </svg>
);

// 4. Business Systems — ERP overview
const BusinessSystemsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%",height:"100%" }}>
    {/* Grid */}
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(15,12,8,0.95)" stroke="rgba(255,159,10,0.1)" strokeWidth={1}/>
    {/* Top nav */}
    <rect x={0} y={0} width={420} height={32} rx={12} fill="rgba(255,159,10,0.06)"/>
    <rect x={0} y={22} width={420} height={10} fill="rgba(255,159,10,0.06)"/>
    <text x={16} y={21} fontSize={10} fill="rgba(255,255,255,0.7)" fontWeight={600}>BusinessOS · Dashboard</text>
    {[
      {x:140,label:"Inventory"},{x:200,label:"HR"},{x:248,label:"Finance"},{x:300,label:"Schedule"}
    ].map((t,i)=>(
      <text key={i} x={t.x} y={21} fontSize={9} fill={i===2?"#ff9f0a":"rgba(255,255,255,0.3)"}>{t.label}</text>
    ))}
    {/* KPI row */}
    {[
      {x:10,  icon:"📦", label:"Stock Items",  val:"4,820",  sub:"12 low"},
      {x:112, icon:"👥", label:"Staff Active",  val:"34",     sub:"2 on leave"},
      {x:214, icon:"💰", label:"Monthly Rev",   val:"₱2.1M",  sub:"+22% MoM"},
      {x:316, icon:"📅", label:"Tasks Today",   val:"18",     sub:"6 overdue"},
    ].map((k,i)=>(
      <motion.g key={i} initial={{opacity:0,y:6}} animate={active?{opacity:1,y:0}:{opacity:0,y:6}} transition={{delay:i*0.1}}>
        <rect x={k.x} y={38} width={92} height={56} rx={10} fill="rgba(255,255,255,0.03)" stroke="rgba(255,159,10,0.2)" strokeWidth={1}/>
        <text x={k.x+12} y={56} fontSize={16}>{k.icon}</text>
        <text x={k.x+36} y={56} fontSize={14} fill="#f5f5f7" fontWeight={700}>{k.val}</text>
        <text x={k.x+12} y={68} fontSize={7.5} fill="rgba(255,255,255,0.3)">{k.label}</text>
        <text x={k.x+12} y={80} fontSize={7} fill="#ff9f0a">{k.sub}</text>
      </motion.g>
    ))}
    {/* Donut chart */}
    <rect x={10} y={102} width={130} height={130} rx={10} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={20} y={117} fontSize={8} fill="rgba(255,255,255,0.35)">Budget Usage</text>
    <motion.circle cx={75} cy={158} r={30} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={12}/>
    <motion.circle cx={75} cy={158} r={30} fill="none" stroke="#ff9f0a" strokeWidth={12}
      strokeDasharray="188" strokeDashoffset={188} strokeLinecap="round"
      animate={active?{strokeDashoffset:47}:{strokeDashoffset:188}}
      transition={{delay:0.6,duration:1.2,ease:"easeOut"}}
      style={{transformOrigin:"75px 158px",transform:"rotate(-90deg)"}}/>
    <motion.circle cx={75} cy={158} r={30} fill="none" stroke="#bf5af2" strokeWidth={12}
      strokeDasharray="188" strokeDashoffset={188} strokeLinecap="round"
      animate={active?{strokeDashoffset:94}:{strokeDashoffset:188}}
      transition={{delay:0.8,duration:1,ease:"easeOut"}}
      style={{transformOrigin:"75px 158px",transform:"rotate(0deg)"}}/>
    <text x={75} y={155} textAnchor="middle" fontSize={14} fill="#f5f5f7" fontWeight={700}>75%</text>
    <text x={75} y={167} textAnchor="middle" fontSize={7.5} fill="rgba(255,255,255,0.3)">allocated</text>
    {[{c:"#ff9f0a",l:"Operations"},{c:"#bf5af2",l:"Marketing"}].map((l,i)=>(
      <g key={i}><circle cx={22} cy={196+i*12} r={4} fill={l.c}/><text x={30} y={200+i*12} fontSize={8} fill="rgba(255,255,255,0.45)">{l.l}</text></g>
    ))}
    {/* Task list */}
    <rect x={148} y={102} width={262} height={130} rx={10} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={158} y={117} fontSize={8} fill="rgba(255,255,255,0.35)">RECENT ACTIVITY</text>
    {[
      {icon:"📦",text:"Restock: 20 items flagged",      time:"2m",  color:"#ff9f0a"},
      {icon:"✅",text:"Payroll processed — 34 staff",    time:"1h",  color:"#30d158"},
      {icon:"📊",text:"Monthly report generated",        time:"3h",  color:"#bf5af2"},
      {icon:"⚠️",text:"Server maintenance scheduled",   time:"5h",  color:"#ff375f"},
      {icon:"👥",text:"3 new staff onboarded",           time:"1d",  color:"#64d2ff"},
    ].map((t,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.5+i*0.1}}>
        <rect x={158} y={122+i*19} width={3} height={14} rx={2} fill={t.color}/>
        <text x={167} y={133+i*19} fontSize={9}>{t.icon}</text>
        <text x={182} y={133+i*19} fontSize={8.5} fill="rgba(255,255,255,0.6)">{t.text}</text>
        <text x={396} y={133+i*19} textAnchor="end" fontSize={7.5} fill="rgba(255,255,255,0.25)">{t.time}</text>
      </motion.g>
    ))}
  </svg>
);

// 5. Robotics — camera feed with detection
const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%",height:"100%" }}>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(8,4,4,0.98)" stroke="rgba(255,59,48,0.15)" strokeWidth={1}/>
    {/* Camera feed - subtle grid */}
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*70} y1={32} x2={i*70} y2={200} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1={0} y1={32+i*42} x2={420} y2={32+i*42} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    {/* Top HUD */}
    <rect x={0} y={0} width={420} height={30} fill="rgba(255,59,48,0.08)"/>
    <circle cx={14} cy={15} r={5} fill="#ff375f" opacity={0.9}/>
    <motion.circle cx={14} cy={15} r={5} fill="#ff375f"
      animate={active?{opacity:[0.9,0.2,0.9]}:{opacity:0.2}} transition={{duration:1,repeat:Infinity}}/>
    <text x={24} y={19} fontSize={9} fill="#ff375f" fontFamily="monospace">● REC  AXONIS EDGE v2.4</text>
    <text x={320} y={19} fontSize={9} fill="rgba(255,255,255,0.4)" fontFamily="monospace">04:22:18  FPS:30</text>
    {/* Scan line */}
    <motion.line x1={0} y1={32} x2={420} y2={32} stroke="#ff375f" strokeWidth={1.5} opacity={0.6}
      animate={active?{y1:[32,200,32],y2:[32,200,32]}:{}}
      transition={{duration:2.4,repeat:Infinity,ease:"linear"}}/>
    {/* Detection boxes */}
    {[
      {x:40, y:50, w:90, h:80, label:"Person",  conf:"98.4%", color:"#ff375f"},
      {x:200,y:80, w:110,h:90, label:"Forklift", conf:"95.1%", color:"#ff9f0a"},
      {x:310,y:45, w:80, h:60, label:"Hazard",   conf:"91.8%", color:"#ff375f"},
    ].map((b,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.4+i*0.4}}>
        <path d={`M${b.x+12},${b.y} L${b.x},${b.y} L${b.x},${b.y+12}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w-12},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+12}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x},${b.y+b.h-12} L${b.x},${b.y+b.h} L${b.x+12},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w},${b.y+b.h-12} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-12},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <rect x={b.x} y={b.y-16} width={b.w} height={15} rx={4} fill={b.color} opacity={0.9}/>
        <text x={b.x+6} y={b.y-5} fontSize={8} fill="#fff" fontWeight={600}>{b.label}  {b.conf}</text>
      </motion.g>
    ))}
    {/* Bottom telemetry */}
    <rect x={0} y={200} width={420} height={40} fill="rgba(255,59,48,0.07)" stroke="rgba(255,59,48,0.12)" strokeWidth={1}/>
    {[
      {x:10,  label:"Zones Active", val:"4/4"},
      {x:100, label:"Detections",   val:"7"},
      {x:186, label:"Alerts",       val:"1"},
      {x:258, label:"Uptime",       val:"99.98%"},
      {x:340, label:"Latency",      val:"12ms"},
    ].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.8+i*0.1}}>
        <text x={s.x} y={213} fontSize={7} fill="rgba(255,255,255,0.3)" fontFamily="monospace">{s.label}</text>
        <text x={s.x} y={228} fontSize={10} fill={i===2?"#ff375f":"#ff9f0a"} fontWeight={700} fontFamily="monospace">{s.val}</text>
      </motion.g>
    ))}
  </svg>
);

// 6. Mobile — phone mockup with real app UI
const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%",height:"100%" }}>
    {/* Background — blurred phone glow */}
    <ellipse cx={210} cy={120} rx={80} ry={100} fill="rgba(100,210,255,0.04)"/>
    {/* Phone shell */}
    <rect x={147} y={2} width={126} height={236} rx={22} fill="#0a0a0f" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5}/>
    <rect x={150} y={5} width={120} height={230} rx={20} fill="#080810"/>
    {/* Notch */}
    <rect x={178} y={8} width={64} height={12} rx={6} fill="#0a0a0f"/>
    {/* Screen content */}
    <rect x={155} y={22} width={110} height={208} rx={16} fill="#0d0d18"/>
    {/* App header */}
    <rect x={155} y={22} width={110} height={28} rx={0} fill="rgba(100,210,255,0.07)"/>
    <rect x={155} y={22} width={110} height={28} rx={16} fill="rgba(100,210,255,0.07)"/>
    <rect x={155} y={34} width={110} height={16} fill="rgba(100,210,255,0.07)"/>
    <text x={210} y={38} textAnchor="middle" fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit App</text>
    {/* Stat cards on screen */}
    {[
      {y:54, icon:"💰", label:"Revenue",    val:"₱128k", color:"#64d2ff"},
      {y:86, icon:"📋", label:"Tasks",      val:"18 open",color:"#bf5af2"},
      {y:118,icon:"👥", label:"Clients",    val:"84",     color:"#30d158"},
    ].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.2+i*0.15}}>
        <rect x={161} y={c.y} width={98} height={28} rx={8} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={170} y={c.y+13} fontSize={12}>{c.icon}</text>
        <text x={186} y={c.y+11} fontSize={8} fill="rgba(255,255,255,0.4)">{c.label}</text>
        <text x={186} y={c.y+21} fontSize={9} fill={c.color} fontWeight={700}>{c.val}</text>
      </motion.g>
    ))}
    {/* Mini chart */}
    <rect x={161} y={150} width={98} height={38} rx={8} fill="rgba(255,255,255,0.025)"/>
    <motion.path d="M168,180 C175,170 182,174 190,164 C198,154 205,160 212,152 C219,144 226,150 234,145 C241,140 248,148 252,145"
      stroke="#64d2ff" strokeWidth={1.5} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.8,duration:1,ease:"easeOut"}}/>
    {/* Notifications sliding in */}
    {[
      {icon:"📬", title:"New lead assigned", color:"#64d2ff", delay:0.5},
      {icon:"✅", title:"Invoice paid",       color:"#30d158", delay:1.4},
    ].map((n,i)=>(
      <motion.g key={i}
        animate={active?{x:[420,0,0,420],opacity:[0,1,1,0]}:{x:420,opacity:0}}
        transition={{delay:n.delay,duration:3.5,times:[0,0.1,0.75,1],repeat:Infinity,repeatDelay:2}}>
        <rect x={-230} y={196+i*22} width={215} height={18} rx={9} fill="rgba(30,30,40,0.95)" stroke={`${n.color}44`} strokeWidth={1}/>
        <circle cx={-220} cy={205+i*22} r={6} fill={`${n.color}22`}/>
        <text x={-220} y={208+i*22} textAnchor="middle" fontSize={10}>{n.icon}</text>
        <text x={-208} y={208+i*22} fontSize={7.5} fill="rgba(255,255,255,0.7)">{n.title}</text>
      </motion.g>
    ))}
    {/* Side buttons */}
    <rect x={273} y={70} width={3} height={30} rx={2} fill="rgba(255,255,255,0.15)"/>
    <rect x={273} y={106} width={3} height={20} rx={2} fill="rgba(255,255,255,0.15)"/>
    <rect x={144} y={80} width={3} height={40} rx={2} fill="rgba(255,255,255,0.12)"/>
    {/* Home bar */}
    <rect x={185} y={224} width={50} height={3} rx={2} fill="rgba(255,255,255,0.2)"/>
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { id:"automation", eyebrow:"Workflow Automation",    heading:"Eliminate\nmanual work.",           desc:"Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.", price:"From $800",   timeline:"2–5 days",   accent:"#2997ff", Art:AutomationArt,       layout:"text-left"  },
  { id:"ai-agents",  eyebrow:"AI Agents",              heading:"Custom AI\nthat works 24/7.",        desc:"Purpose-built agents for support, lead qualification, and internal operations.",  price:"From $1,200", timeline:"5–10 days",  accent:"#30d158", Art:AIAgentsArt,          layout:"text-right" },
  { id:"web-apps",   eyebrow:"Web Applications",       heading:"Dashboards,\nCRMs, and SaaS.",       desc:"React, Firebase, Vercel. Full-stack web apps built for speed and clean UX.",    price:"From $1,500", timeline:"7–14 days",  accent:"#bf5af2", Art:WebAppsArt,           layout:"full-bg"    },
  { id:"systems",    eyebrow:"Business Systems",       heading:"One system.\nYour entire operation.", desc:"Inventory, HR, finance, scheduling — unified in one platform.",                  price:"From $3,000", timeline:"14–30 days", accent:"#ff9f0a", Art:BusinessSystemsArt,   layout:"text-left"  },
  { id:"robotics",   eyebrow:"Robotics & Physical AI", heading:"Edge AI.\nIndustrial-grade.",        desc:"PLC integration, computer vision, and embedded AI for industrial environments.", price:"From $3,000", timeline:"14–30 days", accent:"#ff375f", Art:RoboticsArt,          layout:"text-right" },
  { id:"mobile",     eyebrow:"Mobile Applications",   heading:"iOS + Android.\nShipped fast.",       desc:"React Native mobile apps — cross-platform, performant, production-ready.",       price:"From $2,000", timeline:"10–21 days", accent:"#64d2ff", Art:MobileArt,            layout:"full-bg"    },
];

// ─── Hero illustration ────────────────────────────────────────────────────────

const HeroIllustration = () => (
  <svg viewBox="0 0 640 340" fill="none" style={{ width:"100%", height:"100%" }}>
    <ellipse cx={320} cy={170} rx={260} ry={75}  stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
    <ellipse cx={320} cy={170} rx={195} ry={56}  stroke="rgba(255,255,255,0.055)" strokeWidth={1}/>
    <ellipse cx={320} cy={170} rx={128} ry={37}  stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
    <circle cx={320} cy={170} r={54} fill="rgba(41,151,255,0.06)" stroke="#2997ff" strokeWidth={1.5}/>
    <circle cx={320} cy={170} r={38} fill="rgba(41,151,255,0.1)"  stroke="#2997ff" strokeWidth={1} strokeOpacity={0.5}/>
    <text x={320} y={177} textAnchor="middle" fontSize={30} fill="#2997ff">⚡</text>
    {[
      { angle:0,   r:195, label:"Automation", icon:"⚙️",  color:"#2997ff" },
      { angle:60,  r:195, label:"AI Agents",  icon:"🤖",  color:"#30d158" },
      { angle:120, r:195, label:"Web Apps",   icon:"💻",  color:"#bf5af2" },
      { angle:180, r:195, label:"Systems",    icon:"🔗",  color:"#ff9f0a" },
      { angle:240, r:195, label:"Robotics",   icon:"🦾",  color:"#ff375f" },
      { angle:300, r:195, label:"Mobile",     icon:"📱",  color:"#64d2ff" },
    ].map((n,i) => {
      const rad = (n.angle*Math.PI)/180;
      const x = 320 + n.r*0.9*Math.cos(rad);
      const y = 170 + n.r*0.3*Math.sin(rad);
      return (
        <motion.g key={i}
          animate={{ y:[y-5,y+5,y-5] }}
          transition={{ duration:3+i*0.4, repeat:Infinity, ease:"easeInOut", delay:i*0.5 }}>
          <line x1={x} y1={y} x2={320} y2={170} stroke={n.color} strokeWidth={1} strokeOpacity={0.12} strokeDasharray="3 6"/>
          <circle cx={x} cy={y} r={30} fill="rgba(0,0,0,0.6)" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.45}/>
          <circle cx={x} cy={y} r={30} fill={`${n.color}0d`}/>
          <text x={x} y={y+6} textAnchor="middle" fontSize={18}>{n.icon}</text>
          <text x={x} y={y+46} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.35)" letterSpacing={0.5}>{n.label}</text>
        </motion.g>
      );
    })}
    {[0,1,2].map(i=>(
      <motion.circle key={i} cx={320} cy={170} r={54} fill="none" stroke="#2997ff" strokeWidth={1}
        initial={{ r:54, opacity:0.4 }}
        animate={{ r:140, opacity:0 }}
        transition={{ duration:2.5, delay:i*0.85, repeat:Infinity, ease:"easeOut"}}/>
    ))}
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [activeIndex, setActiveIndex]             = useState(-1);
  const [animKeys, setAnimKeys]                   = useState(() => services.map(()=>0));
  const handleDropdownChange = useCallback((a:boolean)=>setNavDropdownActive(a),[]);
  const sectionRefs = useRef<(HTMLDivElement|null)[]>([]);

  useEffect(()=>{
    const observers = sectionRefs.current.map((el,i)=>{
      if(!el) return null;
      const obs = new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting){
          setActiveIndex(i);
          setAnimKeys(prev=>prev.map((k,ki)=>ki===i?k+1:k));
        }
      },{threshold:0.3});
      obs.observe(el);
      return obs;
    });
    return ()=>observers.forEach(o=>o?.disconnect());
  },[]);

  return(
    <>
      <Navbar onDropdownChange={handleDropdownChange}/>
      <style>{`
        .svc-container { max-width:1100px; margin:0 auto; padding:0 32px; }
        /* Layout: text-left */
        .layout-text-left  { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; }
        /* Layout: text-right (reversed) */
        .layout-text-right { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; direction:rtl; }
        .layout-text-right > * { direction:ltr; }
        /* Layout: full-bg (art as wide background, text overlay bottom) */
        .layout-full-bg { display:grid; grid-template-columns:1fr; position:relative; }
        .layout-full-bg .art-wrap { width:100%; }
        .layout-full-bg .text-wrap { margin-top:-40px; position:relative; z-index:2; padding:28px 32px 0; }

        /* Heading bleed effect */
        .svc-heading {
          font-size: clamp(30px,3.6vw,52px);
          font-weight:700; letter-spacing:-1.5px; line-height:1.06;
          color:#f5f5f7; margin:0 0 14px; white-space:pre-line;
          width:140%;
          -webkit-mask-image: linear-gradient(to right, black 48%, transparent 85%);
          mask-image: linear-gradient(to right, black 48%, transparent 85%);
        }
        .layout-text-right .svc-heading {
          width:140%;
          -webkit-mask-image: linear-gradient(to left, black 48%, transparent 85%);
          mask-image: linear-gradient(to left, black 48%, transparent 85%);
        }
        .layout-full-bg .svc-heading { width:100%; -webkit-mask-image:none; mask-image:none; }

        /* Glass card */
        .svc-glass { border-radius:20px; padding:1px; }
        .svc-glass-inner {
          border-radius:19px;
          background:linear-gradient(145deg,rgba(255,255,255,0.065) 0%,rgba(255,255,255,0.015) 55%,rgba(255,255,255,0.04) 100%);
          backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
          border:1px solid rgba(255,255,255,0.055);
          height:260px; display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; padding:16px;
        }
        .svc-glass-inner::before {
          content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
        }
        .svc-glass-inner::after {
          content:''; position:absolute; inset:0; border-radius:19px;
          background:radial-gradient(ellipse at 30% 15%,rgba(255,255,255,0.04) 0%,transparent 60%);
          pointer-events:none;
        }
        .layout-full-bg .svc-glass-inner { height:220px; }

        /* Overlap fade between sections */
        .section-fade-bottom {
          position:absolute; bottom:0; left:0; right:0; height:80px;
          background:linear-gradient(to bottom, transparent, #000);
          pointer-events:none; z-index:3;
        }

        @media(max-width:768px){
          .layout-text-left,.layout-text-right { grid-template-columns:1fr; gap:20px; direction:ltr; }
          .svc-heading { width:100%; -webkit-mask-image:none; mask-image:none; }
          .svc-glass-inner { height:200px; }
        }
      `}</style>

      <main style={{ filter:navDropdownActive?"blur(8px)":"none", opacity:navDropdownActive?0.45:1, transition:"filter 0.28s ease, opacity 0.28s ease" }}>

        {/* ── HERO ── */}
        <section style={{
          background:"#000", position:"relative", overflow:"hidden",
          minHeight:"100vh", display:"flex", flexDirection:"column",
          // Overlap into first service section
          marginBottom:-60,
        }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 55% at 50% 52%, rgba(41,151,255,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>

          {/* Illustration fills remaining height, pushed up against navbar */}
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"8px 24px 0", paddingTop:72 }}>
            <motion.div initial={{opacity:0,scale:0.93}} animate={{opacity:1,scale:1}}
              transition={{duration:1.1,ease:[0.25,0.1,0.25,1]}}
              style={{ width:"100%", maxWidth:640, aspectRatio:"16/9" }}>
              <HeroIllustration/>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"20px 0 28px", position:"relative", zIndex:2 }}>
            <div className="svc-container">
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>
                <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.4}}>
                  <span style={{ fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.28)", display:"block", marginBottom:5, letterSpacing:"0.04em" }}>Engineering services</span>
                  <h1 style={{ fontSize:"clamp(26px,3.8vw,46px)", fontWeight:700, letterSpacing:"-1.5px", lineHeight:1.04, color:"#f5f5f7", margin:0 }}>
                    Autobit Services.
                  </h1>
                  <p style={{ fontSize:"clamp(12px,1vw,14px)", color:"rgba(255,255,255,0.28)", margin:"6px 0 0", maxWidth:300 }}>Six capabilities. From automation to robotics.</p>
                </motion.div>
                <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.55}}
                  style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:980, padding:"12px 12px 12px 20px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:"#f5f5f7", lineHeight:1 }}>From $800</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)", marginTop:2 }}>Fixed pricing · Fast delivery</div>
                  </div>
                  <a href="mailto:autobitofficial.ph@gmail.com"
                    style={{ background:"#2997ff", color:"#fff", padding:"11px 20px", borderRadius:980, fontSize:13, fontWeight:600, textDecoration:"none", whiteSpace:"nowrap", transition:"all 0.2s ease", boxShadow:"0 4px 16px rgba(41,151,255,0.4)" }}
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1.04)";el.style.boxShadow="0 6px 24px rgba(41,151,255,0.6)";}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1)";el.style.boxShadow="0 4px 16px rgba(41,151,255,0.4)";}}>
                    Start a project
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom fade bleeds into first service section */}
          <div className="section-fade-bottom"/>
        </section>

        {/* ── Service Sections ── */}
        {services.map((s,i)=>{
          const { Art } = s;
          const isActive = activeIndex===i;
          const isFullBg = s.layout==="full-bg";
          const isRight  = s.layout==="text-right";

          return(
            <section key={s.id} id={s.id}
              ref={el=>{ sectionRefs.current[i]=el; }}
              style={{
                minHeight:"78vh",
                background:"#000",
                display:"flex", flexDirection:"column", justifyContent:"center",
                position:"relative",
                borderTop:"1px solid rgba(255,255,255,0.04)",
                overflow:"hidden",
                padding:"28px 0 20px",
                // Each section bleeds into the next
                marginBottom:i<services.length-1?-60:0,
                zIndex:i+1,
              }}>
              {/* Ambient glow */}
              <div style={{
                position:"absolute", inset:0, pointerEvents:"none",
                background: isRight
                  ? `radial-gradient(ellipse 45% 60% at 28% 50%, ${s.accent}0b 0%, transparent 70%)`
                  : `radial-gradient(ellipse 45% 60% at 72% 50%, ${s.accent}0b 0%, transparent 70%)`,
                opacity:isActive?1:0, transition:"opacity 0.8s ease",
              }}/>
              {/* Faint index */}
              <div style={{ position:"absolute", top:"50%", right:isRight?"auto":"2vw", left:isRight?"2vw":"auto", transform:"translateY(-50%)", fontSize:"clamp(60px,11vw,150px)", fontWeight:800, color:s.accent, opacity:0.04, userSelect:"none", pointerEvents:"none", lineHeight:1, letterSpacing:"-0.06em" }}>
                {String(i+1).padStart(2,"0")}
              </div>

              <div className="svc-container" style={{ width:"100%", position:"relative", zIndex:1 }}>

                {/* FULL-BG layout */}
                {isFullBg && (
                  <div className="layout-full-bg">
                    <motion.div className="art-wrap"
                      initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:0.25}} transition={{duration:0.55}}>
                      <div className="svc-glass" style={{
                        background:`linear-gradient(135deg,${s.accent}24 0%,rgba(255,255,255,0.025) 50%,${s.accent}0f 100%)`,
                        boxShadow:`0 0 0 1px rgba(255,255,255,0.07),0 24px 56px rgba(0,0,0,0.5),0 6px 20px ${s.accent}18`,
                      }}>
                        <div className="svc-glass-inner" style={{ height:240, background:`linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(0,0,0,0.22) 60%,rgba(255,255,255,0.03) 100%)` }}>
                          <div style={{ position:"absolute",top:0,left:"8%",right:"8%",height:1, background:`linear-gradient(90deg,transparent,${s.accent}66,transparent)` }}/>
                          <Art active={isActive} animKey={animKeys[i]}/>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div className="text-wrap"
                      initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:0.25}} transition={{duration:0.5,delay:0.1}}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr auto", alignItems:"flex-end", gap:24 }}>
                        <div>
                          <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:s.accent, display:"block", marginBottom:10 }}>
                            {String(i+1).padStart(2,"0")} / {String(services.length).padStart(2,"0")} — {s.eyebrow}
                          </span>
                          <h2 className="svc-heading">{s.heading}</h2>
                          <p style={{ fontSize:"clamp(12px,1.1vw,14px)", lineHeight:1.6, color:"rgba(255,255,255,0.38)", margin:0, maxWidth:380 }}>{s.desc}</p>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10, flexShrink:0 }}>
                          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 16px", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", textAlign:"right" }}>
                            <div style={{ fontSize:17, fontWeight:700, color:"#f5f5f7", letterSpacing:"-0.5px", lineHeight:1 }}>{s.price}</div>
                            <div style={{ fontSize:10, color:"rgba(255,255,255,0.24)", marginTop:2 }}>{s.timeline}</div>
                          </div>
                          <a href="mailto:autobitofficial.ph@gmail.com" style={{ background:s.accent,color:"#fff",padding:"10px 20px",borderRadius:980,fontSize:13,fontWeight:600,textDecoration:"none",boxShadow:`0 4px 18px ${s.accent}44`,transition:"all 0.22s ease" }}
                            onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1.04)";}}
                            onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1)";}}>
                            Get a quote →
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* GRID layout (text-left / text-right) */}
                {!isFullBg && (
                  <div className={`layout-${s.layout}`}>
                    {/* Text */}
                    <motion.div initial={{opacity:0,x:isRight?18:-18}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:0.28}} transition={{duration:0.55,ease:[0.25,0.1,0.25,1]}} style={{position:"relative",zIndex:2}}>
                      <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:s.accent, display:"block", marginBottom:10 }}>
                        {String(i+1).padStart(2,"0")} / {String(services.length).padStart(2,"0")} — {s.eyebrow}
                      </span>
                      <h2 className="svc-heading">{s.heading}</h2>
                      <p style={{ fontSize:"clamp(12px,1.1vw,14px)", lineHeight:1.62, color:"rgba(255,255,255,0.38)", margin:"0 0 22px", maxWidth:340 }}>{s.desc}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 16px", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06),0 4px 12px rgba(0,0,0,0.3)" }}>
                          <div style={{ fontSize:18, fontWeight:700, color:"#f5f5f7", letterSpacing:"-0.5px", lineHeight:1 }}>{s.price}</div>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,0.24)", marginTop:2 }}>{s.timeline} delivery</div>
                        </div>
                        <a href="mailto:autobitofficial.ph@gmail.com" style={{ background:s.accent,color:"#fff",padding:"11px 22px",borderRadius:980,fontSize:13,fontWeight:600,textDecoration:"none",display:"inline-block",transition:"all 0.22s ease",boxShadow:`0 4px 18px ${s.accent}44` }}
                          onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1.04)";el.style.boxShadow=`0 7px 30px ${s.accent}66`;}}
                          onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1)";el.style.boxShadow=`0 4px 18px ${s.accent}44`;}}>
                          Get a quote →
                        </a>
                      </div>
                    </motion.div>

                    {/* Art */}
                    <motion.div initial={{opacity:0,x:isRight?-18:18}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:0.28}} transition={{duration:0.55,delay:0.08,ease:[0.25,0.1,0.25,1]}}>
                      <div className="svc-glass" style={{
                        background:`linear-gradient(135deg,${s.accent}24 0%,rgba(255,255,255,0.025) 50%,${s.accent}0f 100%)`,
                        boxShadow:`0 0 0 1px rgba(255,255,255,0.07),0 20px 52px rgba(0,0,0,0.5),0 6px 18px ${s.accent}18`,
                      }}>
                        <div className="svc-glass-inner" style={{ background:`linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(0,0,0,0.22) 60%,rgba(255,255,255,0.03) 100%)` }}>
                          <div style={{ position:"absolute",top:0,left:"8%",right:"8%",height:1, background:`linear-gradient(90deg,transparent,${s.accent}66,transparent)` }}/>
                          <Art active={isActive} animKey={animKeys[i]}/>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Prev / Next */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:18 }}>
                  <button onClick={()=>i>0&&sectionRefs.current[i-1]?.scrollIntoView({behavior:"smooth",block:"start"})}
                    style={{ fontSize:"11px", color:i>0?"rgba(255,255,255,0.2)":"transparent", background:"none", border:"none", cursor:i>0?"pointer":"default", padding:0, letterSpacing:"0.03em", transition:"color 0.2s", fontFamily:"inherit" }}
                    onMouseEnter={e=>i>0&&((e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.5)")}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color=i>0?"rgba(255,255,255,0.2)":"transparent";}}>
                    ← {i>0?services[i-1].eyebrow:""}
                  </button>
                  <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.13)", letterSpacing:"0.06em" }}>
                    {String(i+1).padStart(2,"0")} / {String(services.length).padStart(2,"0")}
                  </span>
                  <button onClick={()=>i<services.length-1&&sectionRefs.current[i+1]?.scrollIntoView({behavior:"smooth",block:"start"})}
                    style={{ fontSize:"11px", color:i<services.length-1?"rgba(255,255,255,0.2)":"transparent", background:"none", border:"none", cursor:i<services.length-1?"pointer":"default", padding:0, letterSpacing:"0.03em", transition:"color 0.2s", fontFamily:"inherit" }}
                    onMouseEnter={e=>i<services.length-1&&((e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.5)")}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color=i<services.length-1?"rgba(255,255,255,0.2)":"transparent";}}>
                    {i<services.length-1?services[i+1].eyebrow:""} →
                  </button>
                </div>
              </div>

              {/* Bottom fade → blends into next section */}
              {i<services.length-1 && <div className="section-fade-bottom"/>}
            </section>
          );
        })}

        {/* ── Bottom CTA ── */}
        <section style={{ background:"#000", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"64px 0", position:"relative", zIndex:10 }}>
          <div className="svc-container" style={{ textAlign:"center" }}>
            <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
              <p style={{ fontSize:"clamp(20px,2.6vw,32px)", fontWeight:700, letterSpacing:"-0.6px", color:"#f5f5f7", margin:"0 0 8px" }}>Ready to build something?</p>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.26)", margin:"0 0 26px" }}>Fixed pricing. Fast delivery. 50% to start.</p>
              <a href="mailto:autobitofficial.ph@gmail.com" style={{ background:"#2997ff",color:"#fff",padding:"13px 34px",borderRadius:980,fontSize:14,fontWeight:600,textDecoration:"none",boxShadow:"0 0 28px rgba(41,151,255,0.28)",display:"inline-block",transition:"all 0.22s ease" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1.04)";el.style.boxShadow="0 0 48px rgba(41,151,255,0.5)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform="scale(1)";el.style.boxShadow="0 0 28px rgba(41,151,255,0.28)";}}>
                Start a project
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Services;
