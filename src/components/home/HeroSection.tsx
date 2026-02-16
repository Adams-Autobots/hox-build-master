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

// Per-word vw sizing based on character count — fills viewport width
function getWordSize(length: number) {
  if (length <= 5) return '24';
  if (length <= 6) return '21';
  if (length <= 7) return '18';
  if (length <= 9) return '15.5';
  return '13';
}

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
  const [videoReady, setVideoReady] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();
  const shouldLoadVideo = useShouldLoadVideo();

  const fadeStart = useMemo(() => windowHeight * 0.4, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 0.9, [windowHeight]);
  const heroOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);

  // Pause video when scrolled out
  useEffect(() => {
    if (!videoRef.current || !videoReady) return;
    const unsubscribe = scrollY.on('change', (y) => {
      const video = videoRef.current;
      if (!video) return;
      if (y > windowHeight * 1.3) { if (!video.paused) video.pause(); }
      else { if (video.paused) video.play().catch(() => {}); }
    });
    return unsubscribe;
  }, [scrollY, windowHeight, videoReady]);

  const handleCanPlay = useCallback(() => setVideoReady(true), []);

  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden">
      {/*
        TECHNIQUE — No canvas, no dataURL, fully CSS:

        Layer 1 (bottom): Video/poster playing full-screen
        Layer 2 (middle): bg-background dark overlay (the "mask")
        Layer 3 (top): Text with background-clip:text using the
                       poster as background — punches through
                       the dark overlay via the text shapes.

        The video plays behind the dark overlay, visible as subtle
        ambient movement. The poster fills the text letterforms
        as a static high-contrast image.

        When hovering a word, it fills with the division colour.
      */}

      {/* Layer 1: Video/poster — plays behind everything */}
      <motion.div
        className="fixed inset-0 w-full h-[100svh] pointer-events-none"
        style={{ opacity: heroOpacity, zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-background" />
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-0' : 'opacity-60'
          }`}
        />
        {shouldLoadVideo && !prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata"
            onCanPlay={handleCanPlay}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
              videoReady ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}
        {/* Dark overlay — dims the video so text pops */}
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      {/* Layer 2: Text vitrine — poster image fills the letterforms */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <h1
          className="font-extrabold uppercase tracking-tighter select-none
            leading-[0.82] px-3 md:px-6 lg:px-10"
          style={{
            backgroundImage: `url(${HERO_POSTER})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {divisions.map((division, index) => (
            <Link
              key={division.name}
              to={division.path}
              className="block relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 600)}
              style={{
                WebkitTextFillColor: hoveredIndex === index ? division.color : 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  fontSize: `clamp(48px, ${getWordSize(division.name.length)}vw, 240px)`,
                }}
              >
                {division.name}
              </motion.span>
            </Link>
          ))}
        </h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-end px-6 lg:px-12 pb-6 lg:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
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
