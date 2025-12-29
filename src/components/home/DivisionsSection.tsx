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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {divisions.map((division, index) => (
            <Link
              key={division.name}
              to={division.path}
              className={cn(
                'group relative aspect-[3/4] rounded-lg overflow-hidden transition-all duration-500',
                'hover:-translate-y-2',
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/70 group-hover:via-black/30" />

              {/* Accent Line (bottom) */}
              <div
                className={cn(
                  'absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500',
                  `bg-${division.accentColor}`
                )}
              />

              {/* Content */}
              <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                {/* Division Name */}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-500 group-hover:scale-125',
                      `bg-${division.accentColor}`
                    )}
                  />
                  <span className="text-lg lg:text-xl font-bold text-white hox-brand group-hover:text-white transition-colors">
                    {division.displayName}
                  </span>
                </div>

                {/* Headline */}
                <p className="text-xs text-white/60 line-clamp-1 group-hover:text-white/80 transition-colors">
                  {division.headline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
