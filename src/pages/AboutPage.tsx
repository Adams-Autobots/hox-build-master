import { Layout } from '@/components/layout/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { LeadershipSection } from '@/components/about/LeadershipSection';
import { ResourcesSection } from '@/components/about/ResourcesSection';

const milestones = [
  { year: '2008', title: 'Founded in Dubai', desc: 'Started as a small fabrication workshop' },
  { year: '2012', title: 'First Major Pavilion', desc: 'Delivered our first large-scale exhibition' },
  { year: '2016', title: 'Multi-Division Expansion', desc: 'Launched retail and interiors divisions' },
  { year: '2020', title: 'Expo 2020 Partner', desc: 'Delivered multiple pavilions and activations' },
  { year: '2024', title: '3000+ Projects', desc: 'Continuing to set new standards' },
];

export default function AboutPage() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Layout>
      <section className="pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6">
              <span className="w-8 h-px bg-primary" />
              About hox
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="hox-brand">Production </span>
              <span className="text-primary">Excellence</span>
              <br />
              <span className="text-muted-foreground/60">since 2008.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              We are a Dubai-born production powerhouse that has grown from a small fabrication workshop 
              into a multi-division company serving the region's most demanding clients.
            </p>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <h2 className={cn('text-4xl md:text-5xl font-bold leading-tight mb-8 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
                <span className="hox-brand">Our </span>
                <span className="text-primary">Story.</span>
              </h2>

              <div className={cn('space-y-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-150', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                <p>
                  HOX was founded with a simple belief: that great production requires complete control 
                  over every stage of the process. From day one, we invested in building in-house 
                  capabilities that would allow us to deliver without compromise.
                </p>
                <p>
                  Today, we operate a state-of-the-art facility in Al Quoz with dedicated workshops 
                  for metal fabrication, carpentry, CNC machining, and finishing. Our team of 200+ 
                  specialists handles everything from design to installation.
                </p>
                <p>
                  We've partnered with global brands, leading developers, and creative agencies to 
                  deliver some of the region's most memorable builds — from Expo 2020 pavilions to 
                  luxury retail environments.
                </p>
              </div>
            </div>

            <div>
              <h3 className={cn('text-2xl font-bold mb-8 hox-brand transition-all duration-700 delay-300', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>Milestones</h3>
              <div className="space-y-6">
                {milestones.map((item, index) => (
                  <div
                    key={item.year}
                    className={cn('flex gap-6 p-6 rounded-lg bg-background border border-border transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <span className="text-3xl font-bold text-primary">{item.year}</span>
                    <div>
                      <h4 className="font-bold text-foreground hox-brand">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResourcesSection />
      <LeadershipSection />
    </Layout>
  );
}
