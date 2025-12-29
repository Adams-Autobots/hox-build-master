import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
  const frameRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  
  const [sectionHeight, setSectionHeight] = useState('200vh');
  const [travelLeft, setTravelLeft] = useState(0);
  const [travelCenter, setTravelCenter] = useState(0);
  const [travelRight, setTravelRight] = useState(0);
  
  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoother spring configuration
  const springConfig = { damping: 40, stiffness: 100, mass: 0.5 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  // Transform for each column - pixel-based, per-column travel
  const leftColumnY = useTransform(smoothProgress, [0, 1], [0, -travelLeft]);
  const centerColumnY = useTransform(smoothProgress, [0, 0.4, 1], [0, -travelCenter * 0.2, -travelCenter]);
  const rightColumnY = useTransform(smoothProgress, [0, 1], [0, -travelRight]);

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

  // Use all featured images
  const allImages = shuffleArray(allFeaturedImages || []);
  
  // Split into 3 columns evenly
  const columnSize = Math.ceil(allImages.length / 3);
  const leftColumn = allImages.slice(0, columnSize);
  const centerColumn = allImages.slice(columnSize, columnSize * 2);
  const rightColumn = allImages.slice(columnSize * 2);

  // Measure content and calculate per-column travel distances
  const measureAndSetHeight = useCallback(() => {
    if (!frameRef.current || !leftColRef.current || !centerColRef.current || !rightColRef.current) return;
    
    const frameH = frameRef.current.clientHeight;
    const leftH = leftColRef.current.scrollHeight;
    const centerH = centerColRef.current.scrollHeight;
    const rightH = rightColRef.current.scrollHeight;
    
    // Per-column travel - no fudge factor
    const newTravelLeft = Math.max(0, leftH - frameH);
    const newTravelCenter = Math.max(0, centerH - frameH);
    const newTravelRight = Math.max(0, rightH - frameH);
    const maxTravel = Math.max(newTravelLeft, newTravelCenter, newTravelRight);
    
    setTravelLeft(newTravelLeft);
    setTravelCenter(newTravelCenter);
    setTravelRight(newTravelRight);
    
    // Section height = viewport + max travel distance
    const viewportH = window.innerHeight;
    const totalHeight = viewportH + maxTravel;
    setSectionHeight(`${totalHeight}px`);
  }, []);

  // Use ResizeObserver for robust measurement
  useEffect(() => {
    if (isLoading || allImages.length === 0) return;
    
    const observer = new ResizeObserver(() => {
      measureAndSetHeight();
    });
    
    // Observe frame and columns
    if (frameRef.current) observer.observe(frameRef.current);
    if (leftColRef.current) observer.observe(leftColRef.current);
    if (centerColRef.current) observer.observe(centerColRef.current);
    if (rightColRef.current) observer.observe(rightColRef.current);
    
    // Initial measurement
    measureAndSetHeight();
    
    return () => observer.disconnect();
  }, [isLoading, allImages.length, measureAndSetHeight]);

  useEffect(() => {
    window.addEventListener('resize', measureAndSetHeight);
    return () => window.removeEventListener('resize', measureAndSetHeight);
  }, [measureAndSetHeight]);

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
          onLoad={measureAndSetHeight}
        />
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <Skeleton className="aspect-[3/4] rounded-xl" />
  );

  return (
    <section ref={containerRef} className="relative" style={{ height: sectionHeight }}>
      {/* Sticky frame that stays fixed while scrolling */}
      <div ref={sectionRef} className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        
        {/* Section Header */}
        <div className="container mx-auto px-6 lg:px-12 pt-8 lg:pt-12">
          <div className="text-center mb-8 lg:mb-12">
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
        </div>

        {/* Coverflow Frame */}
        <div ref={frameRef} className="flex-1 overflow-hidden px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto h-full">
            {/* Left Column - moves up on scroll */}
            <motion.div 
              ref={leftColRef}
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

            {/* Center Column - eased movement up */}
            <motion.div 
              ref={centerColRef}
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
              ref={rightColRef}
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
      {/* View Full Gallery Link */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 z-20">
        <Link 
          to="/projects" 
          className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <span className="text-sm font-medium tracking-wide">View full gallery</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
