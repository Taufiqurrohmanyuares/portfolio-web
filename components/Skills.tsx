"use client";

import { motion } from "framer-motion";
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

// Baris kedua memakai urutan terbalik agar dua baris tidak terlihat kembar
const skillsReversed = [...skills].reverse();

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

// 4 salinan sama persis: animasi bergeser tepat 1 salinan (-25%) supaya loop mulus
// dan tetap penuh di layar lebar
const COPIES = 4;

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Skill[];
  direction: "left" | "right";
  duration: number;
}) {
  return (
    <div
      className={`flex w-max pause-on-hover ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      }`}
      style={{ animationDuration: `${duration}s` }}
    >
      {Array.from({ length: COPIES }).map((_, copy) => (
        <div key={copy} className="marquee-copy flex shrink-0" aria-hidden={copy > 0}>
          {items.map((skill) => {
            const s = categoryStyles[skill.category];
            return (
              <div
                key={skill.name}
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
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex min-h-dvh flex-col justify-center bg-[#F8F9FF] py-24 border-b border-slate-200/80 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
        /* Reduce motion: tanpa animasi, semua skill tampil rapi dalam satu blok */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right {
            animation: none;
            width: 100% !important;
            justify-content: center;
          }
          .marquee-copy {
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 0.75rem;
          }
          .marquee-copy[aria-hidden="true"] {
            display: none;
          }
        }
      `}} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto px-6 text-center mb-16"
      >
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
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex w-full max-w-[100vw] flex-col gap-6"
      >
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#F8F9FF] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#F8F9FF] to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={skills} direction="left" duration={35} />
        <MarqueeRow items={skillsReversed} direction="right" duration={42} />
      </motion.div>
    </section>
  );
}