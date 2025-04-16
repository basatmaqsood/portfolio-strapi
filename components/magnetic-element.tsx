"use client"

import type React from "react"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

type MagneticElementProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticElement({ children, className = "", strength = 30 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    // Reduce the strength for more subtle movement
    const x = (clientX - (left + width / 2)) / (strength * 1.5)
    const y = (clientY - (top + height / 2)) / (strength * 1.5)

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
