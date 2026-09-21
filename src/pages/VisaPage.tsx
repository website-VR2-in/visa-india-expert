import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { VISA_OPTIONS, COMPANY } from '../data/config';
import { formatMoney } from '../lib/utils';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';

export const VisaPage: React.FC = () => {
  const { visaId } = useParams<{ visaId: string }>();
  const visa = VISA_OPTIONS.find((v) => v.id === visaId);

  // Scroll to top on visa change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [visaId]);

  if (!visa) return <Navigate to="/" replace />;

  const total = visa.kickoff + visa.successFee;
  const otherVisas = VISA_OPTIONS.filter((v) => v.id !== visa.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-warmgray-200">
        <div className="container-custom py-3">
          <nav className="text-xs text-warmgray-500 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-saffron-500 font-medium">Home</Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-saffron-500 font-medium">Visas</Link>
            <span>/</span>
            <span className="text-navy-500 font-semibold">{visa.label}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-ivory to-saffron-50/60 border-b border-warmgray-200">
        <div className="container-custom py-12 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white border-2 border-saffron-200 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
                  {visa.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-saffron-500 uppercase tracking-wide">{visa.category} Visa</div>
                  <h1 className="text-3xl md:text-4xl font-bold text-navy-500 leading-tight">{visa.label}</h1>
                </div>
              </div>
              <p className="text-lg text-navy-500/80 font-medium mb-3">{visa.tagline}</p>
              <p className="text-warmgray-600 mb-6">{visa.description}</p>

              {/* Key facts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {visa.facts.map((fact) => (
                  <div key={fact.label} className="bg-white border border-warmgray-200 rounded-xl px-4 py-3">
                    <p className="text-xs text-warmgray-500 uppercase tracking-wide">{fact.label}</p>
                    <p className="font-bold text-navy-500 text-sm mt-0.5">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky pricing card */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 bg-white border-2 border-saffron-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-navy-500 text-white px-6 py-4">
                  <div className="text-xs uppercase tracking-wide text-warmgray-300 font-semibold">Your Price</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{formatMoney(total)}</span>
                    <span className="text-xs text-warmgray-300">total</span>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-warmgray-600">Kickoff fee</span>
                      <span className="font-bold text-navy-500">{formatMoney(visa.kickoff)}</span>
                    </div>
                    <div className="text-xs text-warmgray-400 -mt-1">due now to start</div>
                    <div className="flex justify-between">
                      <span className="text-warmgray-600">Success fee</span>
                      <span className="font-bold text-navy-500">{formatMoney(visa.successFee)}</span>
                    </div>
                    <div className="text-xs text-warmgray-400 -mt-1">due after successful application</div>
                  </div>
                  <Link
                    to={`/apply/${visa.id}`}
                    className="btn btn-primary w-full mt-5 !py-3.5"
                  >
                    Start Application
                  </Link>
                  <a
                    href={COMPANY.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full mt-3 !py-3 !text-sm"
                  >
                    Ask a Question
                  </a>
                  <p className="text-[11px] text-warmgray-400 text-center mt-4">
                    Government visa fees are separate and paid directly to the Indian government.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Who it's for */}
          <section className="card">
            <h2 className="text-xl font-bold text-navy-500 mb-4">Who Is This For?</h2>
            <ul className="space-y-3">
              {visa.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-warmgray-600">
                  <span className="w-5 h-5 bg-indiangreen-50 text-indiangreen-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Pitfalls */}
          <section className="card">
            <h2 className="text-xl font-bold text-navy-500 mb-4">Common Pitfalls We Avoid</h2>
            <ul className="space-y-3">
              {visa.pitfalls.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-warmgray-600">
                  <span className="w-5 h-5 bg-saffron-50 text-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    !
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Documents */}
          <section className="card lg:col-span-2">
            <h2 className="text-xl font-bold text-navy-500 mb-4">Documents You Will Need</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {visa.documents.map((doc) => (
                <div key={doc} className="flex items-start gap-3 bg-ivory border border-warmgray-200 rounded-xl px-4 py-3 text-sm text-warmgray-600">
                  <span className="text-saffron-500 font-bold">📄</span>
                  {doc}
                </div>
              ))}
            </div>
            <p className="text-xs text-warmgray-400 mt-4">
              Exact checklist depends on your nationality and case — your consultant confirms it after the kickoff payment.
            </p>
          </section>
        </div>

        {/* Other visas strip */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy-500 mb-4">Other India Visas We Handle</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherVisas.map((v) => (
              <Link
                key={v.id}
                to={`/visa/${v.id}`}
                className="card text-left group !p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{v.icon}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-navy-500 text-sm truncate group-hover:text-saffron-500 transition-colors">{v.label}</p>
                    <p className="text-xs text-warmgray-500">
                      {formatMoney(v.kickoff)} + {formatMoney(v.successFee)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 bg-navy-500 rounded-2xl px-8 py-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Apply for a {visa.label}?</h2>
          <p className="text-warmgray-300 mb-6 max-w-xl mx-auto">
            {formatMoney(visa.kickoff)} kickoff starts your application today. The {formatMoney(visa.successFee)} success
            fee is due only after your application is successfully processed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/apply/${visa.id}`} className="btn btn-primary">
              Start Application
            </Link>
            <a
              href={COMPANY.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};
