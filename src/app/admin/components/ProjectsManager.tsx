'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

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
      
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="glass-hover rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
              <button
                onClick={() => onDelete(index)}
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
              <label className="block text-white/70 text-sm mb-2">Long Description</label>
              <textarea
                value={project.longDescription || ''}
                onChange={(e) => onUpdate(index, 'longDescription', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
              />
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
              <label className="block text-white/70 text-sm mb-2">Images (URLs)</label>
              <textarea
                value={project.images ? project.images.join('\n') : ''}
                onChange={(e) => onUpdate(index, 'images', e.target.value.split('\n').filter(item => item.trim()))}
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
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;