import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-hover')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverStart)
      element.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverStart)
        element.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 }
        }}
      />
      
      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-purple-400/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
          x: { damping: 30, stiffness: 200 },
          y: { damping: 30, stiffness: 200 }
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-purple-500/20 rounded-full pointer-events-none z-[9997] blur-xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible && isHovering ? 0.8 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
          x: { damping: 40, stiffness: 150 },
          y: { damping: 40, stiffness: 150 }
        }}
      />
    </>
  )
}

export default CustomCursor