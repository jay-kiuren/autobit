// ─── Panel: Web Applications ──────────────────────────────────────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconMonitor } from "./components/Icons";

const ACCENT = "#bf5af2";
const FONT   = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

export const WebAppsFrameDeco = ({ accent }: { accent: string }) => null;

export const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 700 360" fill="none" style={{width:"100%",height:"100%"}}>
    <defs>
      <linearGradient id="wag" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#bf5af2" stopOpacity="0.01"/>
      </linearGradient>
    </defs>
    {/* App chrome — no outer stroke */}
    <rect width={700} height={360} rx={14} fill="rgba(10,8,16,0.98)"/>
    <rect width={700} height={38} rx={14} fill="rgba(255,255,255,0.025)"/>
    <rect y={26} width={700} height={12} fill="rgba(255,255,255,0.025)"/>
    {["#ff375f","#ff9f0a","#30d158"].map((c,i)=><circle key={i} cx={16+i*18} cy={19} r={5} fill={c} opacity={0.65}/>)}
    <text x={340} y={23} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.25)" fontFamily="monospace">autobit-dashboard · v2.4.1</text>
    {/* Sidebar */}
    <rect x={0} y={38} width={58} height={322} fill="rgba(255,255,255,0.015)"/>
    {[0,1,2,3,4].map(i=>(
      <rect key={i} x={8} y={52+i*52} width={42} height={36} rx={8}
        fill={i===0?"rgba(191,90,242,0.12)":"transparent"}/>
    ))}
    {/* KPI cards — no stroke */}
    {[
      {x:66, label:"Revenue",   val:"₱284,500", sub:"+18%", color:"#bf5af2"},
      {x:228,label:"Users",     val:"12,840",   sub:"+7%",  color:"#30d158"},
      {x:390,label:"Uptime",    val:"99.9%",    sub:"30 days",color:"#64d2ff"},
      {x:552,label:"Load time", val:"187ms",    sub:"avg",  color:"#ff9f0a"},
    ].map((k,i)=>(
      <motion.g key={i} initial={{opacity:0,y:-10}} animate={active?{opacity:1,y:0}:{opacity:0,y:-10}} transition={{delay:i*0.1}}>
        <rect x={k.x} y={42} width={148} height={64} rx={10} fill="rgba(255,255,255,0.025)"/>
        <text x={k.x+12} y={64} fontSize={11} fill="rgba(255,255,255,0.28)">{k.label}</text>
        <text x={k.x+12} y={84} fontSize={17} fill="#f5f5f7" fontWeight={700}>{k.val}</text>
        <rect x={k.x+12} y={90} width={38} height={10} rx={5} fill={`${k.color}18`}/>
        <text x={k.x+31} y={98} textAnchor="middle" fontSize={7} fill={k.color}>{k.sub}</text>
      </motion.g>
    ))}
    {/* Line chart — no border rect */}
    <rect x={66} y={116} width={400} height={140} rx={10} fill="rgba(255,255,255,0.018)"/>
    <text x={78} y={132} fontSize={9} fill="rgba(255,255,255,0.28)">Revenue / Month</text>
    <motion.path d="M78,236 C110,210 140,198 172,185 C204,172 236,190 268,172 C300,154 332,158 364,138 C396,118 420,124 452,112"
      stroke="#bf5af2" strokeWidth={2} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.4,duration:1.4,ease:"easeOut"}}/>
    <motion.path d="M78,236 C110,210 140,198 172,185 C204,172 236,190 268,172 C300,154 332,158 364,138 C396,118 420,124 452,112 L452,236 Z"
      fill="url(#wag)" initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.6,duration:0.8}}/>
    <motion.g initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:1.6}}>
      <rect x={336} y={118} width={68} height={28} rx={6} fill="#bf5af2"/>
      <text x={370} y={135} textAnchor="middle" fontSize={10} fill="#fff" fontWeight={700}>₱58.2k</text>
    </motion.g>
    {/* Bar chart — no border rect */}
    <rect x={476} y={116} width={210} height={140} rx={10} fill="rgba(255,255,255,0.018)"/>
    <text x={488} y={132} fontSize={9} fill="rgba(255,255,255,0.28)">Weekly Sessions</text>
    {[42,68,30,88,55,76,60].map((h,i)=>(
      <motion.rect key={i} x={488+i*26} rx={4} width={18}
        fill={i===3?"#bf5af2":"rgba(191,90,242,0.28)"}
        initial={{height:0,y:246}} animate={active?{height:h*0.85,y:246-h*0.85}:{height:0,y:246}}
        transition={{duration:0.5,delay:0.4+i*0.06,ease:"easeOut"}}/>
    ))}
    {/* Table — no border */}
    <rect x={66} y={266} width={620} height={80} rx={10} fill="rgba(255,255,255,0.018)"/>
    <text x={78} y={281} fontSize={8} fill="rgba(255,255,255,0.22)" letterSpacing={1}>RECENT TRANSACTIONS</text>
    {[
      {name:"Santos Corp", status:"Paid",    val:"₱45,000"},
      {name:"Reyes & Co.", status:"Pending", val:"₱12,800"},
      {name:"LGU Cagayan", status:"Paid",    val:"₱88,000"},
    ].map((r,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.9+i*0.1}}>
        <text x={78} y={296+i*16} fontSize={9} fill="rgba(255,255,255,0.6)">{r.name}</text>
        <rect x={260} y={288+i*16} width={40} height={12} rx={6}
          fill={r.status==="Paid"?"rgba(48,209,88,0.12)":"rgba(255,159,10,0.12)"}/>
        <text x={280} y={297+i*16} textAnchor="middle" fontSize={7.5}
          fill={r.status==="Paid"?"#30d158":"#ff9f0a"}>{r.status}</text>
        <text x={676} y={296+i*16} textAnchor="end" fontSize={9} fill="rgba(255,255,255,0.4)">{r.val}</text>
      </motion.g>
    ))}
  </svg>
);

export const WebAppsFullPanel = ({
  active, animKey, sectionRef,
}: { active: boolean; animKey: number; sectionRef: (el: HTMLDivElement | null) => void }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <div id="web-apps"
      ref={el => {
        (ref as React.MutableRefObject<HTMLDivElement|null>).current = el;
        sectionRef(el);
      }}
      style={{background:"#000",position:"relative",overflow:"hidden",
        minHeight:"90vh",display:"flex",flexDirection:"column",
        justifyContent:"center",padding:"80px 0 60px",zIndex:4,marginBottom:-36,fontFamily:FONT}}>

      {/* Section bg stays */}
      <img src="https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1600&q=80" alt=""
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
          filter:"brightness(0.05) saturate(0.2)",pointerEvents:"none"}}/>
      {/* Top feather */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:160,
        background:"linear-gradient(to bottom,#000 0%,transparent 100%)",
        pointerEvents:"none",zIndex:6}}/>
      <div style={{position:"absolute",top:"10%",right:"-8%",width:"60%",height:"80%",
        background:`radial-gradient(ellipse at 70% 50%,${ACCENT}07 0%,transparent 65%)`,
        pointerEvents:"none"}}/>

      <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
        width:"100%",position:"relative",zIndex:1}}>

        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
          style={{textAlign:"center",marginBottom:"clamp(40px,6vw,72px)"}}>
          <div style={{display:"inline-flex",alignItems:"center",
            background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:980,padding:"4px 13px",marginBottom:20}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>WEB APPLICATIONS</span>
          </div>
          <h2 style={{fontSize:"clamp(36px,5.5vw,76px)",fontWeight:800,
            letterSpacing:"-3px",lineHeight:1.0,color:"#f5f5f7",margin:"0 0 18px",fontFamily:FONT}}>
            A feast for<br/>
            <span style={{color:"rgba(255,255,255,0.25)"}}>your data.</span>
          </h2>
          <p style={{fontSize:"clamp(14px,1.1vw,17px)",lineHeight:1.7,
            color:"rgba(255,255,255,0.35)",margin:"0 auto",maxWidth:520}}>
            React, Firebase, Vercel. Full-stack web apps built for speed, scale, and clean UX — from dashboards to full CRM systems.
          </p>
        </motion.div>

        {/* Big numbers row */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.2}} transition={{duration:0.6,delay:0.1}}
          style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
            marginBottom:"clamp(32px,4vw,52px)",
            background:"rgba(255,255,255,0.018)",
            borderRadius:20,overflow:"hidden"}}>
          {[
            {value:"284,500", unit:"₱ data points tracked"},
            {value:"< 187",   unit:"ms average load time"},
            {value:"99.9",    unit:"% uptime guaranteed"},
          ].map((s,i)=>(
            <div key={i} style={{
              padding:"clamp(24px,3vw,40px) clamp(20px,3vw,40px)",
              borderRight:i<2?"1px solid rgba(255,255,255,0.05)":"none",
              textAlign:"center"}}>
              <div style={{fontSize:"clamp(32px,4.5vw,60px)",fontWeight:800,
                color:"#f5f5f7",letterSpacing:"-2px",lineHeight:1,marginBottom:10}}>
                {inView ? s.value : "—"}
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.3)",lineHeight:1.5,
                fontFamily:"monospace",letterSpacing:"0.02em"}}>{s.unit}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard art — NO background image, proper clip */}
        <motion.div initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.15}} transition={{duration:0.8,delay:0.2,ease:[0.22,1,0.36,1]}}
          style={{
            borderRadius:"clamp(14px,1.5vw,22px)",
            background:"rgba(255,255,255,0.018)",
            overflow:"hidden",
            height:"clamp(220px,30vw,380px)",
            position:"relative",
            transform:"translateZ(0)",
          }}>
          <WebAppsArt active={active} animKey={animKey}/>
        </motion.div>

        {/* Stack + CTA */}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}}
          viewport={{once:false}} transition={{delay:0.35,duration:0.6}}
          style={{display:"flex",alignItems:"center",justifyContent:"center",
            gap:24,flexWrap:"wrap",marginTop:32}}>
          <span style={{fontSize:10,fontWeight:500,letterSpacing:"0.05em",
            padding:"4px 12px",borderRadius:6,
            background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
            color:"rgba(255,255,255,0.38)",fontFamily:"monospace"}}>
            React · Firebase · Vercel · Supabase
          </span>
          <button onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            style={{background:"#2997ff",color:"#fff",border:"none",cursor:"pointer",
              padding:"12px 28px",borderRadius:980,fontSize:14,fontWeight:600,
              boxShadow:"0 4px 20px rgba(41,151,255,0.26)",transition:"all 0.22s ease",fontFamily:FONT}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}>
            Get a quote →
          </button>
        </motion.div>
      </div>

      <div style={{position:"absolute",bottom:0,left:0,right:0,height:150,
        background:"linear-gradient(to bottom,transparent,#000)",pointerEvents:"none",zIndex:5}}/>
    </div>
  );
};

export const webAppsData = {
  id:"web-apps", eyebrow:"Web Applications",
  heading:"Dashboards,\nCRMs, and SaaS.",
  desc:"React, Firebase, Vercel. Full-stack web apps built for speed and clean UX.",
  accent:ACCENT, badge:"Full-Stack", uniqueTag:"React · Firebase · Vercel",
  price:"From $1,500", timeline:"7–14 days",
  Icon:IconMonitor, Art:WebAppsArt,
  FrameDeco:WebAppsFrameDeco, FullPanel:WebAppsFullPanel,
};