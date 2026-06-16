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
    id: "portrait",
    src: "/sandra-portrait.jpg",
    alt: "Sandra Cheptoo Mugun — her cherished portrait.",
  },
  {
    id: "g01",
    src: "/gallery/sandra-01.jpg",
    alt: "Sandra dancing — she sang and danced with all her heart.",
  },
  {
    id: "g02",
    src: "/gallery/sandra-02.jpg",
    alt: "A joyful moment shared with Mum.",
  },
  {
    id: "g03",
    src: "/gallery/sandra-03.jpg",
    alt: "Sandra at ease — warm, present, and full of life.",
  },
  {
    id: "g04",
    src: "/gallery/sandra-04.jpg",
    alt: "Lunch out with Mum — time together she treasured.",
  },
  {
    id: "g05",
    src: "/gallery/sandra-05.jpg",
    alt: "Sharing a meal and conversation with Mum.",
  },
  {
    id: "g06",
    src: "/gallery/sandra-06.jpg",
    alt: "Poolside with her brother — Sandra loved swimming.",
  },
  {
    id: "g07",
    src: "/gallery/sandra-07.jpg",
    alt: "A young Sandra at a fun run.",
  },
  {
    id: "g08",
    src: "/gallery/sandra-08.jpg",
    alt: "Childhood joy — Sandra with her brother.",
  },
  {
    id: "g09",
    src: "/gallery/sandra-09.jpg",
    alt: "A family gathering in matching attire.",
  },
  {
    id: "g10",
    src: "/gallery/sandra-10.jpg",
    alt: "A younger Sandra with Mum.",
  },
];

export const getUrl = (img: GalleryImage) => img.public_url || img.src;

const VIDEO_EXT = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i;

/** True when the gallery item is a video file (detected by URL extension). */
export const isVideo = (img: GalleryImage) => VIDEO_EXT.test(getUrl(img));

/** Stable sort that surfaces videos before photos, preserving prior order. */
export const videosFirst = (imgs: GalleryImage[]): GalleryImage[] => [
  ...imgs.filter(isVideo),
  ...imgs.filter((i) => !isVideo(i)),
];
