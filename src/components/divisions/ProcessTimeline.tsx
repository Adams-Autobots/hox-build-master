import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { MessageSquare, PenTool, Wrench, Truck, CheckCircle } from 'lucide-react';

type Division = 'exhibitions' | 'events' | 'retail' | 'interiors';

const divisionColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
};

const divisionBorders: Record<Division, string> = {
  exhibitions: 'border-[hsl(var(--hox-red))]',
  events: 'border-[hsl(var(--hox-blue))]',
  retail: 'border-[hsl(var(--hox-orange))]',
  interiors: 'border-[hsl(var(--hox-green))]',
};

const divisionBg: Record<Division, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red))]/10',
  events: 'bg-[hsl(var(--hox-blue))]/10',
  retail: 'bg-[hsl(var(--hox-orange))]/10',
  interiors: 'bg-[hsl(var(--hox-green))]/10',
};

const processSteps = [
  {
    icon: MessageSquare,
    title: 'discovery',
    description: 'We listen to understand your vision, objectives, and constraints. Every great build starts with the right questions.',
  },
  {
    icon: PenTool,
    title: 'design',
    description: 'Our team creates detailed 3D renders and technical drawings, engineering every element for both aesthetics and feasibility.',
  },
  {
    icon: Wrench,
    title: 'fabrication',
    description: 'In-house production across metal, carpentry, acrylic, and composites. Full quality control under one roof.',
  },
  {
    icon: Truck,
    title: 'delivery',
    description: 'Seamless logistics, professional installation, and on-site supervision. We handle every detail until handover.',
  },
  {
    icon: CheckCircle,
    title: 'support',
    description: 'Post-installation support, maintenance, and storage solutions. Your partnership doesn\'t end at delivery.',
  },
];

interface ProcessTimelineProps {
  division: Division;
}

export function ProcessTimeline({ division }: ProcessTimelineProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-4 transition-all duration-700',
              divisionColors[division],
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className={cn('w-8 h-px', divisionColors[division].replace('text-', 'bg-'))} />
            Our process
          </span>
          
          <h2
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">From concept to </span>
            <span className={divisionColors[division]}>Completion.</span>
          </h2>
        </div>

        {/* Horizontal Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className={cn(
                  'relative group transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Connecting line (hidden on first card and mobile) */}
                {index > 0 && (
                  <div 
                    className={cn(
                      'hidden lg:block absolute -left-3 lg:-left-3 top-6 w-6 h-px bg-border'
                    )}
                  />
                )}

                {/* Card */}
                <div className={cn(
                  'p-4 rounded-lg border border-border/50 bg-background/50 h-full',
                  'hover:border-border transition-colors duration-300'
                )}>
                  {/* Icon */}
                  <div className="mb-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full border flex items-center justify-center',
                        divisionBorders[division],
                        divisionBg[division]
                      )}
                    >
                      <Icon className={cn('w-4 h-4', divisionColors[division])} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold mb-2 capitalize">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
