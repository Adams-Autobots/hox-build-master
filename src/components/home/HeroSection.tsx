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
  const [bgUrl, setBgUrl] = useState<string>(HERO_POSTER);
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();
  const shouldLoadVideo = useShouldLoadVideo();

  const fadeStart = useMemo(() => windowHeight * 0.4, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 0.9, [windowHeight]);
  const heroOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);

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

  // Paint video frames → single dataURL for entire text block
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || videoState !== 'playing') return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;
    canvas.width = 640;
    canvas.height = 360;

    let lastTime = 0;
    const interval = 1000 / 12; // 12fps — enough for texture

    const paint = (timestamp: number) => {
      animFrameRef.current = requestAnimationFrame(paint);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      ctx.drawImage(video, 0, 0, 640, 360);
      try { setBgUrl(canvas.toDataURL('image/jpeg', 0.65)); } catch {}
    };

    animFrameRef.current = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [videoState]);

  const handleCanPlay = useCallback(() => setVideoState('playing'), []);
  const handleError = useCallback(() => setVideoState('failed'), []);

  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Hidden video + canvas */}
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

      {/* Fixed dark bg — fades on scroll */}
      <motion.div
        className="fixed inset-0 w-full h-[100svh] bg-background pointer-events-none"
        style={{ opacity: heroOpacity, zIndex: 0 }}
      />

      {/* 
        SINGLE TEXT BLOCK — one background-clip:text container
        Video covers all four words as one continuous image.
        Words packed tight with negative leading so they fill
        the viewport and maximise the video vitrine area.
      */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <h1
          className="font-extrabold uppercase tracking-tighter select-none
            leading-[0.82] px-3 md:px-6 lg:px-10"
          style={{
            backgroundImage: `url(${bgUrl})`,
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
                  fontSize: `clamp(48px, ${
                    division.name.length <= 5 ? '24' :
                    division.name.length <= 6 ? '21' :
                    division.name.length <= 7 ? '18' :
                    division.name.length <= 9 ? '15.5' : '13'
                  }vw, 240px)`,
                }}
              >
                {division.name}
              </motion.span>
            </Link>
          ))}
        </h1>
      </motion.div>

      {/* Scroll indicator only — no redundant wordmark */}
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
