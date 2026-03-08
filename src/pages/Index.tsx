import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturedProject from "@/components/home/FeaturedProject";
import ServicesGrid from "@/components/home/ServicesGrid";
import ServicesScrollRow from "@/components/home/ServicesScrollRow";
import CaseStudies from "@/components/home/CaseStudies";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/home/Testimonials";
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
        <FeaturedProject
          eyebrow="New · AXONIS Platform"
          heading={"The AI safety OS for\ncritical infrastructure."}
          subheading="Open-core. Decentralized. Built for the real world."
          ctaPrimary={{ text: "Learn more", href: "/projects#axonis" }}
          ctaSecondary={{ text: "View on GitHub →", href: "https://github.com/gnobob/AXONIS-Platform" }}
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
        />
        <ServicesGrid />
        <ServicesScrollRow />
        <FeaturedProject
          eyebrow="EARLYNX — Patented"
          heading={"AI medical screening.\nNationally awarded."}
          subheading="Non-invasive AI diagnostic device. Patent held. National competition winner."
          ctaPrimary={{ text: "Learn more", href: "/projects#earlynx" }}
          ctaSecondary={{ text: "See all projects →", href: "/projects" }}
          badge="National Winner"
          image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80"
        />
        <CaseStudies />
        <ProcessSection />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
