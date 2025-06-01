import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const ProcessingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-lg font-medium animate-pulse">
        Removing background...
      </p>
    </div>
  );
};

export default ProcessingOverlay;