
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  image: string;
  email?: string;
  phone?: string;
  availability?: string;
  assignedClients?: number;
  connectedClientIds?: string[]; // Add this to track connected clients
}

export interface Client {
  id: string;
  name: string;
  address: string;
  careType: string;
  image: string;
  assignedStaffIds?: string[]; // Add this to track connected staff
}

export interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  staffImage: string;
  clientId: string;
  clientName: string;
  clientImage: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  visitType: string;
  location: string;
  notes: string;
}

export interface VisitType {
  id: string;
  name: string;
}

export interface DayOption {
  value: string;
  label: string;
}
