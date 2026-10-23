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
    dot: "bg-[#4A75FF]",
    border: "border-white/10 hover:border-[#4A75FF]/60",
    hoverText: "group-hover:text-white",
  },
  data: {
    dot: "bg-emerald-400",
    border: "border-white/10 hover:border-emerald-400/60",
    hoverText: "group-hover:text-white",
  },
  identity: {
    dot: "bg-[#FFC53D]",
    border: "border-white/10 hover:border-[#FFC53D]/60",
    hoverText: "group-hover:text-white",
  },
};

// 4 salinan sama persis: animasi bergeser tepat 1 salinan (-25%) supaya loop mulus
// dan tetap penuh di layar lebar
const COPIES = 4;

export default function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden border-b border-white/10 bg-white/[0.03] py-6">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee-scroll 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}} />

      {/* Efek Gradient Fade di Kiri & Kanan */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 md:w-32 bg-gradient-to-r from-[#060C22] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 md:w-32 bg-gradient-to-l from-[#060C22] to-transparent" />

      {/* Container Marquee: tag chip berwarna per kategori */}
      <div className="flex w-max animate-marquee items-center">
        {Array.from({ length: COPIES }).map((_, copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-3 pr-3"
            aria-hidden={copy > 0}
          >
            {items.map((item) => {
              const s = categoryStyles[item.category];
              return (
                <span
                  key={item.label}
                  className={`group flex cursor-default items-center gap-2 whitespace-nowrap rounded-full border ${s.border} bg-white/5 px-4 py-2 transition-colors`}
                >
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${s.dot}`} />
                  <span className={`text-sm font-medium text-white/70 ${s.hoverText} transition-colors`}>
                    {item.label}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}