import { motion } from "framer-motion";

const HeroSection = () => (
  <section style={{background:"#000",minHeight:"46vh",display:"flex",alignItems:"center",paddingTop:64,paddingBottom:0,position:"relative",overflow:"hidden",marginBottom:-56,zIndex:0}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 40% at 50% 55%,rgba(41,151,255,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
    <div className="svc-c" style={{position:"relative",zIndex:1,width:"100%",textAlign:"center",paddingBottom:72}}>
      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:[0.25,0.1,0.25,1]}}>
        <span style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"rgba(255,255,255,0.25)",display:"block",marginBottom:18}}>
          Engineering services
        </span>
        <h1 style={{fontSize:"clamp(32px,5vw,68px)",fontWeight:800,letterSpacing:"-2.5px",lineHeight:1.01,color:"#f5f5f7",margin:"0 0 20px"}}>
          What we build.
        </h1>
        <p style={{fontSize:"clamp(14px,1.3vw,17px)",color:"rgba(255,255,255,0.3)",margin:"0 auto",maxWidth:400,lineHeight:1.65}}>
          Six capabilities. From automation to robotics.
        </p>
      </motion.div>
    </div>
    <div className="svc-fade"/>
  </section>
);

export default HeroSection;
