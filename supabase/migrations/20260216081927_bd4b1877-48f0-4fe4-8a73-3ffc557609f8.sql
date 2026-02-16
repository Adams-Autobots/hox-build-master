
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. RLS policy: only admins can read user_roles
CREATE POLICY "Admins can read user_roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 5. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 6. Drop old gallery_images write policies
DROP POLICY IF EXISTS "Authenticated users can insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON public.gallery_images;

-- 7. Create admin-only gallery_images write policies
CREATE POLICY "Only admins can insert gallery images"
ON public.gallery_images FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update gallery images"
ON public.gallery_images FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete gallery images"
ON public.gallery_images FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Drop old storage write policies
DROP POLICY IF EXISTS "Authenticated users can upload gallery photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery photos" ON storage.objects;

-- 9. Create admin-only storage write policies
CREATE POLICY "Only admins can upload gallery photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallery-photos' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Only admins can update gallery photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'gallery-photos' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Only admins can delete gallery photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallery-photos' AND
  public.has_role(auth.uid(), 'admin')
);
