
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Plus, Clock, User, Users, Pencil, MapPin, Save, Trash, RefreshCw } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/hooks/use-toast';

// Mock data for staff
const mockStaff = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Registered Nurse',
    image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'David Wilson',
    role: 'Care Assistant',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Grace Lee',
    role: 'Physiotherapist',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock data for clients
const mockClients = [
  {
    id: '1',
    name: 'Emma Thompson',
    address: '45 Oak Street, London, E1 6AW',
    careType: 'Daily Care',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'John Martinez',
    address: '12 Maple Avenue, London, NW3 2PL',
    careType: 'Medication Management',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Lisa Chen',
    address: '78 Pine Road, London, SE15 3RT',
    careType: 'Rehabilitation',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock data for rota
const mockRota = [
  {
    id: '1',
    staffId: '1',
    staffName: 'Sarah Johnson',
    staffImage: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '1',
    clientName: 'Emma Thompson',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-15',
    timeStart: '09:00',
    timeEnd: '11:00',
    visitType: 'Home Visit',
    location: '45 Oak Street, London, E1 6AW',
    notes: 'Regular check-up and medication management.'
  },
  {
    id: '2',
    staffId: '1',
    staffName: 'Sarah Johnson',
    staffImage: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '2',
    clientName: 'John Martinez',
    clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-13',
    timeStart: '14:00',
    timeEnd: '15:30',
    visitType: 'Medication Review',
    location: '12 Maple Avenue, London, NW3 2PL',
    notes: 'Medication review and blood pressure check.'
  },
  {
    id: '3',
    staffId: '2',
    staffName: 'David Wilson',
    staffImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '3',
    clientName: 'Lisa Chen',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-16',
    timeStart: '10:30',
    timeEnd: '12:00',
    visitType: 'Assistance',
    location: '78 Pine Road, London, SE15 3RT',
    notes: 'Assistance with daily activities and meal preparation.'
  },
  {
    id: '4',
    staffId: '3',
    staffName: 'Grace Lee',
    staffImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '3',
    clientName: 'Lisa Chen',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-18',
    timeStart: '13:00',
    timeEnd: '14:30',
    visitType: 'Physiotherapy',
    location: '78 Pine Road, London, SE15 3RT',
    notes: 'Regular physiotherapy session focusing on mobility exercises.'
  }
];

// Mock data for visit types
const visitTypes = [
  { id: '1', name: 'Home Visit' },
  { id: '2', name: 'Medication Review' },
  { id: '3', name: 'Physiotherapy' },
  { id: '4', name: 'Assistance' },
  { id: '5', name: 'Assessment' },
  { id: '6', name: 'Wellness Check' }
];

const StaffRota = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddingShift, setIsAddingShift] = useState(false);
  const [isEditingShift, setIsEditingShift] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState('all');
  const [rota, setRota] = useState(mockRota);
  
  // New shift form state
  const [newShift, setNewShift] = useState({
    staffId: '',
    clientId: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    visitType: '',
    notes: ''
  });
  
  // Selected shift for editing
  const [currentShift, setCurrentShift] = useState<any>(null);
  
  // Filter rota based on selected day and staff
  const filteredRota = rota.filter(shift => {
    const dayMatch = selectedDay === 'all' || shift.date === selectedDay;
    const staffMatch = selectedStaff === 'all' || shift.staffId === selectedStaff;
    return dayMatch && staffMatch;
  });
  
  // Generate an array of the next 7 days for the filter
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    return {
      value: formattedDate,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : new Intl.DateTimeFormat('en-GB', { weekday: 'long', month: 'short', day: 'numeric' }).format(date)
    };
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (isEditingShift) {
      setCurrentShift(prev => ({ ...prev, [id]: value }));
    } else {
      setNewShift(prev => ({ ...prev, [id]: value }));
    }
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (isEditingShift) {
      setCurrentShift(prev => ({ ...prev, [field]: value }));
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
    const shift = {
      id: Date.now().toString(),
      staffId: newShift.staffId,
      staffName: staff.name,
      staffImage: staff.image,
      clientId: newShift.clientId,
      clientName: client.name,
      clientImage: client.image,
      date: newShift.date,
      timeStart: newShift.timeStart,
      timeEnd: newShift.timeEnd,
      visitType: newShift.visitType,
      location: client.address,
      notes: newShift.notes
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
  
  const handleEditShift = (shift: any) => {
    setCurrentShift(shift);
    setIsEditingShift(true);
  };
  
  const handleUpdateShift = () => {
    setIsSubmitting(true);
    
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
    <DashboardLayout>
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
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add New Shift</DialogTitle>
                    <DialogDescription>
                      Create a new shift by filling in the details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="staffId">Staff Member *</Label>
                        <Select 
                          value={newShift.staffId} 
                          onValueChange={(value) => handleSelectChange('staffId', value)}
                        >
                          <SelectTrigger id="staffId">
                            <SelectValue placeholder="Select staff" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockStaff.map(staff => (
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
                          value={newShift.clientId} 
                          onValueChange={(value) => handleSelectChange('clientId', value)}
                        >
                          <SelectTrigger id="clientId">
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockClients.map(client => (
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
                          value={newShift.date}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeStart">Start Time *</Label>
                        <Input 
                          id="timeStart" 
                          type="time" 
                          value={newShift.timeStart}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeEnd">End Time *</Label>
                        <Input 
                          id="timeEnd" 
                          type="time" 
                          value={newShift.timeEnd}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="visitType">Visit Type *</Label>
                      <Select 
                        value={newShift.visitType} 
                        onValueChange={(value) => handleSelectChange('visitType', value)}
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
                        value={newShift.notes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingShift(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddShift}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Shift'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isEditingShift} onOpenChange={setIsEditingShift}>
                <DialogContent className="sm:max-w-[550px]">
                  {currentShift && (
                    <>
                      <DialogHeader>
                        <DialogTitle>Edit Shift</DialogTitle>
                        <DialogDescription>
                          Update the shift details below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="staffId">Staff Member *</Label>
                            <Select 
                              value={currentShift.staffId} 
                              onValueChange={(value) => handleSelectChange('staffId', value)}
                            >
                              <SelectTrigger id="staffId">
                                <SelectValue placeholder="Select staff" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockStaff.map(staff => (
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
                              value={currentShift.clientId} 
                              onValueChange={(value) => handleSelectChange('clientId', value)}
                            >
                              <SelectTrigger id="clientId">
                                <SelectValue placeholder="Select client" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockClients.map(client => (
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
                              value={currentShift.date}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeStart">Start Time *</Label>
                            <Input 
                              id="timeStart" 
                              type="time" 
                              value={currentShift.timeStart}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeEnd">End Time *</Label>
                            <Input 
                              id="timeEnd" 
                              type="time" 
                              value={currentShift.timeEnd}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="visitType">Visit Type *</Label>
                          <Select 
                            value={currentShift.visitType} 
                            onValueChange={(value) => handleSelectChange('visitType', value)}
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
                            value={currentShift.notes}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <DialogFooter className="flex justify-between items-center">
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDeleteShift(currentShift.id)}
                          disabled={isSubmitting}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          {isSubmitting ? 'Removing...' : 'Remove Shift'}
                        </Button>
                        <div>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsEditingShift(false)}
                            className="mr-2"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleUpdateShift}
                            disabled={isSubmitting}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isSubmitting ? 'Updating...' : 'Update Shift'}
                          </Button>
                        </div>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <Label htmlFor="dayFilter">Filter by Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger id="dayFilter" className="mt-1">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Days</SelectItem>
                  {nextSevenDays.map(day => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-1/2">
              <Label htmlFor="staffFilter">Filter by Staff</Label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger id="staffFilter" className="mt-1">
                  <SelectValue placeholder="Select staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  {mockStaff.map(staff => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          {filteredRota.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRota.map((shift) => (
                <GlassCard key={shift.id} className="overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-nurse-500 mr-2" />
                      <span className="font-medium">{shift.date}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditShift(shift)}
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
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-12">
              <RefreshCw className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No shifts found</h3>
              <p className="text-gray-500 mb-6">
                {selectedDay !== 'all' || selectedStaff !== 'all' 
                  ? "No shifts match your current filters."
                  : "No shifts have been scheduled yet."
                }
              </p>
              <Button onClick={() => setIsAddingShift(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Shift
              </Button>
            </GlassCard>
          )}
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default StaffRota;
