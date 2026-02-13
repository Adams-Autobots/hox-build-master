import { useEffect } from 'react';
import { CANONICAL_DOMAIN } from '@/lib/constants';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  canonicalPath?: string;
}

export function PageMeta({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noIndex = false,
  canonicalPath,
}: PageMetaProps) {
  useEffect(() => {
    document.title = title;

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

    // Canonical URL
    const canonicalUrl = canonicalPath ? `${CANONICAL_DOMAIN}${canonicalPath}` : undefined;

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', canonicalUrl || window.location.href, true);
    if (image) {
      const absoluteImage = image.startsWith('http') ? image : `${CANONICAL_DOMAIN}${image}`;
      setMeta('og:image', absoluteImage, true);
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (image) {
      const absoluteImage = image.startsWith('http') ? image : `${CANONICAL_DOMAIN}${image}`;
      setMeta('twitter:image', absoluteImage);
    }

    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [title, description, keywords, image, type, noIndex, canonicalPath]);

  return null;
}
