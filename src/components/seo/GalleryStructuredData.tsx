import { GalleryImage, Division } from '@/hooks/useGalleryImages';

interface GalleryStructuredDataProps {
  division: Division;
  images: GalleryImage[];
  pageUrl: string;
}

const divisionNames: Record<Division, string> = {
  exhibitions: 'Exhibition Design & Build',
  events: 'Event Production & Management',
  retail: 'Retail Design & Fit-out',
  interiors: 'Interior Design & Construction',
};

export function GalleryStructuredData({ division, images, pageUrl }: GalleryStructuredDataProps) {
  if (!images || images.length === 0) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${divisionNames[division]} Portfolio - HOX`,
    description: `View our ${division} project gallery showcasing exceptional design and build work.`,
    url: pageUrl,
    image: images.map((img, index) => ({
      '@type': 'ImageObject',
      contentUrl: img.src,
      name: img.title || img.alt,
      description: img.seo_description || img.caption || img.alt,
      caption: img.caption,
      position: index + 1,
      ...(img.keywords && img.keywords.length > 0 && {
        keywords: img.keywords.join(', '),
      }),
      ...(img.project && {
        associatedMedia: {
          '@type': 'CreativeWork',
          name: img.project,
        },
      }),
    })),
    numberOfItems: images.length,
    provider: {
      '@type': 'Organization',
      name: 'HOX',
      url: 'https://hox.ae',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
