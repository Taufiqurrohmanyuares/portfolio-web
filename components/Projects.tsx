"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, X, Lightbulb, CheckCircle } from "lucide-react";
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
    tags: ["NEXT.JS", "TAILWIND CSS", "WEB APP"], 
    desc: "Aplikasi pencatatan dan manajemen keuangan interaktif untuk mempermudah pemantauan arus kas.",
    fullDesc: "Platform web yang dirancang untuk membantu pengguna atau pemilik usaha kecil (warung) dalam mencatat pemasukan dan pengeluaran secara digital, praktis, dan real-time.",
    problemStatement: "Pencatatan keuangan secara manual seringkali rentan terhadap kesalahan perhitungan dan risiko hilangnya data, sehingga menyulitkan evaluasi arus kas.",
    impact: "Memberikan kemudahan pelacakan finansial yang lebih tertata, meminimalisir kesalahan perhitungan, dan membantu pengguna mengambil keputusan finansial yang lebih baik.",
    image: "/project/warung-keuangan.jpg", 
    link: "https://warung-keuangan.vercel.app/",
    repo: "https://github.com/Taufiqurrohmanyuares/warung-keuangan.git", 
  },
  {
    title: "Patungin",
    category: "Web",
    tags: ["NEXT.JS","SUPABASE", "TAILWIND CSS", "WEB APP"], 
    desc: "Aplikasi split-bill cerdas berbasis web untuk membagi tagihan patungan dengan adil, cepat, dan presisi.",
    fullDesc: "Platform web interaktif yang dirancang untuk mempermudah perhitungan pembagian tagihan bersama teman atau kolega. Dilengkapi fitur ekstraksi struk otomatis bertenaga AI Vision dan kalkulator proporsional untuk mendistribusikan harga item, pajak, biaya layanan, serta diskon secara akurat tanpa perlu menginstal aplikasi tambahan.",
    problemStatement: "Menghitung patungan secara manual seringkali memicu kebingungan dan memakan waktu, terutama saat harus membagi beban pajak, service charge, dan diskon secara proporsional yang berisiko tidak adil atau merugikan salah satu pihak (nombok).",
    impact: "Menghadirkan pengalaman berbagi tagihan yang transparan dan 100% adil, menghilangkan rasa canggung saat menagih pembayaran, serta menghemat waktu perhitungan berkat otomatisasi AI dan rekonsiliasi sisa pembulatan rupiah.",
    image: "/project/patungin.jpg", 
    link: "https://patungin-seven.vercel.app/",
    repo: "https://github.com/Taufiqurrohmanyuares/patungin.git", 
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

// ================= KOMPONEN KARTU DENGAN EFEK SPOTLIGHT =================
function ProjectCard({ p, index, onClick }: { p: Project; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      className="group relative bg-white p-2.5 rounded-[1.75rem] border border-slate-200/80 shadow-sm cursor-pointer flex flex-col h-full overflow-hidden"
    >
      {/* Efek Spotlight Mengikuti Kursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`,
        }}
      />

      {/* Gambar Project */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 mb-4 z-20">
        <Image 
          src={p.image} 
          alt={p.title} 
          fill 
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-slate-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge Melayang */}
        <motion.div 
          animate={{ y: isHovering ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider text-slate-800 uppercase shadow-md"
        >
          {p.category}
        </motion.div>
      </div>

      {/* Konten */}
      <div className="px-3 pb-2 flex flex-col flex-grow z-20">
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {p.tags.slice(0, 2).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-[9px] font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md"
            >
              {tag}
            </motion.span>
          ))}
          {p.tags.length > 2 && (
            <span className="text-[9px] font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              +{p.tags.length - 2}
            </span>
          )}
        </div>

        <h3 className="text-[17px] leading-snug font-bold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
          {p.title}
        </h3>

        <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5 line-clamp-2">
          {p.desc}
        </p>

        {/* Tombol Pemicu Sidebar */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
          <span className="uppercase tracking-wider">Explore Project</span>
          <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-indigo-100 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md">
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ================= KOMPONEN UTAMA =================
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 md:py-32 bg-[#F8F9FF] border-b border-slate-200/80 relative">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm hover:shadow-md transition-shadow cursor-default"
        >
          <Layers size={14} /> Portofolio
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
        >
          Featured <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Projects.</span>
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-3 bg-indigo-200/50 -z-0 -rotate-2 origin-left"
            />
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-slate-600 text-base md:text-lg"
        >
          Eksplorasi teknis dan studi kasus dari berbagai proyek pengembangan web serta analisis data spasial yang telah saya kerjakan.
        </motion.p>
      </div>

      {/* Grid Cards Menggunakan Komponen Spotlight */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} onClick={() => setSelectedProject(p)} />
        ))}
      </div>

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
              className="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full z-10 overflow-hidden"
            >
              {/* Tombol Close Mengambang */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/90 backdrop-blur-md flex items-center justify-center text-white hover:text-slate-900 transition-all shadow-lg hover:scale-105 active:scale-95"
                aria-label="Close Sidebar"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto h-full scroll-smooth bg-slate-50">
                {/* Header Banner Image */}
                <div className="relative w-full h-72 md:h-80 bg-slate-900 overflow-hidden group">
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
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
                <div className="p-8 md:p-10 flex flex-col gap-10 bg-white rounded-t-3xl -mt-6 relative z-20">
                  
                  {/* Overview */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 mb-3">Project Overview</h4>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {selectedProject.fullDesc}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Problem Statement */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-orange-50/80 border border-orange-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-3 flex items-center gap-2">
                        <Lightbulb size={16} /> Problem
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {selectedProject.problemStatement}
                      </p>
                    </motion.div>

                    {/* Impact & Results */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                        <CheckCircle size={16} /> Solution & Impact
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {selectedProject.impact}
                      </p>
                    </motion.div>
                  </div>

                  {/* Tombol Aksi Bawah */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100"
                  >
                    {/* Tombol GitHub HANYA muncul jika link repo bukan "#" */}
                    {selectedProject.repo !== "#" && selectedProject.repo !== "" && (
                      <a
                        href={selectedProject.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-1 hover:shadow-indigo-600/30"
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
                        className="flex-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 hover:border-indigo-200 text-indigo-600 text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-indigo-100"
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