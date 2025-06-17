'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Brain, X, ChevronDown, ChevronRight } from 'lucide-react';
import AISummarizeHelper from './AISummarizeHelper';

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
  const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(new Set());

  const toggleExperience = (index: number) => {
    const newExpanded = new Set(expandedExperiences);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedExperiences(newExpanded);
  };

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
        {experiences.map((exp, index) => {
          const isExpanded = expandedExperiences.has(index);
          
          return (
            <div key={index} className="glass-hover rounded-xl border border-white/10">
              {/* Header - Always visible */}
              <div 
                className="p-4 cursor-pointer hover:bg-white/5 transition-colors duration-200 rounded-t-xl"
                onClick={() => toggleExperience(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown size={20} className="text-white/70" />
                    ) : (
                      <ChevronRight size={20} className="text-white/70" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {exp.company || `Experience ${index + 1}`}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {exp.position && exp.period ? `${exp.position} • ${exp.period}` : 
                         exp.position || exp.period || 'Click to expand and edit'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const modal = document.getElementById(`auto-fill-modal-exp-${index}`);
                        if (modal) modal.classList.remove('hidden');
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
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content */}
              {isExpanded && (
                <div className="px-6 pb-6">
            
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
              )}
              
            </div>
          );
        })}
      </div>
      
      {/* AI Auto-fill Modals - Outside all card containers */}
      {experiences.map((exp, index) => (
        <div key={`modal-${index}`} id={`auto-fill-modal-exp-${index}`} className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="text-purple-400" size={24} />
                AI Auto-fill Experience
              </h3>
              <button
                onClick={() => {
                  const modal = document.getElementById(`auto-fill-modal-exp-${index}`);
                  if (modal) modal.classList.add('hidden');
                }}
                className="text-white/70 hover:text-white p-2"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-white/70 text-sm">
                Masukkan konteks pengalaman kerja Anda dan AI akan mengisi semua field experience secara otomatis dalam format JSON yang terstruktur.
              </p>
            </div>
            
            <AISummarizeHelper
              mode="experience-autofill"
              type="experience"
              onExperienceDataGenerated={(experienceData) => {
                console.log('ExperienceManager received experience data:', experienceData);
                console.log('Current experience before update:', exp);
                console.log('Experience index:', index);
                
                // Create updated experience object with all fields at once
                const updatedFields: any = {};
                
                if (experienceData.company) {
                  console.log('Adding company to update:', experienceData.company);
                  updatedFields.company = experienceData.company;
                }
                if (experienceData.position) {
                  console.log('Adding position to update:', experienceData.position);
                  updatedFields.position = experienceData.position;
                }
                if (experienceData.location) {
                  console.log('Adding location to update:', experienceData.location);
                  updatedFields.location = experienceData.location;
                }
                if (experienceData.period) {
                  console.log('Adding period to update:', experienceData.period);
                  updatedFields.period = experienceData.period;
                }
                if (experienceData.type) {
                  console.log('Adding type to update:', experienceData.type);
                  updatedFields.type = experienceData.type;
                }
                if (experienceData.responsibilities) {
                  console.log('Adding responsibilities to update:', experienceData.responsibilities);
                  updatedFields.responsibilities = experienceData.responsibilities;
                }
                if (experienceData.technologies) {
                  console.log('Adding technologies to update:', experienceData.technologies);
                  updatedFields.technologies = experienceData.technologies;
                }
                
                console.log('Batch updating all experience fields:', updatedFields);
                
                // Update all fields in a batch using a special batch update
                onUpdate(index, 'batch_update', updatedFields);
                
                console.log('Batch update completed, closing modal...');
                
                // Add a small delay to ensure state updates are processed
                setTimeout(() => {
                  // Close modal
                  const autoFillModal = document.getElementById(`auto-fill-modal-exp-${index}`);
                  if (autoFillModal) autoFillModal.classList.add('hidden');
                  
                  alert('Experience data berhasil di-generate dan diisi otomatis!');
                }, 200);
              }}
              placeholder="Masukkan konteks pengalaman kerja Anda..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceManager;