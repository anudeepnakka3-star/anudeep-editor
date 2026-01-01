import { StaggeredText } from "@/components/StaggeredAnimation";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative web lines */}
      <div className="absolute top-1/4 right-0 web-line h-48 hidden md:block" />
      <div className="absolute bottom-1/4 left-0 web-line h-32 hidden md:block" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <StaggeredText delay={0}>
            <p className="text-primary font-medium tracking-widest uppercase mb-3 md:mb-4 text-sm md:text-base">About</p>
          </StaggeredText>
          
          <StaggeredText delay={100}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-6xl text-foreground mb-8 md:mb-12">
              The Editor Behind the Cuts
            </h2>
          </StaggeredText>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            <StaggeredText delay={200}>
              <p>
                I'm <span className="text-foreground font-medium">Anudeep</span>, a video editor based in 
                <span className="text-primary"> Hyderabad, India</span>, currently pursuing a B.Tech in 
                Computer Science at B V Raju Institute of Technology (BVRIT).
              </p>
            </StaggeredText>
            
            <StaggeredText delay={300}>
              <p>
                I specialize in <span className="text-primary">story-driven</span> and 
                <span className="text-primary"> cinematic content</span>, with an editing approach focused on 
                clarity, emotion, and strong viewer retention. Using modern editing techniques and AI-assisted 
                tools, I create high-quality visuals efficiently.
              </p>
            </StaggeredText>
            
            <StaggeredText delay={400}>
              <p>
                Whether it's short-form content or creative projects, my goal is to deliver edits that feel 
                <span className="text-foreground font-medium"> polished</span>, 
                <span className="text-foreground font-medium"> meaningful</span>, and 
                <span className="text-foreground font-medium"> engaging</span>.
              </p>
            </StaggeredText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
