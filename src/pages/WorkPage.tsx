import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

const categories = ['all', 'exhibitions', 'events', 'retail', 'interiors', 'creative'];

const projects = [
  { id: 1, title: 'Mercedes-Benz Pavilion', location: 'Dubai', category: 'exhibitions', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 2, title: 'Samsung Experience Booth', location: 'GITEX Dubai', category: 'exhibitions', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' },
  { id: 3, title: 'Emaar Lifestyle Showroom', location: 'Downtown Dubai', category: 'retail', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { id: 4, title: 'Expo 2020 Activation', location: 'Dubai', category: 'events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 5, title: 'Luxury Villa Interior', location: 'Palm Jumeirah', category: 'interiors', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 6, title: 'Retail Kiosk Deployment', location: 'Dubai Mall', category: 'retail', image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80' },
  { id: 7, title: 'Corporate Event Stage', location: 'DIFC', category: 'events', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
  { id: 8, title: 'Brand Identity System', location: 'UAE', category: 'creative', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      <section className="pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="hox-brand">Our </span>
            <span className="text-primary">Projects.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A selection of projects that showcase our capabilities across all five divisions.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hox-brand',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/case-studies/${project.id}`}
                className="group relative overflow-hidden rounded-lg bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold text-foreground hox-brand group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary/10 group-hover:border-primary">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
