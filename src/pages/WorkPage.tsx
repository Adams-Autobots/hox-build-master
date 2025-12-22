import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { useGalleryImages, Division } from '@/hooks/useGalleryImages';
import { supabase } from '@/integrations/supabase/client';

const divisions: { key: Division; title: string; route: string }[] = [
  { key: 'exhibitions', title: 'Exhibitions', route: '/divisions/exhibitions' },
  { key: 'events', title: 'Events', route: '/divisions/events' },
  { key: 'retail', title: 'Retail', route: '/divisions/retail' },
  { key: 'interiors', title: 'Interiors', route: '/divisions/interiors' },
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

      {/* Division Sections */}
      {!isLoading && (
        <section className="pb-24 lg:pb-32">
          <div className="container mx-auto px-6 lg:px-12 space-y-20">
            {divisions.map((division) => {
              const images = divisionImages[division.key].slice(0, 4);
              
              if (images.length === 0) return null;

              return (
                <div key={division.key} className="group/section">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold hox-brand">
                      {division.title}
                    </h2>
                    <Link
                      to={division.route}
                      className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                    >
                      View All
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Preview Grid - 4 images */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <Link
                        key={image.id}
                        to={division.route}
                        className="group relative overflow-hidden rounded-lg bg-card aspect-[4/3]"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                            {image.title || image.alt}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </Layout>
  );
}
