import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMPANY } from '../data/config';
import { buildWhatsAppLink } from '../lib/utils';
import { useFormStore } from '../store';

export const ConfirmationPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const formData = useFormStore((s) => s.formData);

  const whatsappLink = buildWhatsAppLink(
    formData.fullName || 'Applicant',
    invoiceId || 'N/A',
    formData.visaType || 'N/A',
    'I have completed my payment and would like to proceed with my visa application.'
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

          <h1 className="text-3xl font-bold text-navy-500 mb-2">Payment Received</h1>
          <p className="text-warmgray-500 mb-8">
            Thank you, {formData.fullName?.split(' ')[0] || 'there'}. Your application has been received.
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
              <div className="flex justify-between">
                <span className="text-warmgray-600">Payment Status</span>
                <span className="badge bg-green-100 text-green-800">Paid</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-navy-500 mb-3">What Happens Next?</h3>
            <ol className="space-y-2 text-sm text-warmgray-600">
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">1.</span>
                We will review your application and send you a customized document checklist.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">2.</span>
                Our consultant will contact you via email or WhatsApp within 24 hours.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">3.</span>
                We prepare and submit your visa application.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron-500 font-bold">4.</span>
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
              Continue on WhatsApp
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
