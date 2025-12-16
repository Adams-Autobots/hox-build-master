import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SprayReveal } from './SprayReveal';
import { SplatterShapes } from './SplatterShapes';

interface CinematicRevealProps {
  children: ReactNode;
  className?: string;
  parallaxIntensity?: number;
  glowColor?: 'red' | 'blue' | 'orange' | 'green' | 'white';
  maskDirection?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  enableSpray?: boolean;
  sprayDirection?: 'left' | 'right' | 'both' | 'center';
  sprayIntensity?: 'subtle' | 'medium' | 'intense';
}

const glowColors = {
  red: 'var(--glow-red)',
  blue: 'var(--glow-blue)',
  orange: 'var(--glow-orange)',
  green: 'var(--glow-green)',
  white: 'var(--glow-white)',
};

const glowBgColors = {
  red: 'hsl(357 85% 52% / 0.15)',
  blue: 'hsl(196 100% 47% / 0.15)',
  orange: 'hsl(36 89% 61% / 0.15)',
  green: 'hsl(87 53% 51% / 0.15)',
  white: 'hsl(0 0% 100% / 0.08)',
};

export function CinematicReveal({
  children,
  className = '',
  parallaxIntensity = 50,
  glowColor = 'red',
  maskDirection = 'up',
  delay = 0,
  enableSpray = false,
  sprayDirection = 'left',
  sprayIntensity = 'medium',
}: CinematicRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transformations for layers
  const y1 = useTransform(smoothProgress, [0, 1], [parallaxIntensity, -parallaxIntensity]);
  const y2 = useTransform(smoothProgress, [0, 1], [parallaxIntensity * 0.5, -parallaxIntensity * 0.5]);
  const y3 = useTransform(smoothProgress, [0, 1], [parallaxIntensity * 0.25, -parallaxIntensity * 0.25]);

  // Opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  
  // Scale effect
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  // Glow intensity
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.3, 1, 0.3, 0]);

  // Mask reveal animation based on direction
  const getMaskTransform = () => {
    switch (maskDirection) {
      case 'up':
        return { clipPath: useTransform(scrollYProgress, [0, 0.4], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']) };
      case 'down':
        return { clipPath: useTransform(scrollYProgress, [0, 0.4], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']) };
      case 'left':
        return { clipPath: useTransform(scrollYProgress, [0, 0.4], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']) };
      case 'right':
        return { clipPath: useTransform(scrollYProgress, [0, 0.4], ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']) };
      default:
        return { clipPath: useTransform(scrollYProgress, [0, 0.4], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']) };
    }
  };

  const maskStyle = getMaskTransform();

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Paint Spray Effect Layer */}
      {enableSpray && (
        <>
          <SprayReveal
            containerRef={containerRef}
            color={glowColor}
            direction={sprayDirection}
            intensity={sprayIntensity}
          />
          <SplatterShapes
            containerRef={containerRef}
            color={glowColor}
            count={3}
          />
        </>
      )}

      {/* Background Glow Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${glowBgColors[glowColor]}, transparent)`,
        }}
      />

      {/* Ambient Glow Orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          y: y1,
          opacity: glowOpacity,
          background: glowBgColors[glowColor],
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          y: y2,
          opacity: glowOpacity,
          background: glowBgColors[glowColor],
        }}
      />

      {/* Parallax Layer 1 - Slow moving background accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: y1 }}
      >
        <div 
          className="absolute top-1/4 left-1/4 w-px h-32 opacity-20"
          style={{ background: `linear-gradient(to bottom, transparent, hsl(var(--${glowColor === 'white' ? 'foreground' : `hox-${glowColor}`})), transparent)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-32 h-px opacity-20"
          style={{ background: `linear-gradient(to right, transparent, hsl(var(--${glowColor === 'white' ? 'foreground' : `hox-${glowColor}`})), transparent)` }}
        />
      </motion.div>

      {/* Parallax Layer 2 - Medium speed decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: y2 }}
      >
        <div className="absolute top-1/3 right-1/6 w-2 h-2 rounded-full opacity-30"
          style={{ background: `hsl(var(--${glowColor === 'white' ? 'foreground' : `hox-${glowColor}`}))`, boxShadow: glowColors[glowColor] }}
        />
        <div className="absolute bottom-1/3 left-1/6 w-1 h-1 rounded-full opacity-40"
          style={{ background: `hsl(var(--${glowColor === 'white' ? 'foreground' : `hox-${glowColor}`}))`, boxShadow: glowColors[glowColor] }}
        />
      </motion.div>

      {/* Main Content with Mask Reveal */}
      <motion.div
        className="relative z-10"
        style={{
          opacity,
          scale,
          ...maskStyle,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.6 }}
      >
        {/* Content Parallax Layer */}
        <motion.div style={{ y: y3 }}>
          {children}
        </motion.div>
      </motion.div>

    </div>
  );
}
