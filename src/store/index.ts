import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ApplicationFormData, VisaType, Application, ApplicationStatus, PaymentStatus } from '../types';

// ─── Form Store ──────────────────────────────────────────────

interface FormState {
  currentStep: number;
  formData: ApplicationFormData;
  selectedVisa: VisaType | null;
  isFormVisible: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  applicationId: string | null;
  invoiceId: string | null;

  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<ApplicationFormData>) => void;
  setField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
  setSelectedVisa: (visa: VisaType | null) => void;
  showForm: () => void;
  hideForm: () => void;
  resetForm: () => void;
  submitForm: (applicationId: string, invoiceId: string) => void;
}

const defaultFormData: ApplicationFormData = {
  visaType: 'tourist',
  nationality: '',
  countryOfResidence: '',
  travelDateFrom: '',
  travelDateTo: '',
  fullName: '',
  email: '',
  phone: '',
  whatsappNumber: '',
  useWhatsAppForPhone: false,
  numberOfTravelers: 1,
  additionalInfo: '',
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: defaultFormData,
      selectedVisa: null,
      isFormVisible: false,
      isSubmitting: false,
      isSubmitted: false,
      applicationId: null,
      invoiceId: null,

      setCurrentStep: (step) => set({ currentStep: step }),
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      setField: (key, value) => set((state) => ({ formData: { ...state.formData, [key]: value } })),
      setSelectedVisa: (visa) => set({ selectedVisa: visa }),
      showForm: () => set({ isFormVisible: true, currentStep: 1 }),
      hideForm: () => set({ isFormVisible: false }),
      resetForm: () => set({ currentStep: 1, formData: defaultFormData, selectedVisa: null, isFormVisible: false, isSubmitting: false, isSubmitted: false, applicationId: null, invoiceId: null }),
      submitForm: (applicationId, invoiceId) => set({ isSubmitting: true, isSubmitted: true, applicationId, invoiceId }),
    }),
    { name: 'visa-form-storage' }
  )
);

// ─── Applications Store (Admin) ──────────────────────────────

interface AdminState {
  applications: Application[];
  isLoading: boolean;
  filter: string;
  searchQuery: string;

  setApplications: (apps: Application[]) => void;
  addApplication: (app: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  updateStatus: (id: string, status: ApplicationStatus) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus) => void;
  setFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  filterApplications: () => Application[];
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      applications: [],
      isLoading: false,
      filter: 'all',
      searchQuery: '',

      setApplications: (apps) => set({ applications: apps }),
      addApplication: (app) => set((state) => ({ applications: [app, ...state.applications] })),
      updateApplication: (id, updates) =>
        set((state) => ({
          applications: state.applications.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a)),
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((a) => (a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a)),
        })),
      updatePaymentStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((a) => (a.id === id ? { ...a, paymentStatus: status, updatedAt: new Date().toISOString() } : a)),
        })),
      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      filterApplications: () => {
        const { applications, filter, searchQuery } = get();
        let result = applications;
        if (filter !== 'all') result = result.filter((a) => a.status === filter);
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          result = result.filter(
            (a) =>
              a.formData.fullName.toLowerCase().includes(q) ||
              a.formData.email.toLowerCase().includes(q) ||
              a.invoiceId.toLowerCase().includes(q) ||
              a.id.toLowerCase().includes(q)
          );
        }
        return result;
      },
    }),
    { name: 'visa-admin-storage' }
  )
);

// ─── UI Store ────────────────────────────────────────────────

interface UIState {
  mobileMenuOpen: boolean;
  stickyCTAVisible: boolean;
  darkMode: boolean;

  toggleMobileMenu: () => void;
  setStickyCTAVisible: (visible: boolean) => void;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      mobileMenuOpen: false,
      stickyCTAVisible: false,
      darkMode: false,

      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setStickyCTAVisible: (visible) => set({ stickyCTAVisible: visible }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'visa-ui-storage' }
  )
);
