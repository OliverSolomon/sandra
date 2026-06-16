-- FIX: "new row violates row-level security policy" when uploading photos.
--
-- Your `gallery-photos` bucket exists, but Supabase blocks uploads until a
-- storage policy permits them. Run this whole file in the Supabase SQL editor
-- (Dashboard → SQL Editor → New query → paste → Run).
--
-- Make sure the bucket is PUBLIC: Dashboard → Storage → gallery-photos →
-- (⋯) → Edit bucket → toggle "Public bucket" ON.

-- Allow anyone to upload into the gallery-photos bucket.
create policy "Anyone can upload gallery photos"
  on storage.objects for insert to public
  with check (bucket_id = 'gallery-photos');

-- Allow anyone to read objects from the gallery-photos bucket.
create policy "Public read gallery photos"
  on storage.objects for select to public
  using (bucket_id = 'gallery-photos');

-- If you ever need to re-run this file, drop the old policies first:
--   drop policy "Anyone can upload gallery photos" on storage.objects;
--   drop policy "Public read gallery photos" on storage.objects;
