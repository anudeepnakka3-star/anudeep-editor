import { Button } from "@/components/ui/button";
import { Play, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import anudeepPhoto from "@/assets/anudeep-hero.jpg";

const HeroSection = () => {
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPhotoVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (photoRef.current) {
      observer.observe(photoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToWork = () => {
    document.getElementById("showreel")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
        }}
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
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="text-center lg:text-left lg:flex-1">
            <p className="text-primary font-medium tracking-widest uppercase mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Video Editor • Storyteller • Creator
            </p>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 animate-fade-up opacity-0 leading-tight" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              I turn raw clips into<br />
              <span className="text-gradient">stories people remember.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              Fast, emotional, cinematic video edits for brands and creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
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

          {/* Photo */}
          <div 
            ref={photoRef}
            className={`lg:flex-1 flex justify-center lg:justify-end transition-all duration-1000 ease-out ${
              isPhotoVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-16 scale-95'
            }`}
          >
            <div className="relative">
              {/* Glow effect behind photo */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              
              {/* Photo container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <img 
                  src={anudeepPhoto} 
                  alt="Anudeep - Video Editor"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              
              {/* Decorative web lines */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="glass-button w-8 h-12 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
