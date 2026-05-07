import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

const Skeleton = ({ className = '', variant = 'rectangular' }: SkeletonProps) => {
  const baseStyles = 'animate-shimmer';
  
  const variantStyles = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-2xl',
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
