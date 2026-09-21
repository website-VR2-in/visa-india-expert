import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useUIStore } from './store';
import { Header } from './components/Header';
import { StickyCTA } from './components/StickyCTA';
import { Footer } from './sections/Footer';
import { HomePage } from './pages/HomePage';
import { VisaPage } from './pages/VisaPage';
import { ApplyPage } from './pages/ApplyPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboard } from './admin/AdminDashboard';

const App: React.FC = () => {
  const stickyCTAVisible = useUIStore((s) => s.stickyCTAVisible);
  const setStickyCTAVisible = useUIStore((s) => s.setStickyCTAVisible);

  useEffect(() => {
    const handleScroll = () => {
      setStickyCTAVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setStickyCTAVisible]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HomePage />
              </main>
              <Footer />
              {stickyCTAVisible && <StickyCTA />}
            </>
          } />
          <Route path="/visa/:visaId" element={<VisaPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/apply/:visaId" element={<ApplyPage />} />
          <Route path="/payment/:invoiceId" element={<PaymentPage />} />
          <Route path="/confirmation/:invoiceId" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
};

export default App;
