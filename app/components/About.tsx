import Image from "next/image";
import { Heart, BookOpen, Church, Briefcase } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Family",
    text: "Wife to the late Edward Chege Waweru. Mother to Christine Njambi, Barry Ngaruiya, and the late Brian Kiragu. Beloved Shosh to Edward Chege, Brenda Muthoni, Evalyne Wanjiku, and many others.",
  },
  {
    icon: Church,
    title: "Faith",
    text: "Church Elder and Mothers' Union Chairlady at ACK Kianjogu Church, Ndenderu. Treasurer of the Ndenderu Deanery from 2021–2023. Her faith was the compass that guided every step of her life.",
  },
  {
    icon: Briefcase,
    title: "Enterprise",
    text: "Proprietor of Rynery Agencies Limited, engaged in the supply of food products to institutions. She approached every opportunity with dedication, integrity, and a strong sense of responsibility.",
  },
  {
    icon: BookOpen,
    title: "Knowledge",
    text: "An avid reader who loved Mills & Boon, Ngugi wa Thiong'o, David Maillu, John Kiriamiti, and the daily newspaper. Many believe she would have made an excellent political analyst.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans mb-3">Her Story</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Biography</h2>
          <div className="w-10 h-px bg-stone-300 mx-auto mt-4" />
        </div>

        {/* Portrait + opening paragraphs */}
        <div className="grid md:grid-cols-5 gap-14 items-start mb-20">
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-72 aspect-[3/4]">
              <div className="absolute -inset-2 border border-stone-200/80 rounded-sm pointer-events-none" />
              <Image
                src="https://res.cloudinary.com/djiqwujg4/image/upload/v1780859632/mary-wanjiku-chege_yzkqml.jpg"
                alt="Mary Wanjiku Chege"
                fill
                className="object-cover rounded-sm shadow-xl"
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-5 text-gray-700 font-sans leading-relaxed text-[0.97rem]">
            <p>
              Mary&rsquo;s story began on the <strong className="text-gray-900">23rd February 1958</strong> in the beautiful village of <strong className="text-gray-900">Mucharage, Othaya</strong>, where she was born to the late Jeremiah Kiragu Ngigii-Kihoro and Gladys Mugure Kiragu. Mary was the seventh-born child in the Kihoro family, growing up in a large and vibrant household alongside her many siblings.
            </p>
            <p>
              With a family that size, life was never dull. There was always someone to talk to, someone to learn from, someone to compete with, and occasionally someone to blame when chores were left undone. Beneath the cheerful bustle was a strong foundation of discipline, respect, and responsibility. In the Kihoro household, everyone had a part to play, and Mary quickly learned that hard work was not a punishment — it was simply a way of life.
            </p>
            <p>
              As a young girl, she tended livestock, worked in the gardens, and harvested tea, tobacco, and pyrethrum alongside her family. These early experiences shaped her character, teaching her resilience, discipline, and the value of honest labour — qualities that remained with her throughout her life.
            </p>
            <p>
              Her educational journey began at <strong className="text-gray-900">Mucharage Primary School</strong> (1964–1970), before joining Ruruguti Secondary School in 1971 and later transferring to <strong className="text-gray-900">Nginda Girls&rsquo; School</strong> in Murang&rsquo;a County. She understood that education was more than attending classes — it was a pathway to growth, knowledge, and opportunity.
            </p>
            <p>
              After completing her education, Mary married the <strong className="text-gray-900">late Edward Chege Waweru</strong>. The young couple began their life in Lang&rsquo;ata, laying the foundation of their family before relocating to Ol Joro Orok, Nyandarua County. Following the passing of her beloved husband, Mary returned to Nairobi, where she courageously rebuilt her life while continuing to care for and support her family. Though she endured profound loss, she faced life&rsquo;s challenges with remarkable strength and determination.
            </p>
            <p>
              To her, family was never defined by titles alone, but by love, care, and being present for one another. Her familiar Kikuyu greeting — <em className="text-gray-600">&ldquo;No ngeithi? Na muhana atia na ciana? Mageithie muno&rdquo;</em> — reflected her warmth and genuine concern for all those around her. She was the family&rsquo;s communication hub, ensuring everyone was informed, included, and connected.
            </p>
          </div>
        </div>

        {/* Four pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-[#f9f7f4] rounded-sm border border-stone-100 p-6 space-y-3">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-stone-200/70">
                <Icon className="w-4 h-4 text-stone-600" />
              </div>
              <h3 className="font-serif text-gray-900 text-lg">{title}</h3>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Scripture centrepiece */}
        <div className="max-w-2xl mx-auto text-center border-t border-b border-stone-200 py-12">
          <span className="text-5xl font-serif text-stone-200 leading-none select-none">&ldquo;</span>
          <p className="text-xl md:text-2xl font-serif text-gray-700 italic -mt-3 mb-4 leading-relaxed">
            Honor her for all that her hands have done, and let her works bring her praise at the city gates.
          </p>
          <p className="text-xs text-stone-400 font-sans uppercase tracking-widest">Proverbs 31:31</p>
        </div>

      </div>
    </section>
  );
}
