"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

type AnimatedTextProps = {
  text: string
  className?: string
  once?: boolean
  animation?: "typewriter" | "reveal" | "wave" | "gradient"
  delay?: number
  duration?: number
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  animation = "reveal",
  delay = 0,
  duration = 0.05,
}: AnimatedTextProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Split text into words for reveal animation
  const words = text.split(" ")

  // Split text into characters for wave animation
  const characters = text.split("")

  // Typewriter effect
  useEffect(() => {
    if (animation === "typewriter" && inView) {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, 50)
        return () => clearTimeout(timeout)
      }
    }
  }, [animation, currentIndex, inView, text])

  // Start animation when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Variants for different animations
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * duration,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  const characterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * duration,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  const waveVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * duration,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  if (animation === "typewriter") {
    return (
      <span ref={ref} className={className}>
        {displayText}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: currentIndex < text.length ? [1, 0, 1] : 0 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
        />
      </span>
    )
  }

  if (animation === "wave") {
    return (
      <motion.span ref={ref} className={`inline-block ${className}`} initial="hidden" animate={controls}>
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            variants={waveVariants}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
            whileHover={{
              y: -5,
              color: "#a855f7",
              transition: { duration: 0.2 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  if (animation === "gradient") {
    return (
      <motion.span
        ref={ref}
        className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-size-200 ${className}`}
        initial={{ backgroundPosition: "0% center" }}
        animate={inView ? { backgroundPosition: ["0% center", "100% center"] } : {}}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        {text}
      </motion.span>
    )
  }

  // Default reveal animation
  return (
    <motion.span ref={ref} className={`inline-block ${className}`} initial="hidden" animate={controls}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
