import { MessageSquare, Image as ImageIcon, Heart } from "lucide-react";

export default function Contribute() {
  return (
    <section id="contribute" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b0567c] font-sans mb-3">Join Us</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3f1f2c]">How You Can Contribute</h2>
          <div className="w-10 h-px bg-[#dca7bf] mx-auto mt-4" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-[#f1dde6] rounded-sm p-8 space-y-4 hover:shadow-[0_12px_36px_-18px_rgba(140,63,99,0.3)] transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f6e6ec]">
              <MessageSquare className="w-4 h-4 text-[#8c3f63]" />
            </div>
            <h3 className="text-xl font-serif text-[#3f1f2c]">Leave a Tribute</h3>
            <p className="text-[#4a3640] font-sans leading-relaxed text-sm">
              Share your fondest memories, thoughts, or condolences. Your words provide comfort to the family and create a lasting legacy of love and remembrance for Sandra.
            </p>
            <a href="#tributes"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#8c3f63] hover:text-[#b0567c] transition-colors font-sans tracking-wide">
              Leave a Tribute
              <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
          </div>

          <div className="border border-[#f1dde6] rounded-sm p-8 space-y-4 hover:shadow-[0_12px_36px_-18px_rgba(140,63,99,0.3)] transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f6e6ec]">
              <ImageIcon className="w-4 h-4 text-[#8c3f63]" />
            </div>
            <h3 className="text-xl font-serif text-[#3f1f2c]">Share Photos</h3>
            <p className="text-[#4a3640] font-sans leading-relaxed text-sm">
              Share any photos you have of Sandra Cheptoo Mugun. These treasured images will be added to the memorial gallery and cherished by the family for generations to come.
            </p>
            <a href="#gallery"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#8c3f63] hover:text-[#b0567c] transition-colors font-sans tracking-wide">
              Add to Gallery
              <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Family acknowledgement */}
        <div className="border border-[#f1dde6] rounded-sm p-8 bg-[#f9edf1]">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#eccfdb] flex-shrink-0">
              <Heart className="w-4 h-4 text-[#8c3f63]" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#3f1f2c] mb-2">From the Mugun &amp; Kariuki Families</h3>
              <p className="text-[#5a3a45] font-sans text-sm leading-relaxed">
                Sandra was held in love by David Mugun, Jane Kariuki, and her brother Glenn. On behalf of the family, we extend our deepest gratitude to everyone who has stood with us — your prayers, words of encouragement, visits, and acts of kindness have been a great source of comfort and strength.
              </p>
            </div>
          </div>
        </div>

        {/* Gratitude note */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-[#9c6f82] font-sans text-sm leading-relaxed italic">
            &ldquo;Rest at the feet of Jesus — you have fought the good fight, you have finished the race, and you have kept the faith.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
