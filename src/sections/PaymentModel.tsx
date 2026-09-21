import React from 'react';
import { Link } from 'react-router-dom';
import { VISA_OPTIONS, COMPANY } from '../data/config';
import { formatMoney } from '../lib/utils';

export const PaymentModel: React.FC = () => {
  return (
    <section id="pricing" className="section bg-ivory">
      <div className="container-custom">
        <div className="section-label">Transparent Pricing</div>
        <div className="section-title">Kickoff + Success Fee</div>
        <div className="section-subtitle">
          Fixed, all-inclusive pricing per visa. You pay a kickoff fee to start — and the success fee only after your
          application is successfully processed.
        </div>

        {/* Two-step explainer */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
          <div className="card flex items-start gap-4">
            <div className="w-12 h-12 bg-saffron-50 border-2 border-saffron-200 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              🚀
            </div>
            <div>
              <div className="text-xs font-bold text-saffron-500 mb-1">STEP 1 — KICKOFF FEE</div>
              <h3 className="text-lg font-bold text-navy-500 mb-1">Paid upfront to start</h3>
              <p className="text-sm text-warmgray-600">
                Reserves your case with our team and covers the initial work: reviewing your eligibility, preparing
                your application, and filing it with the authorities.
              </p>
            </div>
          </div>
          <div className="card flex items-start gap-4">
            <div className="w-12 h-12 bg-indiangreen-50 border-2 border-indiangreen-200 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              ✅
            </div>
            <div>
              <div className="text-xs font-bold text-indiangreen-600 mb-1">STEP 2 — SUCCESS FEE</div>
              <h3 className="text-lg font-bold text-navy-500 mb-1">Due only after success</h3>
              <p className="text-sm text-warmgray-600">
                Charged only after your application is successfully processed. Simple, transparent, no surprises —
                and our success is tied to yours.
              </p>
            </div>
          </div>
        </div>

        {/* Full price table */}
        <div className="max-w-4xl mx-auto card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-500 text-white text-left">
                  <th className="px-5 py-3 font-semibold">Visa Type</th>
                  <th className="px-5 py-3 font-semibold text-right">Kickoff</th>
                  <th className="px-5 py-3 font-semibold text-right">Success Fee</th>
                  <th className="px-5 py-3 font-semibold text-right">Total</th>
                  <th className="px-5 py-3 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody>
                {VISA_OPTIONS.map((visa, i) => (
                  <tr key={visa.id} className={`border-t border-warmgray-200 ${i % 2 ? 'bg-ivory/60' : 'bg-white'}`}>
                    <td className="px-5 py-3">
                      <span className="mr-2">{visa.icon}</span>
                      <span className="font-semibold text-navy-500">{visa.label}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-navy-500">{formatMoney(visa.kickoff)}</td>
                    <td className="px-5 py-3 text-right font-semibold text-navy-500">{formatMoney(visa.successFee)}</td>
                    <td className="px-5 py-3 text-right font-bold text-saffron-500">
                      {formatMoney(visa.kickoff + visa.successFee)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        to={`/visa/${visa.id}`}
                        className="text-xs font-bold text-saffron-500 hover:text-saffron-600 whitespace-nowrap"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-sm text-warmgray-500 mt-6">
          * Government visa fees are separate and paid directly to the Indian government. Kickoff fees start from{' '}
          {formatMoney(Math.min(...VISA_OPTIONS.map((v) => v.kickoff)))}.
        </p>
      </div>
    </section>
  );
};
