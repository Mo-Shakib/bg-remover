import React, { useState } from 'react';
import { Key } from 'lucide-react';
import Button from './Button';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  error?: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit, error }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('removebg_api_key') || '';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('removebg_api_key', apiKey.trim());
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="bg-card-light dark:bg-card-dark shadow-card dark:shadow-card-dark rounded-lg p-6 max-w-md mx-auto w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Key size={24} className="text-primary-light dark:text-primary-dark" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-center">Enter your Remove.bg API Key</h2>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
          To use this tool, you need an API key from Remove.bg.
          You can get one by signing up at <a href="https://www.remove.bg/api" target="_blank" rel="noopener noreferrer" className="text-primary-light dark:text-primary-dark underline">remove.bg</a>.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Remove.bg API key"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              required
            />
          </div>
          <Button type="primary" className="w-full">
            Save and Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyInput;