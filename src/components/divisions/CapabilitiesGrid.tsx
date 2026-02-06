import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { HoverText } from '@/components/ui/HoverText';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

interface Capability {
  icon: LucideIcon;
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
}

interface CapabilitiesGridProps {
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
  capabilities: Capability[];
}

const divisionIconColors = {
  exhibitions: 'text-hox-red',
  events: 'text-hox-blue',
  retail: 'text-hox-orange',
  interiors: 'text-hox-green',
};

const divisionAccentColors = {
  exhibitions: 'bg-hox-red',
  events: 'bg-hox-blue',
  retail: 'bg-hox-orange',
  interiors: 'bg-hox-green',
};

export function CapabilitiesGrid({ division, capabilities }: CapabilitiesGridProps) {
  const iconColor = divisionIconColors[division];
  const accentColor = divisionAccentColors[division];

  return (
    <section className="py-16 lg:py-20 bg-card" data-division={division}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={cn('inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-4', iconColor)}>
            <span className="w-8 h-px bg-current" />
            Capabilities
          </span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            {...headingAnimation}
          >
            <span className="hox-brand"><HoverText>What we</HoverText> </span>
            <span className={iconColor}><HoverText>Deliver.</HoverText></span>
          </motion.h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <CapabilityCard 
              key={capability.title}
              capability={capability}
              index={index}
              iconColor={iconColor}
              accentColor={accentColor}
              division={division}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CapabilityCardProps {
  capability: Capability;
  index: number;
  iconColor: string;
  accentColor: string;
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
}

function CapabilityCard({ capability, index, iconColor, accentColor, division }: CapabilityCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      data-division={division}
      className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      {capability.backgroundImage && (
        <img
          src={capability.backgroundImage}
          alt={capability.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      )}

      {/* Background Video (shows on hover) */}
      {capability.backgroundVideo && (
        <video
          ref={videoRef}
          src={capability.backgroundVideo}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          muted
          loop
          playsInline
          preload="none"
        />
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/60 group-hover:via-black/25" />

      {/* Accent Line */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100",
        accentColor
      )} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold text-white hox-brand">
          {capability.title}
        </h3>
      </div>

      {/* Hover Border Glow */}
      <div className={cn(
        "absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300",
        `group-hover:border-current ${iconColor}`
      )} style={{ opacity: 0.3 }} />
    </motion.div>
  );
}
