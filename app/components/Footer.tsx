export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#2a131c] text-[#d9bcc7] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          <div className="space-y-3">
            <h3 className="text-white font-serif text-lg tracking-tight">Sandra Cheptoo Mugun</h3>
            <p className="text-sm font-sans text-[#bd95a6]">Sandy &middot; Cheptoo</p>
            <p className="text-sm font-sans text-[#bd95a6]">3 January 2002 &mdash; 5 June 2026</p>
            <p className="text-sm font-sans text-[#bd95a6] italic mt-1">&ldquo;Her smile, her faith, and her love touched many.&rdquo;</p>
          </div>

          <div>
            <h3 className="text-white font-serif text-base mb-4 tracking-wide">Navigate</h3>
            <ul className="space-y-2 text-sm font-sans">
              {[
                { href: "/#about", label: "Eulogy" },
                { href: "/#service", label: "Service Details" },
                { href: "/eulogy", label: "Funeral Programme" },
                { href: "/#gallery", label: "Gallery" },
                { href: "/#tributes-list", label: "Tributes" },
                { href: "/#contribute", label: "Contribute" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-[#cfa9b8] hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-base mb-4 tracking-wide">Survived By</h3>
            <p className="text-sm font-sans text-[#cfa9b8] leading-relaxed">
              Her parents, David Mugun and Jane Kariuki, and her brother Glenn — together with a wide family and church community who loved her dearly.
            </p>
          </div>

        </div>

        <div className="border-t border-[#4a2535] pt-8 text-center text-xs font-sans text-[#a47c8b] tracking-wide">
          <p>&copy; {year} &nbsp;&middot;&nbsp; In loving memory of Sandra Cheptoo Mugun &nbsp;&middot;&nbsp; A Celebration of Life</p>
        </div>
      </div>
    </footer>
  );
}
