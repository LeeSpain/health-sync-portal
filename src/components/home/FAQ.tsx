
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

// Mock data for FAQ
const faqs = [
  {
    question: 'How does the verification process work?',
    answer: "After registering, you'll need to upload your nursing credentials, license, and identification. Our AI-assisted verification system will scan your documents for authenticity while our team reviews your information. This process typically takes 1-2 business days.",
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
    answer: "Yes! You can easily invite your existing clients to join your Nurse-Sync practice. They'll receive an email invitation with instructions to create an account and connect with your practice.",
  },
  {
    question: 'What kind of support is available?',
    answer: 'All plans include email support and access to our knowledge base. Professional and Enterprise plans include priority support with faster response times and dedicated account managers for Enterprise users.',
  },
];

const FAQ = () => {
  return (
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
  );
};

export default FAQ;
