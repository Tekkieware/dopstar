"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Star, Sparkles } from "lucide-react"

interface LevelCompleteToastProps {
  show: boolean
  level: number
  score: number
}

export default function LevelCompleteToast({ show, level, score }: LevelCompleteToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90 px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(89,51,146,0.5)] flex items-center gap-4 border border-white/20">
            {/* Animated sparkles in background */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "loop" }}
                className="absolute top-1/4 left-1/4"
              >
                <Sparkles className="h-4 w-4 text-yellow-300/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "loop", delay: 0.5 }}
                className="absolute top-3/4 left-1/3"
              >
                <Sparkles className="h-3 w-3 text-yellow-300/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, repeatType: "loop", delay: 1 }}
                className="absolute top-1/3 right-1/4"
              >
                <Sparkles className="h-5 w-5 text-yellow-300/40" />
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10 }}
                className="bg-green-500 rounded-full p-1.5"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-900 border-2 border-white"
              >
                {level}
              </motion.div>
            </div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-white text-lg"
              >
                Level Complete!
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <p className="text-white/80 text-sm">You earned</p>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center ml-2 bg-white/10 rounded-full px-2 py-0.5"
                >
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-bold text-white">{score} points</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Animated pulse ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-lg border border-white/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
