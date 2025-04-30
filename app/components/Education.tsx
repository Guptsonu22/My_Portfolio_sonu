"use client"

import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"

export default function Education() {
  const { theme } = useTheme()

  return (
    <section id="education" className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
      <div className="container mx-auto px-6">
        <motion.h2
          className={`text-3xl font-bold mb-8 text-center ${theme === "light" ? "text-gray-800" : "text-white"}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={`${theme === "light" ? "bg-gray-50" : "bg-gray-800"} rounded-lg p-6 shadow-md`}>
            <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Bachelor of Engineering in Information Technology
            </h3>
            <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-2`}>
              CGC College of Engineering
            </p>
            <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>Third Year (Current)</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
