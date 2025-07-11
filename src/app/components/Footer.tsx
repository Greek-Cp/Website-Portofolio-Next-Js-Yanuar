'use client';

import React from 'react';
import { Heart, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const Footer = () => {
  const { data: portfolioData } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = portfolioData ? [
    { icon: Github, href: portfolioData.profile.socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: portfolioData.profile.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${portfolioData.profile.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${portfolioData.profile.phone}`, label: 'Phone' }
  ] : [];

  return (
    <footer 
      className="py-12 px-4 border-t border-white/10 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white">
              <span className="text-white">{portfolioData?.profile.name.charAt(0) || 'Y'}</span>{portfolioData?.profile.name.slice(1).split(' ')[0] || 'anuar'}
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              {portfolioData?.profile.description || 'Android Developer & Software Engineer passionate about creating innovative mobile solutions with 5+ years of experience.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${portfolioData?.profile.email || 'yanuartrilaksono23@gmail.com'}`}
                className="text-white/70 hover:text-white transition-colors text-sm block"
              >
                {portfolioData?.profile.email || 'yanuartrilaksono23@gmail.com'}
              </a>
              <a
                href={`tel:${portfolioData?.profile.phone || '+6285733571682'}`}
                className="text-white/70 hover:text-white transition-colors text-sm block"
              >
                {portfolioData?.profile.phone || '+62 857-3357-1682'}
              </a>
              <p className="text-white/70 text-sm">
                {portfolioData?.profile.location || 'Nganjuk, Jawa Timur'}, Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors hover:scale-110 transform"
                title={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span>© {currentYear} {portfolioData?.profile.name || 'Yanuar Tri Laksono'}. Made with</span>
            <Heart size={16} className="text-red-400" />
            <span>using Next.js</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-xs leading-relaxed">
            This website showcases my journey as a mobile developer. All projects and experiences 
            are real and reflect my commitment to creating high-quality, user-focused applications.
            <br />
            Available for freelance projects and full-time opportunities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 