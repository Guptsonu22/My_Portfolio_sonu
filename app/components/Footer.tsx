"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { theme } = useTheme()

  return (
    <footer className={`py-6 sm:py-8 ${theme === "light" ? "bg-gray-100 text-gray-600" : "bg-gray-900 text-gray-400"}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <motion.p
            className="text-sm sm:text-base mb-4 sm:mb-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            &copy; {currentYear} Sonu Kumar. All rights reserved.
          </motion.p>

          <motion.div
            className="flex items-center text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="flex items-center">
              Made with <Heart className={`w-4 h-4 mx-1 ${theme === "light" ? "text-red-500" : "text-red-500"}`} /> by
              Sonu Kumar
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
