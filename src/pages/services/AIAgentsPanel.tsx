// ─── Panel: AI Agents ─────────────────────────────────────────────────────────
// Accent    : #30d158 (green)
// Design    : Apple "caption gallery" idea — 3 tabs switching between use cases
//             Customer Support / Lead Qualification / Internal Ops
//             Each tab reveals a different live chat demo
//
// To edit text     → aiAgentsData at the bottom
// To edit the art  → each tab's ChatDemo component
// To edit layout   → AIAgentsFullPanel

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBot } from "./components/Icons";

const ACCENT = "#30d158";

// ── Frame deco (fallback) ─────────────────────────────────────────────────────
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
    <motion.div style={{position:"absolute",left:0,right:0,height:1,
      background:`linear-gradient(90deg,transparent,${accent}55,transparent)`,pointerEvents:"none",
    }} animate={{top:["10%","95%","10%"]}} transition={{duration:4,repeat:Infinity,ease:"linear"}}/>
  </>
);

// ── Chat demos per tab ────────────────────────────────────────────────────────
const tabs = [
  {
    label: "Customer Support",
    tag: "24/7 · Instant",
    messages: [
      {t:"Hi, my order hasn't arrived yet",        r:false},
      {t:"Order #4821 is out for delivery today!",  r:true},
      {t:"Expected by 3pm. Track here →",           r:true},
      {t:"Thank you!",                              r:false},
    ],
    stat: {label:"Avg. response", value:"0ms"},
  },
  {
    label: "Lead Qualification",
    tag: "Sales · Auto-route",
    messages: [
      {t:"We need automation for 50+ staff",        r:false},
      {t:"Perfect fit. Budget range?",              r:true},
      {t:"Around $5,000",                           r:false},
      {t:"Booking you with our team now ✓",         r:true},
    ],
    stat: {label:"Leads qualified", value:"94%"},
  },
  {
    label: "Internal Ops",
    tag: "HR · Finance · IT",
    messages: [
      {t:"I need to file a leave request",          r:false},
      {t:"Done. 3 days approved from March 10",     r:true},
      {t:"Payroll updated automatically",           r:true},
      {t:"Thanks, that was fast!",                  r:false},
    ],
    stat: {label:"Tasks automated", value:"1,284"},
  },
];

const ChatDemo = ({ tab, active }: { tab: typeof tabs[0]; active: boolean }) => (
  <div style={{
    background:"rgba(12,12,14,0.95)",
    borderRadius:16,
    border:`1px solid rgba(255,255,255,0.07)`,
    overflow:"hidden",
    height:"100%",
    display:"flex",
    flexDirection:"column",
  }}>
    {/* Header */}
    <div style={{
      padding:"14px 18px",
      borderBottom:`1px solid rgba(255,255,255,0.05)`,
      display:"flex",alignItems:"center",gap:10,
      background:"rgba(255,255,255,0.02)",
    }}>
      <div style={{width:32,height:32,borderRadius:"50%",
        background:`${ACCENT}20`,border:`1px solid ${ACCENT}40`,
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <div style={{width:8,height:8,borderRadius:"50%",background:ACCENT}}/>
      </div>
      <div>
        <div style={{fontSize:12,fontWeight:600,color:"#f5f5f7"}}>Autobit Agent</div>
        <div style={{fontSize:10,color:ACCENT,display:"flex",alignItems:"center",gap:4}}>
          <motion.div style={{width:5,height:5,borderRadius:"50%",background:ACCENT}}
            animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
          Online · {tab.tag}
        </div>
      </div>
    </div>

    {/* Messages */}
    <div style={{flex:1,padding:"16px 14px",display:"flex",flexDirection:"column",gap:8,overflowY:"hidden"}}>
      {tab.messages.map((m,i)=>(
        <motion.div key={`${tab.label}-${i}`}
          initial={{opacity:0,y:8}} animate={active?{opacity:1,y:0}:{opacity:0,y:8}}
          transition={{delay:i*0.18,duration:0.4}}
          style={{
            alignSelf:m.r?"flex-end":"flex-start",
            maxWidth:"78%",
            background:m.r?`${ACCENT}20`:"rgba(255,255,255,0.05)",
            border:`1px solid ${m.r?`${ACCENT}35`:"rgba(255,255,255,0.07)"}`,
            borderRadius:m.r?"14px 14px 4px 14px":"14px 14px 14px 4px",
            padding:"9px 13px",
            fontSize:12,
            color:m.r?"#d4fad4":"rgba(255,255,255,0.72)",
            lineHeight:1.45,
          }}>
          {m.t}
        </motion.div>
      ))}

      {/* Typing indicator */}
      <motion.div
        animate={active?{opacity:[0,1,0]}:{opacity:0}}
        transition={{delay:tab.messages.length*0.18+0.3,duration:1,repeat:Infinity,repeatDelay:2}}
        style={{alignSelf:"flex-start",display:"flex",gap:4,padding:"10px 14px",
          background:"rgba(255,255,255,0.04)",borderRadius:"14px 14px 14px 4px",
        }}>
        {[0,1,2].map(i=>(
          <motion.div key={i} style={{width:5,height:5,borderRadius:"50%",background:ACCENT}}
            animate={active?{y:[0,-4,0]}:{}} transition={{duration:0.5,delay:i*0.12,repeat:Infinity}}/>
        ))}
      </motion.div>
    </div>

    {/* Stat bar */}
    <div style={{
      padding:"10px 18px",
      borderTop:`1px solid rgba(255,255,255,0.05)`,
      display:"flex",alignItems:"center",justifyContent:"space-between",
    }}>
      <span style={{fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"monospace"}}>{tab.stat.label}</span>
      <span style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.75)",fontFamily:"monospace"}}>{tab.stat.value}</span>
    </div>
  </div>
);

// ── Illustration (for default renderer) ───────────────────────────────────────
export const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <rect x={10} y={0} width={400} height={240} rx={14} fill="rgba(20,20,20,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
    <rect x={10} y={0} width={400} height={42} rx={14} fill="rgba(255,255,255,0.04)"/>
    <rect x={10} y={30} width={400} height={12} fill="rgba(255,255,255,0.04)"/>
    <circle cx={38} cy={21} r={12} fill="rgba(48,209,88,0.15)" stroke="#30d158" strokeWidth={1.5}/>
    <text x={58} y={16} fontSize={11} fill="#f5f5f7" fontWeight={600}>Autobit AI Agent</text>
    <text x={58} y={28} fontSize={8.5} fill="#30d158">● Online · 0ms response</text>
    {[
      {t:"Hey, I need help with my order", r:false, d:0.2, y:52},
      {t:"Order #4821 shipped today!",      r:true,  d:0.9, y:96},
      {t:"When will it arrive?",            r:false, d:1.7, y:140},
      {t:"Est. Dec 18 — tracking sent",     r:true,  d:2.5, y:184},
    ].map((m,i)=>{
      const w=Math.min(m.t.length*5.4+24,260); const x=m.r?400-w-14:18;
      return(
        <motion.g key={i} initial={{opacity:0,y:m.y+10}} animate={active?{opacity:1,y:m.y}:{opacity:0,y:m.y+10}} transition={{duration:0.45,delay:m.d}}>
          <rect x={x} y={0} width={w} height={32} rx={10} fill={m.r?"rgba(48,209,88,0.18)":"rgba(255,255,255,0.06)"} stroke={m.r?"rgba(48,209,88,0.3)":"rgba(255,255,255,0.08)"} strokeWidth={1}/>
          <text x={x+12} y={20} fontSize={8.5} fill={m.r?"#d4fad4":"rgba(255,255,255,0.75)"}>{m.t}</text>
        </motion.g>
      );
    })}
  </svg>
);

// ── Full Panel ────────────────────────────────────────────────────────────────
export const AIAgentsFullPanel = ({
  active, animKey, sectionRef,
}: { active: boolean; animKey: number; sectionRef: (el: HTMLDivElement | null) => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="ai-agents" ref={sectionRef}
      style={{background:"#000",position:"relative",overflow:"hidden",
        minHeight:"90vh",display:"flex",flexDirection:"column",
        justifyContent:"center",padding:"80px 0 60px",zIndex:3,marginBottom:-36,
      }}>

      {/* Subtle green ambient */}
      <div style={{position:"absolute",top:"5%",left:"-5%",width:"55%",height:"85%",
        background:`radial-gradient(ellipse at 35% 50%,${ACCENT}06 0%,transparent 65%)`,
        pointerEvents:"none",
      }}/>

      {/* Top border */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,
        background:`linear-gradient(90deg,transparent,${ACCENT}28,transparent)`,
      }}/>

      <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
        width:"100%",position:"relative",zIndex:1,
      }}>

        {/* Header row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
          gap:"clamp(32px,5vw,80px)",alignItems:"flex-start",marginBottom:48,
        }}>

          {/* Left: text */}
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}}
            viewport={{once:false,amount:0.3}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>

            <div style={{display:"inline-flex",alignItems:"center",gap:6,
              background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:980,padding:"4px 13px",marginBottom:22,
            }}>
              <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>AI AGENTS</span>
            </div>

            <h2 style={{fontSize:"clamp(36px,5vw,68px)",fontWeight:800,
              letterSpacing:"-2.5px",lineHeight:1.02,color:"#f5f5f7",
              margin:"0 0 20px",
            }}>
              Custom AI.<br/>
              <span style={{color:"rgba(255,255,255,0.28)"}}>Works 24/7.</span>
            </h2>

            <p style={{fontSize:"clamp(14px,1.05vw,16px)",lineHeight:1.75,
              color:"rgba(255,255,255,0.38)",margin:"0 0 32px",maxWidth:400,
            }}>
              Purpose-built agents for customer support, lead qualification, and internal operations. Trained on your data. Live in days.
            </p>

            {/* Tab switcher — Apple caption gallery style */}
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              {tabs.map((tab,i)=>(
                <button key={i} onClick={()=>setActiveTab(i)}
                  style={{
                    background:activeTab===i?`${ACCENT}12`:"transparent",
                    border:`1px solid ${activeTab===i?`${ACCENT}35`:"rgba(255,255,255,0.07)"}`,
                    borderRadius:12,padding:"12px 16px",cursor:"pointer",
                    textAlign:"left",transition:"all 0.22s ease",
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                  }}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,
                      color:activeTab===i?ACCENT:"rgba(255,255,255,0.55)",
                      marginBottom:2,
                    }}>
                      {tab.label}
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"monospace"}}>
                      {tab.tag}
                    </div>
                  </div>
                  {activeTab===i&&(
                    <motion.div layoutId="tab-indicator"
                      style={{width:6,height:6,borderRadius:"50%",background:ACCENT}}/>
                  )}
                </button>
              ))}
            </div>

            <div style={{marginTop:28}}>
              <button onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                style={{background:"#2997ff",color:"#fff",border:"none",cursor:"pointer",
                  padding:"13px 30px",borderRadius:980,fontSize:15,fontWeight:600,
                  boxShadow:"0 4px 24px rgba(41,151,255,0.28)",transition:"all 0.22s ease",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}
              >
                Get a quote →
              </button>
            </div>
          </motion.div>

          {/* Right: switching chat demo */}
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
            viewport={{once:false,amount:0.3}} transition={{duration:0.7,delay:0.15,ease:[0.22,1,0.36,1]}}
            style={{height:"clamp(340px,40vw,480px)"}}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-16}} transition={{duration:0.35}} style={{height:"100%"}}>
                <ChatDemo tab={tabs[activeTab]} active={active}/>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom stat row — Apple "3 stats in a row" style */}
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
          viewport={{once:false,amount:0.2}} transition={{duration:0.6,delay:0.2}}
          style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
            gap:1,borderRadius:16,overflow:"hidden",
            border:`1px solid rgba(255,255,255,0.06)`,
          }}>
          {[
            {value:"0ms",   label:"Average response time"},
            {value:"24/7",  label:"Always on, never misses"},
            {value:"94%",   label:"Lead qualification rate"},
          ].map((s,i)=>(
            <div key={i} style={{
              background:"rgba(255,255,255,0.018)",
              padding:"28px 32px",
              borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none",
            }}>
              <div style={{fontSize:"clamp(28px,3.5vw,48px)",fontWeight:800,
                color:"#f5f5f7",letterSpacing:"-1.5px",lineHeight:1,marginBottom:8,
              }}>{s.value}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",lineHeight:1.5}}>{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <div style={{position:"absolute",bottom:0,left:0,right:0,height:90,
        background:"linear-gradient(to bottom,transparent,#000)",pointerEvents:"none",zIndex:5,
      }}/>
    </section>
  );
};

// ── Panel data ────────────────────────────────────────────────────────────────
export const aiAgentsData = {
  id:        "ai-agents",
  eyebrow:   "AI Agents",
  heading:   "Custom AI\nthat works 24/7.",
  desc:      "Purpose-built agents for support, lead qualification, and internal operations.",
  accent:    ACCENT,
  badge:     "AI/ML",
  uniqueTag: "GPT-4 · Claude · Custom LLM",
  price:     "From $1,200",
  timeline:  "5–10 days",
  Icon:      IconBot,
  Art:       AIAgentsArt,
  FrameDeco: AIAgentsFrameDeco,
  FullPanel: AIAgentsFullPanel,
};