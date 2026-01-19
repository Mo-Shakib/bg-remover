import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const ProcessingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-ps-base/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-sm font-medium text-gray-300 animate-pulse font-mono">
        Processing mask...
      </p>
    </div>
  );
};

export default ProcessingOverlay;