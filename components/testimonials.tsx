"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { testimonials } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

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

  const testimonialVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <motion.section
      className="mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h2 className="section-heading mb-8" variants={itemVariants}>
        What Clients Say About My <span className="section-heading-gradient">Work</span>
      </motion.h2>

      <motion.div className="relative max-w-3xl" variants={itemVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="content-card rounded-xl p-8 border border-gray-800/50"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={testimonialVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-purple-500/30">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-lg">{testimonials[currentIndex].name}</h3>
                <p className="text-sm text-gray-400">{testimonials[currentIndex].position}</p>
              </div>
            </div>

            <p className="text-gray-300 italic">"{testimonials[currentIndex].text}"</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-4 gap-2">
          <motion.button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  )
}
