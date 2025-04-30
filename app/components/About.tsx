"use client"

import { motion } from "framer-motion"
import { Code, GraduationCap, Target, Lightbulb, Rocket, Users, Coffee, Heart } from "lucide-react"
import { AboutBox } from "./AboutBox"
import { useTheme } from "../context/ThemeContext"

const aboutItems = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Who I Am",
    description: "A full-stack developer having interest in software engineering.",
    details:
      "Enjoy solving problems and building scalable applications. Always learning new technologies to improve my skills.",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "What I Do",
    description: "Develop high-performance web apps using modern tech stacks.",
    details:
      "Solve algorithmic problems and optimize code efficiency. Contribute to open-source and follow industry trends.",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "My Goals",
    description: "Build tech products that solve real-world challenges at scale.",
    details:
      "Advance as a full-stack developer with modern frameworks. Grow the dev community through open-source contributions.",
    gradient: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "My Philosophy",
    description: "Technology should simplify lives, not complicate them.",
    details: "Great software solves problems, not just writes code. Continuous learning keeps you ahead in tech.",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
  },
]

export default function About() {
  const { theme } = useTheme()

  return (
    <section
      id="about"
      className={`py-16 md:py-32 ${theme === "light" ? "bg-gradient-to-b from-gray-100 to-white" : "bg-gradient-to-b from-gray-900 to-gray-800"}`}
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
            className={`text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center ${theme === "light" ? "text-gray-800" : "text-white"}`}
          >
            About Me
          </h2>

          {/* Main introduction with animated gradient background */}
          <motion.div
            className="relative mb-16 p-8 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Animated gradient background */}
            <div
              className={`absolute inset-0 ${theme === "light" ? "bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50" : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"} opacity-75 animate-gradient-x`}
            />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <motion.p
                className={`text-lg md:text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hey there! 👋 I'm{" "}
                <span className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} font-semibold`}>
                  Sonu Kumar
                </span>
                , a{" "}
                <span className={`${theme === "light" ? "text-purple-600" : "text-purple-400"} font-semibold`}>
                  Full-Stack Developer
                </span>{" "}
                and a pre-final-year{" "}
                <span className={`${theme === "light" ? "text-pink-600" : "text-pink-400"} font-semibold`}>
                  Information Technology Engineering
                </span>{" "}
                student. I love transforming ideas into scalable web applications and solving complex coding challenges.
              </motion.p>

              <motion.p
                className={`text-lg md:text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                My journey in tech revolves around{" "}
                <span className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} font-semibold`}>
                  continuous learning
                </span>
                , experimenting with{" "}
                <span className={`${theme === "light" ? "text-purple-600" : "text-purple-400"} font-semibold`}>
                  new technologies
                </span>
                , and building solutions that{" "}
                <span className={`${theme === "light" ? "text-pink-600" : "text-pink-400"} font-semibold`}>
                  make an impact
                </span>
                .
              </motion.p>

              {/* Highlights section */}
              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div
                  className={`flex items-center gap-2 ${theme === "light" ? "bg-gray-100" : "bg-white/5"} rounded-full px-4 py-2`}
                >
                  <Rocket className={`w-4 h-4 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
                  <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>Quick Learner</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${theme === "light" ? "bg-gray-100" : "bg-white/5"} rounded-full px-4 py-2`}
                >
                  <Users className={`w-4 h-4 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`} />
                  <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>Team Player</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${theme === "light" ? "bg-gray-100" : "bg-white/5"} rounded-full px-4 py-2`}
                >
                  <Coffee className={`w-4 h-4 ${theme === "light" ? "text-pink-600" : "text-pink-400"}`} />
                  <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>Problem Solver</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${theme === "light" ? "bg-gray-100" : "bg-white/5"} rounded-full px-4 py-2`}
                >
                  <Heart className={`w-4 h-4 ${theme === "light" ? "text-red-600" : "text-red-400"}`} />
                  <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>Passionate Developer</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills and achievements grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {aboutItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AboutBox {...item} theme={theme} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
