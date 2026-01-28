import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { HoverText } from '@/components/ui/HoverText';

const features = [
  'In-house production',
  'Value Engineering',
  'Since 2008',
  '4 specialised divisions',
];

export function WhyHoxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  // Background opacity: stays fully transparent until 70%, then solidifies
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [0, 0, 0.5, 1]);
  const backgroundOpacity = useSpring(rawOpacity, {
    stiffness: 100,
    damping: 30
  });

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 relative overflow-hidden">
      {/* Scroll-responsive background that solidifies */}
      <motion.div 
        className="absolute inset-0 bg-card" 
        style={{ opacity: backgroundOpacity }} 
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-[1]">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <div>
            <span className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              <span className="w-8 h-px bg-primary" />
              Why hox
            </span>
            <h2 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <span className="hox-brand"><HoverText>Experience, expertise</HoverText> </span>
              <span className="text-primary"><HoverText>and</HoverText></span>
              <br />
              <span className="text-muted-foreground/60"><HoverText>Trust.</HoverText></span>
            </h2>

            <div className={cn(
              'space-y-6 transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When you control every stage of production, you control quality, 
                timing, and outcomes. That's the HOX difference.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature}
                className={cn(
                  'group p-6 lg:p-8 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 cursor-default flex items-center justify-center',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <p className="text-sm md:text-base lg:text-lg font-medium uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
