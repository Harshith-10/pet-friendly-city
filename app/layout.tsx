import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pet-Friendly City Initiative",
  description:
    "A nationwide campaign transforming Indian cities into safe, welcoming environments for pets and stray animals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}