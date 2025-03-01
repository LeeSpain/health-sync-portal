
import React from 'react';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/GlassCard';

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    image: string;
    nextAppointment: string;
    nextAppointmentTime: string;
    location: string;
    phone: string;
    status: 'active' | 'pending' | 'completed';
  };
  className?: string;
}

const ClientCard = ({ client, className }: ClientCardProps) => {
  // Status badge styling
  const statusStyles = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  };

  return (
    <GlassCard 
      className={cn('transition-all duration-300 hover:shadow-md', className)}
      hoverEffect
    >
      <div className="flex items-start space-x-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <img 
            src={client.image} 
            alt={client.name} 
            className="h-full w-full object-cover rounded-full border-2 border-white shadow-sm"
          />
          <span 
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
              client.status === 'active' ? 'bg-green-500' : 
              client.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {client.name}
            </h3>
            <span 
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                statusStyles[client.status]
              )}
            >
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </span>
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-500" />
              <span>{client.nextAppointment}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-500" />
              <span>{client.nextAppointmentTime}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-500" />
              <span className="truncate">{client.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-500" />
              <span>{client.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
        <button className="text-sm font-medium text-nurse-600 hover:text-nurse-700 dark:text-nurse-400 dark:hover:text-nurse-300 transition-colors">
          View Details
        </button>
        <button className="text-sm font-medium text-nurse-600 hover:text-nurse-700 dark:text-nurse-400 dark:hover:text-nurse-300 transition-colors">
          Message
        </button>
      </div>
    </GlassCard>
  );
};

export default ClientCard;
