"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getUrl, isVideo, type GalleryImage } from "@/lib/photos";

interface Props {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/** Full-screen, keyboard-navigable image viewer shared by every gallery view. */
export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  useEffect(() => {
    if (index === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange(((index ?? 0) + 1) % images.length);
      else if (e.key === "ArrowLeft") onIndexChange(((index ?? 0) - 1 + images.length) % images.length);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onIndexChange]);

  if (index === null) return null;
  const current = images[index];

  return (
    <div
      className="lb-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="pressable absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2.5 text-white/90 hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="pressable absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/90 hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); onIndexChange((index - 1 + images.length) % images.length); }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="pressable absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/90 hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); onIndexChange((index + 1) % images.length); }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <figure
        key={current.id}
        className="lb-figure relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {isVideo(current) ? (
            <video
              src={getUrl(current)}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-sm object-contain"
            />
          ) : (
            <Image
              src={getUrl(current)}
              alt={current.alt}
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
        </div>
        <figcaption className="pointer-events-none absolute bottom-3 left-1/2 max-w-[90%] -translate-x-1/2 rounded-full bg-black/45 px-4 py-2 text-center text-xs font-sans tracking-wide text-white/85">
          {current.alt}
          {images.length > 1 && (
            <span className="ml-2 text-white/50">· {index + 1} / {images.length}</span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
