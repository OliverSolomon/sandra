"use client";

import { useCallback, useEffect, useState } from "react";
import { fallbackImages, videosFirst, type GalleryImage } from "@/lib/photos";

/** Fetches gallery images from the API, falling back to the curated local set.
 *  Videos are always surfaced before photos. */
export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>(() => videosFirst(fallbackImages));
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      const next = res.ok && data.images?.length > 0 ? data.images : fallbackImages;
      setImages(videosFirst(next));
    } catch {
      setImages(videosFirst(fallbackImages));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  return { images, loading, refetch: fetchImages };
}
