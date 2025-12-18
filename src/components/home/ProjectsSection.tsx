import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/ui/TiltCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'Mercedes-Benz Pavilion',
    location: 'Dubai',
    category: 'Exhibition',
    description: 'Premium exhibition build with integrated lighting, structural engineering, and brand storytelling.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 2,
    title: 'Samsung Experience Booth',
    location: 'GITEX Dubai',
    category: 'Exhibition',
    description: 'Interactive technology showcase with custom fabrication and immersive displays.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80',
  },
  {
    id: 3,
    title: 'Emaar Lifestyle Showroom',
    location: 'Downtown Dubai',
    category: 'Retail',
    description: 'High-end retail environment with bespoke joinery and premium finishes.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    id: 4,
    title: 'Expo 2020 Activation',
    location: 'Dubai',
    category: 'Events',
    description: 'Large-scale event activation with structural builds and experiential zones.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 5,
    title: 'Luxury Villa Interior',
    location: 'Palm Jumeirah',
    category: 'Interiors',
    description: 'Complete residential fit-out with custom joinery and architectural detailing.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 6,
    title: 'Retail Kiosk Deployment',
    location: 'Dubai Mall',
    category: 'Retail',
    description: 'Scalable retail kiosk system for premium brand activation.',
    image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80',
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24 gap-8">
          <div>
            <span
              className={cn(
                'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="w-8 h-px bg-primary" />
              Featured work
            </span>

            <h2
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-150',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <span className="hox-brand">Projects that </span>
              <span className="text-primary">Define us.</span>
            </h2>
          </div>

          <Button
            variant="outline"
            size="lg"
            asChild
            className={cn(
              'transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Link to="/projects" className="group">
              View all work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid with 3D Tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <TiltCard
              key={project.id}
              className={cn(
                'transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` } as React.CSSProperties}
              tiltAmount={8}
            >
              <Link
                to={`/projects`}
                className="group relative overflow-hidden rounded-lg bg-background block"
                data-cursor="view"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  {/* Category Badge */}
                  <span className="inline-flex self-start px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 hox-brand group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.location}
                  </p>

                  {/* Description - Hidden by default, shown on hover */}
                  <p className="text-sm text-muted-foreground line-clamp-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {project.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-primary group-hover:bg-primary/10">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
