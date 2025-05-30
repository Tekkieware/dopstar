import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "D'opstar - Test Your DevOps Knowledge with Docker, Kubernetes & Fun Challenges",
  description: "Dive into D'opstar, the ultimate DevOps-themed game that challenges your skills with Docker, Docker Compose, Kubernetes, and more. Engage in fast-paced scenarios designed for engineers who love learning through play!"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <main className="container mx-auto py-8 px-4">{children}</main>
        </div>
      </body>
    </html>
  )
}
