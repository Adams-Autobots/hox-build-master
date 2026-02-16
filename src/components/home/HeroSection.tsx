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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
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

  // Pause/resume on scroll
  useEffect(() => {
    if (!videoRef.current || !videoReady) return;
    return scrollY.on('change', (y) => {
      const v = videoRef.current;
      if (!v) return;
      y > wh * 1.3 ? (!v.paused && v.pause()) : (v.paused && v.play().catch(() => {}));
    });
  }, [scrollY, wh, videoReady]);

  // Capture frames
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !videoReady) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 640; canvas.height = 360;

    let last = 0;
    const paint = (ts: number) => {
      rafRef.current = requestAnimationFrame(paint);
      if (ts - last < 83) return;
      last = ts;
      ctx.drawImage(video, 0, 0, 640, 360);
      try { setFrameUrl(canvas.toDataURL('image/jpeg', 0.6)); } catch {}
    };
    rafRef.current = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(rafRef.current);
  }, [videoReady]);

  // Load poster as initial frame
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 640; c.height = 360;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 640, 360);
        try { setFrameUrl(c.toDataURL('image/jpeg', 0.7)); } catch {}
      }
    };
    img.src = HERO_POSTER;
  }, []);

  const bg = frameUrl || HERO_POSTER;

  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Hidden video + canvas */}
      <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {shouldLoad && !reducedMotion && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata"
            onCanPlay={useCallback(() => setVideoReady(true), [])}
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}
        <canvas ref={canvasRef} />
      </div>

      {/* Dark bg — fades on scroll */}
      <motion.div
        className="fixed inset-0 bg-background pointer-events-none"
        style={{ opacity, zIndex: 0 }}
      />

      {/*
        TEXT VITRINE
        - pt-[72px] clears the header (~56px + breathing room)
        - h1 uses flex-1 to fill remaining space
        - justify-between spreads 4 words evenly across full height
        - Each word sized to fill viewport WIDTH
        - leading-none + negative margin to pack lines tight
        - Result: text fills the entire viewport, minimal dead space
      */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col pt-[72px] md:pt-[80px] pb-6 md:pb-10 lg:pb-12 px-2 md:px-4 lg:px-8"
        style={{ opacity }}
      >
        <h1
          className="flex-1 flex flex-col justify-between font-extrabold uppercase tracking-[-0.04em] leading-none select-none overflow-hidden"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {divisions.map((div, i) => (
            <motion.span
              key={div.name}
              className="block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
            >
              <Link
                to={div.path}
                className="block whitespace-nowrap"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onTouchStart={() => setHoveredIdx(i)}
                onTouchEnd={() => setTimeout(() => setHoveredIdx(null), 500)}
                style={{
                  WebkitTextFillColor: hoveredIdx === i ? div.color : 'transparent',
                  transition: 'all 0.25s ease',
                  /*
                    Each word fills ~90% of viewport width.
                    vh cap prevents vertical overflow.
                    On landscape (desktop), vh is the tighter constraint.
                    On portrait (mobile), vw is the tighter constraint.
                  */
                  fontSize: `clamp(40px, min(${Math.round(140 / div.name.length)}vw, ${Math.round(190 / div.name.length)}vh), 340px)`,
                }}
              >
                {div.name}
              </Link>
            </motion.span>
          ))}
        </h1>

        {/* Scroll indicator — inline at bottom right */}
        <motion.div
          className="flex justify-end mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[8px] text-muted-foreground/20 tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-4 bg-foreground/10" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
