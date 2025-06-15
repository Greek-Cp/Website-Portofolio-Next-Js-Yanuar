import { useState, useEffect } from 'react';

interface PortfolioData {
  profile: {
    name: string;
    title: string;
    description: string;
    location: string;
    education: string;
    email: string;
    phone: string;
    profileImage: string;
    socialLinks: {
      github: string;
      linkedin: string;
      portfolio: string;
    };
  };
  about: {
    description: string[];
    skills: Array<{
      category: string;
      items: string[];
    }>;
    education: {
      degree: string;
      institution: string;
      period: string;
      gpa: string;
      coursework: string;
    };
  };
  experience: Array<{
    company: string;
    position: string;
    location: string;
    period: string;
    type: string;
    responsibilities: string[];
    technologies: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    longDescription: string;
    icon: string;
    color: string;
    images: string[];
    features: string[];
    technologies: string[];
    status: string;
    github: string;
    demo: string;
  }>;
  technologies: Array<{
    name: string;
    icon: string;
  }>;
}

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/portfolio');
        
        if (!response.ok) {
          // Fallback to static file
          const fallbackResponse = await fetch('/data/portfolio.json');
          if (!fallbackResponse.ok) {
            throw new Error('Failed to fetch portfolio data');
          }
          const fallbackData = await fallbackResponse.json();
          setData(fallbackData);
        } else {
          const data = await response.json();
          setData(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch: () => window.location.reload() };
};

export default usePortfolioData; 