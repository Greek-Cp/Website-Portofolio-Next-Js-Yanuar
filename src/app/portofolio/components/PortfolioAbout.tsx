'use client';

import React from 'react';
import { User, MapPin, Calendar, Mail, Phone, Globe } from 'lucide-react';
import { usePortfolioData } from '../../../hooks/usePortfolioData';

const PortfolioAbout = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  if (loading || !portfolioData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <User size={20} className="text-blue-400" />
                Personal Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{portfolioData.profile.location}</span>
                </div>
                
                <div className="flex items-center gap-3 text-white/80">
                  <Calendar size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">Software Developer</span>
                </div>
                
                <div className="flex items-center gap-3 text-white/80">
                  <Mail size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{portfolioData.profile.email}</span>
                </div>
                
                <div className="flex items-center gap-3 text-white/80">
                  <Phone size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{portfolioData.profile.phone}</span>
                </div>
                
                <div className="flex items-center gap-3 text-white/80">
                  <Globe size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{portfolioData.profile.socialLinks.portfolio}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Core Skills
              </h3>
              
              <div className="space-y-4">
                {portfolioData.about.skills.map((skillCategory: any, index: number) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">{skillCategory.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill: string, skillIndex: number) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Description & Education */}
          <div className="space-y-6">
            {/* About Description */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Who I Am
              </h3>
              <div className="space-y-3">
                {portfolioData.about.description.map((paragraph: string, index: number) => (
                  <p key={index} className="text-white/80 leading-relaxed text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Education
              </h3>
              
              <div className="border-l-2 border-blue-400/50 pl-4">
                <h4 className="font-semibold text-white text-sm">{portfolioData.about.education.degree}</h4>
                <p className="text-blue-400 text-sm">{portfolioData.about.education.institution}</p>
                <p className="text-white/60 text-xs">{portfolioData.about.education.period}</p>
                <p className="text-white/70 text-xs mt-1">GPA: {portfolioData.about.education.gpa}</p>
                <p className="text-white/70 text-xs mt-1">Coursework: {portfolioData.about.education.coursework}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Technologies
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {portfolioData.technologies.map((tech: any, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-xs border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAbout;