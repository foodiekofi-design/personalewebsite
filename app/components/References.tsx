import Reveal from "./Reveal";
import RevealText from "./RevealText";

// Two named references from people who managed Jed, each mapping onto a case
// study (Beauhurst, MMT/Translink). Avatars are initials monograms; no photos
// or contact details are published. To add a company logo later, swap the
// monogram block for an <Image> from /public/references/.
const references: {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}[] = [
  {
    initials: "JV",
    name: "Juspreet Virdee",
    role: "Product Design Manager",
    company: "Beauhurst",
    quote:
      "Jed is an exceptional designer, equally at home in the problem space as he is in the solution space. He is proactive, an excellent collaborator, and consistently earns praise for his openness to feedback and his skill in integrating it. An absolute joy to work with, and a credit to any team fortunate enough to have him.",
  },
  {
    initials: "IB",
    name: "Ian Batterbee",
    role: "UX Lead",
    company: "MMT Digital",
    quote:
      "What stood out was Jed's versatility. He took on both research and design, running usability studies, mapping customer journeys and building UI component libraries, then presented recommendations to clients with real confidence. Although still early in his career, he showed the maturity and skill set of a mid-level UX designer, and I learned a lot from him myself.",
  },
];

export default function References() {
  return (
    <section id="references" className="py-24 bg-[#fafafa] border-t border-[#eee]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-3">References</p>
            <RevealText as="h2" text="What people I've worked with say" className="text-4xl font-black tracking-tight text-[#0a0a0a]" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {references.map((r, i) => (
            <Reveal
              key={r.name}
              className="h-full"
              delay={Math.min(i, 3) * 90}
              distance={36}
              scaleFrom={0.96}
              duration={0.7}
            >
              <article className="flex h-full flex-col border border-[#e8e8e8] rounded-2xl p-8 bg-white">
                <span aria-hidden className="block font-serif text-4xl leading-none text-[#e63329] mb-4">&ldquo;</span>
                <blockquote className="text-[1.05rem] text-[#333] leading-relaxed font-light text-pretty mb-8">
                  {r.quote}
                </blockquote>
                <div className="mt-auto flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2]">
                    <span className="text-sm font-bold tracking-wide text-[#444]">{r.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0a0a0a] leading-tight">{r.name}</p>
                    <p className="text-xs text-[#888] mt-0.5">{r.role}, {r.company}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-sm text-[#999] mt-8">References and contact details available on request.</p>
        </Reveal>
      </div>
    </section>
  );
}
