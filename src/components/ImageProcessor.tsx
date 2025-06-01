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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary-light via-purple-500 to-primary-light bg-clip-text text-transparent">
          Remove Image Background
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          100% automatic and free. Remove background from images in 5 seconds.
        </p>

        {/* Hero Image Showcase */}
        <div className="relative w-full max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden">
          <div className="aspect-[16/9] relative">
            {/* Original Image (Left Side) */}
            <div className="absolute inset-0 bg-[#E4D1D6]">
              <img
                src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Original product"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Processed Image (Right Side) */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIxMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmZmZmIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZmZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')]">
              <img
                src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Processed product"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Divider Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/80 transform -translate-x-1/2 z-10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-light to-purple-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-card-dark rounded-2xl p-8 shadow-card dark:shadow-card-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent dark:from-primary-dark/5"></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold mb-6">
                Upload Image
              </h2>
              {imageData.isProcessing && <ProcessingOverlay />}
              {imageData.error ? (
                <ErrorDisplay message={imageData.error} onRetry={resetProcess} />
              ) : (
                <ImageUploader onImageSelect={handleImageSelect} />
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-card-dark rounded-2xl p-8 shadow-card dark:shadow-card-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent dark:from-primary-dark/5"></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold mb-6">
                Result
              </h2>
              {imageData.processed ? (
                <ImagePreview imageData={imageData} onReset={resetProcess} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Your processed image will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageProcessor;