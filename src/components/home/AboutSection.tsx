import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { AnimatedStatsCounter } from './AnimatedStatsCounter';

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <span
              className={cn(
                'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="w-8 h-px bg-primary" />
              Who we are
            </span>

            <h2
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 transition-all duration-700 delay-150',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <span className="hox-brand">built to deliver.</span>
              <br />
              <span className="text-muted-foreground/60">engineered to impress.</span>
            </h2>

            <div
              className={cn(
                'space-y-6 transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                For 15+ years, HOX has partnered with leading developers, global brands, 
                and ambitious creatives to deliver complex builds with speed, precision, and reliability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In-house capabilities mean full control — from design to fabrication to installation.
              </p>
            </div>
          </div>

          {/* Animated Stats Grid */}
          <AnimatedStatsCounter />
        </div>
      </div>
    </section>
  );
}
