import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useContactModal } from '@/contexts/ContactModalContext';

/**
 * Panel02: System Showcases
 * Adjusted for transparent glassy navigation, reset to AXONIS on scroll,
 * and added themed action buttons.
 */

const Panel02 = () => {
  const { openModal } = useContactModal();
  const [activeTab, setActiveTab] = useState('axonis');
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.3 });

  // Reset to AXONIS on scroll entry for fresh animation
  useEffect(() => {
    if (!isSectionInView) {
      setActiveTab('axonis');
    }
  }, [isSectionInView]);

  const panels = {
    mindsafe: {
      title: "MINDSAFE AI",
      description: "Neural monitoring for subterranean operations. Predictive engine inheritance models that automate SOP compliance.",
      bg: "https://images.unsplash.com/photo-1620712943543-bcc4628c71d0?auto=format&fit=crop&q=80&w=2000",
      accent: "from-emerald-600/40",
    },
    axonis: {
      title: "AXONIS",
      description: "Centralized hazard taxonomy for high-stakes environments. Integrating real-time telemetry with decentralized proof protocols.",
      bg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000",
      accent: "from-blue-600/40",
    },
    gridsonar: {
      title: "GRIDSONAR",
      description: "Visualizing network resilience across scalable data operations. Real-time infrastructure mapping with sub-meter resolution.",
      bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
      accent: "from-orange-600/40",
    }
  };

  const tabOrder = ['mindsafe', 'axonis', 'gridsonar'];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center items-center py-24 px-6"
    >
      {/* Main Interactive Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={isSectionInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl aspect-[16/9] rounded-[40px] bg-black shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Visuals */}
            <div className="absolute inset-0 z-0">
              <img src={panels[activeTab].bg} className="w-full h-full object-cover opacity-50 mix-blend-screen" alt="" />
              <div className={`absolute inset-0 bg-gradient-to-t ${panels[activeTab].accent} to-transparent mix-blend-multiply`} />
            </div>

            {/* Dashboard Content */}
            <div className="relative z-10 w-full h-full flex flex-col p-10 md:p-16">
              <div className="flex justify-between items-start">
                <motion.div 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase mb-2 block">System Deployment</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none mb-6">
                    {panels[activeTab].title}
                  </h2>
                  
                  <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 max-w-md mb-8">
                    <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed">
                      {panels[activeTab].description}
                    </p>
                  </div>

                  {/* New Action Buttons */}
                  <div className="flex items-center space-x-6">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={openModal}
                      className="px-8 py-4 bg-[#2196F3] text-white rounded-full font-bold text-[15px] shadow-[0_8px_20px_rgba(33,150,243,0.3)] transition-all"
                    >
                      Start a project
                    </motion.button>
                    <motion.div whileHover={{ x: 3 }}>
                      <Link
                        to="/services"
                        className="text-[#2196F3] font-bold text-[15px] flex items-center"
                      >
                        Learn more <span className="ml-2 text-xl">→</span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Interactive Navigation: Transparent and Glassy */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
          <div className="flex items-center space-x-1 bg-white/[0.03] backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-2xl">
            {tabOrder.map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center px-8 py-3 rounded-full transition-all duration-500 font-bold text-[11px] uppercase tracking-wider ${
                  activeTab === key 
                  ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20' 
                  : 'text-white/30 hover:text-white/60'
                }`}
              >
                {key === 'axonis' ? 'AXONIS' : key === 'mindsafe' ? 'MindSafe AI' : 'GridSonar'}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
      </motion.div>

      {/* Floating System Stats */}
      <div className="mt-16 flex items-center space-x-12 opacity-40">
        <div className="text-center">
          <div className="text-xl font-bold text-white">99.9%</div>
          <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Reliability</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className="text-xl font-bold text-white">0.4ms</div>
          <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Latency</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className="text-xl font-bold text-white">2.4k</div>
          <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Nodes</div>
        </div>
      </div>
    </section>
  );
};

export default Panel02;