
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Shift, StaffMember, Client, VisitType } from '@/types/staff';
import ShiftCard from '@/components/staff/ShiftCard';
import EmptyShifts from '@/components/staff/EmptyShifts';
import RotaFilters from '@/components/staff/RotaFilters';
import ShiftForm from '@/components/staff/ShiftForm';
import { ArrowLeft, Plus } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

interface RotaContainerProps {
  mockStaff: StaffMember[];
  mockClients: Client[];
  mockRota: Shift[];
  visitTypes: VisitType[];
  nextSevenDays: { value: string; label: string }[];
}

const RotaContainer: React.FC<RotaContainerProps> = ({ 
  mockStaff, 
  mockClients, 
  mockRota, 
  visitTypes, 
  nextSevenDays 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddingShift, setIsAddingShift] = useState(false);
  const [isEditingShift, setIsEditingShift] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState('all');
  const [rota, setRota] = useState(mockRota);
  
  // New shift form state
  const [newShift, setNewShift] = useState<Partial<Shift>>({
    staffId: '',
    clientId: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    visitType: '',
    notes: ''
  });
  
  // Selected shift for editing
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  
  // Filter rota based on selected day and staff
  const filteredRota = rota.filter(shift => {
    const dayMatch = selectedDay === 'all' || shift.date === selectedDay;
    const staffMatch = selectedStaff === 'all' || shift.staffId === selectedStaff;
    return dayMatch && staffMatch;
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (isEditingShift && currentShift) {
      setCurrentShift(prev => prev ? { ...prev, [id]: value } : null);
    } else {
      setNewShift(prev => ({ ...prev, [id]: value }));
    }
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (isEditingShift && currentShift) {
      setCurrentShift(prev => prev ? { ...prev, [field]: value } : null);
    } else {
      setNewShift(prev => ({ ...prev, [field]: value }));
      
      // If client is selected, set the location from client data
      if (field === 'clientId') {
        const selectedClient = mockClients.find(client => client.id === value);
        if (selectedClient) {
          setNewShift(prev => ({ ...prev, location: selectedClient.address }));
        }
      }
    }
  };
  
  const handleAddShift = () => {
    setIsSubmitting(true);
    
    // Validate form
    if (!newShift.staffId || !newShift.clientId || !newShift.date || !newShift.timeStart || !newShift.timeEnd || !newShift.visitType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Get staff and client details to add to the new shift
    const staff = mockStaff.find(s => s.id === newShift.staffId);
    const client = mockClients.find(c => c.id === newShift.clientId);
    
    if (!staff || !client) {
      toast({
        title: "Error",
        description: "Selected staff or client not found",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Create new shift
    const shift: Shift = {
      id: Date.now().toString(),
      staffId: newShift.staffId!,
      staffName: staff.name,
      staffImage: staff.image,
      clientId: newShift.clientId!,
      clientName: client.name,
      clientImage: client.image,
      date: newShift.date!,
      timeStart: newShift.timeStart!,
      timeEnd: newShift.timeEnd!,
      visitType: newShift.visitType!,
      location: client.address,
      notes: newShift.notes || ''
    };
    
    // In a real app, this would be an API call to create a new shift
    setTimeout(() => {
      setRota([...rota, shift]);
      setNewShift({
        staffId: '',
        clientId: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        visitType: '',
        notes: ''
      });
      setIsAddingShift(false);
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Shift has been added to the rota.",
      });
    }, 1000);
  };
  
  const handleEditShift = (shift: Shift) => {
    setCurrentShift(shift);
    setIsEditingShift(true);
  };
  
  const handleUpdateShift = () => {
    setIsSubmitting(true);
    
    if (!currentShift) {
      setIsSubmitting(false);
      return;
    }
    
    // Validate form
    if (!currentShift.staffId || !currentShift.clientId || !currentShift.date || !currentShift.timeStart || !currentShift.timeEnd || !currentShift.visitType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, this would be an API call to update the shift
    setTimeout(() => {
      const updatedRota = rota.map(shift => 
        shift.id === currentShift.id ? currentShift : shift
      );
      setRota(updatedRota);
      setIsEditingShift(false);
      setCurrentShift(null);
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Shift has been updated.",
      });
    }, 1000);
  };
  
  const handleDeleteShift = (shiftId: string) => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to delete the shift
    setTimeout(() => {
      const updatedRota = rota.filter(shift => shift.id !== shiftId);
      setRota(updatedRota);
      setIsEditingShift(false);
      setCurrentShift(null);
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Shift has been removed from the rota.",
      });
    }, 1000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Rota</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage staff schedules and client visits</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/staff')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff
            </Button>
            <Dialog open={isAddingShift} onOpenChange={setIsAddingShift}>
              <DialogTrigger asChild>
                <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shift
                </Button>
              </DialogTrigger>
              <ShiftForm
                isEditing={false}
                currentShift={newShift}
                isSubmitting={isSubmitting}
                staff={mockStaff}
                clients={mockClients}
                visitTypes={visitTypes}
                onCancel={() => setIsAddingShift(false)}
                onSubmit={handleAddShift}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
              />
            </Dialog>
            
            <Dialog open={isEditingShift} onOpenChange={setIsEditingShift}>
              <ShiftForm
                isEditing={true}
                currentShift={currentShift}
                isSubmitting={isSubmitting}
                staff={mockStaff}
                clients={mockClients}
                visitTypes={visitTypes}
                onCancel={() => setIsEditingShift(false)}
                onDelete={handleDeleteShift}
                onSubmit={handleUpdateShift}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
              />
            </Dialog>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <RotaFilters
          selectedDay={selectedDay}
          selectedStaff={selectedStaff}
          days={nextSevenDays}
          staff={mockStaff}
          onDayChange={setSelectedDay}
          onStaffChange={setSelectedStaff}
        />
      </FadeIn>
      
      <FadeIn delay={200}>
        {filteredRota.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRota.map((shift) => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                onEdit={handleEditShift}
              />
            ))}
          </div>
        ) : (
          <EmptyShifts
            isFiltered={selectedDay !== 'all' || selectedStaff !== 'all'}
            onAddShift={() => setIsAddingShift(true)}
          />
        )}
      </FadeIn>
    </div>
  );
};

export default RotaContainer;
