
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  className = '',
  direction = 'up'
}: FadeInProps) => {
  
  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-4';
      case 'down':
        return '-translate-y-4';
      case 'left':
        return 'translate-x-4';
      case 'right':
        return '-translate-x-4';
      default:
        return 'translate-y-4';
    }
  };
  
  return (
    <div 
      className={cn(
        'opacity-0 transform transition-all duration-700 ease-out',
        getDirectionClass(),
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationName: 'fadeIn',
        animationDuration: '700ms',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
