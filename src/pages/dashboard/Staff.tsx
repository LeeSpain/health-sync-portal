
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Mail, Phone, Calendar, UserRound, Briefcase } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';

// Mock data for staff
const mockStaff = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Registered Nurse',
    email: 'sarah.j@example.com',
    phone: '(555) 123-7890',
    availability: 'Full-time',
    assignedClients: 7,
    image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'David Wilson',
    role: 'Care Assistant',
    email: 'david.w@example.com',
    phone: '(555) 987-6540',
    availability: 'Part-time',
    assignedClients: 4,
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Grace Lee',
    role: 'Physiotherapist',
    email: 'grace.l@example.com',
    phone: '(555) 555-1234',
    availability: 'Contract',
    assignedClients: 12,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '4',
    name: 'Thomas Clark',
    role: 'Mental Health Nurse',
    email: 'thomas.c@example.com',
    phone: '(555) 222-8765',
    availability: 'Full-time',
    assignedClients: 8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '5',
    name: 'Rebecca Martinez',
    role: 'Occupational Therapist',
    email: 'rebecca.m@example.com',
    phone: '(555) 444-9876',
    availability: 'Part-time',
    assignedClients: 5,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

const Staff = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [staff, setStaff] = useState(mockStaff);

  // Filter staff based on search query
  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNewStaff = () => {
    navigate('/dashboard/staff/add');
  };

  const handleViewStaff = (id: string) => {
    navigate(`/dashboard/staff/${id}`);
  };

  const handleViewRota = () => {
    navigate('/dashboard/staff/rota');
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your care team members</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline"
                onClick={handleViewRota}
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Rota
              </Button>
              <Button 
                className="bg-nurse-600 hover:bg-nurse-700 text-white"
                onClick={handleAddNewStaff}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Staff
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
                  placeholder="Search staff by name, role, or email..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {filteredStaff.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStaff.map((member) => (
                  <div 
                    key={member.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleViewStaff(member.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
                            {member.name}
                          </h3>
                          <Badge variant={getAvailabilityBadgeVariant(member.availability)}>
                            {member.availability}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                          <Briefcase className="inline-block h-3.5 w-3.5 mr-1" />
                          {member.role}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <span className="hidden sm:inline mx-2">•</span>
                          <div className="flex items-center mt-1 sm:mt-0">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block text-right">
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <UserRound className="h-4 w-4 mr-1" />
                          <span>{member.assignedClients} assigned clients</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <UserRound className="h-12 w-12 mx-auto text-nurse-600 dark:text-nurse-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No staff members found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {searchQuery 
                    ? `No staff members match your search "${searchQuery}"`
                    : "Start adding staff members to your care team"
                  }
                </p>
                <Button 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  onClick={handleAddNewStaff}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Staff Member
                </Button>
              </div>
            )}
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
