import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const resources = [
  {
    title: 'Joinery & Production',
    description: 'Our workshop is where the magic happens. Come and visit us to have a tour and see how we get your job done.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop'
  },
  {
    title: 'Storage & Logistics',
    description: 'Able to manage large projects, rebuilds and ongoing contracts. HOX is the choice to get it there on time, and in shape.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop'
  },
  {
    title: 'Technical Works',
    description: 'An experienced and knowledgeable team with up to date materials and methods make the difference in ensuring your project meets the highest standard.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop'
  },
  {
    title: 'Design & Project Management',
    description: 'From detailed drawings and 3D visualisations to hands-on project management, our in-house team ensures every project is clearly planned and seamlessly delivered.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&h=600&fit=crop'
  }
];

export function ResourcesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6">
            <span className="w-8 h-px bg-primary" />
            What We Offer
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <span className="hox-brand">Our </span>
            <span className="text-primary">Resources.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <div
              key={resource.title}
              className={cn(
                'group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold mb-3 hox-brand">{resource.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
