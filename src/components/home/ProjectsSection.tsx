import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import { HoverText } from '@/components/ui/HoverText';
import { cn } from '@/lib/utils';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

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

const divisionColors: Record<string, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red)/0.85)] text-white backdrop-blur-sm',
  events: 'bg-[hsl(var(--hox-blue)/0.85)] text-white backdrop-blur-sm',
  retail: 'bg-[hsl(var(--hox-orange)/0.85)] text-white backdrop-blur-sm',
  interiors: 'bg-[hsl(var(--hox-green)/0.85)] text-white backdrop-blur-sm',
};

// Fisher-Yates shuffle algorithm
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

      if (error) {
        console.error('Error fetching featured gallery images:', error);
        throw error;
      }

      return data || [];
    },
  });

  // Pick specific distribution: 4 exhibitions, 3 events, 2 retail, 3 interiors (12 total)
  const images = useMemo(() => {
    if (!allFeaturedImages || allFeaturedImages.length === 0) return [];
    
    const byDivision: Record<string, GalleryImage[]> = {
      exhibitions: [],
      events: [],
      retail: [],
      interiors: [],
    };
    
    allFeaturedImages.forEach((img) => {
      if (byDivision[img.division]) {
        byDivision[img.division].push(img);
      }
    });
    
    // Shuffle each division's images
    Object.keys(byDivision).forEach((key) => {
      byDivision[key] = shuffleArray(byDivision[key]);
    });
    
    // Pick: 4 exhibitions, 3 events, 2 retail, 3 interiors
    return [
      ...byDivision.exhibitions.slice(0, 4),
      ...byDivision.events.slice(0, 3),
      ...byDivision.retail.slice(0, 2),
      ...byDivision.interiors.slice(0, 3),
    ];
  }, [allFeaturedImages]);

  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24 gap-8">
          <div>
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
              Featured work
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              {...headingAnimation}
            >
              <span className="hox-brand"><HoverText>Projects that</HoverText> </span>
              <span className="text-primary"><HoverText>Define us.</HoverText></span>
            </motion.h2>
          </div>
        </div>

        {/* Projects Grid - 2x6 on mobile, 4x3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[4/3] rounded-lg" />
            ))
          ) : (
            images?.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Link
                  to={divisionRoutes[image.division] || '/projects'}
                  data-division={image.division}
                  className="group relative overflow-hidden rounded-lg bg-background block transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* View All Link */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            View all projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
