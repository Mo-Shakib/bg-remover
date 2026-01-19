import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

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
          h-full min-h-[300px] border-2 border-dashed rounded
          flex flex-col items-center justify-center p-12 transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? 'border-ps-blue bg-ps-blue/10 scale-102' 
            : 'border-[#333] bg-[#161616] hover:border-ps-blue hover:bg-[#1a1a1a]'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center">
          {isDragActive ? (
            <>
              <Upload 
                size={48} 
                className="text-ps-blue mb-4 animate-bounce" 
              />
              <p className="text-lg font-semibold text-ps-blue">
                Drop to remove background
              </p>
            </>
          ) : (
            <>
              <Upload 
                size={48} 
                className="text-gray-600 mb-4 group-hover:text-ps-blue transition-colors" 
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Drag & Drop images here
              </h3>
              <p className="text-xs text-gray-500 font-mono mb-6">
                Max File Size: 12MB
              </p>
              <button className="px-6 py-2 rounded bg-[#333] text-white font-medium text-sm hover:bg-ps-blue transition-colors">
                Browse Disk
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;