import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { useGalleryImages, Division } from '@/hooks/useGalleryImages';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const divisionHoverColors: Record<Division, string> = {
  exhibitions: 'group-hover:text-[hsl(var(--hox-red))]',
  events: 'group-hover:text-[hsl(var(--hox-blue))]',
  retail: 'group-hover:text-[hsl(var(--hox-orange))]',
  interiors: 'group-hover:text-[hsl(var(--hox-green))]',
};

const divisionLinkColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
};

const divisions: { key: Division; title: string; route: string }[] = [
  { key: 'exhibitions', title: 'Exhibitions', route: '/gallery/exhibitions' },
  { key: 'events', title: 'Events', route: '/gallery/events' },
  { key: 'retail', title: 'Retail', route: '/gallery/retail' },
  { key: 'interiors', title: 'Interiors', route: '/gallery/interiors' },
];

export default function WorkPage() {
  const queryClient = useQueryClient();

  // Subscribe to realtime changes on gallery_images
  useEffect(() => {
    const channel = supabase
      .channel('gallery-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_images',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Fetch images from all divisions
  const { data: exhibitionsImages = [], isLoading: loadingExhibitions } = useGalleryImages('exhibitions');
  const { data: eventsImages = [], isLoading: loadingEvents } = useGalleryImages('events');
  const { data: retailImages = [], isLoading: loadingRetail } = useGalleryImages('retail');
  const { data: interiorsImages = [], isLoading: loadingInteriors } = useGalleryImages('interiors');

  const isLoading = loadingExhibitions || loadingEvents || loadingRetail || loadingInteriors;

  const divisionImages: Record<Division, typeof exhibitionsImages> = {
    exhibitions: exhibitionsImages,
    events: eventsImages,
    retail: retailImages,
    interiors: interiorsImages,
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="hox-brand">Our </span>
            <span className="text-primary">Projects.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A selection of projects that showcase our capabilities across all four divisions.
          </p>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Division Columns */}
      {!isLoading && (
        <section className="pb-24 lg:pb-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {divisions.map((division) => {
                const images = divisionImages[division.key].slice(0, 4);

                return (
                  <div key={division.key} className="flex flex-col">
                    {/* Column Header */}
                    <div className="mb-4">
                      <Link
                        to={division.route}
                        className="group flex items-center justify-between"
                      >
                        <h2 className={cn(
                          "text-lg md:text-xl font-bold hox-brand transition-colors",
                          divisionHoverColors[division.key]
                        )}>
                          {division.title}
                        </h2>
                        <ArrowUpRight className={cn(
                          "w-4 h-4 text-muted-foreground transition-colors",
                          divisionHoverColors[division.key]
                        )} />
                      </Link>
                    </div>

                    {/* Stacked Photos */}
                    <div className="flex flex-col gap-3">
                      {images.map((image) => (
                        <Link
                          key={image.id}
                          to={division.route}
                          className="group relative overflow-hidden rounded-lg bg-card aspect-[4/3]"
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      ))}
                      
                      {/* View All Link */}
                      <Link
                        to={division.route}
                        className={cn(
                          "text-sm font-medium hover:underline mt-2",
                          divisionLinkColors[division.key]
                        )}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
