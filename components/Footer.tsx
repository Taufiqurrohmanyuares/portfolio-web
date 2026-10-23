import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/70 bg-[#rgba(41, 83, 221, 0.38]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-slate-500 sm:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Taufiqurrohman Yuares. All rights reserved.</p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
        <a
          href="#home"
          className="group inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-indigo-600"
        >
          Kembali ke atas
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}