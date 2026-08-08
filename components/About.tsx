"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Download, MessageCircle } from "lucide-react";

// Ganti nomor di bawah ini kalau nomor WhatsApp berubah
const WHATSAPP_NUMBER = "6281224571994";
const WHATSAPP_MESSAGE = "Halo Taufiq, saya ingin berdiskusi soal project.";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
    <section id="about" className="py-20 md:py-32 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Kolom Kiri: Foto & Badge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          {/* Wrapper luar untuk animasi melayang terus-menerus */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[340px] md:max-w-[380px]"
          >
            <div
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="relative aspect-[4/5]"
            >
              {/* Kotak kuning di belakang, sedikit "bernapas" */}
              <motion.div
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 w-full h-full bg-[#FFC53D] rounded-3xl -z-10"
              />

              <motion.div
                ref={cardRef}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute inset-0 bg-slate-100 rounded-3xl overflow-hidden shadow-md"
              >
                <Image
                  src="/profile.jpg"
                  alt="Taufiqurrohman Yuares"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                style={{ transform: "translateZ(30px)" }}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-white px-6 py-5 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-slate-100 min-w-[150px] cursor-default"
              >
                <span className="text-3xl font-black text-[#3B82F6] mb-1">AI</span>
                <span className="text-xs text-slate-600 text-center font-bold leading-snug">
                  Data Mining <br /> & Web Dev
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Kolom Kanan: Teks & Konten */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-[2.2] md:leading-[2.5]">
              I AM{" "}
              {/* === NAMA DITAMBAHKAN DI SINI === */}
              <span className="inline-block bg-[#3B82F6] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-2xl sm:text-3xl md:text-4xl tracking-tight shadow-sm mx-1 mb-2 md:mb-0">
                TAUFIQURROHMAN YUARES
              </span>
              <br className="hidden md:block" />
              <span className="bg-[#10B981] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-xl text-xl md:text-2xl tracking-tight shadow-sm inline-block mt-1">
                INFORMATICS STUDENT & DEV
              </span>
            </h2>
          </motion.div>

         <motion.div 
            variants={fadeUp} 
            className="border-l-[3px] border-[#8B5CF6] pl-5 md:pl-6 mb-10"
          >
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Sebagai lulusan Informatika, saya memiliki minat yang besar untuk terus mengeksplorasi persimpangan antara pengembangan web dan analisis data. Saya menikmati proses membangun antarmuka yang fungsional, sekaligus memahami bagaimana data di belakangnya dapat diolah.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Meskipun masih terus belajar dan berkembang, pengalaman saya sejauh ini mencakup pembuatan aplikasi web dengan framework modern serta penerapan algoritma machine learning (seperti K-Means dan AHC) menggunakan Python. Saya adalah pembelajar yang adaptif dan selalu antusias menghadapi tantangan teknis baru.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 md:gap-10">
            
            <a
              href="/CV-taufiqurrohman Yuares.pdf"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs md:text-sm font-bold tracking-widest px-7 py-3.5 md:px-8 md:py-4 rounded-full inline-flex items-center gap-3 transition-colors shadow-lg"
            >
              <Download size={18} />
              DOWNLOAD CV
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl transition-transform hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-emerald-500 transition-colors">
                <MessageCircle size={20} className="text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 text-base md:text-lg font-bold leading-tight mb-1 group-hover:text-emerald-600 transition-colors">
                  Chat via WhatsApp
                </span>
                <span className="text-slate-500 text-xs md:text-sm font-medium">
                  Balas cepat, biasanya dalam sehari
                </span>
              </div>
            </a>
            
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}