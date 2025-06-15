'use client';

import React from 'react';
import { Calendar, MapPin, Building, CheckCircle } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Studyo.io',
      position: 'Android Developer Full Time',
      location: 'Remote, Surabaya, Indonesia',
      period: 'Jan 2023 – Mar 2023',
      type: 'Full-time Remote',
      responsibilities: [
        'Developing cross-platform mobile applications for Android and iOS using Flutter',
        'Building the Bookread AI application, a story creation platform powered by Generative AI',
        'Integrating Firebase Firestore, Authentication, and Cloud Storage to enhance app performance and scalability',
        'Handling the deployment process to both Google Play Store and Apple App Store',
        'Creating and maintaining internal libraries to improve code reuse and streamline development across projects',
        'Developed an Easy Custom Animation library to help the team implement consistent, reusable animations efficiently',
        'Supporting team collaboration by managing tasks, conducting code reviews, and ensuring clean, maintainable codebases',
        'Assisting in the development of an educational math game application for elementary school students, focusing on engaging, gamified learning experiences'
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      className="py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work <span className="text-white">Experience</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Building innovative mobile solutions with cutting-edge technologies
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass rounded-3xl p-8 relative">
              {/* Company Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{exp.position}</h3>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Building size={18} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col lg:items-end space-y-2 mt-4 lg:mt-0">
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar size={18} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin size={18} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Job Type Badge */}
              <div className="mb-6">
                <span className="px-4 py-2 bg-white/20 border border-white/30 rounded-full text-white text-sm font-medium">
                  {exp.type}
                </span>
              </div>

              {/* Responsibilities */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Key Responsibilities & Achievements:</h4>
                <div className="grid gap-3">
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <div key={respIndex} className="flex items-start gap-3 group">
                      <div className="p-1 rounded-full bg-green-500/20 mt-1 flex-shrink-0">
                        <CheckCircle size={14} className="text-green-400" />
                      </div>
                      <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors">
                        {responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h5 className="text-sm font-semibold text-white/70 mb-3">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2">
                  {['Flutter', 'Dart', 'Firebase', 'Android', 'iOS', 'AI Integration', 'Cloud Storage', 'Animation'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 hover:bg-white/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Looking for New Opportunities</h3>
            <p className="text-white/70 leading-relaxed">
              I'm continuously learning and keeping up with the latest trends in Android development, 
              ensuring the solutions I build are both modern and impactful. Always open to exciting 
              new challenges and collaborations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 