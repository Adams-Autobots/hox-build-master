import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltAmount?: number;
  perspective?: number;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className,
  style,
  tiltAmount = 10,
  perspective = 1000,
  glareEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltAmount, tiltAmount]);

  // Glare effect
  const glareX = useTransform(xSpring, [0, 1], ['-50%', '150%']);
  const glareY = useTransform(ySpring, [0, 1], ['-50%', '150%']);

  // Shadow effect
  const shadowX = useTransform(xSpring, [0, 1], [20, -20]);
  const shadowY = useTransform(ySpring, [0, 1], [20, -20]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {children}

        {/* Glare Effect */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
            style={{ opacity: isHovering ? 1 : 0 }}
          >
            <motion.div
              className="absolute w-full h-full"
              style={{
                x: glareX,
                y: glareY,
                background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 50%)',
                width: '100%',
                height: '100%',
              }}
            />
          </motion.div>
        )}

        {/* Dynamic Shadow */}
        <motion.div
          className="absolute -inset-4 -z-10 rounded-xl opacity-0 blur-xl"
          style={{
            background: 'hsl(var(--primary) / 0.3)',
            x: shadowX,
            y: shadowY,
          }}
          animate={{
            opacity: isHovering ? 0.5 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
