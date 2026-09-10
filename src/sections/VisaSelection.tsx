import React from 'react';
import { VISA_OPTIONS, COMPANY } from '../data/config';
import { useFormStore } from '../store';

export const VisaSelection: React.FC = () => {
  const { selectedVisa, setSelectedVisa, showForm, setCurrentStep, setField } = useFormStore();

  const handleSelect = (id: string) => {
    setSelectedVisa(id as any);
    setField('visaType', id as any);
    showForm();
    setCurrentStep(2);
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="services" className="section">
      <div className="container-custom">
        <div className="section-label">Our Services</div>
        <div className="section-title">What Visa Do You Need?</div>
        <div className="section-subtitle">
          Select your visa type to get started. Each type has specific requirements — we handle the details.
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VISA_OPTIONS.map((visa) => (
            <button
              key={visa.id}
              onClick={() => handleSelect(visa.id)}
              className={`card text-left group transition-all duration-200 hover:scale-105 ${
                selectedVisa === visa.id ? 'card-selected' : ''
              }`}
            >
              <div className="text-3xl mb-3">{visa.icon}</div>
              <h3 className="text-lg font-bold text-navy-500 mb-1 group-hover:text-saffron-500 transition-colors">
                {visa.label}
              </h3>
              <p className="text-sm text-warmgray-500 mb-3">{visa.description}</p>
              <span className="text-xs font-semibold text-saffron-500">
                From {COMPANY.currency}{visa.defaultPrice} →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
