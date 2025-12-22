-- Create storage bucket for gallery photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-photos', 'gallery-photos', true);

-- Create storage policies for public read access
CREATE POLICY "Public can view gallery photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-photos');

-- Create storage policy for authenticated uploads
CREATE POLICY "Authenticated users can upload gallery photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-photos');

-- Create storage policy for authenticated updates
CREATE POLICY "Authenticated users can update gallery photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-photos');

-- Create storage policy for authenticated deletes
CREATE POLICY "Authenticated users can delete gallery photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-photos');

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  project TEXT,
  division TEXT NOT NULL CHECK (division IN ('exhibitions', 'events', 'retail', 'interiors')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery images
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images
FOR SELECT
USING (true);

-- Authenticated users can insert gallery images
CREATE POLICY "Authenticated users can insert gallery images"
ON public.gallery_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated users can update gallery images
CREATE POLICY "Authenticated users can update gallery images"
ON public.gallery_images
FOR UPDATE
TO authenticated
USING (true);

-- Authenticated users can delete gallery images
CREATE POLICY "Authenticated users can delete gallery images"
ON public.gallery_images
FOR DELETE
TO authenticated
USING (true);

-- Create index for faster division queries
CREATE INDEX idx_gallery_images_division ON public.gallery_images(division);
CREATE INDEX idx_gallery_images_display_order ON public.gallery_images(display_order);