import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  title: string;
  location: string;
  image: string;
}

interface FeaturedCaseStudiesProps {
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
  caseStudies: CaseStudy[];
}

const divisionColors = {
  exhibitions: 'text-hox-red border-hox-red/30 hover:border-hox-red',
  events: 'text-hox-blue border-hox-blue/30 hover:border-hox-blue',
  retail: 'text-hox-orange border-hox-orange/30 hover:border-hox-orange',
  interiors: 'text-hox-green border-hox-green/30 hover:border-hox-green',
};

export function FeaturedCaseStudies({ division, caseStudies }: FeaturedCaseStudiesProps) {
  const colorClasses = divisionColors[division];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className={cn('inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4', colorClasses.split(' ')[0])}>
              <span className={cn('w-8 h-px', `bg-${division === 'exhibitions' ? 'hox-red' : division === 'events' ? 'hox-blue' : division === 'retail' ? 'hox-orange' : division === 'interiors' ? 'hox-green' : 'foreground'}`)} />
              featured work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold hox-brand">case studies.</h2>
          </div>
          <Link
            to="/case-studies"
            className={cn('hidden md:flex items-center gap-2 text-sm font-medium transition-colors', colorClasses.split(' ')[0])}
          >
            view all work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/case-studies/${study.id}`}
                className={cn(
                  'block group relative aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-500',
                  colorClasses
                )}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    {study.location}
                  </p>
                  <h3 className="text-xl font-bold hox-brand text-foreground group-hover:text-current transition-colors">
                    {study.title}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/case-studies"
          className={cn('md:hidden flex items-center justify-center gap-2 mt-8 text-sm font-medium', colorClasses.split(' ')[0])}
        >
          view all work
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
