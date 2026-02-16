import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HoverText } from '@/components/ui/HoverText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VIDEO_URLS } from '@/lib/video-urls';

const HERO_POSTER = '/hero-poster.jpg';

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
    return () => { window.removeEventListener('resize', update); window.removeEventListener('orientationchange', update); };
  }, []);
  return height;
}

function useShouldLoadVideo() {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return true;
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

  const fadeStart = useMemo(() => windowHeight * 0.5, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 1.0, [windowHeight]);
  const videoOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);

  useEffect(() => {
    if (!videoRef.current || videoState !== 'playing') return;
    const unsubscribe = scrollY.on('change', (y) => {
      const video = videoRef.current;
      if (!video) return;
      if (y > windowHeight * 1.3) { if (!video.paused) video.pause(); }
      else { if (video.paused) video.play().catch(() => {}); }
    });
    return unsubscribe;
  }, [scrollY, windowHeight, videoState]);

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex(prev => (prev + 1) % divisions.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCanPlay = useCallback(() => setVideoState('playing'), []);
  const handleError = useCallback(() => setVideoState('failed'), []);

  return (
    <section className="relative h-screen flex items-end overflow-visible">
      {/* Background */}
      <motion.div className="fixed inset-0 w-full h-screen pointer-events-none" style={{ opacity: videoOpacity, zIndex: 0 }}>
        <div className="absolute inset-0 bg-background" />
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoState === 'playing' ? 'opacity-0' : 'opacity-60'}`}
        />
        {shouldLoadVideo && !prefersReducedMotion && videoState !== 'failed' && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata"
            onCanPlay={handleCanPlay}
            onError={handleError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${videoState === 'playing' ? 'opacity-100' : 'opacity-0'}`}
            aria-label="HOX showreel"
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to right, hsl(var(--background) / 0.6), hsl(var(--background) / 0.15), transparent),
                       linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 40%, transparent 70%, hsl(var(--background) / 0.1) 100%)`
        }} />
      </motion.div>

      {/* Content — pushed to bottom of viewport */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-16 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          
          {/* Wordmark */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none">
              <HoverText className="text-[hsl(var(--hox-red))]">hox</HoverText>
              <HoverText className="text-foreground">creative</HoverText>
              <HoverText className="text-[hsl(var(--hox-red))]">.</HoverText>
            </h1>
          </motion.div>

          {/* Division names */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 md:gap-8 mb-0"
          >
            {divisions.map((division, index) => (
              <Link key={division.name} to={division.path} className="group">
                <motion.span
                  className="text-base md:text-xl lg:text-2xl font-medium transition-all duration-300"
                  style={{
                    color: activeIndex === index ? division.color : 'hsl(var(--muted-foreground) / 0.5)',
                  }}
                  animate={activeIndex === index ? { scale: [1, 1.05, 1] } : {}}
                  transition={activeIndex === index ? { duration: 0.6 } : { duration: 0.2 }}
                  whileHover={{ color: division.color }}
                >
                  {division.name}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-10 bg-foreground/40"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'bottom' }}
        />
      </motion.div>
    </section>
  );
}
