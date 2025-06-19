'use client';

import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, ExternalLink, Smartphone, Code2, Database, GitBranch } from 'lucide-react';
import Image from 'next/image';
import { usePortfolioData } from '../../../hooks/usePortfolioData';

const PortfolioHero = () => {
  const { data: portfolioData, loading } = usePortfolioData();
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setParticles(generatedParticles);
  }, []);

  const iconMap: { [key: string]: React.ComponentType<{ size: number }> } = {
    Smartphone,
    Code2,
    Database,
    GitBranch
  };

  if (loading || !portfolioData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Floating particles effect - Only render on client */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 px-8">
        {/* Main Content - Profile Image + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-8">
          {/* Profile Image */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                <Image
                  src="/Me.png"
                  alt="Yanuar Tri Laksono"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight">
              <span className="block text-white/90 text-lg md:text-xl lg:text-2xl mb-1">Hi, I'm</span>
              <span className="text-white">{portfolioData.profile.name}</span>
            </h1>
            
            <p className="text-sm md:text-base lg:text-lg text-white/80 mb-6 max-w-2xl leading-relaxed">
              {portfolioData.profile.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
              <a
                href="#projects"
                className="backdrop-blur-sm bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 group border border-white/20 hover:border-white/30"
              >
                View My Work
                <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="backdrop-blur-sm bg-blue-600/20 hover:bg-blue-600/30 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 group border border-blue-400/30 hover:border-blue-400/50"
              >
                <Download size={14} className="group-hover:translate-y-1 transition-transform" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-white/90 text-center mb-3">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {portfolioData.technologies.map((tech: any) => {
              const IconComponent = iconMap[tech.icon] || Smartphone;
              return (
                <span
                  key={tech.name}
                  className="backdrop-blur-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs text-white/90 border border-white/20 transition-all duration-300 hover:border-white/30 flex items-center gap-1.5"
                >
                  <IconComponent size={12} />
                  {tech.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center">
          <div className="animate-bounce">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-300 border border-white/20 hover:border-white/30">
              <ArrowDown size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;