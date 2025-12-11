import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { MessageSquare, PenTool, Wrench, Truck, CheckCircle } from 'lucide-react';

type Division = 'exhibitions' | 'events' | 'retail' | 'interiors' | 'creative';

const divisionColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
  creative: 'text-foreground',
};

const divisionBorders: Record<Division, string> = {
  exhibitions: 'border-[hsl(var(--hox-red))]',
  events: 'border-[hsl(var(--hox-blue))]',
  retail: 'border-[hsl(var(--hox-orange))]',
  interiors: 'border-[hsl(var(--hox-green))]',
  creative: 'border-foreground',
};

const divisionBg: Record<Division, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red))]/10',
  events: 'bg-[hsl(var(--hox-blue))]/10',
  retail: 'bg-[hsl(var(--hox-orange))]/10',
  interiors: 'bg-[hsl(var(--hox-green))]/10',
  creative: 'bg-foreground/10',
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
    <section ref={ref} className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-6 transition-all duration-700',
              divisionColors[division],
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className={cn('w-8 h-px', divisionColors[division].replace('text-', 'bg-'))} />
            our process
          </span>
          
          <h2
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            from concept to completion.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div 
            className={cn(
              'absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border transition-all duration-1000 origin-top',
              isVisible ? 'scale-y-100' : 'scale-y-0'
            )}
          />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className={cn(
                    'relative grid lg:grid-cols-2 gap-8 items-center transition-all duration-700',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  {/* Content - alternates sides on desktop */}
                  <div
                    className={cn(
                      'lg:pr-16 pl-20 lg:pl-0',
                      isEven ? 'lg:text-right lg:pr-16' : 'lg:order-2 lg:pl-16'
                    )}
                  >
                    <h3 className="text-2xl font-bold mb-3">
                      <span className={cn('mr-2', divisionColors[division])}>0{index + 1}.</span>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon Node */}
                  <div
                    className={cn(
                      'absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center',
                      isEven ? '' : 'lg:order-1'
                    )}
                  >
                    <div
                      className={cn(
                        'w-16 h-16 rounded-full border-2 flex items-center justify-center bg-background transition-all duration-500',
                        divisionBorders[division],
                        'group-hover:scale-110'
                      )}
                    >
                      <Icon className={cn('w-6 h-6', divisionColors[division])} />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={cn('hidden lg:block', isEven ? 'lg:order-2' : 'lg:order-1')} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
