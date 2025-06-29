'use client';

import { useState, useEffect } from 'react';

interface PortfolioData {
  profile: any;
  about: any;
  experience: any[];
  projects: any[];
  technologies: any[];
}

export const usePortfolioAdmin = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

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
    
    console.log('updateExperience called with:', { index, field, value });
    console.log('Current portfolioData.experience:', portfolioData.experience);
    
    const updatedExperience = [...portfolioData.experience];
    
    if (field === 'batch_update') {
      // Handle batch update - update multiple fields at once
      console.log('Performing batch update with fields:', value);
      updatedExperience[index] = {
        ...updatedExperience[index],
        ...value
      };
      console.log('Batch updated experience data:', updatedExperience[index]);
    } else {
      // Handle single field update
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value
      };
      console.log('Single field updated experience data:', updatedExperience[index]);
    }
    
    const newPortfolioData = {
      ...portfolioData,
      experience: updatedExperience
    };
    
    console.log('New portfolio data:', newPortfolioData);
    setPortfolioData(newPortfolioData);
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
    
    console.log('updateProject called with:', { index, field, value });
    console.log('Current portfolioData.projects:', portfolioData.projects);
    
    const updatedProjects = [...portfolioData.projects];
    
    if (field === 'batch_update') {
      // Handle batch update - update multiple fields at once
      console.log('Performing batch update with fields:', value);
      updatedProjects[index] = {
        ...updatedProjects[index],
        ...value
      };
      console.log('Batch updated project data:', updatedProjects[index]);
    } else {
      // Handle single field update
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value
      };
      console.log('Single field updated project data:', updatedProjects[index]);
    }
    
    const newPortfolioData = {
      ...portfolioData,
      projects: updatedProjects
    };
    
    console.log('New portfolio data:', newPortfolioData);
    setPortfolioData(newPortfolioData);
  };

  const deleteProject = (index: number) => {
    if (!portfolioData) return;
    const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects
    });
  };

  return {
    portfolioData,
    isLoading,
    saveStatus,
    loadPortfolioData,
    savePortfolioData,
    updateProfile,
    updateAbout,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject
  };
};