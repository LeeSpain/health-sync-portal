
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserPlus, Filter, Mail, Phone, Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';

// Mock data for clients
const mockClients = [
  {
    id: '1',
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    phone: '(555) 123-4567',
    lastVisit: '2023-11-28',
    nextAppointment: '2023-12-15',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'John Martinez',
    email: 'john.m@example.com',
    phone: '(555) 987-6543',
    lastVisit: '2023-11-15',
    nextAppointment: '2023-12-20',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Lisa Chen',
    email: 'lisa.c@example.com',
    phone: '(555) 555-5555',
    lastVisit: '2023-11-10',
    nextAppointment: '2023-12-10',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '4',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '(555) 222-3333',
    lastVisit: '2023-11-05',
    nextAppointment: '2023-12-05',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '5',
    name: 'Sophia Garcia',
    email: 'sophia.g@example.com',
    phone: '(555) 444-7777',
    lastVisit: '2023-10-25',
    nextAppointment: '2023-12-28',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

const Clients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState(mockClients);

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNewClient = () => {
    navigate('/dashboard/clients/add');
  };

  const handleViewClient = (id: string) => {
    navigate(`/dashboard/clients/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your client relationships</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                className="bg-nurse-600 hover:bg-nurse-700 text-white"
                onClick={handleAddNewClient}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
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
                  placeholder="Search clients..." 
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
            
            {filteredClients.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.map((client) => (
                  <div 
                    key={client.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleViewClient(client.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={client.image} 
                        alt={client.name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
                          {client.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            <span className="truncate">{client.email}</span>
                          </div>
                          <span className="hidden sm:inline mx-2">•</span>
                          <div className="flex items-center mt-1 sm:mt-0">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block text-right">
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Next: {client.nextAppointment}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Last visit: {client.lastVisit}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <UserPlus className="h-12 w-12 mx-auto text-nurse-600 dark:text-nurse-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No clients found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {searchQuery 
                    ? `No clients match your search "${searchQuery}"`
                    : "Start adding clients to your practice"
                  }
                </p>
                <Button 
                  className="bg-nurse-600 hover:bg-nurse-700 text-white"
                  onClick={handleAddNewClient}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Your First Client
                </Button>
              </div>
            )}
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
