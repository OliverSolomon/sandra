import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-gray-400 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          <div className="space-y-3">
            <h3 className="text-white font-serif text-lg tracking-tight">Mary Wanjiku Chege</h3>
            <p className="text-sm font-sans text-gray-500">Mama Njambi &middot; Shosh</p>
            <p className="text-sm font-sans text-gray-500">23 February 1958 &mdash; 1 June 2026</p>
            <p className="text-sm font-sans text-gray-500 italic mt-1">&ldquo;Her memory will forever be a blessing.&rdquo;</p>
          </div>

          <div>
            <h3 className="text-white font-serif text-base mb-4 tracking-wide">Navigate</h3>
            <ul className="space-y-2 text-sm font-sans">
              {[
                { href: "/#about", label: "Biography" },
                { href: "/#service", label: "Service Details" },
                { href: "/eulogy", label: "The Eulogy" },
                { href: "/#gallery", label: "Gallery" },
                { href: "/#tributes-list", label: "Tributes" },
                { href: "/#contribute", label: "Contribute" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-base mb-4 tracking-wide">Contact</h3>
            <p className="text-sm font-sans text-gray-500 mb-3">Family representative:</p>
            <p className="text-sm font-sans text-gray-400 font-medium mb-2">Miriam Kiragu</p>
            <a href="tel:+254720442178"
              className="flex items-center gap-2 text-sm font-sans hover:text-white transition-colors mb-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              +254 720 442178
            </a>
            <a href="mailto:miriamkiragu00@gmail.com"
              className="flex items-center gap-2 text-sm font-sans hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              miriamkiragu00@gmail.com
            </a>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs font-sans text-gray-600 tracking-wide">
          <p>&copy; {year} &nbsp;&middot;&nbsp; In loving memory of Mary Wanjiku Chege &nbsp;&middot;&nbsp; A Celebration of Life</p>
        </div>
      </div>
    </footer>
  );
}
