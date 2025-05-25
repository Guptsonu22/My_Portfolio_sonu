"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import {
  Briefcase,
  Calendar,
  MapPin,
  Award,
  ArrowRight,
  Code,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Database,
  Lock,
} from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useTheme } from "../context/ThemeContext"
import useMobile from "../hooks/useMobile"
import { Tilt } from "react-tilt"

export default function Experience() {
  const { isMobile } = useMobile()
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const controls = useAnimation()
  const timelineControls = useAnimation()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      timelineControls.start({
        height: "calc(100% - 2rem)",
        transition: { duration: 1.5, delay: 0.5 },
      })
    } else {
      controls.start("hidden")
      timelineControls.start({
        height: 0,
        transition: { duration: 0.5 },
      })
    }
  }, [inView, controls, timelineControls])

  // Mouse parallax effect
  useEffect(() => {
    if (!isMobile && sectionRef.current) {
      const handleMouseMove = (e) => {
        const section = sectionRef.current
        const rect = section.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }

      const section = sectionRef.current
      section.addEventListener("mousemove", handleMouseMove)
      return () => {
        section.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMobile])

  // Experience data
  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Think Next Technology",
      period: "Aug 2024 - Sept 2024",
      location: "Mohali, India",
      type: "Internship",
      icon: <Code />,
      color: "blue",
      responsibilities: [
        "Developed a dynamic School Management System using JAVA, MySQL, and JavaScript to automate academic and administrative tasks.",
        "Implemented role-based login for admin, teacher, student, and parent panels, ensuring secure and personalized access.",
        "Created modules for attendance, fee management, exam results, and timetable scheduling, enhancing operational efficiency.",
        "Optimized database queries and UI responsiveness, reducing manual workload by 45% and improving system reliability.",
      ],
      skills: [
        { name: "JAVA", icon: <Code size={14} />, color: "red" },
        { name: "MySQL", icon: <Database size={14} />, color: "blue" },
        { name: "JavaScript", icon: <Layers size={14} />, color: "yellow" },
        { name: "Authentication", icon: <Lock size={14} />, color: "purple" },
        { name: "Database Optimization", icon: <Sparkles size={14} />, color: "green" },
      ],
    },
    {
      title: "Web Developer Intern",
      company: "CODETECH IT SOLUTION",
      period: "January 2025 - April 2025",
      location: "Remote",
      type: "Internship",
      icon: <Code />,
      color: "purple",
      responsibilities: [
        "Developed responsive web applications using HTML5, CSS3, JavaScript, and modern frameworks like React.js.",
        "Collaborated with design teams to implement pixel-perfect UI/UX designs and ensure cross-browser compatibility.",
        "Built RESTful APIs and integrated third-party services to enhance application functionality and user experience.",
        "Participated in code reviews, debugging sessions, and agile development processes to deliver high-quality solutions.",
        "Optimized website performance and implemented SEO best practices, resulting in improved loading times and search rankings.",
      ],
      skills: [
        { name: "React.js", icon: <Code size={14} />, color: "blue" },
        { name: "HTML5/CSS3", icon: <Layers size={14} />, color: "red" },
        { name: "JavaScript", icon: <Sparkles size={14} />, color: "yellow" },
        { name: "REST APIs", icon: <Database size={14} />, color: "green" },
        { name: "Responsive Design", icon: <Lock size={14} />, color: "purple" },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Parallax effect values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    if (!isMobile && cardRef.current) {
      x.set(mousePosition.x / 30)
      y.set(mousePosition.y / 30)
    }
  }, [mousePosition, isMobile, x, y])

  const rotateX = useTransform(y, [0, 500], [5, -5])
  const rotateY = useTransform(x, [0, 500], [-5, 5])

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1))
  }

  const experience = experiences[activeIndex]
  const colorMap = {
    blue: theme === "light" ? "blue" : "blue",
    red: theme === "light" ? "red" : "red",
    green: theme === "light" ? "green" : "green",
    purple: theme === "light" ? "purple" : "purple",
    yellow: theme === "light" ? "yellow" : "yellow",
  }

  // Generate particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`py-20 ${
        theme === "light" ? "bg-gradient-to-b from-blue-50 to-white" : "bg-gradient-to-b from-[#0c1222] to-gray-900"
      } relative overflow-hidden`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${
            theme === "light" ? "bg-blue-100/30" : "bg-blue-500/5"
          } blur-3xl transition-all duration-1000 ease-in-out`}
          style={{
            transform: isHovering ? "scale(1.1) translate(10px, -10px)" : "scale(1) translate(0, 0)",
          }}
        />
        <div
          className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full ${
            theme === "light" ? "bg-purple-100/30" : "bg-purple-500/5"
          } blur-3xl transition-all duration-1000 ease-in-out`}
          style={{
            transform: isHovering ? "scale(1.1) translate(-10px, 10px)" : "scale(1) translate(0, 0)",
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${theme === "light" ? "bg-blue-400/20" : "bg-blue-400/10"}`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid pattern with animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              theme === "light"
                ? "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)"
                : "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header with animations */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="inline-block mb-4" whileHover={{ scale: 1.05 }}>
            <motion.div
              className={`p-3 rounded-2xl ${
                theme === "light" ? "bg-blue-100" : "bg-blue-900/30"
              } inline-block relative overflow-hidden group`}
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 -translate-x-full"
                animate={{ translateX: ["100%", "-100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              />

              <Briefcase className={`w-8 h-8 ${theme === "light" ? "text-blue-600" : "text-blue-400"} relative z-10`} />
            </motion.div>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            Professional{" "}
            <motion.span
              className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} relative`}
              whileHover={{ scale: 1.05 }}
            >
              Experience
              <motion.div
                className={`absolute -bottom-2 left-0 h-1 ${
                  theme === "light" ? "bg-blue-400" : "bg-blue-500"
                } rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.span>
          </h2>

          <motion.p
            className={`max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            My journey in the tech industry, where I've applied my skills to create impactful solutions
          </motion.p>

          <motion.div
            className={`h-1 w-24 mx-auto mt-6 rounded-full ${theme === "light" ? "bg-blue-500" : "bg-blue-500"}`}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Main content with 3D card effect */}
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Experience card with 3D effect */}
          <div className="relative">
            {/* Navigation buttons for multiple experiences */}
            {experiences.length > 1 && (
              <div className="absolute -top-12 right-0 flex space-x-2">
                <motion.button
                  onClick={handlePrev}
                  className={`p-2 rounded-full ${
                    theme === "light"
                      ? "bg-white text-gray-700 hover:bg-gray-100"
                      : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  } shadow-md`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className={`p-2 rounded-full ${
                    theme === "light"
                      ? "bg-white text-gray-700 hover:bg-gray-100"
                      : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  } shadow-md`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            {/* Timeline vertical line with animation */}
            <motion.div
              className={`absolute left-4 top-6 bottom-0 w-1 ${
                theme === "light"
                  ? "bg-gradient-to-b from-blue-400 via-blue-500 to-purple-500"
                  : "bg-gradient-to-b from-blue-500 via-blue-400 to-purple-400"
              } rounded-full`}
              initial={{ height: 0 }}
              animate={timelineControls}
            >
              {/* Animated glow effect */}
              <motion.div
                className={`absolute inset-0 ${theme === "light" ? "bg-blue-400" : "bg-blue-500"} blur-sm opacity-50`}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Animated dot moving along the timeline */}
              <motion.div
                className={`absolute w-3 h-3 rounded-full ${
                  theme === "light" ? "bg-white" : "bg-white"
                } shadow-lg left-1/2 -translate-x-1/2`}
                animate={{
                  top: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Timeline dot with pulse effect */}
            <motion.div
              className={`absolute -left-12 ml-4 mt-1.5 w-8 h-8 rounded-full ${
                theme === "light" ? `bg-${colorMap[experience.color]}-500` : `bg-${colorMap[experience.color]}-500`
              } border-4 ${
                theme === "light" ? "border-blue-100" : "border-[#0c1222]"
              } z-10 flex items-center justify-center`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${theme === "light" ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.4)"}`,
                    `0 0 0 10px ${theme === "light" ? "rgba(59, 130, 246, 0)" : "rgba(59, 130, 246, 0)"}`,
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <Briefcase className="w-4 h-4 text-white" />
            </motion.div>

            {/* 3D Card with perspective effect */}
            {isMounted && (
              <Tilt
                options={{
                  max: 25,
                  scale: 1.05,
                  speed: 300,
                  glare: true,
                  "max-glare": 0.5,
                }}
              >
                <motion.div
                  ref={cardRef}
                  className="relative ml-12 perspective-1000"
                  style={{
                    perspective: 1000,
                  }}
                  variants={itemVariants}
                >
                  <motion.div
                    className={`${theme === "light" ? "bg-white" : "bg-[#131b2e]"} rounded-xl overflow-hidden ${
                      theme === "light" ? "border border-blue-200/50" : "border border-blue-500/20"
                    } ${theme === "light" ? "shadow-lg shadow-blue-100/50" : "shadow-lg shadow-blue-900/20"}`}
                    style={{
                      transformStyle: "preserve-3d",
                      rotateX: !isMobile ? rotateX : 0,
                      rotateY: !isMobile ? rotateY : 0,
                    }}
                    whileHover={{
                      boxShadow:
                        theme === "light"
                          ? "0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)"
                          : "0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)",
                    }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                    }}
                  >
                    {/* Animated gradient border */}
                    <div
                      className={`h-2 w-full bg-gradient-to-r from-${colorMap[experience.color]}-500 via-${colorMap[experience.color]}-400 to-purple-500 relative overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                        }}
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                        {/* Company logo/icon with 3D effect */}
                        <motion.div
                          className={`flex-shrink-0 w-16 h-16 ${
                            theme === "light"
                              ? `bg-${colorMap[experience.color]}-100`
                              : `bg-${colorMap[experience.color]}-900/30`
                          } rounded-xl flex items-center justify-center relative overflow-hidden group`}
                          whileHover={{
                            scale: 1.05,
                            rotate: [0, 5, -5, 0],
                            transition: { duration: 0.5 },
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(20px)",
                          }}
                        >
                          {/* Background pattern */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: `radial-gradient(circle, ${theme === "light" ? "#3b82f6" : "#3b82f6"} 1px, transparent 1px)`,
                              backgroundSize: "10px 10px",
                            }}
                          />

                          {/* Icon with animation */}
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                            <Code
                              className={`w-8 h-8 ${
                                theme === "light"
                                  ? `text-${colorMap[experience.color]}-600`
                                  : `text-${colorMap[experience.color]}-400`
                              }`}
                            />
                          </motion.div>

                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-white/20 -translate-x-full"
                            animate={{ translateX: ["100%", "-100%"] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                          />
                        </motion.div>

                        {/* Job details with animations */}
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <motion.h3
                              className={`text-xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {experience.title}
                            </motion.h3>
                            <motion.span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                theme === "light" ? "bg-green-100 text-green-700" : "bg-green-900/50 text-green-400"
                              }`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {experience.type}
                            </motion.span>
                          </div>

                          <motion.p
                            className={`text-lg font-medium ${
                              theme === "light"
                                ? `text-${colorMap[experience.color]}-600`
                                : `text-${colorMap[experience.color]}-400`
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {experience.company}
                          </motion.p>

                          <div className="flex flex-wrap gap-4 mt-3">
                            <motion.div
                              className="flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Calendar
                                className={`w-4 h-4 mr-1.5 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                              />
                              <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                                {experience.period}
                              </span>
                            </motion.div>

                            <motion.div
                              className="flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              <MapPin
                                className={`w-4 h-4 mr-1.5 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                              />
                              <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                                {experience.location}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Animated divider */}
                      <motion.div
                        className={`h-px w-full my-6 ${
                          theme === "light" ? "bg-gray-200" : "bg-gray-700"
                        } relative overflow-hidden`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        <motion.div
                          className={`absolute top-0 left-0 h-full w-20 ${
                            theme === "light"
                              ? `bg-gradient-to-r from-transparent via-${colorMap[experience.color]}-400 to-transparent`
                              : `bg-gradient-to-r from-transparent via-${colorMap[experience.color]}-500 to-transparent`
                          }`}
                          animate={{ x: ["-100%", "500%"] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                        />
                      </motion.div>

                      {/* Responsibilities with animated list items */}
                      <div className="mb-6">
                        <motion.h4
                          className={`text-lg font-semibold mb-4 flex items-center ${
                            theme === "light" ? "text-gray-800" : "text-white"
                          }`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Award
                            className={`w-5 h-5 mr-2 ${
                              theme === "light"
                                ? `text-${colorMap[experience.color]}-500`
                                : `text-${colorMap[experience.color]}-400`
                            }`}
                          />
                          Key Responsibilities & Achievements
                        </motion.h4>

                        <ul className="space-y-4">
                          {experience.responsibilities.map((item, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start group"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <motion.div
                                className={`mt-1.5 mr-3 w-4 h-4 rounded-full flex-shrink-0 ${
                                  theme === "light"
                                    ? `bg-${colorMap[experience.color]}-100`
                                    : `bg-${colorMap[experience.color]}-900/50`
                                } flex items-center justify-center`}
                                whileHover={{ scale: 1.2 }}
                              >
                                <ArrowRight
                                  className={`w-3 h-3 ${
                                    theme === "light"
                                      ? `text-${colorMap[experience.color]}-600`
                                      : `text-${colorMap[experience.color]}-400`
                                  }`}
                                />
                              </motion.div>
                              <p
                                className={`${
                                  theme === "light" ? "text-gray-700" : "text-gray-300"
                                } group-hover:text-${colorMap[experience.color]}-${theme === "light" ? "600" : "400"} transition-colors duration-200`}
                              >
                                {item}
                              </p>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills with animated tags */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        <h4
                          className={`text-sm font-medium mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                        >
                          TECHNOLOGIES & SKILLS
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, index) => (
                            <motion.span
                              key={index}
                              className={`px-3 py-1.5 rounded-full text-sm border ${
                                theme === "light"
                                  ? `bg-${colorMap[skill.color]}-100 text-${colorMap[skill.color]}-700 border-${colorMap[skill.color]}-200`
                                  : `bg-${colorMap[skill.color]}-900/20 text-${colorMap[skill.color]}-400 border-${colorMap[skill.color]}-900/30`
                              } flex items-center gap-1.5`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.6 + index * 0.05 }}
                            >
                              {skill.icon}
                              {skill.name}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </Tilt>
            )}

            {/* End marker with animation */}
            <motion.div
              className={`absolute left-4 bottom-0 w-8 h-8 -ml-3.5 rounded-full ${
                theme === "light" ? "bg-purple-500" : "bg-purple-500"
              } border-4 ${
                theme === "light" ? "border-blue-100" : "border-[#0c1222]"
              } z-10 flex items-center justify-center`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.2 }}
            >
              <Award className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          {/* Looking for more opportunities with animated card */}
          <motion.div
            className={`text-center mt-12 p-6 rounded-xl ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-50 via-blue-50 to-purple-50 border border-blue-100"
                : "bg-gradient-to-r from-blue-900/20 via-blue-900/10 to-purple-900/20 border border-blue-800/30"
            } relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{
              y: -5,
              boxShadow:
                theme === "light"
                  ? "0 15px 30px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
                  : "0 15px 30px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)",
            }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                  "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                ],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${theme === "light" ? "bg-blue-400/20" : "bg-blue-400/10"}`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.h4
              className={`text-lg font-semibold mb-2 ${
                theme === "light" ? "text-gray-800" : "text-white"
              } relative z-10`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Looking for New Opportunities
            </motion.h4>

            <motion.p
              className={`${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-4 relative z-10`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              I'm currently seeking new challenges where I can apply my skills and continue to grow as a developer.
            </motion.p>

            <motion.a
              href="#contact"
              className={`inline-flex items-center px-4 py-2 rounded-full ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              } text-white font-medium relative overflow-hidden group`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7 }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-white/20 skew-x-[-20deg] -translate-x-full"
                animate={{ translateX: ["100%", "-100%"] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              />

              <span className="relative z-10">Get in Touch</span>
              <ArrowRight className="w-4 h-4 ml-2 relative z-10" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
