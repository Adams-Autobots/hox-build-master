import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const caseStudies = [
  { id: 1, title: 'Mercedes-Benz Pavilion', location: 'Dubai', category: 'Exhibition', description: 'Premium exhibition build with integrated lighting, structural engineering, and brand storytelling.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 2, title: 'Samsung Experience Booth', location: 'GITEX Dubai', category: 'Exhibition', description: 'Interactive technology showcase with custom fabrication and immersive displays.', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' },
  { id: 3, title: 'Emaar Lifestyle Showroom', location: 'Downtown Dubai', category: 'Retail', description: 'High-end retail environment with bespoke joinery and premium finishes.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { id: 4, title: 'Expo 2020 Activation', location: 'Dubai', category: 'Events', description: 'Large-scale event activation with structural builds and experiential zones.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
];

export default function CaseStudiesPage() {
  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="hox-brand">case studies.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Deep dives into our most impactful projects — the challenges, solutions, and outcomes.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.id}`}
                className="group grid md:grid-cols-2 gap-8 items-center p-6 lg:p-8 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-500"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">{study.category}</span>
                  <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 hox-brand group-hover:text-primary transition-colors">{study.title}</h2>
                  <p className="text-muted-foreground mb-2">{study.location}</p>
                  <p className="text-muted-foreground mb-6">{study.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
