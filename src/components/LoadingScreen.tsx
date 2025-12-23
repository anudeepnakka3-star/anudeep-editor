import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [animationPhase, setAnimationPhase] = useState<'filling' | 'fadeOut' | 'complete'>('filling');

  useEffect(() => {
    // Start fade out after fill animation completes
    const fillTimer = setTimeout(() => {
      setAnimationPhase('fadeOut');
    }, 1200);

    // Complete and unmount after fade out
    const completeTimer = setTimeout(() => {
      setAnimationPhase('complete');
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (animationPhase === 'complete') return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-400 ${
        animationPhase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        {/* Outlined text (always visible as base) */}
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight select-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            WebkitTextStroke: '1px hsl(var(--primary) / 0.4)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Anudeep
        </h1>
        
        {/* Filled text with clip animation */}
        <h1 
          className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight select-none text-primary loading-text-fill"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Anudeep
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
