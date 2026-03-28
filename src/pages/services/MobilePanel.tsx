// ─── Panel: Mobile Applications ──────────────────────────────────────────────
import { motion } from "framer-motion";
import { IconSmartphone } from "./components/Icons";

const ACCENT = "#64d2ff";
const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

export const MobileFrameDeco = ({ accent }: { accent: string }) => null;

// App screen content — renders directly inside phone shell, no nested phone
const AppScreen = ({ active }: { active: boolean }) => (
  <div style={{width:"100%",height:"100%",background:"#080810",
    display:"flex",flexDirection:"column",padding:"0",overflow:"hidden"}}>
    {/* Status bar */}
    <div style={{height:44,background:"#080810",display:"flex",alignItems:"flex-end",
      justifyContent:"space-between",padding:"0 18px 8px",flexShrink:0}}>
      <span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.6)"}}>9:41</span>
      <div style={{display:"flex",gap:5,alignItems:"center"}}>
        {[4,3,4,3,4].map((h,i)=><div key={i} style={{width:3,height:h+8,background:"rgba(255,255,255,0.5)",borderRadius:1}}/>)}
        <div style={{width:14,height:8,border:"1px solid rgba(255,255,255,0.4)",borderRadius:2,marginLeft:3,
          display:"flex",alignItems:"center",padding:"1px"}}>
          <div style={{width:"75%",height:"100%",background:"rgba(255,255,255,0.5)",borderRadius:1}}/>
        </div>
      </div>
    </div>

    {/* App header */}
    <div style={{padding:"8px 18px 12px",flexShrink:0}}>
      <div style={{fontSize:11,color:`${ACCENT}80`,fontWeight:600,marginBottom:2,fontFamily:FONT}}>AUTOBIT</div>
      <div style={{fontSize:18,fontWeight:700,color:"#f5f5f7",letterSpacing:"-0.5px",fontFamily:FONT}}>Dashboard</div>
    </div>

    {/* Stat cards */}
    <div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:8,flex:1,overflow:"hidden"}}>
      {[
        {label:"Revenue",color:ACCENT,      val:"₱128k",  change:"+18%"},
        {label:"Tasks",  color:"#bf5af2",   val:"18 open",change:"2 due"},
        {label:"Clients",color:"#30d158",   val:"84",     change:"+4"},
      ].map((c,i)=>(
        <motion.div key={i}
          initial={{opacity:0,x:-10}} animate={active?{opacity:1,x:0}:{opacity:0,x:-10}}
          transition={{delay:0.15+i*0.12,duration:0.4}}
          style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"10px 13px",
            display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginBottom:2,fontFamily:FONT}}>{c.label}</div>
            <div style={{fontSize:15,fontWeight:700,color:"#f5f5f7",fontFamily:FONT}}>{c.val}</div>
          </div>
          <div style={{fontSize:9,color:c.color,fontWeight:600,
            background:`${c.color}15`,borderRadius:6,padding:"3px 7px",fontFamily:FONT}}>{c.change}</div>
        </motion.div>
      ))}

      {/* Mini chart */}
      <motion.div initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.55}}
        style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"10px 13px",flex:1}}>
        <div style={{fontSize:9,color:"rgba(255,255,255,0.28)",marginBottom:6,fontFamily:FONT}}>Weekly Activity</div>
        <svg viewBox="0 0 160 36" fill="none" style={{width:"100%",height:"auto"}}>
          <motion.path d="M4,28 C20,22 36,26 52,18 C68,10 84,14 100,8 C116,2 132,8 156,4"
            stroke={ACCENT} strokeWidth={1.5} fill="none" strokeLinecap="round"
            initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}}
            transition={{delay:0.7,duration:1.1,ease:"easeOut"}}/>
          <motion.path d="M4,28 C20,22 36,26 52,18 C68,10 84,14 100,8 C116,2 132,8 156,4 L156,36 L4,36 Z"
            fill={`${ACCENT}12`} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.9}}/>
        </svg>
      </motion.div>
    </div>

    {/* Home bar */}
    <div style={{height:30,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <div style={{width:48,height:4,background:"rgba(255,255,255,0.2)",borderRadius:2}}/>
    </div>
  </div>
);

export const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx={210} cy={120} rx={75} ry={95} fill="rgba(100,210,255,0.02)"/>
    <rect x={150} y={4} width={120} height={232} rx={22} fill="#0a0a0f"/>
    <rect x={153} y={7} width={114} height={226} rx={20} fill="#080810"/>
    <rect x={180} y={10} width={60} height={12} rx={6} fill="#0a0a0f"/>
    <rect x={157} y={24} width={106} height={200} rx={16} fill="#0d0d18"/>
    {/* Status bar */}
    <text x={166} y={36} fontSize={7} fill="rgba(255,255,255,0.4)" fontFamily={FONT}>9:41</text>
    {/* App header */}
    <text x={166} y={52} fontSize={7} fill={`${ACCENT}80`} fontWeight={600} fontFamily={FONT}>AUTOBIT</text>
    <text x={166} y={64} fontSize={11} fill="#f5f5f7" fontWeight={700} fontFamily={FONT}>Dashboard</text>
    {/* Cards */}
    {[
      {y:72, label:"Revenue", val:"₱128k", color:ACCENT},
      {y:98, label:"Tasks",   val:"18 open",color:"#bf5af2"},
      {y:124,label:"Clients", val:"84",     color:"#30d158"},
    ].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-6}} animate={active?{opacity:1,x:0}:{opacity:0,x:-6}} transition={{delay:0.15+i*0.12}}>
        <rect x={160} y={c.y} width={100} height={22} rx={7} fill="rgba(255,255,255,0.04)"/>
        <text x={168} y={c.y+9} fontSize={7} fill="rgba(255,255,255,0.32)" fontFamily={FONT}>{c.label}</text>
        <text x={168} y={c.y+18} fontSize={9} fill={c.color} fontWeight={700} fontFamily={FONT}>{c.val}</text>
      </motion.g>
    ))}
    {/* Chart */}
    <rect x={160} y={152} width={100} height={40} rx={7} fill="rgba(255,255,255,0.03)"/>
    <motion.path d="M164,184 C172,178 180,180 188,172 C196,164 204,168 212,160 C220,152 228,156 256,150"
      stroke={ACCENT} strokeWidth={1.5} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.6,duration:1}}/>
    {/* Home bar */}
    <rect x={190} y={220} width={40} height={3} rx={2} fill="rgba(255,255,255,0.18)"/>
    {/* Phone buttons */}
    <rect x={275} y={70} width={3} height={28} rx={2} fill="rgba(255,255,255,0.12)"/>
    <rect x={147} y={80} width={3} height={36} rx={2} fill="rgba(255,255,255,0.1)"/>
  </svg>
);

export const MobileFullPanel = ({
  active, animKey, sectionRef,
}: { active: boolean; animKey: number; sectionRef: (el: HTMLDivElement | null) => void }) => (
  <section id="mobile" ref={sectionRef}
    style={{background:"#000",position:"relative",overflow:"hidden",
      minHeight:"90vh",display:"flex",flexDirection:"column",
      justifyContent:"center",padding:"80px 0 80px",zIndex:7,fontFamily:FONT}}>

    {/* Section bg stays */}
    <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=80" alt=""
      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
        filter:"brightness(0.05) saturate(0.2)",pointerEvents:"none"}}/>
    {/* Top feather */}
    <div style={{position:"absolute",top:0,left:0,right:0,height:160,
      background:"linear-gradient(to bottom,#000 0%,transparent 100%)",
      pointerEvents:"none",zIndex:6}}/>
    <div style={{position:"absolute",top:"-5%",left:"-5%",width:"50%",height:"65%",
      background:`radial-gradient(ellipse at 25% 25%,${ACCENT}05 0%,transparent 65%)`,
      pointerEvents:"none"}}/>

    <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",
      width:"100%",position:"relative",zIndex:1}}>

      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",
        gap:"clamp(24px,4vw,64px)",alignItems:"center",marginBottom:"clamp(40px,5vw,64px)"}}>

        {/* Left text */}
        <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>
          <div style={{display:"inline-flex",alignItems:"center",
            background:"rgba(255,255,255,0.05)",
            borderRadius:980,padding:"4px 13px",marginBottom:22}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>MOBILE APPLICATIONS</span>
          </div>
          <h2 style={{fontSize:"clamp(32px,4.5vw,62px)",fontWeight:800,
            letterSpacing:"-2px",lineHeight:1.02,color:"#f5f5f7",margin:"0 0 18px",fontFamily:FONT}}>
            iOS + Android.<br/>
            <span style={{color:"rgba(255,255,255,0.25)"}}>Shipped fast.</span>
          </h2>
          <p style={{fontSize:"clamp(13px,1vw,15px)",lineHeight:1.75,
            color:"rgba(255,255,255,0.38)",margin:"0 0 24px",maxWidth:320}}>
            React Native mobile apps — cross-platform, performant, and production-ready. One codebase, both stores.
          </p>
          <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
            {[{label:"iOS",sub:"App Store"},{label:"Android",sub:"Play Store"},{label:"Expo",sub:"OTA Updates"}].map((p,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.03)",
                borderRadius:12,padding:"10px 14px",textAlign:"center",minWidth:72}}>
                <div style={{fontSize:12,fontWeight:700,color:"#f5f5f7",marginBottom:2,fontFamily:FONT}}>{p.label}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",fontFamily:"'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace"}}>{p.sub}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            style={{background:"#2997ff",color:"#fff",border:"none",cursor:"pointer",
              padding:"13px 30px",borderRadius:980,fontSize:15,fontWeight:700,
              boxShadow:"0 4px 24px rgba(41,151,255,0.28)",transition:"all 0.22s ease",fontFamily:FONT}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1.04)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="scale(1)";}}>
            Get a quote →
          </button>
        </motion.div>

        {/* Center: phone — AppScreen inside, no MobileArt SVG */}
        <motion.div initial={{opacity:0,y:32,scale:0.92}} whileInView={{opacity:1,y:0,scale:1}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.8,delay:0.1,ease:[0.22,1,0.36,1]}}
          style={{width:"clamp(200px,22vw,300px)",height:"clamp(380px,42vw,560px)",
            position:"relative",flexShrink:0}}>
          <div style={{position:"absolute",inset:"-15%",
            background:`radial-gradient(ellipse at 50% 50%,${ACCENT}14,transparent 65%)`,
            pointerEvents:"none"}}/>
          {/* Phone shell */}
          <div style={{width:"100%",height:"100%",
            borderRadius:"clamp(32px,4vw,48px)",
            background:"linear-gradient(145deg,#1c1c24,#0a0a10)",
            boxShadow:"0 40px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.1),inset 0 0 40px rgba(100,210,255,0.03)",
            overflow:"hidden",position:"relative",display:"flex",flexDirection:"column"}}>
            {/* Notch */}
            <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",
              width:64,height:18,background:"#000",borderRadius:9,zIndex:10}}/>
            {/* Left/right buttons */}
            <div style={{position:"absolute",right:-3,top:"20%",width:3,height:"12%",
              background:"rgba(255,255,255,0.1)",borderRadius:"0 2px 2px 0"}}/>
            <div style={{position:"absolute",left:-3,top:"18%",width:3,height:"8%",
              background:"rgba(255,255,255,0.08)",borderRadius:"2px 0 0 2px"}}/>
            <div style={{position:"absolute",left:-3,top:"28%",width:3,height:"8%",
              background:"rgba(255,255,255,0.08)",borderRadius:"2px 0 0 2px"}}/>
            {/* App screen — actual content, not a phone SVG */}
            <div style={{flex:1,paddingTop:28,overflow:"hidden"}}>
              <AppScreen active={active}/>
            </div>
          </div>
        </motion.div>

        {/* Right: features */}
        <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
          viewport={{once:false,amount:0.3}} transition={{duration:0.7,delay:0.15,ease:[0.22,1,0.36,1]}}
          style={{display:"flex",flexDirection:"column",gap:16}}>
          {[
            {title:"One codebase",       desc:"Ship to iOS and Android from a single React Native project."},
            {title:"OTA updates",        desc:"Push fixes instantly via Expo without app store review delays."},
            {title:"Native performance", desc:"60fps animations, native modules, and hardware access."},
            {title:"10–21 days",         desc:"From kickoff to both stores — start to finish."},
          ].map((f,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
              viewport={{once:false}} transition={{delay:0.2+i*0.1,duration:0.5}}
              style={{padding:"16px 18px",background:"rgba(255,255,255,0.022)",
                borderRadius:14,borderLeft:"2px solid rgba(255,255,255,0.12)"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#f5f5f7",marginBottom:4,fontFamily:FONT}}>{f.title}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",lineHeight:1.55}}>{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}}
        viewport={{once:false}} transition={{delay:0.3,duration:0.6}}
        style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
          background:"rgba(255,255,255,0.018)",
          borderRadius:16,overflow:"hidden"}}>
        {[
          {value:"2 stores",label:"iOS + Android from one codebase"},
          {value:"10 days", label:"Fastest delivery in the market"},
          {value:"60fps",   label:"Smooth native-feel animations"},
        ].map((s,i)=>(
          <div key={i} style={{padding:"24px 28px",
            borderRight:i<2?"1px solid rgba(255,255,255,0.05)":"none",textAlign:"center"}}>
            <div style={{fontSize:"clamp(22px,3vw,38px)",fontWeight:800,
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

export const mobileData = {
  id:"mobile", eyebrow:"Mobile Applications",
  heading:"iOS + Android.\nShipped fast.",
  desc:"React Native mobile apps — cross-platform, performant, production-ready.",
  accent:ACCENT, badge:"Mobile", uniqueTag:"React Native · Expo · Play Store",
  price:"From $2,000", timeline:"10–21 days",
  Icon:IconSmartphone, Art:MobileArt,
  FrameDeco:MobileFrameDeco, FullPanel:MobileFullPanel,
};