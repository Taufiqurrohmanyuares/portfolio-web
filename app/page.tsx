import Navbar from "@/components/Navbar";
import MarqueeBanner from "@/components/MarqueeBanner";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import LearningJournal from "@/components/LearningJournal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6">
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
  );
}
