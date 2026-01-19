import React from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import Button from './Button';
import { downloadProcessedImage } from '../api/removeBgApi';
import { ImageData } from '../types';

interface ImagePreviewProps {
  imageData: ImageData;
  onReset: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageData, onReset }) => {
  const handleDownload = () => {
    if (imageData.processed && imageData.file) {
      downloadProcessedImage(imageData.processed, imageData.file.name);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full h-full min-h-[300px] rounded overflow-hidden transparent-bg flex-1 bg-[#161616] border border-[#222]">
        {imageData.processed && (
          <img 
            src={imageData.processed} 
            alt="Processed image with transparent background" 
            className="w-full h-full object-contain" 
          />
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-6 justify-center sm:justify-between">
        <button 
          onClick={onReset} 
          className="px-6 py-2 rounded bg-[#2a2a2a] hover:bg-[#333] border border-white/5 text-gray-300 font-medium text-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Try Another
        </button>
        <button 
          onClick={handleDownload} 
          className="px-6 py-2 rounded bg-ps-blue text-white font-semibold text-sm hover:bg-[#2b97e6] transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <Download size={16} />
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;