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

// Generate dynamic OG image URL for divisions
function getDivisionOgImageUrl(division: Division, title: string): string {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const params = new URLSearchParams({
    page: division,
    division: division,
    title: title.split('|')[0].trim(),
  });
  return `${baseUrl}/functions/v1/og-image?${params.toString()}`;
}

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

    // Use dynamic OG image for divisions
    const ogImage = getDivisionOgImageUrl(division, title);

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', window.location.href, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:alt', `${division} - HOX`, true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Cleanup function to reset title
    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [division, title, description, images]);

  return null;
}
