
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ 
  children, 
  className = '',
  hoverEffect = false 
}: GlassCardProps) => {
  return (
    <div 
      className={cn(
        'relative rounded-2xl glass-effect p-6 overflow-hidden',
        hoverEffect && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
