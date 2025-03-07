
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const Register = () => {
  const { toast } = useToast();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted",
      description: "Check your email to confirm your account.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <Link to="/" className="inline-flex items-center text-nurse-600 dark:text-nurse-400 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Create Your <span className="text-nurse-600 dark:text-nurse-400">Nurse-Sync</span> Account
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of nursing professionals building independent practices with our all-in-one platform.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <GlassCard className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter your first name" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter your last name" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a secure password" 
                    required 
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters with a number and special character.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    required 
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the <Link to="/terms" className="text-nurse-600 dark:text-nurse-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-nurse-600 dark:text-nurse-400 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-nurse-600 hover:bg-nurse-700 text-white">
                  Create Account
                </Button>
              </form>
            </GlassCard>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Already have an account?{" "}
                <Link to="/login" className="text-nurse-600 dark:text-nurse-400 hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By creating an account, you'll start your 14-day free trial.<br />
                No credit card required.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Register;
