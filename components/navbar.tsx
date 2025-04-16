"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, FolderOpen, Briefcase, FileText, Mail } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "About", path: "/about", icon: <FileText size={20} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={20} /> },
    { name: "Blog", path: "/blog", icon: <FolderOpen size={20} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={20} /> },
  ]

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center items-center py-3 transition-all duration-300"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      style={{ position: "fixed" }}
    >
      <motion.nav
        className={`rounded-full backdrop-blur-md px-3 py-3 transition-all  duration-300 flex items-center justify-center space-x-2 sm:space-x-4 ${
          scrolled ? "bg-black/80 border border-gray-800/50 shadow-lg shadow-purple-900/10" : "border border-white"
        }`}
        whileHover={{ scale: scrolled ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.path

          return (
            <Link key={link.path} href={link.path} className="relative group">
              <motion.div
                className={`p-3 rounded-full transition-colors relative z-10 ${
                  isActive ? "text-white bg-purple-600" : "text-gray-400 hover:text-white"
                }`}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </motion.div>

              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-gray-800/50 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 pointer-events-none whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.div>
            </Link>
          )
        })}
      </motion.nav>
    </motion.header>
  )
}
