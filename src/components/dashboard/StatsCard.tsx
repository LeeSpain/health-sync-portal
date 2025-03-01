
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  className,
}: StatsCardProps) => {
  return (
    <GlassCard className={cn('', className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {value}
          </h3>
          
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  'text-xs font-medium flex items-center',
                  trend.isPositive 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                <svg 
                  className={cn(
                    'h-3 w-3 mr-1',
                    trend.isPositive ? 'rotate-0' : 'rotate-180'
                  )}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
                {trend.value}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                vs. last month
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-nurse-100 to-nurse-200 dark:from-nurse-900/30 dark:to-nurse-800/30 p-3 rounded-xl">
          <Icon className="h-6 w-6 text-nurse-600 dark:text-nurse-400" />
        </div>
      </div>
    </GlassCard>
  );
};

export default StatsCard;
