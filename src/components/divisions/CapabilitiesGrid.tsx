import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
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
    <section className="py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={cn('inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-4', iconColor)}>
            <span className="w-8 h-px bg-current" />
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold"><span className="hox-brand">What we </span><span className={iconColor}>Deliver.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <CapabilityCard 
              key={capability.title}
              capability={capability}
              index={index}
              iconColor={iconColor}
              accentColor={accentColor}
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
}

function CapabilityCard({ capability, index, iconColor, accentColor }: CapabilityCardProps) {
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/40" />

      {/* Accent Line */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100",
        accentColor
      )} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
        <capability.icon className={cn('w-10 h-10 mb-4 transition-transform duration-300 group-hover:scale-110', iconColor)} />
        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white hox-brand">
          {capability.title}
        </h3>
        <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
          {capability.description}
        </p>
      </div>

      {/* Hover Border Glow */}
      <div className={cn(
        "absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300",
        `group-hover:border-current ${iconColor}`
      )} style={{ opacity: 0.3 }} />
    </motion.div>
  );
}
