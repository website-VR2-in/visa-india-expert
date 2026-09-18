import React, { useState } from 'react';
import { useFormStore } from '../store';
import { FORM_STEPS, VISA_OPTIONS, NATIONALITIES, COMPANY } from '../data/config';
import { generateInvoiceId, validateEmail, validatePhone, validateRequired, splitPayment, formatMoney } from '../lib/utils';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep, setCurrentStep, formData, setField,
    isFormVisible, isSubmitting, isSubmitted, hideForm,
  } = useFormStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [busy, setBusy] = useState(false);

  const visible = isFormVisible || isSubmitted;

  const stepKeys: Record<number, string[]> = {
    1: ['visaType'],
    2: ['nationality', 'travelDateFrom'],
    3: ['fullName', 'countryOfResidence'],
    4: ['email', 'phone', 'whatsappNumber'],
    5: ['additionalInfo'],
    6: [], // review step
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const keys = stepKeys[step] || [];

    keys.forEach((key) => {
      const value = (formData as any)[key];
      if (key === 'visaType' && !value) newErrors[key] = 'Please select a visa type.';
      if (key === 'nationality' && !value) newErrors[key] = 'Please select your nationality.';
      if (key === 'fullName') newErrors[key] = validateRequired(value, 'Full name') || '';
      if (key === 'email') newErrors[key] = validateEmail(value) || '';
      if (key === 'phone') newErrors[key] = validatePhone(value) || '';
      if (key === 'travelDateFrom' && !value) newErrors[key] = 'Travel date is required.';
      if (key === 'countryOfResidence' && !value) newErrors[key] = 'Country of residence is required.';
    });

    // Filter out empty strings
    Object.keys(newErrors).forEach((k) => {
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please fix the errors above.');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error('Please review and fix any errors.');
      return;
    }
    setBusy(true);

    const total = VISA_OPTIONS.find((v) => v.id === formData.visaType)?.defaultPrice || 199;
    const { advance, balance } = splitPayment(total);

    // 1) Submit to the backend (source of truth when available — the server
    //    validates the data, computes the price and generates the invoice id,
    //    so the application is visible to the admin from any device).
    let newInvoiceId = '';
    let fromServer = false;
    try {
      const res = await api.createApplication({ formData, source: 'web' });
      newInvoiceId = res.invoiceId;
      fromServer = true;
    } catch {
      // 2) Backend unreachable (offline / local dev without server) →
      //    generate the invoice locally and keep the localStorage flow.
      newInvoiceId = generateInvoiceId();
    }
    setInvoiceId(newInvoiceId);

    // 3) Mirror to the localStorage cache (payment page + admin fallback).
    const application = {
      id: newInvoiceId,
      invoiceId: newInvoiceId,
      formData,
      status: 'new' as const,
      paymentStatus: 'awaiting_payment' as const,
      amount: total,
      advanceAmount: advance,
      balanceAmount: balance,
      currency: COMPANY.currencyCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
      documents: [],
    };
    try {
      const existing: unknown[] = JSON.parse(localStorage.getItem('visa_applications') || '[]');
      if (!existing.some((a) => (a as { invoiceId?: string }).invoiceId === newInvoiceId)) {
        existing.unshift(application);
        localStorage.setItem('visa_applications', JSON.stringify(existing));
      }
    } catch {
      // storage unavailable — non-fatal
    }

    // Update store
    useFormStore.getState().submitForm(newInvoiceId, newInvoiceId);

    toast.success(
      fromServer
        ? 'Application submitted! Redirecting to payment...'
        : 'Application submitted (offline mode). Redirecting to payment...'
    );
    setBusy(false);
    navigate(`/payment/${newInvoiceId}`);
  };

  if (!visible) return null;

  const progress = (currentStep / 6) * 100;

  const visaOption = VISA_OPTIONS.find((v) => v.id === formData.visaType);
  const price = visaOption?.defaultPrice || 199;

  return (
    <div id="application-form" className="section bg-ivory">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-navy-500/70">
                Step {currentStep} of {FORM_STEPS.length}
              </span>
              <span className="text-sm font-medium text-saffron-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Step Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-500 mb-2">
              {FORM_STEPS[currentStep - 1]?.title}
            </h2>
            <p className="text-warmgray-500">
              {FORM_STEPS[currentStep - 1]?.description}
            </p>
          </div>

          {/* Form Card */}
          <div className="card">
            {/* Step 1: Visa Type */}
            {currentStep === 1 && (
              <div className="space-y-3">
                {VISA_OPTIONS.map((visa) => (
                  <button
                    key={visa.id}
                    onClick={() => setField('visaType', visa.id as any)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      formData.visaType === visa.id
                        ? 'border-saffron-500 bg-saffron-50'
                        : 'border-warmgray-200 hover:border-saffron-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{visa.icon}</span>
                      <div>
                        <p className="font-semibold text-navy-500">{visa.label}</p>
                        <p className="text-sm text-warmgray-500">{visa.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {errors.visaType && <p className="form-error">{errors.visaType}</p>}
              </div>
            )}

            {/* Step 2: Travel Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="form-label">Nationality *</label>
                  <select
                    className="form-input"
                    value={formData.nationality || ''}
                    onChange={(e) => setField('nationality', e.target.value)}
                  >
                    <option value="">Select your nationality</option>
                    {NATIONALITIES.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  {errors.nationality && <p className="form-error">{errors.nationality}</p>}
                </div>
                <div>
                  <label className="form-label">Travel Date (From) *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.travelDateFrom || ''}
                    onChange={(e) => setField('travelDateFrom', e.target.value)}
                  />
                  {errors.travelDateFrom && <p className="form-error">{errors.travelDateFrom}</p>}
                </div>
                <div>
                  <label className="form-label">Travel Date (To) — Optional</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.travelDateTo || ''}
                    onChange={(e) => setField('travelDateTo', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="John Smith"
                    value={formData.fullName || ''}
                    onChange={(e) => setField('fullName', e.target.value)}
                  />
                  {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="form-label">Country of Residence *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="United States"
                    value={formData.countryOfResidence || ''}
                    onChange={(e) => setField('countryOfResidence', e.target.value)}
                  />
                  {errors.countryOfResidence && <p className="form-error">{errors.countryOfResidence}</p>}
                </div>
                <div>
                  <label className="form-label">Number of Travelers</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={formData.numberOfTravelers || 1}
                    onChange={(e) => setField('numberOfTravelers', parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email || ''}
                    onChange={(e) => setField('email', e.target.value)}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+1 555 123 4567"
                    value={formData.phone || ''}
                    onChange={(e) => setField('phone', e.target.value)}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div>
                  <label className="form-label">WhatsApp Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+1 555 123 4567"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) => setField('whatsappNumber', e.target.value)}
                  />
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={formData.useWhatsAppForPhone || false}
                      onChange={(e) => {
                        setField('useWhatsAppForPhone', e.target.checked);
                        if (e.target.checked && formData.phone) {
                          setField('whatsappNumber', formData.phone);
                        }
                      }}
                    />
                    <span className="text-sm text-warmgray-600">Use same as phone number</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Additional Info */}
            {currentStep === 5 && (
              <div>
                <label className="form-label">Additional Information</label>
                <textarea
                  className="form-input min-h-[120px]"
                  placeholder="Any additional details about your situation, previous visa applications, or special requirements..."
                  value={formData.additionalInfo || ''}
                  onChange={(e) => setField('additionalInfo', e.target.value)}
                />
                <p className="form-helper">This is optional but helps us prepare your application better.</p>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-navy-500">Invoice Summary</span>
                    <span className="text-2xl font-bold text-saffron-500">
                      {formatMoney(price)}
                    </span>
                  </div>
                  <div className="text-sm text-warmgray-600 space-y-1">
                    <p><span className="font-medium">Service:</span> India Visa Assistance — {visaOption?.label}</p>
                    <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                    <p><span className="font-medium">Nationality:</span> {formData.nationality}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Travel From:</span> {formData.travelDateFrom}</p>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="bg-white border border-warmgray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-navy-500 text-sm">Payment Plan</span>
                    <span className="badge bg-indiangreen-50 text-indiangreen-800">2 simple steps</span>
                  </div>
                  <div className="space-y-2 text-sm mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-warmgray-600">
                        70% advance — <span className="text-warmgray-400">due now to start</span>
                      </span>
                      <span className="font-bold text-navy-500">{formatMoney(splitPayment(price).advance)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-warmgray-600">
                        30% balance — <span className="text-warmgray-400">after successful application</span>
                      </span>
                      <span className="font-bold text-navy-500">{formatMoney(splitPayment(price).balance)}</span>
                    </div>
                    <div className="border-t border-warmgray-200 pt-2 flex justify-between items-center">
                      <span className="font-semibold text-navy-500">Total service fee</span>
                      <span className="font-bold text-saffron-500">{formatMoney(price)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-warmgray-500">
                  <p>By submitting, you agree to our Terms of Service and Privacy Policy. Your information is securely stored and only used for your visa application. Payment of the 70% advance is made on the next step via secure bank transfer to our Wise account.</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-warmgray-200">
              {currentStep > 1 ? (
                <button onClick={handleBack} className="btn btn-secondary !py-3 !px-6 !text-sm">
                  ← Back
                </button>
              ) : (
                <button onClick={hideForm} className="btn btn-secondary !py-3 !px-6 !text-sm">
                  Cancel
                </button>
              )}
              {currentStep < 6 ? (
                <button onClick={handleNext} className="btn btn-primary !py-3 !px-6 !text-sm">
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || busy}
                  className="btn btn-primary !py-3 !px-6 !text-sm disabled:opacity-50"
                >
                  {isSubmitting || busy ? 'Submitting...' : 'Submit & Pay 70% Advance'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
