"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "Biography" },
    { href: "/#service", label: "Service Details" },
    { href: "/eulogy", label: "The Eulogy" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#tributes", label: "Tributes" },
    { href: "/#contribute", label: "Contribute" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-serif text-gray-900 hover:text-gray-700 transition-colors">
            Mary Wanjiku Chege
          </Link>
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-gray-700" aria-label="Menu" onClick={() => setOpen((s) => !s)}>
            {open ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <div className={`md:hidden mt-2 ${open ? "block" : "hidden"}`}>
          <ul className="flex flex-col gap-2 px-2 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-base text-gray-700 hover:bg-gray-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
