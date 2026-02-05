import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Wrench, Truck, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Division = 'exhibitions' | 'events' | 'retail' | 'interiors';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

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
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <motion.span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-4',
              divisionColors[division]
            )}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={cn('w-8 h-px', divisionColors[division].replace('text-', 'bg-'))} />
            Our process
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            {...headingAnimation}
          >
            <span className="hox-brand">From concept to </span>
            <span className={divisionColors[division]}>Completion.</span>
          </motion.h2>
        </div>

        {/* Horizontal Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
