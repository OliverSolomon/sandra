-- Run this in your Supabase SQL editor to set up the required tables and storage.

-- 1. Tributes table
create table if not exists public.tributes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text,
  message text not null,
  photo_url text,
  is_anonymous boolean default false,
  created_at timestamptz default now()
);
alter table public.tributes enable row level security;
create policy "Public read tributes" on public.tributes for select using (true);
create policy "Anyone can insert tributes" on public.tributes for insert with check (true);

-- 2. Gallery images table
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_url text not null,
  alt_text text,
  created_at timestamptz default now()
);
alter table public.gallery_images enable row level security;
create policy "Public read gallery" on public.gallery_images for select using (true);
create policy "Anyone can insert gallery images" on public.gallery_images for insert with check (true);

-- 3. Storage bucket
-- Go to: Supabase Dashboard → Storage → New bucket
-- Name: gallery-photos  |  Public bucket: YES
--
-- Then run the storage policies below so visitors can upload and view photos.
-- Without these, uploads fail with: "new row violates row-level security policy" (403).

-- Allow anyone to upload into the gallery-photos bucket.
create policy "Anyone can upload gallery photos"
  on storage.objects for insert to public
  with check (bucket_id = 'gallery-photos');

-- Allow anyone to read objects in the gallery-photos bucket.
create policy "Public read gallery photos"
  on storage.objects for select to public
  using (bucket_id = 'gallery-photos');
