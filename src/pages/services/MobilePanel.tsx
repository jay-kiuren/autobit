// ─── Panel: Mobile Applications ──────────────────────────────────────────────
// Accent    : #64d2ff (cyan)
// Design    : Apple "intuitive by design / centered product" idea
//             Apple: phone centered, extreme whitespace, specs listed cleanly below
//             Autobit: phone mockup front and center, feature grid below,
//             platform badges (iOS/Android) as design elements
//
// To edit text     → mobileData at the bottom
// To edit layout   → MobileFullPanel

import { motion } from "framer-motion";
import { IconSmartphone } from "./components/Icons";

const ACCENT = "#64d2ff";

// ── Frame deco (fallback) ─────────────────────────────────────────────────────
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

// ── Mobile app illustration ───────────────────────────────────────────────────
export const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx={210} cy={120} rx={80} ry={100} fill="rgba(100,210,255,0.03)"/>
    <rect x={147} y={2}   width={126} height={236} rx={22} fill="#0a0a0f" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5}/>
    <rect x={150} y={5}   width={120} height={230} rx={20} fill="#080810"/>
    <rect x={178} y={8}   width={64}  height={12}  rx={6}  fill="#0a0a0f"/>
    <rect x={155} y={22}  width={110} height={208} rx={16} fill="#0d0d18"/>
    <rect x={155} y={22}  width={110} height={28}  rx={16} fill="rgba(100,210,255,0.06)"/>
    <rect x={155} y={34}  width={110} height={16}        fill="rgba(100,210,255,0.06)"/>
    <text x={210} y={38} textAnchor="middle" fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit App</text>
    {[{y:54,label:"Revenue",val:"₱128k",color:"#64d2ff"},{y:86,label:"Tasks",val:"18 open",color:"#bf5af2"},{y:118,label:"Clients",val:"84",color:"#30d158"}].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.2+i*0.15}}>
        <rect x={161} y={c.y} width={98} height={28} rx={8} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={170} y={c.y+11} fontSize={8}  fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={170} y={c.y+22} fontSize={9}  fill={c.color} fontWeight={700}>{c.val}</text>
      </motion.g>
    ))}
    <rect x={161} y={150} width={98} height={38} rx={8} fill="rgba(255,255,255,0.025)"/>
    <motion.path d="M168,180 C175,170 182,174 190,164 C198,154 205,160 212,152 C219,144 226,150 234,145 C241,140 248,148 252,145"
      stroke="#64d2ff" strokeWidth={1.5} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.8,duration:1,ease:"easeOut"}}/>
    {[{title:"New lead assigned",color:"#64d2ff",delay:0.5},{title:"Invoice paid",color:"#30d158",delay:1.4}].map((n,i)=>(
      <motion.g key={i}
        animate={active?{x:[420,0,0,420],opacity:[0,1,1,0]}:{x:420,opacity:0}}
        transition={{delay:n.delay,duration:3.5,times:[0,0.1,0.75,1],repeat:Infinity,repeatDelay:2,ease:"easeOut"}}>
        <rect x={-230} y={196+i*22} width={215} height={18} rx={9} fill="rgba(30,30,40,0.95)" stroke={`${n.color}44`} strokeWidth={1}/>
        <circle cx={-215} cy={205+i*22} r={5} fill={`${n.color}22`} stroke={n.color} strokeWidth={1}/>
        <text x={-203} y={208+i*22} fontSize={7.5} fill="rgba(255,255,255,0.65)">{n.title}</text>
      </motion.g>
    ))}
    <rect x={273} y={70}  width={3} height={30} rx={2} fill="rgba(255,255,255,0.15)"/>
    <rect x={144} y={80}  width={3} height={40} rx={2} fill="rgba(255,255,255,0.12)"/>
    <rect x={185} y={224} width={50} height={3}  rx={2} fill="rgba(255,255,255,0.2)"/>
  </svg>
);

// ── Full Panel ────────────────────────────────────────────────────────────────
export const MobileFullPanel = ({
  active, animKey, sectionRef,
}: { active: boolean; animKey: number; sectionRef: (el: HTMLDivElement | null) => void }) => (
  <section id="mobile" ref={sectionRef}
    style={{background:"#000",position:"relative",overflow:"hidden",
      minHeight:"90vh",display:"flex",flexDirection:"column",
      justifyContent:"center",padding:"80px 0 80px",zIndex:7,
    }}>

    {/* Section background photo — subtle lifestyle */}
    <img
      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=80"
      alt=""
      style={{position:"absolute",inset:0,width:"100%",height:"100%",
        objectFit:"cover",objectPosition:"center",
        filter:"brightness(0.07) saturate(0.3)",
        pointerEvents:"none",
      }}
    />
    {/* Cyan ambient — top left */}
    <div style={{position:"absolute",top:"-5%",left:"-5%",width:"50%",height:"65%",
      background:`radial-gradient(ellipse at 25% 25%,${ACCENT}06 0%,transparent 65%)`,
      pointerEvents:"none",
    }}/>
    <div style={{position:"absolute",top:0,left:0,right:0,height:1,
      background:`linear-gradient(90deg,transparent,${ACCENT}28,transparent)`,
    }}/>

    <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
      width:"100%",position:"relative",zIndex:1,
    }}>

      {/* Apple centered layout — phone takes center, text flanks */}
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",
        gap:"clamp(24px,4vw,64px)",alignItems:"center",marginBottom:"clamp(40px,5vw,64px)",
      }}>

        {/* Left: text + CTA */}
        <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>

          <div style={{display:"inline-flex",alignItems:"center",gap:6,
            background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:980,padding:"4px 13px",marginBottom:22,
          }}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>MOBILE APPLICATIONS</span>
          </div>

          <h2 style={{fontSize:"clamp(32px,4.5vw,62px)",fontWeight:800,
            letterSpacing:"-2px",lineHeight:1.02,color:"#f5f5f7",margin:"0 0 18px",
          }}>
            iOS + Android.<br/>
            <span style={{color:"rgba(255,255,255,0.25)"}}>Shipped fast.</span>
          </h2>

          <p style={{fontSize:"clamp(13px,1vw,15px)",lineHeight:1.75,
            color:"rgba(255,255,255,0.38)",margin:"0 0 24px",maxWidth:320,
          }}>
            React Native mobile apps — cross-platform, performant, and production-ready. One codebase, both stores.
          </p>

          {/* Platform badges — Apple "works with" style */}
          <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
            {[
              {label:"iOS", sub:"App Store"},
              {label:"Android", sub:"Play Store"},
              {label:"Expo", sub:"OTA Updates"},
            ].map((p,i)=>(
              <div key={i} style={{
                background:"rgba(255,255,255,0.03)",
                border:`1px solid rgba(255,255,255,0.08)`,
                borderRadius:12,padding:"10px 14px",
                textAlign:"center",minWidth:72,
              }}>
                <div style={{fontSize:12,fontWeight:700,color:"#f5f5f7",marginBottom:2}}>{p.label}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",fontFamily:"monospace"}}>{p.sub}</div>
              </div>
            ))}
          </div>

          <button onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            style={{background:"#2997ff",color:"#fff",border:"none",cursor:"pointer",
              padding:"13px 30px",borderRadius:980,fontSize:15,fontWeight:700,
              boxShadow:"0 4px 24px rgba(41,151,255,0.28)",transition:"all 0.22s ease",
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}
          >
            Get a quote →
          </button>
        </motion.div>

        {/* Center: phone mockup — the hero visual */}
        <motion.div initial={{opacity:0,y:32,scale:0.92}} whileInView={{opacity:1,y:0,scale:1}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.8,delay:0.1,ease:[0.22,1,0.36,1]}}
          style={{
            width:"clamp(200px,22vw,320px)",
            height:"clamp(380px,42vw,580px)",
            position:"relative",
            flexShrink:0,
          }}>
          {/* Glow behind phone */}
          <div style={{position:"absolute",inset:"-15%",
            background:`radial-gradient(ellipse at 50% 50%,${ACCENT}18,transparent 65%)`,
            pointerEvents:"none",
          }}/>
          {/* Phone shell */}
          <div style={{
            width:"100%",height:"100%",
            borderRadius:"clamp(32px,4vw,52px)",
            background:"linear-gradient(145deg,#1a1a22,#0a0a10)",
            border:"1px solid rgba(255,255,255,0.15)",
            boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 40px rgba(100,210,255,0.04)`,
            overflow:"hidden",
            position:"relative",
          }}>
            {/* Notch */}
            <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",
              width:64,height:18,background:"#000",borderRadius:9,zIndex:10,
            }}/>
            {/* Phone background photo — person using mobile app */}
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80"
              alt=""
              style={{position:"absolute",inset:0,width:"100%",height:"100%",
                objectFit:"cover",objectPosition:"center top",
                filter:"brightness(0.18) saturate(0.4)",
              }}
            />
            <div style={{position:"absolute",inset:0,
              background:`linear-gradient(180deg,${ACCENT}08 0%,rgba(0,0,0,0.5) 100%)`,
              pointerEvents:"none",zIndex:1,
            }}/>
            {/* Screen content area */}
            <div style={{position:"absolute",inset:0,padding:"40px 10px 10px",
              display:"flex",alignItems:"center",justifyContent:"center",
              zIndex:2,
            }}>
              <MobileArt active={active} animKey={animKey}/>
            </div>
            {/* Home indicator */}
            <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",
              width:48,height:4,background:"rgba(255,255,255,0.2)",borderRadius:2,zIndex:3,
            }}/>
          </div>
        </motion.div>

        {/* Right: feature list — Apple specs list style */}
        <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,delay:0.15,ease:[0.22,1,0.36,1]}}
          style={{display:"flex",flexDirection:"column",gap:16}}>

          {[
            {title:"One codebase",        desc:"Ship to iOS and Android from a single React Native project."},
            {title:"OTA updates",         desc:"Push fixes instantly via Expo without app store review delays."},
            {title:"Native performance",  desc:"60fps animations, native modules, and hardware access."},
            {title:"10–21 days",          desc:"From kickoff to both stores — start to finish."},
          ].map((f,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
              viewport={{once:false}} transition={{delay:0.2+i*0.1,duration:0.5}}
              style={{
                padding:"16px 18px",
                background:"rgba(255,255,255,0.022)",
                border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:14,
                borderLeft:"2px solid rgba(255,255,255,0.15)",
              }}>
              <div style={{fontSize:13,fontWeight:700,color:"#f5f5f7",marginBottom:4}}>{f.title}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",lineHeight:1.55}}>{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom: stat strip — Apple minimal */}
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}}
        viewport={{once:false}} transition={{delay:0.3,duration:0.6}}
        style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
          gap:1,borderRadius:16,overflow:"hidden",
          border:`1px solid rgba(255,255,255,0.06)`,
        }}>
        {[
          {value:"2 stores", label:"iOS + Android from one codebase"},
          {value:"10 days",  label:"Fastest delivery in the market"},
          {value:"60fps",    label:"Smooth native-feel animations"},
        ].map((s,i)=>(
          <div key={i} style={{
            background:"rgba(255,255,255,0.018)",
            padding:"24px 28px",
            borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none",
            textAlign:"center",
          }}>
            <div style={{fontSize:"clamp(22px,3vw,38px)",fontWeight:800,
              color:"#f5f5f7",letterSpacing:"-1px",lineHeight:1,marginBottom:8,
            }}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontFamily:"monospace"}}>{s.label}</div>
          </div>
        ))}
      </motion.div>

    </div>

    <div style={{position:"absolute",bottom:0,left:0,right:0,height:90,
      background:"linear-gradient(to bottom,transparent,#000)",pointerEvents:"none",zIndex:5,
    }}/>
  </section>
);

// ── Panel data ────────────────────────────────────────────────────────────────
export const mobileData = {
  id:        "mobile",
  eyebrow:   "Mobile Applications",
  heading:   "iOS + Android.\nShipped fast.",
  desc:      "React Native mobile apps — cross-platform, performant, production-ready.",
  accent:    ACCENT,
  badge:     "Mobile",
  uniqueTag: "React Native · Expo · Play Store",
  price:     "From $2,000",
  timeline:  "10–21 days",
  Icon:      IconSmartphone,
  Art:       MobileArt,
  FrameDeco: MobileFrameDeco,
  FullPanel: MobileFullPanel,
};