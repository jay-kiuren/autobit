import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import ContactModal from "@/components/ContactModal";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import Index from "./pages/Index";
import Projects from "./pages/projects";
import Services from "./pages/services";
import Team from "./pages/team";
import Contact from "./pages/contact";
import Pricing from "./pages/pricing";
import News from "./pages/news";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContactModalProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ContactModal />
        <FloatingChatWidget />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/news" element={<News />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ContactModalProvider>
  </QueryClientProvider>
);

export default App;
