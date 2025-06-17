'use client';

import React from 'react';
import { Calendar, MapPin, Building, CheckCircle, Briefcase } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { motion } from 'framer-motion';

const Experience = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  if (loading || !portfolioData) {
    return (
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white">Loading experience...</div>
        </div>
      </section>
    );
  }

  const experiences = portfolioData.experience;

  return (
    <section 
      id="experience" 
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <Briefcase size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Career Path</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work <span className="text-white">Experience</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Building innovative mobile solutions with cutting-edge technologies
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-10 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 transform -translate-x-1/2 z-10 hidden md:block"></div>
                
                {/* Experience Card */}
                <div className={`md:w-[calc(50%-30px)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} relative`}>
                  <div className="glass rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
                    {/* Company Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.position}</h3>
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <Building size={18} className="text-blue-400" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end space-y-2 mt-4 lg:mt-0">
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar size={18} className="text-purple-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin size={18} className="text-pink-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Type Badge */}
                    <div className="mb-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/30 rounded-full text-white text-sm font-medium">
                        {exp.type}
                      </span>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Responsibilities & Achievements:</h4>
                      <div className="grid gap-3">
                        {exp.responsibilities.map((responsibility, respIndex) => (
                          <motion.div 
                            key={respIndex} 
                            className="flex items-start gap-3 group"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: respIndex * 0.05 }}
                          >
                            <div className="p-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                              <CheckCircle size={14} className="text-green-400" />
                            </div>
                            <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors">
                              {responsibility}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h5 className="text-sm font-semibold text-white/70 mb-3">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all cursor-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: techIndex * 0.03 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border border-white/10 hover:border-blue-500/30 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
              <Briefcase size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Looking for New Opportunities</h3>
            <p className="text-white/70 leading-relaxed">
              I'm continuously learning and keeping up with the latest trends in Android development, 
              ensuring the solutions I build are both modern and impactful. Always open to exciting 
              new challenges and collaborations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;