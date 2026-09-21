import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';
import { ApplicationForm } from '../sections/ApplicationForm';
import { VISA_OPTIONS, COMPANY } from '../data/config';
import { formatMoney } from '../lib/utils';
import type { VisaType } from '../types';

export const ApplyPage: React.FC = () => {
  const { visaId } = useParams<{ visaId: string }>();
  const visa = VISA_OPTIONS.find((v) => v.id === visaId);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [visaId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb + summary bar */}
        <div className="bg-white border-b border-warmgray-200">
          <div className="container-custom py-4">
            <nav className="text-xs text-warmgray-500 flex items-center gap-2 flex-wrap mb-3">
              <Link to="/" className="hover:text-saffron-500 font-medium">Home</Link>
              <span>/</span>
              <Link to="/#services" className="hover:text-saffron-500 font-medium">Visas</Link>
              {visa && (
                <>
                  <span>/</span>
                  <Link to={`/visa/${visa.id}`} className="hover:text-saffron-500 font-medium">{visa.label}</Link>
                  <span>/</span>
                  <span className="text-navy-500 font-semibold">Apply</span>
                </>
              )}
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-navy-500">
                {visa ? (
                  <>
                    {visa.icon} Apply: {visa.label}
                  </>
                ) : (
                  '📋 Start Your India Visa Application'
                )}
              </h1>
              {visa && (
                <div className="bg-saffron-50 border border-saffron-200 rounded-xl px-4 py-2 text-sm">
                  <span className="text-warmgray-600">
                    <span className="font-bold text-navy-500">{formatMoney(visa.kickoff)}</span> kickoff
                    <span className="mx-2">·</span>
                    <span className="font-bold text-navy-500">{formatMoney(visa.successFee)}</span> success
                    <span className="mx-2">·</span>
                    <span className="font-bold text-saffron-500">{formatMoney(visa.kickoff + visa.successFee)}</span> total
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <ApplicationForm visaId={visa?.id} alwaysVisible />
      </main>
      <Footer />
    </div>
  );
};
