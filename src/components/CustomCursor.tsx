import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const trailPositions = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      trailPositions.current.push({ x: e.clientX, y: e.clientY });
      if (trailPositions.current.length > 5) {
        trailPositions.current.shift();
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Subtle trail effect */}
      {trailPositions.current.map((point, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: 6,
            height: 6,
            opacity: ((index + 1) / trailPositions.current.length) * 0.15,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'hsl(var(--primary) / 0.4)',
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-all duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? 16 : 8,
          height: isHovering ? 16 : 8,
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovering ? 'hsl(var(--primary))' : 'white',
          boxShadow: isHovering 
            ? '0 0 12px hsl(var(--primary) / 0.6), 0 0 24px hsl(var(--primary) / 0.3)' 
            : '0 0 4px rgba(255, 255, 255, 0.3)',
          opacity: isHovering ? 0.9 : 0.85,
        }}
      />
    </>
  );
};

export default CustomCursor;