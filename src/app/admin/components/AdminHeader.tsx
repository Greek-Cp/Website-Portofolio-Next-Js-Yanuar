'use client';

import React from 'react';
import { Save } from 'lucide-react';

interface AdminHeaderProps {
  onSave: () => void;
  onLogout: () => void;
  isLoading: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onSave, onLogout, isLoading, saveStatus }) => {
  return (
    <header className="border-b border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onSave}
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
              onClick={onLogout}
              className="text-white/70 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;