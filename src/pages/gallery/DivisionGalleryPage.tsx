import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { DivisionNav } from '@/components/divisions/DivisionNav';
import { useGalleryImages, type Division } from '@/hooks/useGalleryImages';
import { supabase } from '@/integrations/supabase/client';
import { LazyImage } from '@/components/ui/LazyImage';
import { cn } from '@/lib/utils';

const divisionColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
};

const divisionTitles: Record<Division, string> = {
  exhibitions: 'Exhibitions',
  events: 'Events',
  retail: 'Retail',
  interiors: 'Interiors',
};

interface DivisionGalleryPageProps {
  division: Division;
}

export function DivisionGalleryPage({ division }: DivisionGalleryPageProps) {
  const queryClient = useQueryClient();
  const { data: images = [], isLoading } = useGalleryImages(division);

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel(`gallery-${division}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_images',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['gallery-images', division] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, division]);

  return (
    <Layout>
      {/* Division Navigation */}
      <DivisionNav currentDivision={division} />

      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back Link */}
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="hox-brand">{divisionTitles[division]} </span>
            <span className={divisionColors[division]}>Gallery.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete collection of {division} projects.
          </p>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && images.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground">No images found in this gallery.</p>
        </div>
      )}

      {/* Gallery Grid */}
      {!isLoading && images.length > 0 && (
        <section className="pb-32 lg:pb-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={cn(
                    'group relative overflow-hidden rounded-lg bg-card aspect-[4/3]',
                    'animate-fade-in'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}