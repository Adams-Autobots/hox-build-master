import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Mail, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const divisions = [
  { name: 'Exhibitions', slug: 'exhibitions', path: '/divisions/exhibitions', color: 'hox-red', wordmark: 'hoxexhibitions.' },
  { name: 'Events', slug: 'events', path: '/divisions/events', color: 'hox-blue', wordmark: 'hoxevents.' },
  { name: 'Retail', slug: 'retail', path: '/divisions/retail', color: 'hox-orange', wordmark: 'hoxretail.' },
  { name: 'Interiors', slug: 'interiors', path: '/divisions/interiors', color: 'hox-green', wordmark: 'hoxinteriors.' },
];

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Divisions', path: '/divisions', hasOverlay: true },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

// Fetch division hero images for the overlay
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
        if (!imageMap[img.division]) {
          imageMap[img.division] = img.src;
        }
      });
      return imageMap;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);
  const location = useLocation();
  const { data: heroImages } = useDivisionHeroImages();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close overlay on route change
  useEffect(() => {
    setIsOverlayOpen(false);
  }, [location]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOverlayOpen]);

  const toggleOverlay = useCallback(() => {
    setIsOverlayOpen(prev => !prev);
    setHoveredDivision(null);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isOverlayOpen
            ? 'bg-transparent py-6'
            : isScrolled
              ? 'bg-background/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
              : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo — full wordmark on desktop, h. on mobile/scrolled */}
            <Link to="/" className="block hover:opacity-80 transition-opacity duration-300 relative z-[70]">
              {/* Desktop: full wordmark when not scrolled */}
              <span className={cn(
                'hidden md:inline-block font-bold tracking-tight transition-all duration-500',
                isScrolled ? 'text-2xl' : 'text-2xl'
              )}>
                <span className={cn(
                  'transition-all duration-500',
                  isScrolled ? 'hidden' : 'inline'
                )}>
                  <span className="text-primary">hox</span>
                  <span className="text-foreground">creative</span>
                  <span className="text-primary">.</span>
                </span>
                <span className={cn(
                  'text-primary transition-all duration-500',
                  isScrolled ? 'inline' : 'hidden'
                )}>
                  h.
                </span>
              </span>
              {/* Mobile: always h. */}
              <span className="md:hidden text-3xl font-bold tracking-tight text-primary">
                h.
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
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
                      'absolute -bottom-2 left-0 right-0 h-px bg-primary transition-transform duration-300 origin-left',
                      isOverlayOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )} />
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
                      'absolute -bottom-2 left-0 right-0 h-px bg-primary transition-transform duration-300 origin-left',
                      location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )} />
                  </Link>
                )
              ))}
              {/* Persistent CTA */}
              <Link
                to="/contact"
                className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide text-primary border border-primary/40 rounded-sm hover:border-primary hover:shadow-[0_0_20px_hsl(355_100%_50%/0.3)] transition-all duration-300"
              >
                Start a Project
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile: Hamburger */}
            <button
              onClick={toggleOverlay}
              className="md:hidden relative p-2 text-foreground group z-[70]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end gap-2 w-7">
                <span className={cn(
                  'h-px bg-foreground transition-all duration-300 origin-right',
                  isOverlayOpen ? 'w-7 rotate-[-45deg] translate-y-[5px]' : 'w-7 group-hover:w-5'
                )} />
                <span className={cn(
                  'h-px bg-foreground transition-all duration-300',
                  isOverlayOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-7'
                )} />
                <span className={cn(
                  'h-px bg-foreground transition-all duration-300 origin-right',
                  isOverlayOpen ? 'w-7 rotate-[45deg] -translate-y-[5px]' : 'w-7 group-hover:w-4'
                )} />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* ========== FULL-SCREEN OVERLAY ========== */}
      <div
        className={cn(
          'fixed inset-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]',
          isOverlayOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Background — solid dark with subtle division-coloured image */}
        <div className="absolute inset-0 bg-background">
          {/* Hovered division hero image — fades in/out */}
          {divisions.map((division) => {
            const src = heroImages?.[division.slug];
            if (!src) return null;
            return (
              <div
                key={division.slug}
                className={cn(
                  'absolute inset-0 transition-opacity duration-700',
                  hoveredDivision === division.slug ? 'opacity-15' : 'opacity-0'
                )}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-background/80" />
        </div>

        {/* Close button — top right */}
        <button
          onClick={toggleOverlay}
          className="absolute top-6 right-6 lg:right-12 z-[70] p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Division Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
              {divisions.map((division, index) => (
                <Link
                  key={division.slug}
                  to={division.path}
                  className="group relative"
                  onMouseEnter={() => setHoveredDivision(division.slug)}
                  onMouseLeave={() => setHoveredDivision(null)}
                  style={{
                    transitionDelay: isOverlayOpen ? `${150 + index * 75}ms` : '0ms',
                  }}
                >
                  <div className={cn(
                    'transition-all duration-700',
                    isOverlayOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: isOverlayOpen ? `${150 + index * 75}ms` : '0ms' }}
                  >
                    {/* Division hero image thumbnail */}
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 border border-border/30 group-hover:border-current transition-colors duration-300"
                      style={{ '--tw-border-opacity': '0.4' } as React.CSSProperties}
                    >
                      {heroImages?.[division.slug] ? (
                        <img
                          src={heroImages[division.slug]}
                          alt={`HOX ${division.name}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      
                      {/* Colour accent line at top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                        style={{ backgroundColor: `hsl(var(--${division.color}))` }}
                      />
                    </div>

                    {/* Division wordmark */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl font-bold tracking-tight">
                        <span className="text-foreground">hox</span>
                        <span
                          className="transition-colors duration-300"
                          style={{ color: `hsl(var(--${division.color}))` }}
                        >
                          {division.slug}.
                        </span>
                      </span>
                      <ArrowRight
                        className="w-4 h-4 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        style={{ color: `hsl(var(--${division.color}))` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Other nav items — shown on mobile overlay */}
            <div className={cn(
              'md:hidden flex flex-col gap-4 mb-12 transition-all duration-700',
              isOverlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: isOverlayOpen ? '500ms' : '0ms' }}
            >
              {navItems.filter(i => !i.hasOverlay).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'text-2xl font-bold tracking-tight transition-colors',
                    location.pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Contact strip */}
            <div className={cn(
              'flex flex-col md:flex-row md:items-center gap-6 md:gap-10 pt-8 border-t border-border/30 transition-all duration-700',
              isOverlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: isOverlayOpen ? '600ms' : '0ms' }}
            >
              <a href="tel:+971588950056" className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+971 58 895 0056</span>
              </a>
              <a href="mailto:info@hox.ae" className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">info@hox.ae</span>
              </a>
              <a
                href="https://wa.me/971588950056?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20HOX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#25D366] text-white rounded-sm hover:bg-[#20BD5A] transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
