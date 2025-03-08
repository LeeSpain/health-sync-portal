
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, User, Mail, Phone, Calendar, Clock, Briefcase } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/hooks/use-toast';

const AddStaff = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    availability: '',
    startDate: '',
    address: '',
    certifications: '',
    notes: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to create a staff member
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Staff member has been added successfully.",
      });
      setIsSubmitting(false);
      navigate('/dashboard/staff');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Staff Member</h1>
              <p className="text-gray-600 dark:text-gray-300">Add a new member to your care team</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/staff')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Staff
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="firstName" 
                      className="pl-10"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="lastName" 
                      className="pl-10"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="email" 
                      type="email" 
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="phone" 
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleSelectChange('role', value)}
                    >
                      <SelectTrigger id="role" className="pl-10">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registered_nurse">Registered Nurse</SelectItem>
                        <SelectItem value="care_assistant">Care Assistant</SelectItem>
                        <SelectItem value="physiotherapist">Physiotherapist</SelectItem>
                        <SelectItem value="occupational_therapist">Occupational Therapist</SelectItem>
                        <SelectItem value="mental_health_nurse">Mental Health Nurse</SelectItem>
                        <SelectItem value="social_worker">Social Worker</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                    <Select 
                      value={formData.availability} 
                      onValueChange={(value) => handleSelectChange('availability', value)}
                    >
                      <SelectTrigger id="availability" className="pl-10">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="startDate" 
                      type="date" 
                      className="pl-10"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
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
                    placeholder="Enter any certifications or qualifications" 
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
                    placeholder="Enter any additional information" 
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate('/dashboard/staff')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Saving...' : 'Save Staff Member'}
                </Button>
              </div>
            </form>
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default AddStaff;
