import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import RevealText from "../components/RevealText";
import Reveal from "../components/Reveal";

const skills = [
  "Designing for iOS and Android",
  "Consumer products, from zero to launch",
  "Design systems and component libraries",
  "Making dense, complex data feel simple",
  "Prototyping in code (React, Framer, AI-assisted)",
  "User research and synthesis",
  "Working hand in hand with engineers",
];

export default function About() {
  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">About</p>
          <RevealText
            as="h1"
            text={"Where film, music\nand design meet."}
            className="text-5xl font-black tracking-tighter text-[#0a0a0a] mb-12 leading-tight"
          />

          {/* Lead: portrait + intro */}
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-14">
            <Reveal className="w-full sm:w-[260px] shrink-0" distance={24}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f2f2f2] outline outline-1 -outline-offset-1 outline-black/10">
                <Image
                  src="/about/jed-portrait.jpg"
                  alt="Jed Blankson"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 260px"
                  priority
                />
              </div>
            </Reveal>
            <Reveal className="text-[1.05rem] text-[#444] leading-relaxed" delay={90}>
              <p className="text-[#0a0a0a] font-medium text-lg mb-4">Hey, I&apos;m Jed.</p>
              <p>
                I&apos;m a product designer and co-founder based in London. I co-founded Film Finder, a film-discovery
                app on iOS and Android, and across 6+ years I&apos;ve designed products people rely on every day. A lot
                of that craft was earned on hard problems at data-heavy companies like Beauhurst and Gearset, learning
                to make dense, complex things feel simple. I hold an MSc in Human-Computer Interaction.
              </p>
            </Reveal>
          </div>

          <div className="space-y-10 text-[1.05rem] text-[#444] leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-4">Where it started</h2>
              <p>
                I was born in Ghana, and some of my earliest memories of learning come from breaking things.
                My dad would bring toys back from England, Game Boys, PlayStations, and instead of just playing
                with them I&apos;d open them up to see how they worked. I loved knowing what was inside, how the
                parts connected, and why something behaved the way it did. Alongside that I was always drawing
                and building with Lego. Looking back, design felt natural.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-5">What I&apos;m good at</h2>
              <ul className="space-y-3">
                {skills.map(skill => (
                  <li key={skill} className="flex items-start gap-3">
                    <span className="text-[#e63329] mt-1 shrink-0">✦</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-4">How I work</h2>
              <p>
                I get hands on early. I&apos;d rather build a rough prototype than spend a week in static wireframes.
                I&apos;ve always worked closely with engineers and I can read and write code, which means fewer gaps
                between design intent and what actually ships. Lately I&apos;ve been using AI as a real tool for
                pairing design with lightweight coding. It lets me move faster, prototype ideas end to end, and
                collaborate more closely with engineers. It genuinely feels like a new kind of creativity.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-4">Beyond the day job</h2>
              <p>
                Most of my spare time goes into building and exploring ideas. The big one is Film Finder, a film
                discovery app I co-founded with friends to help people decide what to watch quickly and confidently.
                I&apos;ve also been experimenting with 4DAP (Four-Dimensional Audio Playback), a project exploring
                how people might experience multiple variations of the same track at the same time.
              </p>
              <Reveal className="my-8" distance={24}>
                <figure>
                  <div className="relative aspect-[7/5] w-full overflow-hidden rounded-2xl bg-[#f2f2f2] outline outline-1 -outline-offset-1 outline-black/10">
                    <Image
                      src="/about/jed-workshop.jpg"
                      alt="Jed running a design workshop with his team"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-[#999]">Running a design session with the team.</figcaption>
                </figure>
              </Reveal>
              <p>
                Film, music, and technology sit at the centre of how I think about design. I&apos;m drawn to how
                interaction is moving beyond screens into audio, devices, cars, assistants, and increasingly
                AI-driven systems. Outside of that you&apos;ll usually find me at the gym, working through films I
                still need to watch, digging into new music, or vibe-coding side projects. The little music toggle
                in the corner is a small piece of that, some afrohouse to design to.
              </p>
            </div>

            <div className="border-t border-[#e8e8e8] pt-8">
              <p className="text-sm text-[#999] mb-3">Currently open to</p>
              <p className="text-[#0a0a0a] font-medium">
                Senior and staff product design roles at ambitious teams building something people love.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
