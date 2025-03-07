
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] w-[140%] h-[140%] rounded-full bg-gradient-to-br from-nurse-100/40 via-nurse-200/30 to-transparent dark:from-nurse-900/20 dark:via-nurse-800/10 transform rotate-12 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[30%] w-[100%] h-[100%] rounded-full bg-gradient-to-tr from-nurse-100/40 via-nurse-200/30 to-transparent dark:from-nurse-900/20 dark:via-nurse-800/10 transform -rotate-12 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div>
            <FadeIn delay={100}>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nurse-100 text-nurse-800 dark:bg-nurse-900/30 dark:text-nurse-300 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-nurse-500 mr-2"></span>
                Empowering Independent Nurses
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Your Practice,{" "}
                <span className="text-nurse-600 dark:text-nurse-400">Amplified</span> by AI
              </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Build and grow your independent nursing practice with our all-in-one platform. Client management, scheduling, payments, and communication—all enhanced by AI.
              </p>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-nurse-600 hover:bg-nurse-700 text-white">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </FadeIn>
            
            <FadeIn delay={500}>
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Trusted by nursing professionals from:
                </p>
                <div className="flex items-center space-x-6 opacity-75">
                  {/* Replace with actual hospital/institution logos */}
                  <div className="text-gray-400 dark:text-gray-500 font-semibold">Mayo Clinic</div>
                  <div className="text-gray-400 dark:text-gray-500 font-semibold">Cleveland Clinic</div>
                  <div className="text-gray-400 dark:text-gray-500 font-semibold">Johns Hopkins</div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          {/* Hero image */}
          <FadeIn delay={300} className="relative lg:h-[600px]">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-nurse-500/10 to-nurse-700/10 rounded-2xl transform rotate-3 scale-105 dark:from-nurse-800/30 dark:to-nurse-900/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-nurse-500/10 to-nurse-700/10 rounded-2xl transform -rotate-2 scale-105 dark:from-nurse-800/30 dark:to-nurse-900/30" />
              <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                  alt="Nurse using digital tablet" 
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
