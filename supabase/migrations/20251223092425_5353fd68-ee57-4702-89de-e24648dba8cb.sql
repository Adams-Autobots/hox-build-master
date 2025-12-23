-- Add capability_index field to gallery_images table
-- This allows marking images as backgrounds for capability cards (0-3 for the 4 cards, null for regular gallery images)
ALTER TABLE public.gallery_images 
ADD COLUMN capability_index integer DEFAULT NULL;

-- Add a check constraint to ensure capability_index is between 0 and 3
ALTER TABLE public.gallery_images
ADD CONSTRAINT capability_index_range CHECK (capability_index IS NULL OR (capability_index >= 0 AND capability_index <= 3));

-- Add a unique constraint to ensure only one image per capability_index per division
CREATE UNIQUE INDEX unique_capability_per_division 
ON public.gallery_images (division, capability_index) 
WHERE capability_index IS NOT NULL;