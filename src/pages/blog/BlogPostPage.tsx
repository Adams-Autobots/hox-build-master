import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { getBlogPost, blogPosts } from '@/data/blogPosts';
import { useEffect } from 'react';
import { CANONICAL_DOMAIN } from '@/lib/constants';

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML: headings, paragraphs, bold, lists
  return content.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    
    if (trimmed.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-bold mt-8 mb-3">{trimmed.slice(4)}</h3>;
    }
    
    // Handle bold text within paragraphs
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    
    return <p key={i} className="text-base text-muted-foreground leading-relaxed mb-4">{rendered}</p>;
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  // Add structured data for article
  useEffect(() => {
    if (!post) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.metaDescription,
      image: post.heroImage,
      datePublished: post.date,
      author: {
        '@type': 'Organization',
        name: 'HOX Creative Productions',
        url: CANONICAL_DOMAIN,
      },
      publisher: {
        '@type': 'Organization',
        name: 'HOX Creative Productions',
        logo: { '@type': 'ImageObject', url: `${CANONICAL_DOMAIN}/favicon-512.png` },
      },
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">Back to insights</Link>
        </div>
      </Layout>
    );
  }

  // Get 3 related posts (same category, excluding current)
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  return (
    <Layout>
      <PageMeta
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        image={post.heroImage}
        type="article"
        canonicalPath={`/blog/${post.slug}`}
      />

      <article className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              All insights
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">{post.category}</span>
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
              <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg overflow-hidden mb-12 aspect-[21/9]"
          >
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl prose-custom"
          >
            {renderMarkdown(post.content)}
          </motion.div>

          {/* CTA */}
          <div className="max-w-3xl mt-12 p-6 lg:p-8 rounded-lg bg-card border border-border">
            <h3 className="text-lg font-bold mb-2">Need help with your next project?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We've been building exhibitions, events, and interiors across the UAE since 2008. Let's talk about what you need.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16 lg:mt-20">
              <h2 className="text-xl font-bold mb-6">More insights</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="group block bg-card rounded-lg border border-border overflow-hidden hover:border-border/60 transition-colors"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={rel.heroImage} alt={rel.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">{rel.category}</span>
                      <h3 className="text-sm font-bold mt-1 leading-snug group-hover:text-primary transition-colors">{rel.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
