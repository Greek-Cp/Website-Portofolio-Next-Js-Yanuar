'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolioData } from '../../../hooks/usePortfolioData';

const PortfolioExperience = () => {
  const { data: portfolioData, loading } = usePortfolioData();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const itemsPerPage = portfolioData ? portfolioData.experience.length : 0; // Show all items
   const totalPages = portfolioData ? Math.ceil(portfolioData.experience.length / itemsPerPage) : 0;
  
  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const getCurrentItems = () => {
    if (!portfolioData) return [];
    const start = currentIndex * itemsPerPage;
    return portfolioData.experience.slice(start, start + itemsPerPage);
  };

  if (loading || !portfolioData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Work Experience Timeline
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>



        {/* Experience Timeline */}
        <div className="flex-1 relative overflow-x-auto">
          {/* Horizontal Timeline Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 z-0"></div>
          
          <div className="flex gap-1 pb-4 min-w-max relative z-10">
            {portfolioData.experience.map((exp: any, index: number) => (
              <div key={index} className="relative flex flex-col items-center min-w-[120px] max-w-[140px]">
                {/* Connection Dot */}
                <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg z-20 mb-2"></div>
                
                {/* Content Card */}
                <div className="backdrop-blur-sm bg-white/10 rounded-md p-1.5 border border-white/20 hover:bg-white/15 transition-all duration-300 w-full flex flex-col text-center">
                  {/* Company & Position */}
                  <div className="mb-1">
                     <h3 className="text-xs font-bold text-white mb-0.5 leading-tight">{exp.position.length > 20 ? exp.position.substring(0, 20) + '...' : exp.position}</h3>
                     <div className="flex items-center justify-center gap-0.5 text-blue-400 mb-0.5">
                       <Briefcase size={8} />
                       <span className="font-medium text-xs">{exp.company.length > 12 ? exp.company.substring(0, 12) + '...' : exp.company}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-0.5 mb-1 text-xs text-white/70">
                     <div className="flex items-center justify-center gap-0.5">
                       <Calendar size={6} />
                       <span className="text-xs">{exp.period}</span>
                     </div>
                     {exp.type && (
                       <span className="px-1 py-0.5 bg-blue-400/20 text-blue-300 rounded text-xs">
                         {exp.type}
                       </span>
                     )}
                  </div>

                  {/* Key Info */}
                  <div className="text-xs text-white/80 mb-1">
                     {exp.description && exp.description.length > 30 ? exp.description.substring(0, 30) + '...' : (exp.description || '')}
                  </div>

                  {/* Technologies (Top 2) */}
                  {exp.technologies && exp.technologies.length > 0 && (
                     <div className="mb-1">
                       <div className="flex flex-wrap gap-0.5 justify-center">
                         {exp.technologies.slice(0, 2).map((tech: string, techIndex: number) => (
                           <span 
                             key={techIndex}
                             className="px-1 py-0.5 bg-white/10 text-white/80 rounded text-xs border border-white/20"
                           >
                             {tech.length > 8 ? tech.substring(0, 8) : tech}
                           </span>
                         ))}
                         {exp.technologies.length > 2 && (
                           <span className="px-1 py-0.5 bg-white/10 text-white/60 rounded text-xs border border-white/20">
                             +{exp.technologies.length - 2}
                           </span>
                         )}
                       </div>
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-3 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{portfolioData.experience.length}</div>
            <div className="text-white/70 text-xs">Positions</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">
              {new Set(portfolioData.experience.map((exp: any) => exp.company)).size}
            </div>
            <div className="text-white/70 text-xs">Companies</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">
              {new Set(portfolioData.experience.flatMap((exp: any) => exp.technologies || [])).size}
            </div>
            <div className="text-white/70 text-xs">Technologies</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">
              {portfolioData.experience.reduce((total: number, exp: any) => {
                const years = exp.period?.match(/\d+/);
                return total + (years ? parseInt(years[0]) : 1);
              }, 0)}+
            </div>
            <div className="text-white/70 text-xs">Years</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioExperience;