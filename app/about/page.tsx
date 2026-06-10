import Nav from "../components/Nav";
import Footer from "../components/Footer";

const skills = [
  "Designing for iOS and Android",
  "Data-dense interfaces for non-technical users",
  "Design systems and component libraries",
  "Enterprise and internal tooling",
  "Prototyping in code (React, Framer, AI-assisted)",
  "User research and synthesis",
  "Working directly with engineering teams",
];

export default function About() {
  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">About</p>
          <h1 className="text-5xl font-black tracking-tighter text-[#0a0a0a] mb-16 leading-tight">
            Designing software<br />people can actually use.
          </h1>

          <div className="space-y-10 text-[1.05rem] text-[#444] leading-relaxed">
            <p>
              I&apos;m a product designer based in London with 5+ years designing enterprise software and consumer products.
              Most of that time has been at data heavy B2B companies: two years at Beauhurst, a financial intelligence
              platform used by analysts and fund managers, and at Gearset, an enterprise DevOps tool.
              I hold an MSc in Human-Computer Interaction.
            </p>

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
                between design intent and what actually ships.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-4">Outside work</h2>
              <p>
                I co-founded Film Finder, a film discovery app I still design and build with my co-founder.
                I grew up in Ghana and have been based in London since 2019.
              </p>
            </div>

            <div className="border-t border-[#e8e8e8] pt-8">
              <p className="text-sm text-[#999] mb-3">Currently open to</p>
              <p className="text-[#0a0a0a] font-medium">
                Product design roles at B2B SaaS companies and scale-ups — particularly in data, workflow, or AI products.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
