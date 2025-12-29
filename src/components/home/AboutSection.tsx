import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { AnimatedStatsCounter } from './AnimatedStatsCounter';
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    ref,
    isVisible
  } = useScrollReveal<HTMLDivElement>();

  // Track scroll progress relative to this section
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  // Background opacity: stays transparent most of scroll, solidifies only at end
  const rawOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [0, 0.15, 1]);
  const backgroundOpacity = useSpring(rawOpacity, {
    stiffness: 100,
    damping: 30
  });
  return <section ref={sectionRef} className="py-16 lg:py-20 relative overflow-hidden">
      {/* Scroll-responsive background that solidifies */}
      <motion.div className="absolute inset-0 bg-card" style={{
      opacity: backgroundOpacity
    }} />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-[1]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent" />
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <span className={cn('inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <span className="w-8 h-px bg-primary" />
              Who we are
            </span>

            <h2 className={cn('text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 transition-all duration-700 delay-150', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <span className="hox-brand">Built to </span>
              <span className="text-primary">Deliver.</span>
              <br />
              <span className="text-muted-foreground/60">engineered to impress.</span>
            </h2>

            <div className={cn('space-y-6 transition-all duration-700 delay-300', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <p className="text-lg text-muted-foreground leading-relaxed">For 17+ years, HOX has partnered with leading developers, global brands, and ambitious creatives to deliver complex builds with speed, precision, and reliability.</p>
              
            </div>
          </div>

          {/* Animated Stats Grid */}
          <AnimatedStatsCounter />
        </div>
      </div>
    </section>;
}