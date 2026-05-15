import Link from "next/link";

const skills = ["Product Design", "UX Research", "Design Systems", "iOS & Android", "Data Interfaces", "AI Tooling", "Prototyping"];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* Floating skill tags + headline */}
        <div className="relative mb-20">
          <div className="flex flex-wrap gap-3 mb-8">
            {skills.map(skill => (
              <span
                key={skill}
                className="border border-white/20 text-white/60 text-xs font-medium px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1] tracking-tighter">
            Let&apos;s build<br />
            <span className="text-[#e63329]">something great.</span>
          </h2>
          <p className="mt-6 text-white/50 max-w-md text-base leading-relaxed">
            Open to product design roles at B2B SaaS companies and scale-ups, particularly in data, workflow, or AI products.
          </p>
          <a
            href="mailto:jedblankson17@gmail.com"
            className="inline-block mt-8 bg-[#e63329] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#cc2920] transition-colors text-sm"
          >
            jedblankson17@gmail.com ↗
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="text-white/30 text-sm font-semibold tracking-wide">JB</span>

          <nav className="flex flex-wrap gap-6">
            <Link href="/#work" className="text-white/40 text-sm hover:text-white transition-colors">Work</Link>
            <Link href="/about" className="text-white/40 text-sm hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-white/40 text-sm hover:text-white transition-colors">Contact</Link>
            <a href="https://linkedin.com/in/jedblankson" target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-white transition-colors">LinkedIn ↗</a>
          </nav>

          <p className="text-white/20 text-xs">© Jed Blankson 2026</p>
        </div>
      </div>
    </footer>
  );
}
