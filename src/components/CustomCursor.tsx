import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Check if mobile/touch device
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
      
      // Add to trail
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 8) {
        trailRef.current.shift();
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Trail effect */}
      {trailRef.current.map((point, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: 4 + index * 0.5,
            height: 4 + index * 0.5,
            opacity: (index + 1) / trailRef.current.length * 0.3,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer glow on hover */}
        {isHovering && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              width: 48,
              height: 48,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        )}

        {/* Spider web cursor */}
        <svg
          width={isHovering ? 32 : 24}
          height={isHovering ? 32 : 24}
          viewBox="0 0 24 24"
          fill="none"
          className="transition-all duration-200"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 8px hsl(var(--primary))) drop-shadow(0 0 16px hsl(var(--primary) / 0.5))' 
              : 'drop-shadow(0 0 2px rgba(255,255,255,0.5))',
          }}
        >
          {isHovering ? (
            // Spider emblem / web knot on hover
            <g>
              <circle cx="12" cy="12" r="10" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="12" cy="12" r="6" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.7" />
              <circle cx="12" cy="12" r="2" fill="hsl(var(--primary))" />
              {/* Web lines */}
              <line x1="12" y1="2" x2="12" y2="22" stroke="white" strokeWidth="1" opacity="0.8" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1" opacity="0.8" />
              <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="1" opacity="0.6" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="1" opacity="0.6" />
            </g>
          ) : (
            // Default web pointer
            <g>
              {/* Center dot */}
              <circle cx="12" cy="12" r="2" fill="white" />
              {/* Web strands */}
              <line x1="12" y1="12" x2="12" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="12" x2="20" y2="6" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              <line x1="12" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
              <line x1="12" y1="12" x2="18" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
              <line x1="12" y1="12" x2="6" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
              <line x1="12" y1="12" x2="2" y2="12" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
              <line x1="12" y1="12" x2="4" y2="6" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              {/* Curved web connections */}
              <path d="M 8 5 Q 12 7 16 5" stroke="white" strokeWidth="0.75" fill="none" opacity="0.5" />
              <path d="M 5 9 Q 8 12 5 15" stroke="white" strokeWidth="0.75" fill="none" opacity="0.4" />
              <path d="M 19 9 Q 16 12 19 15" stroke="white" strokeWidth="0.75" fill="none" opacity="0.4" />
            </g>
          )}
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;