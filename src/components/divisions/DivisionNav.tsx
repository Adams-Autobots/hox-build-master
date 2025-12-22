import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Division } from '@/hooks/useGalleryImages';

const divisions: { key: Division; label: string; shortLabel: string; route: string }[] = [
  { key: 'exhibitions', label: 'Exhibitions', shortLabel: 'Exh', route: '/gallery/exhibitions' },
  { key: 'events', label: 'Events', shortLabel: 'Eve', route: '/gallery/events' },
  { key: 'retail', label: 'Retail', shortLabel: 'Ret', route: '/gallery/retail' },
  { key: 'interiors', label: 'Interiors', shortLabel: 'Int', route: '/gallery/interiors' },
];

const divisionColors: Record<Division, string> = {
  exhibitions: 'hover:text-[hsl(var(--hox-red))] hover:border-[hsl(var(--hox-red))]',
  events: 'hover:text-[hsl(var(--hox-blue))] hover:border-[hsl(var(--hox-blue))]',
  retail: 'hover:text-[hsl(var(--hox-orange))] hover:border-[hsl(var(--hox-orange))]',
  interiors: 'hover:text-[hsl(var(--hox-green))] hover:border-[hsl(var(--hox-green))]',
};

const divisionActiveBg: Record<Division, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red))] text-white border-[hsl(var(--hox-red))]',
  events: 'bg-[hsl(var(--hox-blue))] text-white border-[hsl(var(--hox-blue))]',
  retail: 'bg-[hsl(var(--hox-orange))] text-white border-[hsl(var(--hox-orange))]',
  interiors: 'bg-[hsl(var(--hox-green))] text-white border-[hsl(var(--hox-green))]',
};

const divisionActiveText: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
};

interface DivisionNavProps {
  currentDivision: Division;
}

export function DivisionNav({ currentDivision }: DivisionNavProps) {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation - Right Side */}
      <nav 
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2"
        aria-label="Division navigation"
      >
        {divisions.map((division) => {
          const isActive = location.pathname === division.route;
          
          return (
            <Link
              key={division.key}
              to={division.route}
              className={cn(
                'px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 text-right',
                isActive 
                  ? divisionActiveBg[division.key]
                  : cn('bg-background/80 backdrop-blur-sm border-border/50 text-muted-foreground', divisionColors[division.key])
              )}
              aria-label={`Go to ${division.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {division.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border"
        aria-label="Division navigation"
      >
        <div className="flex justify-around items-center py-3 px-2">
          {divisions.map((division) => {
            const isActive = location.pathname === division.route;
            
            return (
              <Link
                key={division.key}
                to={division.route}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all duration-300',
                  isActive 
                    ? divisionActiveText[division.key]
                    : 'text-muted-foreground'
                )}
                aria-label={`Go to ${division.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all duration-300',
                  isActive ? divisionActiveBg[division.key] : 'bg-transparent'
                )} />
                <span className="text-xs font-medium">{division.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}