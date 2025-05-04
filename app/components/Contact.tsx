"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import { useState, useRef } from "react"
import useMobile from "../hooks/useMobile"
import { useTheme } from "../context/ThemeContext"

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
    url: "https://www.linkedin.com/in/sonu-kumar-443803231",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
    url: "https://github.com/Guptsonu22",
    gradient: "from-gray-700 to-gray-900",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />,
    url: "https://x.com/SonuGup46022700",
    gradient: "from-blue-400 to-blue-500",
  },
]

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: 15, transition: { duration: 0.3 } },
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { isMobile } = useMobile()
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      // Use FormSubmit service to send the email
      const response = await fetch("https://formsubmit.co/sonugupta411093@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitSuccess(true)
        if (formRef.current) {
          formRef.current.reset()
        }

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      } else {
        setSubmitError(true)
      }
    } catch (error) {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className={`py-16 sm:py-24 md:py-32 ${theme === "light" ? "bg-gradient-to-b from-gray-100 to-white" : "bg-gradient-to-b from-gray-900 to-gray-800"}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-8 sm:mb-16 text-center ${theme === "light" ? "text-gray-800" : "text-white"}`}
          >
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <div>
              <h3
                className={`text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 ${theme === "light" ? "text-gray-800" : "text-white"}`}
              >
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <motion.a
                  href="mailto:sonugupta411093@gmail.com"
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      Email
                    </p>
                    <p
                      className={`text-sm sm:text-base ${theme === "light" ? "text-gray-800 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"} transition-colors`}
                    >
                      sonugupta411093@gmail.com
                    </p>
                  </div>
                </motion.a>
              </div>

              <div className="mt-8 sm:mt-12">
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}
                >
                  Social Links
                </h3>
                <div className="flex space-x-3 sm:space-x-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={iconVariants}
                      initial="initial"
                      whileHover="hover"
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${link.gradient} rounded-xl flex items-center justify-center text-white shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                      aria-label={`Visit ${link.name}`}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3
                className={`text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 ${theme === "light" ? "text-gray-800" : "text-white"}`}
              >
                Send a Message
              </h3>
              <form
                ref={formRef}
                action="https://formsubmit.co/sonugupta411093@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New message from your portfolio website!" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />

                <div>
                  <label
                    htmlFor="name"
                    className={`block text-xs sm:text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1 sm:mb-2`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      theme === "light"
                        ? "bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                    } focus:border-transparent text-sm sm:text-base`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-xs sm:text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1 sm:mb-2`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      theme === "light"
                        ? "bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                    } focus:border-transparent text-sm sm:text-base`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-xs sm:text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1 sm:mb-2`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={isMobile ? 3 : 4}
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      theme === "light"
                        ? "bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                    } focus:border-transparent text-sm sm:text-base`}
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className={`w-full ${
                    theme === "light"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  } text-white py-2 sm:py-3 rounded-lg font-medium transition-colors relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : submitSuccess ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Message Sent!
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {submitError && (
                  <div
                    className={`mt-4 p-3 rounded-md text-center bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400`}
                  >
                    There was an error sending your message. Please try again or email directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
