"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useMobile from "../hooks/useMobile"

interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface GlowMenuProps {
  items: MenuItem[]
  activeItem: string
  onItemClick: (id: string) => void
  className?: string
  theme?: "light" | "dark"
}

export function GlowMenu({ items, activeItem, onItemClick, className = "", theme = "dark" }: GlowMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [menuRect, setMenuRect] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const { isMobile, isTablet } = useMobile()

  // Update menu rect on window resize
  useEffect(() => {
    const handleResize = () => {
      const menuElement = document.getElementById("glow-menu")
      if (menuElement) {
        const rect = menuElement.getBoundingClientRect()
        setMenuRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse move for glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      id="glow-menu"
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Glow effect that follows mouse - disabled on mobile */}
      <AnimatePresence>
        {hoveredItem && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-0 blur-xl"
            style={{
              background:
                theme === "light"
                  ? "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)",
              width: 150,
              height: 150,
              borderRadius: "50%",
              left: mousePosition.x - menuRect.left - 75,
              top: mousePosition.y - menuRect.top - 75,
            }}
          />
        )}
      </AnimatePresence>

      {/* Menu items */}
      <div
        className={`relative z-10 flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-2 md:gap-4 ${
          theme === "light" ? "bg-white/50" : "bg-gray-900/50"
        } backdrop-blur-md p-1.5 sm:p-2 rounded-full border ${
          theme === "light" ? "border-gray-200" : "border-white/10"
        } overflow-x-auto whitespace-nowrap`}
      >
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            className={`relative px-1.5 xs:px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
              activeItem === item.id
                ? theme === "light"
                  ? "text-white"
                  : "text-white"
                : theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/60 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-0.5 xs:gap-1 sm:gap-2 text-xs xs:text-sm sm:text-base">
              {item.icon && <span className="text-base sm:text-lg">{item.icon}</span>}
              <span className="font-medium">{item.label}</span>
            </span>

            {/* Active item indicator */}
            {activeItem === item.id && (
              <motion.div
                layoutId="activeItemBackground"
                className={`absolute inset-0 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                } rounded-full -z-0`}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Hover glow effect */}
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                hoveredItem === item.id && activeItem !== item.id ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  theme === "light"
                    ? "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))"
                    : "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2))",
                boxShadow:
                  theme === "light" ? "0 0 15px 2px rgba(59, 130, 246, 0.2)" : "0 0 15px 2px rgba(59, 130, 246, 0.3)",
                zIndex: -1,
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Decorative elements - reduced on mobile */}
      {!isMobile && (
        <>
          <div
            className={`absolute -inset-[1px] rounded-full ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-blue-300/20"
                : "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
            } blur-sm -z-10`}
          />
          <div
            className={`absolute -inset-[2px] rounded-full ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-blue-300/10"
                : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"
            } blur-md -z-20`}
          />
        </>
      )}
    </div>
  )
}
