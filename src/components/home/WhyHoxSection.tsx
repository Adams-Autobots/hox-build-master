import { Zap, Clock, Layers, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Zap,
    title: 'precision fabrication',
    description: 'CNC, carpentry, metal, acrylic — all under one roof.',
  },
  {
    icon: Clock,
    title: 'speed & reliability',
    description: 'Controlled timelines. Zero outsourcing surprises.',
  },
  {
    icon: Layers,
    title: 'multi-division expertise',
    description: 'One partner for exhibitions, interiors, events, retail, and creative.',
  },
  {
    icon: CheckCircle,
    title: 'end-to-end workflow',
    description: 'Concept → Production → Installation → Handover.',
  },
];

export function WhyHoxSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent opacity-50" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Header */}
          <div>
            <span
              className={cn(
                'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="w-8 h-px bg-primary" />
              Why hox
            </span>

            <h2
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 transition-all duration-700 delay-150',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <span className="hox-brand">The power of </span>
              <span className="text-primary">Building</span>
              <br />
              <span className="text-muted-foreground/60">in-house.</span>
            </h2>

            <p
              className={cn(
                'text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              When you control every stage of production, you control quality, 
              timing, and outcomes. That's the HOX difference.
            </p>
          </div>

          {/* Right Column - Features */}
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  'group p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-3 hox-brand text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
