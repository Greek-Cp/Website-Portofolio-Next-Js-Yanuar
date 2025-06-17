'use client';

import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Smartphone, Brain, Video, PlayCircle } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  images: string[];
  features: string[];
  technologies: string[];
  status: string;
  github: string;
  demo: string;
}

const Projects = () => {
  const { data: portfolioData, loading } = usePortfolioData();
  
  // Move all hooks to the top, before any conditional returns
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
    Video,
    Brain,
    PlayCircle,
    Smartphone
  };

  // Keyboard navigation useEffect
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedProject, currentImageIndex]);

  // Add effect to prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      // Disable scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      // Cleanup: ensure scrolling is re-enabled when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // Now we can do conditional rendering after all hooks are declared
  if (loading || !portfolioData) {
    return (
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white">Loading projects...</div>
        </div>
      </section>
    );
  }

  const projects: Project[] = portfolioData.projects.map(project => ({
    ...project,
    icon: iconMap[project.icon] || Smartphone
  }));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image when opening modal
    // Dispatch event to hide header
    window.dispatchEvent(new Event('modalOpen'));
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    // Dispatch event to show header
    window.dispatchEvent(new Event('modalClose'));
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-white">Projects</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Showcasing innovative mobile applications and development tools
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass-hover rounded-3xl p-8 group cursor-pointer" onClick={() => handleProjectClick(project)}>
                             {/* Project Image */}
               <div className="mb-6 relative overflow-hidden rounded-xl">
                 <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
                 {project.images.length > 1 && (
                   <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                     +{project.images.length - 1} more
                   </div>
                 )}
               </div>
              {/* Project Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} bg-opacity-20`}>
                  <project.icon size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-white/20 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-white/80 leading-relaxed mb-6">
                {project.description}
              </p>

              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {project.longDescription}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white/70 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-white/60 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white/70 mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <a
                  href={project.github}
                  className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white/80 hover:text-white transition-colors group"
                >
                  <Github size={16} />
                  <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.demo}
                  className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white/80 hover:text-white transition-colors group"
                >
                  <ExternalLink size={16} />
                  <span className="text-sm">Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

                 {/* Project Showcase Modal */}
         {selectedProject && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] animate-fadeIn pt-16" onClick={handleCloseModal}>
             <div className="bg-gray-900 rounded-3xl p-8 max-w-4xl w-full mx-4 animate-slideUp max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[9999] bg-gray-800 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              </div>
                             {/* Image Slider */}
               <div className="mb-6">
                 <div className="relative overflow-hidden rounded-xl bg-gray-800">
                   {/* Main Image Container */}
                   <div 
                     className="relative h-80 w-full"
                     onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}
                     onTouchEnd={handleTouchEnd}
                   >
                     <div 
                       className="flex transition-transform duration-500 ease-in-out h-full"
                       style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                     >
                       {selectedProject.images.map((image, index) => (
                         <div key={index} className="w-full h-full flex-shrink-0">
                           <img 
                             src={image} 
                             alt={`${selectedProject.title} - Image ${index + 1}`} 
                             className="w-full h-full object-cover"
                           />
                         </div>
                       ))}
                     </div>
                     
                     {/* Navigation Arrows */}
                     {selectedProject.images.length > 1 && (
                       <>
                         <button 
                           onClick={prevImage}
                           className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                           </svg>
                         </button>
                         <button 
                           onClick={nextImage}
                           className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                           </svg>
                         </button>
                       </>
                     )}
                   </div>
                   
                   {/* Dots Indicator */}
                   {selectedProject.images.length > 1 && (
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                       {selectedProject.images.map((_, index) => (
                         <button
                           key={index}
                           onClick={() => goToImage(index)}
                           className={`w-2 h-2 rounded-full transition-all duration-200 ${
                             index === currentImageIndex 
                               ? 'bg-white scale-125' 
                               : 'bg-white/50 hover:bg-white/75'
                           }`}
                         />
                       ))}
                     </div>
                   )}
                 </div>
                 
                 {/* Image Counter */}
                 {selectedProject.images.length > 1 && (
                   <div className="text-center mt-2 text-white/60 text-sm">
                     {currentImageIndex + 1} / {selectedProject.images.length}
                   </div>
                 )}
               </div>
              <p className="text-white/80 leading-relaxed mb-6">{selectedProject.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white/80 hover:text-white transition-colors group"
                >
                  <Github size={16} />
                  <span className="text-sm">View Code</span>
                </a>
                <a
                  href={selectedProject.demo}
                  className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white/80 hover:text-white transition-colors group"
                >
                  <ExternalLink size={16} />
                  <span className="text-sm">View Demo</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Interested in My Work?</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              I'm always working on new projects and exploring cutting-edge technologies. 
              Let's discuss how we can collaborate on your next mobile application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="glass-hover px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com/yanuartrilaksono"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-hover px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Github size={18} />
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;