import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Division color mapping (with transparency)
const DIVISION_COLORS: Record<string, string> = {
  exhibitions: 'hsla(357, 85%, 52%, 0.7)', // hox-red
  events: 'hsla(196, 100%, 47%, 0.7)',     // hox-blue
  retail: 'hsla(36, 89%, 61%, 0.7)',       // hox-orange
  interiors: 'hsla(87, 53%, 51%, 0.7)',    // hox-green
};

// Spring configurations for each ring - slower = more lag/trail
const RING_CONFIGS = [
  { damping: 25, stiffness: 400 },  // Main ring (fastest)
  { damping: 30, stiffness: 200 },  // Trail ring 1
  { damping: 35, stiffness: 120 },  // Trail ring 2  
  { damping: 40, stiffness: 80 },   // Trail ring 3 (slowest)
];

// Ring visual properties
const RING_STYLES = [
  { opacity: 0.9, borderWidth: 1.5, scale: 1 },
  { opacity: 0.5, borderWidth: 1, scale: 0.85 },
  { opacity: 0.35, borderWidth: 1, scale: 0.7 },
  { opacity: 0.2, borderWidth: 1, scale: 0.55 },
];

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState<string | null>(null);
  
  // Base cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Create springs for each ring with different configs
  const ring0X = useSpring(cursorX, RING_CONFIGS[0]);
  const ring0Y = useSpring(cursorY, RING_CONFIGS[0]);
  const ring1X = useSpring(cursorX, RING_CONFIGS[1]);
  const ring1Y = useSpring(cursorY, RING_CONFIGS[1]);
  const ring2X = useSpring(cursorX, RING_CONFIGS[2]);
  const ring2Y = useSpring(cursorY, RING_CONFIGS[2]);
  const ring3X = useSpring(cursorX, RING_CONFIGS[3]);
  const ring3Y = useSpring(cursorY, RING_CONFIGS[3]);

  const ringPositions = [
    { x: ring0X, y: ring0Y },
    { x: ring1X, y: ring1Y },
    { x: ring2X, y: ring2Y },
    { x: ring3X, y: ring3Y },
  ];

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

  const baseColor = cursorColor || 'hsla(357, 85%, 52%, 1)';

  return (
    <>
      {ringPositions.map((pos, index) => {
        const style = RING_STYLES[index];
        const colorWithOpacity = baseColor.replace(/[\d.]+\)$/, `${style.opacity})`);
        
        return (
          <motion.div
            key={index}
            className="pointer-events-none fixed top-0 left-0 z-[9999]"
            style={{
              x: pos.x,
              y: pos.y,
              mixBlendMode: cursorColor ? 'normal' : 'difference',
            }}
          >
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{
                width: (isHovering ? 28 : 22) * style.scale,
                height: (isHovering ? 28 : 22) * style.scale,
                opacity: isVisible ? style.opacity : 0,
              }}
              style={{
                border: `${style.borderWidth}px solid ${colorWithOpacity}`,
                backgroundColor: 'transparent',
                boxShadow: index === 0 ? `0 0 20px 4px ${colorWithOpacity}` : 'none',
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </motion.div>
        );
      })}
    </>
  );
}
