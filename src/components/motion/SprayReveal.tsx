import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface SprayRevealProps {
  containerRef: React.RefObject<HTMLElement>;
  color?: 'red' | 'blue' | 'orange' | 'green' | 'white';
  direction?: 'left' | 'right' | 'both' | 'center';
  intensity?: 'subtle' | 'medium' | 'intense';
}

const colorMap: Record<string, string> = {
  red: '237, 30, 37',      // #ED1E25
  blue: '0, 174, 239',     // #00AEEF
  orange: '244, 165, 69',  // #F4A545
  green: '141, 198, 63',   // #8DC63F
  white: '250, 250, 250',
};

const intensityConfig = {
  subtle: { particleCount: 30, burstCount: 2, maxAlpha: 0.4 },
  medium: { particleCount: 50, burstCount: 3, maxAlpha: 0.6 },
  intense: { particleCount: 80, burstCount: 4, maxAlpha: 0.8 },
};

export function SprayReveal({
  containerRef,
  color = 'red',
  direction = 'left',
  intensity = 'medium',
}: SprayRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const hasTriggeredRef = useRef(false);
  const config = intensityConfig[intensity];
  const rgbColor = colorMap[color];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sprayProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const createParticle = useCallback((x: number, y: number, angleOffset: number = 0): Particle => {
    const angle = (direction === 'left' ? 0 : direction === 'right' ? Math.PI : Math.random() * Math.PI * 2) + angleOffset;
    const speed = 2 + Math.random() * 6;
    const spread = (Math.random() - 0.5) * 1.2;
    
    return {
      x,
      y,
      vx: Math.cos(angle + spread) * speed,
      vy: Math.sin(angle + spread) * speed - Math.random() * 2,
      size: 3 + Math.random() * 12,
      alpha: config.maxAlpha * (0.5 + Math.random() * 0.5),
      life: 1,
      maxLife: 0.8 + Math.random() * 0.7,
      color: rgbColor,
    };
  }, [direction, config.maxAlpha, rgbColor]);

  const emitBurst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    for (let burst = 0; burst < config.burstCount; burst++) {
      const startX = direction === 'left' ? 0 : direction === 'right' ? width : width / 2;
      const startY = height * (0.2 + Math.random() * 0.6);

      for (let i = 0; i < config.particleCount; i++) {
        const offsetY = (Math.random() - 0.5) * height * 0.4;
        const angleOffset = (Math.random() - 0.5) * 0.8;
        particlesRef.current.push(createParticle(startX, startY + offsetY, angleOffset));
      }
    }
  }, [config, direction, createParticle]);

  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // gravity
      p.vx *= 0.98; // air resistance
      p.life -= 0.012;
      p.alpha = Math.max(0, p.alpha * (p.life / p.maxLife));
      return p.life > 0;
    });
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
      
      // Add slight blur effect for larger particles
      if (p.size > 8) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.2})`;
        ctx.fill();
      }
    });

    updateParticles();

    if (particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(render);
    }
  }, [updateParticles]);

  useMotionValueEvent(sprayProgress, 'change', (latest) => {
    if (latest > 0.1 && latest < 0.5 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      emitBurst();
      render();
    }
    
    // Reset trigger when scrolling back up
    if (latest < 0.05) {
      hasTriggeredRef.current = false;
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
