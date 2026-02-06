import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/divisions/exhibitions', priority: 0.9, changefreq: 'weekly' },
  { path: '/divisions/events', priority: 0.9, changefreq: 'weekly' },
  { path: '/divisions/retail', priority: 0.9, changefreq: 'weekly' },
  { path: '/divisions/interiors', priority: 0.9, changefreq: 'weekly' },
  { path: '/gallery/exhibitions', priority: 0.8, changefreq: 'weekly' },
  { path: '/gallery/events', priority: 0.8, changefreq: 'weekly' },
  { path: '/gallery/retail', priority: 0.8, changefreq: 'weekly' },
  { path: '/gallery/interiors', priority: 0.8, changefreq: 'weekly' },
];

// Blog posts - these would ideally come from a database, but for now they're hardcoded
const blogPosts = [
  { slug: 'exhibition-design-trends-2024', date: '2024-12-15' },
  { slug: 'sustainable-event-production', date: '2024-12-08' },
  { slug: 'retail-interior-psychology', date: '2024-11-28' },
  { slug: 'custom-fabrication-excellence', date: '2024-11-15' },
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the base URL from the request or use the published URL
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://hox-build-master.lovable.app';
    
    const today = new Date().toISOString().split('T')[0];

    console.log(`Generating sitemap for baseUrl: ${baseUrl}`);

    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static routes
    for (const route of staticRoutes) {
      sitemap += `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    }

    // Add blog posts
    for (const post of blogPosts) {
      sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    sitemap += `</urlset>`;

    console.log(`Sitemap generated with ${staticRoutes.length + blogPosts.length} URLs`);

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
