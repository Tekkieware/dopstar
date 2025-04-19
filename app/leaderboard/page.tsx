"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Home } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

interface LeaderboardEntry {
  id: number
  name: string
  time: string
  score: number
  date: string
}

// Mock data with scores between 200 and 400
const mockLeaderboard: LeaderboardEntry[] = [
  { id: 1, name: "DockerPro", time: "01:45", score: 400, date: "2025-03-10" },
  { id: 2, name: "ContainerMaster", time: "02:12", score: 350, date: "2025-03-09" },
  { id: 3, name: "Anonymous", time: "02:30", score: 300, date: "2025-03-08" },
  { id: 4, name: "DevOpsGuru", time: "02:55", score: 250, date: "2025-03-07" },
  { id: 5, name: "KubeWizard", time: "03:10", score: 200, date: "2025-03-06" },
]

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [newEntry, setNewEntry] = useState<LeaderboardEntry | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only run this once on component mount
    if (!isInitialized) {
      // Get the new entry from localStorage if it exists
      const storedEntry = localStorage.getItem("newLeaderboardEntry")
      let newPlayerEntry: LeaderboardEntry | null = null

      if (storedEntry) {
        try {
          newPlayerEntry = JSON.parse(storedEntry) as LeaderboardEntry
          // Clear the localStorage entry to prevent it from being used again on refresh
          localStorage.removeItem("newLeaderboardEntry")
        } catch (e) {
          console.error("Error parsing leaderboard entry:", e)
        }
      }

      // Create a copy of the mock data
      let leaderboardData = [...mockLeaderboard]

      // Add the new player if it exists
      if (newPlayerEntry) {
        leaderboardData.push(newPlayerEntry)
        // Sort and limit to top 5
        leaderboardData = leaderboardData.sort((a, b) => b.score - a.score).slice(0, 5)

        // Check if the new entry made it to the leaderboard
        const entryInLeaderboard = leaderboardData.find((entry) => entry.id === newPlayerEntry?.id)
        if (entryInLeaderboard) {
          setNewEntry(entryInLeaderboard)
        }
      }

      // Set the leaderboard data
      setLeaderboard(leaderboardData)
      setIsInitialized(true)
    }
  }, [isInitialized])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            <Home size={18} />
            <span>Home</span>
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
        {newEntry && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-2 text-primary font-medium"
          >
            Congratulations! You made it to the leaderboard!
          </motion.p>
        )}
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
                  key={entry.id}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    entry.id === newEntry?.id ? "bg-primary bg-opacity-10 dark:bg-opacity-20" : ""
                  }`}
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
                    {entry.id === newEntry?.id ? (
                      <span className="font-bold text-primary">{entry.name}</span>
                    ) : (
                      entry.name
                    )}
                  </td>
                  <td className="py-4 px-4 font-bold">{entry.score}</td>
                  <td className="py-4 px-4">{entry.time}</td>
                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{entry.date}</td>
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
          Play Again
        </Link>
      </motion.div>
    </div>
  )
}
