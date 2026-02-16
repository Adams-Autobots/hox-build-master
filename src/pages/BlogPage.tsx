import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { HoverText } from '@/components/ui/HoverText';

/**
 * BlogPage - Currently no CMS or content source connected.
 * TODO: Integrate with Supabase or headless CMS for real blog content.
 * Do NOT hardcode fake articles with stock imagery.
 */
export default function BlogPage() {
  return (
    <Layout>
      <PageMeta
        title="Blog | HOX Insights | Production & Design Trends"
        description="Insights, trends, and stories from HOX. Read about exhibition design, event production, retail interiors, and fabrication excellence."
        keywords="hox blog, exhibition design trends, event production tips, retail design insights"
        canonicalPath="/blog"
      />
      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="hox-brand"><HoverText>Our</HoverText> </span>
            <span className="text-primary"><HoverText>Blog.</HoverText></span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-16">
            Insights, trends, and stories from the world of production excellence.
          </p>

          <div className="text-center py-24 border border-border rounded-lg bg-card">
            <p className="text-lg text-muted-foreground">
              New content coming soon.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
