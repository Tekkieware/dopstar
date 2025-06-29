"use client"

import { motion } from "framer-motion"
import { Code, Container, Database, Layers, Server } from "lucide-react"

export function OrbitalVisualization() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[100vw] h-[100vw] rounded-full border-2 border-primary/10"
        >
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary/30 p-2 rounded-full">
              <Layers className="h-4 w-4 md:h-5 md:w-5 text-primary/60" />
            </div>
          </div>
        </motion.div>
      </div>

     
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[80vw] h-[80vw] rounded-full border-2 border-primary/15"
        >
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="bg-primary/30 p-2 rounded-full">
              <Database className="h-4 w-4 md:h-5 md:w-5 text-primary/60" />
            </div>
          </div>
        </motion.div>
      </div>

      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[60vw] h-[60vw] rounded-full border-2 border-primary/20"
        >
         
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary/30 p-2 rounded-full">
              <Server className="h-4 w-4 md:h-5 md:w-5 text-primary/60" />
            </div>
          </div>
        </motion.div>
      </div>

      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[40vw] h-[40vw] rounded-full border-2 border-primary/25"
        >
  
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary/30 p-2 rounded-full">
              <Code className="h-4 w-4 md:h-5 md:w-5 text-primary/60" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", damping: 10 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-full">
          <Code className="h-8 w-8 md:h-10 md:w-10 text-primary/40" />
        </div>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[20vw] h-[20vw] rounded-full border-2 border-primary/25"
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary/30 p-2 rounded-full">
              <Container className="h-4 w-4 md:h-5 md:w-5 text-primary/60" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", damping: 10 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-full">
          <Code className="h-8 w-8 md:h-10 md:w-10 text-primary/40" />
        </div>
      </motion.div>
    </motion.div>
  )
}
