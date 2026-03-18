import { useState, useCallback, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesStyles } from "./styles";
import { services } from "./data";
import HeroSection from "./HeroSection";
import ServiceSections from "./ServiceSections";
import CTASection from "./CTASection";

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [animKeys, setAnimKeys] = useState(() => services.map(() => 0));
  const handleDropdownChange = useCallback((a: boolean) => setNavDropdownActive(a), []);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(i);
          setAnimKeys(prev => prev.map((k, ki) => ki === i ? k + 1 : k));
        }
      }, { threshold: 0.25 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <style>{servicesStyles}</style>

      <main style={{ filter: navDropdownActive ? "blur(8px)" : "none", opacity: navDropdownActive ? 0.45 : 1, transition: "filter 0.28s ease,opacity 0.28s ease" }}>
        <HeroSection />
        <ServiceSections activeIndex={activeIndex} animKeys={animKeys} sectionRefs={sectionRefs} />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Services;
