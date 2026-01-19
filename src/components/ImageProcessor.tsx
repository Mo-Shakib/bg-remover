import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import ImagePreview from './ImagePreview';
import ProcessingOverlay from './ProcessingOverlay';
import ErrorDisplay from './ErrorDisplay';
import { removeBackground } from '../api/removeBgApi';
import { ImageData } from '../types';

const ImageProcessor: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData>({});

  useEffect(() => {
    return () => {
      if (imageData.preview) URL.revokeObjectURL(imageData.preview);
      if (imageData.processed) URL.revokeObjectURL(imageData.processed);
    };
  }, []);

  const handleImageSelect = async (file: File) => {
    if (imageData.preview) URL.revokeObjectURL(imageData.preview);
    if (imageData.processed) URL.revokeObjectURL(imageData.processed);
    
    const previewUrl = URL.createObjectURL(file);
    
    setImageData({
      file,
      preview: previewUrl,
      isProcessing: true,
    });
    
    try {
      const processedImageUrl = await removeBackground(file);
      setImageData(prev => ({
        ...prev,
        processed: processedImageUrl,
        isProcessing: false,
      }));
    } catch (error) {
      console.error('Error processing image:', error);
      
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setImageData(prev => ({
        ...prev,
        error: errorMessage,
        isProcessing: false,
      }));
    }
  };

  const resetProcess = () => {
    if (imageData.preview) URL.revokeObjectURL(imageData.preview);
    if (imageData.processed) URL.revokeObjectURL(imageData.processed);
    setImageData({});
  };

  return (
    <div className="min-h-screen bg-ps-base py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Professional <span className="text-gradient">Background Removal</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload your image and get pixel-perfect transparency in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Panel */}
          <div className="bg-ps-panel rounded-lg p-8 shadow-2xl border border-[#333] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-200">Upload Image</h2>
              <div className="text-xs text-gray-500 font-mono">Layer 1</div>
            </div>
            {imageData.isProcessing && <ProcessingOverlay />}
            {imageData.error ? (
              <ErrorDisplay message={imageData.error} onRetry={resetProcess} />
            ) : (
              <ImageUploader onImageSelect={handleImageSelect} />
            )}
          </div>
          
          {/* Result Panel */}
          <div className="bg-ps-panel rounded-lg p-8 shadow-2xl border border-[#333] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-200">Result</h2>
              <div className="text-xs text-gray-500 font-mono">Mask Layer</div>
            </div>
            {imageData.processed ? (
              <ImagePreview imageData={imageData} onReset={resetProcess} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6 bg-[#161616] rounded border border-[#222]">
                <p className="text-gray-500 text-sm">
                  Your processed image will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageProcessor;