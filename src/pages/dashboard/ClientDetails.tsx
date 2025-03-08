
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowLeft, Calendar, Edit, FileText, User, Phone, Mail, MapPin, ClipboardList } from 'lucide-react';

// Mock client data (in a real app, this would come from an API)
const clientData = {
  id: '1',
  firstName: 'Emma',
  lastName: 'Thompson',
  email: 'emma.thompson@example.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  gender: 'Female',
  address: '123 Main Street, Anytown, CA 12345',
  medicalHistory: 'Hypertension, managed with medication. Allergic to penicillin.',
  notes: 'Prefers afternoon appointments. Has two children.',
  lastAppointment: '2023-11-28',
  nextAppointment: '2023-12-15',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
};

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // In a real app, you would fetch client data based on ID
  const client = clientData;

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard/clients')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {client.firstName} {client.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Client Details</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => navigate(`/dashboard/appointments/new?clientId=${id}`)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button 
                className="bg-nurse-600 hover:bg-nurse-700 text-white"
                onClick={() => navigate(`/dashboard/clients/edit/${id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Profile */}
          <FadeIn delay={100}>
            <GlassCard className="lg:col-span-1">
              <div className="p-6 text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <img 
                    src={client.image} 
                    alt={`${client.firstName} ${client.lastName}`} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {client.firstName} {client.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Client ID: {client.id}</p>
                
                <div className="space-y-3 text-left mt-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Mail className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Phone className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>{client.address}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <User className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>{client.gender}, {new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear()} years old</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
          
          {/* Client Details */}
          <FadeIn delay={200} className="lg:col-span-2">
            <div className="space-y-8">
              {/* Appointments */}
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Appointments
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/dashboard/appointments?clientId=${id}`)}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Last Appointment</div>
                        <div className="text-gray-600 dark:text-gray-400">{client.lastAppointment}</div>
                      </div>
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Next Appointment</div>
                        <div className="text-gray-600 dark:text-gray-400">{client.nextAppointment}</div>
                      </div>
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Medical Information */}
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <ClipboardList className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Medical Information
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Medical History</h4>
                      <p className="text-gray-900 dark:text-white">{client.medicalHistory}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Additional Notes</h4>
                      <p className="text-gray-900 dark:text-white">{client.notes}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Documents */}
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Documents
                      </h3>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/dashboard/documents')}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents yet</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Upload documents related to this client</p>
                    <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                      Upload Document
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDetails;
