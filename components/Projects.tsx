"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Layers,
  X,
  Lightbulb,
  CheckCircle,
  Globe,
  Cpu,
  Database,
  Play,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";

type Project = {
  title: string;
  category: "Web" | "Data/AI" | "IoT"; // <-- Kategori IoT sudah ditambahkan di sini
  tags: string[];
  desc: string;
  fullDesc: string;
  problemStatement: string;
  impact: string;
  image: string;
  link: string;
  repo: string;
};

const projects: Project[] = [
  {
    title: "Klasterisasi Wilayah Produksi Padi Karawang",
    category: "Data/AI",
    tags: ["PYTHON", "K-MEANS", "AHC", "FOLIUM", "GEOJSON"],
    desc: "Studi komparasi algoritma K-Means dan Agglomerative Hierarchical Clustering (AHC) untuk dasar pemberian subsidi pertanian.",
    fullDesc: "Penelitian skripsi yang membandingkan kinerja algoritma K-Means dan AHC dalam klasterisasi wilayah produksi padi di Kabupaten Karawang berdasarkan variabel luas panen dan jumlah produksi periode 2023-2025. Hasil klasterisasi kemudian divisualisasikan ke dalam bentuk Choropleth Map menggunakan Folium dan GeoJSON.",
    problemStatement: "Kondisi produksi padi yang tidak merata antar kecamatan menyebabkan kebijakan distribusi subsidi dan sarana pertanian berpotensi tidak tepat sasaran apabila diseragamkan tanpa menganalisis karakteristik masing-masing wilayah terlebih dahulu.",
    impact: "Berhasil membuktikan bahwa metode AHC (Average Linkage) lebih optimal dari K-Means. Pemetaan wilayah menjadi klaster tinggi dan rendah ini dapat dijadikan dasar rekomendasi objektif bagi pemerintah daerah dalam mendistribusikan subsidi pupuk dan benih.",
    image:"/project/skripsi-padi.png",
    link: "https://colab.research.google.com/drive/1K4wboqbFGTmDBvvd840GdyQpT6psVW47?usp=sharing",
    repo: "https://github.com/Taufiqurrohmanyuares/skripsi-klasterisasi-wilayah-produksi-padi-di-karawang",
  },
  {
    title: "Smart Pet Feeder Berbasis IoT",
    category: "IoT", // <-- Kategori project sudah diubah menjadi IoT
    tags: ["IoT", "ESP32", "BLYNK", "HARDWARE"],
    desc: "Sistem pemberian pakan hewan peliharaan otomatis berbasis IoT dengan kendali jarak jauh melalui aplikasi smartphone.",
    fullDesc: "Penelitian dan pengembangan prototipe Smart Pet Feeder terintegrasi IoT menggunakan ESP32, sensor Load Cell untuk menimbang berat pakan, dan sensor Ultrasonik untuk mendeteksi stok ketersediaan pakan. Proyek ini telah diterbitkan di Jurnal Informatika dan Teknik Elektro Terapan (JITET).",
    problemStatement: "Mobilitas pemilik hewan yang tinggi sering menyebabkan ketidakteraturan pemberian pakan. Sistem yang ada seringkali hanya berbasis jadwal waktu (time-based) tanpa memantau jumlah takaran pakan aktual secara akurat.",
    impact: "Sistem berhasil memberikan pakan secara otomatis maupun manual secara presisi. Pengguna dapat memantau ketersediaan stok pakan dan mengontrol perangkat secara real-time dari jarak jauh melalui aplikasi Blynk.",
    image: "/project/smart-pet-feeder.jpg", 
    link: "https://youtube.com/shorts/ZB_rRIFlWdk", 
    repo: "#", 
  },
  {
    title: "Warung Keuangan",
    category: "Web",
    tags: ["NEXT.JS", "TAILWIND CSS", "WEB APP", "AI"], 
    desc: "Aplikasi pencatatan dan manajemen keuangan interaktif untuk mempermudah pemantauan arus kas.",
    fullDesc: "Platform web yang dirancang untuk membantu pengguna atau pemilik usaha kecil (warung) dalam mencatat pemasukan dan pengeluaran secara digital, praktis, dan real-time.",
    problemStatement: "Pencatatan keuangan secara manual seringkali rentan terhadap kesalahan perhitungan dan risiko hilangnya data, sehingga menyulitkan evaluasi arus kas.",
    impact: "Memberikan kemudahan pelacakan finansial yang lebih tertata, meminimalisir kesalahan perhitungan, dan membantu pengguna mengambil keputusan finansial yang lebih baik.",
    image: "/project/warung-keuangan.jpg", 
    link: "https://warung-keuangan.vercel.app/",
    repo: "https://github.com/Taufiqurrohmanyuares/warung-keuangan.git", 
  },
  {
    title: "Porsi",
    category: "Web",
    tags: ["NEXT.JS","SUPABASE", "TAILWIND CSS", "AI", "WEB APP"], 
    desc: "Aplikasi split-bill cerdas berbasis web untuk membagi tagihan patungan dengan adil, cepat, dan presisi.",
    fullDesc: "Platform web interaktif yang dirancang untuk mempermudah perhitungan pembagian tagihan bersama teman atau kolega. Dilengkapi fitur ekstraksi struk otomatis bertenaga AI Vision dan kalkulator proporsional untuk mendistribusikan harga item, pajak, biaya layanan, serta diskon secara akurat tanpa perlu menginstal aplikasi tambahan.",
    problemStatement: "Menghitung patungan secara manual seringkali memicu kebingungan dan memakan waktu, terutama saat harus membagi beban pajak, service charge, dan diskon secara proporsional yang berisiko tidak adil atau merugikan salah satu pihak (nombok).",
    impact: "Menghadirkan pengalaman berbagi tagihan yang transparan dan 100% adil, menghilangkan rasa canggung saat menagih pembayaran, serta menghemat waktu perhitungan berkat otomatisasi AI dan rekonsiliasi sisa pembulatan rupiah.",
    image: "/project/porsi.jpg", 
    link: "https://porsi-eta.vercel.app/",
    repo: "https://github.com/Taufiqurrohmanyuares/porsi.git", 
  },
  {
    title: "NgajiOnline.id",
    category: "Web",
    tags: ["WEB APP", "EDUCATION", "python", "Django", "javascript"], // Silakan sesuaikan dengan bahasa pemrograman yang dipakai
    desc: "Platform pembelajaran membaca Al-Qur'an secara daring (online) yang fleksibel dan mudah diakses.",
    fullDesc: "Pengembangan sistem informasi pendidikan Ngajionline.id yang dirancang untuk memfasilitasi kegiatan belajar mengaji secara jarak jauh, mempertemukan pengajar (ustaz/ustazah) dan santri dalam satu platform digital.",
    problemStatement: "Keterbatasan waktu, jarak, dan akses untuk menemukan pengajar mengaji yang kompeten seringkali menjadi hambatan utama bagi masyarakat urban untuk belajar Al-Qur'an secara rutin.",
    impact: "Menyediakan alternatif pembelajaran agama yang lebih mudah diakses, memiliki jadwal yang fleksibel, dan dapat menjangkau lebih banyak santri tanpa terhalang batasan lokasi geografis.",
    image: "/project/ngajionline.jpg", // Jangan lupa siapkan screenshot webnya dengan nama ini
    link: "#", // <-- Cukup isi dengan "#", maka tombol Live Demo otomatis MENGHILANG
    repo: "https://github.com/Taufiqurrohmanyuares/Ngajionline.id.git",
  },
];

const SIDE_SCALE = 0.88; // ukuran kartu samping dibanding kartu tengah

const categoryIcon: Record<Project["category"], LucideIcon> = {
  Web: Globe,
  "Data/AI": Database,
  IoT: Cpu,
};

type IconComp = React.ComponentType<{ size?: number | string }>;

// Aksi cepat pada pill: pilih tautan yang paling berguna untuk proyek tersebut
function primaryAction(p: Project): { label: string; href: string; Icon: IconComp } | null {
  if (p.link && p.link !== "#") {
    if (p.link.includes("youtube.com") || p.link.includes("youtu.be"))
      return { label: "Watch video", href: p.link, Icon: Play };
    if (p.link.includes("colab.research"))
      return { label: "Open notebook", href: p.link, Icon: BookOpen };
    return { label: "Live demo", href: p.link, Icon: ExternalLink };
  }
  if (p.repo && p.repo !== "#") return { label: "Source code", href: p.repo, Icon: FiGithub };
  return null;
}

// Posisi kartu relatif terhadap kartu aktif, melingkar (5 kartu -> -2..2)
const rel = (i: number, active: number, n: number) => {
  const half = Math.floor(n / 2);
  return ((((i - active + half) % n) + n) % n) - half;
};

// ================= CAROUSEL: kartu tengah aktif (biru), kartu samping gelap =================
function ProjectCarousel({ onOpen }: { onOpen: (p: Project) => void }) {
  const n = projects.length;
  const [state, setState] = useState({ active: 0, epochs: projects.map(() => 0) });
  const [cardW, setCardW] = useState(320);
  const stageRef = useRef<HTMLDivElement>(null);
  const { active, epochs } = state;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCardW(w < 640 ? Math.max(240, Math.min(290, Math.round(w * 0.74))) : 320);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Kartu yang "meloncat" dari ujung kiri ke kanan (atau sebaliknya) di-remount agar muncul dengan fade
  const goTo = (target: number) => {
    setState((s) => {
      const next = ((target % n) + n) % n;
      if (next === s.active) return s;
      const nextEpochs = s.epochs.map((e, i) =>
        Math.abs(rel(i, next, n) - rel(i, s.active, n)) > 2 ? e + 1 : e
      );
      return { active: next, epochs: nextEpochs };
    });
  };
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  const step1 = cardW * (0.5 + SIDE_SCALE / 2) + 28; // jarak kartu tengah -> kartu samping pertama
  const step2 = cardW * SIDE_SCALE + 24; // jarak antar kartu samping

  return (
    <div>
      <motion.div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Daftar proyek"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        onPanEnd={(_, info: PanInfo) => {
          if (info.offset.x < -50) next();
          else if (info.offset.x > 50) prev();
        }}
        className="relative mx-auto w-full overflow-x-clip focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{ height: cardW < 300 ? 560 : 580, touchAction: "pan-y" }}
      >
        {projects.map((p, i) => {
          const o = rel(i, active, n);
          const isActive = o === 0;
          const x = o === 0 ? 0 : Math.sign(o) * (step1 + (Math.abs(o) - 1) * step2);
          const scale = isActive ? 1 : SIDE_SCALE;
          const opacity = Math.abs(o) > 2 ? 0 : Math.abs(o) === 2 ? 0.55 : 1;
          const bg = isActive ? "#2953DD" : "#0F1736";
          const num = String(i + 1).padStart(2, "0");
          const Icon = categoryIcon[p.category];
          const action = primaryAction(p);

          return (
            <motion.div
              key={`${p.title}-${epochs[i]}`}
              role={isActive ? undefined : "button"}
              tabIndex={isActive ? -1 : 0}
              aria-label={isActive ? undefined : `Tampilkan proyek ${p.title}`}
              onClick={() => {
                if (!isActive) goTo(i);
              }}
              onKeyDown={(e) => {
                if (!isActive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  goTo(i);
                }
              }}
              initial={{ x, y: "-50%", scale, opacity: 0, backgroundColor: bg }}
              animate={{ x, y: "-50%", scale, opacity, backgroundColor: bg }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              style={{ width: cardW, marginLeft: -cardW / 2, zIndex: 10 - Math.abs(o) }}
              className={`absolute left-1/2 top-1/2 rounded-[28px] border p-3.5 ${
                isActive
                  ? "border-white/25 shadow-[0_30px_80px_-20px_rgba(74,117,255,0.55)]"
                  : "cursor-pointer border-white/10 hover:border-white/30"
              }`}
            >
              {/* Kilau halus pada kartu aktif */}
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/20 via-transparent to-black/25"
              />

              {/* Gambar + aksi cepat (pill kuning menimpa tepi kartu) */}
              <div className="relative">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Image
                    src={p.image}
                    alt={isActive ? p.title : ""}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>

                {action && (
                  <motion.a
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9, y: isActive ? 0 : 6 }}
                    transition={{ duration: 0.3, delay: isActive ? 0.15 : 0 }}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                    className="absolute -right-8 bottom-3 z-20 inline-flex items-center gap-2 rounded-full bg-[#FFC53D] px-4 py-2.5 text-[13px] font-bold text-[#060C22] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-colors hover:bg-white"
                  >
                    <action.Icon size={15} />
                    {action.label}
                    <ArrowUpRight size={14} />
                  </motion.a>
                )}
              </div>

              {/* Kategori + nomor urut */}
              <div className="mt-4 flex items-center justify-between text-[13px]">
                <span
                  className={`inline-flex items-center gap-1.5 font-medium transition-colors duration-300 ${
                    isActive ? "text-white/85" : "text-[#9DB4FF]"
                  }`}
                >
                  <Icon size={14} /> {p.category}
                </span>
                <span
                  className={`font-display tabular-nums transition-colors duration-300 ${
                    isActive ? "text-white/60" : "text-white/40"
                  }`}
                >
                  {num}
                </span>
              </div>

              {/* Judul selalu terlihat di semua kartu */}
              <h3
                className={`mt-2 line-clamp-2 text-[24px] font-semibold leading-[1.1] tracking-tight transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/85"
                }`}
              >
                {p.title}
              </h3>

              <p
                className={`mt-3 line-clamp-3 text-[15px] leading-[1.45] transition-colors duration-300 ${
                  isActive ? "text-white/85" : "text-white/50"
                }`}
              >
                {p.desc}
              </p>

              {/* Hanya kartu aktif: teknologi + tombol detail */}
              <motion.div
                aria-hidden={!isActive}
                initial={false}
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/80">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onOpen(p)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC53D] px-6 py-3.5 text-[15px] font-bold text-[#060C22] transition-colors hover:bg-white"
                >
                  Lihat detail <ArrowRight size={16} />
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Kontrol: panah + indikator */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Proyek sebelumnya"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white hover:text-[#060C22]"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ke proyek ${i + 1}: ${p.title}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#FFC53D]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Proyek berikutnya"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white hover:text-[#060C22]"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

// ================= KOMPONEN UTAMA =================
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative flex min-h-dvh flex-col justify-center border-b border-white/10 py-20 md:py-28 overflow-hidden"
    >
      {/* Header */}
      <div className="w-full text-center max-w-2xl mx-auto mb-10 md:mb-12 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/80 text-sm font-medium mb-4 cursor-default"
        >
          <Layers size={14} /> Portofolio
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
        >
          Featured <span className="relative inline-block">
            <span className="relative z-10 text-[#FFC53D]">Projects.</span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-3 bg-[#FFC53D]/30 -z-0 -rotate-2 origin-left"
            />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white/80 text-base md:text-lg"
        >
          Eksplorasi teknis dan studi kasus dari berbagai proyek pengembangan web serta analisis data spasial yang telah saya kerjakan.
        </motion.p>
      </div>

      <ProjectCarousel onOpen={setSelectedProject} />

      {/* ================= SIDEBAR / DRAWER DETAIL PROJECT ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop Gelap Transparan di Belakang */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Konten Sidebar dari Kanan */}
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-2xl bg-[#0B1130] border-l border-white/10 shadow-2xl flex flex-col h-full z-10 overflow-hidden"
            >
              {/* Tombol Close Mengambang */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/90 backdrop-blur-md flex items-center justify-center text-white hover:text-slate-900 transition-all shadow-lg hover:scale-105 active:scale-95"
                aria-label="Close Sidebar"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto h-full scroll-smooth bg-[#0B1130]">
                {/* Header Banner Image */}
                <div className="relative w-full h-72 md:h-80 bg-[#060C22] overflow-hidden group">
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130] via-[#0B1130]/50 to-transparent" />
                  
                  {/* Title over Image */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-2 flex-wrap mb-4"
                    >
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold tracking-wider text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight"
                    >
                      {selectedProject.title}
                    </motion.h2>
                  </div>
                </div>

                {/* Isi Detail Sidebar */}
                <div className="p-8 md:p-10 flex flex-col gap-10 bg-[#0B1130] rounded-t-3xl -mt-6 relative z-20">
                  
                  {/* Overview */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-bold text-white mb-3">Project Overview</h4>
                    <p className="text-white/70 text-base leading-relaxed">
                      {selectedProject.fullDesc}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Problem Statement */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-orange-400/10 border border-orange-300/20 rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-sm font-bold text-orange-300 mb-3 flex items-center gap-2">
                        <Lightbulb size={16} /> Problem
                      </h4>
                      <p className="text-white/75 text-sm leading-relaxed">
                        {selectedProject.problemStatement}
                      </p>
                    </motion.div>

                    {/* Impact & Results */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-emerald-400/10 border border-emerald-300/20 rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
                        <CheckCircle size={16} /> Solution & Impact
                      </h4>
                      <p className="text-white/75 text-sm leading-relaxed">
                        {selectedProject.impact}
                      </p>
                    </motion.div>
                  </div>

                  {/* Tombol Aksi Bawah */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10"
                  >
                    {/* Tombol GitHub HANYA muncul jika link repo bukan "#" */}
                    {selectedProject.repo !== "#" && selectedProject.repo !== "" && (
                      <a
                        href={selectedProject.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-white hover:bg-[#FFC53D] text-[#060C22] text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
                      >
                        <FiGithub size={16} /> View Source Code
                      </a>
                    )}
                    
                    {/* Tombol Live Demo HANYA muncul jika link bukan "#" */}
                    {selectedProject.link !== "#" && selectedProject.link !== "" && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-[#4A75FF]/15 hover:bg-[#4A75FF]/25 border border-[#4A75FF]/40 text-[#9DB4FF] text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
                      >
                        <ExternalLink size={16} /> {selectedProject.link.includes('youtube.com') ? 'Watch Video' : 'Live Demo'}
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
