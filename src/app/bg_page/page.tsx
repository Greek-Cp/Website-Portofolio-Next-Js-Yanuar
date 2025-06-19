'use client';
import { useState, useEffect } from 'react';

export default function BgPage() {
  const [isScreenshotting, setIsScreenshotting] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    // Initialize particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }));
    setParticles(newParticles);
  }, []);

  const takeScreenshot = async () => {
    setIsScreenshotting(true);
    try {
      console.log('Starting screenshot...');
      const html2canvas = (await import('html2canvas')).default;
      console.log('html2canvas loaded');
      
      const element = document.querySelector('main');
      console.log('Element found:', element);
      
      if (element) {
        console.log('Taking screenshot with options...');
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: true,
          logging: true,
          height: element.scrollHeight,
          width: element.scrollWidth
        });
        
        console.log('Canvas created:', canvas);
        const link = document.createElement('a');
        link.download = `bg-animation-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Screenshot downloaded successfully');
      } else {
        console.error('Main element not found');
      }
    } catch (error) {
      console.error('Screenshot failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Screenshot gagal: ' + errorMessage);
    } finally {
      setIsScreenshotting(false);
    }
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(45deg, rgba(17, 24, 39, 1), rgba(0, 0, 0, 1), rgba(30, 41, 59, 1))`
      }}
    >
      {/* Enhanced Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.07)_1.5px,transparent_1.5px)] bg-[size:35px_35px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] pointer-events-none animate-pulse" />

      {/* Dynamic Background Overlay */}
      <div 
        className="fixed inset-0 opacity-40 pointer-events-none animate-background-shift"
        style={{
          background: `
            radial-gradient(circle at 35% 25%, rgba(59, 130, 246, 0.18) 0%, transparent 60%),
            radial-gradient(circle at 65% 75%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.18) 0%, transparent 60%),
            radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.12) 0%, transparent 60%)
          `
        }}
      />

      {/* Enhanced Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/3 w-96 h-96 bg-blue-500/25 rounded-full filter blur-[100px] animate-blob" />
        <div className="absolute top-2/3 -right-1/3 w-96 h-96 bg-purple-500/25 rounded-full filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/25 rounded-full filter blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 -left-1/4 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full filter blur-[140px] animate-blob animation-delay-1000" />
        <div className="absolute bottom-1/4 -right-1/4 w-[28rem] h-[28rem] bg-cyan-500/20 rounded-full filter blur-[140px] animate-blob animation-delay-3000" />
        
        {/* Enhanced floating elements */}
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-emerald-500/15 rounded-full filter blur-[50px] animate-float" />
        <div className="absolute bottom-1/2 right-1/4 w-48 h-48 bg-pink-500/15 rounded-full filter blur-[60px] animate-float animation-delay-1500" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-yellow-500/15 rounded-full filter blur-[40px] animate-float animation-delay-3000" />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>

      {/* Enhanced Screenshot Button */}
      <button
        onClick={takeScreenshot}
        disabled={isScreenshotting}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-5 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
        title="Screenshot Background"
      >
        {isScreenshotting ? (
          <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Screenshot
        </span>
      </button>

      {/* Empty content area - only background visible */}
      <div className="relative z-10">
        {/* No content components here - just animated background */}
      </div>
    </main>
  );
}