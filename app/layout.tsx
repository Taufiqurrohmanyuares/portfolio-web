import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Font display (judul): tegas dan berkarakter
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Font isi (paragraf, tombol): bersih dan mudah dibaca di latar gelap
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taufiqurrohman | Portfolio",
  description: "Fullstack Developer & AI Enthusiast Portfolio",
};

export const viewport: Viewport = {
  themeColor: "#060C22", // warna bar browser di HP mengikuti tema gelap
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${display.variable} ${body.variable} min-h-dvh overflow-x-hidden bg-canvas text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}