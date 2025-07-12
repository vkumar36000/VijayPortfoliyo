import React, { useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { ExternalLink, Github, Play } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "Pokedex Project",
      category: "Interactive App",
      description: "A comprehensive Pokémon database application built with modern web technologies, featuring search functionality and detailed Pokémon information.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      fallbackImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      technologies: ["JavaScript", "API Integration", "CSS3"],
      github: "https://github.com/vkumar36000/Pokedex-Project-",
      live: "#",
      featured: true
    },
    {
      id: 2,
      title: "Weather Dashboard",
      category: "Web Application",
      description: "Real-time weather application with location-based forecasts and beautiful UI design for better user experience.",
      image: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=400&h=250&fit=crop",
      fallbackImage: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=400&h=250&fit=crop",
      technologies: ["JavaScript", "Weather API", "Responsive"],
      github: "#",
      live: "https://vk-weather.netlify.app/",
      featured: false
    },
    {
      id: 3,
      title: "Website UI Clones",
      category: "UI/UX Clone",
      description: "Pixel-perfect recreations of popular website interfaces to demonstrate attention to detail and frontend skills.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      fallbackImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      technologies: ["HTML5", "CSS3", "Responsive"],
      github: "https://github.com/vkumar36000/UI-Clones-of-websites",
      live: "#",
      featured: false
    },
    {
      id: 4,
      title: "Tic Tac Toe Game",
      category: "Game Development",
      description: "Interactive game with smooth animations and intelligent AI opponent. Features score tracking and multiple difficulty levels.",
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=250&fit=crop",
      fallbackImage: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=250&fit=crop",
      technologies: ["JavaScript", "Game Logic", "Animation"],
      github: "https://github.com/vkumar36000/TIC-TAC-TOE",
      live: "#",
      featured: false
    }
  ]

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
    <section id="projects" className="section bg-dark-800/30" ref={ref}>
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
              03. Featured Projects
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              My <span className="text-gradient">Creative Work</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my skills in frontend development, 
              UI/UX design, and problem-solving abilities.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index, isInView, setSelectedProject }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      className={`group relative card-3d cursor-hover ${
        project.featured ? 'md:col-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative glass rounded-2xl overflow-hidden h-full">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <motion.img
            src={imageError ? project.fallbackImage : project.image}
            alt={project.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60" />
          
          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-white text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          >
            {project.category}
          </motion.div>

          {/* Project Links */}
          <motion.div
            className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            {project.github && project.github !== "#" && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </motion.a>
            )}
            
            {project.live && project.live !== "#" && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <motion.h3
            className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p
            className="text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Technologies */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(126, 91, 239, 0.2)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.6 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex space-x-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}
          >
            {project.live && project.live !== "#" && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors cursor-hover group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Play size={14} />
                <span className="text-sm font-medium">Live Demo</span>
              </motion.a>
            )}
            
            {project.github && project.github !== "#" && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={14} />
                <span className="text-sm font-medium">Code</span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          />
          <motion.div
            className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-purple-600 to-blue-600 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-150"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Projects