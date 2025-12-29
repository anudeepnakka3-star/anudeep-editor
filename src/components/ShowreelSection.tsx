import { useState } from "react";
import { Play, X } from "lucide-react";
import { StaggeredItem, StaggeredText } from "@/components/StaggeredAnimation";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const videos = [
  { id: 1, title: "Creative Edit", url: "https://youtube.com/shorts/iFs1mJFsz7s", isShort: true },
  { id: 2, title: "Color Grading", url: "https://youtu.be/FxPdIAgRMkg", isShort: false },
  { id: 3, title: "Viral Minimal Edit", url: "https://youtube.com/shorts/xwhdQQEreh0", isShort: true },
  { id: 4, title: "Short Edit", url: "https://youtu.be/j5yrcgNte5k", isShort: false },
  { id: 5, title: "Creative Animation", url: "https://youtube.com/shorts/lq_6_qjbbnU", isShort: true },
  { id: 6, title: "Sound Design", url: "https://youtu.be/i_sKUzu8Ips", isShort: false },
  { id: 7, title: "Documentary", url: "https://youtu.be/eJZ1sUOpwoA", isShort: false },
];

const getEmbedUrl = (url: string) => {
  // Handle YouTube Shorts
  if (url.includes("/shorts/")) {
    const videoId = url.split("/shorts/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  // Handle youtu.be links
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  // Handle standard youtube.com links
  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  return url;
};

const ShowreelSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const handleVideoClick = (video: typeof videos[0]) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

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

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {videos.map((item, index) => (
            <StaggeredItem key={item.id} index={index} baseDelay={200} staggerDelay={80}>
              <div 
                onClick={() => handleVideoClick(item)}
                className="relative aspect-video rounded-lg overflow-hidden card-glow group cursor-pointer"
              >
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

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background/95 backdrop-blur-sm border-border/50 overflow-hidden">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-5 w-5 text-foreground" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          {selectedVideo && (
            <div className={`w-full ${selectedVideo.isShort ? 'max-w-sm mx-auto' : ''}`}>
              <div className={`relative w-full ${selectedVideo.isShort ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <iframe
                  src={getEmbedUrl(selectedVideo.url)}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ShowreelSection;
