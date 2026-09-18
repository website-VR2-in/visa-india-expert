import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { api, ApiError } from '../lib/api';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const finishLogin = (token: string | null) => {
    localStorage.setItem('admin_auth', 'true');
    if (token) localStorage.setItem('admin_token', token);
    navigate('/admin/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      // Primary: authenticate against the backend (valid password server-side,
      // returns a token the dashboard uses for admin API calls).
      const res = await api.adminLogin(password);
      finishLogin(res.token);
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 400)) {
        // Backend is reachable and rejected the password.
        setError('Incorrect password. Please try again.');
      } else {
        // Backend unreachable (offline / local dev without server) →
        // fall back to the local password check.
        const LOCAL_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'admin123';
        if (password === LOCAL_PASSWORD) {
          finishLogin(null);
        } else {
          setError('Incorrect password. Please try again.');
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <h1 className="text-2xl font-bold text-white mt-6">Admin Dashboard</h1>
          <p className="text-warmgray-300 mt-2">Enter your password to continue</p>
        </div>
        <div className="bg-white rounded-2xl border border-warmgray-200 shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary w-full !py-4" disabled={busy}>
              {busy ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
