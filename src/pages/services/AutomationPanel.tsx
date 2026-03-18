// ─── Panel: Workflow Automation ───────────────────────────────────────────────
// Accent : #2997ff (blue)
// Frame  : Blueprint dot grid + L-bracket corners
// Art    : n8n-style node graph with live stats bar
//
// To edit this panel's text → change `panelData` at the bottom of this file.
// To edit the illustration  → edit the `AutomationArt` component below.
// To edit the frame style   → edit the `AutomationFrameDeco` component below.

import { motion } from "framer-motion";
import { IconGear } from "../components/Icons";

// ── Frame decoration ──────────────────────────────────────────────────────────
export const AutomationFrameDeco = ({ accent }: { accent: string }) => (
  <>
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.18}} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bp-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill={accent}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-dots)"/>
    </svg>
    {[0,1,2,3].map(i=>(
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

// ── Illustration ──────────────────────────────────────────────────────────────
export const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
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

// ── Panel data — edit text content here ──────────────────────────────────────
export const automationData = {
  id:        "automation",
  eyebrow:   "Workflow Automation",
  heading:   "Eliminate\nmanual work.",
  desc:      "Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.",
  accent:    "#2997ff",
  badge:     "Automation",
  uniqueTag: "n8n · Zapier · Make",
  price:     "From $800",
  timeline:  "2–5 days",
  Icon:      IconGear,
  Art:       AutomationArt,
  FrameDeco: AutomationFrameDeco,
};
