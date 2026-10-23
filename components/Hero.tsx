"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, FileText, Music, SkipForward } from "lucide-react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import HangingBadge from "@/components/HangingBadge";

const socials = [
  { icon: FiGithub, href: "https://github.com/Taufiqurrohmanyuares" },
  { icon: FiInstagram, href: "https://instagram.com/taufiqyrs_" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/taufiqyuares/" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const playlist = [
  { title: "Teh Hijau", src: "/TULUS - Teh Hijau.mp3" },
  { title: "Foto Kita Blur", src: "/Foto kita blur - Sal Priadi (Lyrics).mp3" },
  { title: "Overnight", src: "/Overnight - Kita Lewati Berdua.mp3" }
];

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Konten hero naik dan memudar pelan saat di-scroll
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Autoplay diblokir oleh browser. Menunggu interaksi pengguna.", error);
      });
    }
  }, []); 

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      return (prevIndex + 1) % playlist.length;
    });
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
         audioRef.current.play().catch(e => console.log(e));
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="relative flex min-h-dvh w-full items-stretch border-b border-white/10 overflow-hidden"
    >
      <audio 
        ref={audioRef} 
        src={playlist[currentTrackIndex].src} 
        onEnded={playNextTrack} 
        className="hidden" 
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 md:right-32 w-64 h-64 bg-[#2953DD]/30 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 md:left-40 w-72 h-72 bg-[#FFC53D]/10 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 md:flex-row md:items-stretch md:px-10">

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="w-full py-24 md:w-1/2 md:max-w-xl md:shrink-0 md:self-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-white/70 mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-0.5 bg-[#FFC53D] rounded-full"></span>
            Karawang, Indonesia — terbuka untuk kolaborasi
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[1.02] mb-6"
          >
            Taufiqurrohman{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9DB4FF]">
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
                  stroke="#FFC53D"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.9"
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
                className="w-11 h-11 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-[#060C22] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-white/70 text-base leading-relaxed mb-10 max-w-lg">
            Membangun aplikasi web yang fungsional dan berpusat pada pengguna, sambil terus mendalami machine learning dan data mining lewat studi kasus nyata.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-[#FFC53D] text-[#060C22] text-sm font-bold px-7 py-3.5 rounded-full flex items-center gap-2 hover:bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FFC53D]/20 transition-all duration-300"
            >
              <Briefcase size={17} /> View Projects
            </a>

            <a
              href="/CV-taufiqurrohman Yuares.pdf"
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 border border-white/15 text-white text-sm font-bold px-7 py-3.5 rounded-full flex items-center gap-2 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FileText size={17} /> Review CV
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3 w-fit">
            <motion.button
              type="button"
              onClick={toggleAudio}
              whileHover={{ y: -2 }}
              className="group flex items-center gap-3 bg-white/5 border border-white/15 hover:border-white/30 rounded-2xl pl-3 pr-5 py-2.5 transition-all duration-300"
            >
              <div className={`relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isPlaying ? 'bg-[#2953DD]' : 'bg-white/10 border border-white/15 group-hover:bg-white/15'}`}>
                {isPlaying && (
                  <motion.span
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-[#4A75FF]"
                  />
                )}
                {isPlaying ? (
                  <div className="relative flex items-end gap-[3px] h-4">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                        className="w-[3px] rounded-full bg-white transition-colors duration-300"
                      />
                    ))}
                  </div>
                ) : (
                  <Music size={16} className="text-white/80" />
                )}
              </div>

              <div className="flex flex-col items-start w-32 truncate">
                <span className={`text-sm font-bold leading-tight transition-colors truncate w-full text-left ${isPlaying ? 'text-[#FFC53D]' : 'text-white'}`}>
                  {isPlaying ? playlist[currentTrackIndex].title : 'Vibes Mode'}
                </span>
                <span className="text-white/50 text-[11px] font-medium">
                  {isPlaying ? 'Klik untuk pause' : 'Klik untuk putar lagu'}
                </span>
              </div>
            </motion.button>
            
            <motion.button
              type="button"
              onClick={playNextTrack}
              whileHover={{ y: -2 }}
              className="w-11 h-11 bg-white/5 border border-white/15 hover:border-white/30 rounded-full flex items-center justify-center transition-all duration-300 text-white/70 hover:text-white"
              aria-label="Next Track"
            >
               <SkipForward size={18} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Lencana ID yang tergantung di tali: bisa ditarik dan diayun */}
        <div className="relative h-[620px] w-full md:h-auto md:flex-1">
          <HangingBadge
            image="/profile3.jpg"
            firstName="Taufiqurrohman"
            lastName="Yuares"
            role="Web Developer & Data/Ai"
            handle="@taufiqyuarez"
            field="Informatics"
            contactHref="#contact"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center md:flex">
        <motion.a
          href="#projects"
          aria-label="Scroll ke proyek"
          variants={fadeUp}
          className="pointer-events-auto flex flex-col items-center gap-2 text-[11px] font-semibold tracking-widest text-white/60 hover:text-white transition-colors"
        >
          Scroll
          <span className="flex h-9 w-5 justify-center rounded-full border-2 border-current pt-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-current"
            />
          </span>
        </motion.a>
      </div>
    </motion.section>
  );
}