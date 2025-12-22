-- Add SEO fields to gallery_images table
ALTER TABLE public.gallery_images 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS seo_description text,
ADD COLUMN IF NOT EXISTS keywords text[];