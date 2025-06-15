'use client';

import React from 'react';
import { Code, Smartphone, Database, Brain, MapPin, GraduationCap } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const About = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
    Smartphone,
    Database,
    Code,
    Brain
  };

  if (loading || !portfolioData) {
    return (
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    );
  }

  const skills = portfolioData.about.skills.map(skill => ({
    ...skill,
    icon: iconMap[skill.category.includes('Mobile') ? 'Smartphone' : 
                   skill.category.includes('Backend') ? 'Database' :
                   skill.category.includes('Programming') ? 'Code' : 'Brain'] || Code
  }));

  return (
    <section 
      id="about" 
      className="py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-white">Me</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Passionate about creating innovative digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Info */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Profile</h3>
            
            <div className="space-y-6">
              {portfolioData.about.description.map((paragraph, index) => (
                <p key={index} className="text-white/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-white" />
                  <span className="text-white/80">{portfolioData.profile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-white" />
                  <span className="text-white/80">{portfolioData.profile.education}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h3>
            
            {skills.map((skill, index) => (
              <div key={skill.category} className="glass-hover rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/20">
                    <skill.icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{skill.category}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 border border-white/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16">
          <div className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white">
                  {portfolioData.about.education.degree}
                </h4>
                <p className="text-white font-medium">{portfolioData.about.education.institution}</p>
                <p className="text-white/70">{portfolioData.about.education.period} | Current GPA: {portfolioData.about.education.gpa}</p>
                <p className="text-white/60 mt-2">
                  Relevant Coursework: {portfolioData.about.education.coursework}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 