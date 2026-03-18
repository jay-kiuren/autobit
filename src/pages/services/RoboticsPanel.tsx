// ─── Panel: Robotics & Physical AI ───────────────────────────────────────────
// Accent : #ff375f (red)
// Frame  : Targeting corner brackets + pulsing crosshair
// Art    : Computer vision camera feed with object detection boxes
//
// To edit this panel's text → change `roboticsData` at the bottom of this file.
// To edit the illustration  → edit the `RoboticsArt` component below.
// To edit the frame style   → edit the `RoboticsFrameDeco` component below.

import { motion } from "framer-motion";
import { IconCpu } from "../components/Icons";

// ── Frame decoration ──────────────────────────────────────────────────────────
export const RoboticsFrameDeco = ({ accent }: { accent: string }) => (
  <>
    {[
      {top:8,  left:8},
      {top:8,  right:8},
      {bottom:8,left:8},
      {bottom:8,right:8},
    ].map((pos,i)=>(
      <svg key={i} width={22} height={22} viewBox="0 0 22 22" fill="none"
        style={{position:"absolute",...pos as React.CSSProperties,opacity:0.6}}>
        {i===0&&<path d="M0 10 L0 0 L10 0" stroke={accent} strokeWidth={2}/>}
        {i===1&&<path d="M22 10 L22 0 L12 0" stroke={accent} strokeWidth={2}/>}
        {i===2&&<path d="M0 12 L0 22 L10 22" stroke={accent} strokeWidth={2}/>}
        {i===3&&<path d="M22 12 L22 22 L12 22" stroke={accent} strokeWidth={2}/>}
      </svg>
    ))}
    <motion.div style={{position:"absolute",top:"50%",left:"50%",
      width:8,height:8,borderRadius:"50%",marginTop:-4,marginLeft:-4,
      background:accent,opacity:0.15,
    }} animate={{scale:[1,2,1],opacity:[0.15,0,0.15]}} transition={{duration:2.5,repeat:Infinity}}/>
    <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,
      background:`linear-gradient(90deg,${accent}30,transparent 20%,transparent 80%,${accent}30)`,
      pointerEvents:"none",
    }}/>
  </>
);

// ── Illustration ──────────────────────────────────────────────────────────────
const detectionBoxes = [
  {x:40, y:50, w:90, h:80, label:"Person",  conf:"98.4%", color:"#ff375f"},
  {x:200,y:80, w:110,h:90, label:"Forklift",conf:"95.1%", color:"#ff9f0a"},
  {x:310,y:45, w:80, h:60, label:"Hazard",  conf:"91.8%", color:"#ff375f"},
];

export const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(6,3,3,0.99)" stroke="rgba(255,59,48,0.15)" strokeWidth={1}/>
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*70} y1={32} x2={i*70} y2={200} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1={0} y1={32+i*42} x2={420} y2={32+i*42} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    <rect x={0} y={0} width={420} height={30} fill="rgba(255,59,48,0.08)"/>
    <circle cx={14} cy={15} r={5} fill="#ff375f" opacity={0.9}/>
    <motion.circle cx={14} cy={15} r={5} fill="#ff375f"
      animate={active?{opacity:[0.9,0.2,0.9]}:{opacity:0.2}} transition={{duration:1,repeat:Infinity}}/>
    <text x={24} y={19} fontSize={9} fill="#ff375f" fontFamily="monospace">REC  AXONIS EDGE v2.4</text>
    <text x={320} y={19} fontSize={9} fill="rgba(255,255,255,0.35)" fontFamily="monospace">04:22:18  30fps</text>
    <motion.line x1={0} y1={32} x2={420} y2={32} stroke="#ff375f" strokeWidth={1.5} opacity={0.5}
      animate={active?{y1:[32,200,32],y2:[32,200,32]}:{}} transition={{duration:2.4,repeat:Infinity,ease:"linear"}}/>
    {detectionBoxes.map((b,i)=>(
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

// ── Panel data — edit text content here ──────────────────────────────────────
export const roboticsData = {
  id:        "robotics",
  eyebrow:   "Robotics & Physical AI",
  heading:   "Edge AI.\nIndustrial-grade.",
  desc:      "PLC integration, computer vision, and embedded AI for industrial environments.",
  accent:    "#ff375f",
  badge:     "Hardware",
  uniqueTag: "YOLO · PLC · Edge Inference",
  price:     "From $3,000",
  timeline:  "14–30 days",
  Icon:      IconCpu,
  Art:       RoboticsArt,
  FrameDeco: RoboticsFrameDeco,
};
