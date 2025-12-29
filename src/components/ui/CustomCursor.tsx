import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Division color mapping
const DIVISION_COLORS: Record<string, string> = {
  exhibitions: 'hsl(357, 85%, 52%)', // hox-red
  events: 'hsl(196, 100%, 47%)',     // hox-blue
  retail: 'hsl(36, 89%, 61%)',       // hox-orange
  interiors: 'hsl(87, 53%, 51%)',    // hox-green
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
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          opacity: isVisible ? 1 : 0,
          backgroundColor: cursorColor || 'rgba(255, 255, 255, 0.8)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
