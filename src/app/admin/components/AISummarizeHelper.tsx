'use client';

import React, { useState } from 'react';
import { Brain, Loader2, Copy, Check, Wand2 } from 'lucide-react';
import { useAISummarize } from '@/hooks/useAISummarize';

interface AISummarizeHelperProps {
  content?: string;
  type?: 'portfolio' | 'experience' | 'project' | 'general';
  placeholder?: string;
  onSummaryGenerated?: (summary: string) => void;
  onProjectDataGenerated?: (projectData: any) => void;
  mode?: 'summary' | 'project-autofill';
}

const AISummarizeHelper: React.FC<AISummarizeHelperProps> = ({
  content = '',
  type = 'general',
  onSummaryGenerated,
  onProjectDataGenerated,
  mode = 'summary',
  placeholder = 'Enter content to summarize...'
}) => {
  const [inputContent, setInputContent] = useState(content);
  const [summary, setSummary] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const { summarize, isLoading, error } = useAISummarize();

  const handleSummarize = async () => {
    if (!inputContent.trim()) {
      alert('Please provide content to summarize');
      return;
    }

    let prompt = customPrompt;
    
    if (mode === 'project-autofill') {
      prompt = `Berdasarkan informasi berikut tentang project:

${inputContent}

Tolong ekstrak dan format data project dalam format JSON yang valid dengan struktur berikut:
{
  "title": "nama project",
  "description": "deskripsi singkat project (1-2 kalimat)",
  "longDescription": "deskripsi panjang dan detail project (3-4 paragraf)",
  "features": ["fitur 1", "fitur 2", "fitur 3"],
  "technologies": ["tech 1", "tech 2", "tech 3"],
  "status": "In Development" atau "Completed" atau "Open Source",
  "github": "URL github jika ada (kosong jika tidak ada)",
  "demo": "URL demo jika ada (kosong jika tidak ada)"
}

IMPORTANT: Response harus HANYA berupa JSON yang valid, tanpa teks penjelasan, tanpa markdown formatting, tanpa backticks. Mulai langsung dengan { dan akhiri dengan }.`;
    }

    const result = await summarize({
      content: inputContent,
      type,
      prompt: prompt || undefined
    });

    if (result) {
      console.log('AI Response:', result);
      setSummary(result);
      
      if (mode === 'project-autofill') {
        try {
          // Clean the result - remove any markdown formatting or extra text
          let cleanResult = result.trim();
          
          // Remove markdown code blocks if present
          if (cleanResult.startsWith('```json')) {
            cleanResult = cleanResult.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (cleanResult.startsWith('```')) {
            cleanResult = cleanResult.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }
          
          // Find JSON object boundaries
          const startIndex = cleanResult.indexOf('{');
          const lastIndex = cleanResult.lastIndexOf('}');
          
          if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
            cleanResult = cleanResult.substring(startIndex, lastIndex + 1);
          }
          
          console.log('Cleaned result for parsing:', cleanResult);
          
          // Try to parse as JSON
          console.log('Attempting to parse JSON...');
          const projectData = JSON.parse(cleanResult);
          console.log('Parsed project data:', projectData);
          
          // Validate required fields
          if (projectData.title && projectData.description) {
            if (onProjectDataGenerated) {
              console.log('Calling onProjectDataGenerated with:', projectData);
              onProjectDataGenerated(projectData);
              console.log('onProjectDataGenerated called successfully');
            }
          } else {
            throw new Error('Missing required fields: title or description');
          }
        } catch (parseError) {
          // If JSON parsing fails, treat as regular summary
          console.error('Failed to parse project data as JSON:', parseError);
          console.error('Original result:', result);
          console.error('Raw response:', result);
          alert('AI response tidak dalam format JSON yang valid. Silakan coba lagi.');
        }
      } else {
        onSummaryGenerated?.(result);
      }
    }
  };

  const handleCopy = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  

  const getTypeLabel = () => {
    const labels = {
      portfolio: 'Portfolio',
      experience: 'Experience',
      project: 'Project',
      general: 'General'
    };
    return labels[type];
  };

  return (
    <div className="space-y-4 p-4 glass rounded-lg border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-400" size={20} />
          <h3 className="text-white font-medium">AI Summary Helper</h3>
          <span className="text-xs px-2 py-1 bg-purple-400/20 text-purple-300 rounded">
            {mode === 'project-autofill' ? 'Project Auto-fill' : getTypeLabel()}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowCustomPrompt(!showCustomPrompt)}
            className="text-xs px-3 py-1 glass-hover rounded text-white/70 border border-white/20"
          >
            Custom Prompt
          </button>
          <button
            type="button"
            onClick={handleSummarize}
            disabled={isLoading || !inputContent.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 disabled:cursor-not-allowed rounded-lg text-white text-sm transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={14} />
                Generate Summary
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-white/70 text-sm">
          {mode === 'project-autofill' ? 'Konteks Project' : 'Content to Summarize'}
        </label>
        <textarea
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder={mode === 'project-autofill' ? 'Masukkan konteks project Anda, contoh: "Saya memiliki project aplikasi mobile untuk tracking fitness dengan fitur workout planner, nutrition tracker, dan social sharing. Dibuat menggunakan Flutter dan Firebase."' : placeholder}
          rows={6}
          className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
        />
      </div>

      {showCustomPrompt && (
        <div className="space-y-2">
          <label className="block text-white/70 text-sm">Custom Prompt (Optional)</label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter custom instructions for the AI..."
            rows={3}
            className="w-full px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-purple-400 focus:outline-none resize-none"
          />
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {summary && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-white/70 text-sm">Generated Summary</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 text-xs glass-hover rounded text-white/70 border border-white/20"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onSummaryGenerated) {
                    onSummaryGenerated(summary);
                  } else {
                    navigator.clipboard.writeText(summary);
                    alert('Summary copied to clipboard!');
                  }
                }}
                className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
              >
                {onSummaryGenerated ? 'Use This' : 'Copy Summary'}
              </button>
            </div>
          </div>
          <div className="p-3 glass rounded-lg border border-white/10">
            <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
          </div>
        </div>
      )}

      {!summary && !isLoading && (
        <div className="p-4 border-2 border-dashed border-white/20 rounded-lg text-center">
          <Brain className="mx-auto mb-2 text-white/30" size={24} />
          <p className="text-white/50 text-sm">{mode === 'project-autofill' ? 'Masukkan konteks project Anda, contoh: "Saya memiliki project aplikasi mobile untuk tracking fitness dengan fitur workout planner, nutrition tracker, dan social sharing. Dibuat menggunakan Flutter dan Firebase."' : placeholder}</p>
          <p className="text-white/30 text-xs mt-1">
            Click "Generate Summary" to create AI-powered content
          </p>
        </div>
      )}

      <div className="text-xs text-white/40 text-center">
        Powered by GPT-4O-Mini • Free tier: 200 requests/day
      </div>
    </div>
  );
};

export default AISummarizeHelper;