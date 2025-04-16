"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAboutData } from "@/lib/api"
import { Github, Linkedin, Twitter, Mail, ArrowRight, Code, Palette, Layout, Zap, Globe } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import MagneticElement from "@/components/magnetic-element"
import AnimatedText from "@/components/animated-text"
import ParallaxSection from "@/components/parallax-section"

export default function Hero() {
  const [profile, setProfile] = useState({
    Name: "Basat Maqsood",
    job: "Frontend Developer",
    bio: "Passionate about creating intuitive and engaging user experiences. Specialized in transforming ideas into beautifully crafted products.",
    yearsExperience: 3,
    projectsCompleted: 46,
    clientsSatisfied: 20,
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutData()
        if (data?.data?.[0]) {
          setProfile({
            ...profile,
            Name: data.data[0].Name,
            job: data.data[0].job,
            bio: data.data[0].bio,
          })
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }

    fetchData()
  }, [])

  // Update the animation variants to be smoother
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <Code className="w-5 h-5 text-purple-400" />,
      title: "Web Development",
      description: "Building responsive and performant web applications with modern technologies.",
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: "UI/UX Design",
      description: "Creating intuitive and engaging user interfaces with a focus on user experience.",
    },
    {
      icon: <Layout className="w-5 h-5 text-purple-400" />,
      title: "Frontend Architecture",
      description: "Designing scalable and maintainable frontend architectures for complex applications.",
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      title: "Performance Optimization",
      description: "Optimizing web applications for speed, accessibility, and SEO.",
    },
  ]

  return (
    <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 relative" ref={ref}>
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="container mx-auto px-4 max-w-6xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <ParallaxSection className="md:col-span-4 flex justify-center md:justify-start" speed={0.1} direction="up">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative perspective-1000"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-xl animate-pulse-slow" />
              <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-purple-500/20 transform-style-3d">
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt={profile.Name}
                  width={256}
                  height={256}
                  className="object-cover"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-bold">{profile.Name}</h3>
                  <p className="text-sm text-gray-300">{profile.job}</p>
                </motion.div>
              </div>
            </motion.div>
          </ParallaxSection>

          <div className="md:col-span-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-3 glitch"
              variants={itemVariants}
              data-text="Transforming Your Ideas into Reality"
            >
              <AnimatedText text="Transforming Your Ideas into" animation="wave" duration={0.03} />
              <span className="ml-2">
                <AnimatedText text="Reality" animation="gradient" className="text-gradient" />
              </span>
            </motion.h1>

            <motion.p className="text-gray-300 text-lg mb-8 max-w-2xl" variants={itemVariants}>
              <AnimatedText text={profile.bio} animation="reveal" delay={0.5} duration={0.01} />
            </motion.p>

            <motion.div className="grid grid-cols-3 gap-4 mb-8" variants={itemVariants}>
              {[
                { value: profile.yearsExperience, label: "YEARS OF EXPERIENCE" },
                { value: profile.projectsCompleted, label: "PROJECTS COMPLETED" },
                { value: profile.clientsSatisfied, label: "SATISFIED CLIENTS" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statsVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50"
                >
                  <motion.h3
                    className="text-3xl font-bold text-purple-500"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                  >
                    +{stat.value}
                  </motion.h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 mb-8" variants={itemVariants}>
              <MagneticElement strength={40}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Let's Talk</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-70 blur-lg transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </MagneticElement>
              <MagneticElement strength={40}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="/projects"
                    className="px-6 py-3 bg-transparent border border-gray-700 hover:border-purple-500 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">My Work →</span>
                    <span className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </MagneticElement>
            </motion.div>

            <motion.div className="mt-8" variants={itemVariants}>
              <p className="text-sm text-gray-400 mb-3">Trusted by innovative companies worldwide</p>
              <div className="flex flex-wrap gap-8">
                {[1, 2, 3].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -5, filter: "brightness(1.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src="/placeholder.svg?height=30&width=120" alt="Company logo" width={120} height={30} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              My <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I offer a range of services to help businesses create exceptional digital experiences that engage users
              and drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-purple-900/20 p-3 rounded-lg w-fit mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Project Section */}
        <motion.div
          className="mt-20 bg-gray-900/30 p-8 rounded-2xl border border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Project</h2>
              <p className="text-gray-400">Check out my latest work</p>
            </div>
            <Link
              href="/projects"
              className="mt-4 md:mt-0 text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Featured project" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-3">Revo - SaaS Platform</h3>
              <p className="text-gray-300 mb-6">
                A comprehensive SaaS platform designed to help businesses streamline their operations and improve
                productivity. Built with React, Next.js, and Tailwind CSS.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "Next.js", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <span key={tech} className="bg-purple-900/20 text-purple-300 text-xs px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href="/projects/revo"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 w-fit transition-colors"
              >
                View Project <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex justify-center gap-6 mt-16" variants={itemVariants}>
          {[
            { href: "https://github.com", icon: <Github size={24} />, label: "GitHub" },
            { href: "https://linkedin.com", icon: <Linkedin size={24} />, label: "LinkedIn" },
            { href: "https://twitter.com", icon: <Twitter size={24} />, label: "Twitter" },
            { href: "mailto:itzbasatmaqsood@gmail.com", icon: <Mail size={24} />, label: "Email" },
            { href: "https://basatmaqsood.com", icon: <Globe size={24} />, label: "Website" },
          ].map((social, index) => (
            <MagneticElement key={index} strength={60}>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors relative block p-3 bg-gray-900/50 rounded-full border border-gray-800/50 hover:border-purple-500/30"
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="absolute inset-0 bg-purple-600/20 rounded-full scale-0 opacity-0 hover:scale-150 hover:opacity-100 transition-all duration-300" />
                </Link>
              </motion.div>
            </MagneticElement>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
