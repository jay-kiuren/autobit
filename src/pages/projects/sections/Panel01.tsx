import { motion } from "framer-motion";

const bounceKeyframes = `
@keyframes heroChevronBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}
`;

const HeroSection = () => (
  <section style={{
    position: "sticky",
    top: 0,
    zIndex: 0,
    height: "100vh",
    background: "#000000",
    overflow: "hidden",
  }}>
    <style>{bounceKeyframes}</style>

    {/* Radial glow */}
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(41,151,255,0.06) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />

    {/* Bottom-left content */}
    <div style={{
      position: "absolute", bottom: 0, left: 0,
      padding: "0 40px 72px",
    }}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.28)",
          marginBottom: "16px",
          margin: "0 0 16px",
        }}
      >
        Engineering · Innovation · Deployment
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "clamp(52px, 7vw, 88px)",
          fontWeight: 700,
          letterSpacing: "-0.045em",
          lineHeight: 1.0,
          color: "#f5f5f7",
          margin: "0 0 20px",
        }}
      >
        Work that ships.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.65,
          maxWidth: "440px",
          margin: 0,
        }}
      >
        autobit ni oy. 
      </motion.p>
    </div>

    {/* Scroll indicator */}
    <div style={{
      position: "absolute",
      bottom: "28px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
    }}>
      <span style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "rgba(255,255,255,0.20)",
        textTransform: "uppercase" as const,
      }}>
        Scroll
      </span>
      <span style={{
        fontSize: "14px",
        color: "rgba(255,255,255,0.20)",
        animation: "heroChevronBounce 1.8s ease-in-out infinite",
      }}>
        ↓
      </span>
    </div>
  </section>
);

export default HeroSection;
