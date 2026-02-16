import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'failed'>('loading');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();
  const shouldLoadVideo = useShouldLoadVideo();

  const fadeStart = useMemo(() => windowHeight * 0.5, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 1.0, [windowHeight]);
  const heroOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);

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
    <section className="relative h-screen overflow-hidden">
      {/* 
        Technique: 
        Layer 1 (bottom): Video/poster at full brightness
        Layer 2 (middle): Dark mask (bg-background/85) — makes everything dark
        Layer 3 (top): Division text in WHITE with mix-blend-mode: multiply
        
        Result: Where the white text is, the dark mask is "punched through" 
        and the video shows. Everywhere else stays dark.
        
        We use a wrapper with isolation:isolate to contain the blend.
      */}

      <motion.div className="fixed inset-0 w-full h-screen" style={{ opacity: heroOpacity, zIndex: 0, isolation: 'isolate' }}>
        {/* Layer 1: Video/poster */}
        <div className="absolute inset-0">
          <img
            src={HERO_POSTER}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoState === 'playing' ? 'opacity-0' : 'opacity-100'}`}
          />
          {shouldLoadVideo && !prefersReducedMotion && videoState !== 'failed' && (
            <video
              ref={videoRef}
              autoPlay muted loop playsInline preload="metadata"
              onCanPlay={handleCanPlay}
              onError={handleError}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${videoState === 'playing' ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={VIDEO_URLS.heroMain} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Layer 2: Dark mask */}
        <div className="absolute inset-0 bg-[hsl(var(--background)/0.82)]" />

        {/* Layer 3: White text — mix-blend-mode: screen punches through the dark mask */}
        <div className="absolute inset-0 mix-blend-screen pointer-events-none">
          <div className="h-full flex flex-col justify-center container mx-auto px-4 md:px-6 lg:px-12">
            {divisions.map((division, index) => (
              <div key={division.name} className="relative overflow-hidden">
                <span
                  className="block font-bold uppercase leading-[0.88] tracking-tighter text-white select-none
                    text-[16vw] md:text-[14vw] lg:text-[12.5vw]"
                >
                  {division.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Interactive hover layer — sits above the blend, captures clicks */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4 md:px-6 lg:px-12"
        style={{ opacity: heroOpacity }}
      >
        {divisions.map((division, index) => (
          <motion.div
            key={division.name}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              to={division.path}
              className="block relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Transparent text for hitbox sizing */}
              <span
                className="block font-bold uppercase leading-[0.88] tracking-tighter select-none
                  text-[16vw] md:text-[14vw] lg:text-[12.5vw] text-transparent"
              >
                {division.name}
              </span>

              {/* Coloured text — appears on hover */}
              <span
                className="absolute inset-0 block font-bold uppercase leading-[0.88] tracking-tighter select-none
                  text-[16vw] md:text-[14vw] lg:text-[12.5vw] transition-opacity duration-400"
                style={{
                  color: division.color,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                aria-hidden="true"
              >
                {division.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-6 lg:px-12 pb-6 lg:pb-8 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h1 className="text-base md:text-lg font-bold tracking-tight">
          <span className="text-[hsl(var(--hox-red))]">hox</span>
          <span className="text-foreground">creative</span>
          <span className="text-[hsl(var(--hox-red))]">.</span>
        </h1>

        <motion.div
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] text-muted-foreground/30 tracking-[0.25em] uppercase">Scroll</span>
          <div className="w-px h-6 bg-foreground/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}
