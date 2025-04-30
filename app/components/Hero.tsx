"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import useMobile from "../hooks/useMobile"

export default function Hero() {
  const [showHindi, setShowHindi] = useState(false)
  const { isMobile, isTablet } = useMobile()

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const threshold = 100 // Adjust this value to change when the switch happens
      setShowHindi(scrollPosition > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Text animation variants
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.8 * i },
    }),
  }

  const titleLetter = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const webDevText = "Aspiring Web Developer".split("")
  const itStudentText = "IT Student".split("")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
      {/* Animated background elements - reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 5 : isTablet ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-10"
            style={{
              width: Math.random() * (isMobile ? 30 : isTablet ? 50 : 100) + 50,
              height: Math.random() * (isMobile ? 30 : isTablet ? 50 : 100) + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1717527632476_optimized_50.jpg-By8G2wXNVffnvoWtg2MI5Gl0HY1qzB.jpeg"
            alt="Sonu Kumar"
            width={isMobile ? 140 : 180}
            height={isMobile ? 140 : 180}
            className="rounded-full border-4 border-white/10 shadow-2xl mx-auto"
            priority
          />
        </motion.div>

        <div className="relative">
          {/* Glowing background effect */}
          <div
            className="absolute inset-0 blur-[100px] bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 opacity-75"
            style={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              width: "150%",
              height: "150%",
            }}
          />

          {/* Name container with animation */}
          <div className="h-[100px] sm:h-[120px] md:h-[140px] relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showHindi ? (
                <motion.h1
                  key="english"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider text-white absolute"
                  style={{
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  SONU KUMAR
                </motion.h1>
              ) : (
                <motion.h1
                  key="hindi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-400/90 absolute"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    letterSpacing: "0.05em",
                  }}
                >
                  सोनू कुमार
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Role title with enhanced animation - background border removed */}
          <div className="relative mt-8 mb-12 h-[60px] sm:h-[70px] flex items-center justify-center">
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              {/* First part - Web Developer */}
              <motion.div
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 relative overflow-hidden"
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                style={{ perspective: "1000px" }}
              >
                <div className="flex">
                  {webDevText.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={titleLetter}
                      className={letter === " " ? "mr-2" : ""}
                      style={{
                        display: "inline-block",
                        textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Animated underline */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                />
              </motion.div>

              {/* Divider */}
              <motion.span
                className="mx-2 text-blue-300 text-xl sm:text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.5, 1],
                  scale: [0, 1.2, 0.9, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  delay: 2.8,
                  duration: 0.6,
                  times: [0, 0.4, 0.7, 1],
                }}
              >
                |
              </motion.span>

              {/* Second part - IT Student */}
              <motion.div
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 relative overflow-hidden"
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                custom={3.2}
                style={{ perspective: "1000px" }}
              >
                <div className="flex">
                  {itStudentText.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={titleLetter}
                      className={letter === " " ? "mr-2" : ""}
                      style={{
                        display: "inline-block",
                        textShadow: "0 0 8px rgba(168, 85, 247, 0.5)",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Animated underline */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 4.2, duration: 0.8 }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-4 sm:px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:shadow-lg text-center text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
        </motion.div>
      </div>
    </section>
  )
}
