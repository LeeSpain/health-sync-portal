
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Nurse-Sync Works
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A streamlined process designed specifically for nursing professionals.
            </p>
          </FadeIn>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-[50%] top-8 bottom-8 w-0.5 bg-nurse-200 dark:bg-nurse-800 hidden md:block"></div>
          
          {/* Steps */}
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn className="md:text-right">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-nurse-100 text-nurse-600 mb-4 dark:bg-nurse-900/40 dark:text-nurse-400">
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Sign Up & Verification
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Create your account and upload your nursing credentials. Our AI-assisted verification system will quickly process your information.
                  </p>
                  <div className="flex md:justify-end">
                    <Link to="/register">
                      <Button variant="link" className="text-nurse-600 dark:text-nurse-400 p-0">
                        Register Now <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={100} className="md:order-first">
                <div className="relative h-60 md:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1581582987297-fd83dbcdab5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                    alt="Nurse signing up" 
                    className="object-cover h-full w-full"
                  />
                </div>
              </FadeIn>
              
              {/* Connection dot */}
              <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-nurse-500 hidden md:block"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-nurse-100 text-nurse-600 mb-4 dark:bg-nurse-900/40 dark:text-nurse-400">
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Set Up Your Practice
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Create your professional profile, set your services and rates, define your availability, and connect your payment methods.
                  </p>
                  <div className="flex">
                    <Link to="/register">
                      <Button variant="link" className="text-nurse-600 dark:text-nurse-400 p-0">
                        Learn More <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={100}>
                <div className="relative h-60 md:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1599493438602-9596c1b10dbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                    alt="Nurse setting up profile" 
                    className="object-cover h-full w-full"
                  />
                </div>
              </FadeIn>
              
              {/* Connection dot */}
              <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-nurse-500 hidden md:block"></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn className="md:text-right">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-nurse-100 text-nurse-600 mb-4 dark:bg-nurse-900/40 dark:text-nurse-400">
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Manage Clients & Appointments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Accept client requests, manage appointments with our AI-powered scheduling system, and communicate securely.
                  </p>
                  <div className="flex md:justify-end">
                    <Link to="/register">
                      <Button variant="link" className="text-nurse-600 dark:text-nurse-400 p-0">
                        Explore Features <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={100} className="md:order-first">
                <div className="relative h-60 md:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                    alt="Nurse with client" 
                    className="object-cover h-full w-full"
                  />
                </div>
              </FadeIn>
              
              {/* Connection dot */}
              <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-nurse-500 hidden md:block"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-nurse-100 text-nurse-600 mb-4 dark:bg-nurse-900/40 dark:text-nurse-400">
                    4
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Grow Your Practice
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Track your earnings, get insights from AI analytics, build your team, and scale your independent nursing practice.
                  </p>
                  <div className="flex">
                    <Link to="/register">
                      <Button variant="link" className="text-nurse-600 dark:text-nurse-400 p-0">
                        Get Started <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={100}>
                <div className="relative h-60 md:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                    alt="Nurse team collaboration" 
                    className="object-cover h-full w-full"
                  />
                </div>
              </FadeIn>
              
              {/* Connection dot */}
              <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-nurse-500 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
