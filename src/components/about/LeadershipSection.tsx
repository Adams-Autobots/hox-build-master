import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const leadership: TeamMember[] = [
  {
    name: 'Ahmed Al Rashid',
    role: 'Founder & CEO',
    bio: 'With 20+ years in the production industry, Ahmed founded HOX with a vision to bring international-grade fabrication to the UAE.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&crop=face',
    linkedin: '#',
    email: 'ahmed@hox.ae',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    bio: 'Former agency creative lead with 15 years experience, Sarah drives the design vision across all HOX divisions.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&crop=face',
    linkedin: '#',
    email: 'sarah@hox.ae',
  },
  {
    name: 'James Chen',
    role: 'Head of Production',
    bio: 'Engineering background with expertise in large-scale fabrication. James oversees our 12,000sqm production facility.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&crop=face',
    linkedin: '#',
    email: 'james@hox.ae',
  },
  {
    name: 'Fatima Hassan',
    role: 'Director of Operations',
    bio: 'Logistics and project management expert ensuring seamless delivery across 50+ concurrent projects.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&crop=face',
    linkedin: '#',
    email: 'fatima@hox.ae',
  },
];

const stats = [
  { value: '200+', label: 'Team Members' },
  { value: '12,000', label: 'sqm Facility' },
  { value: '50+', label: 'Active Projects' },
  { value: '15+', label: 'Nationalities' },
];

export function LeadershipSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <>
      {/* Leadership Team */}
      <section ref={ref} className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span
              className={cn(
                'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="w-8 h-px bg-primary" />
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
              and operational excellence.
            </p>
          </div>

          {/* Team Grid */}
          <div ref={teamRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <div
                key={member.name}
                className={cn(
                  'group relative transition-all duration-500',
                  teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'text-center transition-all duration-500',
                  teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <span className="block text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
