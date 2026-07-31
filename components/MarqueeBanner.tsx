"use client";

type Category = "web" | "data" | "identity";

const items: { label: string; category: Category }[] = [
  { label: "INFORMATICS", category: "identity" },
  { label: "WEB DEVELOPER", category: "web" },
  { label: "NEXT.JS", category: "web" },
  { label: "K-MEANS CLUSTERING", category: "data" },
  { label: "AGGLOMERATIVE HIERARCHICAL", category: "data" },
  { label: "PYTHON", category: "data" },
  { label: "DATA MINING & AI", category: "data" },
];

const categoryStyles: Record<Category, { dot: string; border: string; hoverText: string }> = {
  web: {
    dot: "bg-indigo-500",
    border: "border-indigo-100 hover:border-indigo-300",
    hoverText: "group-hover:text-indigo-600",
  },
  data: {
    dot: "bg-emerald-500",
    border: "border-emerald-100 hover:border-emerald-300",
    hoverText: "group-hover:text-emerald-600",
  },
  identity: {
    dot: "bg-slate-400",
    border: "border-slate-200 hover:border-slate-300",
    hoverText: "group-hover:text-slate-900",
  },
};

export default function MarqueeBanner() {
  return (
    <div className="py-6 bg-white overflow-hidden border-b border-slate-200/80 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-scroll 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Efek Gradient Fade di Kiri & Kanan */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Container Marquee: tag chip berwarna per kategori */}
      <div className="flex w-max animate-marquee items-center gap-3">
        {[...items, ...items, ...items].map((item, index) => {
          const s = categoryStyles[item.category];
          return (
            <span
              key={index}
              className={`group flex items-center gap-2 whitespace-nowrap bg-white border ${s.border} rounded-full px-4 py-2 transition-colors cursor-default`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0`} />
              <span className={`text-xs md:text-sm font-bold tracking-wide text-slate-600 ${s.hoverText} transition-colors`}>
                {item.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}