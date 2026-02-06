import { useEffect } from 'react';
import { GalleryImage, Division } from '@/hooks/useGalleryImages';

interface DivisionMetaProps {
  division: Division;
  title: string;
  description: string;
  images?: GalleryImage[];
  ogImage?: string;
}

const divisionKeywords: Record<Division, string> = {
  exhibitions: 'exhibition stand design, trade show booth, exhibition build, custom pavilion, expo stand UAE',
  events: 'event production, corporate events, event management, stage design, event setup Dubai',
  retail: 'retail design, shop fit-out, store design, retail interior, commercial space UAE',
  interiors: 'interior design, office fit-out, commercial interiors, workspace design, interior construction',
};

export function DivisionMeta({ division, title, description, images, ogImage }: DivisionMetaProps) {
  useEffect(() => {
    // Set title
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
    setMeta('keywords', divisionKeywords[division]);

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', window.location.href, true);

    // Set OG image from custom prop, or fallback to first gallery image
    const imageUrl = ogImage || (images && images.length > 0 ? images[0].src : undefined);
    if (imageUrl) {
      const absoluteImage = imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`;
      setMeta('og:image', absoluteImage, true);
      setMeta('og:image:alt', images?.[0]?.alt || title, true);
      setMeta('twitter:image', absoluteImage);
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [division, title, description, images, ogImage]);

  return null;
}
