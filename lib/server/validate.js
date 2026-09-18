// ─── Input validation ────────────────────────────────────────

import { VISA_PRICES } from './prices.js';

const MAX = { name: 120, email: 254, phone: 30, country: 120, date: 30, info: 5000, notes: 2000 };

function str(v, max) {
  return typeof v === 'string' && v.length <= max && v.trim().length > 0 ? v.trim() : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validate a raw application payload (from the form).
 * Returns { ok, errors, value } where value is the sanitized formData.
 */
export function validateApplication(body) {
  const errors = [];
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: ['Invalid payload'], value: null };
  }
  const fd = body.formData;
  if (!fd || typeof fd !== 'object') {
    return { ok: false, errors: ['Missing formData'], value: null };
  }

  const visaType = typeof fd.visaType === 'string' ? fd.visaType.toLowerCase() : '';
  if (!Object.prototype.hasOwnProperty.call(VISA_PRICES, visaType)) errors.push('Invalid or missing visaType');

  const fullName = str(fd.fullName, MAX.name);
  if (!fullName) errors.push('fullName is required (max 120 chars)');

  const email = str(fd.email, MAX.email);
  if (!email) errors.push('email is required');
  else if (!EMAIL_RE.test(email)) errors.push('email is invalid');

  const phone = str(fd.phone, MAX.phone);
  if (!phone) errors.push('phone is required');
  else if (!PHONE_RE.test(phone)) errors.push('phone is invalid');

  const whatsappNumber = fd.useWhatsAppForPhone ? (phone || '') : str(fd.whatsappNumber, MAX.phone) || (phone || '');

  const nationality = str(fd.nationality, MAX.country);
  if (!nationality) errors.push('nationality is required');

  const countryOfResidence = str(fd.countryOfResidence, MAX.country);
  if (!countryOfResidence) errors.push('countryOfResidence is required');

  const travelDateFrom = str(fd.travelDateFrom, MAX.date);
  if (!travelDateFrom) errors.push('travelDateFrom is required');
  else if (!DATE_RE.test(travelDateFrom)) errors.push('travelDateFrom must be YYYY-MM-DD');

  const travelDateTo = str(fd.travelDateTo, MAX.date) || '';

  const numberOfTravelers =
    Number.isInteger(fd.numberOfTravelers) && fd.numberOfTravelers >= 1 && fd.numberOfTravelers <= 50
      ? fd.numberOfTravelers
      : 1;

  const additionalInfo = typeof fd.additionalInfo === 'string' ? fd.additionalInfo.slice(0, MAX.info) : '';

  if (errors.length) return { ok: false, errors, value: null };

  return {
    ok: true,
    errors: [],
    value: {
      visaType,
      nationality,
      countryOfResidence,
      travelDateFrom,
      travelDateTo,
      fullName,
      email,
      phone,
      whatsappNumber,
      useWhatsAppForPhone: Boolean(fd.useWhatsAppForPhone),
      numberOfTravelers,
      additionalInfo,
    },
  };
}

const PUBLIC_PAYMENT_STATUSES = new Set([
  'awaiting_payment',
  'payment_initiated',
  'advance_paid',
  'paid',
  'payment_failed',
  'payment_under_review',
  'refunded',
]);

const ADMIN_STATUSES = new Set([
  'new',
  'information_required',
  'payment_pending',
  'paid',
  'processing',
  'additional_documents_required',
  'completed',
  'cancelled',
]);

/**
 * Sanitize a PATCH body.
 *  - Public: paymentStatus (whitelisted), advancePaidAt, paidAt.
 *  - Admin (token present): also status (whitelisted) and notes.
 * Returns { ok, errors, patch }.
 */
export function validatePatch(body, isAdmin) {
  const errors = [];
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: ['Invalid payload'], patch: null };
  }
  const patch = {};

  if (body.paymentStatus !== undefined) {
    if (typeof body.paymentStatus === 'string' && PUBLIC_PAYMENT_STATUSES.has(body.paymentStatus)) {
      patch.paymentStatus = body.paymentStatus;
    } else {
      errors.push('paymentStatus is invalid');
    }
  }
  for (const ts of ['advancePaidAt', 'paidAt']) {
    if (body[ts] !== undefined) {
      if (typeof body[ts] === 'string' && body[ts].length <= 60) patch[ts] = body[ts];
      else if (body[ts] === null) patch[ts] = undefined; // no-op
      else errors.push(`${ts} is invalid`);
    }
  }

  if (isAdmin) {
    if (body.status !== undefined) {
      if (typeof body.status === 'string' && ADMIN_STATUSES.has(body.status)) patch.status = body.status;
      else errors.push('status is invalid');
    }
    if (body.notes !== undefined) {
      if (typeof body.notes === 'string' && body.notes.length <= MAX.notes) patch.notes = body.notes;
      else errors.push('notes is invalid (max 2000 chars)');
    }
  }

  if (errors.length) return { ok: false, errors, patch: null };
  return { ok: true, errors: [], patch };
}
