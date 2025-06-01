export interface ImageData {
  file?: File;
  preview?: string;
  processed?: string;
  isProcessing?: boolean;
  error?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}