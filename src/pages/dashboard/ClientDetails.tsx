
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { 
  ArrowLeft, Calendar, Edit, FileText, User, Phone, Mail, MapPin, 
  ClipboardList, PlusCircle, Heart, AlertTriangle, UserPlus, 
  MessageSquare, Video, Pills, Activity, Home, Clipboard
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  socialSecurityNumber: 'XXX-XX-4567',
  insurance: {
    provider: 'HealthPlus Insurance',
    policyNumber: 'HP-987654321',
    group: 'EMP22415',
    coverage: 'Full coverage with $20 copay'
  },
  emergencyContact: {
    name: 'Michael Thompson',
    relationship: 'Husband',
    phone: '(555) 987-6543',
    email: 'michael.t@example.com'
  },
  medications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', purpose: 'Blood pressure' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', purpose: 'Cholesterol' }
  ],
  allergies: ['Penicillin', 'Shellfish', 'Pollen'],
  vitalSigns: {
    lastRecorded: '2023-12-01',
    bloodPressure: '122/78',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    respiratoryRate: '16/min',
    oxygenSaturation: '98%',
    weight: '145 lbs',
    height: '5\'6"',
    bmi: '23.4'
  },
  familyMembers: [
    { name: 'Michael Thompson', relationship: 'Husband', phone: '(555) 987-6543', canDiscuss: true },
    { name: 'Olivia Thompson', relationship: 'Daughter', phone: '(555) 234-5678', canDiscuss: true },
    { name: 'James Thompson', relationship: 'Son', phone: '(555) 345-6789', canDiscuss: false }
  ],
  careTeam: [
    { name: 'Dr. Sarah Johnson', role: 'Primary Care Physician', contact: '(555) 111-2222' },
    { name: 'Dr. Robert Williams', role: 'Cardiologist', contact: '(555) 222-3333' },
    { name: 'Lisa Chen', role: 'Physical Therapist', contact: '(555) 333-4444' }
  ]
};

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  // In a real app, you would fetch client data based on ID
  const client = clientData;

  const handleStartVideoCall = () => {
    // In a real app, this would initiate a video call
    window.alert('Starting video call with ' + client.firstName + ' ' + client.lastName);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save the changes to the backend
    setIsEditing(false);
  };

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
                onClick={handleStartVideoCall}
              >
                <Video className="h-4 w-4 mr-2" />
                Video Call
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate(`/dashboard/messages?clientId=${id}`)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate(`/dashboard/appointments/new?clientId=${id}`)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              {isEditing ? (
                <Button 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              ) : (
                <Button 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Client
                </Button>
              )}
            </div>
          </div>
        </FadeIn>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical Information</TabsTrigger>
            <TabsTrigger value="contacts">Contacts & Care Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
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
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Calendar className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                        <span>DOB: {new Date(client.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
              
              {/* Summary Cards */}
              <FadeIn delay={200} className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GlassCard className="p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-4">
                          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Next Appointment</p>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">{client.nextAppointment}</p>
                        </div>
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-4">
                          <Heart className="h-6 w-6 text-green-600 dark:text-green-200" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Vital Signs</p>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">{client.vitalSigns.bloodPressure}</p>
                        </div>
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center mr-4">
                          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-200" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Allergies</p>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">{client.allergies.length}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                  
                  {/* Insurance */}
                  <GlassCard>
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Insurance Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Provider</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.insurance.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Policy Number</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.insurance.policyNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Group</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.insurance.group}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Coverage</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.insurance.coverage}</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                  
                  {/* Emergency Contact */}
                  <GlassCard>
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Relationship</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.emergencyContact.relationship}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.emergencyContact.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-base text-gray-900 dark:text-white">{client.emergencyContact.email}</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </FadeIn>
            </div>
          </TabsContent>
          
          <TabsContent value="medical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vital Signs */}
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <Activity className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vital Signs</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last recorded: {client.vitalSigns.lastRecorded}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Blood Pressure</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Heart Rate</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Respiratory Rate</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.respiratoryRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Oxygen Saturation</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.oxygenSaturation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">BMI</p>
                      <p className="text-base text-gray-900 dark:text-white">{client.vitalSigns.bmi}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Vitals
                  </Button>
                </div>
              </GlassCard>
              
              {/* Allergies */}
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Allergies</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {client.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                          <span className="text-gray-900 dark:text-white">{allergy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Add new allergy" className="flex-1" />
                        <Button size="sm" variant="outline">Add</Button>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
              
              {/* Medications */}
              <GlassCard className="lg:col-span-2">
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <Pills className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Medications</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 text-sm font-medium">Medication</th>
                          <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 text-sm font-medium">Dosage</th>
                          <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 text-sm font-medium">Frequency</th>
                          <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 text-sm font-medium">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {client.medications.map((medication, index) => (
                          <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 text-gray-900 dark:text-white">{medication.name}</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">{medication.dosage}</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">{medication.frequency}</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">{medication.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {isEditing && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <Input placeholder="Medication name" />
                      <Input placeholder="Dosage" />
                      <Input placeholder="Frequency" />
                      <div className="flex space-x-2">
                        <Input placeholder="Purpose" className="flex-1" />
                        <Button size="sm" variant="outline">Add</Button>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
              
              {/* Medical History */}
              <GlassCard className="lg:col-span-2">
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <ClipboardList className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Medical History</h3>
                  </div>
                  
                  {isEditing ? (
                    <Textarea 
                      defaultValue={client.medicalHistory}
                      className="w-full mb-4"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white mb-4">{client.medicalHistory}</p>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Additional Notes</h4>
                    {isEditing ? (
                      <Textarea 
                        defaultValue={client.notes}
                        className="w-full"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{client.notes}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          </TabsContent>
          
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Family Members */}
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Family Members</h3>
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {client.familyMembers.map((member, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.relationship}</p>
                          </div>
                          <Badge variant={member.canDiscuss ? "success" : "destructive"}>
                            {member.canDiscuss ? 'Can Discuss' : 'No Discussion'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{member.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
              
              {/* Care Team */}
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <UserPlus className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Care Team</h3>
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {client.careTeam.map((member, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{member.contact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
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
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Upload
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
          </TabsContent>
          
          <TabsContent value="appointments">
            <GlassCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-nurse-600 dark:text-nurse-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Appointments
                    </h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/dashboard/appointments/new?clientId=${id}`)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Schedule
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
                
                <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                  <Button 
                    onClick={() => navigate(`/dashboard/appointments?clientId=${id}`)}
                    className="w-full"
                    variant="outline"
                  >
                    View All Appointments
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientDetails;
