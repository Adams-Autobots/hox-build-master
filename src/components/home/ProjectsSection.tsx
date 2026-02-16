import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function ProjectsSection() {
  const { data: allFeaturedImages, isLoading } = useQuery({
    queryKey: ['featured-gallery-images'],
    queryFn: async (): Promise<GalleryImage[]> => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, src, alt, division')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const images = useMemo(() => {
    if (!allFeaturedImages || allFeaturedImages.length === 0) return [];
    const byDivision: Record<string, GalleryImage[]> = { exhibitions: [], events: [], retail: [], interiors: [] };
    allFeaturedImages.forEach((img) => { if (byDivision[img.division]) byDivision[img.division].push(img); });
    Object.keys(byDivision).forEach((key) => { byDivision[key] = shuffleArray(byDivision[key]); });
    return [
      ...byDivision.exhibitions.slice(0, 3),
      ...byDivision.events.slice(0, 3),
      ...byDivision.retail.slice(0, 2),
      ...byDivision.interiors.slice(0, 2),
    ];
  }, [allFeaturedImages]);

  return (
    <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Minimal header — just label + link */}
        <motion.div
          className="flex items-end justify-between mb-10 lg:mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-wider text-primary">
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
            Selected work
          </span>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid — 10 images, 2 cols mobile, 5 cols desktop (2 rows of 5) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-md" />
            ))
          ) : (
            images?.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <Link
                  to={divisionRoutes[image.division] || '/projects'}
                  className="group relative overflow-hidden rounded-md bg-background block"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
