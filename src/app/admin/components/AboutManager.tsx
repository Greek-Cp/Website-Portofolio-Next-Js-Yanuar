'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Brain, X, ChevronDown, ChevronRight } from 'lucide-react';
import AISummarizeHelper from './AISummarizeHelper';

interface AboutData {
  description: string[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    gpa: string;
    coursework: string;
  };
}

interface AboutManagerProps {
  about: AboutData;
  onUpdate: (field: string, value: any) => void;
}

const AboutManager: React.FC<AboutManagerProps> = ({ about, onUpdate }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['description']));
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalTarget, setAiModalTarget] = useState<string>('');

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...about.description];
    newDescription[index] = value;
    onUpdate('description', newDescription);
  };

  const addDescriptionParagraph = () => {
    const newDescription = [...about.description, ''];
    onUpdate('description', newDescription);
  };

  const removeDescriptionParagraph = (index: number) => {
    const newDescription = about.description.filter((_, i) => i !== index);
    onUpdate('description', newDescription);
  };

  const handleSkillCategoryChange = (index: number, field: string, value: string) => {
    const newSkills = [...about.skills];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value
    };
    onUpdate('skills', newSkills);
  };

  const handleSkillItemsChange = (skillIndex: number, items: string[]) => {
    const newSkills = [...about.skills];
    newSkills[skillIndex] = {
      ...newSkills[skillIndex],
      items
    };
    onUpdate('skills', newSkills);
  };

  const addSkillCategory = () => {
    const newSkills = [...about.skills, { category: '', items: [] }];
    onUpdate('skills', newSkills);
  };

  const removeSkillCategory = (index: number) => {
    const newSkills = about.skills.filter((_, i) => i !== index);
    onUpdate('skills', newSkills);
  };

  const handleEducationChange = (field: string, value: string) => {
    const newEducation = {
      ...about.education,
      [field]: value
    };
    onUpdate('education', newEducation);
  };

  const handleAIAutoFill = (target: string) => {
    setAiModalTarget(target);
    setShowAIModal(true);
  };

  const handleAIResult = (summary: string) => {
    try {
      const result = JSON.parse(summary);
      if (aiModalTarget === 'description') {
        if (result.description && Array.isArray(result.description)) {
          onUpdate('description', result.description);
        }
      } else if (aiModalTarget === 'skills') {
        if (result.skills && Array.isArray(result.skills)) {
          onUpdate('skills', result.skills);
        }
      } else if (aiModalTarget === 'education') {
        if (result.education) {
          onUpdate('education', { ...about.education, ...result.education });
        }
      }
    } catch (error) {
      console.error('Error parsing AI result:', error);
    }
    setShowAIModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">About Section</h2>
      </div>

      {/* Description Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('description')}
            className="flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-400 transition-colors"
          >
            {expandedSections.has('description') ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
            Description
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleAIAutoFill('description')}
              className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
            >
              <Brain size={14} />
              AI Auto-fill
            </button>
            <button
              onClick={addDescriptionParagraph}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
            >
              <Plus size={14} />
              Add Paragraph
            </button>
          </div>
        </div>

        {expandedSections.has('description') && (
          <div className="space-y-4">
            {about.description.map((paragraph, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder={`Paragraph ${index + 1}`}
                  className="flex-1 px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                  rows={3}
                />
                <button
                  onClick={() => removeDescriptionParagraph(index)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('skills')}
            className="flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-400 transition-colors"
          >
            {expandedSections.has('skills') ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
            Skills & Expertise
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleAIAutoFill('skills')}
              className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
            >
              <Brain size={14} />
              AI Auto-fill
            </button>
            <button
              onClick={addSkillCategory}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
            >
              <Plus size={14} />
              Add Category
            </button>
          </div>
        </div>

        {expandedSections.has('skills') && (
          <div className="space-y-4">
            {about.skills.map((skill, index) => (
              <div key={index} className="glass-hover rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={skill.category}
                    onChange={(e) => handleSkillCategoryChange(index, 'category', e.target.value)}
                    placeholder="Skill Category"
                    className="flex-1 px-3 py-2 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                  />
                  <button
                    onClick={() => removeSkillCategory(index)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  value={skill.items.join(', ')}
                  onChange={(e) => handleSkillItemsChange(index, e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                  placeholder="Enter skills separated by commas (e.g., Flutter, React Native, Kotlin)"
                  className="w-full px-3 py-2 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                  rows={2}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('education')}
            className="flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-400 transition-colors"
          >
            {expandedSections.has('education') ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
            Education
          </button>
          <button
            onClick={() => handleAIAutoFill('education')}
            className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
          >
            <Brain size={14} />
            AI Auto-fill
          </button>
        </div>

        {expandedSections.has('education') && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Degree</label>
              <input
                type="text"
                value={about.education.degree}
                onChange={(e) => handleEducationChange('degree', e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., Bachelor of Computer Science"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Institution</label>
              <input
                type="text"
                value={about.education.institution}
                onChange={(e) => handleEducationChange('institution', e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., University Name"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Period</label>
              <input
                type="text"
                value={about.education.period}
                onChange={(e) => handleEducationChange('period', e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., 2020 - 2024"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">GPA</label>
              <input
                type="text"
                value={about.education.gpa}
                onChange={(e) => handleEducationChange('gpa', e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., 3.8/4.0"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm mb-2">Relevant Coursework</label>
              <textarea
                value={about.education.coursework}
                onChange={(e) => handleEducationChange('coursework', e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
                rows={3}
                placeholder="List relevant courses separated by commas"
              />
            </div>
          </div>
        )}
      </div>

      {/* AI Auto-fill Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="text-purple-400" size={20} />
                <h3 className="text-lg font-semibold text-white">
                  AI Auto-fill {aiModalTarget.charAt(0).toUpperCase() + aiModalTarget.slice(1)}
                </h3>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-white/70" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-white/70 text-sm">
                Provide some information about yourself and AI will help generate content for your {aiModalTarget} section.
              </p>
            </div>
            
            <AISummarizeHelper
              onSummaryGenerated={handleAIResult}
              type="general"
              placeholder={`Describe your ${aiModalTarget === 'description' ? 'background, experience, and what you do' : aiModalTarget === 'skills' ? 'technical skills and expertise areas' : 'educational background and achievements'}...`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutManager;