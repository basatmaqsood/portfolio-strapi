"use client"

import { useEffect, useRef } from "react"

export default function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Initialize the IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          } else {
            // Optional: remove the class when element is not in viewport
            // entry.target.classList.remove("active");
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    // Select all elements with the 'reveal' class
    const revealElements = document.querySelectorAll(".reveal")

    // Observe each element
    revealElements.forEach((element) => {
      observerRef.current?.observe(element)
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        revealElements.forEach((element) => {
          observerRef.current?.unobserve(element)
        })
      }
    }
  }, [])

  return null
}
