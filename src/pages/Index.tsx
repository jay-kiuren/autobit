import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import WorkflowPanel from "@/components/home/WorkflowPanel";
import AIAgentsPanel from "@/components/home/AIAgentsPanel";
import ServicesScrollRow from "@/components/home/ServicesScrollRow";
import AxonisPanel from "@/components/home/AxonisPanel";
import EarlynxPanel from "@/components/home/EarlynxPanel";
import ProcessSection from "@/components/home/ProcessSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);

  const handleDropdownChange = useCallback((active: boolean) => {
    setNavDropdownActive(active);
  }, []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main
        style={{
          filter: navDropdownActive ? 'blur(8px)' : 'none',
          opacity: navDropdownActive ? 0.45 : 1,
          transition: 'filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <HeroSection />
        <StatsBar />
        <WorkflowPanel />
        <AIAgentsPanel />
        <ServicesScrollRow />
        <AxonisPanel />
        <EarlynxPanel />
        <ProcessSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
