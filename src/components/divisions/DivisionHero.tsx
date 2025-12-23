import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DivisionHeroProps {
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
  tagline: string;
  headline: string;
  highlightText: string;
  description: string;
  ctaText: string;
  heroImage?: string;
  heroVideo?: string;
}

const divisionConfig = {
  exhibitions: {
    color: 'hox-red',
    gradient: 'from-hox-red/20',
    glow: 'shadow-[0_0_40px_hsl(357_85%_52%/0.6)]',
    bg: 'bg-hox-red',
    hover: 'hover:bg-hox-red/90',
  },
  events: {
    color: 'hox-blue',
    gradient: 'from-hox-blue/20',
    glow: 'shadow-[0_0_40px_hsl(196_100%_47%/0.6)]',
    bg: 'bg-hox-blue',
    hover: 'hover:bg-hox-blue/90',
  },
  retail: {
    color: 'hox-orange',
    gradient: 'from-hox-orange/20',
    glow: 'shadow-[0_0_40px_hsl(36_89%_61%/0.6)]',
    bg: 'bg-hox-orange',
    hover: 'hover:bg-hox-orange/90',
  },
  interiors: {
    color: 'hox-green',
    gradient: 'from-hox-green/20',
    glow: 'shadow-[0_0_40px_hsl(87_53%_51%/0.6)]',
    bg: 'bg-hox-green',
    hover: 'hover:bg-hox-green/90',
  },
};

export function DivisionHero({
  division,
  tagline,
  headline,
  highlightText,
  description,
  ctaText,
  heroImage,
  heroVideo,
}: DivisionHeroProps) {
  const config = divisionConfig[division];

  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-24 overflow-hidden">
      {/* Hero Background Video */}
      {heroVideo && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[115%] object-cover object-top"
            onLoadedMetadata={(e) => {
              const video = e.currentTarget;
              video.currentTime = 0.5; // Skip black frame at start
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/60" />
        </div>
      )}

      {/* Hero Background Image */}
      {heroImage && !heroVideo && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={`${division} hero`}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/70" />
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* Division Badge */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={cn('w-3 h-3 rounded-full', config.bg)} />
            <span className={cn('text-sm font-medium tracking-widest uppercase hox-brand', `text-${config.color}`)}>
              hox{division}.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="hox-brand">{headline}</span>
            <br />
            <span className={`text-${config.color}`}>{highlightText}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="hero"
              size="xl"
              asChild
              className={cn(config.bg, config.hover, `hover:${config.glow}`)}
            >
              <Link to="/contact">
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
