
import React from 'react';
import { Users, Calendar, CreditCard, MessageSquare, Shield, Badge } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

// Features section data
const features = [
  {
    icon: Users,
    title: 'Client Management',
    description: 'Manage your client base with detailed profiles, history tracking, and personalized care plans.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling system that optimizes your time and reduces conflicts.',
  },
  {
    icon: CreditCard,
    title: 'Seamless Payments',
    description: 'Accept prepaid bookings or send professional invoices after service completion.',
  },
  {
    icon: MessageSquare,
    title: 'Real-time Communication',
    description: 'Secure messaging and video calls with AI transcription for easier documentation.',
  },
  {
    icon: Shield,
    title: 'Legal Protection',
    description: 'Built-in agreements and consent forms to protect your practice and clients.',
  },
  {
    icon: Badge,
    title: 'Professional Growth',
    description: 'Track achievements, get AI insights on improvement areas, and grow your practice.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Nurse-Sync combines powerful business tools with AI assistance to help you build a thriving independent practice.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 100}>
              <GlassCard className="h-full" hoverEffect>
                <div className="h-12 w-12 rounded-xl bg-nurse-100 dark:bg-nurse-900/30 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-nurse-600 dark:text-nurse-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
