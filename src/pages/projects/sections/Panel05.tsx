import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BarChart2,
  Users,
  ShoppingCart,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";

// --- Types & Data ---

const menuItems = [
  { id: "analytics", label: "Analytics", icon: BarChart2, accent: "41, 151, 255" },
  { id: "customers", label: "Customers", icon: Users, accent: "48, 209, 88" },
  { id: "orders", label: "Orders", icon: ShoppingCart, accent: "255, 159, 10" },
  { id: "growth", label: "Growth", icon: TrendingUp, accent: "255, 69, 58" },
  { id: "alerts", label: "Alerts", icon: Bell, accent: "191, 90, 242" },
  { id: "settings", label: "Settings", icon: Settings, accent: "255, 255, 255" },
];

const content: Record<string, { title: string; subtitle: string; value: string; body: string; catUrl: string }> = {
  analytics: { 
    title: "Live Analytics", 
    subtitle: "Real-time data pipeline", 
    value: "99.9%", 
    body: "Track every metric that matters — live, not lagging.",
    catUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
  },
  customers: { 
    title: "Intelligence", 
    subtitle: "Segmentation & behavior", 
    value: "12.4K", 
    body: "Know who your customers are and what they actually do.",
    catUrl: "https://images.unsplash.com/photo-1573865668131-973177e81a4b?q=80&w=1000&auto=format&fit=crop"
  },
  orders: { 
    title: "Order Ops", 
    subtitle: "End-to-end fulfillment", 
    value: "$84K", 
    body: "From checkout to delivery — tracked and automated.",
    catUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1000&auto=format&fit=crop"
  },
  growth: { 
    title: "Growth Engine", 
    subtitle: "Forecasting & trends", 
    value: "+34%", 
    body: "Predictive models that tell you where revenue is going.",
    catUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop"
  },
  alerts: { 
    title: "Smart Alerts", 
    subtitle: "Threshold triggers", 
    value: "0 miss", 
    body: "Get notified on what matters. Nothing else.",
    catUrl: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1000&auto=format&fit=crop"
  },
  settings: { 
    title: "System Config", 
    subtitle: "Roles & access", 
    value: "SOC2", 
    body: "Enterprise-grade control over who sees what.",
    catUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop"
  },
};

// --- Components ---

const SidebarItem = ({ item, isActive, onClick }: { item: typeof menuItems[0]; isActive: boolean; onClick: (id: string) => void }) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(item.id)}
    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all duration-300"
    style={{
      background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
    }}
  >
    <div
      className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors"
      style={{
        background: isActive ? `rgba(${item.accent}, 0.15)` : "rgba(255,255,255,0.03)",
        color: isActive ? `rgb(${item.accent})` : "rgba(255,255,255,0.3)",
      }}
    >
      <item.icon size={14} strokeWidth={2.5} />
    </div>
    <span
      className="text-[13.5px] tracking-tight transition-colors"
      style={{
        fontFamily: "SF Pro Text, -apple-system, sans-serif",
        fontWeight: isActive ? 600 : 400,
        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.45)",
      }}
    >
      {item.label}
    </span>
  </motion.button>
);

const DashboardPreview = () => {
  const [active, setActive] = useState("analytics");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { threshold: 0.2, once: false });
  
  const c = content[active];
  const item = menuItems.find((m) => m.id === active)!;

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row gap-12 items-center w-full max-w-[1000px] mx-auto">
      {/* Sidebar */}
      <motion.div 
        key={`sidebar-${isInView}`}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-1.5 w-full lg:w-52"
      >
        {menuItems.map((m) => (
          <SidebarItem key={m.id} item={m} isActive={active === m.id} onClick={setActive} />
        ))}
      </motion.div>

      {/* Laptop / Screen Area */}
      <div className="flex-1 w-full perspective-[2000px]">
        <motion.div
          key={`screen-${isInView}`}
          initial={{ rotateX: 15, rotateY: -10, y: 40, opacity: 0, scale: 0.95 }}
          animate={isInView ? { rotateX: 0, rotateY: 0, y: 0, opacity: 1, scale: 1 } : { rotateX: 15, rotateY: -10, y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          {/* Main Display Shell */}
          <div className="relative aspect-[16/10] bg-[#000] rounded-[32px] overflow-hidden p-3 shadow-2xl shadow-blue-500/10 transition-all duration-700">
            {/* Screen Content Container */}
            <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-[#0a0a0b]">
              
              {/* Subtle Cat Asset Layer */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <img src={c.catUrl} alt="bg" className="w-full h-full object-cover filter grayscale contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/80" />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Accent Glow */}
              <motion.div 
                animate={{ 
                  background: `radial-gradient(circle at 70% 30%, rgba(${item.accent}, 0.12) 0%, transparent 60%)` 
                }}
                className="absolute inset-0 pointer-events-none z-1" 
              />

              {/* Functional Content Overlay */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="h-1 w-8 rounded-full" style={{ background: `rgb(${item.accent})` }} />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 text-white">System.IO</span>
                      </div>
                      
                      <h3 className="text-4xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: "SF Pro Display, sans-serif" }}>
                        {c.title}
                      </h3>
                      <p className="text-lg text-white/40 font-medium" style={{ fontFamily: "SF Pro Text, sans-serif" }}>
                        {c.subtitle}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="max-w-[240px]">
                        <p className="text-[14px] leading-relaxed text-white/30 mb-6">
                          {c.body}
                        </p>
                        <motion.button 
                          whileHover={{ scale: 1.02, background: "#FFFFFF" }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 bg-white/95 text-black px-5 py-2.5 rounded-full text-[12px] font-bold tracking-tight"
                        >
                          OPEN MODULE <ChevronRight size={14} />
                        </motion.button>
                      </div>

                      <div className="text-right">
                        <span className="block text-6xl font-black text-white/10 tracking-tighter mb-[-4px]">
                          {c.value}
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.1em] text-white/20 uppercase">Core Metric</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Notch Area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#000] rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/5" />
            </div>
          </div>

          {/* Device Shadow */}
          <div className="absolute -bottom-10 left-[5%] right-[5%] h-12 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

const DashboardSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { threshold: 0.5, once: false });

  return (
    <section className="relative bg-[#050505] py-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto w-full">
        <header ref={headerRef} className="mb-20">
          <motion.div
            key={`header-${isHeaderInView}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[12px] font-bold tracking-[0.3em] uppercase text-blue-500 mb-4">
              Intelligence Platform
            </span>
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              Data, <span className="text-white/30">defined.</span>
            </h2>
            <p className="text-xl text-white/40 max-w-lg leading-relaxed font-medium">
              Architecting the future of operational visibility through high-fidelity interfaces.
            </p>
          </motion.div>
        </header>

        <DashboardPreview />
      </div>

      {/* Aesthetic Footer Grid Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default DashboardSection;