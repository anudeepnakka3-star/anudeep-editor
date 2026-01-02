import { useState, useEffect } from "react";
import { X, Monitor } from "lucide-react";

const MobileExperienceNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('mobileNoticeDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Check if mobile (screen width < 768px)
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsVisible(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('mobileNoticeDismissed', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none"
      onClick={handleDismiss}
    >
      <div 
        className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-4 pr-10 shadow-xl shadow-background/50 animate-fade-up max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Monitor className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-foreground leading-relaxed">
              For a better experience, view this website on a desktop or laptop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileExperienceNotice;
