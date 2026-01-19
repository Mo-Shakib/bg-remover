import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const ProcessingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-ps-base/95 backdrop-blur-md flex flex-col items-center justify-center z-20 rounded">
      <div className="bg-ps-panel/90 border border-ps-blue/30 rounded-lg p-8 shadow-2xl">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-sm font-semibold text-ps-blue animate-pulse font-mono">
          Processing mask...
        </p>
        <p className="mt-2 text-xs text-gray-400 font-mono">
          Please wait
        </p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;