
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';

const Clients = () => {
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
              <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <GlassCard className="mb-6">
            <div className="text-center py-12 px-4">
              <Users className="h-12 w-12 mx-auto text-nurse-600 dark:text-nurse-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Client Directory</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Your client list and management tools will appear here.</p>
              <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                View Clients
              </Button>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
