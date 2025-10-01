"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "../context/ThemeContext"

export default function Resume() {
  const { toast } = useToast()
  const fileName = "Sonu-Kumar-Resume.pdf"
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isDownloading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            setIsDownloading(false)
            return 100
          }
          const increment = Math.random() * 10
          const newProgress = Math.min(prevProgress + increment, 100)
          setSpeed(Math.round(increment * 50)) // Simulated speed in KB/s
          return newProgress
        })
      }, 200)
    }
    return () => clearInterval(interval)
  }, [isDownloading])

  const handleDownload = () => {
    const fileId = "1kE9Eg92uDIymnkOdS1lC7AEtioeFmuST"
    const downloadUrl = `https://drive.google.com/file/d/1jx7cAzTfCZwcqQFv2TukPoBhnXXzbEde/view?usp=drive_link`

    setIsDownloading(true)
    setProgress(0)

    // Simulate download start
    setTimeout(() => {
      window.open(downloadUrl, "_blank")
    }, 1000)

    toast({
      title: "Download Started",
      description: "Your resume download should begin shortly.",
      duration: 3000,
    })
  }

  return (
    <section
      id="resume"
      className={`py-32 ${theme === "light" ? "bg-gradient-to-b from-blue-50 to-white" : "bg-gradient-to-b from-gray-900 to-gray-800"}`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Card
            className={`overflow-hidden shadow-lg ${theme === "light" ? "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" : "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"}`}
          >
            <CardContent className="p-8 relative">
              <motion.div
                className="absolute inset-0 bg-white opacity-10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  backgroundSize: ["100% 100%", "200% 200%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Resume</h2>
                <p className="text-center text-white/80 mb-6">
                  Download my resume to learn more about my skills, experience, and qualifications.
                </p>
                <Button
                  onClick={handleDownload}
                  className={`w-full ${theme === "light" ? "bg-white text-blue-500 hover:bg-blue-50" : "bg-white text-blue-600 hover:bg-blue-100"} transition-colors`}
                  size="lg"
                  disabled={isDownloading}
                >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>

                <AnimatePresence>
                  {isDownloading && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-white hover:bg-white/20"
                          onClick={() => setIsDownloading(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm font-medium mb-2 text-white">Downloading: {fileName}</p>
                        <Progress value={progress} className="mb-2" />
                        <div className="flex justify-between text-xs text-white/80">
                          <span>{progress.toFixed(0)}% Complete</span>
                          <span>{speed} KB/s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
