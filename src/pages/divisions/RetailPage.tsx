import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Store, Palette, Package, Wrench } from 'lucide-react';
import heroRetail from '@/assets/hero-retail.jpg';


const capabilities = [
  {
    icon: Store,
    title: 'Mall Activation',
    description: 'Pop-ups, kiosks and brand activations in shopping malls',
    backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
  },
  {
    icon: Package,
    title: 'Retail Displays',
    description: 'Custom display units, fixtures and visual merchandising',
    backgroundImage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop',
  },
  {
    icon: Palette,
    title: 'Exterior Signage',
    description: 'Illuminated signs, fascias and outdoor branding',
    backgroundImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop',
  },
  {
    icon: Wrench,
    title: 'Retail Interiors',
    description: 'Complete store fit-outs and retail environment design',
    backgroundImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop',
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop', alt: 'Luxury store', caption: 'Flagship store entrance', project: 'Luxury Brand' },
  { src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&auto=format&fit=crop', alt: 'Fashion retail', caption: 'Premium display fixtures', project: 'Fashion Store' },
  { src: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&auto=format&fit=crop', alt: 'Retail kiosk', caption: 'Custom brand kiosk', project: 'Brand Activation' },
  { src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop', alt: 'Shopping display', caption: 'Visual merchandising', project: 'Department Store' },
  { src: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&auto=format&fit=crop', alt: 'Boutique interior', caption: 'Boutique fit-out', project: 'Boutique' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop', alt: 'Showroom', caption: 'Product showroom', project: 'Auto Showroom' },
  { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop', alt: 'Pop-up store', caption: 'Seasonal pop-up', project: 'Pop-Up' },
  { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop', alt: 'Retail space', caption: 'Custom retail fixtures', project: 'Electronics' },
];

export default function RetailPage() {
  const { data: galleryImagesData } = useGalleryImages('retail');
  
  return (
    <Layout>
      <DivisionMeta
        division="retail"
        title="Retail Store Design & Fit-out | HOX Dubai"
        description="Turnkey retail builds from flagship stores to pop-up kiosks. Visual merchandising, custom fixtures, and multi-location rollouts in UAE."
        images={galleryImagesData}
      />
      <DivisionHero
        division="retail"
        tagline="hoxretail."
        headline="Retail spaces"
        highlightText="That convert."
        description="We build retail environments that drive foot traffic and conversions. From flagship stores to pop-up activations, every detail is designed to sell."
        ctaText="Request retail proposal"
        heroImage={heroRetail}
      />
      
      <CapabilitiesGrid
        division="retail"
        capabilities={capabilities}
      />

      <ProcessTimeline division="retail" />

      <FullPageGallery division="retail" images={galleryImages} maxImages={16} showViewAll />

      <DivisionFAQ division="retail" />
      
    </Layout>
  );
}
