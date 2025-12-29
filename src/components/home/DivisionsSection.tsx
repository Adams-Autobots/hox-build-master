import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

import heroExhibitions from '@/assets/hero-exhibitions.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroRetail from '@/assets/hero-retail.jpg';
import heroInteriors from '@/assets/hero-interiors.jpg';

const divisions = [
  {
    name: 'exhibitions',
    displayName: 'Exhibitions.',
    headline: 'Exhibition builds with impact.',
    path: '/divisions/exhibitions',
    accentColor: 'hox-red',
    image: heroExhibitions,
  },
  {
    name: 'events',
    displayName: 'Events.',
    headline: 'Events that come alive.',
    path: '/divisions/events',
    accentColor: 'hox-blue',
    image: heroEvents,
  },
  {
    name: 'retail',
    displayName: 'Retail.',
    headline: 'Retail fabrication, redefined.',
    path: '/divisions/retail',
    accentColor: 'hox-orange',
    image: heroRetail,
  },
  {
    name: 'interiors',
    displayName: 'Interiors.',
    headline: 'Interiors that elevate space.',
    path: '/divisions/interiors',
    accentColor: 'hox-green',
    image: heroInteriors,
  },
];

export function DivisionsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            Our divisions
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">Four specialized </span>
            <span className="text-primary">Arms.</span>
            <br />
            <span className="text-muted-foreground/60">one unified vision.</span>
          </h2>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((division, index) => (
            <Link
              key={division.name}
              to={division.path}
              className={cn(
                'group relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500',
                'hover:-translate-y-1',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Background Image */}
              <img
                src={division.image}
                alt={division.headline}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Accent Line (bottom) */}
              <div
                className={cn(
                  'absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500',
                  `bg-${division.accentColor}`
                )}
              />

              {/* Content */}
              <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
                {/* Division Name */}
                <h3 className="text-xl lg:text-2xl font-bold text-white hox-brand leading-tight">
                  {division.displayName}
                </h3>

                {/* Headline */}
                <p className="text-xs text-white/60 line-clamp-1 mt-1">
                  {division.headline}
                </p>

                {/* Explore Link */}
                <div
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider mt-3 transition-all duration-300',
                    `text-${division.accentColor}`
                  )}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
