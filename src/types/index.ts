// ─── Visa Types ──────────────────────────────────────────────

export type VisaType = 'tourist' | 'business' | 'medical' | 'e-1' | 'b-1' | 'spouse' | 'student' | 'journalist' | 'other';

export interface VisaOption {
  id: VisaType;
  label: string;
  description: string;
  icon: string;
  defaultPrice: number;
  category: string;
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
  | 'payment_initiated'
  | 'advance_paid'
  | 'paid'
  | 'payment_failed'
  | 'payment_under_review'
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
  id: string; // INV-YYYYMMDD-HHMMSS
  applicationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  visaType: string;
  serviceDescription: string;
  amount: number; // total service fee
  advanceAmount: number; // 70% due upfront
  balanceAmount: number; // 30% due after successful application
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  paidAt?: string;
}

export interface Application {
  id: string;
  invoiceId: string;
  formData: ApplicationFormData;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  amount: number; // total service fee
  advanceAmount?: number; // 70% due upfront
  balanceAmount?: number; // 30% due after successful application
  currency: string;
  createdAt: string;
  updatedAt: string;
  advancePaidAt?: string; // when the applicant confirmed the 70% advance transfer
  paidAt?: string; // when the 30% balance was received
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
