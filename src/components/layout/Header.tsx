import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const divisions = [
  { name: 'Exhibitions', path: '/divisions/exhibitions', color: 'hox-red' },
  { name: 'Events', path: '/divisions/events', color: 'hox-blue' },
  { name: 'Retail', path: '/divisions/retail', color: 'hox-orange' },
  { name: 'Interiors', path: '/divisions/interiors', color: 'hox-green' },
];

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Divisions', path: '/divisions', hasDropdown: true },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    setIsDivisionsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-white/[0.06] py-3 header-accent-line'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="block hover:scale-110 transition-transform duration-300"
          >
            <span className="text-3xl font-bold tracking-tight text-primary">
              h.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsDivisionsOpen(true)}
                  onMouseLeave={() => setIsDivisionsOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors hox-brand relative group',
                      location.pathname.includes('/divisions')
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-300',
                        isDivisionsOpen && 'rotate-180'
                      )}
                    />
                    {/* Active dot */}
                    <span className={cn(
                      'absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-transform duration-300',
                      location.pathname.includes('/divisions') ? 'scale-100' : 'scale-0 group-hover:scale-100'
                    )} />
                  </button>
                  
                  {/* Dropdown */}
                  <div
                    className={cn(
                      'absolute top-full left-0 pt-3 transition-all duration-300',
                      isDivisionsOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                  >
                    <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-none border-t-2 border-t-primary p-2 min-w-52">
                      {divisions.map((division, i) => (
                        <Link
                          key={division.name}
                          to={division.path}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-all duration-300 border-l-2 border-transparent hox-brand group',
                            division.color === 'hox-red' && 'hover:border-l-hox-red',
                            division.color === 'hox-blue' && 'hover:border-l-hox-blue',
                            division.color === 'hox-orange' && 'hover:border-l-hox-orange',
                            division.color === 'hox-green' && 'hover:border-l-hox-green'
                          )}
                          style={{
                            transitionDelay: isDivisionsOpen ? `${i * 50}ms` : '0ms',
                            opacity: isDivisionsOpen ? 1 : 0,
                            transform: isDivisionsOpen ? 'translateX(0)' : 'translateX(-8px)',
                          }}
                        >
                          <span
                            className={cn(
                              'w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-150',
                              division.color === 'hox-red' && 'bg-hox-red',
                              division.color === 'hox-blue' && 'bg-hox-blue',
                              division.color === 'hox-orange' && 'bg-hox-orange',
                              division.color === 'hox-green' && 'bg-hox-green'
                            )}
                          />
                          {division.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors hox-brand relative group',
                    location.pathname === item.path
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                  {/* Centered dot indicator */}
                  <span className={cn(
                    'absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-transform duration-300',
                    location.pathname === item.path ? 'scale-100' : 'scale-0 group-hover:scale-100'
                  )} />
                </Link>
              )
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsDivisionsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-foreground group"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col items-end gap-2 w-7">
          <span 
            className={cn(
              'h-px bg-foreground transition-all duration-300 origin-right',
              isOpen ? 'w-7 rotate-[-45deg] translate-y-[5px]' : 'w-7 group-hover:w-5'
            )} 
          />
          <span 
            className={cn(
              'h-px bg-foreground transition-all duration-300',
              isOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-7'
            )} 
          />
          <span 
            className={cn(
              'h-px bg-foreground transition-all duration-300 origin-right',
              isOpen ? 'w-7 rotate-[45deg] -translate-y-[5px]' : 'w-7 group-hover:w-4'
            )} 
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-background transition-all duration-500 z-[60] header-accent-line',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-6 pt-32 pb-12 h-full overflow-auto">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <div 
                key={item.name}
                className={cn(
                  'transition-all duration-500',
                  isOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                )}
                style={{ transitionDelay: isOpen ? `${index * 75}ms` : '0ms' }}
              >
                {item.hasDropdown ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsDivisionsOpen(!isDivisionsOpen)}
                      className="flex items-center gap-3 text-4xl font-bold text-muted-foreground hover:text-foreground transition-colors hox-brand"
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
                        'pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-500',
                        isDivisionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      {divisions.map((division) => (
                        <Link
                          key={division.name}
                          to={division.path}
                          className="flex items-center gap-4 text-2xl text-muted-foreground hover:text-foreground transition-colors hox-brand group"
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
                          {division.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      'block text-4xl font-bold transition-colors hox-brand group',
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
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p className="text-muted-foreground text-sm mb-2">get in touch</p>
            <a href="mailto:info@hox.ae" className="text-xl text-foreground hover:text-primary transition-colors">
              info@hox.ae
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
