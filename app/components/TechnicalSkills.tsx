"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Code, Terminal, Database, Monitor, Cloud, Network, Cpu } from "lucide-react"
import { SkillCategoryBox } from "./SkillCategoryBox"
import { useTheme } from "../context/ThemeContext"

interface Skill {
  name: string
  level: number
  icon: React.ReactNode
  logo: string
}

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: Skill[]
  gradient: string
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: <Terminal className="w-6 h-6" />,
    skills: [
      { name: "C", level: 85, icon: <Code />, logo: "/images/c-logo.png" },
      { name: "C++", level: 80, icon: <Code />, logo: "/images/cpp-logo.png" },
      { name: "Java", level: 70, icon: <Code />, logo: "/images/java-logo.png" },
      { name: "JavaScript", level: 75, icon: <Code />, logo: "/images/js-logo.png" },
      { name: "HTML", level: 90, icon: <Code />, logo: "/images/html-logo.png" },
      { name: "CSS", level: 85, icon: <Code />, logo: "/images/css-logo.png" },
    ],
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    name: "Databases",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "MS Access", level: 75, icon: <Database />, logo: "/images/ms-access-logo.png" },
      { name: "SQL", level: 80, icon: <Database />, logo: "/images/sql-logo.png" },
    ],
    gradient: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    name: "Operating Systems",
    icon: <Monitor className="w-6 h-6" />,
    skills: [
      { name: "Windows", level: 90, icon: <Monitor />, logo: "/images/windows-logo.png" },
      { name: "Linux", level: 75, icon: <Monitor />, logo: "/images/linux-logo.png" },
    ],
    gradient: "bg-gradient-to-br from-orange-500 to-pink-600",
  },
  {
    name: "Other Technologies",
    icon: <Cloud className="w-6 h-6" />,
    skills: [
      { name: "Software Engineering", level: 85, icon: <Cloud />, logo: "/images/software-engineering-logo.png" },
      { name: "Cloud Computing", level: 75, icon: <Cloud />, logo: "/images/cloud-computing-logo.png" },
      { name: "Computer Networks", level: 80, icon: <Network />, logo: "/images/network-logo.png" },
      { name: "Operating System", level: 85, icon: <Cpu />, logo: "/images/os-logo.png" },
    ],
    gradient: "bg-gradient-to-br from-yellow-500 to-red-600",
  },
]

export default function TechnicalSkills() {
  const { theme } = useTheme()

  return (
    <section
      id="skills"
      className={`py-16 md:py-32 ${
        theme === "light" ? "bg-gradient-to-b from-white to-gray-100" : "bg-gradient-to-b from-gray-900 to-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCategoryBox {...category} theme={theme} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
