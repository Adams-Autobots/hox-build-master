import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FALLBACK_IMAGES = {
  exhibitions: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/exhibitions/1766404973821-1.webp',
  events: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/events/1766407761536-1.webp',
  retail: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/retail/1766408061889-0.webp',
  interiors: 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos/interiors/1766407431653-18.webp',
};

type DivisionName = 'exhibitions' | 'events' | 'retail' | 'interiors';

const divisions: {
  name: DivisionName;
  headline: string;
  path: string;
  accentColor: string;
}[] = [
  { name: 'exhibitions', headline: 'Custom stands & pavilions', path: '/divisions/exhibitions', accentColor: 'hox-red' },
  { name: 'events', headline: 'End-to-end production', path: '/divisions/events', accentColor: 'hox-blue' },
  { name: 'retail', headline: 'Fit-out & fabrication', path: '/divisions/retail', accentColor: 'hox-orange' },
  { name: 'interiors', headline: 'Design & build', path: '/divisions/interiors', accentColor: 'hox-green' },
];

export function DivisionsSection() {
  const { data: heroImages } = useQuery({
    queryKey: ['division-hero-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('src, division')
        .eq('is_division_hero', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      const imageMap: Record<string, string[]> = {};
      data?.forEach((img) => {
        if (!imageMap[img.division]) imageMap[img.division] = [];
        imageMap[img.division].push(img.src);
      });
      return imageMap;
    },
  });

  const getImages = (name: DivisionName): string[] => {
    const images = heroImages?.[name];
    return images && images.length > 0 ? images : [FALLBACK_IMAGES[name]];
  };

  return (
    <section className="py-20 lg:py-28 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Division cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

function DivisionCard({
  division,
  images,
  index,
}: {
  division: typeof divisions[number];
  images: string[];
  index: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const interval = setInterval(() => setActiveIndex((prev) => (prev + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <Link
        to={division.path}
        className="group relative aspect-[3/4] rounded-lg overflow-hidden block transition-all duration-500 hover:-translate-y-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((src, imgIndex) => (
          <img
            key={src}
            src={src}
            alt={`HOX ${division.name}`}
            loading="lazy"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-1000',
              imgIndex === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              'group-hover:scale-110'
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className={cn(
          'absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500',
          `bg-${division.accentColor}`
        )} />

        <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight capitalize">
            {division.name}
          </h3>
          <p className="text-xs md:text-sm text-white/60 mt-1">{division.headline}</p>
          <div className={cn('flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider mt-3', `text-${division.accentColor}`)}>
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
