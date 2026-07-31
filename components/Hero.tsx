"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, FileText, Guitar, X } from "lucide-react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

const socials = [
  { icon: FiGithub, href: "https://github.com" },
  { icon: FiInstagram, href: "https://instagram.com" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/taufiqyuares/" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showWonderwall, setShowWonderwall] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="relative py-20 md:py-28 bg-[#F8F9FF] border-b border-slate-200/80 overflow-hidden"
    >
      {/* ================= BACKGROUND ANIMATED BLOBS ================= */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 md:right-32 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 md:left-40 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20 relative z-10">
        
        {/* ================= KOLOM TEKS (KIRI) ================= */}
        <div className="w-full md:w-auto md:max-w-xl">
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4 flex items-center gap-2"
          >
            <span className="w-6 h-0.5 bg-indigo-600 rounded-full"></span>
            Karawang, Indonesia — terbuka untuk kolaborasi
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-6"
          >
            Taufiqurrohman{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-700">
              Yuares
              <svg
                className="absolute left-0 -bottom-1 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 7 C 40 2, 160 2, 198 7"
                  stroke="#4F46E5"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.div variants={fadeUp} className="flex gap-3 mb-8">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-indigo-600 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-slate-600 text-base leading-relaxed mb-10 max-w-lg">
            Membangun aplikasi web yang fungsional dan berpusat pada pengguna, sambil terus mendalami machine learning dan data mining lewat studi kasus nyata.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-slate-900 text-white text-sm font-bold tracking-wide px-7 py-3.5 rounded-full flex items-center gap-2 hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300"
            >
              <Briefcase size={17} /> View Projects
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowWonderwall(true)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-bold tracking-wide px-7 py-3.5 rounded-full flex items-center gap-2 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <FileText size={17} /> Review CV
            </a>
          </motion.div>

          {/* Easter egg — klasik "anyway, here's Wonderwall". Tombol dibuat lebih interaktif */}
          <motion.div variants={fadeUp} className="mt-6 w-fit">
            <motion.button
              type="button"
              onClick={() => setShowWonderwall((prev) => !prev)}
              whileHover={{ y: -2 }}
              className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl pl-3 pr-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                <motion.span
                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-indigo-400"
                />
                <div className="relative flex items-end gap-[3px] h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                      className="w-[3px] rounded-full bg-indigo-500 group-hover:bg-white transition-colors duration-300"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-slate-800 group-hover:text-indigo-600 text-sm font-bold leading-tight transition-colors">
                  Anyway, here&apos;s Wonderwall
                </span>
                <span className="text-slate-400 text-[11px] font-medium">
                  {showWonderwall ? "Sedang diputar — klik untuk stop" : "Klik untuk dengerin"}
                </span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* ================= KOLOM KARTU PROFIL (KANAN) ================= */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <motion.div
            variants={fadeUp}
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <motion.div
              ref={cardRef}
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-80 sm:w-[380px] h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-200 bg-slate-900"
            >
              <Image
                src="/profile3.jpg"
                alt="Foto Profil Taufiqurrohman"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover object-center"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

              <div className="absolute top-8 left-8 right-8" style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-white text-2xl font-bold tracking-tight">
                  Taufiqurrohman <span className="text-indigo-400">Yuares</span>
                </h3>
                <p className="text-white/80 text-sm mt-1.5 font-medium">Web Developer & Data/Ai</p>
              </div>

              <div 
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center justify-between shadow-lg"
                style={{ transform: "translateZ(40px)" }}
              >
                <div>
                  <p className="text-slate-900 text-sm font-bold leading-tight">@taufiqyuarez</p>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">Informatics</p>
                </div>

                <a
                  href="#contact"
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* Mini player mengambang */}
      <AnimatePresence>
        {showWonderwall && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-5 right-5 z-[100] w-64 bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button
              type="button"
              onClick={() => setShowWonderwall(false)}
              aria-label="Matikan musik"
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X size={14} />
            </button>

            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/bx1Bh8ZvH84?autoplay=1&loop=1&playlist=bx1Bh8ZvH84"
                title="Oasis - Wonderwall (Official Video)"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div className="px-3.5 py-2.5 flex items-center gap-2 text-white/70 text-[11px] font-medium">
              <Guitar size={13} className="text-indigo-400 flex-shrink-0" />
              <span className="truncate">Now playing: Wonderwall</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}