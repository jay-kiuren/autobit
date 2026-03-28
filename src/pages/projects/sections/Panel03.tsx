import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { iotProjects } from "../data";

/**
 * Panel03: Robotics & IoT Section
 * FIX: Navigation buttons interaction area cleared from peek card overlap.
 */

const Panel03: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const fonts = {
    display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    text: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  };

  const theme = {
    bg: "#000000",
    cardBg: "#0e0e10",
    primary: "#f5f5f7",
    secondary: "rgba(255,255,255,0.70)",
    muted: "rgba(255,255,255,0.40)",
    accentGreen: "#30d158",
    badgeBlue: "#0071e3",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setCurrentIndex(0);
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % iotProjects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + iotProjects.length) % iotProjects.length);
  };

  const getIndex = (offset: number) => {
    return (currentIndex + offset + iotProjects.length) % iotProjects.length;
  };

  const activeProject = iotProjects[currentIndex];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: theme.bg,
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", marginBottom: "64px" }}>
        <ScrollReveal>
          <p style={{
            fontFamily: fonts.text,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: theme.muted,
            marginBottom: "16px",
            fontWeight: 600
          }}>
            Industrial Intelligence · IoT
          </p>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: "clamp(42px, 5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: theme.primary,
            margin: "0 0 16px",
          }}>
            Built in the real world.
          </h2>
          <p style={{
            fontFamily: fonts.text,
            fontSize: "19px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            maxWidth: "500px",
            margin: 0
          }}>
            Nationally awarded hardware protocols and autonomous systems.
          </p>
        </ScrollReveal>
      </div>

      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        {/* Navigation Buttons - Ensure pointer-events: auto and high z-index */}
        <div style={{ 
          position: "absolute", 
          width: "100%", 
          maxWidth: "1100px", 
          display: "flex", 
          justifyContent: "space-between", 
          zIndex: 50, // Increased z-index
          padding: "0 20px",
          pointerEvents: "none"
        }}>
          <motion.button 
            onClick={handlePrev} 
            whileTap={{ scale: 0.9 }}
            style={{ 
              pointerEvents: "auto", 
              width: "44px", height: "44px", borderRadius: "50%", 
              background: "rgba(30, 30, 30, 0.8)", border: "none", color: "#fff", cursor: "pointer",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </motion.button>
          <motion.button 
            onClick={handleNext} 
            whileTap={{ scale: 0.9 }}
            style={{ 
              pointerEvents: "auto", 
              width: "44px", height: "44px", borderRadius: "50%", 
              background: "rgba(30, 30, 30, 0.8)", border: "none", color: "#fff", cursor: "pointer",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </motion.button>
        </div>

        {/* Main Card Wrapper */}
        <div style={{ width: "85%", maxWidth: "980px", height: "540px", position: "relative", zIndex: 10 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "28px",
                overflow: "hidden",
                position: "relative",
                background: theme.cardBg
              }}
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />

              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                pointerEvents: "none"
              }} />

              <div style={{ position: "absolute", top: "32px", left: "32px" }}>
                <span style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: activeProject.badgeBlue ? theme.badgeBlue : "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  fontFamily: fonts.text
                }}>
                  {activeProject.badge}
                </span>
              </div>

              <div style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px" }}>
                <h3 style={{
                  fontFamily: fonts.display,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em"
                }}>
                  {activeProject.title}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <p style={{
                    fontFamily: fonts.text,
                    fontSize: "15px",
                    color: theme.secondary,
                    margin: 0,
                    maxWidth: "70%"
                  }}>
                    {activeProject.subtitle}
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ 
                      width: "8px", height: "8px", borderRadius: "50%", 
                      background: activeProject.statusColor || theme.accentGreen,
                      boxShadow: `0 0 8px ${activeProject.statusColor || theme.accentGreen}`
                    }} />
                    <span style={{ 
                      fontFamily: fonts.text, fontSize: "12px", color: theme.muted, 
                      textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 
                    }}>
                      {activeProject.statusLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Peek Cards - Added pointerEvents: "none" to prevent blocking buttons */}
        <div style={{ 
          position: "absolute", left: "-5%", width: "15%", height: "480px", 
          opacity: 0.2, filter: "blur(4px)", pointerEvents: "none", zIndex: 5 
        }}>
           <img src={iotProjects[getIndex(-1)].image} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px" }} />
        </div>
        <div style={{ 
          position: "absolute", right: "-5%", width: "15%", height: "480px", 
          opacity: 0.2, filter: "blur(4px)", pointerEvents: "none", zIndex: 5 
        }}>
           <img src={iotProjects[getIndex(1)].image} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px" }} />
        </div>
      </div>
    </section>
  );
};

export default Panel03;