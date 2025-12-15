import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxIntensity?: number;
  maskReveal?: boolean;
  glowColor?: 'red' | 'blue' | 'orange' | 'green' | 'white';
}

const glowBgColors = {
  red: 'hsl(355 100% 50% / 0.3)',
  blue: 'hsl(196 100% 47% / 0.3)',
  orange: 'hsl(36 89% 61% / 0.3)',
  green: 'hsl(87 53% 51% / 0.3)',
  white: 'hsl(0 0% 100% / 0.15)',
};

export function ParallaxImage({
  src,
  alt,
  className = '',
  parallaxIntensity = 30,
  maskReveal = true,
  glowColor = 'red',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Image parallax - moves slower than scroll
  const y = useTransform(smoothProgress, [0, 1], [-parallaxIntensity, parallaxIntensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  // Mask reveal from bottom
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    maskReveal ? ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'] : ['inset(0% 0 0 0)', 'inset(0% 0 0 0)']
  );

  // Glow opacity
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0.8, 0.4, 0]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Glow backdrop */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(circle at center, ${glowBgColors[glowColor]}, transparent 70%)`,
        }}
      />

      {/* Image with parallax and mask */}
      <motion.div
        className="relative z-10 overflow-hidden"
        style={{ clipPath }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ y, scale }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Edge glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 rounded-lg"
        style={{
          opacity: glowOpacity,
          boxShadow: `inset 0 0 60px ${glowBgColors[glowColor]}`,
        }}
      />
    </div>
  );
}
