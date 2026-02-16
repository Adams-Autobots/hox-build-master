import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { ArrowLeft } from 'lucide-react';

/**
 * BlogPostPage - No CMS connected yet.
 * Redirects to blog listing page until content infrastructure is in place.
 */
export default function BlogPostPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <PageMeta
        title="Blog Post | HOX"
        description="Insights and stories from HOX Creative Productions."
        canonicalPath="/blog"
      />
      <section className="pt-32 pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Content Coming Soon</h1>
          <p className="text-muted-foreground mb-8">
            This article is not yet available. We're working on bringing you fresh insights.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </section>
    </Layout>
  );
}
