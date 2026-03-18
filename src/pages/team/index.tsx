import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamGridSection from "./TeamGridSection";

const Team = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

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
        <TeamGridSection />
      </main>
      <Footer />
    </>
  );
};

export default Team;
