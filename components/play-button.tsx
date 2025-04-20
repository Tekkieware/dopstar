"use client"
import { truncate } from 'fs/promises'
import { Play } from 'lucide-react'
import React, { useState } from 'react'

const PlayButton = () => {
    const [isStarting, setIsStarting] = useState<boolean>(false)
  return (
    <button disabled={isStarting} onClick={()=>setIsStarting(true)} className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-purple-500 px-10 py-4 text-lg font-bold text-white shadow-[0_5px_15px_rgba(89,51,146,0.4)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(89,51,146,0.6)] hover:-translate-y-1 animate-pulse-grow">
    <span className="relative z-10 flex items-center gap-2">
      <span>{isStarting ? "Starting...": "Play Now"}</span>
      {!isStarting && <Play className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />}
    </span>
    <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-purple-500 rounded-full"></span>
    <span className="absolute inset-0 z-0 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
  </button>
  )
}

export default PlayButton