import { MessageSquare, Image as ImageIcon, Phone, Mail } from "lucide-react";

export default function Contribute() {
  return (
    <section id="contribute" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans mb-3">Join Us</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">How You Can Contribute</h2>
          <div className="w-10 h-px bg-stone-300 mx-auto mt-4" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-stone-100 rounded-sm p-8 space-y-4 hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-100">
              <MessageSquare className="w-4 h-4 text-stone-600" />
            </div>
            <h3 className="text-xl font-serif text-gray-900">Leave a Tribute</h3>
            <p className="text-gray-600 font-sans leading-relaxed text-sm">
              Share your fondest memories, thoughts, or condolences. Your words provide comfort to the family and create a lasting legacy of love and remembrance for Mary.
            </p>
            <a href="#tributes"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-stone-600 transition-colors font-sans tracking-wide">
              Leave a Tribute
              <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
          </div>

          <div className="border border-stone-100 rounded-sm p-8 space-y-4 hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-100">
              <ImageIcon className="w-4 h-4 text-stone-600" />
            </div>
            <h3 className="text-xl font-serif text-gray-900">Share Photos</h3>
            <p className="text-gray-600 font-sans leading-relaxed text-sm">
              Share any photos you have of Mary Wanjiku Chege. These treasured images will be added to the memorial gallery and cherished by the family for generations to come.
            </p>
            <a href="#gallery"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-stone-600 transition-colors font-sans tracking-wide">
              Add to Gallery
              <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="border border-stone-100 rounded-sm p-8">
          <h3 className="text-xl font-serif text-gray-900 mb-2">Family Contact</h3>
          <p className="text-stone-500 font-sans text-sm mb-6">
            For financial contributions, queries, or to submit photos directly, please reach out to the family representative:
          </p>

          <div className="inline-block bg-[#f9f7f4] rounded-sm border border-stone-100 px-6 py-5 space-y-3">
            <p className="font-serif text-gray-900 text-lg">Miriam Kiragu</p>
            <a href="tel:+254720442178"
              className="flex items-center gap-2.5 text-gray-700 hover:text-gray-900 font-sans text-sm transition-colors">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              +254 720 442178
            </a>
            <a href="mailto:miriamkiragu00@gmail.com"
              className="flex items-center gap-2.5 text-gray-700 hover:text-gray-900 font-sans text-sm transition-colors">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              miriamkiragu00@gmail.com
            </a>
          </div>
        </div>

        {/* Gratitude note */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-stone-500 font-sans text-sm leading-relaxed italic">
            On behalf of the family of the late Mary Wanjiku Chege, we extend our deepest gratitude to everyone who has stood with us during this difficult journey. Your prayers, words of encouragement, visits, and acts of kindness have been a great source of comfort and strength.
          </p>
        </div>

      </div>
    </section>
  );
}
