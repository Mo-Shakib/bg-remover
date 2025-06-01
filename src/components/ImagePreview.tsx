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
      <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden transparent-bg flex-1">
        {imageData.processed && (
          <img 
            src={imageData.processed} 
            alt="Processed image with transparent background" 
            className="w-full h-full object-contain" 
          />
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-between">
        <Button type="secondary" onClick={onReset} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Try Another
        </Button>
        <Button 
          type="primary" 
          onClick={handleDownload} 
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Download PNG
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;