
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  LogOut,
  Check
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your account preferences</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950 dark:text-red-500 dark:hover:text-red-400"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Profile</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Notifications</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Billing</TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <FadeIn>
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </h2>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" 
                          alt="Profile" 
                          className="h-32 w-32 rounded-full object-cover"
                        />
                        <Button 
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 bg-nurse-600 hover:bg-nurse-700 text-white"
                          size="icon"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">Change Picture</Button>
                    </div>
                    
                    {/* Profile Form */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Sarah" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Johnson" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="sarah.j@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <textarea 
                          id="bio" 
                          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
                          rows={4}
                          defaultValue="Registered Nurse with over 10 years of experience in home healthcare. Specialized in geriatric care and chronic disease management."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSaveSettings}
                          className="bg-nurse-600 hover:bg-nurse-700 text-white"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <FadeIn>
              <GlassCard className="mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Password
                  </h2>
                  
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveSettings}
                        className="bg-nurse-600 hover:bg-nurse-700 text-white"
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Session Timeout</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Automatically logout after 30 minutes of inactivity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Login Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for new login attempts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="outline" 
                        className="border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950 dark:text-red-500 dark:hover:text-red-400"
                      >
                        Deactivate Account
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <FadeIn>
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for important updates</p>
                      </div>
                      <Switch 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive text notifications for appointments</p>
                      </div>
                      <Switch 
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive browser push notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Notification Types</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="newAppointment" 
                            defaultChecked 
                            className="h-4 w-4 rounded border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="newAppointment" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            New appointment requests
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="appointmentReminders" 
                            defaultChecked 
                            className="h-4 w-4 rounded border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="appointmentReminders" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Appointment reminders
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="messageNotifications" 
                            defaultChecked 
                            className="h-4 w-4 rounded border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="messageNotifications" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            New messages
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="paymentNotifications" 
                            defaultChecked 
                            className="h-4 w-4 rounded border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="paymentNotifications" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Payment notifications
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveSettings}
                        className="bg-nurse-600 hover:bg-nurse-700 text-white"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing">
            <FadeIn>
              <GlassCard className="mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Subscription Plan
                  </h2>
                  
                  <div className="bg-nurse-50 dark:bg-nurse-900/30 border border-nurse-200 dark:border-nurse-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-nurse-100 dark:bg-nurse-800 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-5 w-5 text-nurse-600 dark:text-nurse-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Professional Plan</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">$29.99/month, billed annually</p>
                      </div>
                      <div className="ml-auto">
                        <Button variant="outline" size="sm">Change Plan</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-6">
                    <p>Your next billing date is <span className="font-medium">January 1, 2024</span></p>
                    <p>View your <a href="#" className="text-nurse-600 dark:text-nurse-400 hover:underline">billing history</a></p>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Payment Method</h3>
                  
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3">
                      <span className="text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/2024</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Billing Address</h2>
                  
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="billingName">Name</Label>
                      <Input id="billingName" defaultValue="Sarah Johnson" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input id="billingAddress" defaultValue="123 Healthcare Ave" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input id="billingCity" defaultValue="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State</Label>
                        <Input id="billingState" defaultValue="CA" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input id="billingZip" defaultValue="94105" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCountry">Country</Label>
                        <Input id="billingCountry" defaultValue="United States" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveSettings}
                        className="bg-nurse-600 hover:bg-nurse-700 text-white"
                      >
                        Save Address
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <FadeIn>
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Appearance Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark mode for the interface</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <Switch 
                          checked={darkMode}
                          onCheckedChange={setDarkMode}
                        />
                        <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Language</h3>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent">
                        <option value="en">English (US)</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Time Zone</h3>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent">
                        <option value="utc-8">Pacific Time (UTC-8)</option>
                        <option value="utc-5">Eastern Time (UTC-5)</option>
                        <option value="utc">UTC</option>
                        <option value="utc+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Date Format</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="dateFormat1" 
                            name="dateFormat" 
                            defaultChecked
                            className="h-4 w-4 border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="dateFormat1" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            MM/DD/YYYY (12/31/2023)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="dateFormat2" 
                            name="dateFormat"
                            className="h-4 w-4 border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="dateFormat2" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            DD/MM/YYYY (31/12/2023)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="dateFormat3" 
                            name="dateFormat"
                            className="h-4 w-4 border-gray-300 text-nurse-600 focus:ring-nurse-500"
                          />
                          <label htmlFor="dateFormat3" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            YYYY-MM-DD (2023-12-31)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveSettings}
                        className="bg-nurse-600 hover:bg-nurse-700 text-white"
                      >
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
