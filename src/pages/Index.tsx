import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ShowreelSection from "@/components/ShowreelSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ToolsSection from "@/components/ToolsSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <ShowreelSection />
      <ServicesSection />
      <AboutSection />
      <ToolsSection />
      <ContactFormSection />
      <ContactSection />
    </div>
  );
};

export default Index;
