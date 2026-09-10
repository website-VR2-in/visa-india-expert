import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this should be server-side authentication
    // For now, using a simple password check (replace with proper auth)
    const ADMIN_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'admin123';
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
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
            <button type="submit" className="btn btn-primary w-full !py-4">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
