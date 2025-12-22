import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Division = 'exhibitions' | 'events' | 'retail' | 'interiors';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  project?: string;
  division: Division;
  display_order: number;
  // SEO fields
  title?: string;
  seo_description?: string;
  keywords?: string[];
}

export function useGalleryImages(division: Division) {
  return useQuery({
    queryKey: ['gallery-images', division],
    queryFn: async (): Promise<GalleryImage[]> => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('division', division)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }

      return (data || []).map(img => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        caption: img.caption || undefined,
        project: img.project || undefined,
        division: img.division as Division,
        display_order: img.display_order || 0,
        title: img.title || undefined,
        seo_description: img.seo_description || undefined,
        keywords: img.keywords || undefined,
      }));
    },
  });
}

// Helper to get public URL for uploaded images
export function getGalleryImageUrl(path: string): string {
  const { data } = supabase.storage.from('gallery-photos').getPublicUrl(path);
  return data.publicUrl;
}
