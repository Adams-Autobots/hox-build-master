import { useEffect } from 'react';

// This component redirects to the sitemap edge function
export default function SitemapPage() {
  useEffect(() => {
    // Redirect to the edge function that generates the sitemap
    window.location.href = `https://ptsofbnopjrbgtlmvrbk.supabase.co/functions/v1/sitemap?baseUrl=${encodeURIComponent(window.location.origin)}`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecting to sitemap...</p>
    </div>
  );
}
