import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CapabilitiesGridProps {
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
  capabilities: Capability[];
}

const divisionBorders = {
  exhibitions: 'hover:border-hox-red/50',
  events: 'hover:border-hox-blue/50',
  retail: 'hover:border-hox-orange/50',
  interiors: 'hover:border-hox-green/50',
};

const divisionIconColors = {
  exhibitions: 'text-hox-red',
  events: 'text-hox-blue',
  retail: 'text-hox-orange',
  interiors: 'text-hox-green',
};

export function CapabilitiesGrid({ division, capabilities }: CapabilitiesGridProps) {
  const borderClass = divisionBorders[division];
  const iconColor = divisionIconColors[division];

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={cn('inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-4', iconColor)}>
            <span className="w-8 h-px bg-current" />
            Capabilities
            <span className="w-8 h-px bg-current" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold"><span className="hox-brand">What we </span><span className={iconColor}>Deliver.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className={cn(
                'p-8 rounded-lg bg-background border border-border transition-all duration-500',
                borderClass
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <capability.icon className={cn('w-10 h-10 mb-6', iconColor)} />
              <h3 className="text-lg font-bold mb-3 hox-brand text-foreground">
                {capability.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
