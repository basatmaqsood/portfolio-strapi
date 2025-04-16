"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { useRef } from "react"

type Project = {
  id: string
  title: string
  category: string
  image: string
  link?: string
}

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  // Create a gradient that follows the mouse
  const maskImage = useMotionTemplate`radial-gradient(
    180px at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.15),
    transparent
  )`

  // Update the card animation variants to be smoother
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  // Update the image animation to be smoother
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Update the content animation to be smoother
  const contentVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className="content-card rounded-xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500 group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse follow gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition duration-300"
        style={{ background: maskImage }}
      />

      {/* Card content */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <motion.div variants={imageVariants} className="h-full w-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
          />
        </motion.div>
      </div>

      <motion.div className="p-6 relative z-20" variants={contentVariants}>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400">{project.category}</p>

        {project.link && (
          <div className="mt-4">
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={project.link}
                className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 relative"
                target="_blank"
              >
                <span className="relative z-10">View Project</span>
                <motion.span
                  className="text-lg relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                >
                  →
                </motion.span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
      />
    </motion.div>
  )
}
