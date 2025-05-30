"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Home } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { useDopStarStore } from "@/lib/store/useDopStarStore"
import { formatDate } from "@/lib/utils"
import Image from "next/image"


export default function Leaderboard() {
  const { leaderboard, fetchLeaderboard, isLoadingLeaderboard } = useDopStarStore()

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image width={60} height={60} src={"./logo.png"} alt="D'Opstar Logo" title="D'Opstar Logo" />
          </Link>
          <Link href="/game" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={18} />
            <span>Back to Game</span>
          </Link>
        </div>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Trophy className="text-yellow-500" size={28} />
          Top Performers
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Player</th>
                <th className="py-3 px-4 text-left">Score</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <motion.tr
                  key={entry._id}
                  className="border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {index === 0 ? (
                        <span className="text-2xl">🥇</span>
                      ) : index === 1 ? (
                        <span className="text-2xl">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-2xl">🥉</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">
                    {entry.name}
                  </td>
                  <td className="py-4 px-4 font-bold">{entry.score}</td>
                  <td className="py-4 px-4">{entry.time}</td>
                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{formatDate(entry.createdAt!)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <Link
          href="/game"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all"
        >
          <ArrowLeft size={18} />
          Back to game
        </Link>
      </motion.div>
    </div>
  )
}
