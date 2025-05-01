"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useCallback } from "react"
import { useTheme } from "../context/ThemeContext"

// Only store the changing part of the roles
const roles = ["Problem Solver", "Web Developer", "Frontend Developer", "DSA Enthusiast", "Tech Innovator"]

export default function AnimatedHero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  // Greeting text animation
  const greetingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  // Name animation with gradient
  const nameVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Folks animation
  const folksVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  }

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const typingSpeed = 80
    const deletingSpeed = 40
    const pauseTime = 2000

    if (!isDeleting && currentText !== currentRole) {
      // Typing
      const timeout = setTimeout(() => {
        setCurrentText(currentRole.substring(0, currentText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentText === currentRole) {
      // Pause at the end of typing
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentText !== "") {
      // Deleting
      const timeout = setTimeout(() => {
        setCurrentText(currentRole.substring(0, currentText.length - 1))
      }, deletingSpeed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentText === "") {
      // Move to next role
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [currentRoleIndex, currentText, isDeleting])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color =
          theme === "light"
            ? `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
            : `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Mouse interaction
        const dx = this.x - mousePosition.x
        const dy = this.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 100
          this.speedX += Math.cos(angle) * force * 0.2
          this.speedY += Math.sin(angle) * force * 0.2
        }

        // Limit speed
        const maxSpeed = 3
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
        if (speed > maxSpeed) {
          this.speedX = (this.speedX / speed) * maxSpeed
          this.speedY = (this.speedY / speed) * maxSpeed
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = theme === "light" ? "rgba(59, 130, 246, 0.1)" : "rgba(120, 150, 255, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.globalAlpha = ((150 - distance) / 150) * 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [mousePosition, theme])

  // Track mouse position
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient background */}
      <div
        className={`absolute inset-0 ${
          theme === "light"
            ? "bg-gradient-to-b from-gray-50 via-blue-50 to-gray-100"
            : "bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900"
        } z-0`}
      ></div>

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            theme === "light"
              ? "linear-gradient(rgba(100, 116, 139, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.2) 1px, transparent 1px)"
              : "linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated gradient orbs */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 ${
          theme === "light" ? "bg-blue-200/20" : "bg-blue-500/20"
        } rounded-full blur-3xl animate-pulse-slow`}
      ></div>
      <div
        className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${
          theme === "light" ? "bg-purple-200/20" : "bg-purple-500/20"
        } rounded-full blur-3xl animate-pulse-slow`}
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left side - Text content */}
          <div className="flex flex-col items-center md:items-start order-2 md:order-1 mt-8 md:mt-0">
            {/* Greeting */}
            <motion.div variants={greetingVariants} initial="hidden" animate="visible" className="mb-2">
              <span
                className={`text-xl md:text-2xl ${theme === "light" ? "text-amber-600" : "text-yellow-300"} font-semibold`}
              >
                Jai Shree Krishna,I'm{" "}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              className={`text-5xl md:text-7xl font-bold mb-4 ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700"
                  : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
              } text-transparent bg-clip-text animate-gradient-x`}
            >
              SONU KUMAR
            </motion.h1>

            {/* Hey Folks */}
            <motion.div variants={folksVariants} initial="hidden" animate="visible" className="mb-8">
              <span
                className={`text-xl md:text-2xl ${theme === "light" ? "text-blue-600" : "text-blue-300"} font-medium`}
              >
                hey! Folks!
              </span>
            </motion.div>

            {/* Animated roles - with static "I'm a" prefix */}
            <div className="h-12 flex justify-center md:justify-start items-center mb-12">
              <div className="text-xl md:text-2xl font-medium flex">
                {/* Static "I'm a" text */}
                <span className={theme === "light" ? "text-gray-800" : "text-white"}>I'm a&nbsp;</span>

                {/* Animated changing part with gradient color */}
                <span
                  className={`${
                    theme === "light"
                      ? "bg-gradient-to-r from-blue-600 to-purple-700"
                      : "bg-gradient-to-r from-blue-500 to-purple-600"
                  } text-transparent bg-clip-text font-bold ml-1`}
                >
                  {currentText}
                </span>

                {/* Blinking cursor */}
                <span
                  className={`h-full w-[2px] ${theme === "light" ? "bg-gray-800" : "bg-white"} ml-1 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-100`}
                ></span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
              <motion.a
                href="#resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Resume
              </motion.a>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 bg-transparent border ${
                  theme === "light" ? "border-blue-600 text-blue-700" : "border-blue-500 text-blue-400"
                } rounded-full hover:bg-blue-900/20 transition-all flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Me
              </motion.a>
            </div>

            {/* Social Icons */}
            <motion.div
              className="flex justify-center md:justify-start gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              {/* GitHub */}
              <motion.a
                href="https://github.com/Guptsonu22"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 ${
                  theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-800 hover:bg-gray-700"
                } rounded-full flex items-center justify-center transition-colors shadow-md`}
                whileHover={{
                  scale: 1.2,
                  boxShadow:
                    theme === "light" ? "0 0 10px rgba(100, 116, 139, 0.3)" : "0 0 10px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-5 h-5 ${theme === "light" ? "text-gray-800" : "text-white"}`}
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/sonu-kumar-443803231/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "#0077b5",
                  boxShadow: "0 0 10px rgba(0, 119, 181, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/sonuguptaji_02/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 10px rgba(225, 48, 108, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Right side - Profile Image */}
          <motion.div
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated glow effect behind image */}
            <div
              className={`absolute inset-0 ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-pink-300/30"
                  : "bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"
              } rounded-full blur-xl animate-pulse-slow`}
            ></div>

            {/* Floating elements around image */}
            <motion.div
              className={`absolute -top-8 -right-8 w-16 h-16 ${
                theme === "light" ? "bg-blue-300/30" : "bg-blue-500/30"
              } rounded-full blur-md`}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className={`absolute -bottom-8 -left-8 w-16 h-16 ${
                theme === "light" ? "bg-purple-300/30" : "bg-purple-500/30"
              } rounded-full blur-md`}
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.div
              className={`absolute top-1/2 -right-12 w-8 h-8 ${
                theme === "light" ? "bg-pink-300/30" : "bg-pink-500/30"
              } rounded-full blur-sm`}
              animate={{
                x: [0, -10, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Profile image with hover effect */}
            <motion.div
              className={`relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 ${
                theme === "light" ? "border-white/50" : "border-white/10"
              } shadow-2xl`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-06-05%20at%2000.31.04_502d0f1b.jpg-HT1gLOo5mECadMhZFlV9gXLc968L0B.jpeg"
                alt="Sonu Kumar"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
                className="hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay gradient on hover */}
              <motion.div
                className={`absolute inset-0 ${
                  theme === "light"
                    ? "bg-gradient-to-t from-blue-500/30 to-transparent"
                    : "bg-gradient-to-t from-blue-900/50 to-transparent"
                } opacity-0 hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>

            {/* Decorative elements */}
            <div
              className={`absolute -top-4 -right-4 w-12 h-12 ${
                theme === "light" ? "bg-blue-300/30" : "bg-blue-500/30"
              } rounded-full blur-lg animate-pulse-slow`}
            ></div>
            <div
              className={`absolute -bottom-4 -left-4 w-12 h-12 ${
                theme === "light" ? "bg-purple-300/30" : "bg-purple-500/30"
              } rounded-full blur-lg animate-pulse-slow`}
              style={{ animationDelay: "1s" }}
            ></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className={`${theme === "light" ? "text-gray-500" : "text-gray-400"} text-sm mb-2`}>Scroll Down</span>
        <motion.div
          className={`w-6 h-10 border-2 ${
            theme === "light" ? "border-gray-500" : "border-gray-400"
          } rounded-full flex justify-center p-1`}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className={`w-1 h-2 ${theme === "light" ? "bg-blue-600" : "bg-blue-400"} rounded-full`}
            animate={{
              y: [0, 15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
