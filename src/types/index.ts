// ─── Visa Types ──────────────────────────────────────────────

export type VisaType = 'tourist' | 'business' | 'medical' | 'e-1' | 'b-1' | 'spouse' | 'student' | 'journalist' | 'other';

export interface VisaFact {
  label: string;
  value: string;
}

export interface VisaOption {
  id: VisaType;
  label: string;
  description: string;
  icon: string;
  category: string;
  /** Fee paid upfront to start the application (USD). */
  kickoff: number;
  /** Fee due only after the application is successfully processed (USD). */
  successFee: number;
  // ── Dedicated-page content ──
  tagline: string;
  whoFor: string[];
  facts: VisaFact[];
  pitfalls: string[];
  documents: string[];
}

// ─── Application / Invoice ───────────────────────────────────

export type ApplicationStatus =
  | 'new'
  | 'information_required'
  | 'payment_pending'
  | 'paid'
  | 'processing'
  | 'additional_documents_required'
  | 'completed'
  | 'cancelled';

export type PaymentStatus =
  | 'awaiting_payment'
  | 'kickoff_paid'
  | 'paid'
  | 'refunded';

export interface ApplicationFormData {
  visaType: VisaType;
  nationality: string;
  countryOfResidence: string;
  travelDateFrom: string;
  travelDateTo: string;
  fullName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  useWhatsAppForPhone: boolean;
  numberOfTravelers: number;
  additionalInfo: string;
}

export interface Invoice {
  id: string; // INV-YYYYMMDD-HHMMSS-XXXX
  applicationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  visaType: string;
  serviceDescription: string;
  amount: number; // total service fee (kickoff + success fee)
  kickoffAmount: number; // due upfront
  successAmount: number; // due after successful application
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  kickoffPaidAt?: string;
  paidAt?: string;
}

export interface Application {
  id: string;
  invoiceId: string;
  formData: ApplicationFormData;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  amount: number; // total service fee (kickoff + success fee)
  kickoffAmount?: number; // due upfront
  successAmount?: number; // due after successful application
  currency: string;
  createdAt: string;
  updatedAt: string;
  kickoffPaidAt?: string; // when the applicant confirmed the kickoff transfer
  paidAt?: string; // when the success fee was received
  notes: string;
  documents: DocumentFile[];
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  applicationId: string;
}

// ─── Admin Dashboard Stats ──────────────────────────────────

export interface DashboardStats {
  todayApplications: number;
  pendingPayments: number;
  paidApplications: number;
  newLeads: number;
  revenue: number;
}

// ─── FAQ ─────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ─── Form Step ───────────────────────────────────────────────

export interface FormStep {
  id: number;
  label: string;
  title: string;
  description: string;
}
