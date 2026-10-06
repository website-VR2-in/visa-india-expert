import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useUIStore } from './store';
import { Header } from './components/Header';
import { StickyCTA } from './components/StickyCTA';
import { Footer } from './sections/Footer';
import { HomePage } from './pages/HomePage';
import { VisaPage } from './pages/VisaPage';
import { ApplyPage } from './pages/ApplyPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { PressPage } from './pages/PressPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/refund" element={<LegalPage kind="refund" />} />
          <Route path="/disclaimer" element={<LegalPage kind="disclaimer" />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-center" />
        <SpeedInsights />
      </div>
    </Router>
  );
};

export default App;
