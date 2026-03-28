// ─── Panel: Business Systems ──────────────────────────────────────────────────
import { motion } from "framer-motion";
import { IconLink } from "./components/Icons";

const ACCENT = "#ff9f0a";
const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

export const BusinessSystemsFrameDeco = ({ accent }: { accent: string }) => null;

export const BusinessSystemsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 700 360" fill="none" style={{width:"100%",height:"100%"}}>
    {/* No outer stroke */}
    <rect width={700} height={360} rx={14} fill="rgba(10,8,4,0.99)"/>
    <rect width={700} height={34} rx={14} fill="rgba(255,159,10,0.04)"/>
    <rect y={24} width={700} height={10} fill="rgba(255,159,10,0.04)"/>
    <text x={16} y={20} fontSize={9} fill="rgba(255,255,255,0.45)" fontWeight={600} letterSpacing={0.5} fontFamily={FONT}>BusinessOS · Operations Center</text>

    {/* Hub center */}
    <motion.circle cx={350} cy={185} r={28} fill="rgba(255,159,10,0.1)" stroke="#ff9f0a" strokeWidth={1.5}
      animate={active?{r:[28,32,28]}:{}} transition={{duration:2.5,repeat:Infinity,ease:"easeInOut"}}/>
    <text x={350} y={180} textAnchor="middle" fontSize={9} fill="#ff9f0a" fontWeight={700} fontFamily={FONT}>AUTOBIT</text>
    <text x={350} y={193} textAnchor="middle" fontSize={8} fill="rgba(255,159,10,0.55)" fontFamily={FONT}>OS Core</text>

    {/* Module nodes */}
    {[
      {cx:140,cy:100,label:"Inventory",sub:"4,820 items",color:"#ff9f0a",r:24},
      {cx:560,cy:100,label:"HR",        sub:"34 staff",   color:"#30d158",r:24},
      {cx:140,cy:270,label:"Finance",   sub:"₱2.1M/mo",  color:"#bf5af2",r:24},
      {cx:560,cy:270,label:"Schedule",  sub:"18 tasks",  color:"#64d2ff",r:24},
      {cx:350,cy:52, label:"Reports",   sub:"Live",      color:"rgba(255,255,255,0.5)",r:18},
      {cx:350,cy:316,label:"Alerts",    sub:"0 critical",color:"#30d158",r:18},
    ].map((n,i)=>(
      <motion.g key={i} initial={{opacity:0,scale:0.6}} animate={active?{opacity:1,scale:1}:{opacity:0,scale:0.6}}
        transition={{delay:i*0.12,duration:0.45}}>
        <circle cx={n.cx} cy={n.cy} r={n.r} fill={`${n.color}10`} stroke={n.color} strokeWidth={1.5} strokeOpacity={0.45}/>
        <text x={n.cx} y={n.cy-3} textAnchor="middle" fontSize={8.5} fill="rgba(255,255,255,0.65)" fontWeight={600} fontFamily={FONT}>{n.label}</text>
        <text x={n.cx} y={n.cy+9} textAnchor="middle" fontSize={7} fill={`${n.color}88`} fontFamily="'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace">{n.sub}</text>
      </motion.g>
    ))}

    {/* Connection lines */}
    {[
      [164,100,322,175],[536,100,378,175],
      [164,270,322,195],[536,270,378,195],
      [350,70, 350,157],[350,213,350,298],
    ].map(([x1,y1,x2,y2],i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.8+i*0.08}}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth={1.2} strokeOpacity={0.18} strokeDasharray="5 4"/>
      </motion.g>
    ))}

    {/* Animated packets */}
    {[
      {path:[[164,100],[322,175]],color:"#ff9f0a",delay:0},
      {path:[[536,100],[378,175]],color:"#30d158",delay:0.6},
      {path:[[164,270],[322,195]],color:"#bf5af2",delay:1.2},
      {path:[[536,270],[378,195]],color:"#64d2ff",delay:1.8},
    ].map((p,i)=>(
      <motion.circle key={i} r={4} fill={p.color}
        animate={active?{x:[p.path[0][0],p.path[1][0],p.path[0][0]],y:[p.path[0][1],p.path[1][1],p.path[0][1]],opacity:[0,1,0]}:{opacity:0}}
        transition={{duration:2,repeat:Infinity,repeatDelay:0.5,delay:p.delay,ease:"easeInOut"}}/>
    ))}

    {/* Activity feed */}
    <rect x={60} y={310} width={580} height={36} rx={8} fill="rgba(255,255,255,0.018)"/>
    {[
      {text:"Payroll processed · 34 staff",color:"#30d158",x:72},
      {text:"Stock alert · 12 items low",  color:"#ff9f0a",x:272},
      {text:"Report generated · Monthly",  color:"#bf5af2",x:472},
    ].map((a,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:1.2+i*0.15}}>
        <circle cx={a.x} cy={328} r={3.5} fill={a.color}/>
        <text x={a.x+9} y={331} fontSize={8} fill="rgba(255,255,255,0.42)" fontFamily="'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace">{a.text}</text>
      </motion.g>
    ))}
  </svg>
);

export const BusinessSystemsFullPanel = ({
  active, animKey, sectionRef,
}: { active: boolean; animKey: number; sectionRef: (el: HTMLDivElement | null) => void }) => (
  <section id="systems" ref={sectionRef}
    style={{background:"#000",position:"relative",overflow:"hidden",
      minHeight:"90vh",display:"flex",flexDirection:"column",
      justifyContent:"center",padding:"80px 0 60px",zIndex:5,marginBottom:-36,fontFamily:FONT}}>

    {/* Section bg stays */}
    <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80" alt=""
      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
        filter:"brightness(0.05) saturate(0.2)",pointerEvents:"none"}}/>
    {/* Top feather */}
    <div style={{position:"absolute",top:0,left:0,right:0,height:160,
      background:"linear-gradient(to bottom,#000 0%,transparent 100%)",
      pointerEvents:"none",zIndex:6}}/>
    <div style={{position:"absolute",bottom:"5%",left:"-5%",width:"55%",height:"70%",
      background:`radial-gradient(ellipse at 30% 70%,${ACCENT}05 0%,transparent 65%)`,
      pointerEvents:"none"}}/>

    <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
      width:"100%",position:"relative",zIndex:1}}>

      <div style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",
        gap:"clamp(32px,5vw,80px)",alignItems:"center",marginBottom:40}}>

        {/* Art — no background image, no border */}
        <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
          style={{borderRadius:"clamp(14px,1.5vw,22px)",
            background:"rgba(255,255,255,0.018)",
            overflow:"hidden",height:"clamp(240px,32vw,420px)",position:"relative",
            transform:"translateZ(0)"}}>
          <BusinessSystemsArt active={active} animKey={animKey}/>
        </motion.div>

        <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,delay:0.15,ease:[0.22,1,0.36,1]}}>
          <div style={{display:"inline-flex",alignItems:"center",
            background:"rgba(255,255,255,0.05)",
            borderRadius:980,padding:"4px 13px",marginBottom:22}}>
            <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>BUSINESS SYSTEMS</span>
          </div>
          <h2 style={{fontSize:"clamp(28px,3.8vw,56px)",fontWeight:700,
            letterSpacing:"-1px",lineHeight:1.02,color:"#f5f5f7",margin:"0 0 18px",fontFamily:FONT}}>
            One system.<br/>
            <span style={{color:"rgba(255,255,255,0.25)"}}>Everything connected.</span>
          </h2>
          <p style={{fontSize:"clamp(14px,1.05vw,16px)",lineHeight:1.75,
            color:"rgba(255,255,255,0.52)",margin:"0 0 28px",maxWidth:380}}>
            Inventory, HR, finance, and scheduling — unified in one platform. Every module talks to every other. No more spreadsheets. No more silos.
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28}}>
            {["Inventory","HR","Finance","Schedule","Reports"].map((m,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,
                background:"rgba(255,255,255,0.05)",
                borderRadius:980,padding:"5px 12px",
                fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.7)",fontFamily:FONT}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,0.32)"}}/>
                {m}
              </div>
            ))}
          </div>
          <span style={{display:"inline-block",fontSize:10,fontWeight:500,
            letterSpacing:"0.05em",padding:"4px 11px",borderRadius:6,
            background:"rgba(255,255,255,0.05)",
            color:"rgba(255,255,255,0.52)",fontFamily:"'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace",marginBottom:28}}>
            ERP · POS · Operations · Reporting
          </span>
          <div>
            <button onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              style={{background:"#2997ff",color:"#fff",border:"none",cursor:"pointer",
                padding:"13px 30px",borderRadius:980,fontSize:15,fontWeight:700,
                boxShadow:"0 4px 24px rgba(41,151,255,0.28)",transition:"all 0.22s ease",fontFamily:FONT}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}>
              Get a quote →
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
        viewport={{once:false,amount:0.2}} transition={{duration:0.6,delay:0.25}}
        style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
          background:"rgba(255,255,255,0.018)",
          borderRadius:16,overflow:"hidden"}}>
        {[
          {value:"4,820", label:"Items tracked"},
          {value:"34",    label:"Staff managed"},
          {value:"₱2.1M", label:"Monthly revenue"},
          {value:"< 1hr", label:"Report generation"},
        ].map((s,i)=>(
          <div key={i} style={{padding:"24px 28px",
            borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none",textAlign:"center"}}>
            <div style={{fontSize:"clamp(20px,2.6vw,34px)",fontWeight:700,
              color:"#f5f5f7",letterSpacing:"-1px",lineHeight:1,marginBottom:8,fontFamily:FONT}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontFamily:"'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace"}}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>

    <div style={{position:"absolute",bottom:0,left:0,right:0,height:150,
      background:"linear-gradient(to bottom,transparent,#000)",pointerEvents:"none",zIndex:5}}/>
  </section>
);

export const businessSystemsData = {
  id:"systems", eyebrow:"Business Systems",
  heading:"One system.\nYour entire operation.",
  desc:"Inventory, HR, finance, scheduling — unified in one platform.",
  accent:ACCENT, badge:"Enterprise", uniqueTag:"ERP · POS · Operations",
  price:"From $3,000", timeline:"14–30 days",
  Icon:IconLink, Art:BusinessSystemsArt,
  FrameDeco:BusinessSystemsFrameDeco, FullPanel:BusinessSystemsFullPanel,
};