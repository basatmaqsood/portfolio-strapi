"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <motion.section
      className="mb-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -z-10"
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -z-10"
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="content-card rounded-xl p-8 border border-gray-800/50 relative z-10"
        variants={itemVariants}
        whileHover={{ y: -5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Let's <span className="text-gradient">collaborate</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Unlock the potential of your product with expert design and development. Let's create something amazing
            together that not only meets your goals but also delights your users.
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact" className="inline-flex items-center gap-2 btn-primary">
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
