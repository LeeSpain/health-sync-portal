
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Search, Filter, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    clientName: 'Emma Thompson',
    clientId: '1',
    date: '2023-12-15',
    time: '09:00',
    duration: 60,
    service: 'Health Assessment',
    status: 'confirmed',
    notes: 'Follow-up on previous health concerns'
  },
  {
    id: '2',
    clientName: 'John Martinez',
    clientId: '2',
    date: '2023-12-15',
    time: '11:30',
    duration: 30,
    service: 'Blood Pressure Monitoring',
    status: 'confirmed',
    notes: 'Monthly blood pressure check'
  },
  {
    id: '3',
    clientName: 'Lisa Chen',
    clientId: '3',
    date: '2023-12-16',
    time: '14:00',
    duration: 45,
    service: 'Medication Management',
    status: 'pending',
    notes: 'Review new medication regimen'
  },
  {
    id: '4',
    clientName: 'Michael Johnson',
    clientId: '4',
    date: '2023-12-18',
    time: '10:00',
    duration: 60,
    service: 'Wound Care',
    status: 'confirmed',
    notes: 'Post-surgical wound dressing change'
  },
  {
    id: '5',
    clientName: 'Sophia Garcia',
    clientId: '5',
    date: '2023-12-20',
    time: '15:30',
    duration: 90,
    service: 'Initial Consultation',
    status: 'pending',
    notes: 'First meeting to discuss care options'
  }
];

const Appointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('');

  // Filter appointments based on search query and date
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          appointment.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate ? appointment.date === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  const handleNewAppointment = () => {
    navigate('/dashboard/appointments/new');
  };

  const handleAppointmentAction = (id: string, action: string) => {
    // In a real app, this would update the appointment in the database
    toast({
      title: `Appointment ${action}`,
      description: `The appointment has been ${action.toLowerCase()}.`,
    });
    
    // Update local state to reflect the change
    if (action === 'Confirmed') {
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status: 'confirmed' } : appointment
      ));
    } else if (action === 'Cancelled') {
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
      ));
    }
  };

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage all your client appointments</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                className="bg-nurse-600 hover:bg-nurse-700 text-white"
                onClick={handleNewAppointment}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <GlassCard className="mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search appointments..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:w-48">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="date" 
                  className="pl-10"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {filteredAppointments.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <div 
                            className={`h-2 w-2 rounded-full mr-2 ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-500' 
                                : appointment.status === 'cancelled'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                            }`} 
                          />
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">
                            {appointment.clientName}
                          </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {format(new Date(appointment.date), 'MMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {formatTimeDisplay(appointment.time)} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>
                              {appointment.service}
                            </span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        {appointment.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAppointmentAction(appointment.id, 'Cancelled')}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-900/20"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-nurse-600 hover:bg-nurse-700 text-white"
                              onClick={() => handleAppointmentAction(appointment.id, 'Confirmed')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAppointmentAction(appointment.id, 'Cancelled')}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/dashboard/clients/${appointment.clientId}`)}
                            >
                              View Client
                            </Button>
                          </>
                        )}
                        {appointment.status === 'cancelled' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAppointmentAction(appointment.id, 'Rescheduled')}
                          >
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <Calendar className="h-12 w-12 mx-auto text-nurse-600 dark:text-nurse-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {searchQuery || selectedDate
                    ? "No appointments match your search criteria"
                    : "Start scheduling appointments with your clients"
                  }
                </p>
                <Button 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  onClick={handleNewAppointment}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            )}
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
