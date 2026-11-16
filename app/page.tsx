import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import SkillsTimeline from "@/components/sections/SkillsTimeline";
import Projects from "@/components/sections/Projects";
import Automations from "@/components/sections/Automations";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 min-w-0 md:ml-16">
        <Hero />
        <About />
        <Experience />
        <SkillsTimeline />
        <Projects />
        <Automations />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}
