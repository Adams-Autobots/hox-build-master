import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const [isDragging, setIsDragging] = useState(false);
  
  // Motion value for scroll position
  const scrollY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothScrollY = useSpring(scrollY, springConfig);
  
  // Transform for each column - center goes down, sides go up
  const leftColumnY = useTransform(smoothScrollY, [0, 1], ['0%', '15%']);
  const centerColumnY = useTransform(smoothScrollY, [0, 1], ['0%', '-15%']);
  const rightColumnY = useTransform(smoothScrollY, [0, 1], ['0%', '15%']);

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

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      const delta = e.deltaY * 0.001;
      const currentValue = scrollY.get();
      const newValue = Math.max(0, Math.min(1, currentValue + delta));
      scrollY.set(newValue);
    }
  }, [scrollY]);

  // Handle touch/drag
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDrag = useCallback((_: any, info: { delta: { y: number } }) => {
    const delta = -info.delta.y * 0.003;
    const currentValue = scrollY.get();
    const newValue = Math.max(0, Math.min(1, currentValue + delta));
    scrollY.set(newValue);
  }, [scrollY]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Reset scroll position when leaving viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          scrollY.set(0);
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [scrollY]);

  const ImageCard = ({ image, index }: { image: GalleryImage; index: number }) => (
    <div
      data-division={image.division}
      className={cn(
        'relative overflow-hidden rounded-xl transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          draggable={false}
        />
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <Skeleton className="aspect-[3/4] rounded-xl" />
  );

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            Gallery
            <span className="w-8 h-px bg-primary" />
          </span>
          
          <h2
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">Our </span>
            <span className="text-primary">Portfolio</span>
          </h2>
        </div>

        {/* Coverflow Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-3 gap-4 lg:gap-6 relative cursor-grab active:cursor-grabbing select-none"
          onPanStart={handleDragStart}
          onPan={handleDrag}
          onPanEnd={handleDragEnd}
          style={{ touchAction: 'none' }}
        >
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
              leftColumn.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index} />
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
              centerColumn.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index + 3} />
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
              rightColumn.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index + 6} />
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
