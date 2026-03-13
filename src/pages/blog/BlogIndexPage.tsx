import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { blogPosts } from '@/data/blogPosts';

const categoryColors: Record<string, string> = {
  Exhibitions: 'text-hox-red',
  Events: 'text-hox-blue',
  Retail: 'text-hox-orange',
  Interiors: 'text-hox-green',
};

export default function BlogIndexPage() {
  return (
    <Layout>
      <PageMeta
        title="Insights & Guides | HOX Creative | Exhibition & Event Production Dubai"
        description="Practical guides on exhibition stand costs, event production, interior fit-outs, and retail design in Dubai. Expert insights from 18+ years of production experience."
        keywords="exhibition stand guide dubai, event production tips, interior fitout guide dubai, trade show advice"
        canonicalPath="/blog"
        type="website"
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 lg:mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="text-primary">Insights</span> & Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Practical knowledge from 18+ years of building exhibitions, events, and interiors across the UAE.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-card rounded-lg border border-border overflow-hidden hover:border-border/60 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-medium uppercase tracking-wider ${categoryColors[post.category] || 'text-primary'}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
