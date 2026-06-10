import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../../components/Reveal";

type StudyImage = { src: string; caption: string };

type CaseStudy = {
  title: string;
  company: string;
  year: string;
  type: string;
  team: string;
  tools: string;
  platform: string;
  tldr: string;
  metrics: { value: string; label: string }[];
  problem: string;
  approach: { heading: string; body: string }[];
  outcome: string;
  learned: string;
  tags: string[];
  heroColor: string;
  heroTextLight: boolean;
  heroImage: string | null;
  images: StudyImage[];
};

// Order here is the recommended reading order; the home page controls card order.
const caseStudies: Record<string, CaseStudy> = {
  "film-finder": {
    title: "Co-founding a film discovery app and growing it from 0 to 100 weekly users",
    company: "Film Finder",
    year: "2022 to present",
    type: "iOS · Android · Founder",
    team: "Two co-founders. I lead design and ship code.",
    tools: "Figma, React Native, Expo, Substack",
    platform: "iOS and Android",
    tldr: "Film Finder's early users could not find films that matched their actual taste, only their genre. I redesigned discovery and onboarding and shipped the code alongside my co-founder. Weekly active users grew from around 20 to 100 and the newsletter reached 2,000 subscribers.",
    metrics: [
      { value: "5×", label: "weekly active users" },
      { value: "2,000", label: "Substack subscribers" },
      { value: "iOS + Android", label: "live in both stores" },
    ],
    problem:
      "Genre filtering was too blunt. Someone who loves Parasite and Get Out does not want \"horror and thriller\", they want a specific tone and intelligence that tags cannot capture. The homepage was a generic feed, and onboarding was a wall of posters that created noise and drop off straight after signup.",
    approach: [
      {
        heading: "Talked to the people who were leaving",
        body: "I ran 12 interviews with early users, 22 in total at a 65% response rate. One pattern came up again and again: people do not want more options, they want better guidance.",
      },
      {
        heading: "Cut choice at the right moments",
        body: "I replaced the generic feed with a \"Top 3 For You\" model for fast decisions, and moved deeper browsing into a separate Discover tab so the two jobs stopped fighting each other.",
      },
      {
        heading: "Simplified onboarding",
        body: "Genre selection went from poster heavy screens to compact chips that are faster to scan and complete. Onboarding dropped from seven steps to three.",
      },
      {
        heading: "Built the design system and shipped it",
        body: "I built the component library in Figma covering recommendation cards, film detail cards, genre chips and navigation states, then wrote production React Native alongside my co-founder.",
      },
    ],
    outcome:
      "Weekly active users grew from around 20 to 100 after the onboarding redesign. The Substack newsletter reached 2,000 subscribers, and the taste anchored recommendation model became the core of how we position the product.",
    learned:
      "First session experience drives retention more than feature depth. The growth came once we finally simplified onboarding, and I would have done that six months earlier.",
    tags: ["iOS", "Android", "Consumer App", "Founder", "Design Systems"],
    heroColor: "#0a0a0a",
    heroTextLight: true,
    heroImage: "/projects/film-finder.png",
    images: [],
  },
  "ai-workflows": {
    title: "Rebuilding my design process at Gearset with AI coding tools",
    company: "Gearset",
    year: "2024",
    type: "Enterprise · AI Tooling",
    team: "Solo workflow experiment, shared with the design team",
    tools: "Cursor, Claude, Figma, React",
    platform: "Web and enterprise",
    tldr: "Research kept going stale before it became a testable prototype. I rebuilt my own workflow with AI coding tools to close that gap, then documented it for the team. Along the way I designed how customers review changes to AI agents before they deploy them.",
    metrics: [
      { value: "1 day", label: "research to prototype" },
      { value: "15", label: "customers interviewed" },
      { value: "Shared", label: "with the design team" },
    ],
    problem:
      "There were two problems running at once. For me, research, synthesis and prototyping happened in separate stages and context leaked between them. For Gearset customers, reviewing changes to AI agent and bot data was slow, because the underlying structure was deeply nested and small changes carried knock on effects that were not obvious.",
    approach: [
      {
        heading: "Used AI for synthesis, not just ideas",
        body: "I built research databases and used AI to surface recurring themes across 15 customer conversations while they were still fresh, instead of waiting a week to write things up.",
      },
      {
        heading: "Designed for confident review",
        body: "I moved from mirroring the raw nested structure to flatter, grouped views. Status came first, unchanged detail was de-emphasised, and changes were broken into reviewable units with diff style visibility and approval before anything ran.",
      },
      {
        heading: "Prototyped in real code",
        body: "Static screens could not test expansion, grouping and progressive reveal, so I built interactive prototypes with AI assisted coding and tested behaviour directly. I kept the calls on what to test, keep or reject.",
      },
    ],
    outcome:
      "I can now go from synthesised research to an interactive prototype in a single session instead of across days. The work produced real interaction models the team could react to early, and I documented the process and shared it with the wider design team.",
    learned:
      "AI helps most when it removes friction, not when it tries to replace thinking. I would also frame this as a team proposal sooner, so the output was less tied to my own setup.",
    tags: ["AI Tooling", "Prototyping", "Enterprise UX", "Design Engineering"],
    heroColor: "#0f1117",
    heroTextLight: true,
    heroImage: "/projects/ai-workflows.png",
    images: [
      { src: "/projects/ai-workflows-diff.png", caption: "Diff style review: changes broken into reviewable units with status visible up front." },
      { src: "/projects/ai-workflows-synthesis.png", caption: "AI assisted synthesis surfacing recurring themes across customer conversations." },
    ],
  },
  "beauhurst-integrations": {
    title: "Designing Beauhurst's first native CRM integration",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Enterprise",
    team: "One designer (me), one engineer, product lead",
    tools: "Figma, Maze, HubSpot API",
    platform: "Web",
    tldr: "Beauhurst customers were exporting spreadsheets by hand to keep their CRMs current. I designed the company's first native integration. 73 clients switched it on within six months, 46% past the adoption target.",
    metrics: [
      { value: "73", label: "clients adopted" },
      { value: "46%", label: "above target" },
      { value: "6 mo", label: "to hit it" },
    ],
    problem:
      "Analysts, fund managers and VC associates were keeping their CRMs current by exporting CSVs by hand. It broke the moment a company record changed and it ate hours every week. They wanted live data inside the tools they already used, not another export.",
    approach: [
      {
        heading: "Mapped the real workflows",
        body: "I ran discovery with eight customers to see how they actually used their CRMs. The key finding: most people knew what they wanted the data to mean, not how it was stored. So the mapping screen had to be guided and opinionated, not a raw field to field editor.",
      },
      {
        heading: "Designed a guided mapping flow",
        body: "I ran three rounds of usability testing on the mapping step alone, which drove two iterations before launch. We shipped with HubSpot and Salesforce support.",
      },
      {
        heading: "Built reusable patterns",
        body: "I documented components for data mapping states, error handling and sync confirmation. Other Beauhurst features adopted them later.",
      },
    ],
    outcome:
      "73 clients turned the integration on within six months, 46% past the adoption target. The mapping component system became a reference pattern for later Beauhurst features.",
    learned:
      "I would validate the field mapping model with non technical users earlier. We assumed analysts understood CRM field structures and several did not, so we iterated on that screen twice after launch.",
    tags: ["Product Design", "User Research", "Design Systems", "B2B SaaS"],
    heroColor: "#f5f0eb",
    heroTextLight: false,
    heroImage: "/projects/integrations.png",
    images: [
      { src: "/projects/integrations-heatmap.png", caption: "Usability testing on the mapping flow: 5.6s average to complete, 24% misclick rate before iteration." },
      { src: "/projects/integrations-research.png", caption: "Discovery sessions with existing customers to map the CRM workflows they actually used." },
    ],
  },
  "charges-and-mortgages": {
    title: "Bringing charge and mortgage data into Beauhurst",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Data Platform",
    team: "One designer (me), two engineers, data team lead",
    tools: "Figma, Lookback, SQL (read)",
    platform: "Web",
    tldr: "Analysts had to leave Beauhurst to check charges and mortgages, which broke their research flow. I redesigned the ingestion flow and built the product surface. Subscription orders rose 20% with 3,600 unique views in three months.",
    metrics: [
      { value: "20%", label: "subscription increase" },
      { value: "3,600", label: "unique views" },
      { value: "3 mo", label: "post launch" },
    ],
    problem:
      "Analysts and fund managers needed charge and mortgage data, but they were leaving Beauhurst to find it and breaking their research flow. The hard part was making dense legal data readable for someone who understands what it means commercially, not legally.",
    approach: [
      {
        heading: "Mapped the data model first",
        body: "I worked through the full model with engineering before designing anything. That surfaced edge cases in Scottish and Welsh property law that created inconsistent data states we had not planned for.",
      },
      {
        heading: "Tested three ways to show charge hierarchy",
        body: "The timeline view won. It gave analysts the temporal context to judge risk without reading the underlying legal documents.",
      },
    ],
    outcome:
      "Subscription orders went up 20% and the feature drew 3,600 unique views in its first three months. The timeline view was reused in two later data features on the platform.",
    learned:
      "The data was messier than we scoped. I would run a proper data audit before starting visual design on anything this data heavy.",
    tags: ["Data UX", "Product Design", "Enterprise"],
    heroColor: "#0a0a0a",
    heroTextLight: true,
    heroImage: "/projects/charges.png",
    images: [],
  },
  translink: {
    title: "An accessible transport chatbot grounded in real user research",
    company: "Translink",
    year: "2022",
    type: "Conversational · Accessibility",
    team: "Solo design, stakeholder workshops",
    tools: "Chatbot.com, Figma, persona workshops",
    platform: "Mobile and web",
    tldr: "Translink's call centre was overwhelmed by repeat questions from disabled and impaired users. I researched and designed an accessible chatbot. The prototype was not shipped on budget grounds, but the research shaped the voice service Translink launched next, which cut call volume.",
    metrics: [
      { value: "30", label: "chatbots benchmarked" },
      { value: "12", label: "real calls analysed" },
      { value: "Live", label: "fed a shipped service" },
    ],
    problem:
      "Disabled and impaired users were calling Translink for the same things over and over: accessibility features, staff support, schedules. That strained representatives and pushed up wait times. They needed a clear, accessible self serve option that did not assume how a user reads, scrolls or remembers.",
    approach: [
      {
        heading: "Benchmarked widely",
        body: "I ran heuristic evaluations against 25 to 30 chatbot apps and found consistent gaps in onboarding, error handling and responsive design.",
      },
      {
        heading: "Grounded it in real conversations",
        body: "A persona workshop with stakeholders mapped user types, and 12 call centre recordings shaped the chatbot's structure and tone.",
      },
      {
        heading: "Tested with real needs",
        body: "Six participants with mixed cognitive and visual needs tested the prototype. I iterated on onboarding clarity, error recovery and a responsive layout that did not force horizontal scrolling when zoomed.",
      },
    ],
    outcome:
      "The prototype did not ship because of budget, but the research fed directly into the voice service Translink rolled out next, which reduced call centre queries. Foundational research moved the product even when the first deliverable did not launch.",
    learned:
      "Accessibility cannot be a layer you add at the end. Building for cognitive and visual needs from the first screen changed the structure of the whole flow, not just its styling.",
    tags: ["Conversational Design", "Accessibility", "User Research", "Service Design"],
    heroColor: "#1a1a1a",
    heroTextLight: true,
    heroImage: "/projects/translink.png",
    images: [
      { src: "/projects/translink-heuristics.png", caption: "Heuristic evaluation mapping violations, severity and recommendations across benchmarked apps." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map(slug => ({ slug }));
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const textColor = study.heroTextLight ? "text-white" : "text-[#0a0a0a]";
  const mutedColor = study.heroTextLight ? "text-white/50" : "text-[#888]";
  const meta = [
    { label: "Role", value: "Product Designer" },
    { label: "Platform", value: study.platform },
    { label: "Team", value: study.team },
    { label: "Tools", value: study.tools },
  ];

  return (
    <>
      <Nav />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <div
          className="w-full pt-32 pb-16 px-6 md:px-12"
          style={{ background: study.heroColor }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${mutedColor}`}>
              {study.company} · {study.year}
            </p>
            <h1 className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black tracking-tight leading-[1.08] max-w-3xl text-balance mb-8 ${textColor}`}>
              {study.title}
            </h1>
            <p className={`text-lg leading-relaxed font-light max-w-2xl text-pretty ${study.heroTextLight ? "text-white/70" : "text-[#444]"}`}>
              {study.tldr}
            </p>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t ${study.heroTextLight ? "border-white/10" : "border-black/10"}`}>
              {meta.map(m => (
                <div key={m.label}>
                  <p className={`text-xs uppercase tracking-widest mb-1.5 ${mutedColor}`}>{m.label}</p>
                  <p className={`text-sm font-medium leading-snug ${textColor}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image */}
        {study.heroImage && (
          <div className="bg-[#f4f4f4]">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src={study.heroImage}
                  alt={`${study.company} ${study.title}`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Metrics bar */}
        <div className="bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-wrap gap-x-14 gap-y-6">
              {study.metrics.map(m => (
                <div key={m.label}>
                  <p className="text-3xl font-black text-white tracking-tight tabular-nums">{m.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 space-y-16">

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-5">The problem</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light text-pretty">{study.problem}</p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-8">What I did</h2>
            <div className="space-y-8">
              {study.approach.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-sm font-black text-[#ccc] tabular-nums pt-1 shrink-0 w-6">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0a0a0a] mb-2 text-balance">{step.heading}</h3>
                    <p className="text-[1.05rem] text-[#444] leading-relaxed font-light text-pretty">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Process images */}
          {study.images.map(img => (
            <figure key={img.src} className="w-[100vw] relative left-1/2 -translate-x-1/2 px-6 md:px-12">
              <div className="max-w-5xl mx-auto">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-black/10 bg-[#f4f4f4]">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
                <figcaption className="text-sm text-[#999] mt-3 text-center font-light">{img.caption}</figcaption>
              </div>
            </figure>
          ))}

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-5">The outcome</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light text-pretty">{study.outcome}</p>
          </Reveal>

          <Reveal as="section" className="bg-[#fafafa] rounded-2xl p-8 ring-1 ring-black/[0.06]">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-4">What I would do differently</h2>
            <p className="text-base text-[#555] leading-relaxed text-pretty">{study.learned}</p>
          </Reveal>

          <div className="flex flex-wrap gap-2 pt-2">
            {study.tags.map(tag => (
              <span key={tag} className="text-xs font-medium bg-[#f2f2f2] text-[#444] px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="border-t border-[#e8e8e8] max-w-5xl mx-auto px-6 md:px-12 py-10">
          <Link href="/#work" className="text-sm font-semibold text-[#0a0a0a] hover:text-[#e63329] transition-colors">
            ← Back to all work
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
