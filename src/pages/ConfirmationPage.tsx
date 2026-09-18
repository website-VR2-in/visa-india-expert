import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMPANY, VISA_OPTIONS } from '../data/config';
import { buildWhatsAppLink, splitPayment, formatMoney } from '../lib/utils';
import { api } from '../lib/api';
import { useFormStore } from '../store';
import type { Application } from '../types';

export const ConfirmationPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const formData = useFormStore((s) => s.formData);

  // Load the application from the backend so this page is accurate even
  // when opened from a different device/browser than the one that submitted.
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    if (!invoiceId) return;
    let cancelled = false;
    api
      .getApplication(invoiceId)
      .then((res) => {
        if (!cancelled) setApp(res.application);
      })
      .catch(() => {
        // backend unavailable — fall back to the form store below
      });
    return () => {
      cancelled = true;
    };
  }, [invoiceId]);

  const name = app?.formData?.fullName || formData.fullName;
  const visaType = app?.formData?.visaType || formData.visaType;
  const visaOption = VISA_OPTIONS.find((v) => v.id === visaType);
  const total = app?.amount || visaOption?.defaultPrice || 199;
  const { advance, balance } = app
    ? { advance: app.advanceAmount ?? splitPayment(total).advance, balance: app.balanceAmount ?? splitPayment(total).balance }
    : splitPayment(total);

  const whatsappLink = buildWhatsAppLink(
    name || 'Applicant',
    invoiceId || 'N/A',
    visaOption?.label || visaType || 'N/A',
    `I have sent the 70% advance payment of ${formatMoney(advance)} for invoice ${invoiceId || 'N/A'}. Please confirm receipt and let me know the next steps.`
  );

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl border border-warmgray-200 shadow-lg p-8 text-center">
          {/* Success Animation */}
          <div className="w-20 h-20 bg-indiangreen-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <svg className="w-10 h-10 text-indiangreen-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-navy-500 mb-2">Application Received</h1>
          <p className="text-warmgray-500 mb-8">
            Thank you, {name?.split(' ')[0] || 'there'}. Your 70% advance payment has been recorded and your application is now in our queue.
          </p>

          {/* Details */}
          <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-5 mb-8 text-left">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-warmgray-600">Application #</span>
                <span className="font-mono font-semibold text-navy-500">{invoiceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgray-600">Invoice #</span>
                <span className="font-mono font-semibold text-navy-500">{invoiceId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-warmgray-600">70% advance ({formatMoney(advance)})</span>
                <span className="badge bg-indiangreen-50 text-indiangreen-800 border border-indiangreen-200">Paid — verifying</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-warmgray-600">30% balance ({formatMoney(balance)})</span>
                <span className="badge bg-orange-100 text-orange-800">Due after successful application</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-navy-500 mb-3">What Happens Next?</h3>
            <ol className="space-y-2 text-sm text-warmgray-600">
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">1.</span>
                We verify your advance transfer and review your application.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">2.</span>
                Our consultant contacts you via email or WhatsApp within 24 hours with your customized document checklist.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">3.</span>
                We prepare and submit your visa application.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">4.</span>
                Once your application is successfully processed, you pay the remaining 30% balance.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">5.</span>
                You receive your visa confirmation.
              </li>
            </ol>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp flex-1"
            >
              Confirm on WhatsApp
            </a>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary flex-1"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
