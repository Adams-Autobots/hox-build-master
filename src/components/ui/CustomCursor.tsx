import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Division color mapping (with transparency)
const DIVISION_COLORS: Record<string, string> = {
  exhibitions: 'hsla(357, 85%, 52%, 0.7)', // hox-red
  events: 'hsla(196, 100%, 47%, 0.7)',     // hox-blue
  retail: 'hsla(36, 89%, 61%, 0.7)',       // hox-orange
  interiors: 'hsla(87, 53%, 51%, 0.7)',    // hox-green
};

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState<string | null>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);
  }, [cursorX, cursorY]);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Check for touch device
    if ('ontouchstart' in window) return;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Track hoverable elements and division cards
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-magnetic]');
      setIsHovering(!!isInteractive);

      // Check for division card hover
      const divisionCard = target.closest('[data-division]') as HTMLElement | null;
      if (divisionCard) {
        const division = divisionCard.getAttribute('data-division');
        setCursorColor(division ? DIVISION_COLORS[division] || null : null);
      } else {
        setCursorColor(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [onMouseMove, onMouseLeave]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        mixBlendMode: cursorColor ? 'normal' : 'difference',
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: isHovering ? 64 : 44,
          height: isHovering ? 64 : 44,
          opacity: isVisible ? 1 : 0,
          borderColor: cursorColor || 'hsla(357, 85%, 52%, 0.9)',
        }}
        style={{
          border: '1.5px solid',
          backgroundColor: 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* Middle ring - appears on hover */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: isHovering ? 44 : 20,
          height: isHovering ? 44 : 20,
          opacity: isHovering && isVisible ? 0.7 : 0,
          borderColor: cursorColor || 'hsla(357, 85%, 52%, 0.7)',
        }}
        style={{
          border: '1px solid',
          backgroundColor: 'transparent',
        }}
        transition={{ duration: 0.25, ease: 'easeOut', delay: 0.02 }}
      />
      {/* Inner ring - appears on hover */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: isHovering ? 24 : 8,
          height: isHovering ? 24 : 8,
          opacity: isHovering && isVisible ? 0.5 : 0,
          borderColor: cursorColor || 'hsla(357, 85%, 52%, 0.5)',
        }}
        style={{
          border: '1px solid',
          backgroundColor: 'transparent',
        }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.04 }}
      />
    </motion.div>
  );
}
