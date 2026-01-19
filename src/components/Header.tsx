import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between glass-panel rounded-md px-6 py-3 border border-white/5">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded bg-ps-blueDark border border-ps-blue flex items-center justify-center shadow-ps-blue">
              <span className="text-ps-blue font-bold text-xs">Bd</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Backdrop</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 rounded-full transition-all duration-300 hover:bg-ps-panel flex items-center gap-2 text-sm text-gray-400 hover:text-ps-blue"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;