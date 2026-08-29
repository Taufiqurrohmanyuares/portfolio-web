"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, RotateCw, ChevronDown, ChevronUp } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  desc: string;
  credentialId: string;
  link: string;
  image: string;
};

// Data sertifikat yang diambil dari dokumen asli
const certifications: Certification[] = [
  {
    title: "Platform and Web Developer Certified Independent Study",
    issuer: "Kampus Merdeka MSIB x Educourse.id",
    date: "Dec 31, 2024",
    desc: "Sertifikat kelulusan Studi Independen (900 Jam) bidang Platform and Web Development (Specialist Education Platform) Batch 7.",
    credentialId: "EDU-123/SI-MSIB-7/XII/2024/12033668",
    link: "#",
    image: "/certs/educourse.jpg", // Diperbaiki dari /public/ menjadi /certs/
  },
  {
    title: "Sertifikat Kompetensi: Penyuntingan Video (Editor)",
    issuer: "BNSP & LSP BPPTIK",
    date: "20 Jun 2024",
    desc: "Sertifikasi kompetensi resmi dari Badan Nasional Sertifikasi Profesi (BNSP) pada bidang pekerjaan Video Editor.",
    credentialId: "59111 2654 3 0006802 2024",
    link: "#",
    image: "/certs/bnsp.jpg",
  },
  {
    title: "Pelatihan Video Editor (VSGA DTS 2024)",
    issuer: "Kementerian Kominfo & BPPTIK",
    date: "20 Feb 2024",
    desc: "Menyelesaikan 67 Jam Pelatihan Video Editor pada program Vocational School Graduate Academy Digital Talent Scholarship.",
    credentialId: "1937373860-129/VSGA/BLSDM.Kominfo/2024",
    link: "#",
    image: "/certs/vsga.jpg",
  },
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "13 Agu 2026",
    desc: "Membahas tuntas dasar HTML dan CSS sebagai tiga fondasi pembuatan website.",
    credentialId: "07Z6QKDORZQR",
    link: "https://dicoding.com/certificates/07Z6QKDORZQR",
    image: "/certs/dicoding-dasar-web.jpg", // Sesuaikan nama file
  },
  {
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "26 Agu 2026",
    desc: "Membuat aplikasi front-end web yang interaktif serta memiliki fitur penyimpanan menggunakan web storage.",
    credentialId: "2VX3V2VD4PYQ",
    link: "https://dicoding.com/certificates/2VX3V2VD4PYQ",
    image: "/certs/dicoding-frontend.jpg", // Sesuaikan nama file
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    date: "26 Agu 2026",
    desc: "Menguasai dasar JavaScript untuk pengembangan aplikasi web menggunakan Node.js.",
    credentialId: "4EXGJ6121XRL",
    link: "https://dicoding.com/certificates/4EXGJ6121XRL",
    image: "/certs/dicoding-js.jpg", // Sesuaikan nama file
  },
  {
    title: "Pelatihan Digital Marketing Dasar",
    issuer: "Disparbud Kab. Karawang & Relawan TIK",
    date: "31 Okt 2025",
    desc: "Sertifikasi kompetensi program GANTAR (Gerakan Anak Muda Terapkan Aksi Kreatif) bidang Digital Marketing.",
    credentialId: "106382/GANTAR/RTIK-KRW/X/2025",
    link: "#",
    image: "/certs/gantar.jpg",
  },
  {
    title: "Koordinator Departemen Hubungan Masyarakat",
    issuer: "BEM FASILKOM UNSIKA",
    date: "Desember 2025",
    desc: "Penghargaan atas peran dan dedikasinya untuk Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer UNSIKA periode 2024/2025.",
    credentialId: "047/UN64.7/BEM-FASILKOM/XII/2025",
    link: "#",
    image: "/certs/bem-humas.jpg",
  },
  {
    title: "Koordinator Divisi Peralatan Fasilkom Cup 2025",
    issuer: "BEM FASILKOM UNSIKA",
    date: "27-29 Jun 2025",
    desc: "Berpartisipasi aktif dalam kepanitiaan acara Fasilkom Cup 2025: Beyond Limits: Sport & Art in Harmony.",
    credentialId: "046/TPA-FASILKOM.CUP/BEM-FASILKOM/VI/2025",
    link: "#",
    image: "/certs/fasilkom-cup.jpg",
  },
  {
    title: "Kepanitiaan Welcoming Maba 2025",
    issuer: "BEM FASILKOM UNSIKA",
    date: "14 Agu 2025",
    desc: "Berpartisipasi dalam kepanitiaan penyambutan mahasiswa baru dengan tema Step Forward: Embrace Your Campus Journey.",
    credentialId: "019/TPA-WEBA/BEM-FASILKOM/VIII/2025",
    link: "#",
    image: "/certs/weba.jpg",
  },
  {
    title: "Anggota Divisi PDD Softskill Improvement 2025",
    issuer: "BEM FASILKOM UNSIKA",
    date: "17 Apr 2025",
    desc: "Berpartisipasi aktif pada acara SIM 2025: Unlocking Career Success through Soft Skills.",
    credentialId: "020/TPA-SIM2025/BEM-FASILKOM/IV/2025",
    link: "#",
    image: "/certs/sim.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const INITIAL_VISIBLE_COUNT = 6;

export default function LearningJournal() {
  const [flipped, setFlipped] = useState<boolean[]>(certifications.map(() => false));
  const [showAll, setShowAll] = useState(false);

  const toggleFlip = (index: number) => {
    setFlipped((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const hasMore = certifications.length > INITIAL_VISIBLE_COUNT;
  const visibleCertifications = showAll
    ? certifications
    : certifications.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section id="journal" className="py-20 md:py-32 bg-white border-b border-slate-200/80">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center max-w-2xl mx-auto mb-16 px-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
          <Award size={14} /> Credential & Proof
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Licenses &{" "}
          <span className="relative inline-block text-indigo-600">
            Certifications.
            <svg
              className="absolute left-0 -bottom-1 w-full"
              height="10"
              viewBox="0 0 260 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 7 C 60 2, 200 2, 258 7"
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
          Klik kartu untuk melihat detail dan tautan verifikasi tiap sertifikasi.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCertifications.map((item, i) => (
          <motion.div
            key={item.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1 }}
            variants={fadeUp}
            className="aspect-[4/3] w-full"
            style={{ perspective: 1200 }}
          >
            <button
              type="button"
              onClick={() => toggleFlip(i)}
              aria-label={`Balik kartu ${item.title}`}
              className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 rounded-3xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: flipped[i] ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ================= SISI DEPAN (GAMBAR SERTIFIKAT) ================= */}
                <div
                  className="absolute inset-0 bg-slate-100 border border-slate-200/80 rounded-3xl overflow-hidden shadow-md group"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={item.image}
                    alt={`Sertifikat ${item.title}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradien agar teks terbaca */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white/90 text-xs font-bold drop-shadow-md">
                    <RotateCw size={14} className="text-indigo-400" />
                    Klik untuk detail
                  </div>
                </div>

                {/* ================= SISI BELAKANG (DETAIL & LINK VERIFIKASI) ================= */}
                <div
                  className="absolute inset-0 bg-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug pr-3">
                        {item.title}
                      </h3>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 flex-shrink-0 mt-1 bg-white/10 px-2 py-1 rounded-md">
                        {item.date}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">
                      {item.issuer}
                    </p>

                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.desc}
                    </p>

                    <span className="text-[10px] md:text-xs font-mono text-slate-500 break-all">
                      ID: {item.credentialId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold">
                      <RotateCw size={12} /> Tutup
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-1.5 bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      Verify <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </button>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex justify-center mt-12 px-6"
        >
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 text-xs md:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            {showAll ? (
              <>
                Sembunyikan <ChevronUp size={16} />
              </>
            ) : (
              <>
                Lihat Semua ({certifications.length}) <ChevronDown size={16} />
              </>
            )}
          </button>
        </motion.div>
      )}
    </section>
  );
}