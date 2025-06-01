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
    primary: "bg-gradient-to-r from-primary-light to-purple-500 text-white hover:shadow-button-hover hover:scale-102 dark:from-primary-dark dark:to-purple-400",
    secondary: "border-2 border-primary-light text-primary-light hover:bg-primary-light/5 hover:scale-102 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark/5"
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