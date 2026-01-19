import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  Eye,
  Lock,
  ArrowRight,
  Github,
  Wand2
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LandingPage: React.FC = () => {
  const [overlayWidth, setOverlayWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Force dark mode for PS theme
    document.documentElement.classList.add('dark');
  }, []);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    setOverlayWidth(position);

    // Update overlay image width to match container
    if (overlayImgRef.current && containerRef.current) {
      overlayImgRef.current.style.width = `${containerRef.current.offsetWidth}px`;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only update on click if we weren't dragging (to allow click-to-jump)
    if (!isDragging) {
      updateSlider(e.clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSlider(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle window mouse events for dragging outside container
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      updateSlider(e.clientX);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, updateSlider]);

  // Handle resize and initialize overlay image width
  useEffect(() => {
    const updateOverlayImageWidth = () => {
      if (overlayImgRef.current && containerRef.current) {
        overlayImgRef.current.style.width = `${containerRef.current.offsetWidth}px`;
      }
    };

    // Initialize on mount
    const timer = setTimeout(updateOverlayImageWidth, 100);
    
    window.addEventListener('resize', updateOverlayImageWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateOverlayImageWidth);
    };
  }, []);

  const scrollToApp = () => {
    window.location.href = '/app';
  };

  return (
    <div className="min-h-screen bg-ps-base text-gray-300 relative overflow-hidden">
      {/* Subtle PS Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-ps-blue/5 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between glass-panel rounded-md px-6 py-3 border border-white/5">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-ps-blueDark border border-ps-blue flex items-center justify-center shadow-ps-blue">
                <span className="text-ps-blue font-bold text-xs">Bd</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Backdrop</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
              <a href="#features" className="hover:text-ps-blue transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-ps-blue transition-colors">How it Works</a>
              <a href="https://github.com/Mo-Shakib/bg-remover" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/app" className="hidden md:block px-5 py-2 rounded bg-ps-blue text-white font-semibold text-sm hover:bg-[#2b97e6] transition-all shadow-lg shadow-blue-500/20">
                Launch App
              </Link>
              
              <button className="md:hidden text-white text-xl">
                <span className="sr-only">Menu</span>
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ps-blueDark border border-ps-blue/30 text-ps-blue text-xs font-semibold mb-6 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-ps-blue animate-pulse"></span>
                v1.0.0 Now Available
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
                Professional Cuts. <br />
                <span className="text-gradient">Instant Magic.</span>
              </h1>
              
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Accelerate your workflow with AI-powered masking. Achieve pixel-perfect transparency for e-commerce, composites, and design projects in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={scrollToApp}
                  className="w-full sm:w-auto px-8 py-4 rounded bg-ps-blue text-white font-bold text-lg hover:bg-[#2b97e6] transition-all transform hover:-translate-y-1 shadow-button-hover flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  Remove Background
                </button>
                <a 
                  href="https://github.com/Mo-Shakib/bg-remover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded bg-[#2a2a2a] hover:bg-[#333] border border-white/5 text-white font-medium text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-ps-blue">✓</span> High Fidelity
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ps-blue">✓</span> Smart Edge Detection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ps-blue">✓</span> Free to Use
                </div>
              </div>
            </div>

            {/* Interactive Hero Visual (Comparison) */}
            <div className="flex-1 w-full max-w-[600px] relative group animate-float">
              {/* Glass Container */}
              <div className="bg-ps-panel p-1 rounded-lg shadow-2xl border border-[#333] relative">
                {/* Header of "App" */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#252525] rounded-t-lg border-b border-ps-base mb-1">
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] text-gray-400 font-sans">Backdrop.psd @ 100% (RGB/8)</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#444]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#444]"></div>
                  </div>
                </div>

                {/* Image Area */}
                <div 
                  ref={containerRef}
                  className="relative w-full aspect-[4/5] bg-ps-base overflow-hidden cursor-ew-resize select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onClick={handleClick}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  
                  {/* Result Image (Background) - Processed version with transparent bg */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIxMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMTExIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzExMSIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMmEyYTJhIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')] bg-repeat opacity-20"></div>
                  
                  {/* The Subject Only - Processed image */}
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Processed"
                  />

                  {/* Original Image (Overlay) */}
                  <div 
                    ref={overlayRef}
                    className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-ps-blue shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20"
                    style={{ width: `${overlayWidth}%`, transition: isDragging ? 'none' : 'width 0.1s ease-out' }}
                  >
                    <img 
                      ref={overlayImgRef}
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      className="absolute top-0 left-0 h-full object-cover" 
                      style={{ 
                        width: containerRef.current ? `${containerRef.current.offsetWidth}px` : 'auto',
                        maxWidth: 'none',
                        height: '100%'
                      }}
                      alt="Original"
                      draggable={false}
                    />
                  </div>

                  {/* Floating Labels */}
                  <div className="absolute bottom-4 left-4 z-30 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-gray-300 border border-white/10 shadow-lg pointer-events-none">
                    Layer 0 (Original)
                  </div>
                  <div className="absolute bottom-4 right-4 z-10 px-2 py-1 rounded bg-ps-blue/90 text-[10px] font-mono text-white border border-white/10 shadow-lg pointer-events-none">
                    Mask Layer
                  </div>

                  {/* Drag Handle */}
                  <div 
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-transparent border-2 border-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center z-40 cursor-ew-resize pointer-events-auto"
                    style={{ 
                      left: `${overlayWidth}%`,
                      transition: isDragging ? 'none' : 'left 0.1s ease-out'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleTouchStart(e);
                    }}
                  >
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>

                </div>
                
                {/* Tool Panel Simulation */}
                <div className="bg-[#252525] p-2 flex justify-between items-center rounded-b-lg border-t border-ps-base">
                  <div className="flex space-x-4 px-2">
                    <span className="text-gray-500 hover:text-white cursor-pointer text-xs">✋</span>
                    <span className="text-gray-500 hover:text-white cursor-pointer text-xs">🔍</span>
                    <span className="text-gray-500 hover:text-white cursor-pointer text-xs">✂️</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">Doc: 12.5M/24.1M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 relative z-10 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Why Choose Backdrop?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built with a robust tech stack for reliable, high-volume image processing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-ps-panel p-8 rounded hover:bg-[#252525] transition-all border border-[#2a2a2a] group">
              <div className="w-12 h-12 rounded bg-ps-blueDark flex items-center justify-center mb-6 text-ps-blue group-hover:scale-105 transition-transform border border-ps-blue/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Lightning Fast</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Optimized algorithms ensure your workflow is never interrupted. Process images instantly without lag.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-ps-panel p-8 rounded hover:bg-[#252525] transition-all border border-[#2a2a2a] group">
              <div className="w-12 h-12 rounded bg-ps-blueDark flex items-center justify-center mb-6 text-ps-blue group-hover:scale-105 transition-transform border border-ps-blue/20">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Live Preview</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Compare original and processed layers side-by-side. Ensure mask perfection before export.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-ps-panel p-8 rounded hover:bg-[#252525] transition-all border border-[#2a2a2a] group">
              <div className="w-12 h-12 rounded bg-ps-blueDark flex items-center justify-center mb-6 text-ps-blue group-hover:scale-105 transition-transform border border-ps-blue/20">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Secure Processing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Enterprise-grade privacy. Images are processed in memory and discarded immediately after session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Interface Simulation / CTA */}
      <section id="app" className="py-24 relative overflow-hidden bg-ps-base">
        <div className="absolute inset-0 bg-gradient-to-b from-ps-base to-[#0d0d0d]"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-ps-panel rounded-lg overflow-hidden shadow-2xl border border-[#333]">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Start your project.</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Compatible with PNG, JPG, and WebP. Ideal for e-commerce, composites, and design assets.
              </p>
              
              <Link to="/app">
                <div className="border-2 border-dashed border-[#333] rounded p-12 bg-[#161616] hover:border-ps-blue hover:bg-[#1a1a1a] transition-all cursor-pointer group mb-8">
                  <div className="flex flex-col items-center">
                    <Sparkles className="w-12 h-12 text-gray-600 mb-4 group-hover:text-ps-blue transition-colors" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">Drag & Drop images here</h3>
                    <p className="text-xs text-gray-500 font-mono">Max File Size: 12MB</p>
                    <button className="mt-6 px-6 py-2 rounded bg-[#333] text-white font-medium text-sm group-hover:bg-ps-blue transition-colors">
                      Browse Disk
                    </button>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest">
                <span>⚡</span> Powered by Remove.bg API
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Ticker */}
      <div className="border-y border-[#222] bg-[#161616] py-8 overflow-hidden">
        <div className="flex gap-12 justify-center items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-70 transition-all duration-500">
          <div className="flex items-center gap-2"><span className="text-2xl">⚛️</span> <span className="font-bold">React 18</span></div>
          <div className="flex items-center gap-2"><span className="text-2xl">📘</span> <span className="font-bold">TypeScript</span></div>
          <div className="flex items-center gap-2"><span className="text-2xl">🎨</span> <span className="font-bold">Tailwind</span></div>
          <div className="flex items-center gap-2"><span className="text-2xl">⚡</span> <span className="font-bold">Vite</span></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-[#0f0f0f] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded bg-ps-blueDark border border-ps-blue flex items-center justify-center">
              <span className="text-ps-blue font-bold text-[10px]">Bd</span>
            </div>
            <span className="text-lg font-bold text-gray-300">Backdrop</span>
          </div>
          
          <div className="text-xs text-gray-600 font-mono">
            &copy; 2026 Backdrop Project. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/Mo-Shakib/bg-remover" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
