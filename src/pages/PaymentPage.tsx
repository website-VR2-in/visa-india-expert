import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMPANY } from '../data/config';
import { VISA_OPTIONS } from '../data/config';
import { useFormStore } from '../store';
import { toast } from 'react-hot-toast';

export const PaymentPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const formData = useFormStore((s) => s.formData);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const visaOption = VISA_OPTIONS.find((v) => v.id === formData.visaType);
  const price = visaOption?.defaultPrice || 199;

  // Wise payment link - replace with actual Wise payment link
  // For now, using a placeholder that the business owner will configure
  const WISE_PAYMENT_LINK = 'https://wise.com/pay/your-payment-link';

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate payment initiation
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);
    setPaymentInitiated(true);

    // In production, this would redirect to Wise or call Wise API
    // For now, open Wise payment link
    window.open(WISE_PAYMENT_LINK, '_blank');

    toast.success('Payment link opened. Complete your payment on Wise.');
  };

  const handleConfirmPayment = () => {
    // Mark as paid and redirect to confirmation
    navigate(`/confirmation/${invoiceId}`);
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl border border-warmgray-200 shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-saffron-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💳</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-500 mb-2">Complete Your Payment</h1>
            <p className="text-warmgray-500">Secure payment via Wise</p>
          </div>

          {/* Invoice Details */}
          <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-5 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-warmgray-600">Invoice #</span>
                <span className="font-mono font-semibold text-navy-500">{invoiceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgray-600">Service</span>
                <span className="font-semibold text-navy-500">India Visa Assistance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgray-600">Visa Type</span>
                <span className="font-semibold text-navy-500">{visaOption?.label || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgray-600">Customer</span>
                <span className="font-semibold text-navy-500">{formData.fullName || 'N/A'}</span>
              </div>
              <div className="border-t border-saffron-200 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-navy-500">Total</span>
                  <span className="font-bold text-saffron-500">{COMPANY.currency}{price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {!paymentInitiated ? (
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="btn btn-primary w-full !py-4 text-lg disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>Pay with Wise</span>
              )}
            </button>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-indiangreen-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-navy-500 mb-2">Payment Initiated</h3>
              <p className="text-warmgray-500 mb-6">
                Your Wise payment link has been opened. Complete the payment and click below when done.
              </p>
              <button
                onClick={handleConfirmPayment}
                className="btn btn-primary w-full !py-4"
              >
                I Have Completed Payment
              </button>
            </div>
          )}

          {/* Security note */}
          <div className="mt-6 pt-6 border-t border-warmgray-200">
            <p className="text-xs text-warmgray-400 text-center">
              🔒 Your payment is processed securely through Wise. We never store your payment details.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-warmgray-500 hover:text-navy-500 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
