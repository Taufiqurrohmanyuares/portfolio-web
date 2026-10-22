"use client";

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

// Hormati pengaturan "reduce motion" milik pengguna di seluruh situs
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Garis progres scroll di paling atas layar
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-indigo-600 to-blue-400"
      aria-hidden="true"
    />
  );
}

// Pembungkus section: muncul halus saat di-scroll, dan opsional setinggi layar
export function Reveal({
  children,
  fullScreen = false,
}: {
  children: ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={fullScreen ? "flex min-h-dvh flex-col justify-center" : undefined}
    >
      <div className="w-full">{children}</div>
    </motion.div>
  );
}