import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientConnection from '@/components/staff/ClientConnection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Mail, Phone, Calendar, Clock, MapPin, Award, UserCheck, Edit, Pencil, Save, Trash, Plus, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/staff';

// Mock staff member data
const mockStaffMember = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  role: 'Registered Nurse',
  email: 'sarah.j@example.com',
  phone: '(555) 123-7890',
  availability: 'Full-time',
  startDate: '2022-05-15',
  address: '123 Medical Drive, London, SW1 2AB',
  certifications: 'BSc Nursing, Advanced Life Support, Wound Care Specialist',
  notes: 'Sarah has extensive experience in elderly care and has been a key member of our team for over a year.',
  emergencyContactName: 'Michael Johnson',
  emergencyContactPhone: '(555) 987-6543',
  image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
};

// Mock assigned clients
const mockAssignedClients = [
  {
    id: '1',
    name: 'Emma Thompson',
    age: 72,
    careType: 'Daily Care',
    nextVisit: '2023-12-15',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'John Martinez',
    age: 65,
    careType: 'Medication Management',
    nextVisit: '2023-12-13',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Lisa Chen',
    age: 68,
    careType: 'Rehabilitation',
    nextVisit: '2023-12-16',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock upcoming shifts
const mockUpcomingShifts = [
  {
    id: '1',
    client: 'Emma Thompson',
    date: '2023-12-15',
    time: '09:00 - 11:00',
    type: 'Home Visit'
  },
  {
    id: '2',
    client: 'John Martinez',
    date: '2023-12-13',
    time: '14:00 - 15:30',
    type: 'Medication Review'
  },
  {
    id: '3',
    client: 'Lisa Chen',
    date: '2023-12-16',
    time: '10:30 - 12:00',
    type: 'Physiotherapy'
  }
];

// Mock available clients (for connection)
const mockAvailableClients = [
  {
    id: '4',
    name: 'Robert Williams',
    age: 58,
    careType: 'Physical Therapy',
    address: '789 Oak Street, London, UK',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '5',
    name: 'Dorothy Clark',
    age: 82,
    careType: 'Daily Care',
    address: '321 Pine Avenue, London, UK',
    image: 'https://images.unsplash.com/photo-1551727974-8af20a3811ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '6',
    name: 'Michael Johnson',
    age: 67,
    careType: 'Medication Management',
    address: '456 Elm Road, London, UK',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

const StaffDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch the staff member data using the ID from params
  const staffId = params.id;
  const [staffMember, setStaffMember] = useState(mockStaffMember);
  const [assignedClients, setAssignedClients] = useState<Client[]>(mockAssignedClients);
  const [availableClients, setAvailableClients] = useState<Client[]>(mockAvailableClients);
  const [upcomingShifts, setUpcomingShifts] = useState(mockUpcomingShifts);
  
  // Form state for editing staff details
  const [formData, setFormData] = useState({
    ...staffMember
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSaveChanges = () => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to update the staff member
    setTimeout(() => {
      setStaffMember(formData);
      setEditMode(false);
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Staff details updated successfully.",
      });
    }, 1000);
  };
  
  const handleDeleteStaff = () => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to delete the staff member
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmDeleteOpen(false);
      toast({
        title: "Success",
        description: "Staff member has been removed.",
      });
      navigate('/dashboard/staff');
    }, 1000);
  };
  
  const handleViewClient = (clientId: string) => {
    navigate(`/dashboard/clients/${clientId}`);
  };
  
  const handleConnectClient = (clientId: string) => {
    // Find the client to connect
    const clientToConnect = availableClients.find(client => client.id === clientId);
    if (!clientToConnect) return;
    
    // Add client to assigned clients
    setAssignedClients(prev => [...prev, clientToConnect]);
    
    // Remove from available clients
    setAvailableClients(prev => prev.filter(client => client.id !== clientId));
    
    // Update staff member's assigned client count
    setStaffMember(prev => ({
      ...prev,
      assignedClients: (prev.assignedClients || 0) + 1
    }));
  };
  
  const handleDisconnectClient = (clientId: string) => {
    // Find the client to disconnect
    const clientToDisconnect = assignedClients.find(client => client.id === clientId);
    if (!clientToDisconnect) return;
    
    // Remove client from assigned clients
    setAssignedClients(prev => prev.filter(client => client.id !== clientId));
    
    // Add back to available clients
    setAvailableClients(prev => [...prev, clientToDisconnect]);
    
    // Update staff member's assigned client count
    setStaffMember(prev => ({
      ...prev,
      assignedClients: Math.max((prev.assignedClients || 0) - 1, 0)
    }));
  };
  
  const getAvailabilityBadgeVariant = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'full-time':
        return 'success';
      case 'part-time':
        return 'secondary';
      case 'contract':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                className="mr-4 h-8 w-8"
                onClick={() => navigate('/dashboard/staff')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {staffMember.firstName} {staffMember.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600 dark:text-gray-300">{staffMember.role}</p>
                  <Badge variant={getAvailabilityBadgeVariant(staffMember.availability)}>
                    {staffMember.availability}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              {!editMode ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditMode(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                  <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove Staff
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Removal</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove this staff member? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setConfirmDeleteOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteStaff}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Removing...' : 'Remove Staff Member'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFormData(staffMember);
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-nurse-600 hover:bg-nurse-700 text-white"
                    onClick={handleSaveChanges}
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </FadeIn>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Connected Clients</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FadeIn className="lg:col-span-1">
                <GlassCard className="overflow-hidden">
                  <div className="aspect-square w-full relative bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={staffMember.image} 
                      alt={`${staffMember.firstName} ${staffMember.lastName}`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-4">Contact Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-900 dark:text-gray-100">{staffMember.email}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-900 dark:text-gray-100">{staffMember.phone}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-900 dark:text-gray-100">{staffMember.address}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="text-gray-900 dark:text-gray-100">{staffMember.startDate}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </GlassCard>
              </FadeIn>
              
              <FadeIn delay={100} className="lg:col-span-2">
                {!editMode ? (
                  <GlassCard>
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className="font-semibold text-xl mb-4">Certifications & Qualifications</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                          <p className="whitespace-pre-wrap">{staffMember.certifications}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-semibold text-xl mb-4">Additional Notes</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                          <p className="whitespace-pre-wrap">{staffMember.notes}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-xl mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Name</p>
                            <p>{staffMember.emergencyContactName}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p>{staffMember.emergencyContactPhone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ) : (
                  <GlassCard>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role">Role *</Label>
                          <Input 
                            id="role" 
                            value={formData.role}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="availability">Availability</Label>
                          <Select 
                            value={formData.availability} 
                            onValueChange={(value) => handleSelectChange('availability', value)}
                          >
                            <SelectTrigger id="availability">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input 
                            id="startDate" 
                            type="date" 
                            value={formData.startDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="certifications">Certifications & Qualifications</Label>
                          <Textarea 
                            id="certifications" 
                            rows={3}
                            value={formData.certifications}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                          <Input 
                            id="emergencyContactName" 
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                          <Input 
                            id="emergencyContactPhone" 
                            value={formData.emergencyContactPhone}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea 
                            id="notes" 
                            rows={3}
                            value={formData.notes}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </FadeIn>
            </div>
          </TabsContent>
          
          <TabsContent value="clients">
            <FadeIn>
              <GlassCard>
                <div className="p-6">
                  <ClientConnection 
                    assignedClients={assignedClients}
                    availableClients={availableClients}
                    onConnectClient={handleConnectClient}
                    onDisconnectClient={handleDisconnectClient}
                  />
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
          
          <TabsContent value="schedule">
            <FadeIn>
              <GlassCard>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-xl">Upcoming Shifts</h3>
                    <Button onClick={() => navigate('/dashboard/staff/rota')}>
                      <Calendar className="h-4 w-4 mr-2" />
                      View Full Rota
                    </Button>
                  </div>
                  
                  {upcomingShifts.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {upcomingShifts.map((shift) => (
                        <div 
                          key={shift.id}
                          className="py-4 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                              {shift.client}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {shift.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900 dark:text-gray-100">{shift.date}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{shift.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No upcoming shifts</h3>
                      <p className="text-gray-500 mb-6">This staff member has no shifts scheduled.</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Shift
                      </Button>
                    </div>
                  )}
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StaffDetails;
