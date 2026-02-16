import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VIDEO_URLS } from '@/lib/video-urls';

const HERO_POSTER = '/hero-poster.jpg';

const divisions = [
  { name: 'EXHIBITIONS', color: 'hsl(var(--hox-red))', path: '/divisions/exhibitions' },
  { name: 'EVENTS', color: 'hsl(var(--hox-blue))', path: '/divisions/events' },
  { name: 'RETAIL', color: 'hsl(var(--hox-orange))', path: '/divisions/retail' },
  { name: 'INTERIORS', color: 'hsl(var(--hox-green))', path: '/divisions/interiors' },
];

function useWindowHeight() {
  const [h, setH] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  useEffect(() => {
    const u = () => setH(window.innerHeight);
    window.addEventListener('resize', u, { passive: true });
    window.addEventListener('orientationchange', u);
    return () => { window.removeEventListener('resize', u); window.removeEventListener('orientationchange', u); };
  }, []);
  return h;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [videoReady, setVideoReady] = useState(false);
  const [hoveredDiv, setHoveredDiv] = useState<string | null>(null);
  const [frameUrl, setFrameUrl] = useState<string>(HERO_POSTER);
  const { scrollY } = useScroll();
  const wh = useWindowHeight();
  const reducedMotion = useReducedMotion();

  const fadeStart = useMemo(() => wh * 0.4, [wh]);
  const fadeEnd = useMemo(() => wh * 0.9, [wh]);
  const opacity = useTransform(scrollY, [0, fadeStart, fadeEnd], reducedMotion ? [1, 1, 1] : [1, 1, 0]);

  const shouldLoad = useMemo(() => {
    if (typeof navigator === 'undefined') return true;
    const c = (navigator as any).connection;
    return !(c?.saveData || c?.effectiveType === '2g' || c?.effectiveType === 'slow-2g');
  }, []);

  // Pause/resume on scroll — controls the SINGLE video element
  useEffect(() => {
    if (!videoRef.current || !videoReady) return;
    return scrollY.on('change', (y) => {
      const v = videoRef.current;
      if (!v) return;
      y > wh * 1.3 ? (!v.paused && v.pause()) : (v.paused && v.play().catch(() => {}));
    });
  }, [scrollY, wh, videoReady]);

  // Capture frames from the SAME video that plays in the background
  // This keeps text and background wash perfectly synced
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !videoReady) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 960; canvas.height = 540;
    let last = 0;
    const paint = (ts: number) => {
      rafRef.current = requestAnimationFrame(paint);
      if (ts - last < 66) return; // ~15fps
      last = ts;
      ctx.drawImage(video, 0, 0, 960, 540);
      try { setFrameUrl(canvas.toDataURL('image/jpeg', 0.7)); } catch {}
    };
    rafRef.current = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(rafRef.current);
  }, [videoReady]);

  return (
    <section className="relative h-[100svh] overflow-hidden">
      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Layer 1: Video at 25% opacity — dim wash, no pure black */}
      <motion.div className="absolute inset-0" style={{ opacity, zIndex: 0 }}>
        <div className="absolute inset-0 bg-background" />
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-0' : 'opacity-[0.25]'
          }`}
        />
        {shouldLoad && !reducedMotion && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="auto"
            onCanPlay={useCallback(() => setVideoReady(true), [])}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
              videoReady ? 'opacity-[0.25]' : 'opacity-0'
            }`}
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Layer 2: Text with video-in-letters via background-clip:text
          The frameUrl is captured from the SAME video element above,
          so the text texture and background wash show the same frame. */}
      <motion.div
        className="absolute inset-0 pt-[60px] md:pt-[68px]"
        style={{
          opacity,
          zIndex: 1,
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
        }}
      >
        <h1
          className="w-full h-full font-extrabold uppercase select-none"
          style={{
            fontSize: 'clamp(48px, 11.5vw, 200px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            wordBreak: 'break-all',
            overflowWrap: 'anywhere',
            textAlign: 'justify',
            textAlignLast: 'justify',
            hyphens: 'none',
            backgroundImage: `url(${frameUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {Array.from({ length: 5 }).flatMap((_, repeat) =>
            divisions.map((div, di) => {
              const key = `${div.name}-${repeat}`;
              const isFirst = repeat === 0 && di === 0;
              return (
                <span key={key} className="inline">
                  {!isFirst && (
                    <span
                      style={{
                        WebkitTextFillColor: 'hsl(var(--muted-foreground) / 0.15)',
                        fontSize: '0.55em',
                        lineHeight: 'inherit',
                      }}
                      aria-hidden="true"
                    >·</span>
                  )}
                  <Link
                    to={div.path}
                    className="inline"
                    onMouseEnter={() => setHoveredDiv(div.name)}
                    onMouseLeave={() => setHoveredDiv(null)}
                    onTouchStart={() => setHoveredDiv(div.name)}
                    onTouchEnd={() => setTimeout(() => setHoveredDiv(null), 500)}
                    style={{
                      WebkitTextFillColor: hoveredDiv === div.name ? div.color : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {div.name}
                  </Link>
                </span>
              );
            })
          )}
        </h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-3 right-5 lg:bottom-6 lg:right-10 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[7px] text-muted-foreground/20 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-3 bg-foreground/10" />
        </motion.div>
      </motion.div>
    </section>
  );
}
