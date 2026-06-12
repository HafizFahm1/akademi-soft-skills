
-- Allow admins to upload/update/delete files in the media bucket
CREATE POLICY "Admins manage media" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Allow anyone (anon + authenticated) to read media files (needed for signed URLs in public website)
CREATE POLICY "Public read media" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'media');
