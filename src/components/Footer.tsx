import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-card-dark shadow-sm page-transition mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Innovas AI. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a 
              href="#" 
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a 
              href="#" 
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;