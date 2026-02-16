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

  const fadeStart = useMemo(() => windowHeight * 0.4, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 0.9, [windowHeight]);
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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/*
        VIDEO-THROUGH-TEXT TECHNIQUE using SVG mask:
        - Video plays behind an SVG that has text cut out
        - The SVG is filled with the background colour
        - Where text is, the SVG is transparent → video shows through
        - This gives a solid, reliable cross-browser mask effect
      */}

      {/* Fixed video layer */}
      <motion.div
        className="fixed inset-0 w-full h-screen pointer-events-none"
        style={{ opacity: heroOpacity, zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-background" />
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoState === 'playing' ? 'opacity-0' : 'opacity-70'}`}
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
        {/* Slight overlay to add contrast to text edges */}
        <div className="absolute inset-0 bg-background/10" />
      </motion.div>

      {/* SVG text mask — dark background with text cut out to reveal video */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <svg
          className="w-full h-auto"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <mask id="text-mask">
              {/* White = visible, Black = hidden */}
              <rect width="100%" height="100%" fill="white" />
              <text x="40" y="155" className="hero-mask-text" fill="black" fontSize="145" fontWeight="800" fontFamily="'Outfit', sans-serif" letterSpacing="-4">EXHIBITIONS</text>
              <text x="40" y="290" className="hero-mask-text" fill="black" fontSize="145" fontWeight="800" fontFamily="'Outfit', sans-serif" letterSpacing="-4">EVENTS</text>
              <text x="40" y="425" className="hero-mask-text" fill="black" fontSize="145" fontWeight="800" fontFamily="'Outfit', sans-serif" letterSpacing="-4">RETAIL</text>
              <text x="40" y="560" className="hero-mask-text" fill="black" fontSize="145" fontWeight="800" fontFamily="'Outfit', sans-serif" letterSpacing="-4">INTERIORS</text>
            </mask>
          </defs>
          {/* This rect is the background colour — masked so text areas are transparent (video shows through) */}
          <rect width="100%" height="100%" fill="hsl(var(--background))" mask="url(#text-mask)" />
        </svg>
      </motion.div>

      {/* Interactive hover layer — positioned over the SVG text areas */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center">
        <div className="w-full" style={{ aspectRatio: '1200/600' }}>
          <div className="relative w-full h-full">
            {divisions.map((division, index) => (
              <Link
                key={division.name}
                to={division.path}
                className="absolute left-0 w-full block"
                style={{
                  top: `${(index * 135 + 25) / 600 * 100}%`,
                  height: `${145 / 600 * 100}%`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Colour fill on hover */}
                <span
                  className="absolute inset-0 flex items-center pl-[3.3%] font-extrabold uppercase transition-opacity duration-400"
                  style={{
                    fontSize: 'min(12vw, 145px)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: division.color,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                >
                  {division.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — wordmark + scroll */}
      <motion.div
        className="relative z-20 container mx-auto px-6 lg:px-12 pb-6 lg:pb-8 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
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
