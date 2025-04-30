import Header from "./components/Header"
import AnimatedHero from "./components/AnimatedHero"
import About from "./components/About"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Resume from "./components/Resume"
import Certificates from "./components/Certificates"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <AnimatedHero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certificates />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}
