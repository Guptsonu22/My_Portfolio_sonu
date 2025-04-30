import type React from "react"
import "./globals.css"
import { GeistSans, GeistMono } from "geist/font"
import type { Viewport } from "next"
import { ThemeProvider } from "./context/ThemeContext"

export const metadata = {
  title: "Portfolio - Creative Developer",
  description: "Portfolio of a Creative Developer and IT Student",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#111827",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased overflow-x-hidden`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
