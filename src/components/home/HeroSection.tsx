import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VIDEO_URLS } from '@/lib/video-urls';

const HERO_POSTER = '/hero-poster.jpg';

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
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'failed'>('loading');
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();
  const shouldLoadVideo = useShouldLoadVideo();

  const fadeStart = useMemo(() => windowHeight * 0.5, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 1.0, [windowHeight]);
  const videoOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);
  const contentOpacity = useTransform(scrollY, [0, windowHeight * 0.4], [1, 0]);
  const contentY = useTransform(scrollY, [0, windowHeight * 0.4], [0, -40]);

  // Pause video when scrolled out
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

  const handleCanPlay = useCallback(() => setVideoState('playing'), []);
  const handleError = useCallback(() => setVideoState('failed'), []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — the hero IS the video */}
      <motion.div
        className="fixed inset-0 w-full h-screen pointer-events-none"
        style={{ opacity: videoOpacity, zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-background" />

        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoState === 'playing' ? 'opacity-0' : 'opacity-70'
          }`}
        />

        {shouldLoadVideo && !prefersReducedMotion && videoState !== 'failed' && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            preload="metadata"
            onCanPlay={handleCanPlay}
            onError={handleError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
              videoState === 'playing' ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="HOX showreel"
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}

        {/* Minimal overlay — just enough to read text, let the video breathe */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 30%, transparent 60%),
              linear-gradient(to right, hsl(var(--background) / 0.4) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Content — just the wordmark and a single line */}
      <motion.div
        className="relative z-10 container mx-auto px-6 lg:px-12"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-[hsl(var(--hox-red))]">hox</span>
            <span className="text-foreground">creative</span>
            <span className="text-[hsl(var(--hox-red))]">.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground/80 mt-6 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Production. Fabrication. Delivery.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
