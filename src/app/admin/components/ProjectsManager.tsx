'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Brain, X, ChevronDown, ChevronRight } from 'lucide-react';
import ImageUploader from './ImageUploader';
import AISummarizeHelper from './AISummarizeHelper';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  images: string[];
  features: string[];
  technologies: string[];
  status: string;
  github: string;
  demo: string;
}

interface ProjectsManagerProps {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: (index: number) => void;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projects, onAdd, onUpdate, onDelete }) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleProject = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white border border-blue-400/50"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project, index) => {
          const isExpanded = expandedProjects.has(index);
          return (
            <div key={index} className="glass-hover rounded-xl border border-white/10 overflow-hidden">
              {/* Expandable Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => toggleProject(index)}
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={20} className="text-white/70" />
                  ) : (
                    <ChevronRight size={20} className="text-white/70" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {project.title || `Project ${index + 1}`}
                    </h3>
                    <p className="text-sm text-white/60 truncate max-w-md">
                      {project.description || 'No description'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status || 'In Development'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const autoFillModal = document.getElementById(`auto-fill-modal-${index}`);
                      if (autoFillModal) autoFillModal.classList.remove('hidden');
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-xs glass-hover rounded-lg text-white border border-green-400/50 hover:border-green-400"
                  >
                    <Brain size={12} />
                    AI Auto-fill
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-white/10">
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => onUpdate(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Status</label>
                <select
                  value={project.status}
                  onChange={(e) => onUpdate(index, 'status', e.target.value)}
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
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
              />
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white/70 text-sm">Long Description</label>
                <button
                  type="button"
                  onClick={() => {
                    const aiModal = document.getElementById(`ai-modal-${index}`);
                    if (aiModal) aiModal.classList.remove('hidden');
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-xs glass-hover rounded-lg text-white border border-purple-400/50"
                >
                  <Brain size={12} />
                  AI Assist
                </button>
              </div>
              <textarea
                value={project.longDescription || ''}
                onChange={(e) => onUpdate(index, 'longDescription', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
              />
              
              {/* AI Assistant Modal */}
              <div id={`ai-modal-${index}`} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
                <div className="glass rounded-xl border border-white/20 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">AI Description Generator</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const aiModal = document.getElementById(`ai-modal-${index}`);
                        if (aiModal) aiModal.classList.add('hidden');
                      }}
                      className="text-white/70 hover:text-white p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-white/70 text-sm">
                      Generate a professional project description based on the information you've provided.
                      The AI will use the project title, short description, features, and technologies to create a compelling long description.
                    </p>
                    
                    <AISummarizeHelper
                      content={`Project Title: ${project.title}\nShort Description: ${project.description}\nFeatures: ${project.features ? project.features.join(', ') : ''}\nTechnologies: ${project.technologies ? project.technologies.join(', ') : ''}\nStatus: ${project.status}`}
                      type="project"
                      onSummaryGenerated={(summary) => {
                        onUpdate(index, 'longDescription', summary);
                        const aiModal = document.getElementById(`ai-modal-${index}`);
                        if (aiModal) aiModal.classList.add('hidden');
                      }}
                      placeholder="AI will generate a professional project description based on your project details..."
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Icon</label>
                <select
                  value={project.icon || 'Smartphone'}
                  onChange={(e) => onUpdate(index, 'icon', e.target.value)}
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
                  onChange={(e) => onUpdate(index, 'color', e.target.value)}
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
              <ImageUploader
                images={project.images || []}
                onImagesChange={(images) => onUpdate(index, 'images', images)}
                maxImages={5}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">Features</label>
              <textarea
                value={project.features ? project.features.join('\n') : ''}
                onChange={(e) => onUpdate(index, 'features', e.target.value.split('\n').filter(item => item.trim()))}
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
                onChange={(e) => onUpdate(index, 'technologies', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
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
                  onChange={(e) => onUpdate(index, 'github', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Demo URL</label>
                <input
                  type="text"
                  value={project.demo}
                  onChange={(e) => onUpdate(index, 'demo', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
                </div>
              )}
              
            </div>
          );
        })}
      </div>
      
      {/* AI Auto-fill Modals - Outside all card containers */}
      {projects.map((project, index) => (
        <div key={`modal-${index}`} id={`auto-fill-modal-${index}`} className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="text-purple-400" size={24} />
                AI Auto-fill Project
              </h3>
              <button
                onClick={() => {
                  const modal = document.getElementById(`auto-fill-modal-${index}`);
                  if (modal) modal.classList.add('hidden');
                }}
                className="text-white/70 hover:text-white p-2"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-white/70 text-sm">
                Masukkan konteks project Anda dan AI akan mengisi semua field project secara otomatis dalam format JSON yang terstruktur.
              </p>
            </div>
            
            <AISummarizeHelper
              mode="project-autofill"
              type="project"
              onProjectDataGenerated={(projectData) => {
                console.log('ProjectsManager received project data:', projectData);
                console.log('Current project before update:', project);
                console.log('Project index:', index);
                
                // Create updated project object with all fields at once
                const updatedFields: any = {};
                
                if (projectData.title) {
                  console.log('Adding title to update:', projectData.title);
                  updatedFields.title = projectData.title;
                }
                if (projectData.description) {
                  console.log('Adding description to update:', projectData.description);
                  updatedFields.description = projectData.description;
                }
                if (projectData.longDescription) {
                  console.log('Adding longDescription to update:', projectData.longDescription);
                  updatedFields.longDescription = projectData.longDescription;
                }
                if (projectData.features) {
                  console.log('Adding features to update:', projectData.features);
                  updatedFields.features = projectData.features;
                }
                if (projectData.technologies) {
                  console.log('Adding technologies to update:', projectData.technologies);
                  updatedFields.technologies = projectData.technologies;
                }
                if (projectData.status) {
                  console.log('Adding status to update:', projectData.status);
                  updatedFields.status = projectData.status;
                }
                if (projectData.github) {
                  console.log('Adding github to update:', projectData.github);
                  updatedFields.github = projectData.github;
                }
                if (projectData.demo) {
                  console.log('Adding demo to update:', projectData.demo);
                  updatedFields.demo = projectData.demo;
                }
                
                console.log('Batch updating all fields:', updatedFields);
                
                // Update all fields in a batch using a special batch update
                onUpdate(index, 'batch_update', updatedFields);
                
                console.log('Batch update completed, closing modal...');
                
                // Add a small delay to ensure state updates are processed
                setTimeout(() => {
                  // Close modal
                  const autoFillModal = document.getElementById(`auto-fill-modal-${index}`);
                  if (autoFillModal) autoFillModal.classList.add('hidden');
                  
                  alert('Project data berhasil di-generate dan diisi otomatis!');
                }, 200);
              }}
              placeholder="Masukkan konteks project Anda..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsManager;