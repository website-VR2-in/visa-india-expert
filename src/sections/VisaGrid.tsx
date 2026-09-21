import React from 'react';
import { Link } from 'react-router-dom';
import { VISA_OPTIONS, COMPANY } from '../data/config';

export const VisaGrid: React.FC = () => {
  return (
    <section id="services" className="section bg-white">
      <div className="container-custom">
        <div className="section-label">Our Services</div>
        <div className="section-title">What Visa Do You Need?</div>
        <div className="section-subtitle">
          Each visa has its own page with full details — requirements, common pitfalls, and exact pricing.
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VISA_OPTIONS.map((visa) => (
            <Link
              key={visa.id}
              to={`/visa/${visa.id}`}
              className="card text-left group transition-all duration-200 hover:scale-[1.03] hover:shadow-lg block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{visa.icon}</div>
                <span className="badge bg-saffron-50 text-saffron-700 border border-saffron-200">{visa.category}</span>
              </div>
              <h3 className="text-lg font-bold text-navy-500 mb-1 group-hover:text-saffron-500 transition-colors">
                {visa.label}
              </h3>
              <p className="text-sm text-warmgray-500 mb-4 min-h-[40px]">{visa.description}</p>
              <div className="flex items-center justify-between border-t border-warmgray-200 pt-3">
                <div className="text-xs text-warmgray-500">
                  <span className="font-semibold text-navy-500">{COMPANY.currency}{visa.kickoff}</span> kickoff
                  <span className="mx-1">·</span>
                  <span className="font-semibold text-navy-500">{COMPANY.currency}{visa.successFee}</span> success
                </div>
                <span className="text-xs font-bold text-saffron-500 group-hover:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
