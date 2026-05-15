import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-white pt-14 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[calc(100vh-56px)]">

          {/* Left — text */}
          <div className="py-20 lg:py-0 z-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">
              Based in London · Available for opportunities
            </p>
            <h1 className="text-[clamp(4rem,9vw,8rem)] font-black leading-[0.9] tracking-tighter text-[#0a0a0a] mb-8">
              Jed<br />Blankson
            </h1>
            <p className="text-[1.05rem] text-[#444] leading-relaxed max-w-md mb-10 font-light">
              MSc in HCI and Product designer with 5+ years in B2B SaaS, data and developer tools and consumer apps. I prototype directly in code using AI.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/#work"
                className="bg-[#0a0a0a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#333] transition-colors"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="border border-[#0a0a0a] text-[#0a0a0a] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#0a0a0a] hover:text-white transition-colors"
              >
                Get in touch
              </Link>
            </div>
            <p className="mt-8 text-xs text-[#999] tracking-wide">
              Beauhurst · Gearset · Film Finder · MSc Human-Computer Interaction
            </p>
          </div>

          {/* Right — photo */}
          <div className="relative hidden lg:flex justify-end items-end h-full min-h-[calc(100vh-56px)]">
            <div className="relative w-full max-w-lg h-[85vh] ml-auto">
              <Image
                src="/jed-photo.jpg"
                alt="Jed Blankson"
                fill
                className="object-cover object-top"
                style={{
                  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                }}
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
