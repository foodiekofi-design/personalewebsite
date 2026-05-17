import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";

const caseStudies: Record<string, {
  title: string;
  company: string;
  year: string;
  type: string;
  team: string;
  tools: string;
  tldr: string;
  metrics: { value: string; label: string }[];
  role: string;
  problem: string;
  process: string;
  outcome: string;
  different: string;
  tags: string[];
  heroColor: string;
  heroTextLight: boolean;
}> = {
  "beauhurst-integrations": {
    title: "How I helped 73 enterprise clients sync live company data to their CRM",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Enterprise",
    team: "1 designer (me), 1 engineer, product lead",
    tools: "Figma, Maze, HubSpot API",
    tldr: "Beauhurst's customers were manually exporting CSV data to update their CRMs. I designed the company's first native integration — 73 clients adopted it within 6 months, 46% above the adoption target.",
    metrics: [
      { value: "73", label: "clients adopted" },
      { value: "46%", label: "above target" },
      { value: "6mo", label: "post-launch" },
    ],
    role: "I was responsible for end-to-end design across web, iOS, and Android surfaces. I worked directly with one engineer and reported to the product lead.",
    problem: "Beauhurst customers — financial analysts, fund managers, VC associates — were manually exporting CSV data to keep their CRMs current. The workflow was fragile, time-consuming, and broke the moment a company record was updated. They needed live data in their tools, not periodic exports.",
    process: "I ran discovery sessions with 8 existing customers to map the CRM workflows they actually used. The critical insight was that most users didn't understand CRM field structures — they knew what they wanted the data to mean, not how it was stored. This shaped everything: the mapping interface had to be opinionated and guided, not just a raw field-to-field editor.\n\nI ran three rounds of usability testing on the mapping flow specifically, which surfaced two iterations before launch. We shipped with HubSpot and Salesforce support.\n\nTo maintain consistency across the integration flows, I built and documented reusable components for data mapping states, error handling, and sync confirmation — patterns later adopted across other Beauhurst features.",
    outcome: "73 clients adopted the integration within 6 months — 46% above the target. The mapping component system became a reference pattern for subsequent Beauhurst features.",
    different: "If I were starting this project again, I'd have invested more time upfront validating the field-mapping model with non-technical users. We assumed analysts would understand CRM field structures — several early adopters didn't, and we iterated on the mapping interface twice post-launch. Earlier usability testing on that specific flow would have saved a sprint.",
    tags: ["Product Design", "User Research", "Design Systems", "B2B SaaS"],
    heroColor: "#1a1a1a",
    heroTextLight: true,
  },
  "charges-and-mortgages": {
    title: "Adding charge and mortgage data to Beauhurst — 20% subscription growth in 3 months",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Data Platform",
    team: "1 designer (me), 2 engineers, data team lead",
    tools: "Figma, Lookback, SQL (read)",
    tldr: "Financial analysts couldn't access charge and mortgage data inside Beauhurst without switching tools. I redesigned the data ingestion flow and built the product surface — subscription orders increased 20% and the feature had 3,600 unique views in its first 3 months.",
    metrics: [
      { value: "20%", label: "subscription increase" },
      { value: "3,600", label: "unique views" },
      { value: "3mo", label: "post-launch" },
    ],
    role: "End-to-end product design across the data ingestion pipeline and new feature surface. I worked with two engineers and a data team lead.",
    problem: "Financial analysts and fund managers needed charge and mortgage data — but they were switching out of Beauhurst to access it, breaking their research flow. The challenge was making dense legal data legible to someone who understands what it means commercially, but not legally.",
    process: "The primary users were financial analysts and fund managers — non-technical users who needed to interpret dense legal data quickly without becoming lawyers. I mapped the full data model with the engineering team first, which surfaced edge cases in Scottish and Welsh property law that created inconsistent data states we hadn't accounted for.\n\nI tested three approaches to presenting charge hierarchy before landing on the timeline view — it gave analysts the temporal context they needed to assess risk without requiring them to read the underlying legal documents.",
    outcome: "Subscription orders increased 20% and the feature had 3,600 unique views in its first 3 months. The timeline view became a reference pattern used in two subsequent data features on the platform.",
    different: "The data model for charges was more complex than we initially scoped — there were edge cases in Scottish and Welsh property law that created inconsistent data states we hadn't designed for. I'd push for a more thorough data audit before starting visual design on data-heavy features like this.",
    tags: ["Data UX", "Product Design", "Enterprise", "Beauhurst"],
    heroColor: "#f5f0eb",
    heroTextLight: false,
  },
  "ai-workflows": {
    title: "How I rebuilt my design process at Gearset using AI coding tools",
    company: "Gearset",
    year: "2024",
    type: "Enterprise · AI Tooling",
    team: "Solo — personal workflow experiment",
    tools: "Cursor, Claude, Figma, React",
    tldr: "Research synthesis at Gearset was creating a long gap between insights and testable prototypes. I rebuilt my own workflow using AI coding tools to collapse that gap — and documented the process so the wider team could adopt it.",
    metrics: [
      { value: "1 day", label: "research to prototype" },
      { value: "4", label: "sessions validated" },
      { value: "Shared", label: "with design team" },
    ],
    role: "Individual contributor, design lead on the workflow experiment. I scoped, ran, and documented the process change independently before presenting it to the wider team.",
    problem: "At Gearset, the gap between research synthesis and testable prototype was too long. By the time a prototype was ready to test, the research insights were already a week old and the team had moved on. The problem wasn't tooling — it was the time cost of translating synthesis into something interactive.",
    process: "I started using AI coding tools (Cursor, Claude) to turn synthesis notes directly into working prototypes during or immediately after research sessions. The first experiment collapsed a 3-day synthesis-to-prototype cycle into a single afternoon.\n\nI ran this workflow across 4 research sessions before I was confident enough to document it. The key learning was that you need a grounded component system first — AI tools working against your actual design system produce far better output than working from scratch.",
    outcome: "I can now move from synthesised research to an interactive prototype in a single working session rather than across multiple days. I documented the process in full and shared it with the Gearset design team.",
    different: "I started this as a personal process experiment without buy-in from the wider team. If I were doing this again I'd frame it as a team proposal earlier — getting one other designer involved from the start would have made the documented output more generalisable and less tied to my specific workflow.",
    tags: ["AI Tooling", "Prototyping", "Process Design", "Gearset"],
    heroColor: "#0f1117",
    heroTextLight: true,
  },
  "film-finder": {
    title: "Designing and co-founding a film discovery app from 0 to 100 weekly active users",
    company: "Film Finder",
    year: "2022–present",
    type: "iOS · Android · Founder",
    team: "2 co-founders — I lead design and contributed code",
    tools: "Figma, React Native, Expo, Substack",
    tldr: "Film Finder's early users couldn't find films relevant to their actual taste — not just genre. I redesigned discovery and onboarding from scratch, growing weekly active users from 20 to 100 and building a newsletter audience of 2,000.",
    metrics: [
      { value: "5×", label: "weekly active users" },
      { value: "2,000", label: "Substack subscribers" },
      { value: "iOS + Android", label: "live in app stores" },
    ],
    role: "Film Finder is available on iOS and Android. I am the sole designer and a contributing engineer — I have shipped production code alongside my co-founder throughout the project.",
    problem: "Film Finder's early users couldn't find films that matched their actual taste. Genre-based filtering was too blunt — someone who likes Parasite and Get Out doesn't just want 'horror and thriller', they want a specific tone, intelligence, and cultural context that genre tags can't capture.",
    process: "I ran 12 user interviews with early adopters to understand how they actually talk about film preferences. The insight was that taste is relational — people describe what they like in terms of other films they've seen, not abstract categories.\n\nI redesigned the onboarding flow to start with a small set of films the user has seen, then use those as anchors for the recommendation engine. I reduced the onboarding from 7 steps to 3, which increased completion rates significantly.\n\nTo keep the UI consistent as the product scaled, I built a component library in Figma covering recommendation cards, film detail cards, genre selector chips, and bottom navigation states.",
    outcome: "Weekly active users grew from 20 to 100 following the redesigned onboarding. The Substack newsletter grew to 2,000 subscribers. The film-anchored recommendation model became the core of the product's positioning.",
    different: "I underestimated how much the onboarding experience would affect long-term retention. We focused on feature depth early when we should have obsessed over the first-session experience. The WAU growth came after we finally simplified onboarding — I'd have done that 6 months earlier.",
    tags: ["iOS", "Android", "Consumer App", "Founder", "Design Systems"],
    heroColor: "#0a0a0a",
    heroTextLight: true,
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

  return (
    <>
      <Nav />
      <main className="bg-white min-h-screen">

        {/* Full-bleed hero */}
        <div
          className="w-full min-h-[60vh] flex flex-col justify-end pt-32 pb-16 px-6 md:px-12"
          style={{ background: study.heroColor }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${mutedColor}`}>
              {study.company} · {study.year}
            </p>
            <h1 className={`text-[clamp(1.8rem,4vw,3.2rem)] font-black tracking-tight leading-[1.1] max-w-3xl mb-10 ${textColor}`}>
              {study.title}
            </h1>

            {/* Metadata grid */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t ${study.heroTextLight ? "border-white/10" : "border-black/10"}`}>
              <div>
                <p className={`text-xs uppercase tracking-widest mb-1 ${mutedColor}`}>Role</p>
                <p className={`text-sm font-medium ${textColor}`}>Product Designer</p>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-widest mb-1 ${mutedColor}`}>Year</p>
                <p className={`text-sm font-medium ${textColor}`}>{study.year}</p>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-widest mb-1 ${mutedColor}`}>Team</p>
                <p className={`text-sm font-medium ${textColor}`}>{study.team}</p>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-widest mb-1 ${mutedColor}`}>Tools</p>
                <p className={`text-sm font-medium ${textColor}`}>{study.tools}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="bg-[#0a0a0a] border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-wrap gap-12">
              {study.metrics.map(m => (
                <div key={m.label}>
                  <p className="text-3xl font-black text-white tracking-tight">{m.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TL;DR */}
        <div className="border-b border-[#e8e8e8]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
            <p className="text-2xl text-[#0a0a0a] leading-relaxed font-light max-w-3xl">{study.tldr}</p>
          </div>
        </div>

        {/* Body — text column */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 space-y-20">

          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">The problem</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light">{study.problem}</p>
          </section>

          {/* Wide image placeholder */}
          <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-[#f2f2f2] h-[420px] flex items-center justify-center">
            <p className="text-sm text-[#bbb] font-medium tracking-wide">Add full-width image here</p>
          </div>

          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">Process &amp; decisions</h2>
            {study.process.split("\n\n").map((para, i) => (
              <p key={i} className="text-lg text-[#333] leading-relaxed font-light mb-6">{para}</p>
            ))}
          </section>

          {/* Two-column image placeholders */}
          <div className="grid grid-cols-2 gap-4 w-[100vw] relative left-1/2 -translate-x-1/2 px-6 md:px-12">
            <div className="bg-[#f2f2f2] h-72 rounded-xl flex items-center justify-center">
              <p className="text-xs text-[#bbb]">Image</p>
            </div>
            <div className="bg-[#f2f2f2] h-72 rounded-xl flex items-center justify-center">
              <p className="text-xs text-[#bbb]">Image</p>
            </div>
          </div>

          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">Outcome</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light">{study.outcome}</p>
          </section>

          <section className="bg-[#fafafa] rounded-2xl p-8 border border-[#e8e8e8]">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-4">What I&apos;d do differently</h2>
            <p className="text-base text-[#555] leading-relaxed">{study.different}</p>
          </section>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e8e8e8]">
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
