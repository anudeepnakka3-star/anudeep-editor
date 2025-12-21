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
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [isMobile]);

  // Smooth inertia animation
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
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
    <>
      {/* Outer ring with soft edge / blur effect */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          opacity: 0.6,
          filter: 'blur(0.5px)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out',
        }}
      />

      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          transition: 'width 0.15s ease-out, height 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;