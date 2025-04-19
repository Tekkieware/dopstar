"use client"

import { motion, AnimatePresence } from "framer-motion"

interface FeedbackMessageProps {
  type: "success" | "error" | null
  message: string
}

export default function FeedbackMessage({ type, message }: FeedbackMessageProps) {
  if (!type) return null

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${bgColor} text-white p-4 rounded-lg mb-6 text-center`}
      >
        <p>{message}</p>
      </motion.div>
    </AnimatePresence>
  )
}
