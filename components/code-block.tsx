"use client"

import { useEffect, useState } from "react"
import { TypingEffect } from "./typing-effect"

interface CodeBlockProps {
  code: string
  className?: string
  delay?: number
}

export function CodeBlock({ code, className, delay = 0 }: CodeBlockProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isVisible) return null

  return (
    <div className={`font-mono text-xs ${className}`}>
      <TypingEffect text={code} speed={20} />
    </div>
  )
}
