"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AnimatedBackground() {
  const [blobs, setBlobs] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([])
  const particlesRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0.05])

  useEffect(() => {
    // Create random blobs
    const newBlobs = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 200,
      color: getRandomColor(),
    }))
    setBlobs(newBlobs)

    // Create initial particles
    createParticles(20)

    // Set up mouse move listener for particle effect
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
        createParticle(e.clientX, e.clientY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles periodically for ambient effect
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        createParticle(Math.random() * width, Math.random() * height)
      }
    }, 500)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(intervalId)
    }
  }, [])

  const getRandomColor = () => {
    const colors = [
      "rgba(139, 92, 246, 0.15)", // Purple
      "rgba(99, 102, 241, 0.15)", // Indigo
      "rgba(79, 70, 229, 0.15)", // Violet
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const createParticles = (count: number) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 2 + 1,
    }))
    setParticles((prev) => [...prev, ...newParticles])
  }

  const createParticle = (x: number, y: number) => {
    const newParticle = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 2 + 1,
    }
    setParticles((prev) => [...prev, newParticle])

    // Remove particle after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
    }, newParticle.duration * 1000)
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div className="animated-bg" style={{ opacity: backgroundOpacity }}>
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="animated-blob"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
            }}
            animate={{
              x: [0, 15, -10, 5, 0],
              y: [0, -10, 15, -5, 0],
              scale: [1, 1.05, 0.95, 1.02, 1],
            }}
            transition={{
              duration: 25 + blob.id * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{
              opacity: 0,
              scale: 1,
              y: particle.y - 50 - Math.random() * 20,
              x: particle.x + (Math.random() - 0.5) * 20,
            }}
            transition={{
              duration: particle.duration,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
