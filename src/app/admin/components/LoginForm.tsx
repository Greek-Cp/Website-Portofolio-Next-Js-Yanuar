'use client';

import React from 'react';

interface LoginFormProps {
  password: string;
  onPasswordChange: (password: string) => void;
  onLogin: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ password, onPasswordChange, onLogin }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/70">Enter password to access admin panel</p>
        </div>
        
        <form onSubmit={onLogin} className="space-y-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full glass-hover px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 border-2 border-blue-400/50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;