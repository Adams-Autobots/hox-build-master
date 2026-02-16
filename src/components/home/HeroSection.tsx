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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'failed'>('loading');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();
  const shouldLoadVideo = useShouldLoadVideo();

  const fadeStart = useMemo(() => windowHeight * 0.4, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 0.9, [windowHeight]);
  const heroOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);

  // Pause video when scrolled out of view
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

  // Paint video frames to canvas → export as data URL for background-image
  // This is how we get LIVE video inside background-clip:text
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || videoState !== 'playing') return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    canvas.width = 480;  // Low res is fine — it's behind text
    canvas.height = 270;

    let lastTime = 0;
    const fps = 15; // 15fps is enough for a background texture
    const interval = 1000 / fps;

    const paint = (timestamp: number) => {
      animFrameRef.current = requestAnimationFrame(paint);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.drawImage(video, 0, 0, 480, 270);
      try {
        const url = canvas.toDataURL('image/jpeg', 0.6);
        setPosterDataUrl(url);
      } catch {
        // Canvas tainted — fall back to poster
      }
    };

    animFrameRef.current = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [videoState]);

  // Generate poster data URL on load for initial background
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 480;
      c.height = 270;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 480, 270);
        try { setPosterDataUrl(c.toDataURL('image/jpeg', 0.7)); } catch {}
      }
    };
    img.src = HERO_POSTER;
  }, []);

  const handleCanPlay = useCallback(() => setVideoState('playing'), []);
  const handleError = useCallback(() => setVideoState('failed'), []);

  const bgImage = posterDataUrl ? `url(${posterDataUrl})` : `url(${HERO_POSTER})`;

  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Hidden video + canvas — video plays offscreen, canvas captures frames */}
      <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden" aria-hidden="true">
        {shouldLoadVideo && !prefersReducedMotion && videoState !== 'failed' && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata"
            onCanPlay={handleCanPlay}
            onError={handleError}
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}
        <canvas ref={canvasRef} />
      </div>

      {/* Fixed background — solid dark, fades on scroll */}
      <motion.div
        className="fixed inset-0 w-full h-[100svh] bg-background pointer-events-none"
        style={{ opacity: heroOpacity, zIndex: 0 }}
      />

      {/* Text block — video plays inside the letterforms via background-clip:text */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-8 lg:px-12"
        style={{ opacity: heroOpacity }}
      >
        <div className="flex flex-col">
          {divisions.map((division, index) => (
            <motion.div
              key={division.name}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                to={division.path}
                className="group block relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 600)}
              >
                {/* Video-through-text layer */}
                <span
                  className="block font-extrabold uppercase leading-[0.88] tracking-tighter select-none
                    transition-opacity duration-300"
                  style={{
                    fontSize: `clamp(30px, ${division.name.length <= 5 ? '22' : division.name.length <= 6 ? '19' : division.name.length <= 7 ? '17' : '13.5'}vw, 200px)`,
                    backgroundImage: bgImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: hoveredIndex === index ? 0 : 1,
                  }}
                  aria-hidden="true"
                >
                  {division.name}
                </span>

                {/* Division colour layer — shows on hover/tap */}
                <span
                  className="absolute inset-0 block font-extrabold uppercase leading-[0.88] tracking-tighter select-none
                    transition-opacity duration-300"
                  style={{
                    fontSize: `clamp(30px, ${division.name.length <= 5 ? '22' : division.name.length <= 6 ? '19' : division.name.length <= 7 ? '17' : '13.5'}vw, 200px)`,
                    color: division.color,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                >
                  {division.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom bar — wordmark + scroll indicator */}
      <motion.div
        className="relative z-10 px-6 lg:px-12 pb-6 lg:pb-8 flex items-end justify-between"
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
