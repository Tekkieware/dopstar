"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Trophy, Clock, Award, BarChart2 } from "lucide-react"

interface StagePerformance {
  stageNumber: number
  time?: number
  attempts: number
  completed: boolean
}

interface GameOverModalProps {
  time: string
  score: number
  stagePerformance: StagePerformance[]
  madeLeaderboard: boolean
  onSubmit: (name: string) => void
  onClose: () => void
  onTryAgain: () => void
}

export default function GameOverModal({
  time,
  score,
  stagePerformance,
  madeLeaderboard,
  onSubmit,
  onClose,
  onTryAgain,
}: GameOverModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name || "Anonymous")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
      >
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button> */}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {madeLeaderboard ? "🏆 Congratulations, Champ! 🏆" : "Game Over"}
            </h2>

            {madeLeaderboard ? (
              <p className="text-green-500 dark:text-green-400">You've earned a spot on the leaderboard!</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">You've run out of attempts, but you still did great!</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center">
              <Clock className="text-primary mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Time</p>
                <p className="text-xl font-bold">{time}</p>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center">
              <Trophy className="text-yellow-500 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Final Score</p>
                <p className="text-xl font-bold">{score} points</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <BarChart2 className="mr-2" size={20} />
              Performance Breakdown
            </h3>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-200 dark:bg-gray-600">
                  <tr>
                    <th className="py-2 px-4 text-left">Stage</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Time</th>
                    <th className="py-2 px-4 text-left">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  {stagePerformance.map((stage) => (
                    <tr key={stage.stageNumber} className="border-t border-gray-200 dark:border-gray-600">
                      <td className="py-2 px-4">Stage {stage.stageNumber}</td>
                      <td className="py-2 px-4">
                        {stage.completed ? (
                          <span className="text-green-500 dark:text-green-400">Completed</span>
                        ) : (
                          <span className="text-red-500 dark:text-red-400">Failed</span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {stage.time
                          ? `${Math.floor(stage.time / 60)}:${(stage.time % 60).toString().padStart(2, "0")}`
                          : "-"}
                      </td>
                      <td className="py-2 px-4">{stage.attempts}/3</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {madeLeaderboard && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="mr-2" size={20} />
                Enter Your Name for the Leaderboard
              </h3>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  autoFocus
                />

                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onSubmit("Anonymous")}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Submit as Anonymous
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>onTryAgain()}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onClose()
                window.location.href = "/leaderboard"
              }}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
            >
              <Trophy size={18} />
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
