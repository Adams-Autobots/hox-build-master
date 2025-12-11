import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDivisionsOpen(true)}
                    onMouseLeave={() => setIsDivisionsOpen(false)}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hox-brand',
                        location.pathname.includes('/divisions')
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-300',
                          isDivisionsOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={cn(
                        'absolute top-full left-0 pt-4 transition-all duration-300',
                        isDivisionsOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}
                    >
                      <div className="glass rounded-lg p-2 min-w-[200px]">
                        {divisions.map((division) => (
                          <Link
                            key={division.name}
                            to={division.path}
                            className={cn(
                              'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 hox-brand',
                              'hover:bg-foreground/5 group'
                            )}
                          >
                            <span
                              className={cn(
                                'w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150',
                                division.color === 'hox-red' && 'bg-hox-red',
                                division.color === 'hox-blue' && 'bg-hox-blue',
                                division.color === 'hox-orange' && 'bg-hox-orange',
                                division.color === 'hox-green' && 'bg-hox-green',
                                division.color === 'hox-white' && 'bg-hox-white'
                              )}
                            />
                            <span className="text-muted-foreground group-hover:text-foreground">
                              hox{division.name}.
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      'relative text-sm font-medium tracking-wide transition-colors duration-300 hox-brand group',
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="sm" asChild>
              <Link to="/contact">request proposal</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-[72px] bg-background/98 backdrop-blur-xl transition-all duration-500 z-40',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div className="space-y-4">
                    <span className="text-lg font-medium text-muted-foreground hox-brand">
                      {item.name}
                    </span>
                    <div className="pl-4 flex flex-col gap-3">
                      {divisions.map((division) => (
                        <Link
                          key={division.name}
                          to={division.path}
                          className="flex items-center gap-3 text-foreground hox-brand"
                        >
                          <span
                            className={cn(
                              'w-2 h-2 rounded-full',
                              division.color === 'hox-red' && 'bg-hox-red',
                              division.color === 'hox-blue' && 'bg-hox-blue',
                              division.color === 'hox-orange' && 'bg-hox-orange',
                              division.color === 'hox-green' && 'bg-hox-green',
                              division.color === 'hox-white' && 'bg-hox-white'
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
                      'text-lg font-medium transition-colors hox-brand',
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 border-t border-border">
              <Button variant="hero" className="w-full" asChild>
                <Link to="/contact">request proposal</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
