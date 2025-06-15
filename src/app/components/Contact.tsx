'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'yanuartrilaksono23@gmail.com',
      href: 'mailto:yanuartrilaksono23@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 857-3357-1682',
      href: 'tel:+6285733571682'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nganjuk, Jawa Timur',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/yanuartrilaksono',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/yanuar-tri-laksono',
      color: 'hover:text-white'
    },
    {
      icon: ExternalLink,
      label: 'Portfolio',
      href: 'https://yanuar.dev',
      color: 'hover:text-purple-400'
    }
  ];

  const platforms = [
    { name: 'App Store', href: '#' },
    { name: 'Google Play Console', href: '#' },
    { name: 'UpWork', href: '#' }
  ];

  return (
    <section 
      id="contact" 
      className="py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-white">Connect</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to bring your mobile app ideas to life? Let's discuss your project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 glass-hover rounded-xl transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-white/20">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{info.label}</p>
                      <p className="text-white group-hover:text-white transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass-hover rounded-lg text-white/80 ${social.color} transition-all hover:scale-110`}
                    title={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Professional Platforms */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Professional Platforms</h3>
              
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 glass-hover rounded-full text-white/80 hover:text-white transition-colors text-sm border border-white/20"
                  >
                    {platform.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/70 text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full glass-hover px-8 py-4 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group border-2 border-blue-400/50"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-green-500/20 w-fit mx-auto mb-4">
                  <CheckCircle size={48} className="text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-white/70">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Whether you need a mobile app, want to integrate AI features, or need consultation 
              on your existing project, I'm here to help turn your ideas into reality.
            </p>
            <a
              href="mailto:yanuartrilaksono23@gmail.com"
              className="inline-flex items-center gap-2 glass-hover px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 border-2 border-blue-400/50"
            >
              <Mail size={18} />
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 