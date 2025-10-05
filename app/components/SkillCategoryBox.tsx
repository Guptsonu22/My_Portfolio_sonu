"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Tilt } from "react-tilt"
import Image from "next/image"
import useMobile from "../hooks/useMobile"

interface Skill {
  name: string
  level: number
  icon: React.ReactNode
  logo: string
}

interface SkillCategoryBoxProps {
  name: string
  icon: React.ReactNode
  skills: Skill[]
  gradient: string
  theme?: "light" | "dark"
}

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

export function SkillCategoryBox({ name, icon, skills, gradient, theme = "dark" }: SkillCategoryBoxProps) {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const sectionId = `skills-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

  const content = (
    <Card className={`overflow-hidden ${gradient} relative`}>
      <CardContent className="p-0">
        <motion.button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setIsOpen((v) => !v)
            }
          }}
          className="w-full flex justify-between items-center py-6 px-6 bg-transparent hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 pointer-events-auto relative z-10"
          initial={false}
          animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "transparent" }}
          aria-expanded={isOpen}
          aria-controls={sectionId}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">{icon}</div>
            <span id={`${sectionId}-label`} className="font-semibold text-white text-xl">
              {name}
            </span>
          </div>
          {isOpen ? <ChevronUp className="w-6 h-6 text-white" /> : <ChevronDown className="w-6 h-6 text-white" />}
        </motion.button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={sectionId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden", willChange: "height" }}
              role="region"
              aria-labelledby={`${sectionId}-label`}
            >
              <div className="p-6 bg-white/10">
                {skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="mb-6 last:mb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white">
                          {skill.icon}
                        </div>
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-white/80">{skill.level}%</span>
                    </div>
                    <div
                      className="relative h-3 bg-white/20 rounded-full overflow-hidden"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <motion.div
                        className="h-full rounded-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                      <AnimatePresence>
                        {hoveredSkill === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.5, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full ml-2"
                          >
                            <Image
                              src={skill.logo || "/placeholder.svg?height=24&width=24&query=skill%20logo"}
                              alt={`${skill.name} logo`}
                              width={24}
                              height={24}
                              className="rounded-full bg-white p-1"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )

  return isMobile ? (
    <div className="w-full h-full">{content}</div>
  ) : (
    <Tilt options={defaultOptions} className="w-full h-full">
      {content}
    </Tilt>
  )
}
