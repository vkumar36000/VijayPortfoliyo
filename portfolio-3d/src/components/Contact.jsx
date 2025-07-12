import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const ref = useRef(null)
  const formRef = useRef()
  const isInView = useInView(ref, { once: true })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "vijay@example.com",
      href: "mailto:vijay@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 xxxxx xxxxx",
      href: "tel:+91xxxxxxxxx"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Replace these with your actual EmailJS service details
      const serviceId = 'your_service_id'
      const templateId = 'your_template_id'
      const publicKey = 'your_public_key'

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

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
    <section id="contact" className="section bg-dark-800/50" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">
              04. Let's Work Together
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              I'm always open to discussing new opportunities, creative projects, 
              or just having a chat about web development. Let's create something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center space-x-4 group cursor-hover"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-white hover:text-purple-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { href: "https://www.linkedin.com/in/vijay-kumar-239199306", label: "LinkedIn", icon: "💼" },
                    { href: "https://github.com/vkumar36000", label: "GitHub", icon: "💻" },
                    { href: "/assets/resume.pdf", label: "Resume", icon: "📄" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors cursor-hover group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="relative">
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    isInView={isInView}
                    delay={0.2}
                  />
                  
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    isInView={isInView}
                    delay={0.3}
                  />
                </div>

                <FormField
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  isInView={isInView}
                  delay={0.4}
                />

                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  isInView={isInView}
                  delay={0.5}
                />

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary cursor-hover group disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center space-x-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center space-x-2 p-4 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>
                      {submitStatus === 'success' 
                        ? 'Message sent successfully! I\'ll get back to you soon.' 
                        : 'Failed to send message. Please try again or contact me directly.'}
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Form Field Component
const FormField = ({ label, name, type, value, onChange, required, rows, isInView, delay }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value.length > 0)
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          rows={rows}
          className="w-full px-4 pt-6 pb-2 bg-dark-800/50 border border-gray-600 rounded-lg text-white placeholder-transparent focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none"
          placeholder={label}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className="w-full px-4 pt-6 pb-2 bg-dark-800/50 border border-gray-600 rounded-lg text-white placeholder-transparent focus:border-purple-500 focus:outline-none transition-all duration-300"
          placeholder={label}
        />
      )}
      
      <motion.label
        className={`absolute left-4 text-gray-400 transition-all duration-300 pointer-events-none ${
          isFocused || hasValue || value 
            ? 'top-2 text-xs text-purple-400' 
            : 'top-4 text-base'
        }`}
        animate={{
          y: isFocused || hasValue || value ? -8 : 0,
          scale: isFocused || hasValue || value ? 0.85 : 1,
          color: isFocused ? '#7e5bef' : '#9ca3af'
        }}
      >
        {label}
      </motion.label>
      
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-purple-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%' }}
      />
    </motion.div>
  )
}

export default Contact