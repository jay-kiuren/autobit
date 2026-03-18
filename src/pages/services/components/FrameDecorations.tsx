import { motion } from "framer-motion";

// Panel 0 — Automation (blue): Blueprint grid + L-bracket corners
const FrameDecoBlueprint = ({ accent }: { accent: string }) => (
  <>
    {/* Blueprint dot grid */}
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.18}} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bp-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill={accent}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-dots)"/>
    </svg>
    {/* Corner L-brackets */}
    {[["0,0","18,0 0,0 0,18"],["calc(100% - 0px),0","calc(100% - 18px),0 calc(100%),0 calc(100%),18px"],
      ["0,calc(100%)","18px,calc(100%) 0,calc(100%) 0,calc(100% - 18px)"],
      ["calc(100%),calc(100%)","calc(100% - 18px),calc(100%) calc(100%),calc(100%) calc(100%),calc(100% - 18px)"]
    ].map((_,i)=>(
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

// Panel 1 — AI Agents (green): Terminal top bar + scanline pulse
const FrameDecoTerminal = ({ accent }: { accent: string }) => (
  <>
    <div style={{position:"absolute",top:0,left:0,right:0,height:28,
      background:`rgba(0,0,0,0.35)`,borderBottom:`1px solid ${accent}22`,
      display:"flex",alignItems:"center",gap:6,padding:"0 14px",
    }}>
      {["#ff375f","#ff9f0a",accent].map((c,i)=>(
        <div key={i} style={{width:9,height:9,borderRadius:"50%",background:c,opacity:0.7}}/>
      ))}
      <span style={{fontFamily:"monospace",fontSize:9,color:`${accent}55`,marginLeft:8,letterSpacing:"0.08em"}}>
        autobit-agent · bash
      </span>
    </div>
    {/* Scanline sweep */}
    <motion.div
      style={{position:"absolute",left:0,right:0,height:1,
        background:`linear-gradient(90deg,transparent,${accent}55,transparent)`,
        pointerEvents:"none",
      }}
      animate={{top:["10%","95%","10%"]}}
      transition={{duration:4,repeat:Infinity,ease:"linear"}}
    />
  </>
);

// Panel 2 — Web Apps (purple): Double border + noise mesh
const FrameDecoDouble = ({ accent }: { accent: string }) => (
  <>
    {/* Inner inset border */}
    <div style={{position:"absolute",inset:10,borderRadius:14,
      border:`1px solid ${accent}18`,pointerEvents:"none",
    }}/>
    {/* Corner dots */}
    {[[10,10],[null,10],[10,null],[null,null]].map(([t,l],i)=>(
      <div key={i} style={{position:"absolute",
        top:t??undefined, bottom:t===null?10:undefined,
        left:l??undefined, right:l===null?10:undefined,
        width:6,height:6,borderRadius:"50%",
        background:accent,opacity:0.4,
      }}/>
    ))}
    {/* Diagonal gradient shimmer */}
    <div style={{position:"absolute",inset:0,pointerEvents:"none",
      background:`linear-gradient(135deg,${accent}08 0%,transparent 40%,${accent}05 100%)`,
      borderRadius:"inherit",
    }}/>
  </>
);

// Panel 3 — Business Systems (orange): Tick-mark corners + data grid
const FrameDecoTicks = ({ accent }: { accent: string }) => (
  <>
    {/* Horizontal rule near top */}
    <div style={{position:"absolute",top:38,left:16,right:16,height:1,
      background:`linear-gradient(90deg,${accent}44,${accent}18,${accent}44)`,
    }}/>
    {/* Tick marks along top rule */}
    {Array.from({length:12}).map((_,i)=>(
      <div key={i} style={{
        position:"absolute",top:34,
        left:`${8+i*8}%`,
        width:1,height:i%4===0?8:4,
        background:`${accent}${i%4===0?"55":"28"}`,
      }}/>
    ))}
    {/* Bottom rule */}
    <div style={{position:"absolute",bottom:38,left:16,right:16,height:1,
      background:`linear-gradient(90deg,${accent}44,${accent}18,${accent}44)`,
    }}/>
    {/* Side vertical accent bars */}
    <div style={{position:"absolute",top:"15%",bottom:"15%",left:0,width:2,
      background:`linear-gradient(to bottom,transparent,${accent}50,transparent)`,
    }}/>
    <div style={{position:"absolute",top:"15%",bottom:"15%",right:0,width:2,
      background:`linear-gradient(to bottom,transparent,${accent}50,transparent)`,
    }}/>
  </>
);

// Panel 4 — Robotics (red): Targeting reticle corners
const FrameDecoTargeting = ({ accent }: { accent: string }) => (
  <>
    {/* Targeting corner brackets — like detection boxes in the art */}
    {[
      {top:8,left:8},
      {top:8,right:8},
      {bottom:8,left:8},
      {bottom:8,right:8},
    ].map((pos,i)=>(<svg key={i} width={22} height={22} viewBox="0 0 22 22" fill="none"
      style={{position:"absolute",...pos as any,opacity:0.6}}>
      {i===0&&<><path d="M0 10 L0 0 L10 0" stroke={accent} strokeWidth={2}/></>}
      {i===1&&<><path d="M22 10 L22 0 L12 0" stroke={accent} strokeWidth={2}/></>}
      {i===2&&<><path d="M0 12 L0 22 L10 22" stroke={accent} strokeWidth={2}/></>}
      {i===3&&<><path d="M22 12 L22 22 L12 22" stroke={accent} strokeWidth={2}/></>}
    </svg>))}
    {/* Pulsing center crosshair dot */}
    <motion.div style={{position:"absolute",top:"50%",left:"50%",
      width:8,height:8,borderRadius:"50%",marginTop:-4,marginLeft:-4,
      background:accent,opacity:0.15,
    }} animate={{scale:[1,2,1],opacity:[0.15,0,0.15]}} transition={{duration:2.5,repeat:Infinity}}/>
    {/* Horizontal center line */}
    <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,
      background:`linear-gradient(90deg,${accent}30,transparent 20%,transparent 80%,${accent}30)`,
      pointerEvents:"none",
    }}/>
  </>
);

// Panel 5 — Mobile (cyan): Gradient mesh + subtle circuit lines
const FrameDecoCyan = ({ accent }: { accent: string }) => (
  <>
    {/* Gradient mesh corners */}
    <div style={{position:"absolute",top:0,left:0,width:120,height:120,
      background:`radial-gradient(circle at 0% 0%,${accent}12,transparent 70%)`,
      pointerEvents:"none",borderRadius:"inherit",
    }}/>
    <div style={{position:"absolute",bottom:0,right:0,width:120,height:120,
      background:`radial-gradient(circle at 100% 100%,${accent}10,transparent 70%)`,
      pointerEvents:"none",borderRadius:"inherit",
    }}/>
    {/* Circuit-line SVG decoration */}
    <svg style={{position:"absolute",bottom:12,right:12,opacity:0.2,pointerEvents:"none"}} width={60} height={60} viewBox="0 0 60 60" fill="none">
      <path d="M50 10 L30 10 L30 30 L10 30 L10 50" stroke={accent} strokeWidth={1.2} strokeLinecap="round"/>
      <circle cx="30" cy="10" r="2.5" fill={accent}/>
      <circle cx="30" cy="30" r="2.5" fill={accent}/>
      <circle cx="10" cy="50" r="2.5" fill={accent}/>
    </svg>
    {/* Corner notch top-center (like mobile notch) */}
    <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
      width:48,height:4,background:`${accent}20`,borderRadius:"0 0 8px 8px",
    }}/>
  </>
);

export const frameDecos = [FrameDecoBlueprint, FrameDecoTerminal, FrameDecoDouble, FrameDecoTicks, FrameDecoTargeting, FrameDecoCyan];
