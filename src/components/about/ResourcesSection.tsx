import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import skillDecorFinishes from '@/assets/skill-decor-finishes.jpg';
import skillDesignConcept from '@/assets/skill-design-concept.jpg';

const skills = [
  {
    title: 'Project Management',
    description: 'With decades of combined experience of planning and scheduling, supplier management our team accomplishes wonders.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop'
  },
  {
    title: 'Technical Planning & Drawing',
    description: 'CAD experience, and knowledge of technical requirements make us qualified, safe hands to handle your projects.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop'
  },
  {
    title: 'Value Engineering',
    description: 'Our interior designers and projects team are the best, and our attention to detail is unparalleled.',
    image: skillDecorFinishes
  },
  {
    title: 'Project Execution',
    description: 'Original and creative, our team brings your space to life, and gets the fullest potential from your project.',
    image: skillDesignConcept
  }
];

export function ResourcesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6">
            <span className="w-8 h-px bg-primary" />
            What We Do Best
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <span className="hox-brand">Our </span>
            <span className="text-primary">Skills.</span>
          </h2>
          <p className={cn(
            'mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            We have a team diverse in skills, knowledge and backgrounds. We are based in the UAE, and have completed projects across the GCC. We have been lucky to have executed over 3000+ projects, large and small for some of the biggest names on the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={cn(
                'group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg lg:text-xl font-bold mb-3 hox-brand">{skill.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
