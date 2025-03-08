
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication on initial load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem('isAuthenticated');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // Navigate to home page after a short delay to ensure the toast is shown
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
    { icon: Users, label: 'Clients', path: '/dashboard/clients' },
    { icon: CreditCard, label: 'Finance', path: '/dashboard/finance' },
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
    { icon: FileText, label: 'Documents', path: '/dashboard/documents' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  // Get the current user (would normally come from auth context)
  const user = {
    name: 'Sarah Johnson',
    role: 'Registered Nurse',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="md:hidden bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
        <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-nurse-500 to-nurse-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">NS</span>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">Nurse-Sync</span>
        </Link>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-800 pt-16">
          <div className="flex flex-col p-4 space-y-6">
            <div className="flex items-center space-x-3 p-3 mb-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg",
                  location.pathname === item.path 
                    ? "bg-nurse-50 text-nurse-600 dark:bg-gray-700 dark:text-nurse-400" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            ))}

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mt-auto"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "h-screen fixed top-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-nurse-500 to-nurse-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NS</span>
                </div>
                {isSidebarOpen && (
                  <span className="font-bold text-xl text-gray-900 dark:text-white">Nurse-Sync</span>
                )}
              </Link>
              <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-300">
                {isSidebarOpen ? <ChevronRight size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-lg p-2 transition-colors",
                    isSidebarOpen ? "px-4" : "justify-center",
                    location.pathname === item.path 
                      ? "bg-nurse-50 text-nurse-600 dark:bg-gray-700 dark:text-nurse-400" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon size={20} />
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              ))}
            </div>

            {/* User */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className={cn(
                "flex items-center",
                isSidebarOpen ? "space-x-3" : "justify-center"
              )}>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-10 w-10 rounded-full object-cover"
                />
                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.role}
                    </p>
                  </div>
                )}
              </div>
              
              {isSidebarOpen ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-4 w-full flex justify-center"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </Button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "ml-64" : "ml-20"
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Content */}
      <main className="md:hidden pt-2 pb-16">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
