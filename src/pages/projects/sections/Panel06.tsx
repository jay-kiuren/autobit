import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const panels = [
  {
    type: "website",
    title: "Business Dashboard",
    category: "Web Platform",
    accent: "41,151,255",
    // Replace with your actual image path
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070", 
  },
  {
    type: "website",
    title: "School System",
    category: "Web Platform",
    accent: "48,209,88",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2104",
  },
  {
    type: "app",
    title: "AXONIS Mobile",
    category: "iOS · Android",
    accent: "41,151,255",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=2070",
  },
  {
    type: "app",
    title: "Ops Manager",
    category: "iOS · Android",
    accent: "255,159,10",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
  },
  {
    type: "app",
    title: "Client Portal",
    category: "iOS · Android",
    accent: "191,90,242",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070",
  },
];

// Rebuilt for Full Screen / No Outline / Apple Design
const ViewportContent = ({ p }: { p: typeof panels[0] }) => (
  <div style={{ 
    width: "100%", 
    height: "100%", 
    position: "relative",
    background: "#000",
    overflow: "hidden"
  }}>
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${p.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    {/* Subtle overlay to help white text/elements pop if needed */}
    <div style={{ 
      position: "absolute", 
      inset: 0, 
      background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)",
      pointerEvents: "none"
    }} />
  </div>
);

const AppSection = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  useEffect(() => {
    if (isInView) {
      setActive(0);
    }
  }, [isInView]);

  const p = panels[active];

  return (
    <section ref={containerRef} style={{
      position: "relative", zIndex: 1,
      background: "#000",
      paddingTop: "100px", paddingBottom: "80px",
    }}>
      <div className="section-container">
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "64px", alignItems: "center" }}>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,.05)",
              borderRadius: "999px", padding: "6px 14px", marginBottom: "28px",
            }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2997ff" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
                App &amp; Website
              </span>
            </div>

            <h2 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontSize: "clamp(32px,3.5vw,46px)", fontWeight: 700,
              letterSpacing: "-.04em", lineHeight: 1.05,
              color: "#f5f5f7", marginBottom: "16px",
            }}>
              Built for<br />
              <span style={{ color: "rgba(255,255,255,.28)" }}>the builders.</span>
            </h2>

            <p style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: "15px", color: "rgba(255,255,255,.38)",
              lineHeight: 1.65, maxWidth: "300px", marginBottom: "36px",
            }}>
              Web platforms and mobile apps built to the same standard. Fast, focused, and production-ready.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "36px" }}>
              {panels.map((item, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "10px 0",
                    transform: active === i ? "translateX(12px)" : "translateX(0)",
                    transition: "all 0.4s cubic-bezier(0.2, 1, 0.2, 1)",
                  }}
                >
                  <div style={{
                    height: "1.5px", background: "#fff",
                    width: active === i ? "40px" : "0px",
                    marginRight: active === i ? "16px" : "0px",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                  <span style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    fontSize: "13px", fontWeight: 700,
                    letterSpacing: ".08em", textTransform: "uppercase",
                    color: "#fff",
                    opacity: active === i ? 1 : 0.2,
                    transition: "opacity .3s ease",
                  }}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: "12px",
                background: "#fff", color: "#000", border: "none",
                borderRadius: "999px", padding: "14px 28px",
                fontSize: "13px", fontWeight: 700, letterSpacing: ".02em", cursor: "pointer",
              }}
            >
              Coming Soon
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </motion.div>

          {/* Right — Refined Full-Screen Viewport Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", height: "100%", minHeight: "550px" }}
          >
            {/* Glow Background (Silent Selection) */}
            <div style={{
              position: "absolute", inset: "-60px", borderRadius: "50%",
              background: `rgba(${p.accent},.15)`,
              filter: "blur(120px)", pointerEvents: "none", zIndex: 0,
              transition: "background 0.8s ease",
            }} />

            {/* Apple-Style Edge-to-Edge Container */}
            <div style={{
              width: "100%", height: "100%",
              background: "#111",
              borderRadius: "24px", // Modern rounded edge
              overflow: "hidden",
              position: "relative", zIndex: 1,
              display: "flex", flexDirection: "column",
              boxShadow: "0 50px 100px -20px rgba(0,0,0,0.7)",
            }}>
              {/* Edge-to-Edge Screen Content (Removed Toolbar & Outline) */}
              <div style={{ flex: 1, position: "relative" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <ViewportContent p={p} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AppSection;