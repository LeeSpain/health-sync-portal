
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Shield, 
  Badge, 
  ChevronRight, 
  Check, 
  ArrowRight, 
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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

// Mock data for testimonials
const testimonials = [
  {
    name: 'Sarah Johnson, RN',
    role: 'Independent Nurse Practitioner',
    quote: 'Nurse-Sync has transformed my independent practice. The AI scheduling assistant alone has saved me hours each week, and the client management tools make running my business so much easier.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 5,
  },
  {
    name: 'Michael Chen, BSN',
    role: 'Home Care Specialist',
    quote: 'I love how Nurse-Sync helps me manage my client appointments and payments all in one place. The AI transcription feature is incredibly accurate and saves me so much documentation time.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 5,
  },
  {
    name: 'Maria Rodriguez, RN',
    role: 'Team Lead, Family Care Practice',
    quote: 'Managing my team of nurses has never been easier. The platform lets me assign clients, track appointments, and monitor earnings all from one dashboard. It's been a game-changer for our practice.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 5,
  },
];

// Mock data for FAQ
const faqs = [
  {
    question: 'How does the verification process work?',
    answer: 'After registering, you'll need to upload your nursing credentials, license, and identification. Our AI-assisted verification system will scan your documents for authenticity while our team reviews your information. This process typically takes 1-2 business days.',
  },
  {
    question: 'Can I set my own rates and services?',
    answer: 'Absolutely! Nurse-Sync is designed to give you full control over your practice. You can set custom rates for different services, create service packages, and determine your own availability and working hours.',
  },
  {
    question: 'How does payment processing work?',
    answer: 'We integrate with Stripe for secure payment processing. You can choose between collecting prepaid payments before services or sending invoices after completion. The platform handles all payment notifications, receipts, and tracking.',
  },
  {
    question: 'Can I bring my existing clients onto the platform?',
    answer: 'Yes! You can easily invite your existing clients to join your Nurse-Sync practice. They'll receive an email invitation with instructions to create an account and connect with your practice.',
  },
  {
    question: 'What kind of support is available?',
    answer: 'All plans include email support and access to our knowledge base. Professional and Enterprise plans include priority support with faster response times and dedicated account managers for Enterprise users.',
  },
];

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

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
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
      
      {/* Features Section */}
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

      {/* How It Works Section */}
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
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Loved by Nursing Professionals
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                See how Nurse-Sync is transforming independent nursing practices.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 100}>
                <GlassCard className="h-full" hoverEffect>
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      {/* Rating stars */}
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
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
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Find answers to common questions about Nurse-Sync.
              </p>
            </FadeIn>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.question} delay={index * 100}>
                <GlassCard>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-nurse-600 dark:bg-nurse-900">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Nursing Practice?
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-xl text-nurse-100 mb-8 max-w-2xl mx-auto">
              Join thousands of nursing professionals who are building successful independent practices with Nurse-Sync.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-nurse-600 hover:bg-nurse-50">
                  Start Your Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-nurse-700">
                Book a Demo
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
