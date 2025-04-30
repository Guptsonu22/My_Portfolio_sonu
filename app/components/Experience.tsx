"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, Award, ArrowRight, ExternalLink, Code } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useTheme } from "../context/ThemeContext"
import Image from "next/image"

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="experience"
      className={`py-20 ${theme === "light" ? "bg-gradient-to-b from-blue-50 to-white" : "bg-gradient-to-b from-[#0c1222] to-gray-900"} relative overflow-hidden`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${theme === "light" ? "bg-blue-100/30" : "bg-blue-500/5"} blur-3xl`}
        />
        <div
          className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full ${theme === "light" ? "bg-purple-100/30" : "bg-purple-500/5"} blur-3xl`}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              theme === "light"
                ? "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)"
                : "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <motion.div
              className={`p-3 rounded-2xl ${theme === "light" ? "bg-blue-100" : "bg-blue-900/30"} inline-block`}
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
            >
              <Briefcase className={`w-8 h-8 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
            </motion.div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            Professional <span className={`${theme === "light" ? "text-blue-600" : "text-blue-400"}`}>Experience</span>
          </h2>

          <p className={`max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            My journey in the tech industry, where I've applied my skills to create impactful solutions
          </p>

          <motion.div
            className={`h-1 w-24 mx-auto mt-6 rounded-full ${theme === "light" ? "bg-blue-500" : "bg-blue-500"}`}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Timeline container */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className={`absolute left-4 top-6 bottom-0 w-1 ${theme === "light" ? "bg-gradient-to-b from-blue-400 via-blue-500 to-purple-500" : "bg-gradient-to-b from-blue-500 via-blue-400 to-purple-400"} h-[calc(100%-2rem)] rounded-full`}
              initial={{ height: 0 }}
              animate={{ height: "calc(100% - 2rem)" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              {/* Animated glow effect */}
              <div
                className={`absolute inset-0 ${theme === "light" ? "bg-blue-400" : "bg-blue-500"} blur-sm opacity-50`}
              />
            </motion.div>

            {/* Experience card */}
            <motion.div
              variants={itemVariants}
              className="relative mb-8 ml-12"
              whileHover={{
                x: 5,
                transition: { duration: 0.2 },
              }}
            >
              {/* Timeline dot with pulse effect */}
              <motion.div
                className={`absolute -left-12 mt-1.5 w-8 h-8 rounded-full ${theme === "light" ? "bg-blue-500" : "bg-blue-500"} border-4 ${theme === "light" ? "border-blue-100" : "border-[#0c1222]"} z-10 flex items-center justify-center`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${theme === "light" ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.4)"}`,
                      `0 0 0 10px ${theme === "light" ? "rgba(59, 130, 246, 0)" : "rgba(59, 130, 246, 0)"}`,
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
                <Briefcase className="w-4 h-4 text-white" />
              </motion.div>

              {/* Card */}
              <motion.div
                className={`${theme === "light" ? "bg-white" : "bg-[#131b2e]"} rounded-xl overflow-hidden ${theme === "light" ? "border border-blue-200/50" : "border border-blue-500/20"} ${theme === "light" ? "shadow-lg shadow-blue-100/50" : "shadow-lg shadow-blue-900/20"}`}
                whileHover={{
                  boxShadow:
                    theme === "light"
                      ? "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
                      : "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                }}
              >
                {/* Card header with gradient */}
                <div
                  className={`h-2 w-full ${theme === "light" ? "bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500" : "bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500"}`}
                />

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                    {/* Company logo/icon */}
                    <div
                      className={`flex-shrink-0 w-16 h-16 ${theme === "light" ? "bg-blue-100" : "bg-blue-900/30"} rounded-xl flex items-center justify-center`}
                    >
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Code className={`w-8 h-8 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
                      </motion.div>
                    </div>

                    {/* Job details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className={`text-xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                          Software Developer Intern
                        </h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${theme === "light" ? "bg-green-100 text-green-700" : "bg-green-900/50 text-green-400"}`}
                        >
                          Internship
                        </span>
                      </div>

                      <p className={`text-lg font-medium ${theme === "light" ? "text-blue-600" : "text-blue-400"}`}>
                        Think Next Technology
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center">
                          <Calendar
                            className={`w-4 h-4 mr-1.5 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                          />
                          <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                            Aug 2024 - Sept 2024
                          </span>
                        </div>

                        <div className="flex items-center">
                          <MapPin
                            className={`w-4 h-4 mr-1.5 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                          />
                          <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                            Mohali, India
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full my-6 ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4
                      className={`text-lg font-semibold mb-4 flex items-center ${theme === "light" ? "text-gray-800" : "text-white"}`}
                    >
                      <Award className={`w-5 h-5 mr-2 ${theme === "light" ? "text-blue-500" : "text-blue-400"}`} />
                      Key Responsibilities & Achievements
                    </h4>

                    <ul className="space-y-4">
                      {[
                        "Developed a dynamic School Management System using JAVA, MySQL, and JavaScript to automate academic and administrative tasks.",
                        "Implemented role-based login for admin, teacher, student, and parent panels, ensuring secure and personalized access.",
                        "Created modules for attendance, fee management, exam results, and timetable scheduling, enhancing operational efficiency.",
                        "Optimized database queries and UI responsiveness, reducing manual workload by 45% and improving system reliability.",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <div
                            className={`mt-1.5 mr-3 w-4 h-4 rounded-full flex-shrink-0 ${theme === "light" ? "bg-blue-100" : "bg-blue-900/50"} flex items-center justify-center`}
                          >
                            <ArrowRight
                              className={`w-3 h-3 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`}
                            />
                          </div>
                          <p className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>{item}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Project image - School Management System front page */}
                  <div
                    className={`mb-6 rounded-lg overflow-hidden ${theme === "light" ? "border border-gray-200" : "border border-gray-700"}`}
                  >
                    <div className="relative h-64 overflow-hidden group">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smp_i3-C2LiuTqZSgrJLDQtin46cMLx0ePomG.png"
                        alt="School Management System"
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className={`absolute inset-0 ${theme === "light" ? "bg-gradient-to-t from-white/70 to-transparent" : "bg-gradient-to-t from-gray-900/70 to-transparent"} opacity-80`}
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h5 className={`text-lg font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                          School Management System
                        </h5>
                        <p className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          Comprehensive solution for educational institutions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      TECHNOLOGIES & SKILLS
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          name: "JAVA",
                          color:
                            theme === "light"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-red-900/20 text-red-400 border-red-900/30",
                        },
                        {
                          name: "MySQL",
                          color:
                            theme === "light"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-blue-900/20 text-blue-400 border-blue-900/30",
                        },
                        {
                          name: "JavaScript",
                          color:
                            theme === "light"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : "bg-yellow-900/20 text-yellow-400 border-yellow-900/30",
                        },
                        {
                          name: "Authentication",
                          color:
                            theme === "light"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : "bg-purple-900/20 text-purple-400 border-purple-900/30",
                        },
                        {
                          name: "Database Optimization",
                          color:
                            theme === "light"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-green-900/20 text-green-400 border-green-900/30",
                        },
                      ].map((skill, index) => (
                        <motion.span
                          key={index}
                          className={`px-3 py-1.5 rounded-full text-sm border ${skill.color} flex items-center`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + index * 0.05 }}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* View project link */}
                  <motion.div
                    className="mt-6 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <a
                      href="https://github.com/Guptsonu22/School-Managment-System"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center ${theme === "light" ? "text-blue-600 hover:text-blue-700" : "text-blue-400 hover:text-blue-300"} font-medium`}
                    >
                      View Project
                      <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Add more experience items here with the same structure */}

            {/* End marker */}
            <motion.div
              className={`absolute left-4 bottom-0 w-8 h-8 -ml-3.5 rounded-full ${theme === "light" ? "bg-purple-500" : "bg-purple-500"} border-4 ${theme === "light" ? "border-blue-100" : "border-[#0c1222]"} z-10 flex items-center justify-center`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.2 }}
            >
              <Award className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          {/* Looking for more opportunities */}
          <motion.div
            className={`text-center mt-12 p-6 rounded-xl ${theme === "light" ? "bg-blue-50 border border-blue-100" : "bg-blue-900/20 border border-blue-800/30"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <h4 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Looking for New Opportunities
            </h4>
            <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-4`}>
              I'm currently seeking new challenges where I can apply my skills and continue to grow as a developer.
            </p>
            <motion.a
              href="#contact"
              className={`inline-flex items-center px-4 py-2 rounded-full ${theme === "light" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
