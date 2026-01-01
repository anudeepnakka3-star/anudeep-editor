import { Film, Sparkles, Clapperboard } from "lucide-react";
import { StaggeredItem, StaggeredText } from "@/components/StaggeredAnimation";

const services = [
  {
    icon: Film,
    title: "Short-form Reels",
    description: "Scroll-stopping content optimized for Instagram, TikTok, and YouTube Shorts.",
  },
  {
    icon: Sparkles,
    title: "Storytelling Videos",
    description: "Emotional narratives that connect with your audience and drive engagement.",
  },
  {
    icon: Clapperboard,
    title: "Cinematic Edits",
    description: "High-end production value with professional color grading and sound design.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <StaggeredText delay={0}>
            <p className="text-primary font-medium tracking-widest uppercase mb-3 md:mb-4 text-sm md:text-base">Services</p>
          </StaggeredText>
          <StaggeredText delay={100}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-6xl text-foreground">What I Create</h2>
          </StaggeredText>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <StaggeredItem key={service.title} index={index} staggerDelay={150}>
              <div className="group relative p-5 md:p-8 rounded-lg card-glow bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 h-full">
                {/* Icon glow effect */}
                <div className="absolute top-5 md:top-8 left-5 md:left-8 w-12 md:w-16 h-12 md:h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500" />
                
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-lg">
                  <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="absolute top-0 right-0 w-12 h-px bg-gradient-to-l from-primary/50 to-transparent" />
                </div>
              </div>
            </StaggeredItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
