import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Mail, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const divisions = [
  { name: 'Exhibitions', slug: 'exhibitions', path: '/divisions/exhibitions', cssVar: 'hox-red', wordmark: 'hoxexhibitions.' },
  { name: 'Events', slug: 'events', path: '/divisions/events', cssVar: 'hox-blue', wordmark: 'hoxevents.' },
  { name: 'Retail', slug: 'retail', path: '/divisions/retail', cssVar: 'hox-orange', wordmark: 'hoxretail.' },
  { name: 'Interiors', slug: 'interiors', path: '/divisions/interiors', cssVar: 'hox-green', wordmark: 'hoxinteriors.' },
];

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Divisions', path: '/divisions', hasOverlay: true },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

function useDivisionHeroImages() {
  return useQuery({
    queryKey: ['division-hero-images-nav'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('src, division')
        .eq('is_division_hero', true)
        .order('display_order', { ascending: true });
      if (error) return {};
      const imageMap: Record<string, string> = {};
      data?.forEach((img) => {
        if (!imageMap[img.division]) imageMap[img.division] = img.src;
      });
      return imageMap;
    },
    staleTime: 1000 * 60 * 10,
  });
}

// Detect which division page we're on (if any)
function useActiveDivision(pathname: string) {
  for (const d of divisions) {
    if (pathname.startsWith(d.path)) return d;
  }
  return null;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);
  const location = useLocation();
  const { data: heroImages } = useDivisionHeroImages();
  const activeDivision = useActiveDivision(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOverlayOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOverlayOpen]);

  const toggleOverlay = useCallback(() => {
    setIsOverlayOpen(prev => !prev);
    setHoveredDivision(null);
  }, []);

  // Wordmark logic: on division pages show division brand, else master brand
  const renderWordmark = () => {
    if (activeDivision && !isScrolled) {
      // Division page: show e.g. "hoxexhibitions." with division colour
      return (
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-foreground">hox</span>
          <span style={{ color: `hsl(var(--${activeDivision.cssVar}))` }}>
            {activeDivision.slug}
          </span>
          <span style={{ color: `hsl(var(--${activeDivision.cssVar}))` }}>.</span>
        </span>
      );
    }
    if (isScrolled) {
      // Scrolled on any page: compact "h." with appropriate colour
      const dotColor = activeDivision ? `hsl(var(--${activeDivision.cssVar}))` : undefined;
      return (
        <span className="text-2xl font-bold tracking-tight" style={dotColor ? { color: dotColor } : undefined}>
          <span className={dotColor ? undefined : 'text-primary'}>h.</span>
        </span>
      );
    }
    // Default: master brand "hoxcreative."
    return (
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-primary">hox</span>
        <span className="text-foreground">creative</span>
        <span className="text-primary">.</span>
      </span>
    );
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isOverlayOpen
            ? 'bg-transparent py-5 lg:py-6'
            : isScrolled
              ? 'bg-background/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
              : 'bg-transparent py-5 lg:py-6'
        )}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="block hover:opacity-80 transition-opacity duration-300 relative z-[70]">
              {/* Desktop */}
              <span className="hidden md:inline-block transition-all duration-500">
                {renderWordmark()}
              </span>
              {/* Mobile: always compact */}
              <span className="md:hidden text-lg font-bold tracking-tight">
                {activeDivision ? (
                  <>
                    <span className="text-foreground">hox</span>
                    <span style={{ color: `hsl(var(--${activeDivision.cssVar}))` }}>{activeDivision.slug}</span>
                    <span style={{ color: `hsl(var(--${activeDivision.cssVar}))` }}>.</span>
                  </>
                ) : (
                  <>
                    <span className="text-primary">hox</span>
                    <span className="text-foreground">creative</span>
                    <span className="text-primary">.</span>
                  </>
                )}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) =>
                item.hasOverlay ? (
                  <button
                    key={item.name}
                    onClick={toggleOverlay}
                    className={cn(
                      'text-sm font-medium tracking-wide transition-colors relative group',
                      isOverlayOpen || location.pathname.includes('/divisions')
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      'absolute -bottom-1.5 left-0 right-0 h-px transition-transform duration-300 origin-left',
                      isOverlayOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      activeDivision ? '' : 'bg-primary'
                    )}
                    style={activeDivision ? { backgroundColor: `hsl(var(--${activeDivision.cssVar}))` } : undefined}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      'text-sm font-medium tracking-wide transition-colors relative group',
                      location.pathname === item.path
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      'absolute -bottom-1.5 left-0 right-0 h-px transition-transform duration-300 origin-left',
                      location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      activeDivision ? '' : 'bg-primary'
                    )}
                    style={activeDivision ? { backgroundColor: `hsl(var(--${activeDivision.cssVar}))` } : undefined}
                    />
                  </Link>
                )
              )}
              {/* CTA — picks up division colour */}
              <Link
                to="/contact"
                className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide rounded-sm transition-all duration-300"
                style={activeDivision ? {
                  color: `hsl(var(--${activeDivision.cssVar}))`,
                  borderColor: `hsl(var(--${activeDivision.cssVar}) / 0.4)`,
                  border: '1px solid',
                } : {
                  color: 'hsl(var(--primary))',
                  border: '1px solid hsl(var(--primary) / 0.4)',
                }}
              >
                Start a Project
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleOverlay}
              className="md:hidden relative p-2 text-foreground group z-[70]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end gap-1.5 w-6">
                <span className={cn(
                  'h-px bg-foreground transition-all duration-300 origin-right',
                  isOverlayOpen ? 'w-6 rotate-[-45deg] translate-y-[4px]' : 'w-6'
                )} />
                <span className={cn(
                  'h-px bg-foreground transition-all duration-300',
                  isOverlayOpen ? 'w-0 opacity-0' : 'w-4'
                )} />
                <span className={cn(
                  'h-px bg-foreground transition-all duration-300 origin-right',
                  isOverlayOpen ? 'w-6 rotate-[45deg] -translate-y-[4px]' : 'w-6'
                )} />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* ===== FULL-SCREEN OVERLAY ===== */}
      <div
        className={cn(
          'fixed inset-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]',
          isOverlayOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-background">
          {divisions.map((division) => {
            const src = heroImages?.[division.slug];
            if (!src) return null;
            return (
              <div
                key={division.slug}
                className={cn(
                  'absolute inset-0 transition-opacity duration-700',
                  hoveredDivision === division.slug ? 'opacity-[0.12]' : 'opacity-0'
                )}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="eager" />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-background/80" />
        </div>

        {/* Close */}
        <button
          onClick={toggleOverlay}
          className="absolute top-5 right-6 lg:top-6 lg:right-12 z-[70] p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content — scrollable on mobile */}
        <div className="relative z-10 h-full overflow-y-auto overscroll-contain">
          <div className="min-h-full flex flex-col justify-center py-20 md:py-12">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Division links — compact on mobile */}
            <div
              className={cn(
                'md:hidden flex flex-col gap-5 mb-10 transition-all duration-700',
                isOverlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isOverlayOpen ? '100ms' : '0ms' }}
            >
              {divisions.map((division) => (
                <Link
                  key={division.slug}
                  to={division.path}
                  className="group flex items-center justify-between py-2 border-b border-border/10"
                >
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="text-foreground/70 group-hover:text-foreground transition-colors">hox</span>
                    <span style={{ color: `hsl(var(--${division.cssVar}))` }}>{division.slug}.</span>
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground transition-all group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>

            {/* Division cards — thumbnail grid on desktop only */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
              {divisions.map((division, index) => (
                <Link
                  key={division.slug}
                  to={division.path}
                  className="group relative"
                  onMouseEnter={() => setHoveredDivision(division.slug)}
                  onMouseLeave={() => setHoveredDivision(null)}
                >
                  <div
                    className={cn(
                      'transition-all duration-700',
                      isOverlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ transitionDelay: isOverlayOpen ? `${100 + index * 60}ms` : '0ms' }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-3 border border-border/20 group-hover:border-white/10 transition-colors duration-300">
                      {heroImages?.[division.slug] ? (
                        <img
                          src={heroImages[division.slug]}
                          alt={`HOX ${division.name}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                        style={{ backgroundColor: `hsl(var(--${division.cssVar}))` }}
                      />
                    </div>

                    {/* Wordmark */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-xl font-bold tracking-tight">
                        <span className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">hox</span>
                        <span
                          className="transition-colors duration-300"
                          style={{ color: `hsl(var(--${division.cssVar}))` }}
                        >
                          {division.slug}.
                        </span>
                      </span>
                      <ArrowRight
                        className="w-4 h-4 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                        style={{ color: `hsl(var(--${division.cssVar}))` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Nav items — mobile */}
            <div
              className={cn(
                'md:hidden flex flex-col gap-3 mb-10 transition-all duration-700',
                isOverlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: isOverlayOpen ? '400ms' : '0ms' }}
            >
              {navItems.filter(i => !i.hasOverlay).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'text-xl font-bold tracking-tight transition-colors',
                    location.pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Contact strip */}
            <div
              className={cn(
                'flex flex-col md:flex-row md:items-center gap-5 md:gap-8 pt-6 border-t border-border/20 transition-all duration-700',
                isOverlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: isOverlayOpen ? '500ms' : '0ms' }}
            >
              <a href="tel:+97143477519" className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <Phone className="w-4 h-4 text-primary/70" />
                +971 4 3477519
              </a>
              <a href="mailto:info@hox.ae" className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary/70" />
                info@hox.ae
              </a>
              <a
                href="https://wa.me/971588950056?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20HOX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-[#25D366] text-white rounded-sm hover:bg-[#20BD5A] transition-colors w-fit"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
