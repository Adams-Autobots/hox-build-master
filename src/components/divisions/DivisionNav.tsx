import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Presentation, Calendar, ShoppingBag, Home } from 'lucide-react';
import type { Division } from '@/hooks/useGalleryImages';

const divisions: { key: Division; label: string; route: string; icon: typeof Presentation }[] = [
  { key: 'exhibitions', label: 'Exhibitions', route: '/divisions/exhibitions', icon: Presentation },
  { key: 'events', label: 'Events', route: '/divisions/events', icon: Calendar },
  { key: 'retail', label: 'Retail', route: '/divisions/retail', icon: ShoppingBag },
  { key: 'interiors', label: 'Interiors', route: '/divisions/interiors', icon: Home },
];

const divisionColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))] hover:bg-[hsl(var(--hox-red)/0.1)]',
  events: 'text-[hsl(var(--hox-blue))] hover:bg-[hsl(var(--hox-blue)/0.1)]',
  retail: 'text-[hsl(var(--hox-orange))] hover:bg-[hsl(var(--hox-orange)/0.1)]',
  interiors: 'text-[hsl(var(--hox-green))] hover:bg-[hsl(var(--hox-green)/0.1)]',
};

const divisionActiveBg: Record<Division, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red))] text-white',
  events: 'bg-[hsl(var(--hox-blue))] text-white',
  retail: 'bg-[hsl(var(--hox-orange))] text-white',
  interiors: 'bg-[hsl(var(--hox-green))] text-white',
};

interface DivisionNavProps {
  currentDivision: Division;
}

export function DivisionNav({ currentDivision }: DivisionNavProps) {
  const location = useLocation();

  return (
    <nav 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      aria-label="Division navigation"
    >
      {divisions.map((division) => {
        const isActive = location.pathname === division.route;
        const Icon = division.icon;
        
        return (
          <Link
            key={division.key}
            to={division.route}
            className={cn(
              'group relative flex items-center justify-center w-12 h-12 rounded-full border border-border/50 backdrop-blur-sm transition-all duration-300',
              isActive 
                ? divisionActiveBg[division.key]
                : cn('bg-background/80', divisionColors[division.key])
            )}
            aria-label={`Go to ${division.label}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="w-5 h-5" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-medium whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              {division.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}