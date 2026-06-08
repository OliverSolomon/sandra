"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PhotoUploadModal from "./PhotoUploadModal";

interface GalleryImage { id: string; src: string; alt: string; public_url?: string; }

const DISPLAY_LIMIT = 25;
const fallbackImages: GalleryImage[] = [{
  id: "f1",
  src: "https://res.cloudinary.com/djiqwujg4/image/upload/v1780859632/mary-wanjiku-chege_yzkqml.jpg",
  alt: "Mary Wanjiku Chege",
}];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(res.ok && data.images?.length > 0 ? data.images : fallbackImages);
    } catch { setImages(fallbackImages); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchImages(); }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSelectedIndex((i) => ((i ?? 0) + 1) % images.length);
      else if (e.key === "ArrowLeft") setSelectedIndex((i) => ((i ?? 0) - 1 + images.length) % images.length);
      else if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, images.length]);

  const getUrl = (img: GalleryImage) => img.public_url || img.src;
  const displayed = images.slice(0, DISPLAY_LIMIT);

  return (
    <>
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans mb-3">Memories</p>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Gallery</h2>
              <div className="w-10 h-px bg-stone-300 mt-4" />
            </div>
            <button onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-sm font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Photo
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-stone-100 rounded-sm animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayed.map((img, idx) => (
                <button key={img.id} onClick={() => setSelectedIndex(idx)}
                  className="relative aspect-square overflow-hidden rounded-sm hover:opacity-90 transition-opacity shadow-sm hover:shadow-md">
                  <Image src={getUrl(img)} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-4 right-4 text-white p-2 bg-black/50 hover:bg-black/70 rounded z-20" onClick={() => setSelectedIndex(null)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {images.length > 1 && <>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-black/70 rounded z-20"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => ((i ?? 0) - 1 + images.length) % images.length); }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-black/70 rounded z-20"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => ((i ?? 0) + 1) % images.length); }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-lg text-sm z-20">
              {selectedIndex + 1} / {images.length}
            </div>
          </>}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={getUrl(images[selectedIndex])} alt={images[selectedIndex].alt} fill className="object-contain" sizes="100vw" priority />
          </div>
        </div>
      )}

      <PhotoUploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onUploadSuccess={fetchImages} />
    </>
  );
}
