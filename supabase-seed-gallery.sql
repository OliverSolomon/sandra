-- Seed the gallery with the cherished photographs of Sandra Cheptoo Mugun.
-- These files are bundled with the site under /public, so the public_url values
-- are app-relative paths that work whether or not the storage bucket is used.
-- Run this in the Supabase SQL editor. created_at is ordered so the most
-- recently added photos surface first on the home page.

INSERT INTO public.gallery_images (storage_path, public_url, alt_text, created_at) VALUES
('sandra-portrait.jpg',   '/sandra-portrait.jpg',   'Sandra Cheptoo Mugun — her cherished portrait.',                '2026-06-15 12:00:00+03'),
('gallery/sandra-01.jpg', '/gallery/sandra-01.jpg', 'Sandra dancing — she sang and danced with all her heart.',      '2026-06-15 11:50:00+03'),
('gallery/sandra-02.jpg', '/gallery/sandra-02.jpg', 'A joyful moment shared with Mum.',                              '2026-06-15 11:40:00+03'),
('gallery/sandra-03.jpg', '/gallery/sandra-03.jpg', 'Sandra at ease — warm, present, and full of life.',             '2026-06-15 11:30:00+03'),
('gallery/sandra-04.jpg', '/gallery/sandra-04.jpg', 'Lunch out with Mum — time together she treasured.',             '2026-06-15 11:20:00+03'),
('gallery/sandra-05.jpg', '/gallery/sandra-05.jpg', 'Sharing a meal and conversation with Mum.',                     '2026-06-15 11:10:00+03'),
('gallery/sandra-06.jpg', '/gallery/sandra-06.jpg', 'Poolside with her brother — Sandra loved swimming.',            '2026-06-15 11:00:00+03'),
('gallery/sandra-07.jpg', '/gallery/sandra-07.jpg', 'A young Sandra at a fun run.',                                   '2026-06-15 10:50:00+03'),
('gallery/sandra-08.jpg', '/gallery/sandra-08.jpg', 'Childhood joy — Sandra with her brother.',                      '2026-06-15 10:40:00+03'),
('gallery/sandra-09.jpg', '/gallery/sandra-09.jpg', 'A family gathering in matching attire.',                        '2026-06-15 10:30:00+03'),
('gallery/sandra-10.jpg', '/gallery/sandra-10.jpg', 'A younger Sandra with Mum.',                                    '2026-06-15 10:20:00+03');
