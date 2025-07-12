import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Code, Award, Coffee, Users } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  const stats = [
    { number: 6, suffix: '+', label: 'Months Experience', icon: Code },
    { number: 10, suffix: '+', label: 'Projects Completed', icon: Award },
    { number: 8, suffix: '+', label: 'Technologies', icon: Coffee },
    { number: 1, suffix: '+', label: 'Happy Clients', icon: Users },
  ]

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
      
      // Animate numbers
      stats.forEach((stat, index) => {
        let start = 0
        const increment = stat.number / 50
        const timer = setInterval(() => {
          start += increment
          if (start >= stat.number) {
            start = stat.number
            clearInterval(timer)
          }
          setAnimatedStats(prev => {
            const newStats = [...prev]
            newStats[index] = Math.floor(start)
            return newStats
          })
        }, 30)
      })
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
    <section id="about" className="section bg-dark-800/50" ref={ref}>
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
                01. About Me
              </motion.span>
              
              <motion.h2
                className="text-4xl md:text-5xl font-display font-bold text-white"
                variants={itemVariants}
              >
                Frontend Developer & <span className="text-gradient">React Specialist</span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div className="space-y-6 text-gray-300 leading-relaxed" variants={itemVariants}>
              <p>
                I'm an enthusiastic Frontend Developer with <strong className="text-purple-400">6 months of internship experience</strong> at{' '}
                <strong className="text-purple-400">DMATICS Technologies</strong>. I specialize in creating responsive, 
                user-friendly web interfaces using modern frontend technologies.
              </p>
              
              <p>
                My expertise includes <strong className="text-purple-400">HTML5, CSS3, JavaScript, React.js, and Tailwind CSS</strong>. 
                I'm passionate about delivering quality work and continuously improving my skills 
                to stay current with the latest web development trends.
              </p>

              <p>
                I believe in the power of clean code, pixel-perfect designs, and seamless user experiences. 
                Every project is an opportunity to learn something new and push the boundaries of what's possible on the web.
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white">Technologies I work with:</h3>
              <div className="flex flex-wrap gap-3">
                {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Git/GitHub', 'Responsive Design', 'UI/UX'].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm cursor-hover"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(126, 91, 239, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6 pt-8"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 glass rounded-2xl cursor-hover group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center group-hover:from-purple-500 group-hover:to-purple-300 transition-all">
                      <stat.icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {animatedStats[index]}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative group">
              {/* Main Image Container */}
              <motion.div
                className="relative perspective-1000"
                whileHover={{ rotateY: 5, rotateX: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full max-w-md mx-auto">
                  {/* Image */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="https://ui-avatars.com/api/?name=Vijay+Kumar&size=400&background=7e5bef&color=ffffff&format=svg"
                      alt="Vijay Kumar"
                      className="w-full h-auto object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Code Icon Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 bg-purple-600/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Code size={24} className="text-white" />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Floating decoration elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-2xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About