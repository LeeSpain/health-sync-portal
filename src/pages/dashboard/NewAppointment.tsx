
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Calendar, Clock, User } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/hooks/use-toast';

// Mock data for services
const services = [
  { id: '1', name: 'Health Assessment', duration: '60' },
  { id: '2', name: 'Blood Pressure Monitoring', duration: '30' },
  { id: '3', name: 'Medication Administration', duration: '45' },
  { id: '4', name: 'Wound Care', duration: '60' },
  { id: '5', name: 'Initial Consultation', duration: '90' },
];

// Mock data for clients
const clients = [
  { id: '1', name: 'Emma Thompson' },
  { id: '2', name: 'John Martinez' },
  { id: '3', name: 'Lisa Chen' },
  { id: '4', name: 'Michael Johnson' },
  { id: '5', name: 'Sophia Garcia' },
];

const NewAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  // Get client ID from URL if provided
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const clientId = params.get('clientId');
    if (clientId) {
      setSelectedClient(clientId);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient || !selectedService || !appointmentDate || !appointmentTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to create an appointment
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Appointment has been scheduled successfully.",
      });
      setIsSubmitting(false);
      navigate('/dashboard/appointments');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Appointment</h1>
              <p className="text-gray-600 dark:text-gray-300">Schedule a new appointment</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/appointments')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Appointments
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select 
                    value={selectedClient} 
                    onValueChange={setSelectedClient}
                  >
                    <SelectTrigger id="client" className="w-full">
                      <SelectValue placeholder="Select a client" />
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
                
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select 
                    value={selectedService} 
                    onValueChange={setSelectedService}
                  >
                    <SelectTrigger id="service" className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} ({service.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="date" 
                      type="date" 
                      className="pl-10"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="time" 
                      type="time" 
                      className="pl-10"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Appointment Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Enter any notes for this appointment" 
                    rows={4} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate('/dashboard/appointments')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                </Button>
              </div>
            </form>
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default NewAppointment;
