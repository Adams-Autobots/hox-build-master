import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SplatterShapesProps {
  containerRef: React.RefObject<HTMLElement>;
  color?: 'red' | 'blue' | 'orange' | 'green' | 'white';
  count?: number;
}

const colorMap: Record<string, string> = {
  red: 'hsl(357 85% 52%)',
  blue: 'hsl(196 100% 47%)',
  orange: 'hsl(36 89% 61%)',
  green: 'hsl(87 53% 51%)',
  white: 'hsl(0 0% 98%)',
};

// SVG splatter path definitions - organic paint splash shapes
const splatterPaths = [
  "M50,25 Q65,10 80,25 Q95,40 80,55 Q65,70 50,55 Q35,40 50,25 M45,35 Q50,30 55,35 Q60,45 50,50 Q40,45 45,35",
  "M30,50 Q45,20 70,35 Q95,50 75,70 Q55,90 35,75 Q15,60 30,50 M50,45 Q60,40 65,50 Q60,60 50,55 Q45,50 50,45",
  "M40,30 Q60,15 80,35 Q90,55 70,70 Q50,85 30,65 Q20,45 40,30 M55,40 Q65,35 70,45 Q65,55 55,50 Q50,45 55,40",
  "M25,45 Q40,25 65,30 Q85,40 80,60 Q70,80 45,75 Q20,70 25,45 M45,50 Q55,45 60,55 Q55,65 45,60 Q40,55 45,50",
  "M35,35 Q55,20 75,40 Q85,60 65,75 Q45,85 30,65 Q25,45 35,35 M50,50 Q60,45 62,55 Q58,65 48,58 Q45,52 50,50",
];

export function SplatterShapes({
  containerRef,
  color = 'red',
  count = 4,
}: SplatterShapesProps) {
  const ref = useRef(null);
  const fillColor = colorMap[color];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.6, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  // Generate random positions for splatters
  const splatters = Array.from({ length: count }, (_, i) => ({
    id: i,
    path: splatterPaths[i % splatterPaths.length],
    x: i % 2 === 0 ? `${5 + Math.random() * 15}%` : `${80 + Math.random() * 15}%`,
    y: `${15 + (i * 20) + Math.random() * 10}%`,
    rotation: Math.random() * 360,
    size: 60 + Math.random() * 80,
    delay: i * 0.1,
  }));

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {splatters.map((splatter) => (
        <motion.div
          key={splatter.id}
          className="absolute"
          style={{
            left: splatter.x,
            top: splatter.y,
            opacity,
            scale,
          }}
          initial={{ scale: 0, rotate: splatter.rotation - 20 }}
          animate={{ rotate: splatter.rotation }}
          transition={{
            delay: splatter.delay,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <svg
            width={splatter.size}
            height={splatter.size}
            viewBox="0 0 100 100"
            style={{
              filter: 'blur(1px)',
              transform: `rotate(${splatter.rotation}deg)`,
            }}
          >
            <path
              d={splatter.path}
              fill={fillColor}
              fillOpacity={0.4}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
