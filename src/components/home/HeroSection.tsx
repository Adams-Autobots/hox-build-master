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

// Build the continuous text stream — words repeated, joined into one string
// that will word-break across lines filling edge to edge
function buildStream(repeats: number): string {
  const words = divisions.map(d => d.name);
  const stream: string[] = [];
  for (let r = 0; r < repeats; r++) {
    stream.push(...words);
  }
  // Join with narrow separator that CSS will treat as part of the word
  // Using zero-width joiner between words means CSS word-break will
  // break mid-word, filling to the right edge
  return stream.join('·');
}

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
  const textRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [hoveredDiv, setHoveredDiv] = useState<string | null>(null);
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

  useEffect(() => {
    if (!videoRef.current || !videoReady) return;
    return scrollY.on('change', (y) => {
      const v = videoRef.current;
      if (!v) return;
      y > wh * 1.3 ? (!v.paused && v.pause()) : (v.paused && v.play().catch(() => {}));
    });
  }, [scrollY, wh, videoReady]);

  // Capture video frames
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
      try { setFrameUrl(canvas.toDataURL('image/jpeg', 0.65)); } catch {}
    };
    rafRef.current = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(rafRef.current);
  }, [videoReady]);

  // Poster as initial frame
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

  /*
    FULL COVERAGE TEXT BLOCK:
    
    One continuous string of division names joined by thin dots:
    EXHIBITIONS·EVENTS·RETAIL·INTERIORS·EXHIBITIONS·EVENTS...
    
    CSS word-break:break-all forces letters to break at the RIGHT
    EDGE of the viewport. So "EXHIBITI" ends one line and "ONS·EVE"
    starts the next. Every line fills edge to edge. Zero dead space.
    
    The entire h1 has background-clip:text — video shows through
    every single letter, filling the viewport like a typographic grid.
    
    Each division name is wrapped in a <Link> for hover interactivity.
    On hover, that word lights up with its division colour.
    
    text-justify:inter-character spreads characters evenly so each
    line is perfectly flush left AND right (justified).
  */

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

      {/* Dark bg */}
      <motion.div
        className="fixed inset-0 bg-background pointer-events-none"
        style={{ opacity, zIndex: 0 }}
      />

      {/* Full coverage text */}
      <motion.div
        ref={textRef}
        className="relative z-10 flex-1 overflow-hidden pt-[60px] md:pt-[68px]"
        style={{ opacity }}
      >
        <h1
          className="w-full h-full font-extrabold uppercase select-none overflow-hidden"
          style={{
            fontSize: 'clamp(48px, 11.5vw, 200px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            wordBreak: 'break-all',
            overflowWrap: 'anywhere',
            textAlign: 'justify',
            textAlignLast: 'justify',
            hyphens: 'none',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {/* Render each word as a hoverable span, with dot separators */}
          {Array.from({ length: 5 }).flatMap((_, repeat) =>
            divisions.map((div, di) => {
              const key = `${div.name}-${repeat}`;
              const isFirst = repeat === 0 && di === 0;
              return (
                <span key={key} className="inline">
                  {!isFirst && (
                    <span
                      style={{
                        WebkitTextFillColor: 'hsl(var(--muted-foreground) / 0.2)',
                        fontSize: '0.6em',
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
