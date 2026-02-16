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

// Build the running text sequence — words repeat to fill the viewport
// Separated by bullet dividers so it reads as a continuous stream
function buildTextSequence(repeats: number) {
  const seq: Array<{ name: string; color: string; path: string; id: string }> = [];
  for (let r = 0; r < repeats; r++) {
    for (const div of divisions) {
      seq.push({ ...div, id: `${div.name}-${r}` });
    }
  }
  return seq;
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
  const [videoReady, setVideoReady] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
  const sequence = useMemo(() => buildTextSequence(4), []);

  /*
    RUNNING TEXT BLOCK TECHNIQUE:
    
    The 4 division names repeat 4× as a continuous inline text flow:
    EXHIBITIONS EVENTS RETAIL INTERIORS EXHIBITIONS EVENTS...
    
    The h1 has overflow:hidden and a fixed height (100svh minus
    header/footer). Text wraps naturally within this box. The entire
    block has background-clip:text so video shows through ALL the
    letters as one continuous vitrine.
    
    Words are separated by thin bullet dividers (·) styled smaller.
    Each word is a link. On hover, that word fills with its division colour.
    
    Result: the viewport is PACKED with text. Minimal dead space.
    Video visible through a dense typographic texture. The repetition
    becomes the design — it reads as a bold statement of capability.
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

      {/* Dense text block */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col pt-[72px] md:pt-[80px] overflow-hidden"
        style={{ opacity }}
      >
        <h1
          className="flex-1 overflow-hidden font-extrabold uppercase leading-[0.88] select-none"
          style={{
            fontSize: 'clamp(44px, 11.5vw, 200px)',
            letterSpacing: '-0.03em',
            wordSpacing: '0.05em',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {sequence.map((item, i) => (
            <span key={item.id} className="inline">
              {i > 0 && (
                <span
                  className="inline-block mx-[0.12em] opacity-30"
                  style={{
                    fontSize: '0.5em',
                    verticalAlign: 'middle',
                    WebkitTextFillColor: 'hsl(var(--muted-foreground))',
                  }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              <Link
                to={item.path}
                className="inline hover:opacity-100 transition-all duration-200"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onTouchStart={() => setHoveredId(item.id)}
                onTouchEnd={() => setTimeout(() => setHoveredId(null), 500)}
                style={{
                  WebkitTextFillColor: hoveredId === item.id ? item.color : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {item.name}
              </Link>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Scroll indicator — overlaid bottom right */}
      <motion.div
        className="absolute bottom-4 right-6 lg:bottom-8 lg:right-12 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[8px] text-muted-foreground/30 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-4 bg-foreground/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}
