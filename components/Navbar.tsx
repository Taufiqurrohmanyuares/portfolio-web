"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowDown } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#journal" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-0 w-full z-50 px-4 flex justify-center">
      {/* Pill navbar mengambang, tetap palet putih/slate/indigo seperti sebelumnya */}
      <div
        className={`flex items-center gap-1 bg-white border border-slate-200/80 rounded-full pl-2 pr-2 py-2 md:pl-3 md:pr-2.5 md:py-2.5 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-slate-200/60" : "shadow-sm"
        }`}
      >
        {/* Logo / Inisial */}
        <Link
          href="#home"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 text-xs md:text-sm font-black tracking-tight flex-shrink-0"
        >
          TY
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-slate-200 mx-2" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-slate-600 hover:text-indigo-600 uppercase tracking-wide px-3.5 py-2 rounded-full hover:bg-slate-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Pill */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black uppercase tracking-wide px-4 py-2 rounded-full transition-colors ml-1"
        >
          Contact <ArrowDown size={13} strokeWidth={3} />
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 ml-1"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[68px] left-4 right-4 bg-white border border-slate-200/80 rounded-3xl px-6 py-5 flex flex-col gap-1 shadow-xl shadow-slate-200/60"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-slate-700 hover:text-indigo-600 uppercase tracking-wide py-2.5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white text-xs font-black uppercase tracking-wide px-4 py-3 rounded-full"
            >
              Contact <ArrowDown size={13} strokeWidth={3} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}