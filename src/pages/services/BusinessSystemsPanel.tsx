// ─── Panel: Business Systems ──────────────────────────────────────────────────
// Accent : #ff9f0a (orange)
// Frame  : Tick-mark rulers top & bottom + vertical side accent bars
// Art    : ERP dashboard — KPI tiles, donut chart, activity feed
//
// To edit this panel's text → change `businessSystemsData` at the bottom.
// To edit the illustration  → edit the `BusinessSystemsArt` component below.
// To edit the frame style   → edit the `BusinessSystemsFrameDeco` component below.

import { motion } from "framer-motion";
import { IconLink } from "./components/Icons";

// ── Frame decoration ──────────────────────────────────────────────────────────
export const BusinessSystemsFrameDeco = ({ accent }: { accent: string }) => (
  <>
    <div style={{position:"absolute",top:38,left:16,right:16,height:1,
      background:`linear-gradient(90deg,${accent}44,${accent}18,${accent}44)`,
    }}/>
    {Array.from({length:12}).map((_,i)=>(
      <div key={i} style={{
        position:"absolute",top:34,
        left:`${8+i*8}%`,
        width:1,height:i%4===0?8:4,
        background:`${accent}${i%4===0?"55":"28"}`,
      }}/>
    ))}
    <div style={{position:"absolute",bottom:38,left:16,right:16,height:1,
      background:`linear-gradient(90deg,${accent}44,${accent}18,${accent}44)`,
    }}/>
    <div style={{position:"absolute",top:"15%",bottom:"15%",left:0,width:2,
      background:`linear-gradient(to bottom,transparent,${accent}50,transparent)`,
    }}/>
    <div style={{position:"absolute",top:"15%",bottom:"15%",right:0,width:2,
      background:`linear-gradient(to bottom,transparent,${accent}50,transparent)`,
    }}/>
  </>
);

// ── Illustration ──────────────────────────────────────────────────────────────
export const BusinessSystemsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
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
    {[
      {text:"Restock: 20 items flagged",   time:"2m", color:"#ff9f0a"},
      {text:"Payroll processed — 34 staff", time:"1h", color:"#30d158"},
      {text:"Monthly report generated",     time:"3h", color:"#bf5af2"},
      {text:"Server maintenance scheduled", time:"5h", color:"#ff375f"},
      {text:"3 new staff onboarded",        time:"1d", color:"#64d2ff"},
    ].map((t,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.5+i*0.1}}>
        <rect x={158} y={122+i*19} width={3} height={14} rx={2} fill={t.color}/>
        <text x={168} y={133+i*19} fontSize={8.5} fill="rgba(255,255,255,0.55)">{t.text}</text>
        <text x={396} y={133+i*19} textAnchor="end" fontSize={7.5} fill="rgba(255,255,255,0.22)">{t.time}</text>
      </motion.g>
    ))}
  </svg>
);

// ── Panel data — edit text content here ──────────────────────────────────────
export const businessSystemsData = {
  id:        "systems",
  eyebrow:   "Business Systems",
  heading:   "One system.\nYour entire operation.",
  desc:      "Inventory, HR, finance, scheduling — unified in one platform.",
  accent:    "#ff9f0a",
  badge:     "Enterprise",
  uniqueTag: "ERP · POS · Operations",
  price:     "From $3,000",
  timeline:  "14–30 days",
  Icon:      IconLink,
  Art:       BusinessSystemsArt,
  FrameDeco: BusinessSystemsFrameDeco,
};
