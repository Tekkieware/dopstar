"use client"

import { motion, AnimatePresence } from "framer-motion"
import { XCircle, AlertTriangle } from "lucide-react"

interface ErrorToastProps {
  show: boolean
  message: string
}

export default function ErrorToast({ show, message }: ErrorToastProps) {
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
          <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500/90 dark:from-red-700 dark:to-red-600/90 px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-4 border border-white/20">
            {/* Animated warning triangles */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: [0, 0.3, 0], rotate: 10 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "loop" }}
                className="absolute top-1/4 left-1/4"
              >
                <AlertTriangle className="h-4 w-4 text-yellow-300/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: [0, 0.3, 0], rotate: -10 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "loop", delay: 0.5 }}
                className="absolute bottom-1/4 right-1/4"
              >
                <AlertTriangle className="h-3 w-3 text-yellow-300/40" />
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10 }}
              className="bg-red-700 rounded-full p-1.5"
            >
              <XCircle className="h-8 w-8 text-white" />
            </motion.div>

            <div>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-white text-lg flex items-center"
              >
                <motion.span
                  animate={{ rotate: [0, -5, 0, 5, 0] }}
                  transition={{ repeat: 1, duration: 0.5, delay: 0.3 }}
                >
                  Error
                </motion.span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-sm"
              >
                {message}
              </motion.p>
            </div>

            {/* Animated pulse ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 0.8], opacity: [0, 0.5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 rounded-lg border border-white/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
