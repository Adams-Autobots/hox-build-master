import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const divisions = [
  {
    name: 'exhibitions',
    fullName: 'hoxexhibitions.',
    headline: 'exhibition builds with impact.',
    description: 'From exhibition stands to large-scale pavilions, we engineer spaces that attract, engage, and convert.',
    path: '/divisions/exhibitions',
    colorClass: 'division-exhibitions',
    accentColor: 'hox-red',
    gradient: 'from-hox-red/20 via-hox-red/5 to-transparent',
  },
  {
    name: 'events',
    fullName: 'hoxevents.',
    headline: 'events that come alive.',
    description: 'Stage design, live experiences, product launches — we build the physical worlds your audience remembers.',
    path: '/divisions/events',
    colorClass: 'division-events',
    accentColor: 'hox-blue',
    gradient: 'from-hox-blue/20 via-hox-blue/5 to-transparent',
  },
  {
    name: 'retail',
    fullName: 'hoxretail.',
    headline: 'retail fabrication, redefined.',
    description: 'POP displays, mall activations, kiosks, store environments — crafted with precision and durability.',
    path: '/divisions/retail',
    colorClass: 'division-retail',
    accentColor: 'hox-orange',
    gradient: 'from-hox-orange/20 via-hox-orange/5 to-transparent',
  },
  {
    name: 'interiors',
    fullName: 'hoxinteriors.',
    headline: 'interiors that elevate space.',
    description: 'Commercial, residential, and hospitality fit-outs with in-house joinery and turnkey delivery.',
    path: '/divisions/interiors',
    colorClass: 'division-interiors',
    accentColor: 'hox-green',
    gradient: 'from-hox-green/20 via-hox-green/5 to-transparent',
  },
];

export function DivisionsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary uppercase mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            our divisions
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">four specialized arms.</span>
            <br />
            <span className="text-muted-foreground/60">one unified vision.</span>
          </h2>
        </div>

        {/* Divisions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => (
            <Link
              key={division.name}
              to={division.path}
              className={cn(
                'group relative p-8 lg:p-10 rounded-lg bg-card border border-border overflow-hidden transition-all duration-500',
                'hover:border-transparent hover:scale-[1.02]',
                division.colorClass,
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                index === 4 && 'md:col-span-2 lg:col-span-1'
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Background Gradient on Hover */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                  division.gradient
                )}
              />

              {/* Glow Effect */}
              <div
                className={cn(
                  'absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl',
                  `bg-${division.accentColor}/20`
                )}
              />

              <div className="relative">
                {/* Division Indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full transition-all duration-500 group-hover:scale-150',
                      `bg-${division.accentColor}`
                    )}
                  />
                  <span className="text-sm text-muted-foreground hox-brand group-hover:text-foreground transition-colors">
                    {division.fullName}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 hox-brand text-foreground">
                  {division.headline}
                </h3>

                <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                  {division.description}
                </p>

                {/* CTA */}
                <div
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors',
                    `text-${division.accentColor}`
                  )}
                >
                  <span>explore {division.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
