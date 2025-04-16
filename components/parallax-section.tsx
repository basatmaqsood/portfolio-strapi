"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type ParallaxSectionProps = {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const upTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  const downTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`])
  const leftTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  const rightTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return upTransform
      case "down":
        return downTransform
      case "left":
        return leftTransform
      case "right":
        return rightTransform
      default:
        return upTransform
    }
  }

  const transform = getTransform()
  const isHorizontal = direction === "left" || direction === "right"

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{
          [isHorizontal ? "x" : "y"]: transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
