'use client';

import React from 'react';
import { Save } from 'lucide-react';

interface SettingsPanelProps {
  portfolioData: any;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ portfolioData }) => {
  const handleExportData = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Settings & Export</h2>
      
      <div className="glass-hover rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
        <p className="text-white/70 mb-4">
          Download your portfolio data as JSON file for backup or migration.
        </p>
        <button
          onClick={handleExportData}
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
  );
};

export default SettingsPanel;