import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const blogPosts = [
  { slug: 'exhibition-design-trends-2024', title: 'Exhibition Design Trends Shaping 2024', date: '15 Dec 2024', category: 'Exhibitions', excerpt: 'Explore the latest trends in exhibition design, from sustainable materials to immersive technology integrations.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { slug: 'sustainable-event-production', title: 'Sustainable Event Production: A Complete Guide', date: '8 Dec 2024', category: 'Events', excerpt: 'How leading brands are reducing environmental impact while creating memorable event experiences.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { slug: 'retail-interior-psychology', title: 'The Psychology of Retail Interior Design', date: '28 Nov 2024', category: 'Retail', excerpt: 'Understanding how spatial design influences customer behavior and drives sales conversions.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { slug: 'custom-fabrication-excellence', title: 'Custom Fabrication: From Concept to Reality', date: '15 Nov 2024', category: 'Fabrication', excerpt: 'Behind the scenes of our in-house fabrication capabilities and precision engineering processes.', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' },
];

export default function BlogPage() {
  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="hox-brand">Blog.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Insights, trends, and stories from the world of production excellence.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group grid md:grid-cols-2 gap-8 items-center p-6 lg:p-8 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-500"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">{post.category}</span>
                  <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 hox-brand group-hover:text-primary transition-colors">{post.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider">
                    Read Article
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