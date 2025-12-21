import { Play } from "lucide-react";
import { StaggeredItem, StaggeredText } from "@/components/StaggeredAnimation";

const thumbnails = [
  { id: 1, title: "Brand Story" },
  { id: 2, title: "Product Launch" },
  { id: 3, title: "Cinematic Reel" },
  { id: 4, title: "Social Edit" },
  { id: 5, title: "Event Highlight" },
  { id: 6, title: "Documentary" },
];

const ShowreelSection = () => {
  return (
    <section id="showreel" className="py-24 bg-background relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <StaggeredText delay={0}>
            <p className="text-primary font-medium tracking-widest uppercase mb-4">Portfolio</p>
          </StaggeredText>
          <StaggeredText delay={100}>
            <h2 className="font-display text-4xl md:text-6xl text-foreground">Featured Work</h2>
          </StaggeredText>
        </div>

        {/* Main Showreel */}
        <StaggeredItem index={0} baseDelay={200} staggerDelay={0}>
          <div className="relative aspect-video max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden card-glow group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-glow-pulse">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <p className="font-display text-2xl text-foreground">2024 Showreel</p>
              <p className="text-muted-foreground text-sm">A collection of my best work</p>
            </div>
          </div>
        </StaggeredItem>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {thumbnails.map((item, index) => (
            <StaggeredItem key={item.id} index={index} baseDelay={300} staggerDelay={80}>
              <div className="relative aspect-video rounded-lg overflow-hidden card-glow group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-muted" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-lg transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                </div>
              </div>
            </StaggeredItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
