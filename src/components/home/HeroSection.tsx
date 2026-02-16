import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HoverText } from '@/components/ui/HoverText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VIDEO_URLS } from '@/lib/video-urls';
import heroPoster from '@/assets/hero-exhibitions.jpg';

const divisions = [
  { name: 'Exhibitions', color: 'hsl(var(--hox-red))', path: '/divisions/exhibitions' },
  { name: 'Events', color: 'hsl(var(--hox-blue))', path: '/divisions/events' },
  { name: 'Retail', color: 'hsl(var(--hox-orange))', path: '/divisions/retail' },
  { name: 'Interiors', color: 'hsl(var(--hox-green))', path: '/divisions/interiors' },
];

function useWindowHeight() {
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);
  return height;
}

// Detect if we should even attempt video
function useShouldLoadVideo() {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return true;
    // Skip video on data-saver or slow connections
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return false;
    return true;
  }, []);
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'failed'>('loading');
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();
  const shouldLoadVideo = useShouldLoadVideo();

  const fadeStart = useMemo(() => windowHeight * 0.6, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 1.2, [windowHeight]);
  const videoOpacity = useTransform(
    scrollY,
    [0, fadeStart, fadeEnd],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]
  );

  // Pause video when scrolled out of view (saves GPU)
  useEffect(() => {
    if (!videoRef.current || videoState !== 'playing') return;
    const unsubscribe = scrollY.on('change', (y) => {
      const video = videoRef.current;
      if (!video) return;
      if (y > windowHeight * 1.3) {
        if (!video.paused) video.pause();
      } else {
        if (video.paused) video.play().catch(() => {});
      }
    });
    return unsubscribe;
  }, [scrollY, windowHeight, videoState]);

  // Division name cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % divisions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoState('playing');
  }, []);

  const handleError = useCallback(() => {
    setVideoState('failed');
  }, []);

  const handleStalled = useCallback(() => {
    // If stalled for too long, fall back to poster
    const timer = setTimeout(() => {
      if (videoRef.current?.readyState === 0) {
        setVideoState('failed');
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-visible">
      {/* Background */}
      <motion.div
        className="fixed inset-0 w-full h-screen pointer-events-none"
        style={{ opacity: videoOpacity, zIndex: 0 }}
      >
        {/* Solid fallback colour — always present */}
        <div className="absolute inset-0 bg-background" />

        {/* Poster image — shows immediately, fades when video plays */}
        <img
          src={heroPoster}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoState === 'playing' ? 'opacity-0' : 'opacity-60'
          }`}
        />

        {/* Video — lazy loaded, with error handling */}
        {shouldLoadVideo && !prefersReducedMotion && videoState !== 'failed' && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={handleCanPlay}
            onError={handleError}
            onStalled={handleStalled}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
              videoState === 'playing' ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="HOX showreel featuring exhibitions, events, retail and interiors projects"
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}

        {/* Single combined overlay instead of 5 separate layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, hsl(var(--background) / 0.55), hsl(var(--background) / 0.15), transparent),
              linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.4) 40%, transparent 70%, hsl(var(--background) / 0.15) 100%)
            `,
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <HoverText className="text-[hsl(var(--hox-red))]">hox</HoverText>
              <HoverText className="text-foreground">creative</HoverText>
              <HoverText className="text-[hsl(var(--hox-red))]">.</HoverText>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6 mb-8 max-w-xs md:max-w-none"
          >
            {divisions.map((division, index) => (
              <Link key={division.name} to={division.path} className="relative group">
                <motion.span
                  className="text-lg md:text-2xl lg:text-3xl font-semibold transition-all duration-300"
                  style={{
                    color: activeIndex === index ? division.color : 'hsl(var(--foreground))',
                    textShadow: activeIndex === index ? `0 0 20px ${division.color}` : 'none',
                  }}
                  animate={activeIndex === index ? { scale: [1, 1.08, 1] } : {}}
                  transition={activeIndex === index ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0.2 }}
                  whileHover={{ scale: 1.15, color: division.color, textShadow: `0 0 25px ${division.color}` }}
                >
                  {division.name.split('').map((char, charIndex) => (
                    <span key={charIndex} className="hover-letter">{char}</span>
                  ))}
                </motion.span>
              </Link>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mb-10"
          >
            Dubai based production, design and technical planning delivering world class exhibitions, events, retail and interior environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300">
              Explore our work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
