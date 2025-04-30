"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tilt } from "react-tilt"

interface AboutBoxProps {
  title: string
  icon: React.ReactNode
  description: string
  details: string
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

export function AboutBox({ title, icon, description, details, gradient, theme = "dark" }: AboutBoxProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Tilt options={defaultOptions} className="w-full h-full">
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl h-full ${gradient}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1.1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <div className="p-6 relative z-10">
          <div className="flex items-center mb-4">
            <div className="mr-4 text-white">{icon}</div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <p className="text-white/80">{description}</p>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-sm overflow-hidden"
        >
          <CardContent className="p-6">
            <p className="text-white/90">{details}</p>
          </CardContent>
        </motion.div>
      </Card>
    </Tilt>
  )
}
