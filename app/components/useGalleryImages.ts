"use client";

import { useCallback, useEffect, useState } from "react";
import { fallbackImages, type GalleryImage } from "@/lib/photos";

/** Fetches gallery images from the API, falling back to the curated local set. */
export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(res.ok && data.images?.length > 0 ? data.images : fallbackImages);
    } catch {
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  return { images, loading, refetch: fetchImages };
}
