"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { Tilt } from "react-tilt"
import useMobile from "../hooks/useMobile"

interface SlidingBoxProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveDemo: string
  sourceCode: string
  isDarkMode?: boolean
  category?: string
  theme?: "light" | "dark"
}

// Category colors
const categoryColors = {
  web: "from-blue-500 to-blue-700",
  ui: "from-pink-500 to-pink-700",
  backend: "from-green-500 to-green-700",
  algorithms: "from-yellow-500 to-yellow-700",
  default: "from-purple-500 to-purple-700",
}

export function SlidingBox({
  title,
  description,
  image,
  technologies,
  liveDemo,
  sourceCode,
  isDarkMode = true,
  category = "default",
  theme = "dark",
}: SlidingBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile, isTablet } = useMobile()

  // Get gradient based on category
  const categoryGradient = categoryColors[category as keyof typeof categoryColors] || categoryColors.default

  // Simplified tilt options for mobile
  const defaultOptions = {
    reverse: false,
    max: isMobile ? 10 : isTablet ? 20 : 35,
    perspective: isMobile ? 500 : isTablet ? 800 : 1000,
    scale: isMobile ? 1.01 : isTablet ? 1.02 : 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  }

  // Disable tilt on mobile if needed
  const TiltComponent = isMobile ? motion.div : Tilt

  return (
    <TiltComponent options={!isMobile ? defaultOptions : undefined} className="w-full h-full">
      <Card
        className="relative overflow-hidden group cursor-pointer transition-all duration-300 h-full hover:shadow-xl hover:shadow-blue-500/10 border-0"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: theme === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Category indicator */}
        <div
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-20 bg-gradient-to-r ${categoryGradient} px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-white shadow-lg`}
        >
          {category === "web"
            ? "Web Dev"
            : category === "ui"
              ? "UI/UX"
              : category === "backend"
                ? "Backend"
                : category === "algorithms"
                  ? "Algorithms"
                  : "Project"}
        </div>

        <div className="relative h-36 sm:h-48 md:h-56 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">{title}</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {technologies.slice(0, isMobile ? 2 : isTablet ? 3 : technologies.length).map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-white/20 text-white text-xs">
                  {tech}
                </Badge>
              ))}
              {(isMobile && technologies.length > 2) || (isTablet && technologies.length > 3) ? (
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  +{technologies.length - (isMobile ? 2 : 3)}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden bg-gray-800 text-white"
        >
          <CardContent className="p-3 sm:p-4">
            <p className="mb-3 sm:mb-4 text-gray-300 text-xs sm:text-sm line-clamp-3 sm:line-clamp-4">{description}</p>
            <div className="flex justify-between gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-200 hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
              >
                <a href={sourceCode} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Source</span> Code
                </a>
              </Button>
              <Button
                variant="default"
                size="sm"
                asChild
                className={`bg-gradient-to-r ${categoryGradient} hover:opacity-90 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto`}
              >
                <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Live</span> Demo
                </a>
              </Button>
            </div>
          </CardContent>
        </motion.div>

        {/* Glow effect on hover - reduced on mobile */}
        {!isMobile && (
          <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-lg overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${categoryGradient} blur-sm`} />
          </div>
        )}
      </Card>
    </TiltComponent>
  )
}
