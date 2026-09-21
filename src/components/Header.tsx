import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useUIStore } from '../store';
import { VISA_OPTIONS } from '../data/config';

export const Header: React.FC = () => {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [visasOpen, setVisasOpen] = useState(false);
  const [mobileVisasOpen, setMobileVisasOpen] = useState(false);
  const visasRef = useRef<HTMLDivElement>(null);

  // Close the Visas dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (visasRef.current && !visasRef.current.contains(e.target as Node)) setVisasOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Section anchors: on the home page jump to the element, otherwise go home first.
  const sectionHref = (id: string) => (location.pathname === '/' ? `#${id}` : `/#${id}`);

  const handleSectionClick = (e: React.MouseEvent, id: string) => {
    if (window.matchMedia('(max-width: 767px)').matches) toggleMobileMenu();
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  const handleApply = () => {
    toggleMobileMenu();
    navigate('/apply');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Visas dropdown */}
            <div className="relative" ref={visasRef}>
              <button
                onClick={() => setVisasOpen((o) => !o)}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  visasOpen ? 'text-navy' : 'text-slate-600 hover:text-navy'
                }`}
              >
                Visas
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${visasOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {visasOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl border border-warmgray-200 shadow-xl py-2 max-h-[70vh] overflow-y-auto">
                  {VISA_OPTIONS.map((v) => (
                    <Link
                      key={v.id}
                      to={`/visa/${v.id}`}
                      onClick={() => setVisasOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-saffron-50 transition-colors"
                    >
                      <span className="text-lg">{v.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy-500 truncate">{v.label}</p>
                        <p className="text-xs text-warmgray-500">
                          ${v.kickoff} kickoff + ${v.successFee} success
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a
              href="#how-it-works"
              onClick={(e) => handleSectionClick(e, 'how-it-works')}
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSectionClick(e, 'pricing')}
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSectionClick(e, 'faq')}
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
            >
              Contact
            </a>
            <button onClick={handleApply} className="btn-primary !px-6 !py-2.5 !text-sm">
              Apply Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-3">
            <button
              onClick={() => setMobileVisasOpen((o) => !o)}
              className="w-full flex items-center justify-between text-sm font-medium text-slate-600 hover:text-navy py-2"
            >
              Visas
              <span className="text-xs">{mobileVisasOpen ? '−' : '+'}</span>
            </button>
            {mobileVisasOpen && (
              <div className="space-y-1 pl-3 border-l-2 border-saffron-200 ml-2">
                {VISA_OPTIONS.map((v) => (
                  <Link
                    key={v.id}
                    to={`/visa/${v.id}`}
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy py-2"
                  >
                    <span>{v.icon}</span>
                    <span className="flex-1">{v.label}</span>
                    <span className="text-xs text-warmgray-400">${v.kickoff}+${v.successFee}</span>
                  </Link>
                ))}
              </div>
            )}
            <a
              href={sectionHref('how-it-works')}
              onClick={(e) => handleSectionClick(e, 'how-it-works')}
              className="block text-sm font-medium text-slate-600 hover:text-navy py-2"
            >
              How It Works
            </a>
            <a
              href={sectionHref('pricing')}
              onClick={(e) => handleSectionClick(e, 'pricing')}
              className="block text-sm font-medium text-slate-600 hover:text-navy py-2"
            >
              Pricing
            </a>
            <a
              href={sectionHref('faq')}
              onClick={(e) => handleSectionClick(e, 'faq')}
              className="block text-sm font-medium text-slate-600 hover:text-navy py-2"
            >
              FAQ
            </a>
            <a
              href={sectionHref('contact')}
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="block text-sm font-medium text-slate-600 hover:text-navy py-2"
            >
              Contact
            </a>
            <button onClick={handleApply} className="btn-primary w-full text-center">
              Apply Now
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
