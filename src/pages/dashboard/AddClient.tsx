
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/hooks/use-toast';

const AddClient = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to create a client
    setTimeout(() => {
      toast({
        title: "Success",
        description: "New client has been added successfully.",
      });
      setIsSubmitting(false);
      navigate('/dashboard/clients');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Client</h1>
              <p className="text-gray-600 dark:text-gray-300">Create a new client record</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/clients')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter first name" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter last name" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter phone number" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input 
                    id="dateOfBirth" 
                    type="date" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue="prefer-not-to-say">
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Enter address" 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Textarea 
                    id="medicalHistory" 
                    placeholder="Enter relevant medical history" 
                    rows={4} 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Enter any additional notes" 
                    rows={4} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate('/dashboard/clients')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Saving...' : 'Save Client'}
                </Button>
              </div>
            </form>
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default AddClient;
