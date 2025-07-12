import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

// 3D Orbiting Tech Icons
function OrbitingIcon({ position, color, radius = 2, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      meshRef.current.position.x = Math.cos(time) * radius
      meshRef.current.position.z = Math.sin(time) * radius
      meshRef.current.rotation.y += delta * 2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function TechOrbit() {
  return (
    <>
      <OrbitingIcon position={[0, 1, 0]} color="#61dafb" radius={2.5} speed={0.8} />
      <OrbitingIcon position={[0, 0, 0]} color="#f7df1e" radius={2} speed={1.2} />
      <OrbitingIcon position={[0, -1, 0]} color="#e34c26" radius={1.5} speed={1.5} />
      <OrbitingIcon position={[0, 0.5, 0]} color="#264de4" radius={3} speed={0.6} />
      <OrbitingIcon position={[0, -0.5, 0]} color="#7e5bef" radius={1.8} speed={1.8} />
    </>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", percentage: 95, icon: "🌐", color: "#e34c26" },
        { name: "CSS3", percentage: 85, icon: "🎨", color: "#264de4" },
        { name: "JavaScript", percentage: 75, icon: "⚡", color: "#f7df1e" },
        { name: "React", percentage: 70, icon: "⚛️", color: "#61dafb" },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", percentage: 81, icon: "🔧", color: "#f05032" },
        { name: "Bootstrap/Tailwind", percentage: 68, icon: "📱", color: "#7c3aed" },
        { name: "Responsive Design", percentage: 65, icon: "📐", color: "#10b981" },
        { name: "UI/UX Design", percentage: 60, icon: "🎯", color: "#f59e0b" },
      ]
    }
  ]

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <motion.span
                className="text-purple-400 font-semibold tracking-wider uppercase text-sm"
                variants={itemVariants}
              >
                02. Skills & Technologies
              </motion.span>
              
              <motion.h2
                className="text-4xl md:text-5xl font-display font-bold text-white"
                variants={itemVariants}
              >
                Professional <span className="text-gradient">Expertise</span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                Here are the technologies and tools I work with to create amazing digital experiences.
              </motion.p>
            </div>

            {/* Skills Categories */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="space-y-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        delay={categoryIndex * 0.2 + skillIndex * 0.1}
                        isInView={isInView}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Visual Side */}
          <motion.div
            variants={itemVariants}
            className="relative h-[500px] lg:h-[600px]"
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#7e5bef" intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#6d39e3" intensity={0.5} />

              <TechOrbit />

              {/* Central core */}
              <Float speed={1} rotationIntensity={1} floatIntensity={2}>
                <mesh>
                  <icosahedronGeometry args={[0.8, 1]} />
                  <meshStandardMaterial
                    color="#7e5bef"
                    transparent
                    opacity={0.3}
                    wireframe
                  />
                </mesh>
              </Float>
            </Canvas>

            {/* Overlay Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-16 right-12 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute bottom-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Individual Skill Bar Component
const SkillBar = ({ skill, delay, isInView }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0
        const increment = skill.percentage / 50
        const animationTimer = setInterval(() => {
          start += increment
          if (start >= skill.percentage) {
            start = skill.percentage
            clearInterval(animationTimer)
          }
          setAnimatedPercentage(Math.floor(start))
        }, 20)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, skill.percentage, delay])

  return (
    <motion.div
      className="group cursor-hover"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <motion.span
          className="text-purple-400 font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
        >
          {animatedPercentage}%
        </motion.span>
      </div>

      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            boxShadow: `0 0 10px ${skill.color}40`
          }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: "0%" }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full blur-sm"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, transparent)`,
          }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: "0%" }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

export default Skills