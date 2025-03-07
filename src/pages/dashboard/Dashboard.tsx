
import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GlassCard from '@/components/ui/GlassCard';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import FadeIn from '@/components/animations/FadeIn';

// Mock data for the appointment section
const upcomingAppointments = [
  {
    id: 1,
    clientName: 'Emma Thompson',
    date: '2023-12-10',
    time: '09:00 AM',
    service: 'Health Assessment',
    status: 'confirmed'
  },
  {
    id: 2,
    clientName: 'John Martinez',
    date: '2023-12-10',
    time: '11:30 AM',
    service: 'Blood Pressure Monitoring',
    status: 'confirmed'
  },
  {
    id: 3,
    clientName: 'Lisa Chen',
    date: '2023-12-11',
    time: '02:00 PM',
    service: 'Medication Management',
    status: 'pending'
  }
];

// Mock data for the earnings chart
const earningsData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3500 },
  { name: 'Mar', amount: 6000 },
  { name: 'Apr', amount: 5500 },
  { name: 'May', amount: 7000 },
  { name: 'Jun', amount: 6500 },
  { name: 'Jul', amount: 8000 },
  { name: 'Aug', amount: 9500 },
  { name: 'Sep', amount: 8500 },
  { name: 'Oct', amount: 9000 },
  { name: 'Nov', amount: 9800 },
  { name: 'Dec', amount: 7500 },
];

// Mock data for the recent clients
const recentClients = [
  {
    id: 1,
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    lastVisit: '2023-12-08',
  },
  {
    id: 2,
    name: 'Sophia Garcia',
    email: 'sophia.g@example.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    lastVisit: '2023-12-05',
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    lastVisit: '2023-12-03',
  }
];

// Mock data for tasks
const tasks = [
  { id: 1, title: 'Review new client applications', completed: false },
  { id: 2, title: 'Complete monthly reports', completed: false },
  { id: 3, title: 'Update service pricing', completed: true },
  { id: 4, title: 'Order medical supplies', completed: true },
];

// Mock data for notifications
const notifications = [
  { id: 1, message: 'New appointment request from Sofia Lee', time: '10 min ago' },
  { id: 2, message: 'Payment received from John Martinez', time: '1 hour ago' },
  { id: 3, message: 'New message from Dr. Rodriguez', time: '3 hours ago' },
];

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Set current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleTaskToggle = (id: number) => {
    toast({
      title: "Task Updated",
      description: "Your task status has been updated.",
    });
  };

  const handleAppointmentAction = (id: number, action: string) => {
    toast({
      title: `Appointment ${action}`,
      description: `Appointment has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">{currentDate}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
                <Button className="bg-nurse-600 hover:bg-nurse-700 text-white" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FadeIn delay={100}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">3</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>12% more than last week</span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={150}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clients</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">28</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>4 new this month</span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={200}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month's Earnings</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(9800)}</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>18% increase from October</span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={250}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Messages</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">7</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-amber-600 dark:text-amber-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>3 require urgent attention</span>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - Appointments & Earnings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <FadeIn delay={300}>
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-nurse-200 dark:hover:border-nurse-800 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-medium text-gray-900 dark:text-white">{appointment.clientName}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{appointment.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </span>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAppointmentAction(appointment.id, 'Rescheduled')}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-nurse-600 hover:bg-nurse-700"
                              onClick={() => handleAppointmentAction(appointment.id, 'Confirmed')}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{appointment.service}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Earnings Chart */}
            <FadeIn delay={400}>
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Yearly Earnings</h2>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total: {formatCurrency(earningsData.reduce((sum, item) => sum + item.amount, 0))}
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={earningsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${formatCurrency(Number(value))}`, 'Earnings']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="amount" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Sidebar Column - Recent Clients, Tasks, Notifications */}
          <div className="space-y-8">
            {/* Recent Clients */}
            <FadeIn delay={300}>
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Clients</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {recentClients.map((client) => (
                    <div key={client.id} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <img 
                        src={client.image} 
                        alt={client.name} 
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{client.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{client.email}</p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last visit:<br/>{client.lastVisit}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Tasks */}
            <FadeIn delay={400}>
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks</h2>
                  <Button variant="outline" size="sm">Add Task</Button>
                </div>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-nurse-200 dark:hover:border-nurse-800 transition-colors"
                    >
                      <div className="mr-3" onClick={() => handleTaskToggle(task.id)}>
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-gray-300 dark:border-gray-600 rounded-full cursor-pointer hover:border-nurse-500 dark:hover:border-nurse-400 transition-colors" />
                        )}
                      </div>
                      <span className={`text-sm ${task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Notifications */}
            <FadeIn delay={500}>
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
                  <Button variant="outline" size="sm">Clear All</Button>
                </div>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="border-l-2 border-nurse-500 pl-3 py-1">
                      <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
