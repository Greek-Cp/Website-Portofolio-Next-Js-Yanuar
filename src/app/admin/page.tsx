'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import AdminHeader from './components/AdminHeader';
import Sidebar from './components/Sidebar';
import ProfileForm from './components/ProfileForm';
import ProjectsManager from './components/ProjectsManager';
import ExperienceManager from './components/ExperienceManager';
import SettingsPanel from './components/SettingsPanel';
import { useAuth } from './hooks/useAuth';
import { usePortfolioAdmin } from './hooks/usePortfolioAdmin';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { isAuthenticated, password, setPassword, handleLogin, handleLogout } = useAuth();
  const {
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
  } = usePortfolioAdmin();

  useEffect(() => {
    if (isAuthenticated) {
      loadPortfolioData();
    }
  }, [isAuthenticated]);

  // Render functions
  const renderTabContent = () => {
    if (!portfolioData) return null;

    switch (activeTab) {
      case 'profile':
        return (
          <ProfileForm
            profile={portfolioData.profile}
            onUpdate={updateProfile}
          />
        );
      case 'projects':
        return (
          <ProjectsManager
            projects={portfolioData.projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
          />
        );
      case 'experience':
        return (
          <ExperienceManager
            experiences={portfolioData.experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
          />
        );
      case 'settings':
        return (
          <SettingsPanel portfolioData={portfolioData} />
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginForm
        password={password}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
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
      <AdminHeader
        saveStatus={saveStatus}
        isLoading={isLoading}
        onSave={savePortfolioData}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;