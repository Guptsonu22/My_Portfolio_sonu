"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SlidingBox } from "./SlidingBox"
import { GlowMenu } from "./GlowMenu"
import useMobile from "../hooks/useMobile"
import { useTheme } from "../context/ThemeContext"

// Project categories
const categories = [
  { id: "all", label: "All", icon: "🚀" },
  { id: "web", label: "Web", icon: "🌐" },
  { id: "ui", label: "UI/UX", icon: "🎨" },
  { id: "backend", label: "Backend", icon: "⚙️" },
  { id: "algorithms", label: "Algo", icon: "🧮" },
]

const projects = [
  {
    title: "Plant AI Detective",
    description:
      "A web-based application that uses AI to identify plant species, detect diseases, and provide care tips. Users can upload plant images to get instant insights into their plant's health and maintenance recommendations.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1709402886766-s7Sl03ggE1v7sNacqjBDupH12kHn1p.jpeg",
    liveDemo: "https://github.com/Guptsonu22/Plant-AI-Detective",
    sourceCode: "https://github.com/Guptsonu22/Plant-AI-Detective",
    technologies: ["HTML", "CSS", "JavaScript", "AI/ML", "Image Processing"],
    category: "web",
  },
  {
    title: "Theme Clock",
    description:
      "A dynamic and visually appealing clock application featuring both analog and digital displays. Built with modern web technologies, it includes real-time updates, dark/light theme support, and smooth animations for an elegant user experience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JNISnenrNhiV6TIcZSrJLK4W6cGrpT.png",
    liveDemo: "https://theme-clock-ochre.vercel.app",
    sourceCode: "https://github.com/Guptsonu22/Theme-Clock",
    technologies: ["HTML", "CSS", "JavaScript", "DOM Manipulation"],
    category: "ui",
  },
  {
    title: "GitHub Resume Generator",
    description:
      "A web application that creates professional resumes using GitHub profile data. Features customizable templates, real-time previews, and multiple export formats.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/front-background.jpg-1lMZRpAHgsh0LF7akgNDv7a4stAhLa.jpeg",
    liveDemo: "https://github.com/Guptsonu22/Resume-Create",
    sourceCode: "https://github.com/Guptsonu22/solid-disco",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub API"],
    category: "web",
  },
  {
    title: "Glassmorphism Login Form",
    description:
      "A modern web application featuring a sleek glassmorphism design with dual color themes, frosted glass effects, and an engaging ghost mascot. Implements modern UI/UX principles with smooth transitions.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo1699357486-a7rqoWQnLb3D2TnaBejd6E17jFbHiT.jpeg",
    liveDemo: "https://github.com/Guptsonu22/Glassmorphism-Login-Pages",
    sourceCode: "https://github.com/Guptsonu22/Glassmorphism-Login-Pages",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "ui",
  },
  {
    title: "School Management System",
    description:
      "A modern web application built with Java and SQL for comprehensive school administration. Features include attendance tracking, student profiles, and result management.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smp_i3-C2LiuTqZSgrJLDQtin46cMLx0ePomG.png",
    liveDemo: "https://github.com/Guptsonu22/School-Managment-System",
    sourceCode: "https://github.com/Guptsonu22/School-Managment-System",
    technologies: ["Java", "SQL", "HTML"],
    category: "backend",
  },
  {
    title: "Sorting Algorithm Visualization",
    description:
      "An interactive visualization tool demonstrating various sorting algorithms including Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. Features real-time visualization of sorting steps, comparisons, and time complexity analysis.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorting%20Algorithm%20Visualization02-Llmh3lgyMDXpDQfbLs8OrU3O21oHeB.gif",
    liveDemo: "https://v0-new-project-qai20inxnur.vercel.app/",
    sourceCode: "https://github.com/Guptsonu22/Sorting-Algorithm-Visualization",
    technologies: ["HTML", "CSS", "JavaScript", "Algorithms", "Data Structures"],
    category: "algorithms",
  },
  {
    title: "DSA Visualizer",
    description:
      "DSA Visualizer is an interactive tool designed to help learners understand Data Structures and Algorithms (DSA) through real-time visualizations. It provides step-by-step animations of various algorithms, making complex concepts easier to grasp.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1700983713145-Lnnq6xFfbYJlkpVuWFgoFqbTOUeb7z.jpeg",
    liveDemo: "https://dsa-explorer0.vercel.app/",
    sourceCode: "https://github.com/Guptsonu22/DSA-Explore",
    technologies: ["JavaScript", "Data Structures", "Algorithms", "Visualization", "Educational Tool"],
    category: "algorithms",
  },
  {
    title: "Educational Resources Dashboard",
    description:
      "A comprehensive web platform that organizes and presents educational resources in an intuitive dashboard interface. StudyShelf-Pro helps students and educators efficiently manage learning materials, track progress, and access curated educational content all in one place.",
    image:
      "https://img.freepik.com/premium-vector/woman-is-actively-participating-online-lectures-using-computer-with-visual-aids-books-nearby-online-lectures-using-web_538213-148637.jpg",
    liveDemo: "https://v0-educational-resources-dashboard-uzh4ie.vercel.app/",
    sourceCode: "https://github.com/Guptsonu22/StudyShelf-Pro",
    technologies: ["React", "JavaScript", "CSS", "Responsive Design", "Educational Technology"],
    category: "web",
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isMenuGlowing, setIsMenuGlowing] = useState(false)
  const { isMobile, isTablet } = useMobile()
  const { theme } = useTheme()

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  // Activate menu glow effect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMenuGlowing(true)
        } else {
          setIsMenuGlowing(false)
        }
      },
      { threshold: 0.2 },
    )

    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      observer.observe(projectsSection)
    }

    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection)
      }
    }
  }, [])

  return (
    <section
      id="projects"
      className={`py-16 md:py-32 ${
        theme === "light"
          ? "bg-gradient-to-b from-white to-gray-100 text-gray-800"
          : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      } overflow-x-hidden`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 md:mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-8 ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Featured Projects
            </h2>

            {/* Glowing Menu */}
            <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto pb-4 -mx-4 px-4">
              <GlowMenu
                items={categories}
                activeItem={activeCategory}
                onItemClick={handleCategoryChange}
                className="mx-auto"
                theme={theme}
              />
            </div>
          </div>

          <div className="relative">
            {/* Background glow effects - reduced for mobile */}
            {!isMobile && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className={`absolute w-96 h-96 rounded-full blur-[120px] opacity-20`}
                  style={{
                    background:
                      activeCategory === "web"
                        ? theme === "light"
                          ? "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)"
                          : "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)"
                        : activeCategory === "ui"
                          ? theme === "light"
                            ? "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0) 70%)"
                            : "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0) 70%)"
                          : activeCategory === "backend"
                            ? theme === "light"
                              ? "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0) 70%)"
                              : "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0) 70%)"
                            : activeCategory === "algorithms"
                              ? theme === "light"
                                ? "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0) 70%)"
                                : "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, rgba(245, 158, 11, 0) 70%)"
                              : theme === "light"
                                ? "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)"
                                : "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 70%)",
                    top: "10%",
                    left: "30%",
                  }}
                  animate={{
                    left: ["30%", "40%", "30%"],
                    top: ["10%", "20%", "10%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute w-96 h-96 rounded-full blur-[120px] opacity-20"
                  style={{
                    background:
                      activeCategory === "web"
                        ? theme === "light"
                          ? "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0) 70%)"
                          : "radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(37, 99, 235, 0) 70%)"
                        : activeCategory === "ui"
                          ? theme === "light"
                            ? "radial-gradient(circle, rgba(190, 24, 93, 0.3) 0%, rgba(190, 24, 93, 0) 70%)"
                            : "radial-gradient(circle, rgba(190, 24, 93, 0.6) 0%, rgba(190, 24, 93, 0) 70%)"
                          : activeCategory === "backend"
                            ? theme === "light"
                              ? "radial-gradient(circle, rgba(5, 150, 105, 0.3) 0%, rgba(5, 150, 105, 0) 70%)"
                              : "radial-gradient(circle, rgba(5, 150, 105, 0.6) 0%, rgba(5, 150, 105, 0) 70%)"
                            : activeCategory === "algorithms"
                              ? theme === "light"
                                ? "radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, rgba(217, 119, 6, 0) 70%)"
                                : "radial-gradient(circle, rgba(217, 119, 6, 0.6) 0%, rgba(217, 119, 6, 0) 70%)"
                              : theme === "light"
                                ? "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)"
                                : "radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, rgba(124, 58, 237, 0) 70%)",
                    bottom: "10%",
                    right: "20%",
                  }}
                  animate={{
                    right: ["20%", "30%", "20%"],
                    bottom: ["10%", "20%", "10%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 5,
                  }}
                />
              </div>
            )}

            {/* Projects Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="flex items-stretch"
                >
                  <SlidingBox {...project} isDarkMode={theme === "dark"} theme={theme} />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`w-24 h-24 ${theme === "light" ? "bg-gray-200" : "bg-gray-800"} rounded-full flex items-center justify-center mb-6`}
                >
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className={`text-xl font-medium ${theme === "light" ? "text-gray-800" : "text-white"} mb-2`}>
                  No projects found
                </h3>
                <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                  There are no projects in this category yet. Please check back later or select a different category.
                </p>
              </motion.div>
            )}
          </div>

          {/* Project count */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span
              className={`inline-block ${theme === "light" ? "bg-gray-200/70" : "bg-white/10"} backdrop-blur-sm px-4 py-2 rounded-full ${theme === "light" ? "text-gray-700" : "text-white/70"}`}
            >
              <span className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {filteredProjects.length}
              </span>{" "}
              projects displayed
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
