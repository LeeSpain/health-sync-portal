
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui/GlassCard';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating login for demo purposes
    toast({
      title: "Login Successful",
      description: "Welcome back to Nurse-Sync!",
    });
    
    // Navigate to dashboard after successful login
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 py-20 px-6">
        <div className="max-w-md mx-auto">
          <FadeIn>
            <Link to="/" className="inline-flex items-center text-nurse-600 dark:text-nurse-400 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome Back to <span className="text-nurse-600 dark:text-nurse-400">Nurse-Sync</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Log in to manage your independent nursing practice
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <GlassCard className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                    defaultValue="demo@nurse-sync.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-nurse-600 dark:text-nurse-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    required
                    defaultValue="demo123"
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="remember" defaultChecked />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-nurse-600 hover:bg-nurse-700 text-white">
                  Log In
                </Button>
              </form>
            </GlassCard>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/register" className="text-nurse-600 dark:text-nurse-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Login;
