"use client"

import { motion } from "framer-motion"

interface ScoreDisplayProps {
  score: number
  totalScore: number
}

export default function ScoreDisplay({ score, totalScore }: ScoreDisplayProps) {
  return (
    <div className="flex gap-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary bg-opacity-10 dark:bg-opacity-20 px-4 py-2 rounded-lg"
      >
        <p className="text-primary font-medium">
          Stage Score: <span className="font-bold">{score}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-primary text-white px-4 py-2 rounded-lg"
      >
        <p className="font-medium">
          Total: <span className="font-bold">{totalScore}</span>
        </p>
      </motion.div>
    </div>
  )
}
