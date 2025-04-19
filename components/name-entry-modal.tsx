"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface NameEntryModalProps {
  time: string
  score: number
  madeLeaderboard?: boolean
  onSubmit: (name: string) => void
  onClose: () => void
}

export default function NameEntryModal({ time, score, onSubmit, onClose, madeLeaderboard }: NameEntryModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name || "Anonymous")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold mb-4">{madeLeaderboard ? "🏆 Champion! 🏆" : "Game Complete! 🎉"}</h2>

          <div className="mb-6 space-y-2">
            <p className="text-lg">
              You completed the game in <span className="font-bold">{time}</span>!
            </p>
            <p className="text-2xl font-bold text-primary">Final Score: {score} points</p>

            {madeLeaderboard && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-green-500 dark:text-green-400 font-medium mt-2"
              >
                Impressive! You've earned a spot on the leaderboard!
              </motion.p>
            )}
          </div>

          {madeLeaderboard ? (
            <>
              <p className="mb-6">Enter your name to claim your spot on the leaderboard:</p>

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
            </>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSubmit("Anonymous")}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90"
              >
                Continue
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
