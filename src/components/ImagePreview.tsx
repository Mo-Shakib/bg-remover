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
    <div className="w-full flex flex-col">
      <div className="relative w-full min-h-[300px] max-h-[500px] rounded overflow-hidden transparent-bg bg-[#161616] border border-[#222] mb-6">
        {imageData.processed && (
          <img 
            src={imageData.processed} 
            alt="Processed image with transparent background" 
            className="w-full h-full max-h-[500px] object-contain" 
          />
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-between items-stretch sm:items-center mt-auto">
        <button 
          onClick={onReset} 
          className="px-6 py-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333] border border-white/10 text-gray-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:border-white/20 hover:scale-105 active:scale-100"
        >
          <ArrowLeft size={18} />
          Try Another
        </button>
        <button 
          onClick={handleDownload} 
          className="px-8 py-3 rounded-lg bg-ps-blue text-white font-semibold text-sm hover:bg-[#2b97e6] transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 hover:scale-105 active:scale-100"
        >
          <Download size={18} />
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;