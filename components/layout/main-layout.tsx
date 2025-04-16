"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProfileCard from "@/components/profile-card"
import { getAboutData } from "@/lib/api"
import LoadingScreen from "@/components/loading-screen"
import ScrollAnimations from "@/components/scroll-animations"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutData()
        if (data?.data?.[0]) {
          setProfileData(data.data[0])
        }

        // Simulate a minimum loading time for the animation
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      } catch (error) {
        console.error("Error fetching profile data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <ScrollAnimations />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Navbar />
            <div className="container mx-auto px-4 py-20">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                  <div className="lg:sticky lg:top-24">
                    <ProfileCard profile={profileData} loading={loading} />
                  </div>
                </div>
                <motion.div
                  className="lg:w-3/4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {children}
                </motion.div>
              </div>
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
