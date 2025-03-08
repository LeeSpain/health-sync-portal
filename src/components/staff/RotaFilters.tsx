
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { StaffMember, DayOption } from '@/types/staff';

interface RotaFiltersProps {
  selectedDay: string;
  selectedStaff: string;
  days: DayOption[];
  staff: StaffMember[];
  onDayChange: (value: string) => void;
  onStaffChange: (value: string) => void;
}

const RotaFilters: React.FC<RotaFiltersProps> = ({
  selectedDay, 
  selectedStaff, 
  days, 
  staff, 
  onDayChange, 
  onStaffChange
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2">
        <Label htmlFor="dayFilter">Filter by Day</Label>
        <Select value={selectedDay} onValueChange={onDayChange}>
          <SelectTrigger id="dayFilter" className="mt-1">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Days</SelectItem>
            {days.map(day => (
              <SelectItem key={day.value} value={day.value}>
                {day.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-1/2">
        <Label htmlFor="staffFilter">Filter by Staff</Label>
        <Select value={selectedStaff} onValueChange={onStaffChange}>
          <SelectTrigger id="staffFilter" className="mt-1">
            <SelectValue placeholder="Select staff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Staff</SelectItem>
            {staff.map(member => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RotaFilters;
