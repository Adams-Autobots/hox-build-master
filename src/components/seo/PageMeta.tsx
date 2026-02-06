import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  page?: string;
}

// Generate dynamic OG image URL
function getOgImageUrl(page: string, title: string): string {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const params = new URLSearchParams({
    page,
    title: title.split('|')[0].trim(), // Use first part of title before |
  });
  return `${baseUrl}/functions/v1/og-image?${params.toString()}`;
}

export function PageMeta({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noIndex = false,
  page = 'home',
}: PageMetaProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set/update meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Standard meta tags
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    }

    // Use dynamic OG image or provided image
    const ogImage = image || getOgImageUrl(page, title);

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', window.location.href, true);
    setMeta('og:image', ogImage, true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Cleanup function to reset title
    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [title, description, keywords, image, type, noIndex, page]);

  return null;
}
