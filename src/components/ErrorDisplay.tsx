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
      <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
        <AlertTriangle size={32} className="text-error-light dark:text-error-dark" />
      </div>
      <h3 className="text-lg font-medium mb-2">Error Processing Image</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message}
      </p>
      <Button type="primary" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
};

export default ErrorDisplay;