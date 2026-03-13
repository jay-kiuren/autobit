import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── SVG Icons (no emojis) ───────────────────────────────────────────────────
const IconGear = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
  </svg>
);
const IconBot = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="3" stroke={color} strokeWidth={1.6}/>
    <path d="M8 8V6a4 4 0 018 0v2" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <circle cx="9" cy="14" r="1.5" fill={color}/>
    <circle cx="15" cy="14" r="1.5" fill={color}/>
    <path d="M10 18h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
  </svg>
);
const IconMonitor = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth={1.6}/>
    <path d="M8 21h8M12 17v4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <path d="M6 8h4M6 11h6" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeOpacity={0.5}/>
    <rect x="14" y="7" width="4" height="5" rx="1" stroke={color} strokeWidth={1.4} strokeOpacity={0.6}/>
  </svg>
);
const IconLink = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
  </svg>
);
const IconCpu = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="7" y="7" width="10" height="10" rx="1" stroke={color} strokeWidth={1.6}/>
    <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" fill={color} opacity={0.4}/>
  </svg>
);
const IconSmartphone = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth={1.6}/>
    <path d="M10 6h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <circle cx="12" cy="18" r="1" fill={color}/>
    <path d="M9 10h4M9 13h6" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeOpacity={0.5}/>
  </svg>
);

// ─── Per-panel unique frame decorations ───────────────────────────────────────

// Panel 0 — Automation (blue): Blueprint grid + L-bracket corners
const FrameDecoBlueprint = ({ accent }: { accent: string }) => (
  <>
    {/* Blueprint dot grid */}
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.18}} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bp-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill={accent}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-dots)"/>
    </svg>
    {/* Corner L-brackets */}
    {[["0,0","18,0 0,0 0,18"],["calc(100% - 0px),0","calc(100% - 18px),0 calc(100%),0 calc(100%),18px"],
      ["0,calc(100%)","18px,calc(100%) 0,calc(100%) 0,calc(100% - 18px)"],
      ["calc(100%),calc(100%)","calc(100% - 18px),calc(100%) calc(100%),calc(100%) calc(100%),calc(100% - 18px)"]
    ].map((_,i)=>(
      <div key={i} style={{position:"absolute",width:20,height:20,
        top:i>=2?"auto":8, bottom:i>=2?8:"auto",
        left:i%2===0?8:"auto", right:i%2===1?8:"auto",
        border:`1.5px solid ${accent}`,
        borderRight:i%2===1?`1.5px solid ${accent}`:"none",
        borderLeft:i%2===0?`1.5px solid ${accent}`:"none",
        borderTop:i<2?`1.5px solid ${accent}`:"none",
        borderBottom:i>=2?`1.5px solid ${accent}`:"none",
        opacity:0.55,
      }}/>
    ))}
  </>
);

// Panel 1 — AI Agents (green): Terminal top bar + scanline pulse
const FrameDecoTerminal = ({ accent }: { accent: string }) => (
  <>
    <div style={{position:"absolute",top:0,left:0,right:0,height:28,
      background:`rgba(0,0,0,0.35)`,borderBottom:`1px solid ${accent}22`,
      display:"flex",alignItems:"center",gap:6,padding:"0 14px",
    }}>
      {["#ff375f","#ff9f0a",accent].map((c,i)=>(
        <div key={i} style={{width:9,height:9,borderRadius:"50%",background:c,opacity:0.7}}/>
      ))}
      <span style={{fontFamily:"monospace",fontSize:9,color:`${accent}55`,marginLeft:8,letterSpacing:"0.08em"}}>
        autobit-agent · bash
      </span>
    </div>
    {/* Scanline sweep */}
    <motion.div
      style={{position:"absolute",left:0,right:0,height:1,
        background:`linear-gradient(90deg,transparent,${accent}55,transparent)`,
        pointerEvents:"none",
      }}
      animate={{top:["10%","95%","10%"]}}
      transition={{duration:4,repeat:Infinity,ease:"linear"}}
    />
  </>
);

// Panel 2 — Web Apps (purple): Double border + noise mesh
const FrameDecoDouble = ({ accent }: { accent: string }) => (
  <>
    {/* Inner inset border */}
    <div style={{position:"absolute",inset:10,borderRadius:14,
      border:`1px solid ${accent}18`,pointerEvents:"none",
    }}/>
    {/* Corner dots */}
    {[[10,10],[null,10],[10,null],[null,null]].map(([t,l],i)=>(
      <div key={i} style={{position:"absolute",
        top:t??undefined, bottom:t===null?10:undefined,
        left:l??undefined, right:l===null?10:undefined,
        width:6,height:6,borderRadius:"50%",
        background:accent,opacity:0.4,
      }}/>
    ))}
    {/* Diagonal gradient shimmer */}
    <div style={{position:"absolute",inset:0,pointerEvents:"none",
      background:`linear-gradient(135deg,${accent}08 0%,transparent 40%,${accent}05 100%)`,
      borderRadius:"inherit",
    }}/>
  </>
);

// Panel 3 — Business Systems (orange): Tick-mark corners + data grid
const FrameDecoTicks = ({ accent }: { accent: string }) => (
  <>
    {/* Horizontal rule near top */}
    <div style={{position:"absolute",top:38,left:16,right:16,height:1,
      background:`linear-gradient(90deg,${accent}44,${accent}18,${accent}44)`,
    }}/>
    {/* Tick marks along top rule */}
    {Array.from({length:12}).map((_,i)=>(
      <div key={i} style={{
        position:"absolute",top:34,
        left:`${8+i*8}%`,
        width:1,height:i%4===0?8:4,
        background:`${accent}${i%4===0?"55":"28"}`,
      }}/>
    ))}
    {/* Bottom rule */}
    <div style={{position:"absolute",bottom:38,left:16,right:16,height:1,
      background:`linear-gradient(90deg,${accent}44,${accent}18,${accent}44)`,
    }}/>
    {/* Side vertical accent bars */}
    <div style={{position:"absolute",top:"15%",bottom:"15%",left:0,width:2,
      background:`linear-gradient(to bottom,transparent,${accent}50,transparent)`,
    }}/>
    <div style={{position:"absolute",top:"15%",bottom:"15%",right:0,width:2,
      background:`linear-gradient(to bottom,transparent,${accent}50,transparent)`,
    }}/>
  </>
);

// Panel 4 — Robotics (red): Targeting reticle corners
const FrameDecoTargeting = ({ accent }: { accent: string }) => (
  <>
    {/* Targeting corner brackets — like detection boxes in the art */}
    {[
      {top:8,left:8},
      {top:8,right:8},
      {bottom:8,left:8},
      {bottom:8,right:8},
    ].map((pos,i)=>(<svg key={i} width={22} height={22} viewBox="0 0 22 22" fill="none"
      style={{position:"absolute",...pos as any,opacity:0.6}}>
      {i===0&&<><path d="M0 10 L0 0 L10 0" stroke={accent} strokeWidth={2}/></>}
      {i===1&&<><path d="M22 10 L22 0 L12 0" stroke={accent} strokeWidth={2}/></>}
      {i===2&&<><path d="M0 12 L0 22 L10 22" stroke={accent} strokeWidth={2}/></>}
      {i===3&&<><path d="M22 12 L22 22 L12 22" stroke={accent} strokeWidth={2}/></>}
    </svg>))}
    {/* Pulsing center crosshair dot */}
    <motion.div style={{position:"absolute",top:"50%",left:"50%",
      width:8,height:8,borderRadius:"50%",marginTop:-4,marginLeft:-4,
      background:accent,opacity:0.15,
    }} animate={{scale:[1,2,1],opacity:[0.15,0,0.15]}} transition={{duration:2.5,repeat:Infinity}}/>
    {/* Horizontal center line */}
    <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,
      background:`linear-gradient(90deg,${accent}30,transparent 20%,transparent 80%,${accent}30)`,
      pointerEvents:"none",
    }}/>
  </>
);

// Panel 5 — Mobile (cyan): Gradient mesh + subtle circuit lines
const FrameDecoCyan = ({ accent }: { accent: string }) => (
  <>
    {/* Gradient mesh corners */}
    <div style={{position:"absolute",top:0,left:0,width:120,height:120,
      background:`radial-gradient(circle at 0% 0%,${accent}12,transparent 70%)`,
      pointerEvents:"none",borderRadius:"inherit",
    }}/>
    <div style={{position:"absolute",bottom:0,right:0,width:120,height:120,
      background:`radial-gradient(circle at 100% 100%,${accent}10,transparent 70%)`,
      pointerEvents:"none",borderRadius:"inherit",
    }}/>
    {/* Circuit-line SVG decoration */}
    <svg style={{position:"absolute",bottom:12,right:12,opacity:0.2,pointerEvents:"none"}} width={60} height={60} viewBox="0 0 60 60" fill="none">
      <path d="M50 10 L30 10 L30 30 L10 30 L10 50" stroke={accent} strokeWidth={1.2} strokeLinecap="round"/>
      <circle cx="30" cy="10" r="2.5" fill={accent}/>
      <circle cx="30" cy="30" r="2.5" fill={accent}/>
      <circle cx="10" cy="50" r="2.5" fill={accent}/>
    </svg>
    {/* Corner notch top-center (like mobile notch) */}
    <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
      width:48,height:4,background:`${accent}20`,borderRadius:"0 0 8px 8px",
    }}/>
  </>
);

const frameDecos = [FrameDecoBlueprint, FrameDecoTerminal, FrameDecoDouble, FrameDecoTicks, FrameDecoTargeting, FrameDecoCyan];

// ─── Illustrations ────────────────────────────────────────────────────────────

const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%", height:"100%" }}>
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*84} y1={0} x2={i*84} y2={240} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3].map(i=><line key={`h${i}`} x1={0} y1={i*60} x2={420} y2={i*60} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {[
      {x:20, y:90, label:"Trigger", color:"#2997ff"},
      {x:135,y:55, label:"Filter",  color:"#2997ff"},
      {x:135,y:125,label:"Timer",   color:"#64d2ff"},
      {x:250,y:90, label:"Process", color:"#2997ff"},
      {x:345,y:90, label:"Done",    color:"#30d158"},
    ].map((n,i)=>(
      <motion.g key={i} initial={{opacity:0,scale:0.7}} animate={active?{opacity:1,scale:1}:{opacity:0,scale:0.7}} transition={{delay:i*0.12,duration:0.4}}>
        <rect x={n.x} y={n.y} width={72} height={44} rx={10} fill="rgba(255,255,255,0.04)" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.6}/>
        <rect x={n.x} y={n.y} width={72} height={44} rx={10} fill={`${n.color}0d`}/>
        <text x={n.x+36} y={n.y+28} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.65)" fontFamily="monospace">{n.label}</text>
      </motion.g>
    ))}
    {[[92,112,135,77],[92,112,135,147],[207,112,250,112],[322,112,345,112]].map(([x1,y1,x2,y2],i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.7+i*0.1}}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2997ff" strokeWidth={1.5} strokeOpacity={0.35} strokeDasharray="4 3"/>
        <circle cx={x2} cy={y2} r={3} fill="#2997ff" opacity={0.6}/>
      </motion.g>
    ))}
    <motion.circle r={4} fill="#2997ff"
      animate={active?{x:[20,135,250,345],y:[112,77,112,112],opacity:[0,1,1,0]}:{opacity:0}}
      transition={{duration:2.5,repeat:Infinity,repeatDelay:0.8,ease:"linear"}}/>
    <rect x={10} y={200} width={400} height={28} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    {[{x:20,label:"Runs today",val:"1,284"},{x:120,label:"Success",val:"99.8%"},{x:220,label:"Time saved",val:"48h"},{x:320,label:"Errors",val:"0"}].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.9+i*0.1}}>
        <text x={s.x} y={211} fontSize={7} fill="rgba(255,255,255,0.28)">{s.label}</text>
        <text x={s.x} y={223} fontSize={9} fill="#2997ff" fontWeight={700}>{s.val}</text>
      </motion.g>
    ))}
  </svg>
);

const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const msgs = [
    {t:"Hey, I need help with my order", r:false, d:0.2},
    {t:"Order #4821 shipped today!",      r:true,  d:0.9},
    {t:"When will it arrive?",             r:false, d:1.7},
    {t:"Est. Dec 18 — tracking sent",     r:true,  d:2.5},
  ];
  return (
    <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
      <rect x={10} y={0} width={400} height={240} rx={14} fill="rgba(20,20,20,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
      <rect x={10} y={0} width={400} height={42} rx={14} fill="rgba(255,255,255,0.04)"/>
      <rect x={10} y={30} width={400} height={12} fill="rgba(255,255,255,0.04)"/>
      <circle cx={38} cy={21} r={12} fill="rgba(48,209,88,0.15)" stroke="#30d158" strokeWidth={1.5}/>
      <rect x={30} y={14} width={16} height={14} rx={3} fill="none" stroke="#30d158" strokeWidth={1.2}/>
      <path d="M33 18h10M33 21h7" stroke="#30d158" strokeWidth={1} strokeLinecap="round"/>
      <text x={58} y={16} fontSize={11} fill="#f5f5f7" fontWeight={600}>Autobit AI Agent</text>
      <text x={58} y={28} fontSize={8.5} fill="#30d158">● Online · 0ms response</text>
      {msgs.map((m,i)=>{
        const y=52+i*44; const w=Math.min(m.t.length*5.4+24,260); const x=m.r?400-w-14:18;
        return(
          <motion.g key={i} initial={{opacity:0,y:y+10}} animate={active?{opacity:1,y}:{opacity:0,y:y+10}} transition={{duration:0.45,delay:m.d}}>
            <rect x={x} y={0} width={w} height={32} rx={10} fill={m.r?"rgba(48,209,88,0.18)":"rgba(255,255,255,0.06)"} stroke={m.r?"rgba(48,209,88,0.3)":"rgba(255,255,255,0.08)"} strokeWidth={1}/>
            <text x={x+12} y={20} fontSize={8.5} fill={m.r?"#d4fad4":"rgba(255,255,255,0.75)"}>{m.t.length>42?m.t.slice(0,42)+"…":m.t}</text>
          </motion.g>
        );
      })}
      <motion.g animate={active?{opacity:[0,1,0]}:{opacity:0}} transition={{delay:3.2,duration:1.2,repeat:Infinity,repeatDelay:2}}>
        <rect x={18} y={226} width={52} height={10} rx={5} fill="rgba(255,255,255,0.07)"/>
        {[0,1,2].map(i=>(
          <motion.circle key={i} cx={32+i*10} cy={231} r={2.5} fill="#30d158"
            animate={active?{cy:[231,228,231]}:{}} transition={{duration:0.5,delay:i*0.12,repeat:Infinity}}/>
        ))}
      </motion.g>
    </svg>
  );
};

const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <defs>
      <linearGradient id="wa1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#bf5af2" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(14,14,18,0.96)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    <rect x={0} y={0} width={72} height={240} fill="rgba(255,255,255,0.025)"/>
    {[{y:18,active:true},{y:56},{y:94},{y:132},{y:170}].map((item,i)=>(
      <rect key={i} x={8} y={item.y} width={56} height={30} rx={8} fill={item.active?"rgba(191,90,242,0.15)":"transparent"}/>
    ))}
    {[{x:84,label:"Revenue",val:"₱284,500",change:"+18%",color:"#bf5af2"},{x:192,label:"Clients",val:"1,284",change:"+7%",color:"#30d158"},{x:300,label:"Tickets",val:"23",change:"-12%",color:"#ff9f0a"}].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,y:-8}} animate={active?{opacity:1,y:0}:{opacity:0,y:-8}} transition={{delay:i*0.12}}>
        <rect x={c.x} y={8} width={100} height={54} rx={10} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={c.x+10} y={24} fontSize={7.5} fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={c.x+10} y={40} fontSize={13} fill="#f5f5f7" fontWeight={700}>{c.val}</text>
        <rect x={c.x+10} y={46} width={32} height={10} rx={5} fill={`${c.color}22`}/>
        <text x={c.x+26} y={54} textAnchor="middle" fontSize={7} fill={c.color} fontWeight={600}>{c.change}</text>
      </motion.g>
    ))}
    <rect x={84} y={72} width={200} height={90} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={94} y={86} fontSize={8} fill="rgba(255,255,255,0.35)">Revenue / Month</text>
    <motion.path d="M94,148 C110,130 126,120 142,110 C158,100 174,118 190,105 C206,92 222,95 238,82 L238,148 Z"
      fill="url(#wa1)" initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.5,duration:0.8}}/>
    <motion.path d="M94,148 C110,130 126,120 142,110 C158,100 174,118 190,105 C206,92 222,95 238,82"
      stroke="#bf5af2" strokeWidth={2} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.3,duration:1.2,ease:"easeOut"}}/>
    <motion.g initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:1.4}}>
      <rect x={196} y={88} width={52} height={26} rx={6} fill="#bf5af2"/>
      <text x={222} y={102} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={700}>₱58.2k</text>
    </motion.g>
    <rect x={294} y={72} width={116} height={90} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={304} y={86} fontSize={8} fill="rgba(255,255,255,0.35)">Tickets / Week</text>
    {[28,44,20,55,36,48,38].map((h,i)=>(
      <motion.rect key={i} x={302+i*14} rx={3} width={9} fill={i===3?"#bf5af2":"rgba(100,210,255,0.45)"} opacity={0.9}
        initial={{height:0,y:152}} animate={active?{height:h*0.6,y:152-h*0.6}:{height:0,y:152}} transition={{duration:0.45,delay:0.3+i*0.06,ease:"easeOut"}}/>
    ))}
    <rect x={84} y={170} width={326} height={64} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
    <text x={94} y={184} fontSize={7.5} fill="rgba(255,255,255,0.28)" letterSpacing={1}>RECENT CLIENTS</text>
    {[{name:"Santos Corp",status:"Active",val:"₱45,000"},{name:"Reyes & Co.",status:"Pending",val:"₱12,800"},{name:"LGU Cagayan",status:"Active",val:"₱88,000"}].map((r,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-10}} animate={active?{opacity:1,x:0}:{opacity:0,x:-10}} transition={{delay:0.8+i*0.1}}>
        <text x={94} y={196+i*16} fontSize={8} fill="rgba(255,255,255,0.7)">{r.name}</text>
        <rect x={200} y={188+i*16} width={36} height={11} rx={5} fill={r.status==="Active"?"rgba(48,209,88,0.15)":"rgba(255,159,10,0.15)"}/>
        <text x={218} y={196+i*16} textAnchor="middle" fontSize={7} fill={r.status==="Active"?"#30d158":"#ff9f0a"}>{r.status}</text>
        <text x={390} y={196+i*16} textAnchor="end" fontSize={8} fill="rgba(255,255,255,0.45)">{r.val}</text>
      </motion.g>
    ))}
  </svg>
);

const BusinessSystemsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(14,11,6,0.97)" stroke="rgba(255,159,10,0.1)" strokeWidth={1}/>
    <rect x={0} y={0} width={420} height={32} rx={12} fill="rgba(255,159,10,0.06)"/>
    <rect x={0} y={22} width={420} height={10} fill="rgba(255,159,10,0.06)"/>
    <text x={16} y={21} fontSize={9.5} fill="rgba(255,255,255,0.65)" fontWeight={600} letterSpacing={0.5}>BusinessOS  ·  Dashboard</text>
    {[{x:140,l:"Inventory"},{x:200,l:"HR"},{x:248,l:"Finance"},{x:300,l:"Schedule"}].map((t,i)=>(
      <text key={i} x={t.x} y={21} fontSize={9} fill={i===2?"#ff9f0a":"rgba(255,255,255,0.28)"}>{t.l}</text>
    ))}
    {[{x:10,label:"Stock",val:"4,820",sub:"12 low"},{x:112,label:"Staff",val:"34",sub:"2 on leave"},{x:214,label:"Revenue",val:"₱2.1M",sub:"+22%"},{x:316,label:"Tasks",val:"18",sub:"6 overdue"}].map((k,i)=>(
      <motion.g key={i} initial={{opacity:0,y:6}} animate={active?{opacity:1,y:0}:{opacity:0,y:6}} transition={{delay:i*0.1}}>
        <rect x={k.x} y={38} width={92} height={56} rx={10} fill="rgba(255,255,255,0.03)" stroke="rgba(255,159,10,0.18)" strokeWidth={1}/>
        <text x={k.x+10} y={60} fontSize={15} fill="#f5f5f7" fontWeight={700}>{k.val}</text>
        <text x={k.x+10} y={72} fontSize={7.5} fill="rgba(255,255,255,0.3)">{k.label}</text>
        <text x={k.x+10} y={84} fontSize={7} fill="#ff9f0a">{k.sub}</text>
      </motion.g>
    ))}
    <rect x={10} y={102} width={130} height={130} rx={10} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={20} y={117} fontSize={8} fill="rgba(255,255,255,0.3)">Budget Usage</text>
    <circle cx={75} cy={158} r={30} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={12}/>
    <motion.circle cx={75} cy={158} r={30} fill="none" stroke="#ff9f0a" strokeWidth={12} strokeDasharray="188" strokeDashoffset={188} strokeLinecap="round"
      animate={active?{strokeDashoffset:47}:{strokeDashoffset:188}} transition={{delay:0.6,duration:1.2,ease:"easeOut"}} style={{transformOrigin:"75px 158px",transform:"rotate(-90deg)"}}/>
    <text x={75} y={162} textAnchor="middle" fontSize={14} fill="#f5f5f7" fontWeight={700}>75%</text>
    <rect x={148} y={102} width={262} height={130} rx={10} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={158} y={117} fontSize={8} fill="rgba(255,255,255,0.28)" letterSpacing={1}>RECENT ACTIVITY</text>
    {[{text:"Restock: 20 items flagged",time:"2m",color:"#ff9f0a"},{text:"Payroll processed — 34 staff",time:"1h",color:"#30d158"},{text:"Monthly report generated",time:"3h",color:"#bf5af2"},{text:"Server maintenance scheduled",time:"5h",color:"#ff375f"},{text:"3 new staff onboarded",time:"1d",color:"#64d2ff"}].map((t,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.5+i*0.1}}>
        <rect x={158} y={122+i*19} width={3} height={14} rx={2} fill={t.color}/>
        <text x={168} y={133+i*19} fontSize={8.5} fill="rgba(255,255,255,0.55)">{t.text}</text>
        <text x={396} y={133+i*19} textAnchor="end" fontSize={7.5} fill="rgba(255,255,255,0.22)">{t.time}</text>
      </motion.g>
    ))}
  </svg>
);

const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(6,3,3,0.99)" stroke="rgba(255,59,48,0.15)" strokeWidth={1}/>
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*70} y1={32} x2={i*70} y2={200} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1={0} y1={32+i*42} x2={420} y2={32+i*42} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    <rect x={0} y={0} width={420} height={30} fill="rgba(255,59,48,0.08)"/>
    <circle cx={14} cy={15} r={5} fill="#ff375f" opacity={0.9}/>
    <motion.circle cx={14} cy={15} r={5} fill="#ff375f" animate={active?{opacity:[0.9,0.2,0.9]}:{opacity:0.2}} transition={{duration:1,repeat:Infinity}}/>
    <text x={24} y={19} fontSize={9} fill="#ff375f" fontFamily="monospace">REC  AXONIS EDGE v2.4</text>
    <text x={320} y={19} fontSize={9} fill="rgba(255,255,255,0.35)" fontFamily="monospace">04:22:18  30fps</text>
    <motion.line x1={0} y1={32} x2={420} y2={32} stroke="#ff375f" strokeWidth={1.5} opacity={0.5}
      animate={active?{y1:[32,200,32],y2:[32,200,32]}:{}} transition={{duration:2.4,repeat:Infinity,ease:"linear"}}/>
    {[{x:40,y:50,w:90,h:80,label:"Person",conf:"98.4%",color:"#ff375f"},{x:200,y:80,w:110,h:90,label:"Forklift",conf:"95.1%",color:"#ff9f0a"},{x:310,y:45,w:80,h:60,label:"Hazard",conf:"91.8%",color:"#ff375f"}].map((b,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.4+i*0.4}}>
        <path d={`M${b.x+12},${b.y} L${b.x},${b.y} L${b.x},${b.y+12}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w-12},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+12}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x},${b.y+b.h-12} L${b.x},${b.y+b.h} L${b.x+12},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w},${b.y+b.h-12} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-12},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <rect x={b.x} y={b.y-16} width={b.w} height={15} rx={3} fill={b.color} opacity={0.9}/>
        <text x={b.x+6} y={b.y-5} fontSize={8.5} fill="#fff" fontWeight={600}>{b.label}  {b.conf}</text>
      </motion.g>
    ))}
    <rect x={0} y={200} width={420} height={40} fill="rgba(255,59,48,0.06)" stroke="rgba(255,59,48,0.1)" strokeWidth={1}/>
    {[{x:10,l:"Zones",v:"4/4"},{x:90,l:"Detected",v:"7"},{x:170,l:"Alerts",v:"1"},{x:250,l:"Uptime",v:"99.98%"},{x:340,l:"Latency",v:"12ms"}].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.8+i*0.1}}>
        <text x={s.x} y={213} fontSize={7} fill="rgba(255,255,255,0.28)" fontFamily="monospace">{s.l}</text>
        <text x={s.x} y={228} fontSize={10} fill={i===2?"#ff375f":"#ff9f0a"} fontWeight={700} fontFamily="monospace">{s.v}</text>
      </motion.g>
    ))}
  </svg>
);

const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx={210} cy={120} rx={80} ry={100} fill="rgba(100,210,255,0.03)"/>
    <rect x={147} y={2} width={126} height={236} rx={22} fill="#0a0a0f" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5}/>
    <rect x={150} y={5} width={120} height={230} rx={20} fill="#080810"/>
    <rect x={178} y={8} width={64} height={12} rx={6} fill="#0a0a0f"/>
    <rect x={155} y={22} width={110} height={208} rx={16} fill="#0d0d18"/>
    <rect x={155} y={22} width={110} height={28} rx={16} fill="rgba(100,210,255,0.06)"/>
    <rect x={155} y={34} width={110} height={16} fill="rgba(100,210,255,0.06)"/>
    <text x={210} y={38} textAnchor="middle" fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit App</text>
    {[{y:54,label:"Revenue",val:"₱128k",color:"#64d2ff"},{y:86,label:"Tasks",val:"18 open",color:"#bf5af2"},{y:118,label:"Clients",val:"84",color:"#30d158"}].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.2+i*0.15}}>
        <rect x={161} y={c.y} width={98} height={28} rx={8} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={170} y={c.y+11} fontSize={8} fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={170} y={c.y+22} fontSize={9} fill={c.color} fontWeight={700}>{c.val}</text>
      </motion.g>
    ))}
    <rect x={161} y={150} width={98} height={38} rx={8} fill="rgba(255,255,255,0.025)"/>
    <motion.path d="M168,180 C175,170 182,174 190,164 C198,154 205,160 212,152 C219,144 226,150 234,145 C241,140 248,148 252,145"
      stroke="#64d2ff" strokeWidth={1.5} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.8,duration:1,ease:"easeOut"}}/>
    {[{title:"New lead assigned",color:"#64d2ff",delay:0.5},{title:"Invoice paid",color:"#30d158",delay:1.4}].map((n,i)=>(
      <motion.g key={i}
        animate={active?{x:[420,0,0,420],opacity:[0,1,1,0]}:{x:420,opacity:0}}
        transition={{delay:n.delay,duration:3.5,times:[0,0.1,0.75,1],repeat:Infinity,repeatDelay:2,ease:"easeOut"}}>
        <rect x={-230} y={196+i*22} width={215} height={18} rx={9} fill="rgba(30,30,40,0.95)" stroke={`${n.color}44`} strokeWidth={1}/>
        <circle cx={-215} cy={205+i*22} r={5} fill={`${n.color}22`} stroke={n.color} strokeWidth={1}/>
        <text x={-203} y={208+i*22} fontSize={7.5} fill="rgba(255,255,255,0.65)">{n.title}</text>
      </motion.g>
    ))}
    <rect x={273} y={70} width={3} height={30} rx={2} fill="rgba(255,255,255,0.15)"/>
    <rect x={144} y={80} width={3} height={40} rx={2} fill="rgba(255,255,255,0.12)"/>
    <rect x={185} y={224} width={50} height={3} rx={2} fill="rgba(255,255,255,0.2)"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { id:"automation", eyebrow:"Workflow Automation",    Icon:IconGear,       heading:"Eliminate\nmanual work.",           desc:"Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.", price:"From $800",   timeline:"2–5 days",   accent:"#2997ff", Art:AutomationArt,
    uniqueTag:"n8n · Zapier · Make", badge:"Automation" },
  { id:"ai-agents",  eyebrow:"AI Agents",              Icon:IconBot,        heading:"Custom AI\nthat works 24/7.",        desc:"Purpose-built agents for support, lead qualification, and internal operations.",  price:"From $1,200", timeline:"5–10 days",  accent:"#30d158", Art:AIAgentsArt,
    uniqueTag:"GPT-4 · Claude · Custom LLM", badge:"AI/ML" },
  { id:"web-apps",   eyebrow:"Web Applications",       Icon:IconMonitor,    heading:"Dashboards,\nCRMs, and SaaS.",       desc:"React, Firebase, Vercel. Full-stack web apps built for speed and clean UX.",    price:"From $1,500", timeline:"7–14 days",  accent:"#bf5af2", Art:WebAppsArt,
    uniqueTag:"React · Firebase · Vercel", badge:"Full-Stack" },
  { id:"systems",    eyebrow:"Business Systems",       Icon:IconLink,       heading:"One system.\nYour entire operation.", desc:"Inventory, HR, finance, scheduling — unified in one platform.",                  price:"From $3,000", timeline:"14–30 days", accent:"#ff9f0a", Art:BusinessSystemsArt,
    uniqueTag:"ERP · POS · Operations", badge:"Enterprise" },
  { id:"robotics",   eyebrow:"Robotics & Physical AI", Icon:IconCpu,        heading:"Edge AI.\nIndustrial-grade.",        desc:"PLC integration, computer vision, and embedded AI for industrial environments.", price:"From $3,000", timeline:"14–30 days", accent:"#ff375f", Art:RoboticsArt,
    uniqueTag:"YOLO · PLC · Edge Inference", badge:"Hardware" },
  { id:"mobile",     eyebrow:"Mobile Applications",   Icon:IconSmartphone, heading:"iOS + Android.\nShipped fast.",       desc:"React Native mobile apps — cross-platform, performant, production-ready.",       price:"From $2,000", timeline:"10–21 days", accent:"#64d2ff", Art:MobileArt,
    uniqueTag:"React Native · Expo · Play Store", badge:"Mobile" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [activeIndex, setActiveIndex]             = useState(-1);
  const [animKeys, setAnimKeys]                   = useState(()=>services.map(()=>0));
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
      },{threshold:0.25});
      obs.observe(el);
      return obs;
    });
    return ()=>observers.forEach(o=>o?.disconnect());
  },[]);

  return(
    <>
      <Navbar onDropdownChange={handleDropdownChange}/>
      <style>{`
        /* ── Base container — fluid at all sizes ── */
        .svc-c { max-width:1320px; margin:0 auto; padding:0 clamp(16px,4vw,48px); }

        /* ── Grid layouts ── */
        .svc-grid       { display:grid; grid-template-columns:1fr 1.15fr; gap:clamp(24px,4vw,56px); align-items:center; }
        .svc-grid-rev   { display:grid; grid-template-columns:1.15fr 1fr; gap:clamp(24px,4vw,56px); align-items:center; }

        /* ── Heading — fluid typography ── */
        .svc-heading {
          font-size:clamp(22px,2.8vw,44px);
          font-weight:800; letter-spacing:-1.5px; line-height:1.04;
          color:#f5f5f7; margin:0 0 16px; white-space:pre-line;
        }

        /* ── Frame card — base ── */
        .svc-frame {
          border-radius:clamp(16px,2vw,24px);
          border:1px solid rgba(255,255,255,0.07);
          background:rgba(255,255,255,0.016);
          padding:clamp(22px,3.2vw,44px) clamp(22px,3.2vw,44px) clamp(18px,2.4vw,32px);
          position:relative; overflow:hidden;
        }

        /* ── Glass art card ── */
        .svc-glass { border-radius:20px; padding:1px; }
        .svc-glass-inner {
          border-radius:19px;
          background:linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.01) 55%,rgba(255,255,255,0.03) 100%);
          backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
          border:1px solid rgba(255,255,255,0.06);
          height:clamp(200px,28vw,360px);
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden;
          padding:clamp(12px,2vw,22px);
        }
        .svc-glass-inner::before {
          content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
        }

        /* ── Overlap fade ── */
        .svc-fade { position:absolute; bottom:0; left:0; right:0; height:90px;
          background:linear-gradient(to bottom,transparent,#000); pointer-events:none; z-index:5; }

        /* ── Tech tag ── */
        .svc-tag {
          display:inline-block; font-size:clamp(8px,0.8vw,10px); font-weight:500; letter-spacing:0.05em;
          padding:3px 9px; border-radius:6px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
          color:rgba(255,255,255,0.4); font-family:monospace;
          margin-bottom:clamp(10px,1.5vw,18px);
        }

        /* ── Badge pill ── */
        .svc-badge {
          display:inline-block; font-size:clamp(7px,0.7vw,9px); font-weight:700; letter-spacing:0.1em;
          padding:3px 9px; border-radius:20px; margin-bottom:clamp(8px,1vw,12px);
        }

        /* ── CTA buttons ── */
        .svc-cta {
          background:#2997ff; color:#fff;
          padding:12px 26px;
          border-radius:980px; font-size:15px; font-weight:500;
          text-decoration:none; display:inline-block; transition:background 0.2s ease, transform 0.2s ease;
          white-space:nowrap; letter-spacing:-0.01em;
        }
        .svc-cta:hover { transform:scale(1.02); background:#0077ed; }

        /* ── Description text ── */
        .svc-desc { font-size:clamp(12px,0.95vw,14px); line-height:1.68; color:rgba(255,255,255,0.38); margin:0 0 18px; max-width:420px; }

        /* ── Responsive breakpoints ── */
        .cta-stat-pill {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09);
          border-radius:980px; padding:6px 16px;
          font-size:clamp(11px,0.9vw,13px); color:rgba(255,255,255,0.55); font-weight:500;
          white-space:nowrap;
        }
        .cta-stat-dot { width:6px; height:6px; border-radius:50%; background:#30d158; display:inline-block; }
      `}</style>

      <main style={{filter:navDropdownActive?"blur(8px)":"none",opacity:navDropdownActive?0.45:1,transition:"filter 0.28s ease,opacity 0.28s ease"}}>

        {/* ── HERO — minimal, text only ── */}
        <section style={{background:"#000",minHeight:"46vh",display:"flex",alignItems:"center",paddingTop:64,paddingBottom:0,position:"relative",overflow:"hidden",marginBottom:-56,zIndex:0}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 40% at 50% 55%,rgba(41,151,255,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div className="svc-c" style={{position:"relative",zIndex:1,width:"100%",textAlign:"center",paddingBottom:72}}>
            <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:[0.25,0.1,0.25,1]}}>
              <span style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"rgba(255,255,255,0.25)",display:"block",marginBottom:18}}>
                Engineering services
              </span>
              <h1 style={{fontSize:"clamp(32px,5vw,68px)",fontWeight:800,letterSpacing:"-2.5px",lineHeight:1.01,color:"#f5f5f7",margin:"0 0 20px"}}>
                What we build.
              </h1>
              <p style={{fontSize:"clamp(14px,1.3vw,17px)",color:"rgba(255,255,255,0.3)",margin:"0 auto",maxWidth:400,lineHeight:1.65}}>
                Six capabilities. From automation to robotics.
              </p>
            </motion.div>
          </div>
          <div className="svc-fade"/>
        </section>

        {/* ── Service Sections ── */}
        {services.map((s,i)=>{
          const {Art} = s;
          const FrameDeco = frameDecos[i];

          const panelAnim = [
            { initial:{opacity:0,x:-60},    animate:{opacity:1,x:0},    transition:{duration:0.65,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,x:60},     animate:{opacity:1,x:0},    transition:{duration:0.65,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,scale:0.88},animate:{opacity:1,scale:1},transition:{duration:0.7,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,y:50},     animate:{opacity:1,y:0},    transition:{duration:0.6,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,x:-40,rotate:-2},animate:{opacity:1,x:0,rotate:0},transition:{duration:0.7,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,y:-40,scale:0.95},animate:{opacity:1,y:0,scale:1},transition:{duration:0.65,ease:[0.22,1,0.36,1]} },
          ][i];

          const artAnim = [
            { initial:{opacity:0,x:60},     animate:{opacity:1,x:0},    transition:{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,x:-60},    animate:{opacity:1,x:0},    transition:{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,y:40},     animate:{opacity:1,y:0},    transition:{duration:0.65,delay:0.15,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,scale:0.9},animate:{opacity:1,scale:1},transition:{duration:0.7,delay:0.1,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,x:50,rotate:2},animate:{opacity:1,x:0,rotate:0},transition:{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1]} },
            { initial:{opacity:0,y:50},     animate:{opacity:1,y:0},    transition:{duration:0.65,delay:0.08,ease:[0.22,1,0.36,1]} },
          ][i];

          const isActive  = activeIndex===i;
          const isReverse = i%2===1;

          return(
            <section key={s.id} id={s.id}
              ref={el=>{sectionRefs.current[i]=el;}}
              style={{
                background:"#000",position:"relative",overflow:"hidden",
                padding:"72px 0 52px",
                marginBottom:i<services.length-1?-36:0,
                zIndex:i+2,
              }}>
              <div style={{position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse 48% 52% at ${isReverse?"28%":"72%"} 50%,${s.accent}08 0%,transparent 70%)`,opacity:isActive?1:0,transition:"opacity 0.8s ease"}}/>
              <div style={{position:"absolute",top:"50%",right:isReverse?"auto":"0",left:isReverse?"0":"auto",transform:"translateY(-50%)",fontSize:"clamp(55px,10vw,140px)",fontWeight:800,color:s.accent,opacity:0.03,userSelect:"none",pointerEvents:"none",lineHeight:1,letterSpacing:"-0.06em"}}>
                {String(i+1).padStart(2,"0")}
              </div>

              <div className="svc-c" style={{width:"100%",position:"relative",zIndex:1}}>
                {/* Frame with unique per-panel decoration */}
                <div className="svc-frame" style={{"--accent":s.accent} as React.CSSProperties}>

                  {/* Unique frame decoration per panel */}
                  <FrameDeco accent={s.accent}/>

                  <div className={isReverse ? "svc-grid-rev" : "svc-grid"} style={{position:"relative",zIndex:1}}>

                    {/* Text */}
                    <motion.div
                      style={{direction:"ltr", order: isReverse ? 2 : 1}}
                      initial={panelAnim.initial} whileInView={panelAnim.animate}
                      viewport={{once:false,amount:0.2}} transition={panelAnim.transition}>

                      <div className="svc-badge" style={{background:`${s.accent}18`,color:s.accent,border:`1px solid ${s.accent}40`}}>
                        {s.badge}
                      </div>

                      <h2 className="svc-heading">{s.heading}</h2>
                      <p className="svc-desc">{s.desc}</p>
                      <span className="svc-tag">{s.uniqueTag}</span>

                      <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginTop:8}}>
                        <a href="mailto:autobitofficial.ph@gmail.com" className="svc-cta">Get a quote →</a>
                      </div>
                    </motion.div>

                    {/* Art */}
                    <motion.div
                      style={{direction:"ltr", order: isReverse ? 1 : 2}}
                      initial={artAnim.initial} whileInView={artAnim.animate}
                      viewport={{once:false,amount:0.2}} transition={artAnim.transition}>
                      <div className="svc-glass" style={{background:`linear-gradient(135deg,${s.accent}1e 0%,rgba(255,255,255,0.02) 50%,${s.accent}0c 100%)`,boxShadow:`0 0 0 1px rgba(255,255,255,0.07),0 20px 52px rgba(0,0,0,0.55),0 4px 16px ${s.accent}14`}}>
                        <div className="svc-glass-inner">
                          <div style={{position:"absolute",top:0,left:"8%",right:"8%",height:1,background:`linear-gradient(90deg,transparent,${s.accent}60,transparent)`}}/>
                          <Art active={isActive} animKey={animKeys[i]}/>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </div>

              {i<services.length-1&&<div className="svc-fade"/>}
            </section>
          );
        })}

        {/* ── Bottom CTA — redesigned, ad-style ── */}
        <section style={{background:"#000",padding:"80px 0 96px",position:"relative",zIndex:20,overflow:"hidden"}}>

          {/* Ambient background glow */}
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 55% at 50% 60%,rgba(41,151,255,0.09) 0%,transparent 70%)",pointerEvents:"none"}}/>

          <div className="svc-c" style={{position:"relative",zIndex:1}}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>

              {/* The main glass card */}
              <div className="cta-section-card">

                {/* Background animated rings */}
                {[1,2,3].map(n=>(
                  <motion.div key={n} style={{position:"absolute",
                    top:"50%",left:"50%",
                    width:`${n*160+120}px`,height:`${n*160+120}px`,
                    marginTop:`-${(n*160+120)/2}px`,marginLeft:`-${(n*160+120)/2}px`,
                    borderRadius:"50%",border:"1px solid rgba(41,151,255,0.07)",
                    pointerEvents:"none",
                  }}
                  animate={{scale:[1,1.04,1],opacity:[0.5,0.15,0.5]}}
                  transition={{duration:3+n,repeat:Infinity,delay:n*0.5,ease:"easeInOut"}}/>
                ))}

                {/* Top stripe glow */}
                <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(41,151,255,0.6),transparent)"}}/>

                {/* Main heading */}
                <motion.h2
                  initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:0.15,duration:0.65}}
                  style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:800,letterSpacing:"-2px",
                    lineHeight:1.02,color:"#f5f5f7",margin:"0 0 16px",position:"relative",zIndex:1}}>
                  Build something{" "}
                  <span style={{
                    background:"linear-gradient(90deg,#2997ff,#64d2ff)",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  }}>
                    others won't.
                  </span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  initial={{opacity:0}} whileInView={{opacity:1}}
                  viewport={{once:true}} transition={{delay:0.25,duration:0.6}}
                  style={{fontSize:"clamp(12px,1vw,15px)",color:"rgba(255,255,255,0.35)",
                    margin:"0 auto 40px",maxWidth:440,lineHeight:1.65,position:"relative",zIndex:1}}>
                  Fixed pricing. Fast delivery. 50% to start.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:0.35,duration:0.6}}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",
                    gap:24,flexWrap:"wrap",position:"relative",zIndex:1}}>
                  <a href="mailto:autobitofficial.ph@gmail.com" className="cta-main-btn">
                    Start a project →
                  </a>
                  <a href="/pricing" className="cta-secondary-btn">
                    See pricing
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </motion.div>

                {/* Fine print */}
                <motion.p
                  initial={{opacity:0}} whileInView={{opacity:1}}
                  viewport={{once:true}} transition={{delay:0.5,duration:0.5}}
                  style={{fontSize:"11px",color:"rgba(255,255,255,0.18)",marginTop:24,position:"relative",zIndex:1}}>
                  autobitofficial.ph@gmail.com · No retainers · Balance due only on delivery
                </motion.p>

                {/* Bottom gradient fade on card */}
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,
                  background:"linear-gradient(to bottom,transparent,rgba(41,151,255,0.04))",
                  borderRadius:"inherit",pointerEvents:"none",
                }}/>
              </div>

            </motion.div>
          </div>
        </section>

      </main>
      <Footer/>
    </>
  );
};

export default Services;
