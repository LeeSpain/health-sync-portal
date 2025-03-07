
import React from 'react';
import { Star } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

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
    quote: "Managing my team of nurses has never been easier. The platform lets me assign clients, track appointments, and monitor earnings all from one dashboard. It's been a game-changer for our practice.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
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
  );
};

export default Testimonials;
