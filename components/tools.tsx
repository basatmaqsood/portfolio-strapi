"use client"

import Image from "next/image"
import { tools } from "@/lib/data"
import { motion } from "framer-motion"

export default function Tools() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      className="mb-16 reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h2 className="section-heading mb-8" variants={itemVariants}>
        Top-Tier Tools for Exceptional <span className="section-heading-gradient">Results</span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            className="content-card rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 reveal"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            custom={index}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gray-800/50 p-2 rounded-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src={tool.icon || "/placeholder.svg"} alt={tool.name} width={24} height={24} />
              </motion.div>
              <div>
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-xs text-gray-400">{tool.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
