-- Add is_featured column to gallery_images table
ALTER TABLE public.gallery_images 
ADD COLUMN is_featured boolean NOT NULL DEFAULT false;

-- Add index for faster featured image queries
CREATE INDEX idx_gallery_images_featured ON public.gallery_images (is_featured) WHERE is_featured = true;