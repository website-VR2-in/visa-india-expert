import React from 'react';
import { BENEFITS } from '../data/config';

export const Benefits: React.FC = () => {
  return (
    <section id="why-us" className="section bg-white">
      <div className="container-custom">
        <div className="section-label">Why Choose Us</div>
        <div className="section-title">Expert India Visa Assistance</div>
        <div className="section-subtitle">
          We don't just fill out forms. We understand the Indian visa system from the inside out — because we've lived it.
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="card">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-navy-500 mb-2">{benefit.title}</h3>
              <p className="text-warmgray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
