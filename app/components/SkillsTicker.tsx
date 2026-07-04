"use client";

const skills = [
  "iOS", "Android", "Consumer Apps", "Design Systems",
  "User Research", "Figma", "Prototyping in Code", "0 to 1 Products",
  "Brand & Identity", "AI Tooling", "Data Interfaces", "Component Libraries",
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
