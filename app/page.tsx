import Navbar from "@/components/Navbar";
import MarqueeBanner from "@/components/MarqueeBanner";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import LearningJournal from "@/components/LearningJournal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { MotionProvider, ScrollProgress } from "@/components/MotionKit";

// Semua section sudah full lebar, setinggi layar, dan punya animasi masing-masing
export default function Home() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <main className="w-full">
        <Navbar />

        <Hero />
        <MarqueeBanner />
        <Projects />
        <About />
        <Skills />
        <LearningJournal />
        <Contact />
        <Footer />
      </main>
    </MotionProvider>
  );
}