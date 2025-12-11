import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const services = [
  'stage & set design',
  'event fabrication',
  'brand activations',
  'live experiences',
  'structural builds',
];

const whyUs = [
  { title: 'speed under pressure', desc: 'Reliable delivery even on tight timelines' },
  { title: 'creative + technical', desc: 'Design vision meets engineering precision' },
  { title: 'hybrid fabrication', desc: 'Multiple materials, one team' },
  { title: 'onsite delivery', desc: 'Professional installation crews' },
];

export default function EventsPage() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hox-blue/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-hox-blue/20 rounded-full blur-[150px]" />

        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-hox-blue" />
              <span className="text-sm font-medium tracking-widest text-hox-blue uppercase hox-brand">
                hoxevents.
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8">
              <span className="hox-brand">events built for</span>
              <br />
              <span className="text-hox-blue">unforgettable moments.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              We transform concepts into fully built event environments that engage and excite.
              From product launches to festivals — we execute with confidence.
            </p>

            <Button variant="hero" size="xl" asChild className="bg-hox-blue hover:bg-hox-blue/90 hover:shadow-[0_0_40px_hsl(196_100%_47%/0.6)]">
              <Link to="/contact">
                request events proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <span className={cn('inline-flex items-center gap-2 text-sm font-medium tracking-widest text-hox-blue uppercase mb-6 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                <span className="w-8 h-px bg-hox-blue" />
                our services
              </span>

              <h2 className={cn('text-4xl md:text-5xl font-bold leading-tight mb-8 transition-all duration-700 delay-150', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
                <span className="hox-brand">what we build.</span>
              </h2>

              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={service} className={cn('flex items-center gap-4 text-lg text-foreground transition-all duration-500', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4')} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                    <CheckCircle className="w-5 h-5 text-hox-blue flex-shrink-0" />
                    <span className="hox-brand">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {whyUs.map((item, index) => (
                <div key={item.title} className={cn('p-6 rounded-lg bg-background border border-border hover:border-hox-blue/30 transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: `${400 + index * 100}ms` }}>
                  <h3 className="text-lg font-bold mb-2 hox-brand text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
