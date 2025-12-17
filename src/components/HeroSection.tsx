import { Button } from "@/components/ui/button";
import { Play, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToWork = () => {
    document.getElementById("showreel")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Web-line decorations */}
      <div className="absolute top-0 left-1/4 web-line h-40 animate-web-draw" />
      <div className="absolute top-0 right-1/3 web-line h-60 animate-web-draw delay-200" />
      <div className="absolute bottom-0 right-1/4 web-line h-32 animate-web-draw delay-300" />

      {/* Horizontal glow lines */}
      <div className="glow-line top-1/4 left-0 w-1/3" />
      <div className="glow-line bottom-1/3 right-0 w-1/4" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-primary font-medium tracking-widest uppercase mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          Video Editor • Storyteller • Creator
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 animate-fade-up opacity-0 leading-tight" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          I turn raw clips into<br />
          <span className="text-gradient">stories people remember.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          Fast, emotional, cinematic video edits for brands and creators.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <Button variant="hero" size="xl" onClick={scrollToWork} className="group">
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            View My Work
          </Button>
          <Button variant="heroOutline" size="xl" onClick={scrollToContact}>
            <Mail className="w-5 h-5" />
            Hire Me
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
