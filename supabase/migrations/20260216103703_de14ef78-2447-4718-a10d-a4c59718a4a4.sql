
-- Create public storage bucket for site assets (videos, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read access for site-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Only admins can upload/modify
CREATE POLICY "Admin upload to site-assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update site-assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete site-assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
