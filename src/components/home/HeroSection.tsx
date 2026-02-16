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
  const [videoReady, setVideoReady] = useState(false);
  const [hoveredDiv, setHoveredDiv] = useState<string | null>(null);
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

  /*
    SINGLE VIDEO — THREE LAYER STACK (contained in one isolation context):
    
    Layer 1 (bottom): Video/poster at full brightness — object-cover fills viewport
    Layer 2 (middle): Dark overlay at 90% opacity — dims video to ~10% visible
    Layer 3 (top):    White text with mix-blend-mode:screen — punches through
                      the dark overlay, revealing the full-brightness video beneath
    
    How mix-blend-mode:screen works:
    - White (255) + dark overlay → screen blend = bright → video shows through
    - The dark overlay is 90% opaque, so background areas show ~10% video
    - Where white text sits, screen blend cancels the darkness → ~100% video
    
    ONE video source. ONE alignment. Text and background always in sync.
    No canvas, no dataURL, no dual video elements.
  */

  return (
    <section
      className="relative h-[100svh] overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Layer 1: Video at full brightness */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity, zIndex: 0 }}
      >
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {shouldLoad && !reducedMotion && (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="auto"
            onCanPlay={useCallback(() => setVideoReady(true), [])}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={VIDEO_URLS.heroMain} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Layer 2: Dark overlay — 90% opacity = video shows at ~10% behind */}
      <motion.div
        className="absolute inset-0 bg-background/[0.90]"
        style={{ opacity, zIndex: 1 }}
      />

      {/* Layer 3: White text with mix-blend-mode:screen — punches through overlay */}
      <motion.div
        className="absolute inset-0 pt-[60px] md:pt-[68px]"
        style={{
          opacity,
          zIndex: 2,
          mixBlendMode: 'screen',
          // Fade bottom 12% — no hard crop on partial lines
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
        }}
      >
        <h1
          className="w-full h-full font-extrabold uppercase text-white select-none"
          style={{
            fontSize: 'clamp(48px, 11.5vw, 200px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            wordBreak: 'break-all',
            overflowWrap: 'anywhere',
            textAlign: 'justify',
            textAlignLast: 'justify',
            hyphens: 'none',
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
                      className="inline text-white/20"
                      style={{ fontSize: '0.55em', lineHeight: 'inherit' }}
                      aria-hidden="true"
                    >·</span>
                  )}
                  <Link
                    to={div.path}
                    className="inline transition-colors duration-200"
                    onMouseEnter={() => setHoveredDiv(div.name)}
                    onMouseLeave={() => setHoveredDiv(null)}
                    onTouchStart={() => setHoveredDiv(div.name)}
                    onTouchEnd={() => setTimeout(() => setHoveredDiv(null), 500)}
                    style={{
                      color: hoveredDiv === div.name ? div.color : 'white',
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

      {/* Interactive layer — sits above blend context for clickability */}
      {/* The links are inside the blend layer which should still be clickable
          since mix-blend-mode doesn't affect pointer events */}

      {/* Scroll indicator — above everything */}
      <motion.div
        className="absolute bottom-3 right-5 lg:bottom-6 lg:right-10 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[7px] text-white/20 tracking-[0.3em] uppercase mix-blend-normal">Scroll</span>
          <div className="w-px h-3 bg-white/10 mix-blend-normal" />
        </motion.div>
      </motion.div>
    </section>
  );
}
