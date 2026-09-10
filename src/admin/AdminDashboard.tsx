import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store';
import { Application, ApplicationStatus, PaymentStatus } from '../types';
import { STATUS_LABELS, PAYMENT_LABELS, getStatusColor, getPaymentColor, formatDateTime } from '../lib/utils';
import { COMPANY, VISA_OPTIONS } from '../data/config';
import { toast } from 'react-hot-toast';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
  const { applications, addApplication, updateStatus, updatePaymentStatus, filter, setFilter, searchQuery, setSearchQuery, filterApplications } = useAdminStore();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load applications from localStorage on mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('visa_applications') || '[]');
    if (stored.length > 0) {
      useAdminStore.getState().setApplications(stored);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const filteredApps = filterApplications();

  // Calculate stats
  const today = new Date().toISOString().split('T')[0];
  const todayApps = applications.filter(a => a.createdAt.startsWith(today));
  const pendingPayments = applications.filter(a => a.paymentStatus === 'awaiting_payment').length;
  const paidApps = applications.filter(a => a.paymentStatus === 'paid').length;
  const newLeads = applications.filter(a => a.status === 'new').length;
  const totalRevenue = applications.reduce((sum, a) => sum + (a.paymentStatus === 'paid' ? a.amount : 0), 0);

  const stats = [
    { label: "Today's Applications", value: todayApps.length, color: 'bg-blue-50 text-blue-800' },
    { label: 'Pending Payments', value: pendingPayments, color: 'bg-orange-50 text-orange-800' },
    { label: 'Paid Applications', value: paidApps, color: 'bg-green-50 text-green-800' },
    { label: 'New Leads', value: newLeads, color: 'bg-purple-50 text-purple-800' },
    { label: 'Total Revenue', value: `€${totalRevenue.toFixed(2)}`, color: 'bg-indiangreen-50 text-indiangreen-800' },
  ];

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateStatus(id, status);
    toast.success(`Status updated to ${STATUS_LABELS[status]}`);
  };

  const handlePaymentStatusChange = (id: string, status: PaymentStatus) => {
    updatePaymentStatus(id, status);
    toast.success(`Payment status updated to ${PAYMENT_LABELS[status]}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
  };

  const openAppDetails = (app: Application) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Admin Header */}
      <header className="bg-navy-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-warmgray-300 text-sm">{COMPANY.name}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary !py-2 !px-4 !text-sm">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`card ${stat.color}`}>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, invoice #..."
            className="form-input flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="form-input md:w-48"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl border border-warmgray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-ivory border-b border-warmgray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Application #</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Visa</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Payment</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500/70 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-warmgray-100 hover:bg-ivory/50">
                    <td className="px-4 py-3 font-mono text-sm">{app.invoiceId}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{app.formData.fullName}</div>
                      <div className="text-sm text-warmgray-500">{app.formData.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">{VISA_OPTIONS.find(v => v.id === app.formData.visaType)?.label || app.formData.visaType}</td>
                    <td className="px-4 py-3 text-sm">{formatDateTime(app.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold">€{app.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${getPaymentColor(app.paymentStatus)}`}>
                        {PAYMENT_LABELS[app.paymentStatus]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${getStatusColor(app.status)}`}>
                        {STATUS_LABELS[app.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openAppDetails(app)}
                        className="btn btn-primary !py-1.5 !px-3 !text-xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-warmgray-500">
              No applications found.
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-navy-500">Application Details</h2>
                <button onClick={() => setShowModal(false)} className="text-warmgray-400 hover:text-navy-500">
                  ✕
                </button>
              </div>
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-warmgray-500">Name:</span> <span className="font-medium">{selectedApp.formData.fullName}</span></div>
                    <div><span className="text-warmgray-500">Email:</span> <span className="font-medium">{selectedApp.formData.email}</span></div>
                    <div><span className="text-warmgray-500">Phone:</span> <span className="font-medium">{selectedApp.formData.phone}</span></div>
                    <div><span className="text-warmgray-500">WhatsApp:</span> <span className="font-medium">{selectedApp.formData.whatsappNumber}</span></div>
                    <div><span className="text-warmgray-500">Nationality:</span> <span className="font-medium">{selectedApp.formData.nationality}</span></div>
                    <div><span className="text-warmgray-500">Residence:</span> <span className="font-medium">{selectedApp.formData.countryOfResidence}</span></div>
                    <div><span className="text-warmgray-500">Visa Type:</span> <span className="font-medium">{VISA_OPTIONS.find(v => v.id === selectedApp.formData.visaType)?.label}</span></div>
                    <div><span className="text-warmgray-500">Travel From:</span> <span className="font-medium">{selectedApp.formData.travelDateFrom}</span></div>
                  </div>
                </div>
                {/* Status Controls */}
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-3">Update Status</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Application Status</label>
                      <select
                        className="form-input"
                        value={selectedApp.status}
                        onChange={(e) => handleStatusChange(selectedApp.id, e.target.value as unknown as ApplicationStatus)}
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Payment Status</label>
                      <select
                        className="form-input"
                        value={selectedApp.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(selectedApp.id, e.target.value as unknown as PaymentStatus)}
                      >
                        {Object.entries(PAYMENT_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Notes */}
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-3">Notes</h3>
                  <textarea
                    className="form-input min-h-[80px]"
                    value={selectedApp.notes}
                    onChange={(e) => {
                      const updated = { ...selectedApp, notes: e.target.value };
                      setSelectedApp(updated);
                    }}
                    placeholder="Add notes about this application..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
