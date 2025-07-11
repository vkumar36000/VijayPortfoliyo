import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Center } from '@react-three/drei'
import { ArrowRight, Download, Github, Linkedin, FileText, ChevronDown } from 'lucide-react'

// 3D Avatar/Shape Component
function Hero3DShape() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7e5bef"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// Floating Tech Icons Component
function FloatingIcon({ position, icon, color }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

const Hero = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/vijay-kumar-239199306",
      icon: Linkedin,
      label: "LinkedIn"
    },
    {
      href: "https://github.com/vkumar36000",
      icon: Github,
      label: "GitHub"
    },
    {
      href: "/assets/resume.pdf",
      icon: FileText,
      label: "Resume"
    }
  ]

  const roles = ["Frontend Developer", "React Specialist", "UI/UX Enthusiast"]

  return (
    <section id="home" className="section relative overflow-hidden" ref={ref}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-800/20 pointer-events-none" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content Side */}
          <motion.div
            className="space-y-8 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting */}
            <motion.div
              className="flex items-center space-x-4 text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Hello, I'm</span>
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-2xl"
              >
                👋
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block text-white">VIJAY</span>
              <span className="block text-gradient">KUMAR</span>
            </motion.h1>

            {/* Animated Roles */}
            <motion.div
              className="text-xl md:text-2xl text-gray-300 min-h-[2rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {roles.map((role, index) => (
                <motion.span
                  key={role}
                  className="block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 2 + 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: roles.length * 2 - 0.5
                  }}
                  style={{
                    position: index > 0 ? 'absolute' : 'relative'
                  }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-400 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Crafting digital experiences that blend creativity with functionality. 
              Passionate about building responsive, user-centric web applications with modern technologies.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary cursor-hover group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary cursor-hover group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors cursor-hover group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Visual Side */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#7e5bef" intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#6d39e3" intensity={0.5} />

              <Hero3DShape />
              
              {/* Floating tech icons */}
              <FloatingIcon position={[-2, 2, 0]} color="#61dafb" />
              <FloatingIcon position={[2, -1, 0]} color="#f7df1e" />
              <FloatingIcon position={[-1, -2, 0]} color="#e34c26" />
              <FloatingIcon position={[2.5, 1.5, 0]} color="#264de4" />
            </Canvas>

            {/* Floating Elements Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-20 right-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-32 left-8 w-12 h-12 bg-blue-500/20 rounded-full blur-lg"
                animate={{
                  y: [0, 20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-hover"
          >
            <ChevronDown size={24} className="text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero