// ─── API client ──────────────────────────────────────────────
// Talks to the /api backend (same origin in production; VITE_API_BASE
// can point at another origin in dev). All calls fail fast with
// ApiError so callers can fall back to the localStorage cache.

import type { Application } from '../types';

const API_BASE: string = (import.meta as any).env?.VITE_API_BASE ?? '';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(
  path: string,
  opts: { method?: string; body?: unknown; token?: string | null } = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // keep default message
    }
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/** True when the backend is reachable. */
export async function apiAvailable(): Promise<boolean> {
  try {
    await request<{ ok: boolean }>('/api/health');
    return true;
  } catch {
    return false;
  }
}

export const api = {
  /** Create an application (public). Server validates + generates the invoice id. */
  createApplication: (payload: { formData: unknown; source?: string }) =>
    request<{ invoiceId: string; application: Application }>('/api/applications', {
      method: 'POST',
      body: payload,
    }),

  /** Fetch one application by invoice id (public). */
  getApplication: (invoiceId: string) =>
    request<{ application: Application }>(`/api/applications/${encodeURIComponent(invoiceId)}`),

  /** List all applications (admin token required). */
  listApplications: (token: string) =>
    request<{ applications: Application[]; count: number }>('/api/applications', { token }),

  /**
   * Update an application.
   *  - without token: paymentStatus / advancePaidAt / paidAt only
   *  - with token:    also status / notes
   */
  updateApplication: (invoiceId: string, patch: Record<string, unknown>, token?: string | null) =>
    request<{ application: Application }>(`/api/applications/${encodeURIComponent(invoiceId)}`, {
      method: 'PATCH',
      body: patch,
      token,
    }),

  /** Admin login → stateless bearer token. */
  adminLogin: (password: string) =>
    request<{ token: string }>('/api/admin/login', { method: 'POST', body: { password } }),
};

/** Read the stored admin token (set at login). */
export function getAdminToken(): string | null {
  try {
    return localStorage.getItem('admin_token');
  } catch {
    return null;
  }
}
