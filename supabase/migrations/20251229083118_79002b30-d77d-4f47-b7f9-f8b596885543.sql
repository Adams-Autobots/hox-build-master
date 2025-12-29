-- Add is_division_hero column to gallery_images table
ALTER TABLE public.gallery_images 
ADD COLUMN is_division_hero boolean NOT NULL DEFAULT false;

-- Create an index for quick lookups
CREATE INDEX idx_gallery_images_division_hero ON public.gallery_images (division, is_division_hero) WHERE is_division_hero = true;