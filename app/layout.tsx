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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} w-full overflow-x-hidden`}>
        <div className="w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
        <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}