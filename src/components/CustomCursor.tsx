import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef<number>();

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

    // Hide default cursor globally
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
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
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      const styleEl = document.getElementById('custom-cursor-style');
      if (styleEl) styleEl.remove();
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [isMobile]);

  // Smooth motion interpolation for premium feel
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [position, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: smoothPosition.x,
        top: smoothPosition.y,
        transform: 'translate(-4px, -4px)',
      }}
    >
      {/* Default Pointer Cursor */}
      <svg
        width="40"
        height="48"
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute transition-all duration-200 ease-out"
        style={{
          opacity: isHovering ? 0 : 1,
          transform: isHovering ? 'scale(0.8) rotate(-10deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        <defs>
          <linearGradient id="pointerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="30%" stopColor="#E85D75" />
            <stop offset="60%" stopColor="#9B4DCA" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          <linearGradient id="pointerGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="50%" stopColor="#C84B8B" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="pointerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#8B2252" floodOpacity="0.4"/>
          </filter>
        </defs>
        {/* Main pointer shape */}
        <path
          d="M6 4L6 38L14 30L20 44L26 42L20 28L32 28L6 4Z"
          fill="url(#pointerGradient1)"
          filter="url(#pointerShadow)"
        />
        {/* Overlay for fluid effect */}
        <path
          d="M8 8L8 32L14 26L18 36L22 34L18 24L28 24L8 8Z"
          fill="url(#pointerGradient2)"
          opacity="0.6"
        />
        {/* Highlight */}
        <path
          d="M10 10L10 22L16 16L10 10Z"
          fill="#FFD89B"
          opacity="0.4"
        />
        {/* Edge definition */}
        <path
          d="M6 4L6 38L14 30L20 44L26 42L20 28L32 28L6 4Z"
          stroke="#7B2D5B"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Hand/Pointer Cursor for Hover */}
      <svg
        width="44"
        height="52"
        viewBox="0 0 44 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute transition-all duration-200 ease-out"
        style={{
          opacity: isHovering ? 1 : 0,
          transform: isHovering ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(10deg)',
        }}
      >
        <defs>
          <linearGradient id="handGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="35%" stopColor="#E85D75" />
            <stop offset="65%" stopColor="#9B4DCA" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          <linearGradient id="handGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="50%" stopColor="#C84B8B" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#8B2252" floodOpacity="0.4"/>
          </filter>
        </defs>
        {/* Index finger */}
        <path
          d="M18 2C18 2 22 2 22 6L22 20L18 20L18 6C18 2 18 2 18 2Z"
          fill="url(#handGradient1)"
          filter="url(#handShadow)"
        />
        <ellipse cx="20" cy="4" rx="3" ry="3" fill="url(#handGradient1)" filter="url(#handShadow)" />
        
        {/* Palm and thumb area */}
        <path
          d="M8 24C8 20 12 18 16 18L26 18C30 18 34 20 34 24L34 40C34 46 30 50 24 50L16 50C10 50 8 46 8 40L8 24Z"
          fill="url(#handGradient1)"
          filter="url(#handShadow)"
        />
        
        {/* Thumb */}
        <path
          d="M8 28C4 28 2 32 4 36C6 40 8 38 8 34L8 28Z"
          fill="url(#handGradient2)"
        />
        
        {/* Curled fingers */}
        <ellipse cx="14" cy="44" rx="3" ry="4" fill="url(#handGradient2)" opacity="0.8" />
        <ellipse cx="21" cy="45" rx="3" ry="4" fill="url(#handGradient2)" opacity="0.8" />
        <ellipse cx="28" cy="44" rx="3" ry="4" fill="url(#handGradient2)" opacity="0.8" />
        
        {/* Fluid overlay effect */}
        <path
          d="M12 22C12 20 14 20 18 20L24 20C28 20 30 22 30 26L30 36C30 40 28 42 24 42L16 42C12 42 12 40 12 36L12 22Z"
          fill="url(#handGradient2)"
          opacity="0.5"
        />
        
        {/* Highlight on finger */}
        <ellipse cx="20" cy="10" rx="2" ry="5" fill="#FFD89B" opacity="0.35" />
        
        {/* Palm highlight */}
        <ellipse cx="20" cy="30" rx="6" ry="8" fill="#FFB347" opacity="0.25" />
        
        {/* Edge definition */}
        <path
          d="M18 2C18 2 22 2 22 6L22 18M8 24C8 20 12 18 16 18L26 18C30 18 34 20 34 24L34 40C34 46 30 50 24 50L16 50C10 50 8 46 8 40L8 24Z"
          stroke="#7B2D5B"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
