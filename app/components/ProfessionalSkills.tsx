"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

interface Skill {
  name: string
  percentage: number
  description: string
}

const professionalSkills: Skill[] = [
  {
    name: "CREATIVITY",
    percentage: 90,
    description: "Innovative thinking and creative problem-solving",
  },
  {
    name: "COMMUNICATION",
    percentage: 65,
    description: "Clear and effective verbal and written communication",
  },
  {
    name: "PROBLEM SOLVING",
    percentage: 75,
    description: "Analytical thinking and solution development",
  },
  {
    name: "TEAM WORK",
    percentage: 90,
    description: "Collaborative work and team leadership",
  },
]

function CircularProgress({
  percentage,
  isInView,
  theme,
}: { percentage: number; isInView: boolean; theme: "light" | "dark" }) {
  const circumference = 2 * Math.PI * 50 // radius = 50
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-32 h-32">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke={theme === "light" ? "rgba(6, 182, 212, 0.05)" : "rgba(6, 182, 212, 0.1)"}
          strokeWidth="8"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="rgb(6, 182, 212)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? strokeDashoffset : circumference }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]"
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className={`text-3xl font-bold ${theme === "light" ? "text-cyan-600" : "text-cyan-300"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  )
}

export default function ProfessionalSkills() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section
      className={`py-16 md:py-32 ${theme === "light" ? "bg-[#f0f9fa]" : "bg-[#001219]"} relative overflow-hidden`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto" ref={ref}>
          {/* Section title */}
          <div className="text-center mb-16 relative">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold ${
                theme === "light" ? "text-cyan-600" : "text-cyan-300"
              } inline-block`}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              PROFESSIONAL SKILLS
              <motion.div
                className={`absolute -bottom-2 left-0 w-full h-1 ${theme === "light" ? "bg-cyan-600" : "bg-cyan-300"}`}
                initial={{ scaleX: 0 }}
                animate={controls}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: { duration: 1, delay: 0.5 },
                  },
                }}
                style={{
                  originX: 0,
                  boxShadow: theme === "light" ? "0 0 10px rgba(6, 182, 212, 0.5)" : "0 0 10px rgba(6, 182, 212, 0.7)",
                }}
              />
            </motion.h2>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Background glow effects */}
            <div className="absolute inset-0 blur-[100px] opacity-30">
              <div
                className={`absolute top-0 left-0 w-1/2 h-1/2 ${
                  theme === "light" ? "bg-cyan-300/20" : "bg-cyan-500/30"
                } rounded-full`}
              />
              <div
                className={`absolute bottom-0 right-0 w-1/2 h-1/2 ${
                  theme === "light" ? "bg-cyan-300/20" : "bg-cyan-500/30"
                } rounded-full`}
              />
            </div>

            {professionalSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.2 },
                  },
                }}
              >
                {/* Skill progress circle */}
                <CircularProgress percentage={skill.percentage} isInView={isInView} theme={theme} />

                {/* Skill name */}
                <motion.h3
                  className={`mt-6 text-lg font-bold ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  } tracking-wider`}
                  initial={{ opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.5 + index * 0.2 },
                    },
                  }}
                >
                  {skill.name}
                </motion.h3>

                {/* Skill description */}
                <motion.p
                  className={`mt-2 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} max-w-[200px]`}
                  initial={{ opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.7 + index * 0.2 },
                    },
                  }}
                >
                  {skill.description}
                </motion.p>

                {/* Decorative elements */}
                <div
                  className={`absolute -inset-4 ${
                    theme === "light" ? "bg-cyan-500/5" : "bg-cyan-500/5"
                  } rounded-lg -z-10`}
                />
                <div
                  className={`absolute -inset-4 blur-xl ${
                    theme === "light" ? "bg-cyan-500/5" : "bg-cyan-500/5"
                  } rounded-lg -z-20`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
