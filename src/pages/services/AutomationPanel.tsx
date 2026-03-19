// ─── Panel: Workflow Automation ───────────────────────────────────────────────
// Accent    : #2997ff (blue)
// Layout    : FULL IMMERSIVE — overrides the default 2-col grid
//             Art bleeds edge-to-edge, section takes ~90vh, live counters
//
// To edit text content  → change `automationData` at the bottom
// To edit the art       → edit `AutomationArt` below
// To edit frame/deco    → edit `AutomationFrameDeco` below
// To edit the layout    → edit `AutomationFullPanel` below

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconGear } from "../components/Icons";

const ACCENT = "#2997ff";

// ── Live counter hook ─────────────────────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ── Frame decoration (fallback, not used in full layout) ──────────────────────
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

// ── Expanded pipeline illustration ────────────────────────────────────────────
export const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 700 400" fill="none" style={{width:"100%",height:"100%"}}>
    <defs>
      <filter id="glow-auto"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    {/* Grid */}
    {[0,1,2,3,4,5,6,7].map(i=><line key={`v${i}`} x1={i*100} y1={0} x2={i*100} y2={400} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1={0} y1={i*100} x2={700} y2={i*100} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}

    {/* Incoming queue (left side) */}
    <motion.text x={14} y={38} fontSize={8} fill={`${ACCENT}55`} fontFamily="monospace" letterSpacing={1}
      initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.1}}>
      QUEUE · 3 pending
    </motion.text>
    {[0,1,2].map(i=>(
      <motion.g key={`q${i}`} initial={{opacity:0,x:-16}} animate={active?{opacity:1,x:0}:{opacity:0,x:-16}} transition={{delay:0.15+i*0.12}}>
        <rect x={14} y={48+i*54} width={68} height={38} rx={8} fill="rgba(255,255,255,0.025)" stroke={`${ACCENT}25`} strokeWidth={1}/>
        <circle cx={27} cy={67+i*54} r={3.5} fill={ACCENT} opacity={0.55}/>
        <rect x={37} y={62+i*54} width={32} height={4} rx={2} fill="rgba(255,255,255,0.1)"/>
        <rect x={37} y={70+i*54} width={22} height={3} rx={1.5} fill="rgba(255,255,255,0.06)"/>
      </motion.g>
    ))}

    {/* Main pipeline nodes */}
    {[
      {x:130, y:70,  label:"Trigger",  sub:"Webhook",    color:ACCENT,     w:88},
      {x:274, y:38,  label:"Filter",   sub:"Condition",  color:ACCENT,     w:88},
      {x:274, y:118, label:"Timer",    sub:"Cron",       color:"#64d2ff",  w:88},
      {x:418, y:70,  label:"Process",  sub:"Transform",  color:ACCENT,     w:88},
      {x:558, y:38,  label:"Notify",   sub:"Slack / Email", color:"#30d158", w:88},
      {x:558, y:118, label:"Store",    sub:"Database",   color:"#bf5af2",  w:88},
      {x:612, y:220, label:"Done ✓",   sub:"Completed",  color:"#30d158",  w:76},
    ].map((n,i)=>(
      <motion.g key={i} initial={{opacity:0,scale:0.7}} animate={active?{opacity:1,scale:1}:{opacity:0,scale:0.7}} transition={{delay:i*0.1,duration:0.45}}>
        <rect x={n.x} y={n.y} width={n.w} height={50} rx={10} fill="rgba(255,255,255,0.035)" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.5}/>
        <rect x={n.x} y={n.y} width={n.w} height={50} rx={10} fill={`${n.color}0c`}/>
        <text x={n.x+n.w/2} y={n.y+22} textAnchor="middle" fontSize={9.5} fill="rgba(255,255,255,0.75)" fontFamily="monospace" fontWeight={600}>{n.label}</text>
        <text x={n.x+n.w/2} y={n.y+36} textAnchor="middle" fontSize={7.5} fill={`${n.color}88`} fontFamily="monospace">{n.sub}</text>
      </motion.g>
    ))}

    {/* Connections */}
    {[
      [218,95,  274,63],
      [218,95,  274,143],
      [362,63,  418,95],
      [362,143, 418,95],
      [506,95,  558,63],
      [506,95,  558,143],
      [646,63,  612,244],
      [646,143, 612,244],
    ].map(([x1,y1,x2,y2],i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.85+i*0.06}}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth={1.5} strokeOpacity={0.22} strokeDasharray="5 4"/>
        <circle cx={x2} cy={y2} r={3} fill={ACCENT} opacity={0.45}/>
      </motion.g>
    ))}

    {/* Animated packet — upper path */}
    <motion.circle r={5} fill={ACCENT} filter="url(#glow-auto)"
      animate={active?{x:[174,274,372,462,558,650],y:[95,63,63,95,63,244],opacity:[0,1,1,1,1,0]}:{opacity:0}}
      transition={{duration:2.8,repeat:Infinity,repeatDelay:0.5,ease:"linear"}}/>

    {/* Animated packet — lower path */}
    <motion.circle r={4} fill="#64d2ff" opacity={0.8}
      animate={active?{x:[174,274,372,462,558,650],y:[95,143,143,95,143,244],opacity:[0,0.8,0.8,0.8,0.8,0]}:{opacity:0}}
      transition={{duration:2.8,repeat:Infinity,repeatDelay:0.5,delay:1.4,ease:"linear"}}/>

    {/* Toast notifications */}
    {[
      {text:"✓ Invoice auto-filed",  y:290, d:1.2},
      {text:"✓ Slack alert sent",    y:330, d:2.6},
      {text:"✓ DB row created",      y:370, d:4.0},
    ].map((t,i)=>(
      <motion.g key={i}
        animate={active?{opacity:[0,1,1,0],x:[30,0,0,-8]}:{opacity:0}}
        transition={{delay:t.d,duration:2.4,times:[0,0.1,0.8,1],repeat:Infinity,repeatDelay:2}}>
        <rect x={14} y={t.y} width={168} height={28} rx={8} fill="rgba(48,209,88,0.1)" stroke="rgba(48,209,88,0.28)" strokeWidth={1}/>
        <circle cx={26} cy={t.y+14} r={3.5} fill="#30d158" opacity={0.7}/>
        <text x={36} y={t.y+18} fontSize={9} fill="rgba(255,255,255,0.6)" fontFamily="monospace">{t.text}</text>
      </motion.g>
    ))}

    {/* Stats bar */}
    <rect x={14} y={275} width={672} height={1} fill={`${ACCENT}15`}/>
    {[
      {x:200, label:"Runs / day",  val:"1,284"},
      {x:350, label:"Success",     val:"99.8%"},
      {x:500, label:"Time saved",  val:"48 hrs"},
      {x:620, label:"Errors",      val:"0"},
    ].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:1.1+i*0.1}}>
        <text x={s.x} y={250} fontSize={7.5} fill="rgba(255,255,255,0.22)" fontFamily="monospace" letterSpacing={0.5}>{s.label}</text>
        <text x={s.x} y={268} fontSize={13} fill={ACCENT} fontWeight={700} fontFamily="monospace">{s.val}</text>
      </motion.g>
    ))}
  </svg>
);

// ── Full custom panel layout ──────────────────────────────────────────────────
// ServiceSections checks for `FullPanel` on a service entry.
// When found it renders this instead of the default 2-col grid.
// Remove `FullPanel` from automationData below to revert to default.

export const AutomationFullPanel = ({
  active,
  animKey,
  sectionRef,
}: {
  active: boolean;
  animKey: number;
  sectionRef: (el: HTMLDivElement | null) => void;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { amount: 0.25 });

  const runs  = useCounter(1284, inView, 1600);
  const saved = useCounter(48,   inView, 1200);

  return (
    <section
      id="automation"
      ref={el => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        sectionRef(el);
      }}
      style={{
        background: "#000",
        position: "relative",
        overflow: "hidden",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 0 60px",
        zIndex: 2,
        marginBottom: -36,
      }}>

      {/* Blueprint dot grid — full section */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.08}} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="full-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={ACCENT}/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#full-dots)"/>
      </svg>

      {/* Blue radial glow — ambient right */}
      <div style={{position:"absolute",top:"5%",right:"-5%",width:"60%",height:"90%",
        background:`radial-gradient(ellipse at 65% 50%, ${ACCENT}10 0%, transparent 65%)`,
        pointerEvents:"none",
      }}/>

      {/* Top accent line */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,
        background:`linear-gradient(90deg,transparent,${ACCENT}55,transparent)`,
      }}/>

      {/* LIVE indicator */}
      <motion.div
        initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
        style={{
          position:"absolute",top:22,right:"clamp(16px,4vw,48px)",
          display:"flex",alignItems:"center",gap:6,
          background:"rgba(41,151,255,0.08)",border:`1px solid ${ACCENT}30`,
          borderRadius:980,padding:"5px 14px",
        }}>
        <motion.div
          style={{width:6,height:6,borderRadius:"50%",background:ACCENT}}
          animate={{opacity:[1,0.25,1]}}
          transition={{duration:1.1,repeat:Infinity}}/>
        <span style={{fontSize:10,fontWeight:700,color:ACCENT,letterSpacing:"0.12em"}}>LIVE</span>
      </motion.div>

      {/* Page content */}
      <div style={{
        maxWidth:1320,margin:"0 auto",
        padding:"0 clamp(16px,4vw,48px)",
        width:"100%",position:"relative",zIndex:1,
      }}>

        {/* Top row: text + metric cards */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:"clamp(28px,4vw,72px)",
          alignItems:"center",
          marginBottom:"clamp(32px,4vw,56px)",
        }}>

          {/* ── Text ── */}
          <motion.div
            initial={{opacity:0,x:-44}} whileInView={{opacity:1,x:0}}
            viewport={{once:false,amount:0.3}}
            transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>

            {/* Badge */}
            <div style={{
              display:"inline-flex",alignItems:"center",gap:6,
              background:`${ACCENT}16`,border:`1px solid ${ACCENT}38`,
              borderRadius:980,padding:"4px 13px",marginBottom:22,
            }}>
              <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:ACCENT}}>
                WORKFLOW AUTOMATION
              </span>
            </div>

            <h2 style={{
              fontSize:"clamp(36px,5vw,72px)",fontWeight:800,
              letterSpacing:"-2.5px",lineHeight:1.02,
              color:"#f5f5f7",margin:"0 0 18px",whiteSpace:"pre-line",
            }}>
              {"Eliminate\nmanual work."}
            </h2>

            <p style={{
              fontSize:"clamp(14px,1.05vw,16px)",lineHeight:1.75,
              color:"rgba(255,255,255,0.38)",margin:"0 0 24px",maxWidth:400,
            }}>
              Zapier, Make, and n8n pipelines designed and deployed to remove every repetitive task from your operation — permanently.
            </p>

            {/* Stack tag */}
            <span style={{
              display:"inline-block",fontSize:10,fontWeight:500,
              letterSpacing:"0.05em",padding:"4px 11px",borderRadius:6,
              background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
              color:"rgba(255,255,255,0.38)",fontFamily:"monospace",marginBottom:28,
            }}>
              n8n · Zapier · Make · Airtable · Notion
            </span>

            <div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                style={{
                  background:ACCENT,color:"#fff",border:"none",cursor:"pointer",
                  padding:"13px 30px",borderRadius:980,fontSize:15,fontWeight:600,
                  boxShadow:`0 4px 24px ${ACCENT}38`,transition:"all 0.22s ease",
                  letterSpacing:"-0.1px",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 6px 32px ${ACCENT}55`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 4px 24px ${ACCENT}38`;}}
              >
                Get a quote →
              </button>
            </div>
          </motion.div>

          {/* ── Live metric cards ── */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[
              {label:"Runs / day",  value:runs.toLocaleString(),  unit:"tasks",  color:ACCENT,     delay:0.18},
              {label:"Time saved",  value:`${saved}`,             unit:"hrs/wk", color:"#64d2ff",  delay:0.28},
              {label:"Error rate",  value:"0.2",                  unit:"%",      color:"#30d158",  delay:0.38},
              {label:"Avg. deploy", value:"2–3",                  unit:"days",   color:"#bf5af2",  delay:0.48},
            ].map((m,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}}
                viewport={{once:false}} transition={{delay:m.delay,duration:0.55,ease:[0.22,1,0.36,1]}}
                style={{
                  background:"rgba(255,255,255,0.022)",
                  border:`1px solid ${m.color}20`,
                  borderRadius:16,padding:"18px 20px",
                  position:"relative",overflow:"hidden",
                }}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${m.color}70,transparent)`,
                }}/>
                <div style={{fontSize:9.5,color:"rgba(255,255,255,0.28)",
                  fontFamily:"monospace",letterSpacing:"0.06em",marginBottom:8,
                }}>
                  {m.label}
                </div>
                <div style={{fontSize:"clamp(22px,2.8vw,36px)",fontWeight:800,
                  color:m.color,letterSpacing:"-1px",lineHeight:1,
                }}>
                  {m.value}
                </div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.22)",marginTop:5,fontFamily:"monospace"}}>
                  {m.unit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-width pipeline art */}
        <motion.div
          initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.15}}
          transition={{duration:0.8,delay:0.2,ease:[0.22,1,0.36,1]}}
          style={{
            borderRadius:"clamp(14px,1.5vw,22px)",
            border:`1px solid ${ACCENT}18`,
            background:"rgba(255,255,255,0.012)",
            overflow:"hidden",
            height:"clamp(220px,30vw,400px)",
            position:"relative",
          }}>
          {/* Top shimmer */}
          <div style={{position:"absolute",top:0,left:"8%",right:"8%",height:1,
            background:`linear-gradient(90deg,transparent,${ACCENT}50,transparent)`,
            zIndex:1,
          }}/>
          <AutomationArt active={active} animKey={animKey}/>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:90,
        background:"linear-gradient(to bottom,transparent,#000)",
        pointerEvents:"none",zIndex:5,
      }}/>
    </section>
  );
};

// ── Panel data ────────────────────────────────────────────────────────────────
export const automationData = {
  id:        "automation",
  eyebrow:   "Workflow Automation",
  heading:   "Eliminate\nmanual work.",
  desc:      "Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.",
  accent:    ACCENT,
  badge:     "Automation",
  uniqueTag: "n8n · Zapier · Make",
  price:     "From $800",
  timeline:  "2–5 days",
  Icon:      IconGear,
  Art:       AutomationArt,
  FrameDeco: AutomationFrameDeco,
  FullPanel: AutomationFullPanel, // ← ServiceSections uses this when present
};
