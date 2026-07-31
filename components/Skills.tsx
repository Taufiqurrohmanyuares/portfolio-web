"use client";

import { Sparkles, ChartNoAxesCombined } from "lucide-react";

type Category = "web" | "data";

type Skill = {
  name: string;
  icon?: string;
  category: Category;
};

const skills: Skill[] = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "data" },
  { name: "Data Mining", category: "data" },
  { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", category: "data" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", category: "web" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "web" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "web" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "web" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "web" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", category: "web" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", category: "web" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "web" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", category: "web" },
];

const categoryStyles: Record<Category, { border: string; hoverText: string }> = {
  web: {
    border: "hover:border-indigo-300",
    hoverText: "group-hover:text-indigo-600",
  },
  data: {
    border: "hover:border-emerald-300",
    hoverText: "group-hover:text-emerald-600",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#F8F9FF] border-b border-slate-200/80 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-2xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} /> Tools & Technologies
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Tech{" "}
          <span className="relative inline-block text-indigo-600">
            Skills.
            <svg
              className="absolute left-0 -bottom-1 w-full"
              height="10"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 7 C 40 2, 160 2, 198 7"
                stroke="#4F46E5"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                opacity="0.35"
              />
            </svg>
          </span>
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          Kombinasi tools pengembangan web dan pengolahan data yang biasa saya gunakan sehari-hari.
        </p>
      </div>

      <div className="flex flex-col relative max-w-[100vw]">
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#F8F9FF] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#F8F9FF] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-left pause-on-hover">
          {[...skills, ...skills].map((skill, index) => {
            const s = categoryStyles[skill.category];
            return (
              <div
                key={`${skill.name}-${index}`}
                className={`flex items-center gap-3 bg-white border border-slate-200 px-6 py-4 rounded-full mx-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md ${s.border} transition-all cursor-pointer group`}
              >
                {skill.icon ? (
                  <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                ) : (
                  <ChartNoAxesCombined size={22} className="text-emerald-600 flex-shrink-0" />
                )}
                <span className={`text-slate-800 font-semibold text-sm md:text-base whitespace-nowrap ${s.hoverText} transition-colors`}>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}