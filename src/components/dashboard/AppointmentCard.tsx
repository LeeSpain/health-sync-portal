
import React from 'react';
import { Clock, MapPin, User, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/GlassCard';

interface AppointmentCardProps {
  appointment: {
    id: string;
    clientName: string;
    clientImage: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
    serviceType: string;
  };
  className?: string;
}

const AppointmentCard = ({ appointment, className }: AppointmentCardProps) => {
  // Status styles
  const statusStyles = {
    'upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  // Status text
  const statusText = {
    'upcoming': 'Upcoming',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
  };

  return (
    <GlassCard 
      className={cn('transition-all duration-300 hover:shadow-md', className)}
      hoverEffect
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-4">
        <span 
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            statusStyles[appointment.status]
          )}
        >
          {statusText[appointment.status]}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {appointment.serviceType}
        </span>
      </div>

      {/* Client Info */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 mr-3">
          <img 
            src={appointment.clientImage} 
            alt={appointment.clientName} 
            className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 text-gray-500 mr-1" />
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {appointment.clientName}
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-2">
        <div className="flex items-start">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Date & Time</p>
            <p className="text-sm text-gray-900 dark:text-white">
              {appointment.date}, {appointment.startTime} - {appointment.endTime}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
            <p className="text-sm text-gray-900 dark:text-white">
              {appointment.location}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {appointment.status === 'upcoming' && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-2">
          <button 
            className="flex items-center justify-center px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400"
          >
            <Check className="h-4 w-4 mr-1" />
            Confirm
          </button>
          <button 
            className="flex items-center justify-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </button>
        </div>
      )}

      {appointment.status === 'in-progress' && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            className="w-full flex items-center justify-center px-3 py-1.5 bg-nurse-50 hover:bg-nurse-100 text-nurse-700 rounded-lg text-sm font-medium transition-colors dark:bg-nurse-900/20 dark:hover:bg-nurse-900/30 dark:text-nurse-400"
          >
            Complete Appointment
          </button>
        </div>
      )}

      {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            className="w-full flex items-center justify-center px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
          >
            View Details
          </button>
        </div>
      )}
    </GlassCard>
  );
};

export default AppointmentCard;
