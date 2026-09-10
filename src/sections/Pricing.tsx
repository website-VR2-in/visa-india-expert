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
        <p className="text-center text-sm text-warmgray-500 mt-6">
          * Government fees vary by nationality and visa type. Final cost confirmed after review.
        </p>
      </div>
    </section>
  );
};
