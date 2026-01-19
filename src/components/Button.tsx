import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  disabled = false,
  className = '',
}) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const typeClasses = {
    primary: "bg-ps-blue text-white hover:bg-[#2b97e6] hover:shadow-button-hover hover:scale-102",
    secondary: "border-2 border-[#333] bg-[#2a2a2a] text-gray-300 hover:bg-[#333] hover:scale-102"
  };
  
  const disabledClasses = "opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${typeClasses[type]} 
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;