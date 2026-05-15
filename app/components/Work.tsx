import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    slug: "beauhurst-integrations",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Enterprise",
    title: "Beauhurst Integrations",
    description: "Designed Beauhurst's first CRM integration — 73 clients adopted it within 6 months, exceeding the target by 46%.",
    tags: ["Product Design", "User Research", "Design Systems"],
    image: "/projects/integrations.png",
    color: "#f0f0f0",
  },
  {
    slug: "charges-and-mortgages",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Data Platform",
    title: "Charges & Mortgages",
    description: "Brought charge and mortgage data into Beauhurst's platform — subscription orders up 20%, with 3,600 unique views in the first 3 months.",
    tags: ["Data UX", "Product Design", "Enterprise"],
    image: "/projects/charges.png",
    color: "#f5f0eb",
  },
  {
    slug: "ai-workflows",
    company: "Gearset",
    year: "2024",
    type: "Enterprise · AI Tooling",
    title: "AI-Assisted Design Workflows",
    description: "Rebuilt my research-to-prototype pipeline at Gearset using AI coding tools — turning synthesis sessions into working prototypes in hours, not days.",
    tags: ["AI Tooling", "Prototyping", "Process Design"],
    image: "/projects/ai-workflows.png",
    color: "#eef0f5",
  },
  {
    slug: "film-finder",
    company: "Film Finder",
    year: "2022–present",
    type: "iOS · Android · Founder",
    title: "Film Finder",
    description: "Co-founded Film Finder and redesigned discovery and onboarding — weekly active users grew from 20 to 100, with 2,000 Substack subscribers.",
    tags: ["iOS", "Android", "Consumer App", "Founder"],
    image: "/projects/film-finder.png",
    color: "#0a0a0a",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-3">Selected Work</p>
            <h2 className="text-4xl font-black tracking-tight text-[#0a0a0a]">Case studies</h2>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="project-card group flex flex-col md:flex-row items-stretch border border-[#e8e8e8] rounded-2xl overflow-hidden hover:border-[#0a0a0a] transition-all duration-300 hover:shadow-lg"
            >
              {/* Left — project info */}
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

              {/* Right — image */}
              <div
                className="flex-1 relative overflow-hidden min-h-[260px]"
                style={{ background: project.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full project-image transition-transform duration-500">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/20 text-6xl font-black">{(i + 1).toString().padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-xs font-medium text-[#444]">{project.type}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
