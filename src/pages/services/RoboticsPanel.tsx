// ─── Panel: Robotics & Physical AI ───────────────────────────────────────────
import { motion } from "framer-motion";
import { IconCpu } from "./components/Icons";

const ACCENT = "#ff375f";
const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

export const RoboticsFrameDeco = ({ accent }: { accent: string }) => null;

export const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 700 360" fill="none" style={{width:"100%",height:"100%"}}>
    {/* No outer stroke */}
    <rect width={700} height={360} rx={14} fill="rgba(4,2,2,0.99)"/>
    {/* HUD top bar */}
    <rect width={700} height={30} rx={14} fill="rgba(255,59,48,0.05)"/>
    <rect y={20} width={700} height={10} fill="rgba(255,59,48,0.05)"/>
    <circle cx={16} cy={15} r={5} fill="#ff375f" opacity={0.8}/>
    <motion.circle cx={16} cy={15} r={5} fill="#ff375f"
      animate={active?{opacity:[0.8,0.2,0.8]}:{opacity:0.2}} transition={{duration:1,repeat:Infinity}}/>
    <text x={26} y={19} fontSize={9} fill="#ff375f" fontFamily="'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace">● REC  AXONIS EDGE v2.4</text>
    <text x={500} y={19} fontSize={9} fill="rgba(255,255,255,0.28)" fontFamily="'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace">04:22:18  30fps  12ms</text>
    {/* Scan line */}
    <motion.line x1={0} y1={30} x2={700} y2={30} stroke="#ff375f" strokeWidth={1.2} opacity={0.35}
      animate={active?{y1:[30,320,30],y2:[30,320,30]}:{}} transition={{duration:2.8,repeat:Infinity,ease:"linear"}}/>
    {/* Detection boxes */}
    {[
      {x:60, y:55, w:130,h:130,label:"Person",  conf:"98.4%",color:"#ff375f"},
      {x:280,y:90, w:160,h:140,label:"Forklift",conf:"95.1%",color:"#ff9f0a"},
      {x:500,y:50, w:120,h:100,label:"Hazard",  conf:"91.8%",color:"#ff375f"},
      {x:430,y:200,w:100,h:90, label:"Asset",   conf:"88.2%",color:"#64d2ff"},
    ].map((b,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.4+i*0.3}}>
        <path d={`M${b.x+14},${b.y} L${b.x},${b.y} L${b.x},${b.y+14}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w-14},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+14}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x},${b.y+b.h-14} L${b.x},${b.y+b.h} L${b.x+14},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w},${b.y+b.h-14} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-14},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <rect x={b.x} y={b.y-16} width={b.w} height={15} rx={3} fill={b.color} opacity={0.82}/>
        <text x={b.x+6} y={b.y-4} fontSize={8.5} fill="#fff" fontWeight={600}>{b.label}  {b.conf}</text>
      </motion.g>
    ))}
    {/* HUD bottom bar */}
    <rect x={0} y={320} width={700} height={40} fill="rgba(255,59,48,0.04)"/>
    {[
      {x:20, l:"Zones",  v:"4/4"},
      {x:110,l:"Objects",v:"8"},
      {x:200,l:"Alerts", v:"1"},
      {x:290,l:"Uptime", v:"99.98%"},
      {x:400,l:"Latency",v:"12ms"},
      {x:490,l:"FPS",    v:"30"},
      {x:570,l:"Model",  v:"YOLOv8"},
    ].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.9+i*0.08}}>
        <text x={s.x} y={333} fontSize={7} fill="rgba(255,255,255,0.22)" fontFamily="'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace">{s.l}</text>
        <text x={s.x} y={349} fontSize={10} fill={i===2?"#ff375f":"rgba(255,255,255,0.6)"} fontWeight={700} fontFamily="'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace">{s.v}</text>
      </motion.g>
    ))}
  </svg>
);

export const RoboticsFullPanel = ({
  active, animKey, sectionRef,
}: { active: boolean; animKey: number; sectionRef: (el: HTMLDivElement | null) => void }) => (
  <section id="robotics" ref={sectionRef}
    style={{background:"#000",position:"relative",overflow:"hidden",
      minHeight:"90vh",display:"flex",flexDirection:"column",
      justifyContent:"center",padding:"80px 0 60px",zIndex:6,marginBottom:-36,fontFamily:FONT}}>

    {/* Section bg stays */}
      {/* Ambient glows */}
      <div style={{position:"absolute",bottom:"-5%",right:"-5%",width:"60%",height:"60%",pointerEvents:"none",
        background:`radial-gradient(ellipse at 75% 75%,${ACCENT}12 0%,transparent 60%)`,zIndex:0}}/>
      <div style={{position:"absolute",top:"-5%",left:"-5%",width:"38%",height:"45%",pointerEvents:"none",
        background:`radial-gradient(ellipse at 15% 15%,${ACCENT}0a 0%,transparent 60%)`,zIndex:0}}/>


    <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
      width:"100%",position:"relative",zIndex:1}}>

      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
        viewport={{once:false,amount:0.3}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
        style={{marginBottom:"clamp(32px,4vw,52px)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
          gap:"clamp(32px,5vw,80px)",alignItems:"center"}}>

          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,
              background:"rgba(255,255,255,0.05)",
              borderRadius:980,padding:"4px 13px",marginBottom:22}}>
              <motion.div style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.4)"}}
                animate={{opacity:[1,0.3,1]}} transition={{duration:1.1,repeat:Infinity}}/>
              <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>ROBOTICS & PHYSICAL AI</span>
            </div>
            <h2 style={{fontSize:"clamp(28px,3.8vw,56px)",fontWeight:700,
              letterSpacing:"-1px",lineHeight:1.02,color:"#f5f5f7",margin:"0 0 18px",fontFamily:FONT}}>
              Edge AI.<br/>
              <span style={{color:"rgba(255,255,255,0.25)"}}>No cloud required.</span>
            </h2>
            <p style={{fontSize:"clamp(14px,1.05vw,16px)",lineHeight:1.75,
              color:"rgba(255,255,255,0.52)",margin:"0 0 28px",maxWidth:380}}>
              PLC integration, computer vision, and embedded AI for industrial environments. Inference runs locally — zero latency, zero dependency on internet.
            </p>
            <span style={{display:"inline-block",fontSize:10,fontWeight:500,
              letterSpacing:"0.05em",padding:"4px 11px",borderRadius:6,
              background:"rgba(255,255,255,0.05)",
              color:"rgba(255,255,255,0.52)",fontFamily:"'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace",marginBottom:28}}>
              YOLO · PLC · Edge Inference · OpenCV
            </span>
            <div>
              <button onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                style={{background:"#2997ff",color:"#fff",border:"none",cursor:"pointer",
                  padding:"12px 26px",borderRadius:980,fontSize:15,fontWeight:500,
                  boxShadow:"0 4px 24px rgba(41,151,255,0.28)",transition:"all 0.22s ease",fontFamily:FONT}}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}>
                Get a quote →
              </button>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {stat:"12ms",   label:"On-device inference latency"},
              {stat:"0",      label:"Cloud dependencies required"},
              {stat:"99.98%", label:"System uptime in production"},
              {stat:"98.4%",  label:"Object detection confidence"},
            ].map((s,i)=>(
              <motion.div key={i}
                initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}}
                viewport={{once:false}} transition={{delay:0.15+i*0.1,duration:0.5}}
                style={{display:"flex",alignItems:"center",gap:16,
                  background:"rgba(14,14,20,0.95)",
                  borderRadius:14,padding:"16px 20px"}}>
                <div>
                  <div style={{fontSize:"clamp(16px,1.8vw,24px)",fontWeight:700,
                    color:"#f5f5f7",letterSpacing:"-0.5px",lineHeight:1,fontFamily:FONT}}>{s.stat}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:3,fontFamily:"'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace"}}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Art — no background image, no border */}
      <motion.div initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
        viewport={{once:false,amount:0.15}} transition={{duration:0.8,delay:0.2,ease:[0.22,1,0.36,1]}}
        style={{borderRadius:"clamp(14px,1.5vw,22px)",
          background:"rgba(10,10,14,0.95)",
          overflow:"hidden",height:"clamp(200px,28vw,360px)",position:"relative",
          transform:"translateZ(0)"}}>
        <RoboticsArt active={active} animKey={animKey}/>
      </motion.div>
    </div>

    <div style={{position:"absolute",bottom:0,left:0,right:0,height:150,
      background:"linear-gradient(to bottom,transparent,#000)",pointerEvents:"none",zIndex:5}}/>
  </section>
);

export const roboticsData = {
  id:"robotics", eyebrow:"Robotics & Physical AI",
  heading:"Edge AI.\nIndustrial-grade.",
  desc:"PLC integration, computer vision, and embedded AI for industrial environments.",
  accent:ACCENT, badge:"Hardware", uniqueTag:"YOLO · PLC · Edge Inference",
  price:"From $3,000", timeline:"14–30 days",
  Icon:IconCpu, Art:RoboticsArt,
  FrameDeco:RoboticsFrameDeco, FullPanel:RoboticsFullPanel,
};