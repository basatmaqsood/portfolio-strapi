"use client"

import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/data"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function BlogPosts() {
  // Display only the first 4 blog posts on the homepage
  const featuredPosts = blogPosts.slice(0, 4)

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
      className="mb-16"
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
            Design Thoughts and <span className="section-heading-gradient">Perspectives</span>
          </h2>
          <p className="text-gray-400 max-w-xl">
            Insights, ideas, and reflections on design, development, and the digital landscape.
          </p>
        </div>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
          >
            View All Posts <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredPosts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Link href={`/blog/${post.id}`} className="group block">
              <motion.div
                className="content-card rounded-xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/60 backdrop-blur-sm px-3 py-1 text-xs">
                    {post.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-2">{post.excerpt}</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
