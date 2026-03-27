import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import {
  BarChart2,
  Users,
  ShoppingCart,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { id: "analytics",  label: "Analytics",     icon: BarChart2,   accent: "41, 151, 255"  },
  { id: "customers",  label: "Customers",     icon: Users,       accent: "48, 209, 88"   },
  { id: "orders",     label: "Orders",        icon: ShoppingCart,accent: "255, 159, 10"  },
  { id: "growth",     label: "Growth",        icon: TrendingUp,  accent: "255, 69, 58"   },
  { id: "alerts",     label: "Alerts",        icon: Bell,        accent: "191, 90, 242"  },
  { id: "settings",   label: "Settings",      icon: Settings,    accent: "255,255,255"   },
];

const content: Record<string, { title: string; subtitle: string; value: string; body: string }> = {
  analytics:  { title: "Live Analytics",       subtitle: "Real-time data pipeline",    value: "99.9%",  body: "Track every metric that matters — live, not lagging." },
  customers:  { title: "Customer Intelligence",subtitle: "Segmentation & behavior",    value: "12.4K",  body: "Know who your customers are and what they actually do." },
  orders:     { title: "Order Operations",     subtitle: "End-to-end fulfillment",     value: "$84K",   body: "From checkout to delivery — tracked and automated." },
  growth:     { title: "Growth Engine",        subtitle: "Forecasting & trends",       value: "+34%",   body: "Predictive models that tell you where revenue is going." },
  alerts:     { title: "Smart Alerts",         subtitle: "Threshold-based triggers",   value: "0 miss", body: "Get notified on what matters. Nothing else." },
  settings:   { title: "System Config",        subtitle: "Roles, access & audit log",  value: "SOC2",   body: "Enterprise-grade control over who sees what." },
};

const SidebarItem = ({
  item,
  isActive,
  onClick,
}: {
  item: typeof menuItems[0];
  isActive: boolean;
  onClick: (id: string) => void;
}) => (
  <button
    onClick={() => onClick(item.id)}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      padding: "10px 14px",
      borderRadius: "9999px",
      border: "none",
      cursor: "pointer",
      background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
      transition: "background 0.2s ease",
    }}
  >
    <div style={{
      padding: "5px",
      borderRadius: "50%",
      border: `1px solid ${isActive ? `rgba(${item.accent},0.50)` : "rgba(255,255,255,0.15)"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isActive ? `rgba(${item.accent},1)` : "rgba(255,255,255,0.35)",
      transition: "all 0.2s ease",
    }}>
      <item.icon size={13} />
    </div>
    <span style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      fontSize: "13px",
      fontWeight: isActive ? 600 : 400,
      color: isActive ? "#f5f5f7" : "rgba(255,255,255,0.40)",
      letterSpacing: "-0.01em",
      transition: "color 0.2s ease",
    }}>
      {item.label}
    </span>
  </button>
);

const DashboardPreview = () => {
  const [active, setActive] = useState("analytics");
  const [open, setOpen] = useState(false);
  const c = content[active];
  const item = menuItems.find(m => m.id === active)!;

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      display: "flex",
      gap: "32px",
      alignItems: "center",
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
    }}>
      {/* Sidebar */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: "180px",
      }}>
        {menuItems.map(m => (
          <SidebarItem key={m.id} item={m} isActive={active === m.id} onClick={setActive} />
        ))}
      </div>

      {/* Laptop shell */}
      <div style={{ flex: 1, perspective: "1200px" }}>
        <motion.div
          initial={{ rotateX: -90, originY: "bottom" }}
          animate={{ rotateX: open ? 0 : -90 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Screen */}
          <div style={{
            position: "relative",
            aspectRatio: "16/10",
            background: "#0a0a0a",
            borderRadius: "16px 16px 0 0",
            border: "2px solid #2a2a2a",
            overflow: "hidden",
          }}>
            {/* Notch */}
            <div style={{
              position: "absolute", top: 0,
              left: "50%", transform: "translateX(-50%)",
              width: "100px", height: "20px",
              background: "#000",
              borderRadius: "0 0 12px 12px",
              zIndex: 10,
              borderLeft: "1px solid #2a2a2a",
              borderRight: "1px solid #2a2a2a",
              borderBottom: "1px solid #2a2a2a",
            }} />

            {/* Grid bg */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }} />

            {/* Glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse 60% 50% at 60% 40%, rgba(${item.accent},0.08) 0%, transparent 70%)`,
              pointerEvents: "none",
              transition: "background 0.5s ease",
            }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1,    filter: "blur(0px)" }}
                exit={{   opacity: 0, scale: 1.01,  filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: "circOut" }}
                style={{
                  width: "100%", height: "100%",
                  padding: "36px 36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Top */}
                <div>
                  <p style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.28)",
                    margin: "0 0 10px",
                  }}>
                    Dashboard Module
                  </p>
                  <h3 style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#f5f5f7",
                    margin: "0 0 6px",
                  }}>
                    {c.title}
                  </h3>
                  <div style={{
                    height: "2px",
                    width: "32px",
                    background: `rgba(${item.accent}, 0.80)`,
                    borderRadius: "2px",
                    marginTop: "12px",
                  }} />
                </div>

                {/* Bottom */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      margin: "0 0 4px",
                    }}>
                      {c.subtitle}
                    </p>
                    <p style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.30)",
                      margin: "0 0 16px",
                      maxWidth: "200px",
                    }}>
                      {c.body}
                    </p>
                    <button style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#fff",
                      color: "#000",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "7px 16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                    }}>
                      EXPLORE <ChevronRight size={11} />
                    </button>
                  </div>
                  <div style={{
                    fontSize: "clamp(28px, 5vw, 48px)",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.07)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}>
                    {c.value}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Base */}
        <div style={{
          height: "12px",
          width: "105%",
          marginLeft: "-2.5%",
          background: "#1e1e1e",
          borderRadius: "0 0 12px 12px",
          borderTop: "1px solid #333",
        }} />
        <div style={{
          height: "3px",
          width: "70%",
          margin: "0 auto",
          background: "#111",
          borderRadius: "0 0 8px 8px",
          opacity: 0.5,
          filter: "blur(2px)",
        }} />
      </div>
    </div>
  );
};

const DashboardSection = () => (
  <section style={{
    position: "relative",
    zIndex: 1,
    background: "#0a0a0a",
    paddingTop: "100px",
    paddingBottom: "80px",
  }}>
    <div className="section-container">
      <ScrollReveal>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.28)",
          margin: "0 0 16px",
        }}>
          Business Dashboard
        </p>
        <h2 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "clamp(40px, 6vw, 64px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          color: "#f5f5f7",
          margin: "0 0 12px",
        }}>
          Your data, visible.
        </h2>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.65,
          margin: "0 0 64px",
          maxWidth: "480px",
        }}>
          Custom dashboards built for how your business actually works.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <DashboardPreview />
      </ScrollReveal>
    </div>
  </section>
);

export default DashboardSection;