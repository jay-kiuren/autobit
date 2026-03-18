import { motion } from "framer-motion";

const CTASection = () => (
  <section style={{background:"#000",padding:"80px 0 96px",position:"relative",zIndex:20,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 55% at 50% 60%,rgba(41,151,255,0.09) 0%,transparent 70%)",pointerEvents:"none"}}/>

    <div className="svc-c" style={{position:"relative",zIndex:1}}>
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>

        <div className="cta-section-card">
          {[1,2,3].map(n=>(
            <motion.div key={n} style={{position:"absolute",
              top:"50%",left:"50%",
              width:`${n*160+120}px`,height:`${n*160+120}px`,
              marginTop:`-${(n*160+120)/2}px`,marginLeft:`-${(n*160+120)/2}px`,
              borderRadius:"50%",border:"1px solid rgba(41,151,255,0.07)",
              pointerEvents:"none",
            }}
            animate={{scale:[1,1.04,1],opacity:[0.5,0.15,0.5]}}
            transition={{duration:3+n,repeat:Infinity,delay:n*0.5,ease:"easeInOut"}}/>
          ))}

          <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(41,151,255,0.6),transparent)"}}/>

          <motion.h2
            initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{delay:0.15,duration:0.65}}
            style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:800,letterSpacing:"-2px",
              lineHeight:1.02,color:"#f5f5f7",margin:"0 0 16px",position:"relative",zIndex:1}}>
            Build something{" "}
            <span style={{
              background:"linear-gradient(90deg,#2997ff,#64d2ff)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>
              others won't.
            </span>
          </motion.h2>

          <motion.p
            initial={{opacity:0}} whileInView={{opacity:1}}
            viewport={{once:true}} transition={{delay:0.25,duration:0.6}}
            style={{fontSize:"clamp(12px,1vw,15px)",color:"rgba(255,255,255,0.35)",
              margin:"0 auto 40px",maxWidth:440,lineHeight:1.65,position:"relative",zIndex:1}}>
            Fixed pricing. Fast delivery. 50% to start.
          </motion.p>

          <motion.div
            initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{delay:0.35,duration:0.6}}
            style={{display:"flex",alignItems:"center",justifyContent:"center",
              gap:24,flexWrap:"wrap",position:"relative",zIndex:1}}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} className="svc-cta" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Start a project →
            </button>
            <a href="/pricing" style={{
              background:"rgba(255,255,255,0.10)",color:"#fff",padding:"12px 26px",
              borderRadius:"980px",fontSize:"15px",fontWeight:500,textDecoration:"none",
              display:"inline-block",transition:"background 0.2s ease, transform 0.2s ease",
              letterSpacing:"-0.01em",border:"none",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="#2997ff";e.currentTarget.style.transform="scale(1.02)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";e.currentTarget.style.transform="scale(1)";}}
            >See pricing</a>
          </motion.div>

          <motion.p
            initial={{opacity:0}} whileInView={{opacity:1}}
            viewport={{once:true}} transition={{delay:0.5,duration:0.5}}
            style={{fontSize:"11px",color:"rgba(255,255,255,0.18)",marginTop:24,position:"relative",zIndex:1}}>
            autobitofficial.ph@gmail.com · No retainers · Balance due only on delivery
          </motion.p>

          <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,
            background:"linear-gradient(to bottom,transparent,rgba(41,151,255,0.04))",
            borderRadius:"inherit",pointerEvents:"none",
          }}/>
        </div>

      </motion.div>
    </div>
  </section>
);

export default CTASection;
