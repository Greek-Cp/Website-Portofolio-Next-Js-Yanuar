import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, rgba(17, 24, 39, 1), rgba(0, 0, 0, 1))`
      }}
    >
      {/* Global Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />

      {/* Global Static Background Overlay */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 40% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
            radial-gradient(circle at 60% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 70%),
            radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 70%)
          `
        }}
      />

      {/* Global Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-80 h-80 bg-blue-500/15 rounded-full filter blur-[80px] animate-blob" />
        <div className="absolute top-2/3 -right-1/4 w-80 h-80 bg-purple-500/15 rounded-full filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/15 rounded-full filter blur-[80px] animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 -left-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px] animate-blob animation-delay-1000" />
        <div className="absolute bottom-1/4 -right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[120px] animate-blob animation-delay-3000" />
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
