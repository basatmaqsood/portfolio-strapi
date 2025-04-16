"use client"

import { useState, useEffect, useRef } from "react"

type TextScrambleProps = {
  text: string
  className?: string
  speed?: number
  scrambleSpeed?: number
}

export default function TextScramble({ text, className = "", speed = 50, scrambleSpeed = 20 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const [isScrambling, setIsScrambling] = useState(false)
  const chars = "!<>-_\\/[]{}—=+*^?#________"
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)
  const finalTextRef = useRef(text)

  useEffect(() => {
    if (text !== finalTextRef.current) {
      finalTextRef.current = text
      setIsScrambling(true)
      scrambleText()
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text])

  const scrambleText = () => {
    const oldText = displayText
    const newText = finalTextRef.current
    const maxLength = Math.max(oldText.length, newText.length)

    let result = ""
    let complete = 0

    for (let i = 0; i < maxLength; i++) {
      if (i < complete) {
        result += newText[i]
      } else if (newText[i] && oldText[i] !== newText[i]) {
        result += chars[Math.floor(Math.random() * chars.length)]
      } else {
        result += oldText[i] || ""
      }
    }

    setDisplayText(result)

    if (complete < newText.length) {
      if (frameRef.current % 3 === 0) {
        complete = Math.min(complete + 1, newText.length)
      }

      frameRef.current++
      timeoutRef.current = setTimeout(scrambleText, scrambleSpeed)
    } else {
      setIsScrambling(false)
      setDisplayText(newText)
    }
  }

  return <span className={`scramble-text ${className} ${isScrambling ? "scrambling" : ""}`}>{displayText}</span>
}
