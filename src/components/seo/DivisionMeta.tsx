import { useEffect } from 'react';
import { GalleryImage, Division } from '@/hooks/useGalleryImages';
import { CANONICAL_DOMAIN } from '@/lib/constants';

interface DivisionMetaProps {
  division: Division;
  title: string;
  description: string;
  images?: GalleryImage[];
  ogImage?: string;
  canonicalPath?: string;
}

const divisionKeywords: Record<Division, string> = {
  exhibitions: 'exhibition stand design, trade show booth, exhibition build, custom pavilion, expo stand UAE',
  events: 'event production, corporate events, event management, stage design, event setup Dubai',
  retail: 'retail design, shop fit-out, store design, retail interior, commercial space UAE',
  interiors: 'interior design, office fit-out, commercial interiors, workspace design, interior construction',
};

export function DivisionMeta({ division, title, description, images, ogImage, canonicalPath }: DivisionMetaProps) {
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

    setMeta('description', description);
    setMeta('keywords', divisionKeywords[division]);

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
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonicalUrl || window.location.href, true);

    const imageUrl = ogImage || (images && images.length > 0 ? images[0].src : undefined);
    if (imageUrl) {
      const absoluteImage = imageUrl.startsWith('http') ? imageUrl : `${CANONICAL_DOMAIN}${imageUrl}`;
      setMeta('og:image', absoluteImage, true);
      setMeta('og:image:alt', images?.[0]?.alt || title, true);
      setMeta('twitter:image', absoluteImage);
    }

    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [division, title, description, images, ogImage, canonicalPath]);

  return null;
}
