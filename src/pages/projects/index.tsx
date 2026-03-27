import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./sections/Panel01";
import PlatformSection from "./sections/Panel02";
import RoboticsSection from "./sections/Panel03";
import AgentSection from "./sections/Panel04";
import DashboardSection from "./sections/Panel05";
import AppSection from "./sections/Panel06";
import WhySection from "./sections/Panel07";

const Projects = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main
        style={{
          filter: navDropdownActive ? "blur(8px)" : "none",
          opacity: navDropdownActive ? 0.45 : 1,
          transition: "filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)",
          background: "#000",
        }}
      >
        <HeroSection />
        <PlatformSection />
        <RoboticsSection />
        <AgentSection />
        <DashboardSection />
        <AppSection />
        <WhySection />
      </main>
      <Footer />
    </>
  );
};

export default Projects;
