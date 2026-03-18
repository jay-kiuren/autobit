// ─── Panel: Mobile Applications ──────────────────────────────────────────────
// Accent : #64d2ff (cyan)
// Frame  : Gradient mesh corners + circuit line + top notch strip
// Art    : Phone shell with app screen, mini chart, sliding notifications
//
// To edit this panel's text → change `mobileData` at the bottom of this file.
// To edit the illustration  → edit the `MobileArt` component below.
// To edit the frame style   → edit the `MobileFrameDeco` component below.

import { motion } from "framer-motion";
import { IconSmartphone } from "../components/Icons";

// ── Frame decoration ──────────────────────────────────────────────────────────
export const MobileFrameDeco = ({ accent }: { accent: string }) => (
  <>
    <div style={{position:"absolute",top:0,left:0,width:120,height:120,
      background:`radial-gradient(circle at 0% 0%,${accent}12,transparent 70%)`,
      pointerEvents:"none",borderRadius:"inherit",
    }}/>
    <div style={{position:"absolute",bottom:0,right:0,width:120,height:120,
      background:`radial-gradient(circle at 100% 100%,${accent}10,transparent 70%)`,
      pointerEvents:"none",borderRadius:"inherit",
    }}/>
    <svg style={{position:"absolute",bottom:12,right:12,opacity:0.2,pointerEvents:"none"}} width={60} height={60} viewBox="0 0 60 60" fill="none">
      <path d="M50 10 L30 10 L30 30 L10 30 L10 50" stroke={accent} strokeWidth={1.2} strokeLinecap="round"/>
      <circle cx="30" cy="10" r="2.5" fill={accent}/>
      <circle cx="30" cy="30" r="2.5" fill={accent}/>
      <circle cx="10" cy="50" r="2.5" fill={accent}/>
    </svg>
    <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
      width:48,height:4,background:`${accent}20`,borderRadius:"0 0 8px 8px",
    }}/>
  </>
);

// ── Illustration ──────────────────────────────────────────────────────────────
const appCards = [
  {y:54, label:"Revenue", val:"₱128k",   color:"#64d2ff"},
  {y:86, label:"Tasks",   val:"18 open", color:"#bf5af2"},
  {y:118,label:"Clients", val:"84",      color:"#30d158"},
];

const notifications = [
  {title:"New lead assigned", color:"#64d2ff", delay:0.5},
  {title:"Invoice paid",      color:"#30d158", delay:1.4},
];

export const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx={210} cy={120} rx={80} ry={100} fill="rgba(100,210,255,0.03)"/>
    {/* Phone shell */}
    <rect x={147} y={2}   width={126} height={236} rx={22} fill="#0a0a0f" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5}/>
    <rect x={150} y={5}   width={120} height={230} rx={20} fill="#080810"/>
    <rect x={178} y={8}   width={64}  height={12}  rx={6}  fill="#0a0a0f"/>
    <rect x={155} y={22}  width={110} height={208} rx={16} fill="#0d0d18"/>
    {/* App header */}
    <rect x={155} y={22}  width={110} height={28}  rx={16} fill="rgba(100,210,255,0.06)"/>
    <rect x={155} y={34}  width={110} height={16}        fill="rgba(100,210,255,0.06)"/>
    <text x={210} y={38} textAnchor="middle" fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit App</text>
    {/* App cards */}
    {appCards.map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.2+i*0.15}}>
        <rect x={161} y={c.y} width={98} height={28} rx={8} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={170} y={c.y+11} fontSize={8}  fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={170} y={c.y+22} fontSize={9}  fill={c.color} fontWeight={700}>{c.val}</text>
      </motion.g>
    ))}
    {/* Mini chart */}
    <rect x={161} y={150} width={98} height={38} rx={8} fill="rgba(255,255,255,0.025)"/>
    <motion.path d="M168,180 C175,170 182,174 190,164 C198,154 205,160 212,152 C219,144 226,150 234,145 C241,140 248,148 252,145"
      stroke="#64d2ff" strokeWidth={1.5} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.8,duration:1,ease:"easeOut"}}/>
    {/* Sliding notifications */}
    {notifications.map((n,i)=>(
      <motion.g key={i}
        animate={active?{x:[420,0,0,420],opacity:[0,1,1,0]}:{x:420,opacity:0}}
        transition={{delay:n.delay,duration:3.5,times:[0,0.1,0.75,1],repeat:Infinity,repeatDelay:2,ease:"easeOut"}}>
        <rect x={-230} y={196+i*22} width={215} height={18} rx={9} fill="rgba(30,30,40,0.95)" stroke={`${n.color}44`} strokeWidth={1}/>
        <circle cx={-215} cy={205+i*22} r={5} fill={`${n.color}22`} stroke={n.color} strokeWidth={1}/>
        <text x={-203} y={208+i*22} fontSize={7.5} fill="rgba(255,255,255,0.65)">{n.title}</text>
      </motion.g>
    ))}
    {/* Side buttons */}
    <rect x={273} y={70}  width={3} height={30} rx={2} fill="rgba(255,255,255,0.15)"/>
    <rect x={144} y={80}  width={3} height={40} rx={2} fill="rgba(255,255,255,0.12)"/>
    <rect x={185} y={224} width={50} height={3}  rx={2} fill="rgba(255,255,255,0.2)"/>
  </svg>
);

// ── Panel data — edit text content here ──────────────────────────────────────
export const mobileData = {
  id:        "mobile",
  eyebrow:   "Mobile Applications",
  heading:   "iOS + Android.\nShipped fast.",
  desc:      "React Native mobile apps — cross-platform, performant, production-ready.",
  accent:    "#64d2ff",
  badge:     "Mobile",
  uniqueTag: "React Native · Expo · Play Store",
  price:     "From $2,000",
  timeline:  "10–21 days",
  Icon:      IconSmartphone,
  Art:       MobileArt,
  FrameDeco: MobileFrameDeco,
};
