
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, CreditCard, DollarSign, Plus, FileText } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';

// Mock data for the finances
const monthlyRevenue = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 6500 },
  { month: 'Apr', amount: 5900 },
  { month: 'May', amount: 7200 },
  { month: 'Jun', amount: 6800 },
];

const recentTransactions = [
  { id: 1, client: 'Emma Thompson', date: '2023-12-08', amount: 120, service: 'Health Assessment', status: 'completed' },
  { id: 2, client: 'John Martinez', date: '2023-12-07', amount: 85, service: 'Blood Pressure Monitoring', status: 'completed' },
  { id: 3, client: 'Lisa Chen', date: '2023-12-05', amount: 150, service: 'Medication Management', status: 'pending' },
  { id: 4, client: 'Robert Wilson', date: '2023-12-03', amount: 200, service: 'Full Check-up', status: 'completed' },
];

const Finance = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your earnings and expenses</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-nurse-600 hover:bg-nurse-700 text-white" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Finance Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FadeIn delay={100}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(7200)}</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-green-600 dark:text-green-400">
                <span>+12% from last month</span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={150}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Payments</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(350)}</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-amber-600 dark:text-amber-400">
                <span>3 invoices awaiting payment</span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={200}>
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Year-to-Date</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(34400)}</h3>
                </div>
                <div className="h-10 w-10 bg-nurse-100 dark:bg-nurse-900/30 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-xs text-green-600 dark:text-green-400">
                <span>On track to surpass last year</span>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        {/* Revenue Chart */}
        <FadeIn delay={250}>
          <GlassCard className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Monthly</Button>
                <Button variant="ghost" size="sm">Yearly</Button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenue}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(Number(value))}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="amount" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Recent Transactions */}
        <FadeIn delay={300}>
          <GlassCard>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{transaction.client}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.service}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(transaction.amount)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
