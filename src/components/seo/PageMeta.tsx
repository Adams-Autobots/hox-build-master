import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function PageMeta({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noIndex = false,
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

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', window.location.href, true);
    if (image) {
      setMeta('og:image', image, true);
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (image) {
      setMeta('twitter:image', image);
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [title, description, keywords, image, type, noIndex]);

  return null;
}
