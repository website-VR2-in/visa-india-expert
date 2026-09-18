import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMPANY, VISA_OPTIONS, WISE_ACCOUNT, WISE_PAYMENT_LINK } from '../data/config';
import { useFormStore, useAdminStore } from '../store';
import { splitPayment, formatMoney, buildWhatsAppLink } from '../lib/utils';
import { api } from '../lib/api';
import type { Application, PaymentStatus } from '../types';
import { toast } from 'react-hot-toast';

/** Copy text to clipboard with a toast confirmation. */
async function copyToClipboard(label: string, value: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied — paste it into your bank app.`);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    toast.success(`${label} copied — paste it into your bank app.`);
  }
}

export const PaymentPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const formData = useFormStore((s) => s.formData);
  const [confirmed, setConfirmed] = useState(false);

  // Resolve the application for this invoice.
  // Primary source: the backend (works from any device / browser).
  // Fallback: the localStorage cache written at submission time.
  const [app, setApp] = useState<{
    visaType: string;
    customerName: string;
    amount: number;
    advanceAmount?: number;
    balanceAmount?: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fromLocal = () => {
      try {
        const stored: Application[] = JSON.parse(localStorage.getItem('visa_applications') || '[]');
        const found = stored.find((a) => a.invoiceId === invoiceId);
        if (found) {
          setApp({
            visaType: found.formData?.visaType || formData.visaType,
            customerName: found.formData?.fullName || formData.fullName,
            amount: found.amount,
            advanceAmount: found.advanceAmount,
            balanceAmount: found.balanceAmount,
          });
          if (found.paymentStatus === 'advance_paid') setConfirmed(true);
          return true;
        }
      } catch {
        // ignore malformed storage
      }
      return false;
    };

    (async () => {
      try {
        const res = await api.getApplication(invoiceId!);
        if (cancelled) return;
        const a = res.application;
        setApp({
          visaType: a.formData?.visaType || formData.visaType,
          customerName: a.formData?.fullName || formData.fullName,
          amount: a.amount,
          advanceAmount: a.advanceAmount,
          balanceAmount: a.balanceAmount,
        });
        if (a.paymentStatus === 'advance_paid') setConfirmed(true);
      } catch {
        if (!cancelled) fromLocal();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [invoiceId, formData.visaType, formData.fullName]);

  const visaOption = VISA_OPTIONS.find((v) => v.id === (app?.visaType || formData.visaType));
  const total = app?.amount || visaOption?.defaultPrice || 199;
  const split = splitPayment(total);
  const advance = app?.advanceAmount ?? split.advance;
  const balance = app?.balanceAmount ?? split.balance;
  const customerName = app?.customerName || formData.fullName || 'Applicant';

  const handleConfirmAdvance = async () => {
    // 1) Record the advance on the backend (works across devices).
    //    Best-effort: the local cache below is always updated so the flow
    //    completes even if the request fails (offline).
    if (invoiceId) {
      try {
        await api.updateApplication(invoiceId, {
          paymentStatus: 'advance_paid',
          advancePaidAt: new Date().toISOString(),
        });
      } catch {
        // backend unreachable — local cache still records it
      }
    }
    // 2) Mark the advance as paid in the local application cache
    try {
      const stored: Application[] = JSON.parse(localStorage.getItem('visa_applications') || '[]');
      const idx = stored.findIndex((a) => a.invoiceId === invoiceId);
      if (idx !== -1) {
        stored[idx] = {
          ...stored[idx],
          paymentStatus: 'advance_paid',
          advancePaidAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('visa_applications', JSON.stringify(stored));
      }
    } catch {
      // non-fatal
    }
    // 3) Keep the admin dashboard store in sync (same-browser session)
    if (invoiceId) {
      const admin = useAdminStore.getState();
      const existing = admin.applications.find((a) => a.invoiceId === invoiceId);
      if (existing) {
        admin.updatePaymentStatus(invoiceId, 'advance_paid');
      }
    }

    setConfirmed(true);
    toast.success('Advance payment recorded. You are all set!');
  };

  return (
    <div className="min-h-screen bg-ivory py-10 md:py-16 px-4">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white rounded-2xl border border-warmgray-200 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-navy-500 text-white px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Complete Your Payment</h1>
                <p className="text-warmgray-300 text-sm">
                  Pay the 70% advance via bank transfer to our Wise account
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Invoice Details */}
            <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-5 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
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
                  <span className="font-semibold text-navy-500">{customerName}</span>
                </div>
                <div className="border-t border-saffron-200 pt-3 mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-warmgray-600">Total service fee</span>
                    <span className="text-navy-500">{formatMoney(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warmgray-600">30% balance (after successful application)</span>
                    <span className="text-warmgray-500">{formatMoney(balance)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 border border-saffron-200">
                    <span className="font-bold text-navy-500">70% advance — due now</span>
                    <span className="text-xl font-bold text-saffron-500">{formatMoney(advance)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Instructions */}
            <div className="mb-6">
              <h2 className="font-bold text-navy-500 text-lg mb-3">How to pay</h2>
              <ol className="space-y-2 text-sm text-warmgray-600 list-decimal list-inside">
                <li>
                  Transfer exactly <span className="font-semibold text-navy-500">{formatMoney(advance)}</span> to the Wise account below using your online bank or mobile banking app.
                </li>
                <li>
                  Add <span className="font-mono font-semibold text-navy-500 bg-saffron-50 px-1.5 py-0.5 rounded">{invoiceId}</span> as the transfer reference so we can match it instantly.
                </li>
                <li>Click the button below once your transfer is sent.</li>
              </ol>
            </div>

            {/* Wise Bank Details */}
            <div className="border-2 border-indiangreen-200 bg-indiangreen-50/50 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-indiangreen-500 text-white flex items-center justify-center text-sm font-bold">W</span>
                <div>
                  <h2 className="font-bold text-navy-500 leading-tight">Wise Account Details</h2>
                  <p className="text-xs text-warmgray-500">International bank transfer — no card needed</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg border border-warmgray-200 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">Account Name</p>
                      <p className="font-semibold text-navy-500 truncate">{WISE_ACCOUNT.accountName}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('Account name', WISE_ACCOUNT.accountName)}
                      className="btn-sm btn-secondary flex-shrink-0 !border-navy-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-warmgray-200 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">IBAN</p>
                      <p className="font-mono font-semibold text-navy-500 break-all">{WISE_ACCOUNT.iban}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('IBAN', WISE_ACCOUNT.iban)}
                      className="btn-sm btn-secondary flex-shrink-0 !border-navy-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-warmgray-200 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">SWIFT / BIC</p>
                      <p className="font-mono font-semibold text-navy-500">{WISE_ACCOUNT.swift}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('SWIFT/BIC', WISE_ACCOUNT.swift)}
                      className="btn-sm btn-secondary flex-shrink-0 !border-navy-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-warmgray-200 px-4 py-3">
                  <p className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">Bank & Address</p>
                  <p className="font-medium text-navy-500">
                    {WISE_ACCOUNT.bankName}, {WISE_ACCOUNT.bankAddress}
                  </p>
                </div>
                <p className="text-xs text-warmgray-500">{WISE_ACCOUNT.currencyNote}</p>
              </div>
            </div>

            {/* Optional direct Wise payment link (only if configured) */}
            {WISE_PAYMENT_LINK && (
              <a
                href={WISE_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full mb-4"
              >
                Open Wise Payment Link
              </a>
            )}

            {/* Confirmation Button */}
            {!confirmed ? (
              <button
                onClick={handleConfirmAdvance}
                className="btn btn-primary w-full !py-4 text-lg"
              >
                I Have Sent the {formatMoney(advance)} Advance
              </button>
            ) : (
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-indiangreen-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-indiangreen-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy-500 mb-1">Advance recorded</h3>
                <p className="text-sm text-warmgray-500 mb-4">
                  We will verify your transfer and contact you shortly.
                </p>
                <button
                  onClick={() => navigate(`/confirmation/${invoiceId}`)}
                  className="btn btn-primary w-full !py-4"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Security note */}
            <div className="mt-6 pt-6 border-t border-warmgray-200">
              <p className="text-xs text-warmgray-400 text-center">
                🔒 Bank transfers through Wise are protected by bank-grade security. Double-check the IBAN
                and account name before sending, and always reference your invoice number.
              </p>
            </div>
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
