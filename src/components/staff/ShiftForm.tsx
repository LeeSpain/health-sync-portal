
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash, Save } from 'lucide-react';
import { StaffMember, Client, VisitType, Shift } from '@/types/staff';

interface ShiftFormProps {
  isEditing: boolean;
  currentShift: Partial<Shift> | null;
  isSubmitting: boolean;
  staff: StaffMember[];
  clients: Client[];
  visitTypes: VisitType[];
  onCancel: () => void;
  onDelete?: (shiftId: string) => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (field: string, value: string) => void;
}

const ShiftForm: React.FC<ShiftFormProps> = ({
  isEditing,
  currentShift,
  isSubmitting,
  staff,
  clients,
  visitTypes,
  onCancel,
  onDelete,
  onSubmit,
  onInputChange,
  onSelectChange
}) => {
  if (!currentShift) return null;

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Shift" : "Add New Shift"}</DialogTitle>
        <DialogDescription>
          {isEditing ? "Update the shift details below." : "Create a new shift by filling in the details below."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="staffId">Staff Member *</Label>
            <Select 
              value={currentShift.staffId || ""} 
              onValueChange={(value) => onSelectChange('staffId', value)}
            >
              <SelectTrigger id="staffId">
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                {staff.map(staff => (
                  <SelectItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientId">Client *</Label>
            <Select 
              value={currentShift.clientId || ""} 
              onValueChange={(value) => onSelectChange('clientId', value)}
            >
              <SelectTrigger id="clientId">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input 
              id="date" 
              type="date" 
              value={currentShift.date || ""}
              onChange={onInputChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeStart">Start Time *</Label>
            <Input 
              id="timeStart" 
              type="time" 
              value={currentShift.timeStart || ""}
              onChange={onInputChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeEnd">End Time *</Label>
            <Input 
              id="timeEnd" 
              type="time" 
              value={currentShift.timeEnd || ""}
              onChange={onInputChange}
              required 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="visitType">Visit Type *</Label>
          <Select 
            value={currentShift.visitType || ""} 
            onValueChange={(value) => onSelectChange('visitType', value)}
          >
            <SelectTrigger id="visitType">
              <SelectValue placeholder="Select visit type" />
            </SelectTrigger>
            <SelectContent>
              {visitTypes.map(type => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            placeholder="Add any notes for this shift" 
            rows={3}
            value={currentShift.notes || ""}
            onChange={onInputChange}
          />
        </div>
      </div>
      <DialogFooter className={isEditing ? "flex justify-between items-center" : ""}>
        {isEditing && onDelete && (
          <Button 
            variant="destructive" 
            onClick={() => currentShift.id && onDelete(currentShift.id)}
            disabled={isSubmitting}
          >
            <Trash className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Removing...' : 'Remove Shift'}
          </Button>
        )}
        <div className={isEditing ? "" : "w-full flex justify-end"}>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className={isEditing ? "mr-2" : ""}
          >
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isEditing && <Save className="h-4 w-4 mr-2" />}
            {isSubmitting 
              ? isEditing ? 'Updating...' : 'Adding...' 
              : isEditing ? 'Update Shift' : 'Add Shift'
            }
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default ShiftForm;
