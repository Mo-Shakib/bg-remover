import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image } from 'lucide-react';
import Button from './Button';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="w-full h-full">
      <div 
        {...getRootProps()} 
        className={`
          h-full min-h-[300px] border-2 border-dashed rounded-xl
          flex flex-col items-center justify-center p-8 transition-all duration-300
          ${isDragActive 
            ? 'border-primary-light bg-primary-light/5 dark:border-primary-dark dark:bg-primary-dark/5 scale-102' 
            : 'border-gray-200 dark:border-gray-700 hover:border-primary-light dark:hover:border-primary-dark hover:scale-101'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center">
          {isDragActive ? (
            <>
              <Upload 
                size={48} 
                className="text-primary-light dark:text-primary-dark mb-4 animate-bounce" 
              />
              <p className="text-xl font-semibold text-primary-light dark:text-primary-dark">
                Drop to remove background
              </p>
            </>
          ) : (
            <>
              <Image 
                size={48} 
                className="text-primary-light/60 dark:text-primary-dark/60 mb-4" 
              />
              <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Drop your image here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                or click to upload • JPEG/PNG up to 10MB
              </p>
              <Button type="primary">
                Choose Image
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;