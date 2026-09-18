import { COMPANY } from '../data/config';

// ─── Invoice / Application ID Generator ──────────────────────

/**
 * Generate a unique invoice/application number in format: INV-YYYYMMDD-HHMMSS
 * Adds a short random suffix to prevent collisions.
 */
export function generateInvoiceId(): string {
  const now = new Date();
  const datePart = now.toISOString().replace(/[T:Z]/g, '').replace(/\.\d{3}/, '');
  // Format: YYYYMMDD-HHMMSS
  const dateStr = now.getFullYear().toString().padStart(4, '0');
  const monthStr = (now.getMonth() + 1).toString().padStart(2, '0');
  const dayStr = now.getDate().toString().padStart(2, '0');
  const hourStr = now.getHours().toString().padStart(2, '0');
  const minStr = now.getMinutes().toString().padStart(2, '0');
  const secStr = now.getSeconds().toString().padStart(2, '0');
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `INV-${dateStr}${monthStr}${dayStr}-${hourStr}${minStr}${secStr}-${suffix}`;
}

// ─── Payment Split (70% advance / 30% balance) ───────────────

/**
 * Split a total service fee into a 70% advance (due upfront) and a
 * 30% balance (due after the application is successfully processed).
 * Both values are rounded to 2 decimals and always sum to the total.
 */
export function splitPayment(total: number): { advance: number; balance: number } {
  const round2 = (n: number) => Math.round(n * 100) / 100;
  const advance = round2(total * 0.7);
  const balance = round2(total - advance);
  return { advance, balance };
}

/** Format an amount with the company currency symbol, e.g. 139.3 → $139.30 */
export function formatMoney(amount: number): string {
  return `${COMPANY.currency}${amount.toFixed(2)}`;
}

// ─── Form Validation ─────────────────────────────────────────

export interface ValidationErrors {
  [key: string]: string;
}

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return 'Phone number is required.';
  if (phone.replace(/\D/g, '').length < 7) return 'Please enter a valid phone number.';
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || !value.trim()) return `${fieldName} is required.`;
  return null;
}

// ─── Date Formatting ─────────────────────────────────────────

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─── WhatsApp Message Builder ────────────────────────────────

export function buildWhatsAppMessage(
  name: string,
  applicationId: string,
  visaType: string,
  message: string = ''
): string {
  const base = `Hello Visa India Expert, I am ${name}. My application number is ${applicationId}. Visa type: ${visaType}.`;
  return message ? `${base} ${message}` : base;
}

export function buildWhatsAppLink(name: string, applicationId: string, visaType: string, message: string = ''): string {
  const text = encodeURIComponent(buildWhatsAppMessage(name, applicationId, visaType, message));
  return `https://wa.me/639496491061?text=${text}`;
}

// ─── Status Helpers ──────────────────────────────────────────

export const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  information_required: 'Information Required',
  payment_pending: 'Payment Pending',
  paid: 'Paid',
  processing: 'Processing',
  additional_documents_required: 'Documents Required',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const PAYMENT_LABELS: Record<string, string> = {
  awaiting_payment: 'Awaiting Advance',
  payment_initiated: 'Payment Initiated',
  advance_paid: 'Advance Paid (70%)',
  paid: 'Fully Paid (100%)',
  payment_failed: 'Payment Failed',
  payment_under_review: 'Under Review',
  refunded: 'Refunded',
};

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    information_required: 'bg-yellow-100 text-yellow-800',
    payment_pending: 'bg-orange-100 text-orange-800',
    paid: 'bg-green-100 text-green-800',
    processing: 'bg-purple-100 text-purple-800',
    additional_documents_required: 'bg-red-100 text-red-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getPaymentColor(status: string): string {
  const colors: Record<string, string> = {
    awaiting_payment: 'bg-orange-100 text-orange-800',
    payment_initiated: 'bg-blue-100 text-blue-800',
    advance_paid: 'bg-indiangreen-50 text-indiangreen-800',
    paid: 'bg-green-100 text-green-800',
    payment_failed: 'bg-red-100 text-red-800',
    payment_under_review: 'bg-yellow-100 text-yellow-800',
    refunded: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}
