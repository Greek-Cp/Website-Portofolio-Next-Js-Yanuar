'use client';

import React from 'react';
import { Code, Smartphone, Database, Brain, MapPin, GraduationCap } from 'lucide-react';

const About = () => {
  const skills = [
    {
      category: 'Mobile Development',
      icon: Smartphone,
      items: ['Flutter', 'Android (Kotlin/Java)', 'iOS (Swift)', 'React Native']
    },
    {
      category: 'Backend & Database',
      icon: Database,
      items: ['Firebase', 'Laravel', 'MySQL', 'PostgreSQL']
    },
    {
      category: 'Programming Languages',
      icon: Code,
      items: ['Dart', 'Kotlin', 'Java', 'Swift', 'PHP', 'JavaScript']
    },
    {
      category: 'AI & Modern Tech',
      icon: Brain,
      items: ['Generative AI', 'OpenAI API', 'Text-to-Speech', 'Machine Learning']
    }
  ];

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
              <p className="text-white/80 leading-relaxed">
                As a software developer with 5 years of experience in building both native and 
                hybrid mobile applications, I am passionate about creating innovative and 
                user-focused digital solutions.
              </p>
              
              <p className="text-white/80 leading-relaxed">
                I specialize in Android development, with hands-on experience using Flutter, 
                Java, Kotlin, and backend technologies such as Firebase and Laravel. I'm also 
                exploring the exciting world of Generative AI, applying it in real-world mobile 
                applications to enhance interactivity and automation.
              </p>

              <p className="text-white/80 leading-relaxed">
                My portfolio includes a wide range of projects, from Bookread AI (a Flutter-based 
                AI storytelling app) to fully automated short video generation tools using AI and 
                text-to-speech technologies.
              </p>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-white" />
                  <span className="text-white/80">Nganjuk, Jawa Timur</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-white" />
                  <span className="text-white/80">Politeknik Negeri Jember</span>
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
                  Diploma 4 Teknik Informatika
                </h4>
                <p className="text-white font-medium">Politeknik Negeri Jember</p>
                <p className="text-white/70">2021 - Present | Current GPA: 3.83/4.0</p>
                <p className="text-white/60 mt-2">
                  Relevant Coursework: Logic and Algorithms, Human-Computer Interaction, 
                  Mobile Application Programming with Frameworks
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