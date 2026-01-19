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
    // Clean up previous URLs
    if (imageData.preview) URL.revokeObjectURL(imageData.preview);
    if (imageData.processed) URL.revokeObjectURL(imageData.processed);
    
    // Validate file before processing
    if (!file) {
      setImageData(prev => ({
        ...prev,
        error: 'No file selected',
        isProcessing: false,
      }));
      return;
    }

    // Validate file size
    if (file.size > 12 * 1024 * 1024) {
      setImageData(prev => ({
        ...prev,
        error: 'File is too large. Maximum size is 12MB.',
        isProcessing: false,
      }));
      return;
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
      setImageData(prev => ({
        ...prev,
        error: 'Invalid file type. Please upload JPG, PNG, or WebP images only.',
        isProcessing: false,
      }));
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    
    setImageData({
      file,
      preview: previewUrl,
      isProcessing: true,
      error: undefined,
    });
    
    try {
      // Add timeout to prevent stuck uploads (60 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout. Please try again.')), 60000);
      });

      const processedImageUrl = await Promise.race([
        removeBackground(file),
        timeoutPromise
      ]) as string;

      setImageData(prev => ({
        ...prev,
        processed: processedImageUrl,
        isProcessing: false,
        error: undefined,
      }));
    } catch (error) {
      console.error('Error processing image:', error);
      
      // Clean up preview URL on error
      URL.revokeObjectURL(previewUrl);
      
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setImageData(prev => ({
        ...prev,
        error: errorMessage,
        isProcessing: false,
        preview: undefined,
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Upload Panel */}
          <div className="bg-ps-panel rounded-lg p-8 shadow-2xl border border-[#333] relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-200">Upload Image</h2>
              <div className="text-xs text-gray-500 font-mono px-2 py-1 bg-ps-blueDark/30 border border-ps-blue/20 rounded">
                Layer 1
              </div>
            </div>
            <div className="relative flex-1 flex flex-col min-h-0">
              {imageData.isProcessing && <ProcessingOverlay />}
              {imageData.error ? (
                <ErrorDisplay message={imageData.error} onRetry={resetProcess} />
              ) : (
                <ImageUploader 
                  onImageSelect={handleImageSelect} 
                  disabled={imageData.isProcessing}
                />
              )}
            </div>
          </div>
          
          {/* Result Panel */}
          <div className="bg-ps-panel rounded-lg p-8 shadow-2xl border border-[#333] relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-200">Result</h2>
              <div className="text-xs text-gray-500 font-mono px-2 py-1 bg-ps-blueDark/30 border border-ps-blue/20 rounded">
                Mask Layer
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              {imageData.processed ? (
                <ImagePreview imageData={imageData} onReset={resetProcess} />
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 min-h-[300px] text-center p-6 bg-[#161616] rounded border border-[#222]">
                  <div className="w-16 h-16 rounded-full bg-ps-blue/10 border-2 border-ps-blue/30 flex items-center justify-center mb-4">
                    <span className="text-ps-blue text-2xl">📷</span>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Your processed image will appear here
                  </p>
                  <p className="text-gray-500 text-xs mt-2 font-mono">
                    Upload an image to get started
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