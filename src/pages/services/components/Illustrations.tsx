import { motion } from "framer-motion";

export const AutomationArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{ width:"100%", height:"100%" }}>
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*84} y1={0} x2={i*84} y2={240} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3].map(i=><line key={`h${i}`} x1={0} y1={i*60} x2={420} y2={i*60} stroke="rgba(41,151,255,0.04)" strokeWidth={1}/>)}
    {[
      {x:20, y:90, label:"Trigger", color:"#2997ff"},
      {x:135,y:55, label:"Filter",  color:"#2997ff"},
      {x:135,y:125,label:"Timer",   color:"#64d2ff"},
      {x:250,y:90, label:"Process", color:"#2997ff"},
      {x:345,y:90, label:"Done",    color:"#30d158"},
    ].map((n,i)=>(
      <motion.g key={i} initial={{opacity:0,scale:0.7}} animate={active?{opacity:1,scale:1}:{opacity:0,scale:0.7}} transition={{delay:i*0.12,duration:0.4}}>
        <rect x={n.x} y={n.y} width={72} height={44} rx={10} fill="rgba(255,255,255,0.04)" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.6}/>
        <rect x={n.x} y={n.y} width={72} height={44} rx={10} fill={`${n.color}0d`}/>
        <text x={n.x+36} y={n.y+28} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.65)" fontFamily="monospace">{n.label}</text>
      </motion.g>
    ))}
    {[[92,112,135,77],[92,112,135,147],[207,112,250,112],[322,112,345,112]].map(([x1,y1,x2,y2],i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.7+i*0.1}}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2997ff" strokeWidth={1.5} strokeOpacity={0.35} strokeDasharray="4 3"/>
        <circle cx={x2} cy={y2} r={3} fill="#2997ff" opacity={0.6}/>
      </motion.g>
    ))}
    <motion.circle r={4} fill="#2997ff"
      animate={active?{x:[20,135,250,345],y:[112,77,112,112],opacity:[0,1,1,0]}:{opacity:0}}
      transition={{duration:2.5,repeat:Infinity,repeatDelay:0.8,ease:"linear"}}/>
    <rect x={10} y={200} width={400} height={28} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    {[{x:20,label:"Runs today",val:"1,284"},{x:120,label:"Success",val:"99.8%"},{x:220,label:"Time saved",val:"48h"},{x:320,label:"Errors",val:"0"}].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.9+i*0.1}}>
        <text x={s.x} y={211} fontSize={7} fill="rgba(255,255,255,0.28)">{s.label}</text>
        <text x={s.x} y={223} fontSize={9} fill="#2997ff" fontWeight={700}>{s.val}</text>
      </motion.g>
    ))}
  </svg>
);

export const AIAgentsArt = ({ active, animKey }: { active: boolean; animKey: number }) => {
  const msgs = [
    {t:"Hey, I need help with my order", r:false, d:0.2},
    {t:"Order #4821 shipped today!",      r:true,  d:0.9},
    {t:"When will it arrive?",             r:false, d:1.7},
    {t:"Est. Dec 18 — tracking sent",     r:true,  d:2.5},
  ];
  return (
    <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
      <rect x={10} y={0} width={400} height={240} rx={14} fill="rgba(20,20,20,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>
      <rect x={10} y={0} width={400} height={42} rx={14} fill="rgba(255,255,255,0.04)"/>
      <rect x={10} y={30} width={400} height={12} fill="rgba(255,255,255,0.04)"/>
      <circle cx={38} cy={21} r={12} fill="rgba(48,209,88,0.15)" stroke="#30d158" strokeWidth={1.5}/>
      <rect x={30} y={14} width={16} height={14} rx={3} fill="none" stroke="#30d158" strokeWidth={1.2}/>
      <path d="M33 18h10M33 21h7" stroke="#30d158" strokeWidth={1} strokeLinecap="round"/>
      <text x={58} y={16} fontSize={11} fill="#f5f5f7" fontWeight={600}>Autobit AI Agent</text>
      <text x={58} y={28} fontSize={8.5} fill="#30d158">● Online · 0ms response</text>
      {msgs.map((m,i)=>{
        const y=52+i*44; const w=Math.min(m.t.length*5.4+24,260); const x=m.r?400-w-14:18;
        return(
          <motion.g key={i} initial={{opacity:0,y:y+10}} animate={active?{opacity:1,y}:{opacity:0,y:y+10}} transition={{duration:0.45,delay:m.d}}>
            <rect x={x} y={0} width={w} height={32} rx={10} fill={m.r?"rgba(48,209,88,0.18)":"rgba(255,255,255,0.06)"} stroke={m.r?"rgba(48,209,88,0.3)":"rgba(255,255,255,0.08)"} strokeWidth={1}/>
            <text x={x+12} y={20} fontSize={8.5} fill={m.r?"#d4fad4":"rgba(255,255,255,0.75)"}>{m.t.length>42?m.t.slice(0,42)+"…":m.t}</text>
          </motion.g>
        );
      })}
      <motion.g animate={active?{opacity:[0,1,0]}:{opacity:0}} transition={{delay:3.2,duration:1.2,repeat:Infinity,repeatDelay:2}}>
        <rect x={18} y={226} width={52} height={10} rx={5} fill="rgba(255,255,255,0.07)"/>
        {[0,1,2].map(i=>(
          <motion.circle key={i} cx={32+i*10} cy={231} r={2.5} fill="#30d158"
            animate={active?{cy:[231,228,231]}:{}} transition={{duration:0.5,delay:i*0.12,repeat:Infinity}}/>
        ))}
      </motion.g>
    </svg>
  );
};

export const WebAppsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <defs>
      <linearGradient id="wa1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#bf5af2" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(14,14,18,0.96)" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
    <rect x={0} y={0} width={72} height={240} fill="rgba(255,255,255,0.025)"/>
    {[{y:18,active:true},{y:56},{y:94},{y:132},{y:170}].map((item,i)=>(
      <rect key={i} x={8} y={item.y} width={56} height={30} rx={8} fill={item.active?"rgba(191,90,242,0.15)":"transparent"}/>
    ))}
    {[{x:84,label:"Revenue",val:"₱284,500",change:"+18%",color:"#bf5af2"},{x:192,label:"Clients",val:"1,284",change:"+7%",color:"#30d158"},{x:300,label:"Tickets",val:"23",change:"-12%",color:"#ff9f0a"}].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,y:-8}} animate={active?{opacity:1,y:0}:{opacity:0,y:-8}} transition={{delay:i*0.12}}>
        <rect x={c.x} y={8} width={100} height={54} rx={10} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={c.x+10} y={24} fontSize={7.5} fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={c.x+10} y={40} fontSize={13} fill="#f5f5f7" fontWeight={700}>{c.val}</text>
        <rect x={c.x+10} y={46} width={32} height={10} rx={5} fill={`${c.color}22`}/>
        <text x={c.x+26} y={54} textAnchor="middle" fontSize={7} fill={c.color} fontWeight={600}>{c.change}</text>
      </motion.g>
    ))}
    <rect x={84} y={72} width={200} height={90} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={94} y={86} fontSize={8} fill="rgba(255,255,255,0.35)">Revenue / Month</text>
    <motion.path d="M94,148 C110,130 126,120 142,110 C158,100 174,118 190,105 C206,92 222,95 238,82 L238,148 Z"
      fill="url(#wa1)" initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.5,duration:0.8}}/>
    <motion.path d="M94,148 C110,130 126,120 142,110 C158,100 174,118 190,105 C206,92 222,95 238,82"
      stroke="#bf5af2" strokeWidth={2} fill="none" strokeLinecap="round"
      initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{delay:0.3,duration:1.2,ease:"easeOut"}}/>
    <motion.g initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:1.4}}>
      <rect x={196} y={88} width={52} height={26} rx={6} fill="#bf5af2"/>
      <text x={222} y={102} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={700}>₱58.2k</text>
    </motion.g>
    <rect x={294} y={72} width={116} height={90} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
    <text x={304} y={86} fontSize={8} fill="rgba(255,255,255,0.35)">Tickets / Week</text>
    {[28,44,20,55,36,48,38].map((h,i)=>(
      <motion.rect key={i} x={302+i*14} rx={3} width={9} fill={i===3?"#bf5af2":"rgba(100,210,255,0.45)"} opacity={0.9}
        initial={{height:0,y:152}} animate={active?{height:h*0.6,y:152-h*0.6}:{height:0,y:152}} transition={{duration:0.45,delay:0.3+i*0.06,ease:"easeOut"}}/>
    ))}
    <rect x={84} y={170} width={326} height={64} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
    <text x={94} y={184} fontSize={7.5} fill="rgba(255,255,255,0.28)" letterSpacing={1}>RECENT CLIENTS</text>
    {[{name:"Santos Corp",status:"Active",val:"₱45,000"},{name:"Reyes & Co.",status:"Pending",val:"₱12,800"},{name:"LGU Cagayan",status:"Active",val:"₱88,000"}].map((r,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-10}} animate={active?{opacity:1,x:0}:{opacity:0,x:-10}} transition={{delay:0.8+i*0.1}}>
        <text x={94} y={196+i*16} fontSize={8} fill="rgba(255,255,255,0.7)">{r.name}</text>
        <rect x={200} y={188+i*16} width={36} height={11} rx={5} fill={r.status==="Active"?"rgba(48,209,88,0.15)":"rgba(255,159,10,0.15)"}/>
        <text x={218} y={196+i*16} textAnchor="middle" fontSize={7} fill={r.status==="Active"?"#30d158":"#ff9f0a"}>{r.status}</text>
        <text x={390} y={196+i*16} textAnchor="end" fontSize={8} fill="rgba(255,255,255,0.45)">{r.val}</text>
      </motion.g>
    ))}
  </svg>
);

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
    {[{text:"Restock: 20 items flagged",time:"2m",color:"#ff9f0a"},{text:"Payroll processed — 34 staff",time:"1h",color:"#30d158"},{text:"Monthly report generated",time:"3h",color:"#bf5af2"},{text:"Server maintenance scheduled",time:"5h",color:"#ff375f"},{text:"3 new staff onboarded",time:"1d",color:"#64d2ff"}].map((t,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.5+i*0.1}}>
        <rect x={158} y={122+i*19} width={3} height={14} rx={2} fill={t.color}/>
        <text x={168} y={133+i*19} fontSize={8.5} fill="rgba(255,255,255,0.55)">{t.text}</text>
        <text x={396} y={133+i*19} textAnchor="end" fontSize={7.5} fill="rgba(255,255,255,0.22)">{t.time}</text>
      </motion.g>
    ))}
  </svg>
);

export const RoboticsArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <rect x={0} y={0} width={420} height={240} rx={12} fill="rgba(6,3,3,0.99)" stroke="rgba(255,59,48,0.15)" strokeWidth={1}/>
    {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*70} y1={32} x2={i*70} y2={200} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1={0} y1={32+i*42} x2={420} y2={32+i*42} stroke="rgba(255,59,48,0.04)" strokeWidth={1}/>)}
    <rect x={0} y={0} width={420} height={30} fill="rgba(255,59,48,0.08)"/>
    <circle cx={14} cy={15} r={5} fill="#ff375f" opacity={0.9}/>
    <motion.circle cx={14} cy={15} r={5} fill="#ff375f" animate={active?{opacity:[0.9,0.2,0.9]}:{opacity:0.2}} transition={{duration:1,repeat:Infinity}}/>
    <text x={24} y={19} fontSize={9} fill="#ff375f" fontFamily="monospace">REC  AXONIS EDGE v2.4</text>
    <text x={320} y={19} fontSize={9} fill="rgba(255,255,255,0.35)" fontFamily="monospace">04:22:18  30fps</text>
    <motion.line x1={0} y1={32} x2={420} y2={32} stroke="#ff375f" strokeWidth={1.5} opacity={0.5}
      animate={active?{y1:[32,200,32],y2:[32,200,32]}:{}} transition={{duration:2.4,repeat:Infinity,ease:"linear"}}/>
    {[{x:40,y:50,w:90,h:80,label:"Person",conf:"98.4%",color:"#ff375f"},{x:200,y:80,w:110,h:90,label:"Forklift",conf:"95.1%",color:"#ff9f0a"},{x:310,y:45,w:80,h:60,label:"Hazard",conf:"91.8%",color:"#ff375f"}].map((b,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.4+i*0.4}}>
        <path d={`M${b.x+12},${b.y} L${b.x},${b.y} L${b.x},${b.y+12}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w-12},${b.y} L${b.x+b.w},${b.y} L${b.x+b.w},${b.y+12}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x},${b.y+b.h-12} L${b.x},${b.y+b.h} L${b.x+12},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <path d={`M${b.x+b.w},${b.y+b.h-12} L${b.x+b.w},${b.y+b.h} L${b.x+b.w-12},${b.y+b.h}`} stroke={b.color} strokeWidth={2} fill="none"/>
        <rect x={b.x} y={b.y-16} width={b.w} height={15} rx={3} fill={b.color} opacity={0.9}/>
        <text x={b.x+6} y={b.y-5} fontSize={8.5} fill="#fff" fontWeight={600}>{b.label}  {b.conf}</text>
      </motion.g>
    ))}
    <rect x={0} y={200} width={420} height={40} fill="rgba(255,59,48,0.06)" stroke="rgba(255,59,48,0.1)" strokeWidth={1}/>
    {[{x:10,l:"Zones",v:"4/4"},{x:90,l:"Detected",v:"7"},{x:170,l:"Alerts",v:"1"},{x:250,l:"Uptime",v:"99.98%"},{x:340,l:"Latency",v:"12ms"}].map((s,i)=>(
      <motion.g key={i} initial={{opacity:0}} animate={active?{opacity:1}:{opacity:0}} transition={{delay:0.8+i*0.1}}>
        <text x={s.x} y={213} fontSize={7} fill="rgba(255,255,255,0.28)" fontFamily="monospace">{s.l}</text>
        <text x={s.x} y={228} fontSize={10} fill={i===2?"#ff375f":"#ff9f0a"} fontWeight={700} fontFamily="monospace">{s.v}</text>
      </motion.g>
    ))}
  </svg>
);

export const MobileArt = ({ active, animKey }: { active: boolean; animKey: number }) => (
  <svg key={animKey} viewBox="0 0 420 240" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx={210} cy={120} rx={80} ry={100} fill="rgba(100,210,255,0.03)"/>
    <rect x={147} y={2} width={126} height={236} rx={22} fill="#0a0a0f" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5}/>
    <rect x={150} y={5} width={120} height={230} rx={20} fill="#080810"/>
    <rect x={178} y={8} width={64} height={12} rx={6} fill="#0a0a0f"/>
    <rect x={155} y={22} width={110} height={208} rx={16} fill="#0d0d18"/>
    <rect x={155} y={22} width={110} height={28} rx={16} fill="rgba(100,210,255,0.06)"/>
    <rect x={155} y={34} width={110} height={16} fill="rgba(100,210,255,0.06)"/>
    <text x={210} y={38} textAnchor="middle" fontSize={9} fill="#f5f5f7" fontWeight={600}>Autobit App</text>
    {[{y:54,label:"Revenue",val:"₱128k",color:"#64d2ff"},{y:86,label:"Tasks",val:"18 open",color:"#bf5af2"},{y:118,label:"Clients",val:"84",color:"#30d158"}].map((c,i)=>(
      <motion.g key={i} initial={{opacity:0,x:-8}} animate={active?{opacity:1,x:0}:{opacity:0,x:-8}} transition={{delay:0.2+i*0.15}}>
        <rect x={161} y={c.y} width={98} height={28} rx={8} fill="rgba(255,255,255,0.04)" stroke={`${c.color}33`} strokeWidth={1}/>
        <text x={170} y={c.y+11} fontSize={8} fill="rgba(255,255,255,0.35)">{c.label}</text>
        <text x={170} y={c.y+22} fontSize={9} fill={c.color} fontWeight={700}>{c.val}</text>
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
    <rect x={273} y={70} width={3} height={30} rx={2} fill="rgba(255,255,255,0.15)"/>
    <rect x={144} y={80} width={3} height={40} rx={2} fill="rgba(255,255,255,0.12)"/>
    <rect x={185} y={224} width={50} height={3} rx={2} fill="rgba(255,255,255,0.2)"/>
  </svg>
);
