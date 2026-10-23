"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Mail, Send, CheckCircle2 } from "lucide-react";

// Ganti nomor di bawah ini kalau nomor WhatsApp berubah
const WHATSAPP_NUMBER = "6281224571994";
const MESSAGE_LIMIT = 500;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    responseTime: "Biasanya balas dalam beberapa jam",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    accent: "emerald" as const,
  },
  {
    icon: Mail,
    label: "taufiqyuarez@email.com",
    responseTime: "Untuk keperluan formal",
    href: "mailto:taufiq@email.com",
    accent: "indigo" as const,
  },
];

const accentClasses = {
  emerald: {
    bg: "bg-emerald-400/15",
    border: "border-emerald-300/30",
    text: "text-emerald-300",
    hoverBg: "group-hover:bg-emerald-500",
    dot: "bg-emerald-300",
  },
  indigo: {
    bg: "bg-[#4A75FF]/15",
    border: "border-[#4A75FF]/30",
    text: "text-[#9DB4FF]",
    hoverBg: "group-hover:bg-[#4A75FF]",
    dot: "bg-white",
  },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "message" && value.length > MESSAGE_LIMIT) return;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const text = `Halo Taufiq, perkenalkan saya ${form.name} (${form.email}).\n\n${form.message}`;
    const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 600);
  };

  return (
    <section id="contact" className="relative flex min-h-dvh items-center py-20 md:py-32 overflow-hidden">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2953DD] rounded-full blur-3xl opacity-30 -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFC53D] rounded-full blur-3xl opacity-10 -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Kolom Kiri: Informasi Kontak */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.15]">
              Let&apos;s build something <br />
              <span className="relative inline-block text-[#FFC53D]">
                awesome together.
                <svg
                  className="absolute left-0 -bottom-1.5 w-full"
                  height="10"
                  viewBox="0 0 260 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    d="M2 7 C 60 2, 200 2, 258 7"
                    stroke="#FFC53D"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md">
              Punya ide proyek, tawaran kolaborasi, atau sekadar ingin berdiskusi tentang pengembangan Web dan Data Mining? Jangan ragu untuk menyapa!
            </p>
          </motion.div>

          {/* Timeline saluran respons — urut dari yang paling cepat dibalas */}
          <motion.div variants={fadeUp} className="relative pl-0 mb-10">
            <div className="absolute left-7 top-14 bottom-14 w-px bg-white/25" aria-hidden="true" />

            <div className="flex flex-col gap-8">
              {channels.map((channel) => {
                const c = accentClasses[channel.accent];
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group relative"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 ${c.hoverBg} group-hover:text-white ${c.text} transition-all duration-300 shadow-sm relative z-10`}>
                      <channel.icon size={22} />
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-bold text-white group-hover:text-[#FFC53D] transition-colors">
                        {channel.label}
                      </p>
                      <p className="text-xs md:text-sm text-white/70 flex items-center gap-1.5 mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                        {channel.responseTime}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Lokasi — info tambahan, bukan bagian dari saluran respons */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pt-6 border-t border-white/15"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center flex-shrink-0 text-white">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/50 mb-0.5">
                Based in
              </p>
              <p className="text-sm md:text-base font-bold text-white">
                Karawang, Jawa Barat
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Kolom Kanan: Form -> mengarah ke WhatsApp */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#4A75FF] rounded-[2.5rem] rotate-2 opacity-10 scale-[0.98] -z-10" />

          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.04] backdrop-blur rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/30 border border-white/10 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2 text-xs text-white/60 -mt-1 mb-1">
              <MessageCircle size={14} className="text-emerald-500 flex-shrink-0" />
              Isi form ini, WhatsApp akan terbuka dengan pesanmu sudah terisi otomatis.
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                placeholder="Cth: John Doe"
                required
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#4A75FF] focus:ring-4 focus:ring-[#4A75FF]/20 transition-all disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Cth: john@example.com"
                required
                value={form.email}
                onChange={handleChange}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#4A75FF] focus:ring-4 focus:ring-[#4A75FF]/20 transition-all disabled:opacity-60"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="message" className="block text-sm font-medium text-white/80">
                  Pesan
                </label>
                <span className="text-[11px] font-medium text-white/40">
                  {form.message.length}/{MESSAGE_LIMIT}
                </span>
              </div>
              <textarea
                id="message"
                placeholder="Ceritakan detail proyek atau tawaran Anda di sini..."
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#4A75FF] focus:ring-4 focus:ring-[#4A75FF]/20 resize-none transition-all disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full text-sm font-bold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-1 ${
                isSuccess
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-[#FFC53D] hover:bg-white text-[#060C22] shadow-lg shadow-[#FFC53D]/15"
              }`}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Membuka WhatsApp...</span>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={18} /> Terbuka di WhatsApp!
                </>
              ) : (
                <>
                  Kirim via WhatsApp <Send size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}