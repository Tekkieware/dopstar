"use client"

import { motion } from "framer-motion"

interface GameStageProps {
  stageNumber: number
  description: string
}

export default function GameStage({ stageNumber, description }: GameStageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-6"
    >
      <h2 className="text-xl font-semibold mb-2">Stage {stageNumber}</h2>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}
