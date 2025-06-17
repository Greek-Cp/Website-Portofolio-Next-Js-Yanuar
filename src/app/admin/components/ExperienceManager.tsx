'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
}

interface ExperienceManagerProps {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: (index: number) => void;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ experiences, onAdd, onUpdate, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Work Experience</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white border border-blue-400/50"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="glass-hover rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Experience {index + 1}</h3>
              <button
                onClick={() => onDelete(index)}
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
                  onChange={(e) => onUpdate(index, 'company', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => onUpdate(index, 'position', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => onUpdate(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => onUpdate(index, 'period', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">Job Type</label>
              <input
                type="text"
                value={exp.type || ''}
                onChange={(e) => onUpdate(index, 'type', e.target.value)}
                placeholder="e.g., Full-time Remote, Part-time, Contract"
                className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">Responsibilities</label>
              <textarea
                value={exp.responsibilities ? exp.responsibilities.join('\n') : ''}
                onChange={(e) => onUpdate(index, 'responsibilities', e.target.value.split('\n').filter(item => item.trim()))}
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
                onChange={(e) => onUpdate(index, 'technologies', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
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
  );
};

export default ExperienceManager;