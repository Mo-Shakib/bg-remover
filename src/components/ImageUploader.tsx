import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, disabled = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Clear any previous errors
    setError(null);

    // Handle rejected files
    if (rejectedFiles && rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors) {
        const error = rejection.errors[0];
        if (error.code === 'file-too-large') {
          setError('File is too large. Maximum size is 12MB.');
        } else if (error.code === 'file-invalid-type') {
          setError('Invalid file type. Please upload JPG, PNG, or WebP images only.');
        } else {
          setError('File rejected. Please try another image.');
        }
      }
      return;
    }

    // Handle accepted files
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      // Validate file size one more time
      if (file.size > 12 * 1024 * 1024) {
        setError('File is too large. Maximum size is 12MB.');
        return;
      }
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
        setError('Invalid file type. Please upload JPG, PNG, or WebP images only.');
        return;
      }
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const onDropRejected = useCallback((rejectedFiles: any[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors) {
        const error = rejection.errors[0];
        if (error.code === 'file-too-large') {
          setError('File is too large. Maximum size is 12MB.');
        } else if (error.code === 'file-invalid-type') {
          setError('Invalid file type. Please upload JPG, PNG, or WebP images only.');
        } else {
          setError('File rejected. Please try another image.');
        }
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 12 * 1024 * 1024, // 12MB
    multiple: false,
    disabled,
    noClick: disabled,
    noKeyboard: disabled,
  });

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!disabled) {
      open();
    }
  };

  // Clear error after 5 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="w-full h-full">
      <div 
        {...getRootProps()} 
        className={`
          h-full min-h-[300px] border-2 border-dashed rounded
          flex flex-col items-center justify-center p-12 transition-all duration-300
          ${disabled 
            ? 'cursor-not-allowed opacity-50' 
            : 'cursor-pointer'
          }
          ${isDragActive 
            ? 'border-ps-blue bg-ps-blue/10 scale-102' 
            : error
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-[#333] bg-[#161616] hover:border-ps-blue hover:bg-[#1a1a1a]'
          }
        `}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        <div className="flex flex-col items-center text-center w-full">
          {error ? (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mb-6">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-red-400">
                Upload Error
              </h3>
              <p className="text-sm text-red-300 font-mono mb-6 max-w-md">
                {error}
              </p>
              <button 
                type="button"
                onClick={handleButtonClick}
                disabled={disabled}
                className="px-6 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Try Again
              </button>
            </>
          ) : isDragActive ? (
            <>
              <Upload 
                size={56} 
                className="text-ps-blue mb-4 animate-bounce" 
              />
              <p className="text-lg font-semibold text-ps-blue">
                Drop to remove background
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-ps-blue/10 border-2 border-ps-blue/30 flex items-center justify-center mb-6 group-hover:bg-ps-blue/20 group-hover:border-ps-blue/50 transition-all">
                <Upload 
                  size={32} 
                  className="text-ps-blue transition-colors" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-200">
                Drag & Drop images here
              </h3>
              <p className="text-sm text-gray-400 font-mono mb-8">
                or click to browse • Max 12MB • JPG/PNG/WebP
              </p>
              <button 
                type="button"
                onClick={handleButtonClick}
                disabled={disabled}
                className="px-8 py-3 rounded-lg bg-ps-blue text-white font-semibold text-sm hover:bg-[#2b97e6] transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
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