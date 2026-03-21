// ─── Panel: AI Agents ─────────────────────────────────────────────────────────
// Accent : #30d158 (green)
// Frame  : Terminal top bar + scanline sweep
// Art    : Live chat window with typing indicator
//
// To edit this panel's text → change `aiAgentsData` at the bottom of this file.
// To edit the illustration  → edit the `AIAgentsArt` component below.
// To edit the frame style   → edit the `AIAgentsFrameDeco` component below.

import { motion } from "framer-motion";
import { IconBot } from "./components/Icons";

// ── Frame decoration ──────────────────────────────────────────────────────────
export const AIAgentsFrameDeco = ({ accent }: { accent: string }) => (
  <>
    <div style={{position:"absolute",top:0,left:0,right:0,height:28,
      background:"rgba(0,0,0,0.35)",borderBottom:`1px solid ${accent}22`,
      display:"flex",alignItems:"center",gap:6,padding:"0 14px",
    }}>
      {["#ff375f","#ff9f0a",accent].map((c,i)=>(
        <div key={i} style={{width:9,height:9,borderRadius:"50%",background:c,opacity:0.7}}/>
      ))}
      <span style={{fontFamily:"monospace",fontSize:9,color:`${accent}55`,marginLeft:8,letterSpacing:"0.08em"}}>
        autobit-agent · bash
      </span>
    </div>
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

// ── Illustration ──────────────────────────────────────────────────────────────
const chatMessages = [
  {t:"Hey, I need help with my order", r:false, d:0.2},
  {t:"Order #4821 shipped today!",      r:true,  d:0.9},
  {t:"When will it arrive?",            r:false, d:1.7},
  {t:"Est. Dec 18 — tracking sent",     r:true,  d:2.5},
];

export const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <rect x={10} y={0} width={400} height={240} rx={14} fill="rgba(20,20,20,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
    <rect x={10} y={0} width={400} height={42} rx={14} fill="rgba(255,255,255,0.04)"/>
    <rect x={10} y={30} width={400} height={12} fill="rgba(255,255,255,0.04)"/>
    <circle cx={38} cy={21} r={12} fill="rgba(48,209,88,0.15)" stroke="#30d158" strokeWidth={1.5}/>
    <rect x={30} y={14} width={16} height={14} rx={3} fill="none" stroke="#30d158" strokeWidth={1.2}/>
    <path d="M33 18h10M33 21h7" stroke="#30d158" strokeWidth={1} strokeLinecap="round"/>
    <text x={58} y={16} fontSize={11} fill="#f5f5f7" fontWeight={600}>Autobit AI Agent</text>
    <text x={58} y={28} fontSize={8.5} fill="#30d158">● Online · 0ms response</text>
    {chatMessages.map((m,i)=>{
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

// ── Panel data — edit text content here ──────────────────────────────────────
export const aiAgentsData = {
  id:        "ai-agents",
  eyebrow:   "AI Agents",
  heading:   "Custom AI\nthat works 24/7.",
  desc:      "Purpose-built agents for support, lead qualification, and internal operations.",
  accent:    "#30d158",
  badge:     "AI/ML",
  uniqueTag: "GPT-4 · Claude · Custom LLM",
  price:     "From $1,200",
  timeline:  "5–10 days",
  Icon:      IconBot,
  Art:       AIAgentsArt,
  FrameDeco: AIAgentsFrameDeco,
};
