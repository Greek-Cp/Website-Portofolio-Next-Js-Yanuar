'use client';

import React, { useState } from 'react';
import AISummarizeHelper from '../components/AISummarizeHelper';

const AITestPage = () => {
  const [testContent, setTestContent] = useState(
    `I am a skilled Flutter developer with 3+ years of experience building cross-platform mobile applications. I have expertise in Dart programming, state management with Provider and Bloc, Firebase integration, and creating beautiful UIs with custom animations. I've worked on various projects including video editing apps, AI-powered storytelling platforms, and educational games. My experience includes native iOS development with Swift and AVFoundation, as well as Android development with Kotlin and Media3. I'm passionate about creating user-friendly applications that solve real-world problems and deliver exceptional user experiences.`
  );
  const [selectedType, setSelectedType] = useState<'portfolio' | 'experience' | 'project' | 'general'>('portfolio');
  const [result, setResult] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">AI Summarize Service Test</h1>
            <p className="text-white/70">Test the GPT-powered summarization service</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="glass rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">Input Content</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Content Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as any)}
                      className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-purple-400 focus:outline-none"
                    >
                      <option value="portfolio">Portfolio</option>
                      <option value="experience">Experience</option>
                      <option value="project">Project</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Content to Summarize</label>
                    <textarea
                      value={testContent}
                      onChange={(e) => setTestContent(e.target.value)}
                      rows={10}
                      className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-purple-400 focus:outline-none resize-none"
                      placeholder="Enter content to summarize..."
                    />
                  </div>
                </div>
              </div>

              {/* Service Status */}
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Service Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">API Endpoint:</span>
                    <span className="text-green-400">/api/ai-summarize</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Model:</span>
                    <span className="text-blue-400">GPT-4O-Mini</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Base URL:</span>
                    <span className="text-purple-400">api.chatanywhere.tech</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Daily Limit:</span>
                    <span className="text-yellow-400">200 requests</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Helper Section */}
            <div className="space-y-6">
              <AISummarizeHelper
                content={testContent}
                type={selectedType}
                onSummaryGenerated={(summary) => setResult(summary)}
                placeholder="AI summary will appear here after generation..."
              />

              {/* Result Display */}
              {result && (
                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Final Result</h3>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-100 text-sm leading-relaxed whitespace-pre-wrap">
                      {result}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Test Examples */}
          <div className="mt-8 glass rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Test Examples</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setTestContent('I am a Flutter developer with 3+ years of experience. I have built mobile apps using Dart, Firebase, and various state management solutions. I specialize in creating beautiful UIs and integrating complex features like video processing and AI.')}
                className="p-3 glass-hover rounded-lg text-left border border-white/20"
              >
                <div className="text-white font-medium text-sm mb-1">Portfolio Example</div>
                <div className="text-white/60 text-xs">Developer profile summary</div>
              </button>
              
              <button
                onClick={() => setTestContent('Senior Flutter Developer at TechCorp (2021-2024). Led development of mobile applications serving 100K+ users. Implemented CI/CD pipelines, mentored junior developers, and architected scalable solutions using clean architecture principles.')}
                className="p-3 glass-hover rounded-lg text-left border border-white/20"
              >
                <div className="text-white font-medium text-sm mb-1">Experience Example</div>
                <div className="text-white/60 text-xs">Work experience entry</div>
              </button>
              
              <button
                onClick={() => setTestContent('VIDCAP is a Flutter-based video editing application that allows users to add subtitle overlays and animations to videos. Built with native iOS and Android libraries, integrated with OpenAI for automatic transcription, and supports cross-platform video processing.')}
                className="p-3 glass-hover rounded-lg text-left border border-white/20"
              >
                <div className="text-white font-medium text-sm mb-1">Project Example</div>
                <div className="text-white/60 text-xs">Project description</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITestPage;