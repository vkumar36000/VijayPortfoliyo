import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUp, Heart, Coffee } from 'lucide-react'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const navigationLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  const socialLinks = [
    { 
      href: "https://www.linkedin.com/in/vijay-kumar-239199306", 
      label: "LinkedIn",
      icon: "💼"
    },
    { 
      href: "https://github.com/vkumar36000", 
      label: "GitHub",
      icon: "💻"
    },
    { 
      href: "/assets/resume.pdf", 
      label: "Resume",
      icon: "📄"
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleNavClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <footer className="relative bg-dark-900 border-t border-gray-800" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-800/20" />
      </div>

      <div className="container relative py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <span className="text-2xl font-display font-bold text-gradient">
                  VIJAY
                </span>
              </div>
              
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Frontend Developer passionate about creating beautiful and functional web experiences 
                with modern technologies and creative solutions.
              </p>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart size={14} className="text-red-500" />
                </motion.div>
                <span>and lots of</span>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Coffee size={14} className="text-amber-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {navigationLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-left cursor-hover"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Connect Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors cursor-hover group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">Get in touch</p>
                <a 
                  href="mailto:vijay@example.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  vijay@example.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-center md:text-left">
                © 2024 Vijay Kumar. All rights reserved.
              </p>

              <div className="flex items-center space-x-6">
                <span className="text-sm text-gray-500">
                  Built with React, Tailwind CSS & Framer Motion
                </span>
                
                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600/30 hover:text-purple-300 transition-all cursor-hover group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-16 w-24 h-24 bg-blue-500/5 rounded-full blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </footer>
  )
}

export default Footer