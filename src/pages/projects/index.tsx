import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { iotProjects, platformProjects } from "./data";
import { ScrollRow } from "./components/ScrollRow";
import { IotCard } from "./components/IotCard";
import { PlatformCard } from "./components/PlatformCard";
import HeaderSection from "./HeaderSection";
import StatsSection from "./StatsSection";
import WhySection from "./WhySection";

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
        <HeaderSection />

        <ScrollRow label="IoT & Hardware" count={iotProjects.length}>
          {iotProjects.map((p) => <IotCard key={p.id} p={p} />)}
        </ScrollRow>

        <ScrollRow label="Platforms & Software" count={platformProjects.length}>
          {platformProjects.map((p) => <PlatformCard key={p.id} p={p} />)}
        </ScrollRow>

        <StatsSection />
        <WhySection />
      </main>
      <Footer />
    </>
  );
};

export default Projects;
