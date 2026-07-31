import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // 1. Import font dari Google
import "./globals.css";

// 2. Konfigurasi font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta", // Deklarasi variable CSS
});

export const metadata: Metadata = {
  title: "Taufiqurrohman | Portfolio",
  description: "Fullstack Developer & AI Enthusiast Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      {/* 3. Masukkan variable font ke body */}
      <body className={`${jakarta.className} bg-[#F8F9FF] text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}