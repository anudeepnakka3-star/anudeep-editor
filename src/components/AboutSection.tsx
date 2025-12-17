const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative web lines */}
      <div className="absolute top-1/4 right-0 web-line h-48" />
      <div className="absolute bottom-1/4 left-0 web-line h-32" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-medium tracking-widest uppercase mb-4">About</p>
          
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-8">
            The Editor Behind the Cuts
          </h2>
          
          <div className="relative">
            {/* Quote marks */}
            <span className="absolute -top-8 -left-4 text-8xl text-primary/20 font-serif">"</span>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed relative z-10">
              I'm <span className="text-foreground font-medium">Anudeep</span>, a video editor who blends 
              <span className="text-primary"> speed</span>, 
              <span className="text-primary"> emotion</span>, and 
              <span className="text-primary"> storytelling</span> to create videos people finish watching.
            </p>
            
            <span className="absolute -bottom-12 -right-4 text-8xl text-primary/20 font-serif">"</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-border/50">
            <div className="text-center">
              <p className="font-display text-4xl md:text-5xl text-primary mb-2">50+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Projects</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl md:text-5xl text-primary mb-2">10M+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Views</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl md:text-5xl text-primary mb-2">3+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
