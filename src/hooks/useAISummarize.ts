'use client';

import { useState } from 'react';

interface SummarizeOptions {
  content: string;
  type?: 'portfolio' | 'experience' | 'project' | 'general';
  prompt?: string;
}

interface SummarizeResponse {
  success: boolean;
  summary?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

export const useAISummarize = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summarize = async (options: SummarizeOptions): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data: SummarizeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      if (data.success && data.summary) {
        return data.summary;
      } else {
        throw new Error('No summary generated');
      }
    } catch (err: any) {
      console.error('Error calling AI summarize:', err);
      
      // Handle different types of errors
      let errorMessage = 'Failed to generate summary. Please try again.';
      
      if (err.message?.includes('fetch failed') || err.code === 'ECONNRESET') {
        errorMessage = 'Connection error. Please check your internet connection and try again.';
      } else if (err.message?.includes('timeout')) {
        errorMessage = 'Request timeout. The AI service is taking too long to respond. Please try again.';
      } else if (err.message?.includes('503')) {
        errorMessage = 'AI service is temporarily unavailable. Please try again in a few moments.';
      }
      
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const summarizePortfolio = async (content: string, customPrompt?: string) => {
    return summarize({
      content,
      type: 'portfolio',
      prompt: customPrompt
    });
  };

  const summarizeExperience = async (content: string, customPrompt?: string) => {
    return summarize({
      content,
      type: 'experience',
      prompt: customPrompt
    });
  };

  const summarizeProject = async (content: string, customPrompt?: string) => {
    return summarize({
      content,
      type: 'project',
      prompt: customPrompt
    });
  };

  const summarizeGeneral = async (content: string, customPrompt?: string) => {
    return summarize({
      content,
      type: 'general',
      prompt: customPrompt
    });
  };

  return {
    summarize,
    summarizePortfolio,
    summarizeExperience,
    summarizeProject,
    summarizeGeneral,
    isLoading,
    error,
  };
};

export default useAISummarize;