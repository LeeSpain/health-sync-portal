
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui/GlassCard';
import { Calendar, Clock, MapPin, Pencil } from 'lucide-react';
import { Shift } from '@/types/staff';

interface ShiftCardProps {
  shift: Shift;
  onEdit: (shift: Shift) => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onEdit }) => {
  return (
    <GlassCard className="overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-nurse-500 mr-2" />
          <span className="font-medium">{shift.date}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onEdit(shift)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <img 
              src={shift.staffImage} 
              alt={shift.staffName}
              className="h-8 w-8 rounded-full object-cover mr-2" 
            />
            <div>
              <h4 className="font-medium">{shift.staffName}</h4>
            </div>
          </div>
          <Badge className="mb-2">{shift.visitType}</Badge>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span>{shift.timeStart} - {shift.timeEnd}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center mb-2">
            <img 
              src={shift.clientImage} 
              alt={shift.clientName}
              className="h-8 w-8 rounded-full object-cover mr-2" 
            />
            <div>
              <h4 className="font-medium">{shift.clientName}</h4>
            </div>
          </div>
          <div className="flex items-start text-sm text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
            <span>{shift.location}</span>
          </div>
          {shift.notes && (
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-2">
              "{shift.notes}"
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ShiftCard;
