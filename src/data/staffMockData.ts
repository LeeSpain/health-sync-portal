
import { StaffMember, Client, Shift, VisitType } from '@/types/staff';

// Mock data for staff
export const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Registered Nurse',
    image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'David Wilson',
    role: 'Care Assistant',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Grace Lee',
    role: 'Physiotherapist',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock data for clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    address: '45 Oak Street, London, E1 6AW',
    careType: 'Daily Care',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'John Martinez',
    address: '12 Maple Avenue, London, NW3 2PL',
    careType: 'Medication Management',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Lisa Chen',
    address: '78 Pine Road, London, SE15 3RT',
    careType: 'Rehabilitation',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock data for rota
export const mockRota: Shift[] = [
  {
    id: '1',
    staffId: '1',
    staffName: 'Sarah Johnson',
    staffImage: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '1',
    clientName: 'Emma Thompson',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-15',
    timeStart: '09:00',
    timeEnd: '11:00',
    visitType: 'Home Visit',
    location: '45 Oak Street, London, E1 6AW',
    notes: 'Regular check-up and medication management.'
  },
  {
    id: '2',
    staffId: '1',
    staffName: 'Sarah Johnson',
    staffImage: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '2',
    clientName: 'John Martinez',
    clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-13',
    timeStart: '14:00',
    timeEnd: '15:30',
    visitType: 'Medication Review',
    location: '12 Maple Avenue, London, NW3 2PL',
    notes: 'Medication review and blood pressure check.'
  },
  {
    id: '3',
    staffId: '2',
    staffName: 'David Wilson',
    staffImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '3',
    clientName: 'Lisa Chen',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-16',
    timeStart: '10:30',
    timeEnd: '12:00',
    visitType: 'Assistance',
    location: '78 Pine Road, London, SE15 3RT',
    notes: 'Assistance with daily activities and meal preparation.'
  },
  {
    id: '4',
    staffId: '3',
    staffName: 'Grace Lee',
    staffImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    clientId: '3',
    clientName: 'Lisa Chen',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    date: '2023-12-18',
    timeStart: '13:00',
    timeEnd: '14:30',
    visitType: 'Physiotherapy',
    location: '78 Pine Road, London, SE15 3RT',
    notes: 'Regular physiotherapy session focusing on mobility exercises.'
  }
];

// Mock data for visit types
export const visitTypes: VisitType[] = [
  { id: '1', name: 'Home Visit' },
  { id: '2', name: 'Medication Review' },
  { id: '3', name: 'Physiotherapy' },
  { id: '4', name: 'Assistance' },
  { id: '5', name: 'Assessment' },
  { id: '6', name: 'Wellness Check' }
];

// Generate an array of the next 7 days for the filter
export const getNextSevenDays = (): { value: string; label: string }[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    return {
      value: formattedDate,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : new Intl.DateTimeFormat('en-GB', { weekday: 'long', month: 'short', day: 'numeric' }).format(date)
    };
  });
};
