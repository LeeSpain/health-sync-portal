
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

// Mock data for pricing plans
const pricingPlans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for individual nurses starting their independent practice',
    features: [
      'Individual nurse account',
      'Client management',
      'Basic appointment scheduling',
      'Secure messaging',
      'Payment processing (2.9% + $0.30 fee)',
      'Basic reports and analytics',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Ideal for established nurses with a growing client base',
    features: [
      'Everything in Starter',
      'Team of up to 4 nurses',
      'AI-powered scheduling assistant',
      'Video calling with AI transcription',
      'Custom service packages',
      'Advanced analytics and insights',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For larger nursing teams with advanced needs',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Custom API integrations',
      'Dedicated account manager',
      'Staff training sessions',
      'Advanced security features',
      'Custom reporting',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your practice needs. All plans include a 14-day free trial.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 100}>
              <GlassCard 
                className={cn(
                  'relative h-full flex flex-col',
                  plan.popular && 'border-nurse-500 dark:border-nurse-400 border-2'
                )}
                hoverEffect
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-nurse-500 text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="ml-2 text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {plan.description}
                  </p>
                </div>
                
                <div className="flex-1">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={cn(
                    'w-full',
                    plan.popular 
                      ? 'bg-nurse-600 hover:bg-nurse-700 text-white' 
                      : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700'
                  )}
                >
                  {plan.cta}
                </Button>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
