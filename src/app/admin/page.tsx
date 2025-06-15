'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit3, Eye, EyeOff, User, Briefcase, FolderOpen, Settings } from 'lucide-react';

interface PortfolioData {
  profile: any;
  about: any;
  experience: any[];
  projects: any[];
  technologies: any[];
}

const AdminPage = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Simple authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'yanuar2024'; // Change this to a secure password

  useEffect(() => {
    if (isAuthenticated) {
      loadPortfolioData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Password salah!');
    }
  };

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setPortfolioData(data);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Fallback to static file
      try {
        const response = await fetch('/data/portfolio.json');
        const data = await response.json();
        setPortfolioData(data);
      } catch (fallbackError) {
        console.error('Error loading fallback data:', fallbackError);
      }
    }
  };

  const savePortfolioData = async () => {
    if (!portfolioData) return;
    
    setSaveStatus('saving');
    setIsLoading(true);

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (response.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (field: string, value: any) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        [field]: value
      }
    });
  };

  const updateAbout = (field: string, value: any) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      about: {
        ...portfolioData.about,
        [field]: value
      }
    });
  };

  const addExperience = () => {
    if (!portfolioData) return;
    const newExperience = {
      company: '',
      position: '',
      location: '',
      period: '',
      type: '',
      responsibilities: [],
      technologies: []
    };
    setPortfolioData({
      ...portfolioData,
      experience: [...portfolioData.experience, newExperience]
    });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    if (!portfolioData) return;
    const updatedExperience = [...portfolioData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setPortfolioData({
      ...portfolioData,
      experience: updatedExperience
    });
  };

  const deleteExperience = (index: number) => {
    if (!portfolioData) return;
    const updatedExperience = portfolioData.experience.filter((_, i) => i !== index);
    setPortfolioData({
      ...portfolioData,
      experience: updatedExperience
    });
  };

  const addProject = () => {
    if (!portfolioData) return;
    const newProject = {
      title: '',
      description: '',
      longDescription: '',
      icon: 'Smartphone',
      color: 'from-blue-400 to-cyan-400',
      images: [],
      features: [],
      technologies: [],
      status: 'In Development',
      github: '#',
      demo: '#'
    };
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, newProject]
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    if (!portfolioData) return;
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects
    });
  };

  const deleteProject = (index: number) => {
    if (!portfolioData) return;
    const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="glass rounded-3xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/70">Enter password to access admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full glass-hover px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 border-2 border-blue-400/50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 glass">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={savePortfolioData}
                disabled={isLoading}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                  saveStatus === 'saved' 
                    ? 'bg-green-500/20 text-green-400 border border-green-400/50'
                    : saveStatus === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-400/50'
                    : 'glass-hover text-white border border-blue-400/50'
                }`}
              >
                <Save size={16} />
                {saveStatus === 'saving' ? 'Saving...' : 
                 saveStatus === 'saved' ? 'Saved!' : 
                 saveStatus === 'error' ? 'Error!' : 'Save Changes'}
              </button>
              
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem('admin_auth');
                }}
                className="text-white/70 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="glass rounded-2xl p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-400/50'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        value={portfolioData.profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={portfolioData.profile.title}
                        onChange={(e) => updateProfile('title', e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={portfolioData.profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Phone</label>
                      <input
                        type="text"
                        value={portfolioData.profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Location</label>
                      <input
                        type="text"
                        value={portfolioData.profile.location}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Education</label>
                      <input
                        type="text"
                        value={portfolioData.profile.education}
                        onChange={(e) => updateProfile('education', e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Description</label>
                    <textarea
                      value={portfolioData.profile.description}
                      onChange={(e) => updateProfile('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Projects</h2>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white border border-blue-400/50"
                    >
                      <Plus size={16} />
                      Add Project
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {portfolioData.projects.map((project, index) => (
                      <div key={index} className="glass-hover rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
                          <button
                            onClick={() => deleteProject(index)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Status</label>
                            <select
                              value={project.status}
                              onChange={(e) => updateProject(index, 'status', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            >
                              <option value="In Development">In Development</option>
                              <option value="Completed">Completed</option>
                              <option value="Open Source">Open Source</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Short Description</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Long Description</label>
                          <textarea
                            value={project.longDescription || ''}
                            onChange={(e) => updateProject(index, 'longDescription', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Icon</label>
                            <select
                              value={project.icon || 'Smartphone'}
                              onChange={(e) => updateProject(index, 'icon', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            >
                              <option value="Video">Video</option>
                              <option value="Brain">Brain</option>
                              <option value="PlayCircle">PlayCircle</option>
                              <option value="Smartphone">Smartphone</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Color Gradient</label>
                            <select
                              value={project.color || 'from-blue-400 to-cyan-400'}
                              onChange={(e) => updateProject(index, 'color', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            >
                              <option value="from-purple-400 to-pink-400">Purple to Pink</option>
                              <option value="from-blue-400 to-cyan-400">Blue to Cyan</option>
                              <option value="from-green-400 to-emerald-400">Green to Emerald</option>
                              <option value="from-orange-400 to-red-400">Orange to Red</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Images (URLs)</label>
                          <textarea
                            value={project.images ? project.images.join('\n') : ''}
                            onChange={(e) => updateProject(index, 'images', e.target.value.split('\n').filter(item => item.trim()))}
                            placeholder="Enter each image URL on a new line"
                            rows={4}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                          <p className="text-white/50 text-xs mt-1">Enter each image URL on a new line</p>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Features</label>
                          <textarea
                            value={project.features ? project.features.join('\n') : ''}
                            onChange={(e) => updateProject(index, 'features', e.target.value.split('\n').filter(item => item.trim()))}
                            placeholder="Enter each feature on a new line"
                            rows={5}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                          <p className="text-white/50 text-xs mt-1">Enter each feature on a new line</p>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Technologies</label>
                          <textarea
                            value={project.technologies ? project.technologies.join(', ') : ''}
                            onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                            placeholder="Flutter, Dart, Firebase, OpenAI API"
                            rows={3}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                          <p className="text-white/50 text-xs mt-1">Separate technologies with commas</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/70 text-sm mb-2">GitHub URL</label>
                            <input
                              type="text"
                              value={project.github}
                              onChange={(e) => updateProject(index, 'github', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Demo URL</label>
                            <input
                              type="text"
                              value={project.demo}
                              onChange={(e) => updateProject(index, 'demo', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white border border-blue-400/50"
                    >
                      <Plus size={16} />
                      Add Experience
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {portfolioData.experience.map((exp, index) => (
                      <div key={index} className="glass-hover rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Experience {index + 1}</h3>
                          <button
                            onClick={() => deleteExperience(index)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Position</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Location</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => updateExperience(index, 'location', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white/70 text-sm mb-2">Period</label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => updateExperience(index, 'period', e.target.value)}
                              className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Job Type</label>
                          <input
                            type="text"
                            value={exp.type || ''}
                            onChange={(e) => updateExperience(index, 'type', e.target.value)}
                            placeholder="e.g., Full-time Remote, Part-time, Contract"
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Responsibilities</label>
                          <textarea
                            value={exp.responsibilities ? exp.responsibilities.join('\n') : ''}
                            onChange={(e) => updateExperience(index, 'responsibilities', e.target.value.split('\n').filter(item => item.trim()))}
                            placeholder="Enter each responsibility on a new line"
                            rows={6}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                          <p className="text-white/50 text-xs mt-1">Enter each responsibility on a new line</p>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Technologies</label>
                          <textarea
                            value={exp.technologies ? exp.technologies.join(', ') : ''}
                            onChange={(e) => updateExperience(index, 'technologies', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                            placeholder="Flutter, Dart, Firebase, Android, iOS"
                            rows={3}
                            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                          />
                          <p className="text-white/50 text-xs mt-1">Separate technologies with commas</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-6">Settings & Export</h2>
                  
                  <div className="glass-hover rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
                    <p className="text-white/70 mb-4">
                      Download your portfolio data as JSON file for backup or migration.
                    </p>
                    <button
                      onClick={() => {
                        const dataStr = JSON.stringify(portfolioData, null, 2);
                        const dataBlob = new Blob([dataStr], {type: 'application/json'});
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'portfolio-data.json';
                        link.click();
                      }}
                      className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white border border-blue-400/50"
                    >
                      <Save size={16} />
                      Download JSON
                    </button>
                  </div>
                  
                  <div className="glass-hover rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Current Data Preview</h3>
                    <pre className="bg-black/50 p-4 rounded-lg text-white/70 text-xs overflow-auto max-h-96">
                      {JSON.stringify(portfolioData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 