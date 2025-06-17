'use client';

import React from 'react';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  description: string;
}

interface ProfileFormProps {
  profile: ProfileData;
  onUpdate: (field: string, value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onUpdate }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/70 text-sm mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Title</label>
          <input
            type="text"
            value={profile.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Phone</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Location</label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onUpdate('location', e.target.value)}
            className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Education</label>
          <input
            type="text"
            value={profile.education}
            onChange={(e) => onUpdate('education', e.target.value)}
            className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-white/70 text-sm mb-2">Description</label>
        <textarea
          value={profile.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 glass rounded-lg text-white border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default ProfileForm;