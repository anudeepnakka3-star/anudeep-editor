const tools = [
  { name: "Premiere Pro", abbr: "Pr" },
  { name: "After Effects", abbr: "Ae" },
  { name: "CapCut", abbr: "Cc" },
  { name: "AI Video Tools", abbr: "AI" },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase mb-4">Arsenal</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">Tools I Use</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="group relative opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg bg-card border border-border/50 flex flex-col items-center justify-center gap-2 group-hover:border-primary/50 group-hover:bg-card/80 transition-all duration-300 card-glow">
                <span className="font-display text-3xl md:text-4xl text-primary group-hover:scale-110 transition-transform duration-300">
                  {tool.abbr}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {tool.name}
                </span>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
