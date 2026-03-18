// ─── Panel: Web Applications ──────────────────────────────────────────────────
// Accent : #bf5af2 (purple)
// Frame  : Double border + corner dots + diagonal shimmer
// Art    : CRM dashboard — revenue chart, bar chart, client table
//
// To edit this panel's text → change `webAppsData` at the bottom of this file.
// To edit the illustration  → edit the `WebAppsArt` component below.
// To edit the frame style   → edit the `WebAppsFrameDeco` component below.

import { motion } from "framer-motion";
import { IconMonitor } from "../components/Icons";

// ── Frame decoration ──────────────────────────────────────────────────────────
export const WebAppsFrameDeco = ({ accent }: { accent: string }) => (
  <>
    <div style={{position:"absolute",inset:10,borderRadius:14,
      border:`1px solid ${accent}18`,pointerEvents:"none",
    }}/>
    {[[10,10],[null,10],[10,null],[null,null]].map(([t,l],i)=>(
      <div key={i} style={{position:"absolute",
        top:t??undefined, bottom:t===null?10:undefined,
        left:l??undefined, right:l===null?10:undefined,
        width:6,height:6,borderRadius:"50%",
        background:accent,opacity:0.4,
      }}/>
    ))}
    <div style={{position:"absolute",inset:0,pointerEvents:"none",
      background:`linear-gradient(135deg,${accent}08 0%,transparent 40%,${accent}05 100%)`,
      borderRadius:"inherit",
    }}/>
  </>
);

// ── Illustration ──────────────────────────────────────────────────────────────
export const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <defs>
      <linearGradient id="wa1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#bf5af2" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(14,14,18,0.96)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    <rect x={0} y={0} width={72} height={240} fill="rgba(255,255,255,0.025)"/>
    {[{y:18,isActive:true},{y:56},{y:94},{y:132},{y:170}].map((item,i)=>(
      <rect key={i} x={8} y={item.y} width={56} height={30} rx={8} fill={item.isActive?"rgba(191,90,242,0.15)":"transparent"}/>
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

// ── Panel data — edit text content here ──────────────────────────────────────
export const webAppsData = {
  id:        "web-apps",
  eyebrow:   "Web Applications",
  heading:   "Dashboards,\nCRMs, and SaaS.",
  desc:      "React, Firebase, Vercel. Full-stack web apps built for speed and clean UX.",
  accent:    "#bf5af2",
  badge:     "Full-Stack",
  uniqueTag: "React · Firebase · Vercel",
  price:     "From $1,500",
  timeline:  "7–14 days",
  Icon:      IconMonitor,
  Art:       WebAppsArt,
  FrameDeco: WebAppsFrameDeco,
};
