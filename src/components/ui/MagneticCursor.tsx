import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);
    window.addEventListener('mousemove', moveCursor);

    // Track hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for magnetic elements
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        setCursorText('');
      } else if (target.closest('[data-cursor="view"]')) {
        setIsHovering(true);
        setCursorText('view');
      } else if (target.closest('[data-cursor="drag"]')) {
        setIsHovering(true);
        setCursorText('drag');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [moveCursor]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? (cursorText ? 80 : 50) : 12,
            height: isHovering ? (cursorText ? 80 : 50) : 12,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="absolute inset-0 rounded-full bg-foreground" />
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative text-xs font-medium text-background uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full border border-foreground/20 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0 : 0.5,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        @media (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
