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

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <StatsBar />
      <FeaturedProject
        eyebrow="New · AXONIS Platform"
        heading={"The AI safety OS for\ncritical infrastructure."}
        subheading="Open-core. Decentralized. Built for the real world."
        ctaPrimary={{ text: "Learn more", href: "/projects#axonis" }}
        ctaSecondary={{ text: "View on GitHub →", href: "https://github.com/gnobob/AXONIS-Platform" }}
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
      />
      <CaseStudies />
      <ProcessSection />
      <Testimonials />
      <FinalCTA />
    </main>
    <Footer />
  </>
);

export default Index;
