export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  public_url?: string;
}

/**
 * Curated fallback gallery — used when Supabase has no rows yet, and as the
 * canonical local set of memories. Ordered most-recently-added first so the
 * home page can surface the freshest photos. Files live in /public.
 */
export const fallbackImages: GalleryImage[] = [
  {
    id: "p01",
    src: "/gallery/photo-01.jpg",
    alt: "Mama Njambi with her grandchild — “In loving memory of Tata Mary.”",
  },
  {
    id: "p02",
    src: "/gallery/photo-02.jpg",
    alt: "Mary with a dear friend — “In loving memory of Mary.”",
  },
  {
    id: "p03",
    src: "/gallery/photo-03.jpg",
    alt: "Mary alongside her sister, December 2019.",
  },
  {
    id: "p04",
    src: "/gallery/photo-04.jpg",
    alt: "Family gathered together at the homestead.",
  },
  {
    id: "p05",
    src: "/gallery/photo-05.jpg",
    alt: "The sisters celebrating together at a family event.",
  },
  {
    id: "m01",
    src: "/memories/lasts.jpeg",
    alt: "Mary at a family celebration, seated with loved ones.",
  },
  {
    id: "hero",
    src: "https://res.cloudinary.com/djiqwujg4/image/upload/v1780859632/mary-wanjiku-chege_yzkqml.jpg",
    alt: "Mary Wanjiku Chege — her cherished portrait.",
  },
  {
    id: "m02",
    src: "/memories/oldie.jpeg",
    alt: "A young Mary Wanjiku — a treasured photograph from her early years.",
  },
];

export const getUrl = (img: GalleryImage) => img.public_url || img.src;
