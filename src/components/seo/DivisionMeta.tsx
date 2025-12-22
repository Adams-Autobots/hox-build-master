import { useEffect } from 'react';
import { GalleryImage, Division } from '@/hooks/useGalleryImages';

interface DivisionMetaProps {
  division: Division;
  title: string;
  description: string;
  images?: GalleryImage[];
}

const divisionKeywords: Record<Division, string> = {
  exhibitions: 'exhibition stand design, trade show booth, exhibition build, custom pavilion, expo stand UAE',
  events: 'event production, corporate events, event management, stage design, event setup Dubai',
  retail: 'retail design, shop fit-out, store design, retail interior, commercial space UAE',
  interiors: 'interior design, office fit-out, commercial interiors, workspace design, interior construction',
};

export function DivisionMeta({ division, title, description, images }: DivisionMetaProps) {
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

    // Set OG image from first gallery image
    if (images && images.length > 0) {
      setMeta('og:image', images[0].src, true);
      setMeta('og:image:alt', images[0].alt, true);
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (images && images.length > 0) {
      setMeta('twitter:image', images[0].src);
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [division, title, description, images]);

  return null;
}
