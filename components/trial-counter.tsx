"use client"

import { motion } from "framer-motion"

interface TrialCounterProps {
  trials: number
  maxTrials: number
}

export default function TrialCounter({ trials, maxTrials }: TrialCounterProps) {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
      <p className="text-gray-700 dark:text-gray-300 flex items-center">
        Attempts:
        <span className="ml-2 flex">
          {Array.from({ length: maxTrials }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`inline-block w-3 h-3 rounded-full mx-0.5 ${
                i < trials ? "bg-green-500" : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </span>
      </p>
    </div>
  )
}
