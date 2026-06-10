import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

// To add a real screenshot, drop it in /public/projects/ and set `image`
// to its path (e.g. "/projects/integrations.png"). Until then, leave it
// null and the card shows a branded placeholder.
const projects: {
  slug: string;
  company: string;
  year: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  color: string;
  dark?: boolean;
}[] = [
  {
    slug: "film-finder-brand",
    company: "Film Finder",
    year: "2022 to present",
    type: "Brand · Identity System",
    title: "Film Finder: Brand",
    description: "Built Film Finder's full identity from the logo to the shirt. One bolt, one yellow, working as a single system across product, web, merch and social.",
    tags: ["Brand Identity", "Design Systems", "Art Direction", "Founder"],
    image: "/projects/brand/card.png",
    color: "#faf9f6",
  },
  {
    slug: "film-finder",
    company: "Film Finder",
    year: "2022 to present",
    type: "iOS · Android · Founder",
    title: "Film Finder: Product",
    description: "Co-founded a film discovery app and redesigned discovery and onboarding. Weekly active users grew from 20 to 100, with 2,000 newsletter subscribers.",
    tags: ["iOS", "Android", "Consumer App", "Founder"],
    image: "/projects/film-finder.png",
    color: "#f1f1f3",
  },
  {
    slug: "ai-workflows",
    company: "Gearset",
    year: "2024",
    type: "Enterprise · AI Tooling",
    title: "AI-Assisted Design Workflows",
    description: "Rebuilt my research to prototype pipeline with AI coding tools, and designed how customers review AI agent changes before deploying them.",
    tags: ["AI Tooling", "Prototyping", "Design Engineering"],
    image: "/projects/ai-workflows.png",
    color: "#eef0f5",
  },
  {
    slug: "beauhurst-integrations",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Enterprise",
    title: "Beauhurst Integrations",
    description: "Designed Beauhurst's first native CRM integration. 73 clients adopted it within six months, 46% past the target.",
    tags: ["Product Design", "User Research", "Design Systems"],
    image: "/projects/integrations.png",
    color: "#f0ece6",
  },
  {
    slug: "charges-and-mortgages",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Data Platform",
    title: "Charges & Mortgages",
    description: "Brought charge and mortgage data into the platform. Subscription orders rose 20%, with 3,600 unique views in the first three months.",
    tags: ["Data UX", "Product Design", "Enterprise"],
    image: "/projects/charges.png",
    color: "#f1f1f1",
  },
  {
    slug: "translink",
    company: "Translink",
    year: "2022",
    type: "Conversational · Accessibility",
    title: "Accessible Transport Chatbot",
    description: "Researched and designed an accessible transport chatbot. The research shaped the voice service Translink shipped next, which cut call volume.",
    tags: ["Conversational Design", "Accessibility", "User Research"],
    image: "/projects/translink.png",
    color: "#8b8da4",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-3">Selected Work</p>
              <h2 className="text-4xl font-black tracking-tight text-[#0a0a0a]">Case studies</h2>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 3) * 90}>
            <Link
              href={`/work/${project.slug}`}
              className="project-card group flex flex-col md:flex-row items-stretch border border-[#e8e8e8] rounded-2xl overflow-hidden hover:border-[#c9c9c9] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04),0_18px_50px_rgba(0,0,0,0.10)] active:scale-[0.995] transition-[border-color,box-shadow,scale] duration-300"
            >
              {/* Left: project info */}
              <div className="md:w-[340px] shrink-0 p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold text-[#999] tracking-wide uppercase">{project.company}</span>
                    <span className="text-xs text-[#bbb]">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-3 leading-tight">{project.title}</h3>
                  <p className="text-sm text-[#666] leading-relaxed mb-6">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-[#f2f2f2] text-[#444] px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: image frame, fixed 16:10. Design card art to fill it. */}
              <div
                className="relative w-full md:w-auto md:flex-1 aspect-[16/10] overflow-hidden"
                style={{ background: project.color }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover project-image transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between p-8 project-image transition-transform duration-500">
                    <span
                      className={`text-xs font-mono tracking-widest ${project.dark ? "text-white/40" : "text-black/30"}`}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[clamp(1.75rem,3.5vw,3rem)] font-black tracking-tighter leading-[0.95] ${project.dark ? "text-white/90" : "text-black/80"}`}
                    >
                      {project.company}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-xs font-medium text-[#444]">{project.type}</span>
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
