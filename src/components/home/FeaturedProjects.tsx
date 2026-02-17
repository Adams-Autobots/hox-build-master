import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { HoverText } from '@/components/ui/HoverText';
import heroExhibitions from '@/assets/hero-exhibitions.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroRetail from '@/assets/hero-retail.jpg';
import heroInteriors from '@/assets/hero-interiors.jpg';

const FALLBACK_IMAGES: Record<string, string> = {
  exhibitions: heroExhibitions,
  events: heroEvents,
  retail: heroRetail,
  interiors: heroInteriors,
};

// Featured projects — these are the hero projects that define HOX
// Update with real project names and replace images when available
const featuredProjects = [
  {
    title: 'National Geographic',
    subtitle: 'Exhibition Stand — Abu Dhabi International Petroleum Exhibition',
    division: 'exhibitions' as const,
    divisionLabel: 'Exhibitions',
    path: '/gallery/exhibitions',
  },
  {
    title: 'Rolls-Royce',
    subtitle: 'Immersive Brand Experience — Dubai Airshow',
    division: 'events' as const,
    divisionLabel: 'Events',
    path: '/gallery/events',
  },
  {
    title: 'Aqua Water Bar',
    subtitle: 'Full Retail Fit-Out — Dubai',
    division: 'retail' as const,
    divisionLabel: 'Retail',
    path: '/gallery/retail',
  },
];

const divisionColors: Record<string, string> = {
  exhibitions: 'hsl(var(--hox-red))',
  events: 'hsl(var(--hox-blue))',
  retail: 'hsl(var(--hox-orange))',
  interiors: 'hsl(var(--hox-green))',
};

export function FeaturedProjects() {
  // Fetch hero images from database for each featured division
  const { data: heroImages } = useQuery({
    queryKey: ['featured-project-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('src, division')
        .eq('is_division_hero', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      const imageMap: Record<string, string> = {};
      data?.forEach((img) => {
        if (!imageMap[img.division]) imageMap[img.division] = img.src;
      });
      return imageMap;
    },
  });

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* No big heading — let the work speak */}
        <div className="space-y-4 lg:space-y-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={project.path}
                className="group block relative overflow-hidden rounded-lg"
              >
                {/* Image — full width, aspect ratio varies by breakpoint */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <img
                    src={heroImages?.[project.division] || FALLBACK_IMAGES[project.division] || ''}
                    alt={`${project.title} — ${project.subtitle}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay — heavier on left for text */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
                  {/* Division tag */}
                  <span
                    className="text-xs font-medium tracking-widest uppercase mb-3 md:mb-4"
                    style={{ color: divisionColors[project.division] }}
                  >
                    {project.divisionLabel}
                  </span>

                  {/* Project title — large */}
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm md:text-base text-white/60 max-w-xl">
                    {project.subtitle}
                  </p>

                  {/* View project link — appears on hover */}
                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-white/0 group-hover:text-white/80 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    View project
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all work */}
        <motion.div
          className="flex justify-center mt-12 lg:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <HoverText>View all work</HoverText>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
