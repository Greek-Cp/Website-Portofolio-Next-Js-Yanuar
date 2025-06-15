'use client';

import React from 'react';
import { Github, ExternalLink, Smartphone, Brain, Video, PlayCircle } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'VIDCAP - Mobile App',
      description: 'A Flutter-based video editing application focused on subtitle overlay and animation, inspired by CapCut\'s functionality.',
      longDescription: 'Developed a comprehensive video editing application using Flutter, allowing users to add subtitle overlays and animated subtitles on videos, similar to CapCut.',
      icon: Video,
      color: 'from-purple-400 to-pink-400',
      features: [
        'Built a native iOS library using AVFoundation to export videos with animated subtitles',
        'Created a native Android library using Media3 to render subtitle overlays directly on videos',
        'Integrated OpenAI\'s transcription API to automatically convert video audio into subtitles',
        'Cross-platform compatibility for Android and iOS'
      ],
      technologies: ['Flutter', 'Dart', 'AVFoundation', 'Media3', 'OpenAI API', 'Video Processing'],
      status: 'In Development',
      github: '#',
      demo: '#'
    },
    {
      title: 'Bookread AI',
      description: 'A Flutter-based AI storytelling app that creates personalized stories using Generative AI technology.',
      longDescription: 'Story creation platform powered by Generative AI, developed during my time at Studyo.io, focusing on interactive storytelling experiences.',
      icon: Brain,
      color: 'from-blue-400 to-cyan-400',
      features: [
        'AI-powered story generation using advanced language models',
        'Personalized storytelling based on user preferences',
        'Interactive reading experience with dynamic content',
        'Firebase integration for user data and story storage'
      ],
      technologies: ['Flutter', 'Generative AI', 'Firebase', 'Cloud Functions', 'Natural Language Processing'],
      status: 'Completed',
      github: '#',
      demo: '#'
    },
    {
      title: 'Educational Math Game',
      description: 'An engaging gamified learning application for elementary school students focusing on mathematics education.',
      longDescription: 'Developed as part of team collaboration at Studyo.io, this application provides interactive math learning experiences for young students.',
      icon: PlayCircle,
      color: 'from-green-400 to-emerald-400',
      features: [
        'Gamified learning experiences for elementary students',
        'Interactive math problems and challenges',
        'Progress tracking and achievement system',
        'Child-friendly user interface design'
      ],
      technologies: ['Flutter', 'Dart', 'Firebase', 'Game Development', 'UI/UX Design'],
      status: 'Completed',
      github: '#',
      demo: '#'
    },
    {
      title: 'Easy Custom Animation Library',
      description: 'Internal library developed to help development teams implement consistent, reusable animations efficiently.',
      longDescription: 'Created to streamline animation development across multiple projects, providing a standardized set of animation components.',
      icon: Smartphone,
      color: 'from-orange-400 to-red-400',
      features: [
        'Reusable animation components for Flutter',
        'Consistent animation patterns across projects',
        'Easy integration and customization',
        'Performance optimized animations'
      ],
      technologies: ['Flutter', 'Dart', 'Animation API', 'Package Development'],
      status: 'Open Source',
      github: '#',
      demo: '#'
    }
  ];

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
            <div key={index} className="glass-hover rounded-3xl p-8 group">
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