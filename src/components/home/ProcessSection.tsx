import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Ruler, Factory, Truck, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const processSteps = [
  {
    icon: Lightbulb,
    number: '01',
    title: 'concept & design',
    description: 'Collaborative ideation with detailed 3D visualization and technical drawings.',
    duration: '1-2 weeks',
  },
  {
    icon: Ruler,
    number: '02',
    title: 'engineering',
    description: 'Precision engineering with material specifications and structural calculations.',
    duration: '1-2 weeks',
  },
  {
    icon: Factory,
    number: '03',
    title: 'fabrication',
    description: 'In-house CNC cutting, metal work, joinery, and finishing in our 50,000 sq ft facility.',
    duration: '2-4 weeks',
  },
  {
    icon: Truck,
    number: '04',
    title: 'logistics',
    description: 'Coordinated delivery and site preparation for seamless installation.',
    duration: '1 week',
  },
  {
    icon: CheckCircle,
    number: '05',
    title: 'installation',
    description: 'Expert on-site assembly with dedicated project management and quality control.',
    duration: '1-2 weeks',
  },
];

export function ProcessSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12" ref={containerRef}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary uppercase mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            our process
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">from concept to completion.</span>
          </h2>

          <p
            className={cn(
              'text-lg text-muted-foreground transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            End-to-end production excellence with full in-house capabilities, 
            delivering complex builds in as little as 6 weeks.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  className={cn(
                    'relative lg:grid lg:grid-cols-2 lg:gap-16 items-center',
                    isVisible ? 'opacity-100' : 'opacity-0'
                  )}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      'lg:text-right',
                      !isLeft && 'lg:col-start-2 lg:text-left'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-4 mb-4',
                        isLeft ? 'lg:justify-end' : 'lg:justify-start'
                      )}
                    >
                      <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                      <h3 className="text-2xl font-bold hox-brand">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3 max-w-md ml-auto lg:ml-0">
                      {step.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      typical duration: {step.duration}
                    </span>
                  </div>

                  {/* Center Icon - Desktop */}
                  <div
                    className={cn(
                      'hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-2 border-primary items-center justify-center z-10',
                      'shadow-[0_0_30px_rgba(255,0,19,0.3)]'
                    )}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Mobile Icon */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  {isLeft && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">
            Ready to start your project?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Get a timeline estimate
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
