import React from 'react';
import { VISA_OPTIONS, COMPANY } from '../data/config';
import { useFormStore } from '../store';

export const Pricing: React.FC = () => {
  const { showForm, setField } = useFormStore();

  const handleGetStarted = (visaId: string) => {
    setField('visaType', visaId as any);
    showForm();
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="pricing" className="section">
      <div className="container-custom">
        <div className="section-label">Transparent Pricing</div>
        <div className="section-title">Service Fees</div>
        <div className="section-subtitle">
          All-inclusive service fees. Government visa fees are separate and vary by country.
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {VISA_OPTIONS.map((visa) => (
            <div key={visa.id} className="card text-center">
              <div className="text-3xl mb-3">{visa.icon}</div>
              <h3 className="text-lg font-bold text-navy-500 mb-1">{visa.label}</h3>
              <div className="text-3xl font-bold text-saffron-500 my-4">
                {COMPANY.currency}{visa.defaultPrice}
              </div>
              <p className="text-sm text-warmgray-500 mb-4">{visa.description}</p>
              <button
                onClick={() => handleGetStarted(visa.id)}
                className="btn btn-primary !w-full !py-3 !text-sm"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Payment plan banner */}
        <div className="max-w-3xl mx-auto mt-10 bg-white border border-warmgray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
          <div className="w-12 h-12 bg-saffron-50 rounded-full flex items-center justify-center text-2xl flex-shrink-0">💳</div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-navy-500 mb-1">How payment works</h3>
            <p className="text-sm text-warmgray-600">
              Pay a <span className="font-semibold text-navy-500">70% advance</span> to start your application,
              and the remaining <span className="font-semibold text-navy-500">30% balance</span> only after it is
              successfully processed. Simple, transparent, no surprises.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-warmgray-500 mt-6">
          * Government fees vary by nationality and visa type. Final cost confirmed after review.
        </p>
      </div>
    </section>
  );
};
