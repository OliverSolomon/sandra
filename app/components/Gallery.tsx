"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { getUrl } from "@/lib/photos";
import { useGalleryImages } from "./useGalleryImages";
import Lightbox from "./Lightbox";
import PhotoUploadModal from "./PhotoUploadModal";
import Reveal from "./Reveal";

const HOME_LIMIT = 16;

export default function Gallery() {
  const { images, loading, refetch } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const displayed = images.slice(0, HOME_LIMIT);

  return (
    <>
      <section id="gallery" className="relative bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.25em] text-stone-400">
                Memories
              </p>
              <h2 className="font-serif text-3xl text-gray-900 md:text-4xl">
                A Life in Photographs
              </h2>
              <div className="mt-4 h-px w-10 bg-stone-300" />
              <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-stone-500">
                The moments we hold closest — gathered here in loving remembrance.
              </p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="pressable group inline-flex w-max items-center gap-2.5 rounded-full bg-gray-900 py-2.5 pl-5 pr-2.5 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-800"
            >
              Share a Photo
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>
          </Reveal>

          {/* Grid */}
          {loading ? (
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg bg-stone-100" />
              ))}
            </div>
          ) : (
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {displayed.map((img, idx) => (
                <Reveal
                  key={img.id}
                  as="div"
                  delay={Math.min(idx * 45, 360)}
                  className={
                    idx === 0
                      ? "col-span-2 row-span-2"
                      : idx === 5
                        ? "md:col-span-2"
                        : ""
                  }
                >
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    className="group relative h-full w-full overflow-hidden rounded-lg bg-stone-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04] transition-shadow duration-500 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]"
                  >
                    <Image
                      src={getUrl(img)}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <p className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left font-sans text-[11px] leading-snug text-white/95 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100">
                      {img.alt}
                    </p>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* View all */}
          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-gray-900"
            >
              View the full gallery
              {images.length > HOME_LIMIT && (
                <span className="text-stone-400">({images.length})</span>
              )}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Lightbox
        images={displayed}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onIndexChange={setSelectedIndex}
      />

      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={refetch}
      />
    </>
  );
}
