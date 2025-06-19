'use client';

import React, { useState, useEffect } from 'react';
import PortfolioHero from './components/PortfolioHero';
import PortfolioAbout from './components/PortfolioAbout';
import PortfolioExperience from './components/PortfolioExperience';
import PortfolioProjects from './components/PortfolioProjects';
import PortfolioContact from './components/PortfolioContact';

const PortfolioPage = () => {
  return (
    <div className="portfolio-print-layout">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom right, rgba(17, 24, 39, 1), rgba(0, 0, 0, 1)) !important;
          }
          
          .portfolio-print-layout {
            display: flex;
            flex-direction: row;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
          
          .portfolio-slide {
            min-width: 100vw;
            height: 100vh;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            box-sizing: border-box;
            page-break-after: always;
            background: linear-gradient(to bottom right, rgba(17, 24, 39, 1), rgba(0, 0, 0, 1)) !important;
          }
          
          .portfolio-slide:last-child {
            page-break-after: auto;
          }
          
          /* Hide navigation elements */
          header, .header, nav, .nav {
            display: none !important;
          }
          
          /* Adjust content for print */
          .portfolio-slide > * {
            max-width: 100%;
            max-height: 100%;
            overflow: visible;
          }
          
          /* Ensure text is visible */
          .text-white {
            color: white !important;
          }
          
          .text-white\/70 {
            color: rgba(255, 255, 255, 0.7) !important;
          }
          
          .text-white\/80 {
            color: rgba(255, 255, 255, 0.8) !important;
          }
          
          /* Ensure backgrounds are visible */
          .glass, .glass-hover {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
          }
        }
        
        @media screen {
          .portfolio-print-layout {
            display: flex;
            flex-direction: row;
            width: 800vw; /* 8 slides: Hero, About, Experience, 4 Projects, Contact */
            height: 100vh;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            background: linear-gradient(to bottom right, rgba(17, 24, 39, 1), rgba(0, 0, 0, 1));
          }
          
          .portfolio-slide {
            min-width: 100vw;
            height: 100vh;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 1rem;
            box-sizing: border-box;
            scroll-snap-align: start;
            position: relative;
            overflow-y: auto;
          }
          
          .portfolio-slide > * {
            width: 100%;
            max-width: 100%;
            flex-shrink: 0;
          }
        }
      `}</style>
      
      {/* Global Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />

      {/* Global Static Background Overlay */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 40% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
            radial-gradient(circle at 60% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 70%),
            radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 70%)
          `
        }}
      />

      {/* Global Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-80 h-80 bg-blue-500/15 rounded-full filter blur-[80px] animate-blob" />
        <div className="absolute top-2/3 -right-1/4 w-80 h-80 bg-purple-500/15 rounded-full filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/15 rounded-full filter blur-[80px] animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 -left-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px] animate-blob animation-delay-1000" />
        <div className="absolute bottom-1/4 -right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[120px] animate-blob animation-delay-3000" />
      </div>
      
      {/* Slide 1: Hero */}
      <div className="portfolio-slide">
        <PortfolioHero />
      </div>
      
      {/* Slide 2: About */}
      <div className="portfolio-slide">
        <PortfolioAbout />
      </div>
      
      {/* Slide 3: Experience */}
      <div className="portfolio-slide">
        <PortfolioExperience />
      </div>
      
      {/* Slide 4: Project 1 */}
      <div className="portfolio-slide">
        <PortfolioProjects projectIndex={0} />
      </div>
      
      {/* Slide 5: Project 2 */}
      <div className="portfolio-slide">
        <PortfolioProjects projectIndex={1} />
      </div>
      
      {/* Slide 6: Project 3 */}
      <div className="portfolio-slide">
        <PortfolioProjects projectIndex={2} />
      </div>
      
      {/* Slide 7: Project 4 */}
      <div className="portfolio-slide">
        <PortfolioProjects projectIndex={3} />
      </div>
      
      {/* Slide 8: Contact */}
      <div className="portfolio-slide">
        <PortfolioContact />
      </div>
      
     
      
      {/* Navigation Dots */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
        {[
          { id: 1, title: 'Hero' },
          { id: 2, title: 'About' },
          { id: 3, title: 'Experience' },
          { id: 4, title: 'Project 1' },
          { id: 5, title: 'Project 2' },
          { id: 6, title: 'Project 3' },
          { id: 7, title: 'Project 4' },
          { id: 8, title: 'Contact' }
        ].map((slide) => (
          <button
            key={slide.id}
            onClick={() => {
              const slideElement = document.querySelector(`.portfolio-slide:nth-child(${slide.id + 3})`) as HTMLElement;
              slideElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }}
            className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-colors"
            title={slide.title}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;