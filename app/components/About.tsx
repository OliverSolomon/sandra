import Image from "next/image";
import { Music, Heart, Sparkles, Waves } from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Music,
    title: "Worship",
    text: "A faithful member of the worship team and choir at Nairobi Chapel Ngong Hills. Early Saturday mornings would find her ready long before others — to Sandra, praise was never routine, it was purpose.",
  },
  {
    icon: Heart,
    title: "Family",
    text: "Daughter to David Mugun and Jane Kariuki, and beloved sister to Glenn. She treasured family so deeply she would plan for Christmas in January, cherishing every holiday in Othaya and Kapsabet.",
  },
  {
    icon: Sparkles,
    title: "Creativity",
    text: "Her gifted hands crafted intricate beadwork — necklaces and bangles she sold with confidence and charm at family gatherings and beyond. She saw possibility where others saw hesitation.",
  },
  {
    icon: Waves,
    title: "Adventure",
    text: "She swam and won medals for her school, danced her way to a regional convention in South Africa, and embraced skating and horse riding with a fearless, joyful spirit.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b0567c] font-sans mb-3">Her Story</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3f1f2c]">Eulogy</h2>
          <div className="w-10 h-px bg-[#dca7bf] mx-auto mt-4" />
        </Reveal>

        {/* Portrait + opening paragraphs */}
        <Reveal className="grid md:grid-cols-5 gap-14 items-start mb-20">
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-72 aspect-[3/4]">
              <div className="absolute -inset-2 border border-[#e3c2d0] rounded-sm pointer-events-none" />
              <Image
                src="/gallery/sandra-03.jpg"
                alt="Sandra Cheptoo Mugun"
                fill
                sizes="(max-width: 768px) 18rem, 18rem"
                className="object-cover rounded-sm shadow-xl"
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-5 text-[#4a3640] font-sans leading-relaxed text-[0.97rem]">
            <p>
              Sandra Cheptoo Mugun was born on <strong className="text-[#3f1f2c]">3rd January 2002</strong> at Mater Hospital, a day filled with light, laughter, and overflowing joy. So great was the excitement that her father, David Mugun, adorned the rear windshield of his car with ribbons announcing, <em className="text-[#6b3a4c]">&ldquo;It&rsquo;s a baby girl&rdquo;</em> — and that joy became Sandra&rsquo;s signature. She grew into a child of sunshine: always smiling, gentle in spirit, quick to laugh, and ever ready to lend a helping hand.
            </p>
            <p>
              Her learning journey took her from Allen Grove School to St. Christopher&rsquo;s, and later to <strong className="text-[#3f1f2c]">Bunks &amp; Biddles</strong> in Karen, where she discovered a love for dance. She excelled so beautifully that she won a choreographed solo at the East Africa ACE Convention, earning her place at the Regional Convention in South Africa.
            </p>
            <p>
              At <strong className="text-[#3f1f2c]">Pistis Christian School</strong>, within Africa International University in Karen, Sandra flourished — growing in her Christian faith, art and craft, dance, music, and swimming. Her hands were so gifted that they created beautiful beadwork; she would craft intricate pieces and, with confidence and charm, step forward to sell them. Her entrepreneurial spirit was remarkable.
            </p>
            <p>
              Baptized at Nairobi Chapel Ngong Road, Sandra began her worship journey in the Teens Connect, and in 2019 joined <strong className="text-[#3f1f2c]">Nairobi Chapel Ngong Hills</strong>, where she found a spiritual home. She sang with passion, served with humility, and understood that worship was not performance but a heartfelt offering to God.
            </p>
            <p>
              Though radiant, her life was not without its challenges. From three months old she lived with epilepsy, faced with unwavering prayer and faithful care — and through the dedicated follow-up of her doctors, she went on to live a seizure-free life for eight years. On 22nd May 2026, a long-awaited breakthrough came: her doctor confirmed she was ready to begin weaning off her medication. Sandra called her father, her voice carrying dreams of driving and of stepping freely into spaces once restricted.
            </p>
            <p>
              And yet, in a turn beyond human understanding, the morning of <strong className="text-[#3f1f2c]">5th June 2026</strong> brought unimaginable sorrow; Sandra had quietly departed. We hold on to what we know: that her life, though brief, was full — that her smile, her faith, her courage, and her love touched many. She is survived by her parents David Mugun and Jane Kariuki, and her brother Glenn. <em className="text-[#6b3a4c]">Rest at the feet of Jesus.</em>
            </p>
          </div>
        </Reveal>

        {/* Four pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}
              className="group bg-[#f9edf1] rounded-sm border border-[#f1dde6] p-6 space-y-3 transition-shadow duration-500 hover:shadow-[0_12px_36px_-16px_rgba(140,63,99,0.28)]">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#eccfdb] transition-colors duration-300 group-hover:bg-[#e0b3c6]">
                <Icon className="w-4 h-4 text-[#8c3f63]" />
              </div>
              <h3 className="font-serif text-[#3f1f2c] text-lg">{title}</h3>
              <p className="text-sm text-[#4a3640] font-sans leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>

        {/* Scripture centrepiece */}
        <Reveal className="max-w-2xl mx-auto text-center border-t border-b border-[#e3c2d0] py-12">
          <span className="text-5xl font-serif text-[#e0b3c6] leading-none select-none">&ldquo;</span>
          <p className="text-xl md:text-2xl font-serif text-[#5a3a45] italic -mt-3 mb-4 leading-relaxed">
            But you are our letter, and you are in our hearts for everyone to read and understand.
          </p>
          <p className="text-xs text-[#b0567c] font-sans uppercase tracking-widest">2 Corinthians 3:2</p>
        </Reveal>

      </div>
    </section>
  );
}
