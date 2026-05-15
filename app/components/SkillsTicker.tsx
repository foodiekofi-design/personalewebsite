"use client";

const skills = [
  "iOS", "Android", "Design Systems", "Data-heavy Interfaces",
  "User Research", "Figma", "Framer", "Prototyping in Code",
  "B2B SaaS", "Enterprise UX", "AI Tooling", "Component Libraries",
];

export default function SkillsTicker() {
  const doubled = [...skills, ...skills];

  return (
    <div className="overflow-hidden border-t border-b border-[#e8e8e8] py-3 bg-white">
      <div className="ticker-track">
        {doubled.map((skill, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-xs font-medium tracking-widest uppercase text-[#0a0a0a] px-5 whitespace-nowrap">
              {skill}
            </span>
            <span className="text-[#e63329] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
