"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type MainContentProps = {
  children: ReactNode
  title?: string
  subtitle?: string
}

export default function MainContent({ children, title, subtitle }: MainContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div className="space-y-12 mt-4" initial="hidden" animate="visible" variants={containerVariants}>
      {(title || subtitle) && (
        <motion.div className="mb-8" variants={itemVariants}>
          {title && <h1 className="text-3xl font-bold mb-2 text-shadow">{title}</h1>}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </motion.div>
      )}
      {children}
    </motion.div>
  )
}
