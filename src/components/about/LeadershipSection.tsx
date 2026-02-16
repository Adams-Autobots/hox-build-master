import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

/**
 * LeadershipSection - Currently a placeholder.
 * TODO: Replace with real team data once headshots and bios are provided.
 * Do NOT use stock photos or fabricated names.
 */
export function LeadershipSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
            Leadership
          </span>

          <h2
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">The people behind the </span>
            <span className="text-primary">Builds.</span>
          </h2>

          <p
            className={cn(
              'text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            Our leadership team combines decades of production experience with creative vision
            and operational excellence. Founded by Adam, HOX has grown from a small workshop
            into a multi-division production powerhouse.
          </p>
        </div>

        {/* Team content intentionally omitted until real data is available */}
      </div>
    </section>
  );
}
