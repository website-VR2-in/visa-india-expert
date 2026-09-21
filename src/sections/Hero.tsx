import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY, TRUST_SIGNALS } from '../data/config';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-white to-saffron-50/50" />
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-saffron-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indiangreen-50/50 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-warmgray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-indiangreen-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-navy-500/70">India Visa Specialists</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-500 mb-6 leading-tight">
            Your India Visa,{' '}
            <span className="text-saffron-500">Made Simple.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-warmgray-600 mb-8 max-w-2xl mx-auto">
            Professional visa assistance from application to approval. One dedicated consultant guides you through every step — no guesswork, no surprise rejections.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/apply')}
              className="btn btn-primary w-full sm:w-auto"
            >
              Start My Visa Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href={COMPANY.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.257-.13-1.553-.745-1.802-.831-.25-.085-.43-.128-.612.128-.183.257-.705.831-.862.998-.157.167-.316.189-.573.061-.257-.128-1.087-.494-2.065-1.564-.762-.831-1.269-1.86-.14-.242.127-.085.257-.17.385-.257.127-.085.074-.199-.03-.306-.104-.104-.762-1.088-1.07-1.504-.303-.408-.61-.444-.862-.454H9.77c-.25 0-.674.094-1.03.49-.356.395-1.358 1.337-1.358 3.252 0 1.914 1.392 3.77 1.598 4.052.205.282 2.896 4.544 7.034 6.36.985.454 1.745.733 2.348.944.994.342 1.91.288 2.614.176.788-.123 2.412-.984 2.76-1.933.348-.949.348-1.76.243-1.933-.104-.173-.388-.278-.647-.428z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-warmgray-100">
                <span className="text-xl">{signal.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-navy-500">{signal.label}</p>
                  <p className="text-xs text-warmgray-500">{signal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
