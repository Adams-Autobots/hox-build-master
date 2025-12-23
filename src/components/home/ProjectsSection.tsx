import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  division: string;
}

const divisionRoutes: Record<string, string> = {
  exhibitions: '/gallery/exhibitions',
  events: '/gallery/events',
  retail: '/gallery/retail',
  interiors: '/gallery/interiors',
};

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  const { data: images, isLoading } = useQuery({
    queryKey: ['featured-gallery-images'],
    queryFn: async (): Promise<GalleryImage[]> => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, src, alt, division')
        .order('display_order', { ascending: true })
        .limit(6);

      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }

      return data || [];
    },
  });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-card relative overflow-hidden">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[4/3] rounded-lg" />
            ))
          ) : (
            images?.map((image, index) => (
              <Link
                key={image.id}
                to={divisionRoutes[image.division] || '/projects'}
                className={cn(
                  'group relative overflow-hidden rounded-lg bg-background block transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${300 + index * 100}ms` } as React.CSSProperties}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
