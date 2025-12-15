import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const divisions = [
  { name: 'exhibitions', path: '/divisions/exhibitions', color: 'hox-red' },
  { name: 'events', path: '/divisions/events', color: 'hox-blue' },
  { name: 'retail', path: '/divisions/retail', color: 'hox-orange' },
  { name: 'interiors', path: '/divisions/interiors', color: 'hox-green' },
];

const navItems = [
  { name: 'work', path: '/work' },
  { name: 'divisions', path: '/divisions', hasDropdown: true },
  { name: 'about', path: '/about' },
  { name: 'case studies', path: '/case-studies' },
  { name: 'contact', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDivisionsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group relative"
          >
            <span className="text-2xl font-bold tracking-tight text-foreground hox-brand">
              hox<span className="text-primary">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative p-2 text-foreground group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-end gap-1.5 w-7">
              <span 
                className={cn(
                  'h-0.5 bg-foreground transition-all duration-300 origin-right',
                  isMobileMenuOpen ? 'w-7 rotate-[-45deg] translate-y-[3px]' : 'w-7 group-hover:w-5'
                )} 
              />
              <span 
                className={cn(
                  'h-0.5 bg-foreground transition-all duration-300',
                  isMobileMenuOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-7'
                )} 
              />
              <span 
                className={cn(
                  'h-0.5 bg-foreground transition-all duration-300 origin-right',
                  isMobileMenuOpen ? 'w-7 rotate-[45deg] -translate-y-[3px]' : 'w-7 group-hover:w-4'
                )} 
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Full-screen Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-0 bg-background/98 backdrop-blur-xl transition-all duration-500 z-40',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 pt-32 pb-12 h-full overflow-auto">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <div 
                key={item.name}
                className={cn(
                  'transition-all duration-500',
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
              >
                {item.hasDropdown ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsDivisionsOpen(!isDivisionsOpen)}
                      className="flex items-center gap-3 text-4xl md:text-6xl lg:text-7xl font-bold text-muted-foreground hover:text-foreground transition-colors hox-brand"
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          'w-8 h-8 transition-transform duration-300',
                          isDivisionsOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    <div 
                      className={cn(
                        'pl-4 md:pl-8 flex flex-col gap-2 overflow-hidden transition-all duration-500',
                        isDivisionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      {divisions.map((division) => (
                        <Link
                          key={division.name}
                          to={division.path}
                          className="flex items-center gap-4 text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors hox-brand group"
                        >
                          <span
                            className={cn(
                              'w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-150',
                              division.color === 'hox-red' && 'bg-hox-red',
                              division.color === 'hox-blue' && 'bg-hox-blue',
                              division.color === 'hox-orange' && 'bg-hox-orange',
                              division.color === 'hox-green' && 'bg-hox-green'
                            )}
                          />
                          hox{division.name}.
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      'block text-4xl md:text-6xl lg:text-7xl font-bold transition-colors hox-brand group',
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Info at bottom */}
          <div 
            className={cn(
              'mt-16 pt-8 border-t border-border/30 transition-all duration-700 delay-500',
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p className="text-muted-foreground text-sm mb-2">get in touch</p>
            <a href="mailto:hello@hox.ae" className="text-xl md:text-2xl text-foreground hover:text-primary transition-colors">
              hello@hox.ae
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
