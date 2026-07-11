import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section className="min-h-screen bg-white pt-14 flex items-center overflow-hidden relative">

      {/* Photo bleeds from right, fades into white */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block">
        <Image
          src="/jed-photo.jpg"
          alt="Jed Blankson"
          fill
          className="object-cover object-top"
          priority
          quality={100}
        />
        {/* Fade left into white */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 60%)"
        }} />
        {/* Fade bottom */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 40%)"
        }} />
      </div>

      {/* Text sits on top of the faded photo */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
        <div className="max-w-xl">
          <Reveal delay={0}>
            <p className="text-sm text-[#999] mb-8 font-light">
              London, UK
            </p>
          </Reveal>
          <RevealText
            as="h1"
            text={"Jed\nBlankson"}
            wordDelay={90}
            className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-tighter text-[#0a0a0a] mb-8"
          />
          <Reveal delay={150}>
            <p className="text-[1.4rem] leading-snug font-medium text-[#0a0a0a] max-w-lg mb-6 text-pretty">
              I design products that make complex things feel simple, and I ship them in code.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <p className="text-lg text-[#555] leading-relaxed max-w-md mb-10 font-light text-pretty">
              Product designer and co-founder of a film-discovery app, with 6+ years across consumer and enterprise products. I design for iOS and Android and ship in real code. MSc in Human-Computer Interaction.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="flex items-center gap-5">
              <Magnetic strength={0.5}>
                <a
                  href="#work"
                  className="text-sm font-semibold text-[#0a0a0a] border-b-2 border-[#e63329] pb-0.5 hover:text-[#e63329] transition-colors inline-block"
                >
                  View work ↓
                </a>
              </Magnetic>
              <Link
                href="/contact"
                className="text-sm font-light text-[#999] hover:text-[#0a0a0a] transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
