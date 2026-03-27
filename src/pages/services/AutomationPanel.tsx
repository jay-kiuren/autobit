// ─── Panel: Workflow Automation ───────────────────────────────────────────────
// Accent    : #2997ff
// Design    : Apple "feature stage" — full-width pipeline canvas centre,
//             headline + live terminal side by side above it,
//             Apple-style spec strip below.

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IconGear } from "./components/Icons";

const ACCENT    = "#2997ff";
const CTA_COLOR = "#2997ff";

export const AutomationFrameDeco = ({ accent }: { accent: string }) => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.07}} preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="bp-d" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill={accent}/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bp-d)"/>
  </svg>
);

function useCounter(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

const PipelineCanvas = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const stages = [
    { x:55,  label:"Trigger",   sub:"Webhook / Cron"   },
    { x:205, label:"Filter",    sub:"Conditions"        },
    { x:355, label:"Transform", sub:"Map / Enrich"      },
    { x:505, label:"Action",    sub:"API / DB / Email"  },
    { x:655, label:"Done",      sub:"Logged · Notified" },
  ];
  const branch = [
    { x:205, label:"Schedule" },
    { x:355, label:"Enrich"   },
    { x:505, label:"Slack"    },
  ];
  return (
    <svg key={animKey} viewBox="0 0 760 220" fill="none" style={{width:"100%",height:"100%"}}>
      <defs>
        <filter id="pkt-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[0,1,2,3,4,5,6,7].map(i=><line key={i} x1={i*110} y1={0} x2={i*110} y2={220} stroke="rgba(255,255,255,0.02)" strokeWidth={1}/>)}
      <line x1={55} y1={88} x2={700} y2={88} stroke="rgba(255,255,255,0.07)" strokeWidth={1.5}/>
      <path d="M 250 88 L 250 145 L 560 145 L 560 88" stroke="rgba(255,255,255,0.04)" strokeWidth={1.5} fill="none"/>
      {[135,285,435,585].map((x,i)=>(
        <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.8+i*0.06}}>
          <line x1={x} y1={88} x2={x+70} y2={88} stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="4 3"/>
          <path d={`M${x+66} 85 L${x+70} 88 L${x+66} 91`} stroke="rgba(255,255,255,0.15)" strokeWidth={1.2} fill="none"/>
        </motion.g>
      ))}
      {stages.map((n,i)=>(
        <motion.g key={i} initial={{opacity:0,scale:0.6}} animate={active?{opacity:1,scale:1}:{opacity:0,scale:0.6}}
          transition={{delay:i*0.1,duration:0.45,ease:[0.22,1,0.36,1]}}>
          {(i===0||i===4)&&(
            <motion.circle cx={n.x+40} cy={88} r={30}
              stroke={i===0?`${ACCENT}18`:"rgba(48,209,88,0.13)"} strokeWidth={1} fill="none"
              animate={active?{r:[30,34,30]}:{}} transition={{duration:2.8,repeat:Infinity,ease:"easeInOut"}}/>
          )}
          <rect x={n.x} y={68} width={80} height={40} rx={10}
            fill={i===0?`${ACCENT}10`:i===4?"rgba(48,209,88,0.07)":"rgba(255,255,255,0.03)"}
            stroke={i===0?`${ACCENT}32`:i===4?"rgba(48,209,88,0.25)":"rgba(255,255,255,0.06)"} strokeWidth={1}/>
          <text x={n.x+40} y={85} textAnchor="middle" fontSize={10} fill={i===0?"rgba(255,255,255,0.82)":i===4?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.5)"}
            fontWeight={600} fontFamily="system-ui">{n.label}</text>
          <text x={n.x+40} y={100} textAnchor="middle" fontSize={7.5} fill="rgba(255,255,255,0.2)" fontFamily="monospace">{n.sub}</text>
        </motion.g>
      ))}
      {branch.map((n,i)=>(
        <motion.g key={i} initial={{opacity:0,y:8}} animate={active?{opacity:1,y:0}:{opacity:0,y:8}} transition={{delay:0.6+i*0.1}}>
          <rect x={n.x} y={130} width={80} height={28} rx={7}
            fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
          <text x={n.x+40} y={148} textAnchor="middle" fontSize={8.5} fill="rgba(255,255,255,0.22)" fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
      <motion.circle r={5} fill={ACCENT} filter="url(#pkt-glow)"
        animate={active?{x:[95,245,395,545,695],y:[88,88,88,88,88],opacity:[0,1,1,1,0]}:{opacity:0}}
        transition={{duration:2.4,repeat:Infinity,repeatDelay:0.6,ease:"linear"}}/>
      <motion.circle r={3.5} fill="rgba(255,255,255,0.32)"
        animate={active?{x:[95,250,250,400,505,560,560,695],y:[88,88,145,145,145,145,88,88],opacity:[0,0.6,0.6,0.6,0.6,0.6,0.6,0]}:{opacity:0}}
        transition={{duration:3.2,repeat:Infinity,repeatDelay:0.3,delay:1.3,ease:"linear"}}/>
      {[{text:"Invoice #8821 auto-filed",y:172,d:1.0},{text:"Slack: Sales team notified",y:195,d:2.5}].map((t,i)=>(
        <motion.g key={i}
          animate={active?{opacity:[0,1,1,0],x:[14,0,0,-6]}:{opacity:0}}
          transition={{delay:t.d,duration:2.8,times:[0,0.1,0.8,1],repeat:Infinity,repeatDelay:2}}>
          <rect x={6} y={t.y} width={172} height={18} rx={6}
            fill="rgba(48,209,88,0.07)" stroke="rgba(48,209,88,0.16)" strokeWidth={1}/>
          <circle cx={17} cy={t.y+9} r={3} fill="#30d158" opacity={0.6}/>
          <text x={26} y={t.y+13} fontSize={8} fill="rgba(255,255,255,0.42)" fontFamily="monospace">{t.text}</text>
        </motion.g>
      ))}
      <motion.rect x={0} y={0} width={760} height={1.5} fill={`${ACCENT}22`}
        animate={active?{y:[0,220,0]}:{}}
        transition={{duration:4,repeat:Infinity,ease:"linear",delay:0.5}}/>
    </svg>
  );
};

export const AutomationFullPanel = ({
  active, animKey, sectionRef,
}: {
  active: boolean;
  animKey: number;
  sectionRef: (el: HTMLDivElement | null) => void;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(innerRef, { amount: 0.2 });
  const runs     = useCounter(1284, inView, 1600);
  const saved    = useCounter(48,   inView, 1200);

  const logs = [
    "Invoice #8821 filed to Google Drive",
    "Lead from Facebook → CRM updated",
    "Slack: Sales team notified",
    "Notion page created for project",
    "Airtable row appended · ref #0048",
  ];
  const [logIdx, setLogIdx] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setLogIdx(i => (i + 1) % logs.length), 2200);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div id="automation"
      ref={el => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        sectionRef(el);
      }}
      style={{
        background:"#000",position:"relative",overflow:"hidden",
        minHeight:"90vh",display:"flex",flexDirection:"column",
        justifyContent:"center",
        padding:"clamp(64px,8vw,100px) 0 clamp(48px,6vw,80px)",
        zIndex:2,marginBottom:-36,
      }}>

      <div style={{position:"absolute",top:"10%",right:"-10%",width:"65%",height:"80%",
        background:`radial-gradient(ellipse at 70% 50%,${ACCENT}07 0%,transparent 65%)`,
        pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,
        background:`linear-gradient(90deg,transparent,${ACCENT}38,transparent)`}}/>

      <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
        style={{position:"absolute",top:20,right:"clamp(16px,4vw,48px)",
          display:"flex",alignItems:"center",gap:6,
          background:"rgba(41,151,255,0.06)",border:`1px solid ${ACCENT}20`,
          borderRadius:980,padding:"5px 14px"}}>
        <motion.div style={{width:6,height:6,borderRadius:"50%",background:ACCENT}}
          animate={{opacity:[1,0.2,1]}} transition={{duration:1.1,repeat:Infinity}}/>
        <span style={{fontSize:10,fontWeight:700,color:ACCENT,letterSpacing:"0.12em"}}>LIVE</span>
      </motion.div>

      <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
        width:"100%",position:"relative",zIndex:1}}>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
          gap:"clamp(32px,5vw,80px)",alignItems:"flex-start",
          marginBottom:"clamp(28px,4vw,48px)"}}>

          <motion.div initial={{opacity:0,x:-44}} whileInView={{opacity:1,x:0}}
            viewport={{once:false,amount:0.3}} transition={{duration:0.75,ease:[0.22,1,0.36,1]}}>

            <div style={{display:"inline-flex",alignItems:"center",gap:6,
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:980,padding:"4px 13px",marginBottom:22}}>
              <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:"rgba(255,255,255,0.38)"}}>
                WORKFLOW AUTOMATION
              </span>
            </div>

            <h2 style={{fontSize:"clamp(36px,4.8vw,72px)",fontWeight:800,
              letterSpacing:"-2.5px",lineHeight:1.02,color:"#f5f5f7",margin:"0 0 20px"}}>
              Eliminate<br/>
              <span style={{color:"rgba(255,255,255,0.25)"}}>manual work.</span>
            </h2>

            <p style={{fontSize:"clamp(14px,1.05vw,16px)",lineHeight:1.75,
              color:"rgba(255,255,255,0.32)",margin:"0 0 28px",maxWidth:420}}>
              Zapier, Make, and n8n pipelines designed and deployed to remove every repetitive task from your operation — permanently.
            </p>

            <span style={{display:"inline-block",fontSize:10,fontWeight:500,
              letterSpacing:"0.05em",padding:"4px 11px",borderRadius:6,
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",
              color:"rgba(255,255,255,0.26)",fontFamily:"monospace",marginBottom:28}}>
              n8n · Zapier · Make · Airtable · Notion
            </span>

            <div>
              <button
                onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                style={{background:CTA_COLOR,color:"#fff",border:"none",cursor:"pointer",
                  padding:"13px 30px",borderRadius:980,fontSize:15,fontWeight:600,
                  boxShadow:"0 4px 24px rgba(41,151,255,0.28)",
                  transition:"all 0.22s ease",letterSpacing:"-0.1px"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}
              >
                Get a quote →
              </button>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
            viewport={{once:false,amount:0.3}} transition={{duration:0.75,delay:0.15,ease:[0.22,1,0.36,1]}}
            style={{background:"rgba(8,8,10,0.96)",border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:16,overflow:"hidden"}}>
            <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",
              background:"rgba(255,255,255,0.02)",display:"flex",alignItems:"center",gap:6}}>
              {["#ff375f","#ff9f0a","#30d158"].map((c,i)=>(
                <div key={i} style={{width:9,height:9,borderRadius:"50%",background:c,opacity:0.5}}/>
              ))}
              <span style={{fontFamily:"monospace",fontSize:9,color:"rgba(255,255,255,0.16)",marginLeft:8,letterSpacing:"0.08em"}}>
                autobit-automation · activity log
              </span>
            </div>
            <div style={{padding:"16px 18px",fontFamily:"monospace",fontSize:11}}>
              {[...Array(4)].map((_,idx)=>{
                const entry = logs[(logIdx-idx+logs.length)%logs.length];
                const cur   = idx===0;
                return (
                  <motion.div key={`${logIdx}-${idx}`}
                    initial={{opacity:0,x:cur?8:0}} animate={{opacity:cur?1:0.16-idx*0.03,x:0}}
                    transition={{duration:0.3}}
                    style={{display:"flex",alignItems:"center",gap:10,
                      padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
                    <span style={{color:cur?ACCENT:"rgba(255,255,255,0.16)",fontSize:9}}>›</span>
                    <span style={{color:cur?"rgba(255,255,255,0.68)":"rgba(255,255,255,0.16)",flex:1}}>{entry}</span>
                    {cur&&(
                      <motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.8,repeat:Infinity}}
                        style={{color:ACCENT,fontSize:8}}>▋</motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div style={{padding:"10px 18px",borderTop:"1px solid rgba(255,255,255,0.04)",
              display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:9,color:"rgba(255,255,255,0.16)",fontFamily:"monospace"}}>
                {runs.toLocaleString()} tasks processed today
              </span>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <motion.div style={{width:5,height:5,borderRadius:"50%",background:"#30d158"}}
                  animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
                <span style={{fontSize:9,color:"#30d158",fontFamily:"monospace"}}>Running</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.15}}
          transition={{duration:0.85,delay:0.18,ease:[0.22,1,0.36,1]}}
          style={{borderRadius:"clamp(14px,1.5vw,20px)",border:"1px solid rgba(255,255,255,0.07)",
            background:"rgba(255,255,255,0.012)",overflow:"hidden",
            height:"clamp(180px,22vw,300px)",position:"relative"}}>
          <div style={{position:"absolute",top:0,left:"8%",right:"8%",height:1,
            background:`linear-gradient(90deg,transparent,${ACCENT}38,transparent)`,zIndex:1}}/>
          <PipelineCanvas active={active} animKey={animKey}/>
        </motion.div>

        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.2}} transition={{duration:0.65,delay:0.35}}
          style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
            marginTop:"clamp(10px,1.5vw,16px)",
            border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:"clamp(10px,1.2vw,16px)",overflow:"hidden"}}>
          {[
            {label:"Runs / day",  value:runs.toLocaleString(), unit:"tasks"  },
            {label:"Time saved",  value:`${saved}`,            unit:"hrs/wk" },
            {label:"Error rate",  value:"0.2",                 unit:"%"      },
            {label:"Deploy time", value:"2–3",                 unit:"days"   },
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.016)",
              padding:"clamp(16px,2.2vw,26px) clamp(14px,1.8vw,24px)",
              borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none"}}>
              <div style={{fontSize:"clamp(20px,2.8vw,38px)",fontWeight:800,
                color:"#f5f5f7",letterSpacing:"-1px",lineHeight:1,marginBottom:5}}>{s.value}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",marginBottom:2,fontFamily:"monospace"}}>{s.unit}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.18)",lineHeight:1.4}}>{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <div style={{position:"absolute",bottom:0,left:0,right:0,height:90,
        background:"linear-gradient(to bottom,transparent,#000)",pointerEvents:"none",zIndex:5}}/>
    </div>
  );
};

export const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <PipelineCanvas active={active} animKey={animKey}/>
);

export const automationData = {
  id:"automation", eyebrow:"Workflow Automation",
  heading:"Eliminate\nmanual work.",
  desc:"Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.",
  accent:ACCENT, badge:"Automation", uniqueTag:"n8n · Zapier · Make",
  price:"From $800", timeline:"2–5 days",
  Icon:IconGear, Art:AutomationArt,
  FrameDeco:AutomationFrameDeco, FullPanel:AutomationFullPanel,
};