"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronUp } from "lucide-react"
import useMobile from "../hooks/useMobile"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "../context/ThemeContext"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { isMobile } = useMobile()
  const headerRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 500)

      // Section detection
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          setActiveSection(section.getAttribute("id") || "")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileMenuOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const headerBgClass =
    theme === "light"
      ? scrolled
        ? "bg-white/90 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-200/50"
        : "bg-transparent"
      : scrolled
        ? "bg-gray-900/90 backdrop-blur-md shadow-lg shadow-black/10 border-b border-gray-800/50"
        : "bg-transparent"

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <motion.div
              className={`text-xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <ul className="flex items-center space-x-4 lg:space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={item.href}
                        className={`text-sm lg:text-base font-bold transition-colors duration-300 ${
                          activeSection === item.href.replace("#", "")
                            ? "text-blue-400"
                            : theme === "light"
                              ? "text-gray-700 hover:text-blue-600"
                              : "text-gray-300 hover:text-blue-300"
                        }`}
                        style={{
                          textShadow:
                            activeSection === item.href.replace("#", "") ? "0 0 8px rgba(59, 130, 246, 0.5)" : "none",
                        }}
                        onClick={(e) => handleClick(e, item.href)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-full focus:outline-none ${theme === "light" ? "text-gray-800" : "text-white"}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-2"
              >
                <motion.ul
                  className={`flex flex-col space-y-2 py-4 rounded-lg ${
                    theme === "light" ? "bg-white/90 backdrop-blur-md" : "bg-gray-800/90 backdrop-blur-md"
                  } mt-2`}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`block text-base font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${
                          activeSection === item.href.replace("#", "")
                            ? theme === "light"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-blue-500/20 text-blue-400"
                            : theme === "light"
                              ? "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                              : "text-gray-300 hover:bg-gray-700 hover:text-blue-300"
                        }`}
                        onClick={(e) => handleClick(e, item.href)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Scroll to top button - only visible on mobile and when scrolled down */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-40 p-3 rounded-full ${
              theme === "light" ? "bg-blue-500" : "bg-blue-600"
            } text-white shadow-lg`}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
