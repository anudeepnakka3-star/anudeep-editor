import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ShowreelSection from "@/components/ShowreelSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ToolsSection from "@/components/ToolsSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <AnimatedSection>
        <ShowreelSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ServicesSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ToolsSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ContactFormSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ContactSection />
      </AnimatedSection>
    </div>
  );
};

export default Index;
