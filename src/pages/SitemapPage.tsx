import { useEffect } from 'react';
import { CANONICAL_DOMAIN } from '@/lib/constants';

/**
 * SitemapPage - Generates and serves XML sitemap.
 * For best SEO, consider generating this at build time or via edge function.
 * This client-side approach is a fallback for SPA routing.
 */

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/divisions/exhibitions', priority: '0.9', changefreq: 'weekly' },
  { path: '/divisions/events', priority: '0.9', changefreq: 'weekly' },
  { path: '/divisions/retail', priority: '0.9', changefreq: 'weekly' },
  { path: '/divisions/interiors', priority: '0.9', changefreq: 'weekly' },
  { path: '/gallery/exhibitions', priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery/events', priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery/retail', priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery/interiors', priority: '0.7', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

export default function SitemapPage() {
  useEffect(() => {
    // Redirect to the Supabase edge function that generates proper XML
    // The edge function can also include dynamic gallery URLs
    window.location.href = `${import.meta.env.VITE_SUPABASE_URL || 'https://ptsofbnopjrbgtlmvrbk.supabase.co'}/functions/v1/sitemap?baseUrl=${encodeURIComponent(CANONICAL_DOMAIN)}`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Loading sitemap...</p>
    </div>
  );
}
