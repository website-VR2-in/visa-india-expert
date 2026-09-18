import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Tell Us What You Need',
    description: 'Select your visa type and fill in your details. It takes less than 5 minutes.',
    icon: '📋',
  },
  {
    num: '02',
    title: 'We Review & Prepare',
    description: 'Our consultant reviews your case, prepares your application, and sends you a customized document checklist.',
    icon: '🔍',
  },
  {
    num: '03',
    title: 'Pay 70% Advance',
    description: 'You receive your invoice and pay the 70% advance via secure bank transfer to our Wise account. Your application begins immediately after payment.',
    icon: '💳',
  },
  {
    num: '04',
    title: 'Application Submitted',
    description: 'We file your application, monitor its progress, and keep you updated every step of the way.',
    icon: '📤',
  },
  {
    num: '05',
    title: 'Visa Approved',
    description: 'Your application is successfully processed and you receive your visa. The remaining 30% balance is then due — and we are still here if you need anything.',
    icon: '✅',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-custom">
        <div className="section-label">How It Works</div>
        <div className="section-title">Simple Process, Expert Results</div>
        <div className="section-subtitle">
          From first contact to visa approval — here is exactly what happens.
        </div>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-saffron-50 border-2 border-saffron-200 flex items-center justify-center text-2xl flex-shrink-0">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-full min-h-[40px] bg-saffron-200 mt-4" />
                )}
              </div>
              <div className="pb-8">
                <div className="text-xs font-bold text-saffron-500 mb-1">Step {step.num}</div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">{step.title}</h3>
                <p className="text-warmgray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
