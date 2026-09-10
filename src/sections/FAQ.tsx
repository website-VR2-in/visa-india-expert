import React, { useState } from 'react';
import { FAQ_DATA } from '../data/config';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="section bg-white">
      <div className="container-custom">
        <div className="section-label">FAQ</div>
        <div className="section-title">Frequently Asked Questions</div>
        <div className="section-subtitle">
          Quick answers to common questions about our visa services.
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((faq) => (
            <div key={faq.id} className="border border-warmgray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-ivory transition-colors"
              >
                <span className="font-semibold text-navy-500 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-saffron-500 transition-transform flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`faq-answer ${openId === faq.id ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className="px-5 text-warmgray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
