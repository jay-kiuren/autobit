import React from "react";
import { motion } from "framer-motion";
import { services } from "./data";

interface ServiceSectionsProps {
  activeIndex: number;
  animKeys: number[];
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const panelAnims = [
  { initial:{opacity:0,x:-60},    animate:{opacity:1,x:0},    transition:{duration:0.65,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,x:60},     animate:{opacity:1,x:0},    transition:{duration:0.65,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,scale:0.88},animate:{opacity:1,scale:1},transition:{duration:0.7,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,y:50},     animate:{opacity:1,y:0},    transition:{duration:0.6,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,x:-40,rotate:-2},animate:{opacity:1,x:0,rotate:0},transition:{duration:0.7,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,y:-40,scale:0.95},animate:{opacity:1,y:0,scale:1},transition:{duration:0.65,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
];

const artAnims = [
  { initial:{opacity:0,x:60},     animate:{opacity:1,x:0},    transition:{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,x:-60},    animate:{opacity:1,x:0},    transition:{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,y:40},     animate:{opacity:1,y:0},    transition:{duration:0.65,delay:0.15,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,scale:0.9},animate:{opacity:1,scale:1},transition:{duration:0.7,delay:0.1,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,x:50,rotate:2},animate:{opacity:1,x:0,rotate:0},transition:{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
  { initial:{opacity:0,y:50},     animate:{opacity:1,y:0},    transition:{duration:0.65,delay:0.08,ease:[0.22,1,0.36,1] as [number,number,number,number]} },
];

const ServiceSections = ({ activeIndex, animKeys, sectionRefs }: ServiceSectionsProps) => (
  <>
    {services.map((s, i) => {
      const { Art, FrameDeco } = s;
      const isActive  = activeIndex === i;
      const isReverse = i % 2 === 1;

      // ── If the panel has a custom full layout, use it ──────────────────────
      if ((s as any).FullPanel) {
        const FullPanel = (s as any).FullPanel;
        return (
          <FullPanel
            key={s.id}
            active={isActive}
            animKey={animKeys[i]}
            sectionRef={(el: HTMLDivElement | null) => { sectionRefs.current[i] = el; }}
          />
        );
      }

      // ── Default 2-col grid layout ──────────────────────────────────────────
      const panelAnim = panelAnims[i];
      const artAnim   = artAnims[i];

      return (
        <section key={s.id} id={s.id}
          ref={el => { sectionRefs.current[i] = el as HTMLDivElement; }}
          style={{
            background: "#000", position: "relative", overflow: "hidden",
            padding: "72px 0 52px",
            marginBottom: i < services.length - 1 ? -36 : 0,
            zIndex: i + 2,
          }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 48% 52% at ${isReverse ? "28%" : "72%"} 50%,${s.accent}08 0%,transparent 70%)`, opacity: isActive ? 1 : 0, transition: "opacity 0.8s ease" }} />
          <div style={{ position: "absolute", top: "50%", right: isReverse ? "auto" : "0", left: isReverse ? "0" : "auto", transform: "translateY(-50%)", fontSize: "clamp(55px,10vw,140px)", fontWeight: 800, color: "rgba(255,255,255,1)", opacity: 0.015, userSelect: "none", pointerEvents: "none", lineHeight: 1, letterSpacing: "-0.06em" }}>
            {String(i + 1).padStart(2, "0")}
          </div>

          <div className="svc-c" style={{ width: "100%", position: "relative", zIndex: 1 }}>
            <div className="svc-frame" style={{ "--accent": s.accent } as React.CSSProperties}>
              <FrameDeco accent={s.accent} />

              <div className={isReverse ? "svc-grid-rev" : "svc-grid"} style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                  style={{ direction: "ltr", order: isReverse ? 2 : 1 }}
                  initial={panelAnim.initial} whileInView={panelAnim.animate}
                  viewport={{ once: false, amount: 0.2 }} transition={panelAnim.transition}>

                  <div className="svc-badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {s.badge}
                  </div>

                  <h2 className="svc-heading">{s.heading}</h2>
                  <p className="svc-desc">{s.desc}</p>
                  <span className="svc-tag">{s.uniqueTag}</span>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} className="svc-cta" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Get a quote →</button>
                  </div>
                </motion.div>

                <motion.div
                  style={{ direction: "ltr", order: isReverse ? 1 : 2 }}
                  initial={artAnim.initial} whileInView={artAnim.animate}
                  viewport={{ once: false, amount: 0.2 }} transition={artAnim.transition}>
                  <div className="svc-glass" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.02) 50%,rgba(255,255,255,0.02) 100%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 20px 52px rgba(0,0,0,0.55)" }}>
                    <div className="svc-glass-inner">
                      <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }} />
                      <Art active={isActive} animKey={animKeys[i]} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {i < services.length - 1 && <div className="svc-fade" />}
        </section>
      );
    })}
  </>
);

export default ServiceSections;