"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "XhyiPA1wdS8";

export default function MemorialVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="relative overflow-hidden bg-gradient-to-b from-[#3f1f2c] to-[#2a131c] py-24 md:py-28">
      {/* soft rose glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(176,86,124,0.35) 0%, rgba(176,86,124,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.25em] text-[#e0a9c0]">
            In Loving Memory
          </p>
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Celebrating the Life of Sandra
          </h2>
          <div className="mx-auto mt-4 h-px w-10 bg-[#b0567c]" />
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Celebrating the life of Sandra"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the tribute video for Sandra"
              className="group absolute inset-0 h-full w-full"
            >
              {/* thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Celebrating the life of Sandra"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20 transition-opacity duration-500 group-hover:from-black/45" />
              {/* play button */}
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:bg-[#b0567c]/90 group-active:scale-95">
                <Play className="ml-1 h-7 w-7 fill-white text-white" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
