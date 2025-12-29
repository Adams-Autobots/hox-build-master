import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  division: string;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function CoverflowGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoother spring configuration
  const springConfig = { damping: 40, stiffness: 100, mass: 0.5 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  // Transform for each column - increased range for full image reveal
  // Side columns move up (negative), center moves down (positive)
  const leftColumnY = useTransform(smoothProgress, [0, 1], ['25%', '-25%']);
  const centerColumnY = useTransform(smoothProgress, [0, 1], ['-25%', '25%']);
  const rightColumnY = useTransform(smoothProgress, [0, 1], ['25%', '-25%']);

  const { data: allFeaturedImages, isLoading } = useQuery({
    queryKey: ['coverflow-gallery-images'],
    queryFn: async (): Promise<GalleryImage[]> => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, src, alt, division')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }

      return data || [];
    },
  });

  // Get 9 images for 3x3 grid
  const images = shuffleArray(allFeaturedImages || []).slice(0, 9);
  
  // Split into 3 columns
  const leftColumn = images.slice(0, 3);
  const centerColumn = images.slice(3, 6);
  const rightColumn = images.slice(6, 9);

  const ImageCard = ({ image }: { image: GalleryImage }) => (
    <div
      data-division={image.division}
      className="relative overflow-hidden rounded-xl"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <Skeleton className="aspect-[3/4] rounded-xl" />
  );

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky frame that stays fixed while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-4">
              <span className="w-8 h-px bg-primary" />
              Gallery
              <span className="w-8 h-px bg-primary" />
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="hox-brand">Our </span>
              <span className="text-primary">Portfolio</span>
            </h2>
          </div>

          {/* Coverflow Grid */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {/* Left Column - moves up on scroll */}
            <motion.div 
              className="flex flex-col gap-4 lg:gap-6"
              style={{ y: leftColumnY }}
            >
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                leftColumn.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))
              )}
            </motion.div>

            {/* Center Column - moves down on scroll */}
            <motion.div 
              className="flex flex-col gap-4 lg:gap-6"
              style={{ y: centerColumnY }}
            >
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                centerColumn.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))
              )}
            </motion.div>

            {/* Right Column - moves up on scroll */}
            <motion.div 
              className="flex flex-col gap-4 lg:gap-6"
              style={{ y: rightColumnY }}
            >
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                rightColumn.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
