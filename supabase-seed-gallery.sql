-- Seed the gallery with the cherished photographs of Mary Wanjiku Chege.
-- These files are bundled with the site under /public, so the public_url values
-- are app-relative paths that work whether or not the storage bucket is used.
-- Run this in the Supabase SQL editor. created_at is ordered so the most
-- recently added photos surface first on the home page.

INSERT INTO public.gallery_images (storage_path, public_url, alt_text, created_at) VALUES
('gallery/photo-01.jpg', '/gallery/photo-01.jpg', 'Mama Njambi with her grandchild — "In loving memory of Tata Mary."', '2026-06-12 12:00:00+03'),
('gallery/photo-02.jpg', '/gallery/photo-02.jpg', 'Mary with a dear friend — "In loving memory of Mary."',              '2026-06-12 11:50:00+03'),
('gallery/photo-03.jpg', '/gallery/photo-03.jpg', 'Mary alongside her sister, December 2019.',                          '2026-06-12 11:40:00+03'),
('gallery/photo-04.jpg', '/gallery/photo-04.jpg', 'Family gathered together at the homestead.',                         '2026-06-12 11:30:00+03'),
('gallery/photo-05.jpg', '/gallery/photo-05.jpg', 'The sisters celebrating together at a family event.',                '2026-06-12 11:20:00+03'),
('memories/lasts.jpeg',  '/memories/lasts.jpeg',  'Mary at a family celebration, seated with loved ones.',              '2026-06-12 11:10:00+03'),
('cloudinary/portrait',  'https://res.cloudinary.com/djiqwujg4/image/upload/v1780859632/mary-wanjiku-chege_yzkqml.jpg', 'Mary Wanjiku Chege — her cherished portrait.', '2026-06-12 11:00:00+03'),
('memories/oldie.jpeg',  '/memories/oldie.jpeg',  'A young Mary Wanjiku — a treasured photograph from her early years.', '2026-06-12 10:50:00+03');
