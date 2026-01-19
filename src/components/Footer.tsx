import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#0f0f0f] border-t border-[#1a1a1a] mt-8">
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
          <a 
            href="https://github.com/Mo-Shakib/bg-remover" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;