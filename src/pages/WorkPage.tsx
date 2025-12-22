import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import { useGalleryImages, Division } from '@/hooks/useGalleryImages';
import { supabase } from '@/integrations/supabase/client';

const categories: Array<'all' | Division> = ['all', 'exhibitions', 'events', 'retail', 'interiors'];

const divisionRoutes: Record<Division, string> = {
  exhibitions: '/divisions/exhibitions',
  events: '/divisions/events',
  retail: '/divisions/retail',
  interiors: '/divisions/interiors',
};

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | Division>('all');
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
        (payload) => {
          // Invalidate all gallery queries when any change occurs
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

  // Combine all images - they're already sorted by display_order from the hook
  const allProjects = [
    ...exhibitionsImages,
    ...eventsImages,
    ...retailImages,
    ...interiorsImages,
  ];

  // Filter by category, maintaining display_order within each division
  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.division === activeCategory);

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

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hox-brand capitalize',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && filteredProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={divisionRoutes[project.division]}
                  className="group relative overflow-hidden rounded-lg bg-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.src}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                      {project.division}
                    </span>
                    <h3 className="text-xl font-bold text-foreground hox-brand group-hover:text-primary transition-colors line-clamp-2">
                      {project.title || project.alt}
                    </h3>
                    {project.seo_description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {project.seo_description}
                      </p>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary/10 group-hover:border-primary">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
