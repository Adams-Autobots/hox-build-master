import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { HoverText } from '@/components/ui/HoverText';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

// Fallback images (hardcoded from gallery position #1)
const FALLBACK_IMAGES = {
  exhibitions: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/exhibitions/1766404973821-1.webp',
  events: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/events/1766407761536-1.webp',
  retail: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/retail/1766408061889-0.webp',
  interiors: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/interiors/1766407431653-18.webp',
};

type DivisionName = 'exhibitions' | 'events' | 'retail' | 'interiors';

const divisions: {
  name: DivisionName;
  displayName: string;
  headline: string;
  path: string;
  accentColor: string;
}[] = [
  {
    name: 'exhibitions',
    displayName: 'Exhibitions.',
    headline: 'Exhibition builds with impact.',
    path: '/divisions/exhibitions',
    accentColor: 'hox-red',
  },
  {
    name: 'events',
    displayName: 'Events.',
    headline: 'Events that come alive.',
    path: '/divisions/events',
    accentColor: 'hox-blue',
  },
  {
    name: 'retail',
    displayName: 'Retail.',
    headline: 'Retail fabrication, redefined.',
    path: '/divisions/retail',
    accentColor: 'hox-orange',
  },
  {
    name: 'interiors',
    displayName: 'Interiors.',
    headline: 'Interiors that elevate space.',
    path: '/divisions/interiors',
    accentColor: 'hox-green',
  },
];

export function DivisionsSection() {
  // Fetch division hero images from database (now supports multiple per division)
  const { data: heroImages } = useQuery({
    queryKey: ['division-hero-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('src, division')
        .eq('is_division_hero', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Group images by division
      const imageMap: Record<string, string[]> = {};
      data?.forEach((img) => {
        if (!imageMap[img.division]) {
          imageMap[img.division] = [];
        }
        imageMap[img.division].push(img.src);
      });
      return imageMap;
    },
  });

  const getImages = (divisionName: DivisionName): string[] => {
    const images = heroImages?.[divisionName];
    return images && images.length > 0 ? images : [FALLBACK_IMAGES[divisionName]];
  };

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <motion.span
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
            Our divisions
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            {...headingAnimation}
          >
          <span className="hox-brand"><HoverText>Four areas of</HoverText> </span>
            <span className="text-primary"><HoverText>expertise.</HoverText></span>
            <br />
            <span className="text-muted-foreground/60"><HoverText>One unified vision.</HoverText></span>
          </motion.h2>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((division, index) => (
            <DivisionCard
              key={division.name}
              division={division}
              images={getImages(division.name)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for each division card with its own slideshow state
function DivisionCard({
  division,
  images,
  index,
}: {
  division: {
    name: DivisionName;
    displayName: string;
    headline: string;
    path: string;
    accentColor: string;
  };
  images: string[];
  index: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Link
        to={division.path}
        data-division={division.name}
        className={cn(
          'group relative aspect-[3/4] rounded-lg overflow-hidden block transition-all duration-500',
          'hover:-translate-y-1'
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      {/* Background Images - Stacked for crossfade */}
      {images.map((src, imgIndex) => (
        <img
          key={src}
          src={src}
          alt={division.headline}
          loading="lazy"
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-all duration-1000',
            imgIndex === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            'group-hover:scale-110'
          )}
        />
      ))}

      {/* Dark Gradient Overlay - Stronger for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      {/* Accent Line (bottom) */}
      <div
        className={cn(
          'absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500',
          `bg-${division.accentColor}`
        )}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
        {/* Division Name - Larger and more prominent */}
        <h3 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white hox-brand leading-tight drop-shadow-lg"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          {division.displayName}
        </h3>

        {/* Headline */}
        <p className="text-xs md:text-sm text-white/70 line-clamp-1 mt-1">
          {division.headline}
        </p>

        {/* Explore Link */}
        <div
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider mt-3 transition-all duration-300',
            `text-${division.accentColor}`
          )}
        >
          <span>Explore</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </div>

      </div>
      </Link>
    </motion.div>
  );
}
