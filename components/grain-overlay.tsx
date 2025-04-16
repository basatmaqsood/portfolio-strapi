"use client"

import { useEffect, useRef } from "react"

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateNoise()
    }

    // Generate noise pattern
    const generateNoise = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create noise
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Random grayscale value with low opacity
        const value = Math.floor(Math.random() * 255)
        data[i] = value // r
        data[i + 1] = value // g
        data[i + 2] = value // b
        data[i + 3] = Math.random() * 15 // alpha (very subtle)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Initial setup
    resize()
    window.addEventListener("resize", resize)

    // Animation loop for subtle movement
    let animationId: number
    const animate = () => {
      generateNoise()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] opacity-20 mix-blend-overlay"
      aria-hidden="true"
    />
  )
}
