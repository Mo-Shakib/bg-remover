import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 bg-red-900/30 rounded-full border border-red-800/50">
        <AlertTriangle size={32} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-200">Error Processing Image</h3>
      <p className="text-gray-400 mb-6 max-w-md text-sm">
        {message}
      </p>
      <button 
        onClick={onRetry}
        className="px-6 py-2 rounded bg-ps-blue text-white font-semibold text-sm hover:bg-[#2b97e6] transition-all shadow-lg shadow-blue-500/20"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;