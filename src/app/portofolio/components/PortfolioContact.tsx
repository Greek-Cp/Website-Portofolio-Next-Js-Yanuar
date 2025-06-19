'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, MessageCircle, Download } from 'lucide-react';
import { usePortfolioData } from '../../../hooks/usePortfolioData';

const PortfolioContact = () => {
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
            Let's Connect
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-white/70 mt-4 text-sm max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MessageCircle size={20} className="text-blue-400" />
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${portfolioData.profile.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Mail size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <p className="text-white/70 text-xs">{portfolioData.profile.email}</p>
                  </div>
                </a>
                
                <a 
                  href={`tel:${portfolioData.profile.phone}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <Phone size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Phone</p>
                    <p className="text-white/70 text-xs">{portfolioData.profile.phone}</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <MapPin size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Location</p>
                    <p className="text-white/70 text-xs">{portfolioData.profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {portfolioData.profile.socialLinks.linkedin && (
                  <a
                    href={portfolioData.profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-500/20 transition-all duration-300 group border border-white/10 hover:border-blue-400/30"
                  >
                    <Linkedin size={18} className="text-blue-400" />
                    <span className="text-white text-sm font-medium">LinkedIn</span>
                  </a>
                )}
                
                {portfolioData.profile.socialLinks.github && (
                  <a
                    href={portfolioData.profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-500/20 transition-all duration-300 group border border-white/10 hover:border-gray-400/30"
                  >
                    <Github size={18} className="text-gray-400" />
                    <span className="text-white text-sm font-medium">GitHub</span>
                  </a>
                )}
                
                {portfolioData.profile.socialLinks.portfolio && (
                  <a
                    href={portfolioData.profile.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/20 transition-all duration-300 group border border-white/10 hover:border-green-400/30"
                  >
                    <Globe size={18} className="text-green-400" />
                    <span className="text-white text-sm font-medium">Portfolio</span>
                  </a>
                )}
              </div>
            </div>

            {/* Download CV */}
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Download Resume
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Get a detailed overview of my experience and skills.
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6">
              Send a Message
            </h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                  placeholder="Project discussion"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Send Message
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
              <p className="text-blue-300 text-sm text-center">
                💡 <strong>Quick Response:</strong> I typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContact;