"use client"

import Link from "next/link"
import { projects } from "@/lib/data"
import ProjectCard from "./project-card"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Projects() {
  // Display only the first 4 projects on the homepage
  const featuredProjects = projects.slice(0, 4)

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
      className="mb-16 reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8"
        variants={itemVariants}
      >
        <div>
          <h2 className="section-heading">
            Recent Projects and <span className="section-heading-gradient">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-xl">
            Explore my latest work showcasing my skills in frontend development and UI/UX design.
          </p>
        </div>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/projects"
            className="mt-4 md:mt-0 text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project, index) => (
          <motion.div key={project.id} variants={itemVariants} className="reveal">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
