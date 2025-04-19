"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface ToastNotificationProps {
  type: "success" | "error"
  message: string
  levelNumber?: number
  pointsEarned?: number
  duration?: number
  onClose: () => void
}

export default function ToastNotification({
  type,
  message,
  levelNumber,
  pointsEarned,
  duration = 3000,
  onClose,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow exit animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
        >
          <div
            className={`rounded-lg shadow-lg p-4 flex items-start ${
              type === "success" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
            }`}
          >
            <div className="flex-shrink-0 mr-3">
              {type === "success" ? (
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3
                  className={`font-medium ${
                    type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {type === "success" ? "Level Complete!" : "Error"}
                </h3>
                {levelNumber && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded-full">
                    Level {levelNumber}
                  </span>
                )}
              </div>
              <p
                className={`text-sm ${
                  type === "success" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                }`}
              >
                {message}
              </p>
              {type === "success" && pointsEarned && (
                <p className="text-sm font-bold text-green-700 dark:text-green-300 mt-1">+{pointsEarned} points</p>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 300)
              }}
              className="ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">Close</span>
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
