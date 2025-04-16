"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { motion } from "framer-motion"

type ProfileProps = {
  profile: any
  loading: boolean
}

export default function ProfileCard({ profile, loading }: ProfileProps) {
  if (loading) {
    return (
      <div className="profile-card rounded-2xl p-6 animate-pulse">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full mb-4"></div>
          <div className="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-700 rounded mb-6"></div>
          <div className="w-full h-10 bg-gray-700 rounded-full mb-4"></div>
          <div className="w-full h-10 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    )
  }

  const profileData = profile || {
    Name: "Basat Maqsood",
    job: "Frontend Developer",
    email: "itzbasatmaqsood@gmail.com",
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

  return (
    <motion.div
      className="profile-card rounded-2xl p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="relative w-32 h-32 mb-6 overflow-hidden rounded-full border-2 border-purple-500"
          variants={itemVariants}
        >
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt={profileData.Name}
            width={128}
            height={128}
            className="object-cover"
          />
        </motion.div>

        <motion.h2 className="text-2xl font-bold mb-1" variants={itemVariants}>
          {profileData.Name}
        </motion.h2>
        <motion.p className="text-gray-400 mb-6" variants={itemVariants}>
          {profileData.job}
        </motion.p>

        <motion.div className="w-full mb-3" variants={itemVariants}>
          <Link href="/contact" className="w-full block btn-primary text-center">
            Let's Talk
          </Link>
        </motion.div>

        <motion.div className="w-full mb-8" variants={itemVariants}>
          <Link href="/projects" className="w-full block btn-secondary text-center">
            My Work →
          </Link>
        </motion.div>

        <motion.div className="flex justify-center gap-5 w-full" variants={itemVariants}>
          <Link
            href="https://github.com"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href={`mailto:${profileData.email}`}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail size={20} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
