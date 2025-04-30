"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Calendar, ExternalLink, Check, Star, ChevronLeft, ChevronRight, Sparkles, Shield } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "../context/ThemeContext"

interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  image: string
  credentialUrl: string
  skills: string[]
  gradient: string
  icon: string
  category: "technical" | "achievement" | "education"
}

const certificates: Certificate[] = [
  {
    id: "aws-data-engineering",
    name: "AWS Academy Graduates - AWS Academy Data Engineering",
    issuer: "Amazon Web Services",
    date: "August 2024",
    image: "https://drive.google.com/file/d/1ZW_lqRjJbiutOPq_5N-dhPVMBTsOGUkE/view?usp=drive_link",
    credentialUrl: "https://drive.google.com/file/d/10ha-Wj0qCKtDCFKL31_hQsrOBFj2YCBr/view?usp=drive_link",
    skills: ["Cloud Computing", "AWS Services", "Cloud Security"],
    gradient: "from-yellow-500 to-orange-600",
    icon: "🌩️",
    category: "technical",
  },
  {
    id: "aws-data-engineering",
    name: "AWS Academy Graduates - AWS Academy Cloud Operations",
    issuer: "Amazon Web Services",
    date: "March 2025",
    image: "https://drive.google.com/file/d/1-kq5pKa5ZpL6awz8O5Rqych84GmCTs9u/view?usp=drive_link",
    credentialUrl: "https://drive.google.com/file/d/1Hd-5kKhCt3Fi-LAna2ixWLWxkmoGWSD7/view?usp=drive_link",
    skills: ["Cloud Computing", "AWS Services", "Cloud Security"],
    gradient: "from-#BD2F50-500 to-#96C4CB-600",
    icon: "🌩️",
    category: "technical",
  },
  {
    id: "infosys-angular",
    name: "Infosys Springboard (Angular)",
    issuer: "Infosys",
    date: "November 2023",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/1Vx-NXFiBUq93H35triLjAyQiqUMuHibx/view?usp=drive_link",
    skills: ["Angular", "TypeScript", "Web Development"],
    gradient: "from-blue-500 to-indigo-600",
    icon: "🌐",
    category: "technical",
  },
  {
    id: "infosys-hyperapp",
    name: "Infosys Springboard (Hand-on Web Development With Hyperapp)",
    issuer: "Infosys",
    date: "July 2023",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/1oUCS5s77fxxLxn4ImswwteunMHDQtJAQ/view?usp=drive_link",
    skills: ["Web Development", "JavaScript", "Frontend Frameworks"],
    gradient: "from-#A7B9DD-500 to-#723B6C-600",
    icon: "⚛️",
    category: "technical",
  },
  {
    id: "infosys-hyperapp",
    name: "Infosys Springboard (Front End Web Developer)",
    issuer: "Infosys",
    date: "March 2025",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/1pl-jG3CiKEL3DaFzW6O3Y0dPFP-I4fK7/view?usp=drive_link",
    skills: ["HTML5", "CSS3", "JS"],
    gradient: "from-#A7B9DD-500 to-#723B6C-600",
    icon: "⚛️",
    category: "technical",
  },
  {
    id: "infosys-hyperapp",
    name: "Infosys Springboard (Software Engineering)",
    issuer: "Infosys",
    date: "March 2025",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/19W47k43x2WSmi6ajNDXzke1U8K8muwvK/view?usp=drive_link",
    skills: ["HTML5", "CSS3", "JS", "Problem-Solving"],
    gradient: "from-#A7B9DD-500 to-#723B6C-600",
    icon: "🖥️",
    category: "technical",
  },
  {
    id: "gd-everest",
    name: "GD Everest - I Am The One",
    issuer: "Chandigarh Engineering Colleges",
    date: "October 2023",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/1UiOs-xSnD3-cSioA4H1OmsnIdxkcwPtf/view?usp=drive_link",
    skills: [
      "Event Organization & Leadership",
      "Team Management & Collaboration",
      "Critical Thinking & Decision Making",
      "Communication & Public Speaking",
    ],
    gradient: "from-green-500 to-teal-600",
    icon: "🎯",
    category: "achievement",
  },
  {
    id: "career-sprint",
    name: "Career Sprint - A Placement Challenge 2024",
    issuer: "Chandigarh Engineering Colleges",
    date: "September 2024",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/1mXd0AS1cQvkkF97MCHB1Y3Ve4iGNwdN5/view?usp=drive_link",
    skills: ["Technical Skills", "Aptitude & Problem-Solving", "Interview Preparation", "Soft Skills"],
    gradient: "from-purple-500 to-pink-600",
    icon: "🚀",
    category: "achievement",
  },
  {
    id: "sih",
    name: "SIH (Smart India Hackathon)",
    issuer: "Chandigarh Engineering Colleges",
    date: "September 2023",
    image: "/placeholder.svg?height=200&width=200",
    credentialUrl: "https://drive.google.com/file/d/1gtDloxFgmqeABeSr4EKzmT1dD864Cujc/view?usp=drive_link",
    skills: [
      "Technical Skills",
      "Teamwork & Collaboration",
      "Critical Thinking",
      "Presentation Skills",
      "Time Management",
    ],
    gradient: "from-purple-500 to-pink-600",
    icon: "🏆",
    category: "achievement",
  },
]

export default function Certificates() {
  const { theme } = useTheme()
  const [activeCategory, setActiveCategory] = useState<"all" | "technical" | "achievement" | "education">("all")
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")

  // Filter certificates based on active category
  const filteredCertificates =
    activeCategory === "all" ? certificates : certificates.filter((cert) => cert.category === activeCategory)

  // Handle certificate click
  const handleCertificateClick = (certificate: Certificate) => {
    setActiveCertificate(certificate)
    setIsModalOpen(true)
  }

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  // Rotate carousel
  useEffect(() => {
    if (viewMode !== "carousel" || isRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [filteredCertificates.length, isRotating, viewMode])

  // Categories for filter
  const categories = [
    { id: "all", name: "All", icon: <Sparkles className="w-4 h-4" /> },
    { id: "technical", name: "Technical", icon: <Award className="w-4 h-4" /> },
    { id: "achievement", name: "Achievements", icon: <Star className="w-4 h-4" /> },
    { id: "education", name: "Education", icon: <Calendar className="w-4 h-4" /> },
  ]

  // Navigate carousel
  const navigateCarousel = (direction: "prev" | "next") => {
    setIsRotating(true)
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length)
    } else {
      setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length)
    }
    setTimeout(() => setIsRotating(false), 500)
  }

  // Calculate positions for 3D carousel
  const getCarouselItemStyle = (index: number) => {
    const totalItems = filteredCertificates.length
    const theta = (2 * Math.PI) / totalItems
    const cellSize = 350 // Size of each certificate card
    const radius = Math.round(cellSize / 2 / Math.tan(Math.PI / totalItems))

    const rotation = index * theta
    const angle = rotation + currentIndex * theta * -1

    return {
      transform: `rotateY(${angle}rad) translateZ(${radius}px)`,
      opacity: index === currentIndex ? 1 : 0.7,
      zIndex: index === currentIndex ? 10 : 5,
    }
  }

  return (
    <section
      id="certificates"
      className={`py-16 md:py-32 ${
        theme === "light" ? "bg-gradient-to-b from-gray-100 to-white" : "bg-gradient-to-b from-gray-800 to-gray-900"
      } overflow-hidden`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-full h-full opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                ],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
          </div>

          {/* Header with 3D text effect */}
          <div className="relative mb-16">
            <div className="text-center perspective-1000">
              <motion.h2
                className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400`}
                style={{
                  textShadow: "0 5px 15px rgba(124, 58, 237, 0.5)",
                  transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onMouseMove={handleMouseMove}
              >
                Certificates & Achievements
              </motion.h2>
              <motion.div
                className="h-1 w-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-full flex">
              <button
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                  viewMode === "carousel"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setViewMode("carousel")}
              >
                <motion.div animate={{ rotate: viewMode === "carousel" ? 360 : 0 }} transition={{ duration: 0.5 }}>
                  <Shield className="w-4 h-4" />
                </motion.div>
                <span>3D Showcase</span>
              </button>
              <button
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <motion.div animate={{ rotate: viewMode === "grid" ? 360 : 0 }} transition={{ duration: 0.5 }}>
                  <Award className="w-4 h-4" />
                </motion.div>
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  {activeCategory === category.id && (
                    <motion.span
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 3D Carousel View */}
          {viewMode === "carousel" && (
            <div className="relative h-[500px] perspective-1000 mb-16" ref={containerRef} onMouseMove={handleMouseMove}>
              {/* Navigation buttons */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-4">
                <motion.button
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  onClick={() => navigateCarousel("prev")}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isRotating}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  onClick={() => navigateCarousel("next")}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isRotating}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Carousel container */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
                }}
                ref={carouselRef}
              >
                {/* Carousel items */}
                {filteredCertificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    className="absolute w-[350px] h-[450px]"
                    style={getCarouselItemStyle(index)}
                    animate={{
                      scale: index === currentIndex ? 1 : 0.9,
                      filter: index === currentIndex ? "brightness(1)" : "brightness(0.7)",
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => index === currentIndex && handleCertificateClick(certificate)}
                  >
                    <div
                      className={`w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer ${
                        index === currentIndex ? "shadow-2xl shadow-purple-500/20" : ""
                      }`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Certificate background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${certificate.gradient} opacity-20`} />

                      {/* Certificate content */}
                      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md p-6 flex flex-col">
                        {/* Certificate header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-white/10 p-3 rounded-xl">
                            <span className="text-3xl">{certificate.icon}</span>
                          </div>
                          <div className="bg-white/10 p-1 rounded-full">
                            <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                          </div>
                        </div>

                        {/* Certificate title */}
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{certificate.name}</h3>

                        {/* Certificate details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-white/70">
                            <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{certificate.issuer}</span>
                          </div>
                          <div className="flex items-center text-white/70">
                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{certificate.date}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium text-white/80 mb-2">Key Skills:</h4>
                          <div className="space-y-1">
                            {certificate.skills.slice(0, 3).map((skill) => (
                              <div key={skill} className="flex items-center">
                                <Check className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-white/60 truncate">{skill}</span>
                              </div>
                            ))}
                            {certificate.skills.length > 3 && (
                              <div className="text-xs text-white/40 mt-1">
                                +{certificate.skills.length - 3} more skills
                              </div>
                            )}
                          </div>
                        </div>

                        {/* View button */}
                        {index === currentIndex && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4"
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                              onClick={() => handleCertificateClick(certificate)}
                            >
                              View Details
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </motion.div>
                        )}

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-xl -z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent -z-10" />
                      </div>

                      {/* Reflection effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ transform: "translateZ(1px)" }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Center decoration */}
                <div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl"
                  style={{ transform: "translateZ(-200px)" }}
                />
              </div>

              {/* Current certificate indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {filteredCertificates.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 w-6"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => {
                      setIsRotating(true)
                      setCurrentIndex(index)
                      setTimeout(() => setIsRotating(false), 500)
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  className="h-[400px] perspective-1000"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <motion.div
                    className={`relative h-full rounded-2xl overflow-hidden cursor-pointer group`}
                    onClick={() => handleCertificateClick(certificate)}
                    whileHover="hover"
                  >
                    {/* Card background with gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${certificate.gradient} opacity-20`} />

                    {/* Card content */}
                    <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md p-6 flex flex-col">
                      {/* Certificate header */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className="bg-white/10 p-3 rounded-xl"
                          variants={{
                            hover: { y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
                          }}
                        >
                          <span className="text-3xl">{certificate.icon}</span>
                        </motion.div>
                        <motion.div
                          className="bg-white/10 p-1 rounded-full"
                          variants={{
                            hover: { rotate: 360, transition: { duration: 0.5 } },
                          }}
                        >
                          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                        </motion.div>
                      </div>

                      {/* Certificate title */}
                      <h3 className="text-xl font-bold text-white mb-2">{certificate.name}</h3>

                      {/* Certificate details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-white/70">
                          <Award className="w-4 h-4 mr-2" />
                          <span>{certificate.issuer}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{certificate.date}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium text-white/80 mb-2">Key Skills:</h4>
                        <div className="space-y-1">
                          {certificate.skills.slice(0, 3).map((skill) => (
                            <div key={skill} className="flex items-center">
                              <Check className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                              <span className="text-sm text-white/60 truncate">{skill}</span>
                            </div>
                          ))}
                          {certificate.skills.length > 3 && (
                            <div className="text-xs text-white/40 mt-1">
                              +{certificate.skills.length - 3} more skills
                            </div>
                          )}
                        </div>
                      </div>

                      {/* View button */}
                      <motion.div
                        className="mt-4"
                        variants={{
                          hover: { y: -5, opacity: 1 },
                        }}
                      >
                        <Button
                          className={`w-full bg-gradient-to-r ${certificate.gradient} hover:opacity-90 text-white`}
                        >
                          View Details
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>

                      {/* Decorative elements */}
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-xl -z-10"
                        variants={{
                          hover: {
                            width: 150,
                            height: 150,
                            opacity: 0.2,
                            transition: { duration: 0.5 },
                          },
                        }}
                      />
                    </div>

                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                      variants={{
                        hover: { opacity: 1 },
                      }}
                    />

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white">
                      {certificate.category === "technical"
                        ? "Technical"
                        : certificate.category === "achievement"
                          ? "Achievement"
                          : "Education"}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certificate count */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/70">
              <span className="font-medium text-white">{filteredCertificates.length}</span> certificates displayed
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {isModalOpen && activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden my-4 sm:my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute w-full h-full opacity-20"
                  animate={{
                    background: [
                      `radial-gradient(circle at 20% 30%, ${
                        activeCertificate.category === "technical"
                          ? "rgba(59, 130, 246, 0.3)"
                          : activeCertificate.category === "achievement"
                            ? "rgba(236, 72, 153, 0.3)"
                            : "rgba(16, 185, 129, 0.3)"
                      } 0%, transparent 70%)`,
                      `radial-gradient(circle at 80% 70%, ${
                        activeCertificate.category === "technical"
                          ? "rgba(59, 130, 246, 0.3)"
                          : activeCertificate.category === "achievement"
                            ? "rgba(236, 72, 153, 0.3)"
                            : "rgba(16, 185, 129, 0.3)"
                      } 0%, transparent 70%)`,
                      `radial-gradient(circle at 20% 30%, ${
                        activeCertificate.category === "technical"
                          ? "rgba(59, 130, 246, 0.3)"
                          : activeCertificate.category === "achievement"
                            ? "rgba(236, 72, 153, 0.3)"
                            : "rgba(16, 185, 129, 0.3)"
                      } 0%, transparent 70%)`,
                    ],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                />
              </div>

              {/* Modal close button */}
              <motion.button
                className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
                onClick={() => setIsModalOpen(false)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              {/* Certificate header */}
              <div className="relative p-4 sm:p-6 md:p-8 pb-0">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col md:flex-row md:items-center gap-4 mb-4 sm:mb-6"
                >
                  <div className="flex items-center">
                    <motion.div
                      className={`text-4xl sm:text-6xl mr-3 sm:mr-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${activeCertificate.gradient} bg-opacity-20`}
                      initial={{ rotate: -10, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", damping: 20 }}
                    >
                      {activeCertificate.icon}
                    </motion.div>
                    <div>
                      <motion.div
                        className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {activeCertificate.category === "technical"
                          ? "Technical Certificate"
                          : activeCertificate.category === "achievement"
                            ? "Achievement Award"
                            : "Educational Certificate"}
                      </motion.div>
                      <motion.h3
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {activeCertificate.name}
                      </motion.h3>
                    </div>
                  </div>

                  {/* Achievement badge - hidden on small screens, shown on medium and up */}
                  <motion.div
                    className="hidden md:block md:relative md:top-0 md:right-0 md:ml-auto"
                    initial={{ rotate: -10, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-md" />
                      <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-xs font-bold px-4 py-2 rounded-full border-2 border-yellow-300/50 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-200" />
                        CERTIFIED
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </div>

              {/* Modal content */}
              <div className="p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
                  {/* Left column - Certificate details */}
                  <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                      {/* Certificate image */}
                      <div className="relative h-36 sm:h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm" />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.7, type: "spring" }}
                        >
                          <div className="relative">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${activeCertificate.gradient} rounded-xl blur-xl opacity-50`}
                            />
                            <Image
                              src={activeCertificate.image || "/placeholder.svg"}
                              alt={activeCertificate.name}
                              width={140}
                              height={140}
                              className="relative z-10 rounded-lg border-2 border-white/10"
                            />
                          </div>
                        </motion.div>

                        {/* Floating particles */}
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-white/30"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -10, 0],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>

                      {/* Certificate details */}
                      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                          </div>
                          <div>
                            <div className="text-xs text-white/60 uppercase">Issuing Organization</div>
                            <p className="text-white/90 font-medium">{activeCertificate.issuer}</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                          </div>
                          <div>
                            <div className="text-xs text-white/60 uppercase">Issue Date</div>
                            <p className="text-white/90 font-medium">{activeCertificate.date}</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                          </div>
                          <div>
                            <div className="text-xs text-white/60 uppercase">Credential Type</div>
                            <p className="text-white/90 font-medium">
                              {activeCertificate.category === "technical"
                                ? "Technical Certification"
                                : activeCertificate.category === "achievement"
                                  ? "Achievement Award"
                                  : "Educational Certificate"}
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 }}
                          className="pt-2 sm:pt-4"
                        >
                          <Button
                            className={`w-full bg-gradient-to-r ${activeCertificate.gradient} hover:opacity-90 text-white`}
                            asChild
                          >
                            <a href={activeCertificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Original Credential
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right column - Skills */}
                  <motion.div
                    className="md:col-span-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                        <h4 className="text-lg sm:text-xl font-semibold text-white">Skills & Competencies</h4>
                      </div>

                      <motion.p
                        className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        This{" "}
                        {activeCertificate.category === "technical"
                          ? "certification"
                          : activeCertificate.category === "achievement"
                            ? "achievement"
                            : "credential"}{" "}
                        demonstrates proficiency in the following skills and competencies:
                      </motion.p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {activeCertificate.skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <div className="flex items-center mb-2 sm:mb-3">
                              <div
                                className={`mr-3 bg-gradient-to-br ${activeCertificate.gradient} p-1.5 sm:p-2 rounded-full`}
                              >
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                              <h5 className="text-sm sm:text-base text-white font-medium">{skill}</h5>
                            </div>

                            <div className="mt-2 bg-white/10 h-1.5 sm:h-2 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${activeCertificate.gradient}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${80 + Math.random() * 20}%` }}
                                transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
                              />
                            </div>

                            <motion.div
                              className="mt-1 sm:mt-2 flex justify-between text-[10px] sm:text-xs text-white/50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.2 + index * 0.1 }}
                            >
                              <span>Beginner</span>
                              <span>Proficient</span>
                              <span>Expert</span>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Additional information - simplified for mobile */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="mt-6 sm:mt-8"
                    >
                      <div className="flex items-center mb-3 sm:mb-4">
                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                        <h4 className="text-lg sm:text-xl font-semibold text-white">Credential Highlights</h4>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                          <div className="flex flex-col items-center text-center p-2 sm:p-4 bg-white/5 rounded-lg">
                            <div
                              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${activeCertificate.gradient} flex items-center justify-center mb-2 sm:mb-3`}
                            >
                              <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                              {new Date(activeCertificate.date).getFullYear()}
                            </div>
                            <div className="text-[10px] sm:text-xs text-white/60">Year Issued</div>
                          </div>

                          <div className="flex flex-col items-center text-center p-2 sm:p-4 bg-white/5 rounded-lg">
                            <div
                              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${activeCertificate.gradient} flex items-center justify-center mb-2 sm:mb-3`}
                            >
                              <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                              {activeCertificate.skills.length}
                            </div>
                            <div className="text-[10px] sm:text-xs text-white/60">Skills Verified</div>
                          </div>

                          <div className="flex flex-col items-center text-center p-2 sm:p-4 bg-white/5 rounded-lg">
                            <div
                              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${activeCertificate.gradient} flex items-center justify-center mb-2 sm:mb-3`}
                            >
                              <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                              {activeCertificate.category === "technical"
                                ? "Tech"
                                : activeCertificate.category === "achievement"
                                  ? "Award"
                                  : "Edu"}
                            </div>
                            <div className="text-[10px] sm:text-xs text-white/60">Credential Type</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Footer - simplified for mobile */}
              <motion.div
                className="p-4 sm:p-6 bg-black/20 border-t border-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
                    This credential was issued by{" "}
                    <span className="text-white font-medium">{activeCertificate.issuer}</span> in{" "}
                    {activeCertificate.date}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white hover:bg-white/10 text-xs sm:text-sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r ${activeCertificate.gradient} hover:opacity-90 text-white text-xs sm:text-sm`}
                      asChild
                    >
                      <a href={activeCertificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                        View Credential
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
