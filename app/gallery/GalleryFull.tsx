"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { getUrl } from "@/lib/photos";
import { useGalleryImages } from "../components/useGalleryImages";
import Lightbox from "../components/Lightbox";
import PhotoUploadModal from "../components/PhotoUploadModal";
import Reveal from "../components/Reveal";

export default function GalleryFull() {
  const { images, loading, refetch } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <main className="relative min-h-[100dvh] bg-[#f9edf1] pb-28 pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <Reveal className="mb-14 text-center">
            <Link
              href="/#gallery"
              className="mb-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-[#b98ba0] transition-colors hover:text-[#85586c]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to memorial
            </Link>
            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.25em] text-[#b98ba0]">
              Gallery
            </p>
            <h1 className="font-serif text-4xl text-[#3f1f2c] md:text-5xl">
              A Life in Photographs
            </h1>
            <div className="mx-auto mt-5 h-px w-12 bg-[#dca7bf]" />
            <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-[#9c6f82]">
              Every photograph here is a window into a life lived with grace, faith,
              and love. Browse them all, and add your own treasured memory.
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="pressable group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#3f1f2c] py-2.5 pl-5 pr-2.5 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#56293b]"
            >
              Share a Photo
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>
          </Reveal>

          {/* Masonry-style grid */}
          {loading ? (
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg bg-[#eccfdb]/70"
                  style={{ height: 200 + (i % 3) * 80 }}
                />
              ))}
            </div>
          ) : (
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
              {images.map((img, idx) => (
                <Reveal key={img.id} delay={Math.min((idx % 8) * 40, 320)} className="break-inside-avoid">
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    className="group relative block w-full overflow-hidden rounded-lg bg-[#f6e6ec] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04] transition-shadow duration-500 hover:shadow-[0_14px_44px_-14px_rgba(0,0,0,0.3)]"
                  >
                    <Image
                      src={getUrl(img)}
                      alt={img.alt}
                      width={600}
                      height={800}
                      className="h-auto w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
        </div>
      </main>

      <Lightbox
        images={images}
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
