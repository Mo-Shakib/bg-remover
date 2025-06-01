import React from 'react';
import { ImageOff } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-card-dark shadow-sm page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <ImageOff size={24} className="text-primary-light dark:text-primary-dark mr-2" />
            <h1 className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark">
              Innovas AI BG Remover
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;