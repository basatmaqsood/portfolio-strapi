"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

export default function CustomCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorSize, setCursorSize] = useState(12)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleHoverOn = () => setCursorSize(20)
    const handleHoverOff = () => setCursorSize(12)

    window.addEventListener("mousemove", moveCursor)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    const targets = document.querySelectorAll('a, button, input, textarea, [role="button"], .clickable')
    targets.forEach(el => {
      el.addEventListener("mouseenter", handleHoverOn)
      el.addEventListener("mouseleave", handleHoverOff)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)

      targets.forEach(el => {
        el.removeEventListener("mouseenter", handleHoverOn)
        el.removeEventListener("mouseleave", handleHoverOff)
      })
    }
  }, [x, y])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        width: cursorSize,
        height: cursorSize,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        zIndex: 101,
        willChange: "transform",
      }}
      transition={{
        duration: 0.1,
        ease: "linear",
      }}
    />
  )
}
