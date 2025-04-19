"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-[#593392] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Docker Arrange
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-200 transition-colors">
              Game
            </Link>
            <Link href="/leaderboard" className="hover:text-gray-200 transition-colors">
              Leaderboard
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/" className="block py-2 hover:bg-[#4a2a78] px-4 rounded" onClick={() => setIsMenuOpen(false)}>
              Game
            </Link>
            <Link
              href="/leaderboard"
              className="block py-2 hover:bg-[#4a2a78] px-4 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
