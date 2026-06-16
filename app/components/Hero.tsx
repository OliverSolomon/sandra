import Image from "next/image";
import { BookOpen, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#f9f7f4]">
      {/* subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Portrait */}
          <div className="relative flex justify-center md:justify-end order-2 md:order-1">
            <div className="relative w-72 md:w-96 aspect-[3/4]">
              {/* decorative frame lines */}
              <div className="absolute -inset-3 border border-stone-300/60 rounded-sm pointer-events-none" />
              <div className="absolute -inset-6 border border-stone-200/40 rounded-sm pointer-events-none" />
              <Image
                src="https://res.cloudinary.com/djiqwujg4/image/upload/v1780859632/mary-wanjiku-chege_yzkqml.jpg"
                alt="Mary Wanjiku Chege — Mama Njambi"
                fill
                className="object-cover rounded-sm shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left space-y-7 order-1 md:order-2">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans">A Celebration of Life</p>
              <div className="w-8 h-px bg-stone-400 mx-auto md:mx-0 mt-3" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.1] tracking-tight">
              Mary Wanjiku<br />Chege
            </h1>

            <p className="text-stone-500 font-sans italic text-lg tracking-wide">Mama Njambi &mdash; Shosh</p>

            <p className="text-stone-500 font-sans text-sm tracking-widest uppercase">
              23 February 1958 &mdash; 1 June 2026
            </p>

            <blockquote className="relative py-4 px-5 border-l-2 border-stone-300 bg-stone-50/60 rounded-r-sm">
              <p className="text-gray-600 font-serif text-base italic leading-relaxed">
                &ldquo;Honor her for all that her hands have done, and let her works bring her praise at the city gates.&rdquo;
              </p>
              <footer className="mt-2 text-xs text-stone-400 font-sans uppercase tracking-widest">Proverbs 31:31</footer>
            </blockquote>

            <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="/eulogy"
                className="pressable inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-sm text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors shadow-md">
                <BookOpen className="w-4 h-4" />
                Read the Eulogy
              </a>
              <a href="#tributes"
                className="pressable inline-flex items-center gap-2 px-7 py-3.5 border border-stone-300 text-gray-700 rounded-sm text-sm font-medium tracking-wide hover:bg-stone-50 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Leave a Tribute
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
