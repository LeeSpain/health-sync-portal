
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RotaContainer from '@/containers/staff/RotaContainer';
import { mockStaff, mockClients, mockRota, visitTypes, getNextSevenDays } from '@/data/staffMockData';

const StaffRota = () => {
  const nextSevenDays = getNextSevenDays();
  
  return (
    <DashboardLayout>
      <RotaContainer
        mockStaff={mockStaff}
        mockClients={mockClients}
        mockRota={mockRota}
        visitTypes={visitTypes}
        nextSevenDays={nextSevenDays}
      />
    </DashboardLayout>
  );
};

export default StaffRota;
