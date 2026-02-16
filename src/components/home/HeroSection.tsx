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

// Build the repeated sequence: each word appears 3-4 times, interleaved
// with bullet separators, running on as continuous text
function buildTextSequence() {
  const sequence: Array<{ text: string; divIndex: number; isWord: boolean }> = [];
  // 4 full cycles = each word appears 4 times = ~16 words wrapping across viewport
  for (let cycle = 0; cycle < 4; cycle++) {
    for (let d = 0; d < divisions.length; d++) {
      if (sequence.length > 0) {
        sequence.push({ text: ' · ', divIndex: -1, isWord: false });
      }
      sequence.push({ text: divisions[d].name, divIndex: d, isWord: true });
    }
  }
  return sequence;
}

const textSequence = buildTextSequence();

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
  const [hoveredDiv, setHoveredDiv] = useState<number | null>(null);
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

      {/*
        CONTINUOUS TEXT BLOCK
        
        All 4 division names repeated 4x, running on as one paragraph.
        Text wraps naturally — every viewport width produces a full,
        dense block of text with video showing through every letter.
        
        No dead space: text fills the entire rectangle.
        No sizing math per word: one font-size, natural word-wrap.
        
        Words are separated by · bullets. On hover/tap, ALL instances
        of that division light up in their brand colour.
        
        overflow-hidden crops any excess — but because it's just
        wrapping text, it always fills exactly the space available.
      */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col pt-[72px] md:pt-[80px] overflow-hidden"
        style={{ opacity }}
      >
        <h1
          className="flex-1 font-extrabold uppercase leading-[0.95] select-none overflow-hidden px-2 md:px-4 lg:px-6"
          style={{
            fontSize: 'clamp(54px, 11.5vw, 220px)',
            letterSpacing: '-0.03em',
            wordSpacing: '-0.02em',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {textSequence.map((item, i) => {
            if (!item.isWord) {
              return (
                <span
                  key={i}
                  className="inline text-muted-foreground/15"
                  style={{
                    WebkitTextFillColor: 'hsl(var(--muted-foreground) / 0.15)',
                    fontSize: '0.5em',
                    verticalAlign: 'middle',
                  }}
                >
                  {item.text}
                </span>
              );
            }

            const div = divisions[item.divIndex];
            const isHovered = hoveredDiv === item.divIndex;

            return (
              <Link
                key={i}
                to={div.path}
                className="inline transition-all duration-200"
                onMouseEnter={() => setHoveredDiv(item.divIndex)}
                onMouseLeave={() => setHoveredDiv(null)}
                onTouchStart={() => setHoveredDiv(item.divIndex)}
                onTouchEnd={() => setTimeout(() => setHoveredDiv(null), 600)}
                style={{
                  WebkitTextFillColor: isHovered ? div.color : 'transparent',
                }}
              >
                {item.text}
              </Link>
            );
          })}
        </h1>
      </motion.div>

      {/* Scroll indicator — overlaid at bottom right */}
      <motion.div
        className="absolute bottom-4 right-6 lg:bottom-8 lg:right-12 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[8px] text-muted-foreground/25 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-4 bg-foreground/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}
