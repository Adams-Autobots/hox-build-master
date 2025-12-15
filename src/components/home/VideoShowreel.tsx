import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Industrial footage clips - cycling through different production processes
const videoClips = [
  {
    src: 'https://cdn.coverr.co/videos/coverr-welding-sparks-in-slow-motion-2556/1080p.mp4',
    label: 'welding',
  },
  {
    src: 'https://cdn.coverr.co/videos/coverr-cnc-machine-cutting-metal-1080p/1080p.mp4',
    label: 'cnc cutting',
  },
  {
    src: 'https://cdn.coverr.co/videos/coverr-laser-cutting-metal-3129/1080p.mp4',
    label: 'laser cutting',
  },
  {
    src: 'https://cdn.coverr.co/videos/coverr-a-man-welds-metal-in-a-workshop-6735/1080p.mp4',
    label: 'fabrication',
  },
];

interface VideoShowreelProps {
  posterImage: string;
}

export function VideoShowreel({ posterImage }: VideoShowreelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videoClips.length);
        setIsTransitioning(false);
      }, 800);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % videoClips.length;
    const nextVideo = videoRefs.current[nextIndex];
    if (nextVideo) {
      nextVideo.load();
    }
  }, [currentIndex]);

  return (
    <div className="absolute inset-0">
      {/* Video layers */}
      {videoClips.map((clip, index) => (
        <motion.div
          key={clip.src}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.05,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay={index === currentIndex}
            muted
            loop
            playsInline
            preload={index === currentIndex || index === (currentIndex + 1) % videoClips.length ? 'auto' : 'none'}
            poster={posterImage}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) contrast(1.15) saturate(1.1)' }}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        </motion.div>
      ))}

      {/* Fallback image */}
      <img
        src={posterImage}
        alt="HOX Production"
        className="absolute inset-0 w-full h-full object-cover -z-10"
        style={{ filter: 'brightness(0.25)' }}
      />

      {/* Transition flash effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-primary/10 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Multi-layer cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      {/* Cinematic color grade overlay */}
      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

      {/* Deep vignette for focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, transparent 0%, hsl(var(--background) / 0.7) 70%, hsl(var(--background)) 100%)',
        }}
      />

      {/* Scanline effect for industrial feel */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)',
          backgroundSize: '100% 4px',
        }}
      />

    </div>
  );
}
