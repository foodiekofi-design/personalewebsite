"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-white text-sm font-semibold tracking-wide hover:opacity-70 transition-opacity">
          JB
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#work" className="text-white/70 text-sm hover:text-white transition-colors">Work</Link>
          <Link href="/about" className="text-white/70 text-sm hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-white/70 text-sm hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Jed-Blankson-Product-Designer-2026.pdf"
            download
            className="bg-[#e63329] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#cc2920] transition-colors"
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-white mb-1.5"></span>
          <span className="block w-5 h-px bg-white mb-1.5"></span>
          <span className="block w-5 h-px bg-white"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          <Link href="/#work" className="text-white/70 text-sm hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/about" className="text-white/70 text-sm hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="text-white/70 text-sm hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
          <a
            href="/Jed-Blankson-Product-Designer-2026.pdf"
            download
            className="bg-[#e63329] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#cc2920] transition-colors w-fit"
          >
            Resume ↓
          </a>
        </div>
      )}
    </nav>
  );
}
