
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Plus, RefreshCw } from 'lucide-react';

interface EmptyShiftsProps {
  isFiltered: boolean;
  onAddShift: () => void;
}

const EmptyShifts: React.FC<EmptyShiftsProps> = ({ isFiltered, onAddShift }) => {
  return (
    <GlassCard className="text-center py-12">
      <RefreshCw className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No shifts found</h3>
      <p className="text-gray-500 mb-6">
        {isFiltered 
          ? "No shifts match your current filters."
          : "No shifts have been scheduled yet."
        }
      </p>
      <Button onClick={onAddShift}>
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Shift
      </Button>
    </GlassCard>
  );
};

export default EmptyShifts;
