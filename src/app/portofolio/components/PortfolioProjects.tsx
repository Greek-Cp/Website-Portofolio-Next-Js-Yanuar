'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Code, Star, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePortfolioData } from '../../../hooks/usePortfolioData';

interface PortfolioProjectsProps {
  projectIndex?: number;
}

const PortfolioProjects: React.FC<PortfolioProjectsProps> = ({ projectIndex }) => {
  const { data: portfolioData, loading } = usePortfolioData();
  const [currentPage, setCurrentPage] = useState(projectIndex ?? 0);
  const [imageError, setImageError] = useState(false);

  // Reset image error when project changes
  React.useEffect(() => {
    setImageError(false);
  }, [currentPage, projectIndex]);

  if (loading || !portfolioData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const totalProjects = portfolioData.projects.length;
  const currentProject = portfolioData.projects[currentPage];
  
  // If projectIndex is provided, show only that project
  const isFixedProject = projectIndex !== undefined;
  const displayProject = isFixedProject ? portfolioData.projects[projectIndex] : currentProject;
  
  // Only show navigation if not in fixed project mode
  const nextProject = () => {
    if (!isFixedProject) {
      setCurrentPage((prev) => (prev + 1) % totalProjects);
    }
  };

  const prevProject = () => {
    if (!isFixedProject) {
      setCurrentPage((prev) => (prev - 1 + totalProjects) % totalProjects);
    }
  };
  
  // Return early if project doesn't exist
  if (!displayProject) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white">Project not found</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full max-w-[123.2rem] mx-auto px-8">
        {/* Single Project Display */}
        <div className="w-full max-w-[123.2rem] mx-auto mb-4">
          <div className="backdrop-blur-sm bg-white/10 rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex flex-col md:flex-row">
              {/* Project Image - Left Side - Fixed Dimensions */}
              <div className="relative w-full md:w-[615px] h-[300px] md:h-[650px] overflow-hidden flex-shrink-0">
                {displayProject.images && displayProject.images.length > 0 && !imageError ? (
                  <>
                    <Image
                      src={displayProject.images[0]}
                      alt={displayProject.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </>
                ) : (
                  /* Fallback Placeholder when no image or image error */
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                        <Code className="w-8 h-8 text-white/60" />
                      </div>
                      <p className="text-white/60 text-sm">No Image Available</p>
                    </div>
                  </div>
                )}
                
                {/* Project Color Badge */}
                {displayProject.color && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-sm rounded-full border border-blue-400/30">
                      Project
                    </span>
                  </div>
                )}
                
                {/* Status Badge */}
                {displayProject.status && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 backdrop-blur-sm text-white text-sm rounded-full border ${
                      displayProject.status === 'Completed' 
                        ? 'bg-green-600/80 border-green-400/30' 
                        : displayProject.status === 'In Progress'
                        ? 'bg-yellow-600/80 border-yellow-400/30'
                        : 'bg-gray-600/80 border-gray-400/30'
                    }`}>
                      {displayProject.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content - Right Side - Fixed Width */}
              <div className="p-4 w-full md:w-[615px] h-[350px] md:h-[650px] flex-shrink-0 flex flex-col">
              {/* Title & Links */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {displayProject.title}
                </h3>
                
                <div className="flex gap-3 ml-4">
                  {displayProject.github && (
                    <a
                      href={displayProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                      title="View Source Code"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {displayProject.demo && (
                    <a
                      href={displayProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-3 flex-shrink-0">
                <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3">
                  {displayProject.longDescription || displayProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-3 flex-shrink-0">
                <h4 className="text-white font-medium text-sm md:text-base mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {displayProject.technologies.slice(0, 8).map((tech: string, techIndex: number) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {displayProject.technologies.length > 8 && (
                    <span className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs border border-white/20">
                      +{displayProject.technologies.length - 8} more
                    </span>
                  )}
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3 flex-shrink-0">
                <div className="flex items-center gap-1 text-white/60">
                  <Code size={12} />
                  <span className="text-xs">{displayProject.technologies.length} Tech</span>
                </div>
                
                <div className="flex items-center gap-1 text-white/60">
                  <Star size={12} />
                  <span className="text-xs">{displayProject.status}</span>
                </div>
                
                {displayProject.images && displayProject.images.length > 1 && (
                  <div className="flex items-center gap-1 text-white/60">
                    <Calendar size={12} />
                    <span className="text-xs">{displayProject.images.length} Images</span>
                  </div>
                )}
              </div>

              {/* Key Features */}
              {displayProject.features && displayProject.features.length > 0 && (
                <div className="pt-2 border-t border-white/10 flex-1 min-h-0">
                  <h4 className="text-white font-medium text-sm md:text-base mb-2">Key Features:</h4>
                  <div className="overflow-hidden">
                    <ul className="space-y-1">
                      {displayProject.features.slice(0, 6).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="text-white/70 text-xs md:text-sm flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                      {displayProject.features.length > 6 && (
                        <li className="text-white/50 text-xs italic">+{displayProject.features.length - 6} more features...</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Only show if not in fixed project mode */}
        {!isFixedProject && (
          <>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={prevProject}
                className="flex items-center gap-1 px-2 py-1 backdrop-blur-sm bg-white/10 rounded border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft size={16} />
                <span className="text-sm">Previous</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">
                  Project {currentPage + 1} of {totalProjects}
                </span>
                
                {/* Page Indicators */}
                <div className="flex gap-1">
                  {portfolioData.projects.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPage 
                          ? 'bg-blue-400 scale-125' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={nextProject}
                className="flex items-center gap-1 px-2 py-1 backdrop-blur-sm bg-white/10 rounded border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-sm">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="text-center backdrop-blur-sm bg-white/10 rounded p-2 border border-white/20">
                <div className="text-lg font-bold text-blue-400 mb-0.5">{portfolioData.projects.length}</div>
                <div className="text-white/70 text-sm">Total Projects</div>
              </div>
              
              <div className="text-center backdrop-blur-sm bg-white/10 rounded p-2 border border-white/20">
                <div className="text-lg font-bold text-blue-400 mb-0.5">
                  {portfolioData.projects.filter((p: any) => p.status === 'Completed').length}
                </div>
                <div className="text-white/70 text-sm">Completed</div>
              </div>
              
              <div className="text-center backdrop-blur-sm bg-white/10 rounded p-2 border border-white/20">
                <div className="text-lg font-bold text-blue-400 mb-0.5">
                  {new Set(portfolioData.projects.flatMap((p: any) => p.technologies)).size}
                </div>
                <div className="text-white/70 text-sm">Technologies</div>
              </div>
              
              <div className="text-center backdrop-blur-sm bg-white/10 rounded p-2 border border-white/20">
                <div className="text-lg font-bold text-blue-400 mb-0.5">
                  {portfolioData.projects.filter((p: any) => p.github).length}
                </div>
                <div className="text-white/70 text-sm">Open Source</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioProjects;