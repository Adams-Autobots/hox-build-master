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
    fullName: 'hoxexhibitions.',
    headline: 'Exhibition builds with impact.',
    description: 'From exhibition stands to large-scale pavilions, we engineer spaces that attract, engage, and convert.',
    path: '/divisions/exhibitions',
    accentColor: 'hox-red',
    image: heroExhibitions,
  },
  {
    name: 'events',
    fullName: 'hoxevents.',
    headline: 'Events that come alive.',
    description: 'Stage design, live experiences, product launches — we build the physical worlds your audience remembers.',
    path: '/divisions/events',
    accentColor: 'hox-blue',
    image: heroEvents,
  },
  {
    name: 'retail',
    fullName: 'hoxretail.',
    headline: 'Retail fabrication, redefined.',
    description: 'POP displays, mall activations, kiosks, store environments — crafted with precision and durability.',
    path: '/divisions/retail',
    accentColor: 'hox-orange',
    image: heroRetail,
  },
  {
    name: 'interiors',
    fullName: 'hoxinteriors.',
    headline: 'Interiors that elevate space.',
    description: 'Commercial, residential, and hospitality fit-outs with in-house joinery and turnkey delivery.',
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
        <div className="grid md:grid-cols-2 gap-6">
          {divisions.map((division, index) => (
            <Link
              key={division.name}
              to={division.path}
              className={cn(
                'group relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-500',
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
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                {/* Division Indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full transition-all duration-500 group-hover:scale-125',
                      `bg-${division.accentColor}`
                    )}
                  />
                  <span className="text-sm text-white/70 hox-brand group-hover:text-white transition-colors">
                    {division.fullName}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 hox-brand text-white">
                  {division.headline}
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-6 leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors">
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
