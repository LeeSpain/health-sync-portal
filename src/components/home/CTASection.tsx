
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
