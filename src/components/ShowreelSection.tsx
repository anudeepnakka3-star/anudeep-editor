import { useState, useRef, useEffect } from "react";
import { Play, X, ChevronRight, ChevronLeft } from "lucide-react";
import { StaggeredText } from "@/components/StaggeredAnimation";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const videos = [
  { 
    id: 1, 
    title: "Creative Edit", 
    subtitle: "Dynamic visual storytelling with motion graphics",
    url: "https://youtube.com/shorts/iFs1mJFsz7s", 
    isShort: true 
  },
  { 
    id: 2, 
    title: "Color Grading", 
    subtitle: "Professional color correction and grading",
    url: "https://youtu.be/FxPdIAgRMkg", 
    isShort: false 
  },
  { 
    id: 3, 
    title: "Viral Minimal Edit", 
    subtitle: "Clean, trendy edits for social media",
    url: "https://youtube.com/shorts/xwhdQQEreh0", 
    isShort: true 
  },
  { 
    id: 4, 
    title: "Short Edit", 
    subtitle: "Punchy short-form video content",
    url: "https://youtu.be/j5yrcgNte5k", 
    isShort: false 
  },
  { 
    id: 5, 
    title: "Creative Animation", 
    subtitle: "Eye-catching animated sequences",
    url: "https://youtube.com/shorts/lq_6_qjbbnU", 
    isShort: true 
  },
  { 
    id: 6, 
    title: "Sound Design", 
    subtitle: "Immersive audio and visual sync",
    url: "https://youtu.be/i_sKUzu8Ips", 
    isShort: false 
  },
  { 
    id: 7, 
    title: "Documentary", 
    subtitle: "Cinematic documentary style editing",
    url: "https://youtu.be/eJZ1sUOpwoA", 
    isShort: false 
  },
];

const getVideoId = (url: string) => {
  if (url.includes("/shorts/")) {
    return url.split("/shorts/")[1].split("?")[0];
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1].split("?")[0];
  }
  if (url.includes("youtube.com/watch")) {
    return new URL(url).searchParams.get("v");
  }
  return null;
};

const getThumbnailUrl = (url: string) => {
  const videoId = getVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

const getEmbedUrl = (url: string) => {
  const videoId = getVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
};

const ShowreelSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = (video: typeof videos[0]) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const updateScrollProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollProgress);
      updateScrollProgress();
      return () => scrollContainer.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo) return; // Don't scroll when modal is open
      
      if (e.key === 'ArrowLeft') {
        scroll('left');
      } else if (e.key === 'ArrowRight') {
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  return (
    <section id="showreel" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <StaggeredText delay={0}>
            <p className="text-primary font-medium tracking-widest uppercase mb-3 md:mb-4 text-sm md:text-base">Portfolio</p>
          </StaggeredText>
          <StaggeredText delay={100}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-6xl text-foreground">Featured Work</h2>
          </StaggeredText>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow - Desktop Only */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 glass-icon w-10 h-10 text-foreground"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {videos.map((item) => (
              <div
                key={item.id}
                onClick={() => handleVideoClick(item)}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start cursor-pointer group"
              >
                <div className="relative rounded-xl overflow-hidden bg-card border border-border/30 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={getThumbnailUrl(item.url) || ''}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4 bg-gradient-to-b from-card to-background/80">
                    <h3 className="font-display text-lg md:text-xl text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Desktop Only */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 glass-icon w-10 h-10 text-foreground"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-150 ease-out"
                style={{ width: `${Math.max(10, scrollProgress)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background/95 backdrop-blur-sm border-border/50 overflow-hidden">
          <DialogClose className="absolute right-3 top-3 md:right-4 md:top-4 z-50 rounded-full bg-background/80 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
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
